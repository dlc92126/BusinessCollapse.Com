/**
 * Web Worker for BusinessCollapse.Com High-Performance Background Filtering
 * Offloads multi-state regex matching, sector search, cause filtering, and date calculations off the main UI thread.
 */

const STATE_NAME_TO_CODE_WORKER = {
  'ALABAMA': 'AL', 'ALASKA': 'AK', 'ARIZONA': 'AZ', 'ARKANSAS': 'AR', 'CALIFORNIA': 'CA',
  'COLORADO': 'CO', 'CONNECTICUT': 'CT', 'DELAWARE': 'DE', 'FLORIDA': 'FL', 'GEORGIA': 'GA',
  'HAWAII': 'HI', 'IDAHO': 'ID', 'ILLINOIS': 'IL', 'INDIANA': 'IN', 'IOWA': 'IA',
  'KANSAS': 'KS', 'KENTUCKY': 'KY', 'LOUISIANA': 'LA', 'MAINE': 'ME', 'MARYLAND': 'MD',
  'MASSACHUSETTS': 'MA', 'MICHIGAN': 'MI', 'MINNESOTA': 'MN', 'MISSISSIPPI': 'MS', 'MISSOURI': 'MO',
  'MONTANA': 'MT', 'NEBRASKA': 'NE', 'NEVADA': 'NV', 'NEW HAMPSHIRE': 'NH', 'NEW JERSEY': 'NJ',
  'NEW MEXICO': 'NM', 'NEW YORK': 'NY', 'NORTH CAROLINA': 'NC', 'NORTH DAKOTA': 'ND', 'OHIO': 'OH',
  'OKLAHOMA': 'OK', 'OREGON': 'OR', 'PENNSYLVANIA': 'PA', 'RHODE ISLAND': 'RI', 'SOUTH CAROLINA': 'SC',
  'SOUTH DAKOTA': 'SD', 'TENNESSEE': 'TN', 'TEXAS': 'TX', 'UTAH': 'UT', 'VERMONT': 'VT',
  'VIRGINIA': 'VA', 'WASHINGTON': 'WA', 'WEST VIRGINIA': 'WV', 'WISCONSIN': 'WI', 'WYOMING': 'WY'
};

// Regex State Extractor inside Worker
function extractStateCodeWorker(item) {
  if (!item) return '';
  if (item.region && typeof item.region === 'string' && item.region.length === 2 && item.region !== 'US' && item.region !== 'ALL') {
    return item.region.toUpperCase();
  }
  const textToSearch = [
    item.region,
    item.locationJurisdiction,
    item.state,
    item.name,
    item.entityName,
    item.companyName,
    item.summary,
    item.claimsAgent
  ].filter(Boolean).join(' ').toUpperCase();

  for (const [stateName, code] of Object.entries(STATE_NAME_TO_CODE_WORKER)) {
    if (textToSearch.includes(stateName)) {
      return code;
    }
  }

  const stateMatch = textToSearch.match(/\b(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\b/);
  return stateMatch && stateMatch[1] ? stateMatch[1].toUpperCase() : '';
}

function checkIsAuctionWorker(item) {
  if (!item) return false;
  if (item.isPreJudicial || item.courtCaseStatus === 'PRE_PETITION_WARN_SIGNAL') return false;
  return Boolean(
    (item.auctionTitle && item.auctionTitle.trim() !== '') ||
    (item.auctionPortalUrl && item.auctionPortalUrl.trim() !== '') ||
    (item.assetLiquidationType && item.assetLiquidationType.trim() !== '') ||
    (item.stalkerHorseBid && item.stalkerHorseBid.trim() !== '') ||
    (item.auctioneer && item.auctioneer.trim() !== '') ||
    (item.assetLiquidationBadge && item.assetLiquidationBadge.trim() !== '') ||
    (item.statusBadge && item.statusBadge.toLowerCase().includes('363-auction'))
  );
}

self.onmessage = function(e) {
  const {
    companies = [],
    searchQuery = '',
    selectedSectorFilter = 'ALL',
    statusFilter = 'ALL',
    causeFilter = 'ALL',
    valuationThresholdFilter = 'BOTH',
    timeframeFilter = '30D',
    customStartDate = '',
    customEndDate = '',
    selectedStates = [],
    watchlist = []
  } = e.data;

  const validStates = (selectedStates || []).filter(s => s !== 'NONE' && s !== 'ALL');
  const nowMs = new Date().getTime();

  const filtered = companies.filter((c) => {
    if (!c) return false;

    // 1. Multi-State Checkbox Filter
    if (validStates.length > 0) {
      const compState = extractStateCodeWorker(c);
      if (!compState || !validStates.includes(compState)) return false;
    }

    // 2. Search Query Matching
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = c.name && c.name.toLowerCase().includes(q);
      const tickerMatch = c.ticker && c.ticker.toLowerCase().includes(q);
      const causeMatch = c.primaryCause && c.primaryCause.toLowerCase().includes(q);
      const stateMatch = c.locationJurisdiction && c.locationJurisdiction.toLowerCase().includes(q);
      const auctionMatch = c.auctionTitle && c.auctionTitle.toLowerCase().includes(q);
      if (!nameMatch && !tickerMatch && !causeMatch && !stateMatch && !auctionMatch) return false;
    }

    // 3. Sector Filter
    if (selectedSectorFilter && selectedSectorFilter !== 'ALL') {
      const targetSector = selectedSectorFilter.toLowerCase();
      const companySectorStr = [
        c.sectorId,
        c.sectorName,
        c.sector,
        c.industry,
        c.category,
        c.name,
        c.primaryCause
      ].filter(Boolean).join(' ').toLowerCase();

      const regex = new RegExp(`\\b${targetSector}\\b`, 'i');
      if (!regex.test(companySectorStr)) return false;
    }

    // 4. Status Stage Taxonomy
    const isPre = Boolean(
      c.isPreJudicial ||
      c.courtCaseStatus === 'PRE_PETITION_WARN_SIGNAL' ||
      (c.id && typeof c.id === 'string' && c.id.startsWith('pre-judicial')) ||
      (c.signalCategory && (c.signalCategory.includes('WARN') || c.signalCategory.includes('PRE_PETITION') || c.signalCategory.includes('REFINANCING_DEFAULT'))) ||
      (c.signalType && c.signalType.includes('WARN')) ||
      (c.statusBadge && (c.statusBadge.includes('WARN') || c.statusBadge.includes('pre-judicial'))) ||
      (c.status && (c.status.toUpperCase().includes('PRE-JUDICIAL') || c.status.toUpperCase().includes('WARN')))
    );
    const isAuc = checkIsAuctionWorker(c);
    const isChap = !isPre && !isAuc && (c.courtCaseStatus !== 'FINAL_DECREE_ISSUED' || c.status?.includes('CHAPTER 11') || c.status?.includes('DOCKET'));
    const isDis = c.courtCaseStatus === 'FINAL_DECREE_ISSUED' || c.statusBadge === 'discharge';

    if (statusFilter === 'pre-judicial' && !isPre) return false;
    if ((statusFilter === '363-auction' || statusFilter === 'auction-363') && (isPre || !isAuc)) return false;
    if ((statusFilter === 'chapter-11' || statusFilter === 'active-docket') && !isChap) return false;
    if (statusFilter === 'discharged' && !isDis) return false;
    if (statusFilter === 'favorites') {
      const isFav = Boolean(c.isBookmarked || (watchlist && (watchlist.includes(c.id) || watchlist.includes(c.ticker))));
      if (!isFav) return false;
    }

    // 5. Cause Filter
    if (causeFilter !== 'ALL') {
      const causeText = c.primaryCause ? c.primaryCause.toLowerCase() : '';
      if (!causeText.includes(causeFilter.toLowerCase())) return false;
    }

    // 6. Valuation Threshold Filter
    if (valuationThresholdFilter !== 'BOTH') {
      const isSub10mItem = Boolean(
        (c.statusBadge && (c.statusBadge.toUpperCase().includes('SUBCHAPTER') || c.statusBadge.includes('-$10M') || c.statusBadge.includes('RECEIVERSHIP'))) ||
        c.status === 'SUBCHAPTER_V' ||
        c.debtRangeCategory ||
        (c.sourceType && c.sourceType.includes('SUBCHAPTER')) ||
        (c.id && (c.id.startsWith('sub10m') || c.id.startsWith('classen') || c.id.startsWith('pacer-subv') || c.id.startsWith('lone-star') || c.id.startsWith('golden-state') || c.id.startsWith('midwest-cnc') || c.id.startsWith('peach-tree') || c.id.startsWith('crestline'))) ||
        (c.peakValuation && (
          c.peakValuation.includes('K') || 
          c.peakValuation.includes('Sub') ||
          (c.peakValuation.includes('M') && parseFloat(c.peakValuation.replace(/[^0-9.]/g, '')) < 10)
        ))
      );

      if (valuationThresholdFilter === 'INSTITUTIONAL_10M' && isSub10mItem) return false;
      if (valuationThresholdFilter === 'SUB_10M' && !isSub10mItem) return false;
    }

    // 7. Timeframe Filter
    if (timeframeFilter !== 'ALL') {
      const candidate = c.lastMaterialChangeDate || c.lastUpdated || c.dateTimestamp || c.officialFilingDate || c.lastSweepDate;
      const itemTime = candidate ? new Date(candidate).getTime() : new Date('2024-01-01').getTime();

      if (timeframeFilter === 'CUSTOM') {
        if (customStartDate && itemTime < new Date(customStartDate).getTime()) return false;
        if (customEndDate && itemTime > new Date(customEndDate).getTime() + (24 * 3600 * 1000)) return false;
      } else {
        const diffDays = (nowMs - itemTime) / (1000 * 3600 * 24);
        if (timeframeFilter === '7D' && diffDays > 7) return false;
        if (timeframeFilter === '14D' && diffDays > 14) return false;
        if (timeframeFilter === '30D' && diffDays > 30) return false;
        if (timeframeFilter === '90D' && diffDays > 90) return false;
        if (timeframeFilter === '1Y' && diffDays > 365) return false;
      }
    }

    return true;
  });

  self.postMessage({ filteredCompanies: filtered });
};
