import React, { useState } from 'react';
import { 
  Building2, Filter, ArrowLeft, Search, ChevronRight, Share2, Tag, MapPin, DollarSign, Clock, 
  ShieldAlert, Sparkles, Check, FileText, Star, Edit3, Download, ExternalLink, RefreshCw, Folder, Bookmark
} from 'lucide-react';
import sub10mCatalog from '../data/sub10m_companies.json';
import FullScreenAIEditorModal from './FullScreenAIEditorModal';
import BCCCitationWrapperModal from './BCCCitationWrapperModal';
import ExecutiveYouTubeShareModal from './ExecutiveYouTubeShareModal';
import { syncPacerSubchapterVFeed, PACER_RSS_DISTRICTS } from '../utils/pacerRssPipeline';

export default function Sub10mRadar({ watchlist = [], toggleWatchlist, onSelectCompany, onGoBack, onOpenShare }) {
  // Option B PACER RSS Sync State
  const [isPacerSyncing, setIsPacerSyncing] = useState(false);
  const [pacerSyncStatus, setPacerSyncStatus] = useState('🟢 PACER RSS ACTIVE • 7 DISTRICTS LIVE ($0.00)');

  // Reactive Catalog State initialized from sub10mCatalog + LocalStorage Hydration
  const [catalogList, setCatalogList] = useState(() => {
    try {
      const saved = localStorage.getItem('bc_sub10m_catalog');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return sub10mCatalog;
  });

  // Target Selected Company State
  const [selectedTargetCompany, setSelectedTargetCompany] = useState(catalogList[0] || sub10mCatalog[0] || {
    id: 'sub10m-001',
    name: 'Redline Cargo Express LLC',
    ticker: 'SUB10M',
    locationJurisdiction: 'Dallas, TX Court',
    debtAtCollapse: '$4.2 Million',
    collapseValuation: '$1.8 Million',
    assetLiquidationBadge: '🚚 24 Freight Fleet Tractors & Trailers',
    summary: 'Texas regional logistics carrier filed Subchapter V small business reorganization following fuel price hikes and lost broker contracts.',
    statusBadge: 'SUBCHAPTER_V'
  });

  const handleTriggerPacerSync = async () => {
    setIsPacerSyncing(true);
    setPacerSyncStatus('⚡ SYNCING & HYDRATING PACER RSS ENDPOINTS...');
    const res = await syncPacerSubchapterVFeed();

    if (res && res.items && res.items.length > 0) {
      // Hydrate new items into state & deduplicate
      const uniqueMap = new Map();
      [...res.items, ...catalogList].forEach(item => uniqueMap.set(item.id, item));
      const hydratedList = Array.from(uniqueMap.values());
      setCatalogList(hydratedList);
      try {
        localStorage.setItem('bc_sub10m_catalog', JSON.stringify(hydratedList));
      } catch (e) {}
      
      // Auto-select latest hydrated item
      if (res.items[0]) {
        setSelectedTargetCompany(res.items[0]);
      }
    }

    setIsPacerSyncing(false);
    setPacerSyncStatus(`🟢 HYDRATION COMPLETE (${res.districtCount} DISTRICTS • ${res.ingestedCount} DOSSIERS LIVE)`);
    setTimeout(() => {
      setPacerSyncStatus('🟢 PACER RSS ACTIVE • 7 DISTRICTS LIVE ($0.00)');
    }, 4000);
  };

  const [selectedDebtFilter, setSelectedDebtFilter] = useState('ALL');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('ALL');
  const [selectedAssetFilter, setSelectedAssetFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedShareId, setCopiedShareId] = useState(null);

  // Active Desk Switcher State
  const [activeDeskTab, setActiveDeskTab] = useState('radar'); // 'radar' | 'auctions' | 'citation' | 'dossier'

  // Modal States
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [isCitationModalOpen, setIsCitationModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Compute KPI Summary Stats
  const totalFilings = catalogList.length;
  const subchapterVCount = catalogList.filter(c => c.status === 'SUBCHAPTER_V').length;

  // Filter Logic
  const filteredList = catalogList.filter(c => {
    if (selectedDebtFilter !== 'ALL' && c.debtRangeCategory !== selectedDebtFilter) return false;
    if (selectedRegionFilter !== 'ALL' && c.regionalZone !== selectedRegionFilter) return false;
    if (selectedAssetFilter !== 'ALL' && c.assetLiquidationType !== selectedAssetFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const name = (c.name || '').toLowerCase();
      const summary = (c.summary || '').toLowerCase();
      const cause = (c.primaryCause || '').toLowerCase();
      const badge = (c.assetLiquidationBadge || '').toLowerCase();
      return name.includes(q) || summary.includes(q) || cause.includes(q) || badge.includes(q);
    }
    return true;
  });

  // Export CSV Helper
  const handleExportCSV = () => {
    let csv = `Name,Location,Debt,AssetBadge,Status,Summary\n`;
    filteredList.forEach(c => {
      csv += `"${c.name}","${c.locationJurisdiction}","${c.debtAtCollapse}","${c.assetLiquidationBadge}","${c.status}","${c.summary.replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sub10M_Regional_Radar_Export.csv`;
    a.click();
  };

  // Trojan Horse 1-Click Share Helper
  const handleTrojanShareX = (company, e) => {
    if (e) e.stopPropagation();
    const targetComp = company || selectedTargetCompany;
    const deepLinkUrl = typeof window !== 'undefined' ? `${window.location.origin}/?company=${targetComp.id}&ref=SUB10M` : `https://businesscollapse.com/?company=${targetComp.id}&ref=SUB10M`;
    
    let nicheHashtags = '#SubchapterV #Bankruptcy #Liquidation';
    if (targetComp.assetLiquidationType === 'FLEET_TRUCKS') nicheHashtags = '#Trucking #FreightFleets #TruckAuction #SubchapterV';
    if (targetComp.assetLiquidationType === 'KITCHEN_EQUIPMENT') nicheHashtags = '#RestaurantOwners #KitchenAuction #Franchise #ResellerCommunity';
    if (targetComp.assetLiquidationType === 'RETAIL_LEASES') nicheHashtags = '#CommercialRealEstate #CRE #LeaseRejection #Retail';

    const tweetText = encodeURIComponent(`🚨 SUB-$10M REGIONAL LIQUIDATION: ${targetComp.name} — ${targetComp.assetLiquidationBadge}.\n\nFull court dossier & auction specs on @BusinessCollapse:\n${deepLinkUrl}\n\n${nicheHashtags}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: '#040711',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      color: '#F8FAFC',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* 1. TOP COMMAND STRIP */}
      <div style={{
        padding: '12px 24px',
        background: 'rgba(9, 13, 22, 0.98)',
        borderBottom: '1px solid rgba(168, 85, 247, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Branding & Workstation Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onGoBack && (
            <button
              onClick={onGoBack}
              style={{
                background: 'rgba(255, 42, 75, 0.25)',
                color: '#FF3B5C',
                border: '1.5px solid rgba(255, 42, 75, 0.6)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 950,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 0 14px rgba(255, 42, 75, 0.35)',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              ← Exit Workstation
            </button>
          )}
          <div style={{
            background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
            color: '#FFF',
            fontWeight: 950,
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '4px',
            letterSpacing: '0.06em'
          }}>
            WORKSTATION RADAR DNA
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#FFF' }}>
            SUB-$10M SUBCHAPTER V RADAR — {selectedTargetCompany.name} ({selectedTargetCompany.ticker || 'SUB10M'})
          </span>
        </div>

        {/* Action Buttons Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Option B Status Badge */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#34D399',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontWeight: 900,
            fontFamily: 'monospace'
          }}>
            {pacerSyncStatus}
          </div>

          {/* Sync PACER RSS Option B Button */}
          <button
            onClick={handleTriggerPacerSync}
            disabled={isPacerSyncing}
            style={{
              background: 'rgba(56, 189, 248, 0.2)',
              color: '#38BDF8',
              border: '1px solid #38BDF8',
              padding: '7px 14px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 900,
              cursor: isPacerSyncing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={13} className={isPacerSyncing ? 'spin' : ''} />
            <span>{isPacerSyncing ? 'Syncing PACER...' : 'Sync PACER RSS ($0.00)'}</span>
          </button>

          <button
            onClick={handleExportCSV}
            style={{
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#34D399',
              border: '1px solid #10B981',
              padding: '7px 14px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Download size={13} />
            <span>Export Sub-$10M (.CSV)</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
              color: '#FFF',
              border: 'none',
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 950,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 16px rgba(168, 85, 247, 0.4)'
            }}
          >
            <Share2 size={14} />
            <span>BOOM Trojan Share</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN WORKSPACE CONTAINER */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* LEFT COLUMN: ORGANIZER SIDEBAR (340px) */}
        <div style={{
          width: '340px',
          flexShrink: 0,
          background: 'rgba(9, 13, 22, 0.98)',
          borderRight: '1px solid rgba(168, 85, 247, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          gap: '20px',
          overflowY: 'auto'
        }}>
          
          {/* Target Sub-$10M Entity Selector */}
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 900, color: '#C084FC', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
              🎯 Target Sub-$10M Entity Selector
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {catalogList.slice(0, 8).map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedTargetCompany(c);
                    if (onSelectCompany) onSelectCompany(c);
                  }}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: selectedTargetCompany.id === c.id ? '1.5px solid #A855F7' : '1px solid rgba(255,255,255,0.1)',
                    background: selectedTargetCompany.id === c.id ? 'rgba(168, 85, 247, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                    color: '#FFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontWeight: 900, fontSize: '0.85rem' }}>{c.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#CBD5E1', display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    <span>📍 {c.locationJurisdiction || 'US Court'}</span>
                    <span style={{ color: '#C084FC', fontWeight: 900 }}>{c.debtAtCollapse}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filters Console */}
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#C084FC', textTransform: 'uppercase' }}>
              🔍 Radar Filters
            </div>

            {/* Debt Filter */}
            <div>
              <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Debt Tier:</span>
              <select
                value={selectedDebtFilter}
                onChange={(e) => setSelectedDebtFilter(e.target.value)}
                style={{ width: '100%', background: '#0F172A', color: '#FFF', border: '1px solid rgba(255,255,255,0.15)', padding: '6px 8px', borderRadius: '6px', fontSize: '0.75rem' }}
              >
                <option value="ALL">🌐 All Debt Sizes</option>
                <option value="2M_5M">💵 $2M - $5M Debt</option>
                <option value="5M_10M">💰 $5M - $10M Debt</option>
              </select>
            </div>

            {/* U.S. State & Territory Filter */}
            <div>
              <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>U.S. State / Territory:</span>
              <select
                value={selectedRegionFilter}
                onChange={(e) => setSelectedRegionFilter(e.target.value)}
                style={{ width: '100%', background: '#0F172A', color: '#FFF', border: '1px solid rgba(255,255,255,0.15)', padding: '6px 8px', borderRadius: '6px', fontSize: '0.75rem' }}
              >
                <option value="ALL">📍 All 50 States & U.S. Territories</option>
                <optgroup label="🇺🇸 U.S. Federal Territories & Commonwealths">
                  <option value="PUERTO_RICO">🇵🇷 Puerto Rico (D.P.R.)</option>
                  <option value="US_VIRGIN_ISLANDS">🇻🇮 U.S. Virgin Islands (D.V.I.)</option>
                  <option value="GUAM">🇬🇺 Guam (D. Guam)</option>
                  <option value="NORTHERN_MARIANA">🇲🇵 Northern Mariana Islands (D.N.M.I.)</option>
                </optgroup>
                <optgroup label="🇺🇸 All 50 U.S. Judicial States">
                  <option value="TEXAS">🤠 Texas (S.D. / W.D. / N.D. Tex)</option>
                  <option value="OKLAHOMA">🌪️ Oklahoma (W.D. / N.D. Okla)</option>
                  <option value="FLORIDA">🌴 Florida (M.D. / S.D. Fla)</option>
                  <option value="CALIFORNIA">☀️ California (C.D. / N.D. Cal)</option>
                  <option value="NEW_YORK">🗽 New York (S.D. / E.D. N.Y.)</option>
                  <option value="MIDWEST">🏭 Illinois & Midwest (N.D. Ill.)</option>
                  <option value="DELAWARE">🏢 Delaware (D. Del.)</option>
                  <option value="GEORGIA">🍑 Georgia (N.D. Ga.)</option>
                  <option value="NORTH_CAROLINA">🌲 North Carolina (E.D. N.C.)</option>
                  <option value="OHIO">🌰 Ohio (N.D. Ohio)</option>
                  <option value="PENNSYLVANIA">🔔 Pennsylvania (E.D. Pa.)</option>
                  <option value="WASHINGTON">🌲 Washington (W.D. Wash.)</option>
                </optgroup>
              </select>
            </div>

            {/* Asset Type Filter */}
            <div>
              <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Asset Type:</span>
              <select
                value={selectedAssetFilter}
                onChange={(e) => setSelectedAssetFilter(e.target.value)}
                style={{ width: '100%', background: '#0F172A', color: '#FFF', border: '1px solid rgba(255,255,255,0.15)', padding: '6px 8px', borderRadius: '6px', fontSize: '0.75rem' }}
              >
                <option value="ALL">📦 All Liquidating Assets</option>
                <option value="FLEET_TRUCKS">🚚 Trucking & Commercial Fleets</option>
                <option value="KITCHEN_EQUIPMENT">🍳 Restaurant Kitchen Gear</option>
                <option value="RETAIL_LEASES">🏬 Strip Mall Retail Leases</option>
                <option value="HEAVY_MACHINERY">⚙️ Heavy CNC Machinery</option>
              </select>
            </div>
          </div>

          {/* PACER Court Evidence Vault Trigger */}
          <button
            onClick={() => setIsCitationModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(124, 58, 237, 0.3) 100%)',
              color: '#C084FC',
              border: '1.5px solid #A855F7',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 950,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 0 16px rgba(168, 85, 247, 0.3)'
            }}
          >
            <FileText size={16} />
            <span>📄 PACER Court PDF Vault</span>
          </button>

          {/* KPI Mini Box */}
          <div style={{ background: 'rgba(7, 10, 15, 0.85)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 800 }}>SUBCHAPTER V FILINGS</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 950, color: '#C084FC', marginTop: '2px' }}>
              {subchapterVCount} Active Cases
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MAIN STAGE & 4 DESKS */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#040711', overflow: 'hidden' }}>
          
          {/* DESK SWITCHER TABS STRIP */}
          <div style={{
            padding: '10px 24px',
            background: 'rgba(15, 23, 42, 0.95)',
            borderBottom: '1px solid rgba(168, 85, 247, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {[
              { id: 'radar', label: '🏬 Desk 1: Sub-$10M Subchapter V Radar' },
              { id: 'auctions', label: '🚚 Desk 2: Equipment & Fleet Auction Vault' },
              { id: 'citation', label: '📄 Desk 3: PACER Citation & Subchapter V Audit' },
              { id: 'dossier', label: '✍️ Desk 4: AI Sub-$10M Dossier Builder' }
            ].map(desk => (
              <button
                key={desk.id}
                onClick={() => setActiveDeskTab(desk.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: activeDeskTab === desk.id ? '1.5px solid #A855F7' : '1px solid rgba(255,255,255,0.1)',
                  background: activeDeskTab === desk.id ? 'rgba(168, 85, 247, 0.25)' : 'rgba(30, 41, 59, 0.5)',
                  color: activeDeskTab === desk.id ? '#C084FC' : '#94A3B8',
                  fontSize: '0.8rem',
                  fontWeight: 950,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {desk.label}
              </button>
            ))}
          </div>

          {/* ACTIVE DESK CONTENT STAGE */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
            
            {/* DESK 1: SUB-$10M RADAR CARD GRID */}
            {activeDeskTab === 'radar' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 950, color: '#FFF', margin: 0 }}>
                      📡 Tracked Regional Sub-$10M Filings & Liquidations
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
                      Subchapter V reorganizations (&lt; $7.5M debt limit), local fleet liquidations, and strip mall lease rejections.
                    </p>
                  </div>
                  <div style={{ position: 'relative', width: '260px' }}>
                    <Search size={14} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Search regional event..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ width: '100%', background: '#0F172A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '6px 12px 6px 34px', color: '#FFF', fontSize: '0.8rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
                  {filteredList.map((company) => (
                    <div
                      key={company.id}
                      onClick={() => {
                        setSelectedTargetCompany(company);
                        if (onSelectCompany) onSelectCompany(company);
                      }}
                      className="glass-panel glass-panel-interactive"
                      style={{
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justify: 'space-between',
                        border: selectedTargetCompany.id === company.id ? '2px solid #A855F7' : '1px solid rgba(168, 85, 247, 0.4)',
                        cursor: 'pointer',
                        borderRadius: '12px'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                          <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFF', margin: 0 }}>{company.name}</h3>
                            <div style={{ fontSize: '0.75rem', color: '#C084FC', fontWeight: 800, marginTop: '2px' }}>
                              📍 {company.locationJurisdiction}
                            </div>
                          </div>
                          <span style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#C084FC', border: '1px solid #A855F7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 900 }}>
                            {company.statusBadge}
                          </span>
                        </div>

                        <div style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1px solid rgba(168, 85, 247, 0.35)', padding: '10px 14px', borderRadius: '8px', margin: '12px 0' }}>
                          <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
                            TARGET LIQUIDATING ASSETS
                          </div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#FFF' }}>
                            {company.assetLiquidationBadge}
                          </div>
                        </div>

                        <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '14px' }}>
                          {company.summary}
                        </p>
                      </div>

                      <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTrojanShareX(company, e);
                          }}
                          style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#C084FC', border: '1px solid #A855F7', padding: '4px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Share2 size={12} /> Share Asset
                        </button>

                        <span style={{ color: '#FFF', fontWeight: 800, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                          Inspect File <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DESK 2: EQUIPMENT & FLEET AUCTION VAULT */}
            {activeDeskTab === 'auctions' && (
              <div style={{ background: 'rgba(15, 23, 42, 0.95)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 950, color: '#FFF', marginBottom: '8px' }}>
                  🚚 Equipment & Fleet Liquidation Auction Catalog
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Targeting commercial fleet tractors, CNC machinery, restaurant equipment, and retail store fixtures from Subchapter V proceedings.
                </p>

                <div style={{ background: 'rgba(7, 10, 15, 0.8)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.4)', marginBottom: '14px' }}>
                  <div style={{ fontWeight: 900, color: '#C084FC', fontSize: '0.95rem' }}>{selectedTargetCompany.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#FFF', marginTop: '4px' }}>Asset Category: {selectedTargetCompany.assetLiquidationBadge}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '4px' }}>Court Order: Subchapter V Section 1183 Liquidation Trustee Sale</div>
                </div>
              </div>
            )}

            {/* DESK 3: PACER CITATION & SUBCHAPTER V AUDIT */}
            {activeDeskTab === 'citation' && (
              <div style={{ background: 'rgba(15, 23, 42, 0.95)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 950, color: '#FFF', marginBottom: '8px' }}>
                  📄 Official Subchapter V Court Docket Verification
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Verified bankruptcy filings, trustee appointment orders, and debt limit compliance certificates.
                </p>

                <button
                  onClick={() => setIsCitationModalOpen(true)}
                  style={{ background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)', color: '#FFF', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 950, fontSize: '0.84rem', cursor: 'pointer' }}
                >
                  📄 Launch Verified PACER Court PDF Viewer
                </button>
              </div>
            )}

            {/* DESK 4: AI SUB-$10M DOSSIER BUILDER */}
            {activeDeskTab === 'dossier' && (
              <div style={{ background: 'rgba(15, 23, 42, 0.95)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 950, color: '#FFF', marginBottom: '8px' }}>
                  ✍️ AI Sub-$10M Regional Reorganization Dossier
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Synthesize Subchapter V debt restructuring plans, creditor claim recoveries, and asset auction terms.
                </p>

                <button
                  onClick={() => setIsEditorModalOpen(true)}
                  style={{ background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)', color: '#FFF', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 950, fontSize: '0.84rem', cursor: 'pointer' }}
                >
                  ✏️ Launch Master AI Rich-Text Editor Stage
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* MASTER AI EDITOR MODAL */}
      <FullScreenAIEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        initialText={`SUB-$10M REGIONAL REORGANIZATION DOSSIER\n\nTARGET ENTITY: ${selectedTargetCompany.name}\nDEBT AT FILING: ${selectedTargetCompany.debtAtCollapse}\nESTIMATED ASSETS: ${selectedTargetCompany.collapseValuation}\n\n1. SUBCHAPTER V REORGANIZATION SUMMARY:\n${selectedTargetCompany.summary}\n\n2. TARGET LIQUIDATING ASSETS:\n${selectedTargetCompany.assetLiquidationBadge}`}
        entity={selectedTargetCompany}
        format="wire"
        tone="bloomberg"
      />

      {/* PACER CITATION PDF VAULT MODAL */}
      <BCCCitationWrapperModal
        isOpen={isCitationModalOpen}
        onClose={() => setIsCitationModalOpen(false)}
        company={selectedTargetCompany}
      />

      {/* BOOM SHARE MODAL */}
      <ExecutiveYouTubeShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        company={selectedTargetCompany}
      />
    </div>
  );
}
