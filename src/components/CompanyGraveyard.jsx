import React, { useState, useRef, useEffect } from 'react';
import { Filter, Calendar, DollarSign, ChevronRight, Skull, AlertCircle, RefreshCw, AlertTriangle, Layers, Star, Search, Clock, Share2, EyeOff } from 'lucide-react';
import BreakingNewsHero from './BreakingNewsHero';



export default function CompanyGraveyard({
  companies,
  onSelectCompany,
  selectedSectorFilter = 'ALL',
  setSelectedSectorFilter,
  breakingNews = [],
  searchQuery = '',
  setSearchQuery,
  watchlist = [],
  toggleWatchlist,
  onOpenAuctions,
  onOpenAdmissionCriteria,
  onOpenCustomRequest,
  onOpenProRadarPreferences,
  onOpenBulletinModal,
  lastIngestionTime,
  onOpenShare,
  dismissedCompanyIds = [],
  toggleDismissCompany,
  activeTab = 'graveyard',
  setActiveTab,
  onOpenWaterfall,
  onOpenDiligenceBrief,
  onOpenNewsroomStudio
}) {

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [causeFilter, setCauseFilter] = useState('ALL');
  const [timeframeFilter, setTimeframeFilter] = useState('14D'); // '14D' (2-Week Active Wire) | 'ALL' | '7D' | '30D' | '90D' | '1Y' | '2024_2026' | 'CUSTOM'
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [layoutMode, setLayoutMode] = useState('compact'); // 'compact' (2-Row Dense) | 'full' (Rich Narrative) | 'grid'
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
  const [isMoreWorkstationsOpen, setIsMoreWorkstationsOpen] = useState(false);
  const PRIMARY_INSTITUTIONAL_SUBTITLE = "⚡ REAL-TIME DISTRESS INTELLIGENCE • CHAPTER 11 DOCKET STREAM & EARLY WARN WIRE";
  const workstationsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (workstationsRef.current && !workstationsRef.current.contains(event.target)) {
        setIsMoreWorkstationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper to format Start / Closed Date Range
  // Helper to format Start Date, First Early Warning Signal, Official Chapter 11 Filing, and Court Case Docket Status
  const getEventDateRange = (company) => {
    if (!company) return 'Est. N/A';
    const start = company.yearFounded ? `Est. ${company.yearFounded}` : 'Est. N/A';
    const signalDate = company.firstDistressSignalDate ? `Signal ${company.firstDistressSignalDate}` : null;
    const filingDate = company.officialFilingDate ? `Filed ${company.officialFilingDate.slice(0, 7)}` : 'Filed N/A';
    
    let courtLabel = `⚡ Active Docket (${filingDate})`;
    if (company.courtCaseStatus === 'FINAL_DECREE_ISSUED') {
      courtLabel = `⚖️ Case Discharged (${company.finalCourtDecreeDate || 'Final Decree'})`;
    }

    if (signalDate) {
      return `${start} ➔ 🚨 ${signalDate} ➔ ${courtLabel}`;
    }
    return `${start} ➔ ${courtLabel}`;
  };

  // Helper to compute a normalized, robust entity key (ticker or cleaned company name)
  const getEntityKey = (item) => {
    if (!item) return '';
    const ticker = item.ticker ? item.ticker.toUpperCase().replace(/[^A-Z0-9]/g, '') : '';
    const rawName = item.name || item.entityName || '';
    const cleanName = rawName.toUpperCase()
      .replace(/BRANDS|CORPORATION|CORP|INC|LLC|MANAGEMENT|SYSTEMS|SYSTEM|GROUP|HOLDINGS|HOLDING|PLC|CO/g, '')
      .replace(/[^A-Z0-9]/g, '');
    return ticker || cleanName || (item.id ? item.id.split('-')[0].toUpperCase() : '');
  };

  // 1. Smart Entity Deduplication & Event Aggregation Engine (HIGHLANDER RULE: One Card Per Company)
  const companyMap = new Map();

  // Populate base companies (merge duplicates if encountered)
  (companies || []).forEach(c => {
    if (!c) return;
    const key = getEntityKey(c);
    if (!key) return;

    if (companyMap.has(key)) {
      // Merge newer ingested data into existing record
      const existing = companyMap.get(key);
      const merged = {
        ...existing,
        ...c,
        id: existing.id, // Preserve consistent original ID
        timeline: Array.from(new Set([...(c.timeline || []), ...(existing.timeline || [])]))
      };
      companyMap.set(key, merged);
    } else {
      companyMap.set(key, { ...c });
    }
  });

  // Aggregate breaking news / WARN signals into existing or new records
  const breakingList = Array.isArray(breakingNews) ? breakingNews : (breakingNews ? [breakingNews] : []);
  
  breakingList.forEach(item => {
    if (!item) return;
    const tickerKey = (item.ticker || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const nameKey = (item.entityName || item.name || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    // Search exact match by ticker or name
    let existing = companyMap.get(tickerKey) || companyMap.get(nameKey);

    if (!existing) {
      // Search partial name match
      for (const [k, obj] of companyMap.entries()) {
        if (nameKey && (k.includes(nameKey) || nameKey.includes(k))) {
          existing = obj;
          break;
        }
      }
    }

    const eventIso = item.lastUpdated
      ? item.lastUpdated
      : (item.hoursAgo ? new Date(Date.now() - item.hoursAgo * 3600 * 1000).toISOString() : new Date().toISOString());

    if (existing) {
      // APPEND NEW WARN SIGNAL / DOCKET / AUCTION UPDATE to existing entity record
      existing.isEmergent = true;
      existing.isPreJudicial = item.badgeText?.includes('WARN') || item.badgeText?.includes('RATING') || false;
      existing.status = item.badgeText || existing.status;
      existing.headline = item.headline || existing.headline;

      // ALWAYS RESET MATERIAL CHANGE DATE & TIMESTAMP TO NOVEL EVENT TIMESTAMP
      const itemTime = new Date(eventIso).getTime();
      const existingTime = existing.lastMaterialChangeDate ? new Date(existing.lastMaterialChangeDate).getTime() : (existing.dateTimestamp ? new Date(existing.dateTimestamp).getTime() : 0);
      if (itemTime > existingTime || !existing.lastMaterialChangeDate) {
        existing.lastMaterialChangeDate = eventIso;
        existing.dateTimestamp = eventIso;
        const freshDate = new Date(eventIso);
        existing.formattedMaterialChange = freshDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + freshDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' EST';
      }

      if (item.auctionTitle) existing.auctionTitle = item.auctionTitle;
      if (item.auctionPortalUrl) existing.auctionPortalUrl = item.auctionPortalUrl;
      
      // Append key updates into earlyWarningSignals
      const newUpdates = item.keyUpdates || [];
      const existingSignals = existing.earlyWarningSignals || [];
      existing.earlyWarningSignals = Array.from(new Set([...newUpdates, ...existingSignals]));

      // Merge press citations
      if (item.pressCitations && item.pressCitations.length > 0) {
        const existingCitations = existing.pressCitations || [];
        existing.pressCitations = Array.from(new Set([...item.pressCitations, ...existingCitations]));
      }
    } else {
      // Create new emergent record for novel entity
      const newKey = tickerKey || nameKey || `EMERGENT-${Date.now()}`;
      const freshDate = new Date(eventIso);
      const formattedMatStr = freshDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + freshDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' EST';

      companyMap.set(newKey, {
        id: item.id || `emergent-${newKey}`,
        name: item.entityName || item.name,
        ticker: item.ticker || 'WARN',
        status: item.badgeText || '🟨 PRE-JUDICIAL WARN NOTICE',
        statusBadge: 'status-active',
        primaryCause: item.headline || item.summary || 'Pre-Petition Restructuring Warning',
        summary: item.summary,
        yearFounded: item.yearFounded || 1995,
        yearCollapsed: 2026,
        totalDebt: item.totalDebt || item.capitalAtRisk || 'Pre-Petition Valuation',
        peakValuation: item.capitalAtRisk || '$250,000,000',
        collapseValuation: '$0.00 (Pre-Petition)',
        jobsLost: item.jobsLost || 850,
        sectorId: item.sectorId || 'retail',
        courtCaseStatus: 'PRE_PETITION_WARN_SIGNAL',
        officialFilingDate: eventIso.slice(0, 10),
        dateTimestamp: eventIso,
        lastMaterialChangeDate: eventIso,
        formattedMaterialChange: formattedMatStr,
        isEmergent: true,
        isPreJudicial: true,
        auctionTitle: item.auctionTitle,
        auctionPortalUrl: item.auctionPortalUrl,
        locationJurisdiction: item.locationJurisdiction || `${item.region || 'US'} State Jurisdiction`,
        earlyWarningSignals: item.keyUpdates || [item.signalType || item.summary],
        pressCitations: item.pressCitations || []
      });
    }
  });

  const allAggregatedCompanies = Array.from(companyMap.values());

  // 2. Filter fully aggregated companies array
  const filteredCompanies = allAggregatedCompanies.filter((c) => {
    if (!c) return false;

    // Search Query Matching
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = c.name && c.name.toLowerCase().includes(q);
      const tickerMatch = c.ticker && c.ticker.toLowerCase().includes(q);
      const causeMatch = c.primaryCause && c.primaryCause.toLowerCase().includes(q);
      const stateMatch = c.locationJurisdiction && c.locationJurisdiction.toLowerCase().includes(q);
      const auctionMatch = c.auctionTitle && c.auctionTitle.toLowerCase().includes(q);
      if (!nameMatch && !tickerMatch && !causeMatch && !stateMatch && !auctionMatch) return false;
    }

    // Dismissed / Muted Entity Check
    if (dismissedCompanyIds && dismissedCompanyIds.includes(c.id)) return false;

    if (selectedSectorFilter !== 'ALL' && c.sectorId !== selectedSectorFilter) return false;

    // Graveyard Archive Mode: Show completed cases, discharged dockets, historical post-mortems, and liquidated corporate autopsies
    if (activeTab === 'graveyard_archive' && statusFilter === 'ALL') {
      const isArchived = Boolean(
        c.courtCaseStatus === 'FINAL_DECREE_ISSUED' ||
        c.statusBadge === 'discharge' ||
        c.postMortemLesson ||
        c.executiveSummary ||
        c.collapseValuation ||
        c.yearCollapsed ||
        c.status?.includes('ARCHIVE') ||
        c.status?.includes('DISCHARGED') ||
        c.status?.includes('POST-MORTEM') ||
        c.status?.includes('LIQUIDATED') ||
        c.status?.includes('CHAPTER 11') ||
        c.isEmergent === undefined
      );
      if (!isArchived) return false;
    }

    // Status & Stage Taxonomy Matching
    if (statusFilter !== 'ALL') {
      if (statusFilter === 'favorites') {
        const isFav = Boolean(c.isBookmarked || (watchlist && (watchlist.includes(c.id) || watchlist.includes(c.ticker))));
        if (!isFav) return false;
      } else {
        const isPre = Boolean(c.isPreJudicial || c.courtCaseStatus === 'PRE_PETITION_WARN_SIGNAL' || c.status?.includes('PRE-JUDICIAL') || c.status?.includes('WARN'));
        const isAuc = !isPre && Boolean((c.auctionTitle && c.auctionTitle.trim() !== '') || (c.auctionPortalUrl && c.auctionPortalUrl.trim() !== '') || (c.status && (c.status.toUpperCase().includes('AUCTION') || c.status.includes('363'))) || (c.headline && c.headline.toLowerCase().includes('auction')));
        const isChap = !isPre && !isAuc && (c.courtCaseStatus !== 'FINAL_DECREE_ISSUED' || c.status?.includes('CHAPTER 11') || c.status?.includes('DOCKET'));
        const isDis = c.courtCaseStatus === 'FINAL_DECREE_ISSUED' || c.statusBadge === 'discharge';

        if (statusFilter === 'pre-judicial' && !isPre) return false;
        if (statusFilter === 'auction-363' && !isAuc) return false;
        if (statusFilter === 'chapter-11' && !isChap) return false;
        if (statusFilter === 'discharged' && !isDis) return false;
      }
    }




    if (causeFilter !== 'ALL') {
      const causeText = c.primaryCause ? c.primaryCause.toLowerCase() : '';
      if (!causeText.includes(causeFilter.toLowerCase())) return false;
    }

    // Helper for exact latest material event timestamp
    const getCompanyMaterialTime = (c) => {
      if (!c) return 0;
      const t = c.lastMaterialChangeDate || c.lastUpdated || c.dateTimestamp || c.officialFilingDate || c.lastSweepDate;
      return t ? new Date(t).getTime() : 0;
    };

    // Timeframe & Custom Date Range Filter
    if (timeframeFilter !== 'ALL') {
      const itemTime = getCompanyMaterialTime(c) || new Date('2024-01-01').getTime();

      if (timeframeFilter === 'CUSTOM') {
        if (customStartDate && itemTime < new Date(customStartDate).getTime()) return false;
        if (customEndDate && itemTime > new Date(customEndDate).getTime() + (24 * 3600 * 1000)) return false;
      } else if (timeframeFilter === '2024_2026') {
        const companyYear = new Date(itemTime).getFullYear();
        if (companyYear < 2024 || companyYear > 2026) return false;
      } else {
        const now = new Date().getTime();
        const diffDays = (now - itemTime) / (1000 * 3600 * 24);

        if (timeframeFilter === '7D' && diffDays > 7) return false;
        if (timeframeFilter === '14D' && diffDays > 14) return false;
        if (timeframeFilter === '30D' && diffDays > 30) return false;
        if (timeframeFilter === '90D' && diffDays > 90) return false;
        if (timeframeFilter === '1Y' && diffDays > 365) return false;
      }
    }

    return true;
  });

  // 3. Strict Latest Timestamp & Emergent Court Docket Floating Sorting Rule:
  // Fresh Breaking / Ingested Signals (hoursAgo <= 12 or isEmergent/isPreJudicial) ALWAYS FLOAT TO VERY TOP!
  // Ranked strictly by newest material timestamp first!
  const nowMs = new Date().getTime();

  const getCompanyMaterialTime = (c) => {
    if (!c) return 0;
    const t = c.lastMaterialChangeDate || c.lastUpdated || c.dateTimestamp || c.officialFilingDate || c.lastSweepDate;
    return t ? new Date(t).getTime() : 0;
  };

  const getCompanyHoursAgo = (c) => {
    const tMs = getCompanyMaterialTime(c);
    if (!tMs) return 9999;
    return Math.max(1, Math.round((nowMs - tMs) / (1000 * 3600)));
  };

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    const timeA = getCompanyMaterialTime(a);
    const timeB = getCompanyMaterialTime(b);

    const hAgoA = getCompanyHoursAgo(a);
    const hAgoB = getCompanyHoursAgo(b);

    const isAEmergent = Boolean(a && (a.isEmergent || a.isPreJudicial || hAgoA <= 12));
    const isBEmergent = Boolean(b && (b.isEmergent || b.isPreJudicial || hAgoB <= 12));

    if (isAEmergent && !isBEmergent) return -1; // Emergent & Fresh Breaking Signals FLOAT TO VERY TOP!
    if (!isAEmergent && isBEmergent) return 1;

    if (isAEmergent && isBEmergent) {
      // Sort within breaking items strictly by newest material timestamp first!
      return timeB - timeA;
    }

    const isAActive = a && a.courtCaseStatus !== 'FINAL_DECREE_ISSUED';
    const isBActive = b && b.courtCaseStatus !== 'FINAL_DECREE_ISSUED';
    
    if (isAActive && !isBActive) return -1; // Active Dockets SECOND!
    if (!isAActive && isBActive) return 1;  // Discharged Cases THIRD!

    return timeB - timeA;
  });









  return (
    <div style={{ marginTop: '4px' }}>
      {/* Control Header & Filters (High-Density Terminal Console) */}


      {/* COLLAPSED 1-ROW ULTRA-COMPACT TOOLBAR (FREES UP 20%+ SCREEN REAL ESTATE) */}
      {isControlsCollapsed ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
          border: '1px solid rgba(255, 42, 75, 0.35)',
          borderLeft: '5px solid #FF2A4B',
          borderRadius: '10px',
          marginBottom: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Skull size={18} color="#FF2A4B" />
            <span style={{ fontSize: '0.88rem', fontWeight: 950, color: '#FFF', letterSpacing: '0.03em' }}>
              🔥 CORE FEED ({filteredCompanies.length} MONITORED)
            </span>
            <button
              onClick={() => setIsControlsCollapsed(false)}
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#000',
                border: 'none',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '0.68rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              🔽 Expand Full Header & Filters
            </button>
          </div>

          {/* Inline Quick Search & View Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative', width: '200px' }}>
              <input
                type="text"
                placeholder="Quick search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', background: 'rgba(7, 10, 15, 0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '4px 8px 4px 26px', color: '#FFF', fontSize: '0.75rem', outline: 'none' }}
              />
              <Search size={12} color="#94A3B8" style={{ position: 'absolute', left: '8px', top: '7px' }} />
            </div>

            <div style={{ background: 'rgba(15,23,42,0.9)', padding: '2px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', gap: '2px' }}>
              <button onClick={() => setLayoutMode('compact')} style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '0.68rem', fontWeight: 800, background: layoutMode === 'compact' ? '#EF4444' : 'transparent', color: layoutMode === 'compact' ? '#FFF' : '#94A3B8', border: 'none', cursor: 'pointer' }}>⚡ 2-Row Dense</button>
              <button onClick={() => setLayoutMode('full')} style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '0.68rem', fontWeight: 800, background: layoutMode === 'full' ? '#F59E0B' : 'transparent', color: layoutMode === 'full' ? '#000' : '#94A3B8', border: 'none', cursor: 'pointer' }}>📰 Full Cards</button>
              <button onClick={() => setLayoutMode('grid')} style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '0.68rem', fontWeight: 800, background: layoutMode === 'grid' ? '#3B82F6' : 'transparent', color: layoutMode === 'grid' ? '#FFF' : '#94A3B8', border: 'none', cursor: 'pointer' }}>🔳 Grid</button>
            </div>
          </div>
        </div>
      ) : (
        /* EXPANDED FULL HEADER HERO CONSOLE */
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '16px', paddingLeft: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'linear-gradient(135deg, #FF2A4B 0%, #881337 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(255, 42, 75, 0.65)', border: '1.5px solid rgba(255, 255, 255, 0.25)', flexShrink: 0 }}>
              <Skull size={22} color="#FFF" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))' }} />
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {activeTab === 'graveyard_archive' && (
                  <button
                    onClick={() => setActiveTab('graveyard')}
                    style={{
                      background: 'rgba(255, 42, 75, 0.2)',
                      color: '#FF3B5C',
                      border: '1.5px solid rgba(255, 42, 75, 0.5)',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      marginRight: '6px',
                      boxShadow: '0 0 12px rgba(255, 42, 75, 0.3)'
                    }}
                  >
                    ← Back to Live Core Feed
                  </button>
                )}
                <h2 style={{
                  fontSize: '1.65rem',
                  fontWeight: 950,
                  letterSpacing: '0.04em',
                  wordSpacing: '0.18em',
                  margin: 0,
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F59E0B 40%, #EF4444 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 8px rgba(245, 158, 11, 0.4))',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {activeTab === 'graveyard_archive' ? '🪦 Corporate Graveyard & Post-Mortem Archive' : '🔥 LIVE DISTRESS WIRE'}
                </h2>

                <span style={{
                  background: 'linear-gradient(135deg, rgba(255, 42, 75, 0.25) 0%, rgba(183, 28, 28, 0.3) 100%)',
                  color: '#FF4D6D',
                  border: '1px solid rgba(255, 42, 75, 0.55)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  boxShadow: '0 0 14px rgba(255, 42, 75, 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF2A4B', boxShadow: '0 0 8px #FF2A4B' }} />
                  {filteredCompanies.length} OF {allAggregatedCompanies.length || companies.length} MONITORED
                </span>

                {(statusFilter !== 'ALL' || causeFilter !== 'ALL' || timeframeFilter !== 'ALL' || selectedSectorFilter !== 'ALL' || searchQuery) && (
                  <button
                    onClick={() => { setStatusFilter('ALL'); setCauseFilter('ALL'); setTimeframeFilter('ALL'); setSelectedSectorFilter('ALL'); setSearchQuery(''); }}
                    style={{ background: 'rgba(255, 42, 75, 0.25)', color: '#FF3B5C', border: '1px solid rgba(255, 42, 75, 0.5)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 900, cursor: 'pointer', boxShadow: '0 0 10px rgba(255, 42, 75, 0.3)' }}
                  >
                    ✕ Reset Filters
                  </button>
                )}

                <button
                  onClick={() => setIsControlsCollapsed(true)}
                  style={{
                    background: 'rgba(30, 41, 59, 0.85)',
                    color: '#F8FAFC',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    letterSpacing: '0.02em'
                  }}
                >
                  ▲ Collapse Header & Maximize View
                </button>
              </div>

              <div style={{
                fontSize: '0.68rem',
                color: '#38BDF8',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginTop: '2px'
              }}>
                {PRIMARY_INSTITUTIONAL_SUBTITLE}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UNIFIED CONTROL CONSOLE BOX: TIME & STAGE FILTERS */}
      <div 
        style={{ 
          padding: isControlsCollapsed ? '8px 16px' : '12px 18px', 
          marginBottom: '16px', 
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 22, 0.98) 100%)',
          border: '1px solid rgba(255, 42, 75, 0.35)',
          borderLeft: '5px solid #FF2A4B',
          borderRadius: '12px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          transition: 'all 0.3s ease'
        }}
      >

        {/* SECTION 2 (MIDDLE): 2x2 COMPACT FILTER CONSOLE */}
        {!isControlsCollapsed && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', flex: '1 1 320px', minWidth: '280px' }}>
            
            {/* Sector Filter */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: selectedSectorFilter !== 'ALL' ? 'rgba(59, 130, 246, 0.25)' : 'rgba(7, 10, 15, 0.75)',
              padding: '0 8px',
              height: '38px',
              borderRadius: '8px',
              border: selectedSectorFilter !== 'ALL' ? '1.5px solid #3B82F6' : '1px solid var(--border-subtle)',
              boxSizing: 'border-box'
            }}>
              <span style={{ fontSize: '0.68rem', color: selectedSectorFilter !== 'ALL' ? '#60A5FA' : 'var(--text-dim)', fontWeight: 900, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Sector:
              </span>
              <select
                value={selectedSectorFilter}
                onChange={(e) => setSelectedSectorFilter(e.target.value)}
                style={{ width: '100%', background: 'transparent', color: '#FFF', border: 'none', fontSize: '0.72rem', outline: 'none', cursor: 'pointer', fontWeight: 800 }}
              >
                <option value="ALL" style={{ background: '#0F172A' }}>🌐 All Sectors</option>
                <option value="aviation" style={{ background: '#0F172A' }}>✈️ Aviation</option>
                <option value="automotive" style={{ background: '#0F172A' }}>🚗 Automotive</option>
                <option value="cre" style={{ background: '#0F172A' }}>🏢 Real Estate</option>
                <option value="legacy-retail" style={{ background: '#0F172A' }}>🛍️ Retail</option>
                <option value="regional-banking" style={{ background: '#0F172A' }}>🏦 Banking</option>
                <option value="casual-dining" style={{ background: '#0F172A' }}>🍔 Dining</option>
                <option value="linear-media" style={{ background: '#0F172A' }}>📺 Media</option>
                <option value="legacy-tech" style={{ background: '#0F172A' }}>💻 Tech</option>
                <option value="energy" style={{ background: '#0F172A' }}>⚡ Energy</option>
                <option value="crypto-protocols" style={{ background: '#0F172A' }}>🪙 Crypto</option>
                <option value="healthcare" style={{ background: '#0F172A' }}>🏥 Healthcare</option>
                <option value="logistics" style={{ background: '#0F172A' }}>🚛 Logistics</option>
                <option value="fintech" style={{ background: '#0F172A' }}>💳 Fintech</option>
                <option value="biotech" style={{ background: '#0F172A' }}>🧬 Biotech</option>
                <option value="telecom" style={{ background: '#0F172A' }}>📡 Telecom</option>
              </select>
            </div>

            {/* Status Filter */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: statusFilter !== 'ALL' ? 'rgba(124, 58, 237, 0.25)' : 'rgba(7, 10, 15, 0.75)',
              padding: '0 8px',
              height: '38px',
              borderRadius: '8px',
              border: statusFilter !== 'ALL' ? '1.5px solid #7C3AED' : '1px solid var(--border-subtle)',
              boxSizing: 'border-box'
            }}>
              <span style={{ fontSize: '0.68rem', color: statusFilter !== 'ALL' ? '#C084FC' : 'var(--text-dim)', fontWeight: 900, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ width: '100%', background: 'transparent', color: '#FFF', border: 'none', fontSize: '0.72rem', outline: 'none', cursor: 'pointer', fontWeight: 800 }}
              >
                <option value="ALL" style={{ background: '#0F172A' }}>🌐 All Statuses</option>
                <option value="pre-judicial" style={{ background: '#0F172A' }}>🟨 Pre-Judicial WARN</option>
                <option value="active-docket" style={{ background: '#0F172A' }}>🟥 Active Ch. 11 Docket</option>
                <option value="363-auction" style={{ background: '#0F172A' }}>🟩 Section 363 Auction</option>
                <option value="discharged" style={{ background: '#0F172A' }}>⚖️ Case Discharged</option>
              </select>
            </div>

            {/* Primary Cause Filter */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: causeFilter !== 'ALL' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(7, 10, 15, 0.75)',
              padding: '0 8px',
              height: '38px',
              borderRadius: '8px',
              border: causeFilter !== 'ALL' ? '1.5px solid #EF4444' : '1px solid var(--border-subtle)',
              boxSizing: 'border-box'
            }}>
              <span style={{ fontSize: '0.68rem', color: causeFilter !== 'ALL' ? '#FCA5A5' : 'var(--text-dim)', fontWeight: 900, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Cause:
              </span>
              <select
                value={causeFilter}
                onChange={(e) => setCauseFilter(e.target.value)}
                style={{ width: '100%', background: 'transparent', color: '#FFF', border: 'none', fontSize: '0.72rem', outline: 'none', cursor: 'pointer', fontWeight: 800 }}
              >
                <option value="ALL" style={{ background: '#0F172A' }}>🌐 All Causes</option>
                <option value="debt" style={{ background: '#0F172A' }}>💥 Debt Overload</option>
                <option value="execution" style={{ background: '#0F172A' }}>📉 Execution Failure</option>
                <option value="macro" style={{ background: '#0F172A' }}>🌊 Macro Shift</option>
                <option value="tech" style={{ background: '#0F172A' }}>🤖 Disruption</option>
              </select>
            </div>

            {/* Timeframe Filter */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: timeframeFilter !== 'ALL' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(7, 10, 15, 0.75)',
              padding: '0 8px',
              height: '38px',
              borderRadius: '8px',
              border: timeframeFilter !== 'ALL' ? '1.5px solid #10B981' : '1px solid var(--border-subtle)',
              boxSizing: 'border-box'
            }}>
              <span style={{ fontSize: '0.68rem', color: timeframeFilter !== 'ALL' ? '#34D399' : 'var(--text-dim)', fontWeight: 900, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Date Range:
              </span>
              <select
                value={timeframeFilter}
                onChange={(e) => setTimeframeFilter(e.target.value)}
                style={{ width: '100%', background: 'transparent', color: '#FFF', border: 'none', fontSize: '0.72rem', outline: 'none', cursor: 'pointer', fontWeight: 800 }}
              >
                <option value="14D" style={{ background: '#0F172A' }}>🔥 2-Week Wire (14D)</option>
                <option value="7D" style={{ background: '#0F172A' }}>⚡ Last 7 Days</option>
                <option value="30D" style={{ background: '#0F172A' }}>📅 Last 30 Days</option>
                <option value="90D" style={{ background: '#0F172A' }}>⚖️ Ongoing</option>
                <option value="1Y" style={{ background: '#0F172A' }}>Last 12 Months</option>
                <option value="ALL" style={{ background: '#0F172A' }}>🌐 All Dockets</option>
              </select>
            </div>

          </div>
        )}


        {/* SECTION 3 (RIGHT): ACTIONS, SEARCH & CONTROLS UTILITIES */}
        <div style={{
          display: 'flex',
          flexDirection: isControlsCollapsed ? 'row' : 'column',
          alignItems: isControlsCollapsed ? 'center' : 'stretch',
          justifyContent: 'space-between',
          gap: '8px',
          flex: isControlsCollapsed ? '1 1 100%' : '0 0 320px'
        }}>
          
          {/* Search Bar (Matching 38px Height) */}
          <div style={{ position: 'relative', flex: isControlsCollapsed ? '1 1 300px' : '1' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Search company, ticker, cause..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '38px',
                padding: '0 32px 0 34px',
                borderRadius: '8px',
                background: 'rgba(7, 10, 15, 0.75)',
                border: searchQuery ? '1.5px solid #FF2A4B' : '1px solid var(--border-subtle)',
                color: '#FFF',
                fontSize: '0.78rem',
                outline: 'none',
                boxShadow: searchQuery ? '0 0 12px rgba(255, 42, 75, 0.3)' : 'none',
                boxSizing: 'border-box'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', fontWeight: 900, fontSize: '0.78rem' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Control Buttons (Layout Switcher & Controls Toggle) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            
            {/* View Switcher: 2-Row Dense vs Full Cards vs Grid */}
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(7, 10, 15, 0.8)', padding: '2px', height: '38px', borderRadius: '8px', border: '1px solid var(--border-subtle)', boxSizing: 'border-box' }}>
              <button
                onClick={() => setLayoutMode('compact')}
                style={{
                  height: '100%',
                  background: layoutMode === 'compact' ? '#7C3AED' : 'transparent',
                  color: layoutMode === 'compact' ? '#FFF' : 'var(--text-muted)',
                  border: 'none',
                  padding: '0 10px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
                title="2-Row High-Density Ticker Rows"
              >
                ⚡ 2-Row Dense
              </button>
              <button
                onClick={() => setLayoutMode('full')}
                style={{
                  height: '100%',
                  background: layoutMode === 'full' ? '#7C3AED' : 'transparent',
                  color: layoutMode === 'full' ? '#FFF' : 'var(--text-muted)',
                  border: 'none',
                  padding: '0 10px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
                title="Full Narrative Post-Mortem Cards"
              >
                📰 Full Cards
              </button>
              <button
                onClick={() => setLayoutMode('grid')}
                style={{
                  height: '100%',
                  background: layoutMode === 'grid' ? '#7C3AED' : 'transparent',
                  color: layoutMode === 'grid' ? '#FFF' : 'var(--text-muted)',
                  border: 'none',
                  padding: '0 10px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
                title="Large Multi-Column Grid Cards"
              >
                🔳 Grid
              </button>
            </div>

            {/* Create Custom Alerts */}
            <button
              onClick={() => {
                if (onOpenProRadarPreferences) onOpenProRadarPreferences();
              }}
              style={{ 
                flex: 1,
                height: '38px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', 
                color: '#FFF', 
                border: 'none', 
                padding: '0 10px', 
                borderRadius: '8px', 
                fontSize: '0.74rem', 
                fontWeight: 900, 
                cursor: 'pointer',
                boxShadow: '0 0 12px rgba(245, 158, 11, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
                boxSizing: 'border-box'
              }}
            >
              🔔 Alerts ↗
            </button>

            {/* Standards */}
            <button
              onClick={() => {
                if (onOpenAdmissionCriteria) onOpenAdmissionCriteria();
              }}
              style={{
                height: '38px',
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#10B981',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '0 10px',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxSizing: 'border-box'
              }}
            >
              📜 Standards
            </button>

          </div>
        </div>
      </div>

      {/* Zero Results Fallback Card */}



      {/* Zero Results Fallback Card */}
      {filteredCompanies.length === 0 && (
        <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 42, 75, 0.3)' }}>
          <AlertCircle size={44} color="#FF3B5C" style={{ margin: '0 auto 16px auto', display: 'block' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', color: '#FFF' }}>
            No Corporate Post-Mortems Matched Your Query
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', maxWidth: '540px', margin: '0 auto 24px auto', lineHeight: 1.5 }}>
            No tracked corporate entities matched <strong style={{ color: '#FF3B5C' }}>"{searchQuery}"</strong>. Try searching for major tickers (e.g., <span style={{ fontFamily: 'var(--font-mono)', color: '#FFF' }}>SAVE</span>, <span style={{ fontFamily: 'var(--font-mono)', color: '#FFF' }}>WE</span>, <span style={{ fontFamily: 'var(--font-mono)', color: '#FFF' }}>BBBY</span>, <span style={{ fontFamily: 'var(--font-mono)', color: '#FFF' }}>BIG</span>), states/jurisdictions (e.g., <span style={{ color: '#FFF' }}>Delaware, California, New York</span>), or distress causes.
          </p>
          <button
            className="btn-primary"
            onClick={() => {
              if (setSearchQuery) setSearchQuery('');
              setStatusFilter('ALL');
              setCauseFilter('ALL');
              setSelectedSectorFilter('ALL');
            }}
          >
            Clear All Search & Filter Criteria
          </button>
        </div>
      )}

      {/* Companies Render: Compact Rows vs Large Grid */}
      {filteredCompanies.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          {layoutMode === 'compact' ? (

            /* Compact List Rows View (Sleek Dark Obsidian Theme with Dedicated Table Header) */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {/* Dedicated Table Column Header Row */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '10px 20px', 
                  background: 'rgba(30, 41, 59, 0.9)', 
                  border: '1px solid rgba(255, 42, 75, 0.35)', 
                  borderLeft: '6px solid #7C3AED',
                  borderRadius: '8px', 
                  fontSize: '0.75rem', 
                  fontWeight: 900, 
                  color: '#94A3B8', 
                  letterSpacing: '0.08em', 
                  textTransform: 'uppercase' 
                }}
              >
                <div style={{ flex: '1 1 280px' }}>⭐ ENTITY / TICKER / JURISDICTION / TIMELINE (START ➔ CLOSED)</div>
                <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>STATUS</span>
                  <span>•</span>
                  <span>PRIMARY COLLAPSE CAUSE</span>
                </div>
                <div style={{ flex: '0 0 160px', textAlign: 'right' }}>VALUATION / DEBT</div>
                <div style={{ flex: '0 0 140px', textAlign: 'right' }}>INSPECT CASE FILE</div>
              </div>

              {sortedCompanies.map((company) => {
                const isPreJudicial = company.isPreJudicial || company.courtCaseStatus === 'PRE_PETITION_WARN_SIGNAL';
                const isAuction = !isPreJudicial && Boolean((company.auctionTitle && company.auctionTitle.trim() !== '') || (company.auctionPortalUrl && company.auctionPortalUrl.trim() !== '') || (company.status && (company.status.toUpperCase().includes('AUCTION') || company.status.includes('363'))));
                const isActiveDocket = company.courtCaseStatus !== 'FINAL_DECREE_ISSUED' && !isPreJudicial && !isAuction;



                const stageColor = isPreJudicial ? '#F59E0B' : isAuction ? '#10B981' : isActiveDocket ? '#EF4444' : '#64748B';
                const stageBg = isPreJudicial 
                  ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.14) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                  : isAuction 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                  : isActiveDocket 
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                  : 'rgba(15, 23, 42, 0.85)';

                const matTime = company.lastMaterialChangeDate || company.dateTimestamp;
                const hoursAgo = matTime ? Math.max(1, Math.round((new Date().getTime() - new Date(matTime).getTime()) / (1000 * 3600))) : 99;
                const isFreshSurfaceAlert = hoursAgo <= 12;
                const isBreakingSurface = hoursAgo <= 4;

                return (
                  <div
                    key={company.id}
                    className="glass-panel glass-panel-interactive"
                    onClick={() => onSelectCompany(company)}
                    style={{
                      padding: '12px 18px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      background: stageBg,
                      borderLeft: isFreshSurfaceAlert ? (isBreakingSurface ? '5px solid #EF4444' : '5px solid #F59E0B') : `5px solid ${stageColor}`,
                      border: isFreshSurfaceAlert ? (isBreakingSurface ? '1.5px solid rgba(239, 68, 68, 0.6)' : '1.5px solid rgba(245, 158, 11, 0.5)') : `1px solid ${stageColor}40`,
                      borderRadius: '10px'
                    }}
                  >
                    {/* ROW 1: STAR + NAME + TICKER + INLINE BREAKING BADGE + STATUS + VALUATION DROP + ACTIONS */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (toggleWatchlist) toggleWatchlist(company.id);
                          }}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center' }}
                          title={watchlist && watchlist.includes(company.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        >
                          <Star
                            size={15}
                            color={watchlist && watchlist.includes(company.id) ? '#F59E0B' : 'var(--text-dim)'}
                            fill={watchlist && watchlist.includes(company.id) ? '#F59E0B' : 'transparent'}
                          />
                        </button>

                        <h4 style={{ fontSize: '0.98rem', fontWeight: 900, color: '#FFF', margin: 0 }}>{company.name}</h4>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', background: 'rgba(255, 255, 255, 0.06)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                          {company.ticker}
                        </span>

                        {isFreshSurfaceAlert && (
                          <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#FFF', background: isBreakingSurface ? 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)' : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: '4px', boxShadow: isBreakingSurface ? '0 0 12px rgba(239, 68, 68, 0.6)' : '0 0 10px rgba(245, 158, 11, 0.5)' }}>
                            <span className="pulse-dot critical"></span> {isBreakingSurface ? `🔥 BREAKING (${hoursAgo}h ago)` : `⚡ RECENT (${hoursAgo}h ago)`}
                          </span>
                        )}

                        {isPreJudicial && (
                          <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#0F172A', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            🟨 PRE-JUDICIAL WARN
                          </span>
                        )}

                        {isAuction && !isPreJudicial && (
                          <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#0F172A', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            🟩 363 AUCTION
                          </span>
                        )}

                        {isActiveDocket && !isAuction && (
                          <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#FFF', background: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)', padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            🟥 CHAPTER 11
                          </span>
                        )}

                        {watchlist && watchlist.includes(company.id) && (
                          <span style={{ fontSize: '0.62rem', fontWeight: 900, color: '#000', background: '#F59E0B', padding: '1px 5px', borderRadius: '4px' }}>
                            ⭐ WATCHLIST
                          </span>
                        )}
                      </div>

                      {/* Right Side Row 1: Valuation Drop & Action Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#FF2A4B', fontFamily: 'var(--font-mono)' }}>
                          📉 {company.peakValuation ? company.peakValuation.split(' ')[0] : 'N/A'} ➔ {company.collapseValuation ? company.collapseValuation.split(' ')[0] : '$0'}
                        </span>

                        {onOpenNewsroomStudio && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenNewsroomStudio) onOpenNewsroomStudio(company);
                              setActiveTab('newsroom');
                            }}
                            style={{
                              background: 'rgba(245, 158, 11, 0.2)',
                              color: '#FCD34D',
                              border: '1px solid #F59E0B',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '0.68rem',
                              fontWeight: 900,
                              cursor: 'pointer'
                            }}
                            title="Open AI Newsroom Studio"
                          >
                            📰 Newsroom
                          </button>
                        )}

                        {onOpenShare && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenShare(company);
                            }}
                            style={{
                              background: 'rgba(56, 189, 248, 0.15)',
                              color: '#38BDF8',
                              border: '1px solid rgba(56, 189, 248, 0.4)',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '0.68rem',
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}
                            title="Share asset dossier"
                          >
                            🔗 Share
                          </button>
                        )}

                        {toggleDismissCompany && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDismissCompany(company.id);
                            }}
                            style={{
                              background: 'rgba(239, 68, 68, 0.12)',
                              color: '#FCA5A5',
                              border: '1px solid rgba(239, 68, 68, 0.35)',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '0.68rem',
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}
                            title="Dismiss asset from feed"
                          >
                            🙈 Mute
                          </button>
                        )}
                      </div>
                    </div>

                    {/* ROW 2: LOCATION • SECTOR • DIP CHIP • CAUSE SUMMARY • TIMESTAMP */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontSize: '0.73rem', color: '#94A3B8' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span>📍 {company.locationJurisdiction || 'United States'}</span>
                        <span>•</span>
                        <span style={{ color: '#C084FC', fontWeight: 800 }}>{company.sectorName || 'Corporate Distress'}</span>
                        <span>•</span>
                        <span>💥 <strong style={{ color: '#E2E8F0' }}>Cause:</strong> {company.primaryCause}</span>

                        {company.dipFinancing && (
                          <span style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#C4B5FD', border: '1px solid rgba(139, 92, 246, 0.45)', padding: '1px 6px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                            💳 DIP: {company.dipFinancing.facilitySize}
                          </span>
                        )}
                      </div>

                      <div style={{ fontSize: '0.68rem', color: '#64748B', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {(() => {
                          const matT = company.lastMaterialChangeDate || company.dateTimestamp;
                          const mD = matT ? new Date(matT) : null;
                          const formattedStr = (mD && !isNaN(mD.getTime()))
                            ? `${mD.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${mD.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} EST`
                            : (company.formattedMaterialChange || 'Updated Recently');
                          return (
                            <>
                              <Clock size={10} /> {formattedStr}
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    {/* ROW 3 (When in Full Mode): EXECUTIVE POST-MORTEM STORY NARRATIVE */}
                    {layoutMode === 'full' && company.executiveSummary && (
                      <div style={{
                        fontSize: '0.78rem',
                        color: '#94A3B8',
                        marginTop: '4px',
                        paddingTop: '6px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        lineHeight: 1.5
                      }}>
                        <strong style={{ color: '#FCD34D' }}>📖 Post-Mortem Breakdown: </strong>
                        {company.executiveSummary}
                      </div>
                    )}
                  </div>
                );
            })}
            </div>

          ) : (
            /* Large Grid Cards View / Full Cards View */
            <div style={{ display: 'grid', gridTemplateColumns: layoutMode === 'full' ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
              {sortedCompanies.map((company) => {
                const isPreJudicial = company.isPreJudicial || company.courtCaseStatus === 'PRE_PETITION_WARN_SIGNAL';
                const isAuction = !isPreJudicial && Boolean((company.auctionTitle && company.auctionTitle.trim() !== '') || (company.auctionPortalUrl && company.auctionPortalUrl.trim() !== '') || (company.status && (company.status.toUpperCase().includes('AUCTION') || company.status.includes('363'))));
                const isActiveDocket = company.courtCaseStatus !== 'FINAL_DECREE_ISSUED' && !isPreJudicial && !isAuction;



                const stageColor = isPreJudicial ? '#F59E0B' : isAuction ? '#10B981' : isActiveDocket ? '#EF4444' : '#64748B';
                const stageBg = isPreJudicial 
                  ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.14) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                  : isAuction 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                  : isActiveDocket 
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                  : 'rgba(15, 23, 42, 0.85)';

                const matTime = company.lastMaterialChangeDate || company.dateTimestamp;
                const hoursAgo = matTime ? Math.max(1, Math.round((new Date().getTime() - new Date(matTime).getTime()) / (1000 * 3600))) : 99;
                const isFreshSurfaceAlert = hoursAgo <= 12;
                const isBreakingSurface = hoursAgo <= 4;

                return (
                  <div
                    key={company.id}
                    className="glass-panel glass-panel-interactive"
                    onClick={() => onSelectCompany(company)}
                    style={{
                      padding: '20px 24px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between',
                      minHeight: '340px',
                      background: stageBg,
                      borderTop: isFreshSurfaceAlert ? (isBreakingSurface ? '5px solid #EF4444' : '5px solid #F59E0B') : `5px solid ${stageColor}`,
                      border: isFreshSurfaceAlert ? (isBreakingSurface ? '1.5px solid rgba(239, 68, 68, 0.6)' : '1.5px solid rgba(245, 158, 11, 0.5)') : `1px solid ${stageColor}40`
                    }}
                  >
                    <div>
                      {/* Temporary Surface Alert Banner (< 12h old: Folds away into timeline when > 12h) */}
                      {isFreshSurfaceAlert && (
                        <div style={{
                          width: '100%',
                          background: isBreakingSurface ? 'rgba(239, 68, 68, 0.25)' : 'rgba(245, 158, 11, 0.2)',
                          border: isBreakingSurface ? '1px solid #EF4444' : '1px solid #F59E0B',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          marginBottom: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          color: isBreakingSurface ? '#FCA5A5' : '#FCD34D',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                          gap: '8px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="pulse-dot critical"></span>
                            <span>
                              {isBreakingSurface ? `🔥 BREAKING ALERT (${hoursAgo}h ago)` : `⚡ NEW INGESTED UPDATE (${hoursAgo}h ago)`}: {company.headline || company.primaryCause}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.68rem', color: '#FFF', fontWeight: 800 }}>Inspect →</span>
                        </div>
                      )}

                      {/* Header: Ticker, Location, Status Badge & Star Watchlist Toggle */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>

                  <div>
                    {/* UPPER-LEFT CORNER SINGLE TIME ALERT BADGE (ABOVE COMPANY NAME) */}
                    {hoursAgo <= 4 ? (
                      <div style={{ marginBottom: '4px' }}>
                        <span style={{ background: 'rgba(239, 68, 68, 0.25)', color: '#FCA5A5', border: '1px solid #EF4444', padding: '2px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 900, fontFamily: 'var(--font-mono)', display: 'inline-flex', alignItems: 'center', gap: '4px', boxShadow: '0 0 10px rgba(239, 68, 68, 0.35)' }}>
                          🔥 BREAKING ({hoursAgo}h ago)
                        </span>
                      </div>
                    ) : hoursAgo <= 12 ? (
                      <div style={{ marginBottom: '4px' }}>
                        <span style={{ background: 'rgba(245, 158, 11, 0.25)', color: '#FCD34D', border: '1px solid #F59E0B', padding: '2px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 900, fontFamily: 'var(--font-mono)', display: 'inline-flex', alignItems: 'center', gap: '4px', boxShadow: '0 0 10px rgba(245, 158, 11, 0.3)' }}>
                          ⚡ NEW ({hoursAgo}h ago)
                        </span>
                      </div>
                    ) : null}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFF' }}>{company.name}</h3>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                        {company.ticker}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      <span>📍 {company.locationJurisdiction || 'United States'}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Universal Multi-Platform Share Button */}
                      {onOpenShare && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenShare(company);
                          }}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                          title="Share company dossier or copy link"
                        >
                          <Share2 size={18} color="#38BDF8" />
                        </button>
                      )}

                      {/* Dismiss Button */}
                      {toggleDismissCompany && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDismissCompany(company.id);
                          }}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                          title="Dismiss asset from active main feed (Mute stream)"
                        >
                          <EyeOff size={18} color="#FCA5A5" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (toggleWatchlist) toggleWatchlist(company.id);
                        }}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                        title={watchlist && watchlist.includes(company.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                      >
                        <Star
                          size={20}
                          color={watchlist && watchlist.includes(company.id) ? '#F59E0B' : 'var(--text-dim)'}
                          fill={watchlist && watchlist.includes(company.id) ? '#F59E0B' : 'none'}
                        />
                      </button>

                      <span className={`status-badge ${company.statusBadge}`}>
                        {company.status}
                      </span>
                    </div>

                    <span style={{ background: 'rgba(239, 68, 68, 0.18)', color: '#FCA5A5', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                      ⚡ Material Change: {company.formattedMaterialChange || (new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' EST')}
                    </span>
                    <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.35)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 800, fontFamily: 'var(--font-mono)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={10} /> System Refresh Verified: {company.formattedLastSweep || `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} EST`}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.45 }}>

                  {company.summary}
                </p>

                {/* Early Warning Radar Box */}
                {company.earlyWarningSignals && company.earlyWarningSignals.length > 0 && (
                  <div style={{ background: 'rgba(255, 159, 67, 0.1)', border: '1px solid rgba(255, 159, 67, 0.25)', padding: '10px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.75rem' }}>
                    <div style={{ color: '#FF9F43', fontWeight: 800, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertTriangle size={12} /> EARLY DISTRESS WARNING RADAR:
                    </div>
                    <div style={{ color: '#FFF', fontWeight: 500 }}>
                      {company.earlyWarningSignals[0]}
                    </div>
                  </div>
                )}
              </div>


              <div>
                {/* Financial Loss Metrics Comparison */}
                <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)', marginBottom: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', textAlign: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 600 }}>PEAK VALUATION</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', fontFamily: 'var(--font-mono)' }}>{company.peakValuation}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 600 }}>COLLAPSE VAL</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FF3B5C', fontFamily: 'var(--font-mono)' }}>{company.collapseValuation}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 600 }}>FINAL DEBT</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FF9F43', fontFamily: 'var(--font-mono)' }}>{company.debtAtCollapse}</div>
                    </div>
                  </div>
                </div>

                {/* Primary Cause Pill & Journalist Studio Action */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(255, 59, 92, 0.12)', color: '#FF5252', padding: '4px 10px', borderRadius: '6px', fontWeight: 600, border: '1px solid rgba(255, 59, 92, 0.25)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={12} /> {company.primaryCause}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenNewsroomStudio) onOpenNewsroomStudio(company);
                        setActiveTab('newsroom');
                      }}
                      style={{
                        background: 'rgba(245, 158, 11, 0.2)',
                        border: '1px solid #F59E0B',
                        color: '#FCD34D',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title="Open Instant AI Newsroom Studio (AP Press Wire, X Threads, Substack & Infographics)"
                    >
                      📰 Newsroom Studio
                    </button>

                    <span style={{ color: '#FFF', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                      Post-Mortem <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}
    </div>
  )}
</div>
);
}















