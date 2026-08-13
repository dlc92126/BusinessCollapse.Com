import React, { useState } from 'react';
import { 
  Gavel, DollarSign, Layers, ShieldCheck, Download, Share2, Sparkles, Send, Copy, 
  ExternalLink, Search, Filter, AlertTriangle, Clock, Briefcase, FileSpreadsheet, 
  Linkedin, Mail, ArrowRight, Upload, RefreshCw, CheckCircle2, ChevronRight, MapPin, Building2, Lock, Tag, Folder, Eye, Edit3, ShoppingBag, FileText, Star, TrendingUp
} from 'lucide-react';
import AuctionDirectory from './AuctionDirectory';
import ExecutiveYouTubeShareModal from './ExecutiveYouTubeShareModal';
import BCCCitationWrapperModal from './BCCCitationWrapperModal';
import FullScreenAIEditorModal from './FullScreenAIEditorModal';
import AuctionCompsSandbox from './AuctionCompsSandbox';

export default function Marketplace363Workstation({
  auctions = [],
  companies = [],
  watchlist = [],
  onToggleBookmark,
  onSelectAuction,
  onOpenDiligenceBrief,
  onSwitchWorkspace,
  onGoBack
}) {
  // Target Company / Auction Selection State (Left Sidebar DNA)
  const [selectedTargetCompany, setSelectedTargetCompany] = useState(companies[0] || {
    name: "Tupperware Brands Corporation",
    ticker: "TUPQ",
    debtAtCollapse: "$812 Million Total Liabilities",
    locationJurisdiction: "Wilmington, DE Court",
    primaryCause: "Debt Overhang & Direct Sales Decline"
  });

  // Workstation DNA State
  const [activeDesk, setActiveDesk] = useState(null); // null (Default 363 Asset Dossier Stage) | 'directory' (Desk 1) | 'apa' (Desk 2) | 'leases' (Desk 3) | 'bidmemo' (Desk 4)
  const [priorityTag, setPriorityTag] = useState('auction');
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [dismissedCompanyIds, setDismissedCompanyIds] = useState([]);
  const [aiBidPrompt, setAiBidPrompt] = useState('Draft a 363 Stalking Horse asset acquisition teaser detailing opening bid floor & break-up fee terms.');
  const [isGeneratingBid, setIsGeneratingBid] = useState(false);

  // Bid Memo Text State
  const [bidMemoText, setBidMemoText] = useState(
    `SECTION 363 ASSET ACQUISITION & AUCTION MEMORANDUM\n\nTARGET ENTITY: ${selectedTargetCompany.name} (${selectedTargetCompany.ticker || 'DEBT'})\nJURISDICTION: ${selectedTargetCompany.locationJurisdiction || 'Delaware Bankruptcy Court'}\n\n1. STALKING HORSE ASSET PURCHASE SUMMARY:\nStalking Horse Opening Bid Floor: $185,000,000 Cash + Assumed Liabilities\nBreak-Up Fee Protection: 3.0% ($5.55M) + $500,000 Expense Reimbursement\nOverbid Minimum Increment: $2,500,000\n\n2. ACQUISITION ASSET HIGHLIGHTS:\n• Global Brand Intellectual Property & Patents\n• Automated Distribution Facilities (35 Locations)\n• Free & Clear Title under 11 U.S.C. § 363(f)\n\n3. AUCTION REGISTRATION:\nCourt Webcast Bidding Portal requires 10% Escrow Deposit submitted to Chapter 11 Trustee 48 Hours prior to Auction Date.\n\nVerified Court Vault: https://businesscollapse.com/?company=${(selectedTargetCompany.ticker || 'tupq').toLowerCase()}&citation=docket001`
  );

  // Modals State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCitationWrapperOpen, setIsCitationWrapperOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

  // Saved Auction Bids Vault DNA State
  const [activeBidId, setActiveBidId] = useState(1);
  const [savedBids, setSavedBids] = useState([
    { id: 1, title: 'Tupperware IP & Global Brand Stalking Horse Bid', floor: '$185M', date: 'Today, 1:15 PM' },
    { id: 2, title: 'Red Lobster Restaurant Store Franchise Leases', floor: '$42M', date: 'Yesterday' }
  ]);
  const [savedStatusText, setSavedStatusText] = useState('');

  const handleSaveBid = () => {
    const newBid = {
      id: Date.now(),
      title: `${selectedTargetCompany.name} 363 Stalking Horse APA`,
      floor: '$120M Floor',
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSavedBids([newBid, ...savedBids]);
    setSavedStatusText('✓ Saved 363 auction bid to vault!');
    setTimeout(() => setSavedStatusText(''), 2500);
  };

  const handleExportCSV = () => {
    const headers = "Target Entity,Ticker,Auction Title,Stalking Horse Floor,Court Jurisdiction,Status\n";
    const row = `"${selectedTargetCompany.name}","${selectedTargetCompany.ticker || 'N/A'}","Section 363 Asset Auction","$185,000,000","${selectedTargetCompany.locationJurisdiction || 'DE Court'}","Auction Bidding Open"`;
    const blob = new Blob([headers + row], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${(selectedTargetCompany.ticker || 'AUCTION').toLowerCase()}_363_asset_bids.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#040711',
      color: '#F8FAFC',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>

      {/* TOP COMMAND STRIP (SHARED WORKSTATION DNA) */}
      <div style={{
        padding: '12px 24px',
        background: 'rgba(9, 13, 22, 0.98)',
        borderBottom: '1px solid rgba(236, 72, 153, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
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
            background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
            color: '#FFF',
            fontWeight: 950,
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '4px',
            letterSpacing: '0.06em'
          }}>
            WORKSTATION #4 DNA
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#FFF' }}>
            363 ASSET MARKETPLACE WORKSTATION — {selectedTargetCompany.name} ({selectedTargetCompany.ticker || 'DEBT'})
          </span>
        </div>



        {/* Action Buttons Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

          <button
            onClick={handleExportCSV}
            style={{
              background: 'rgba(56, 189, 248, 0.2)',
              color: '#38BDF8',
              border: '1px solid #38BDF8',
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
            <FileSpreadsheet size={13} />
            <span>Export Auction Bids (.CSV)</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
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
              boxShadow: '0 0 16px rgba(236, 72, 153, 0.4)'
            }}
          >
            <Share2 size={14} />
            <span>BOOM Share 363 Asset Wire</span>
          </button>
        </div>
      </div>

      {/* 4 CORE DESK SWITCHER TABS STRIP */}
      <div style={{
        padding: '10px 24px',
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        {[
          { id: null, label: '📋 363 Liquidation Asset Dossier (Overview)', icon: Building2, color: '#EC4899' },
          { id: 'directory', label: '🔨 Desk 1: Court 363 Auction Floor Directory', icon: Gavel, color: '#EC4899' },
          { id: 'apa', label: '📜 Desk 2: Stalking Horse APA Diligence Vault', icon: FileText, color: '#F59E0B' },
          { id: 'leases', label: '🏬 Desk 3: Section 365 Lease Rejection & Asset Catalog', icon: ShoppingBag, color: '#38BDF8' },
          { id: 'bidmemo', label: '✍️ Desk 4: AI Asset Acquisition Teaser & Bid Memo Builder', icon: Mail, color: '#10B981' },
          { id: 'comps', label: '📊 Desk 5: Historical 363 Valuation Comps & Realized Price Matrix', icon: TrendingUp, color: '#34D399' }
        ].map(desk => {
          const Icon = desk.icon;
          const isActive = activeDesk === desk.id;
          return (
            <button
              key={desk.id || 'overview'}
              onClick={() => setActiveDesk(desk.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.76rem',
                fontWeight: 950,
                cursor: 'pointer',
                border: isActive ? `1.5px solid ${desk.color}` : '1px solid rgba(255,255,255,0.1)',
                background: isActive ? `${desk.color}25` : 'rgba(30, 41, 59, 0.6)',
                color: isActive ? '#FFF' : '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Icon size={14} color={isActive ? desk.color : '#94A3B8'} />
              <span>{desk.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2-COLUMN MAIN WORKSPACE: LEFT ORGANIZER SUITE + RIGHT MAIN STAGE */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ---------------------------------------------------- */}
        {/* LEFT COLUMN: UNIFIED SHARED WORKSTATION SIDEBAR     */}
        {/* ---------------------------------------------------- */}
        <div style={{
          width: '340px',
          background: 'rgba(9, 13, 22, 0.98)',
          borderRight: '1px solid rgba(236, 72, 153, 0.3)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          overflowY: 'auto'
        }}>

          {/* Position #1: TOP-MOUNTED WORKSTATION ASSET SEARCH BAR */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#EC4899' }} />
            <input
              type="text"
              placeholder="Search 363 assets (e.g. fleet, aircraft, IP)..."
              value={assetSearchQuery}
              onChange={(e) => setAssetSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.95)',
                border: assetSearchQuery ? '1.5px solid #EC4899' : '1px solid rgba(236, 72, 153, 0.4)',
                color: '#FFF',
                padding: '6px 28px 6px 30px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                outline: 'none',
                boxShadow: assetSearchQuery ? '0 0 12px rgba(236, 72, 153, 0.4)' : 'none',
                boxSizing: 'border-box'
              }}
            />
            {assetSearchQuery && (
              <button
                onClick={() => setAssetSearchQuery('')}
                style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 900 }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Position #2: TARGET 363 ASSETS TRAY WITH DISMISS FUNCTIONALITY */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 950, color: '#F472B6', letterSpacing: '0.05em' }}>
                {assetSearchQuery ? '🔍 SEARCH RESULTS' : `⭐ SAVED WORKSPACE FAVORITES (${watchlist.length})`}
              </span>
              {dismissedCompanyIds.length > 0 && (
                <button
                  onClick={() => setDismissedCompanyIds([])}
                  style={{ fontSize: '0.62rem', color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Restore ({dismissedCompanyIds.length}) Hidden
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', flex: 1 }}>
              {companies
                .filter(comp => {
                  const compName = comp.name || comp.entityName || comp.companyName || 'Corporate Entity';
                  const compId = comp.id || comp.ticker || compName;
                  if (dismissedCompanyIds.includes(compId)) return false;
                  
                  if (assetSearchQuery) {
                    const q = assetSearchQuery.toLowerCase();
                    return (compName.toLowerCase().includes(q)) ||
                           (comp.ticker && comp.ticker.toLowerCase().includes(q)) ||
                           (comp.primaryCause && comp.primaryCause.toLowerCase().includes(q)) ||
                           (comp.locationJurisdiction && comp.locationJurisdiction.toLowerCase().includes(q)) ||
                           (comp.summary && comp.summary.toLowerCase().includes(q));
                  }

                  // STRICT FAVORITES + ACTIVE SELECTION ONLY (DUMP HUGE UNFILTERED LIST)
                  const isFav = comp.isBookmarked || (watchlist && (watchlist.includes(comp.id) || watchlist.includes(comp.ticker)));
                  const targetName = selectedTargetCompany.name || selectedTargetCompany.entityName || 'Corporate Entity';
                  const isSelected = (selectedTargetCompany.id && selectedTargetCompany.id === comp.id) || targetName === compName;
                  return isFav || isSelected;
                })
                .map(comp => {
                  const compName = comp.name || comp.entityName || comp.companyName || 'Corporate Entity';
                  const compId = comp.id || comp.ticker || compName;
                  const isFav = comp.isBookmarked || (watchlist && (watchlist.includes(comp.id) || watchlist.includes(comp.ticker)));
                  const targetName = selectedTargetCompany.name || selectedTargetCompany.entityName || 'Corporate Entity';
                  const isSelected = (selectedTargetCompany.id && selectedTargetCompany.id === comp.id) || targetName === compName;
                  return (
                    <div
                      key={compId}
                      onClick={() => {
                        setSelectedTargetCompany(comp);
                        setActiveDesk(null); // DIRECTLY DISPLAY FULL DOSSIER ON CANVAS BELOW TELEPORT MENU
                      }}
                      style={{
                        background: isSelected ? 'rgba(236, 72, 153, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                        border: isSelected ? '1.5px solid #EC4899' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '8px 10px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                      className="group"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 950, color: isSelected ? '#FFF' : '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {isFav && <Star size={11} color="#F59E0B" fill="#F59E0B" />}
                          {compName}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {/* EXPLICIT SAVE / FAVORITE BUTTON FOR SEARCHED AND SAVED ENTITIES */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onToggleBookmark) onToggleBookmark(compId);
                            }}
                            title={isFav ? "Remove from Favorites" : "Save to Workspace Favorites"}
                            style={{
                              background: isFav ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                              border: isFav ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.2)',
                              color: isFav ? '#FCD34D' : '#94A3B8',
                              borderRadius: '4px',
                              padding: '2px 6px',
                              fontSize: '0.62rem',
                              fontWeight: 900,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}
                          >
                            <Star size={9} color={isFav ? '#FCD34D' : '#94A3B8'} fill={isFav ? '#FCD34D' : 'none'} />
                            {isFav ? 'SAVED' : 'SAVE'}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDismissedCompanyIds([...dismissedCompanyIds, compId]);
                            }}
                            title="Dismiss from desk"
                            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 900, padding: '0 2px' }}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{comp.debtAtCollapse || '$500M+ Debt'} • {comp.locationJurisdiction || 'US Court'}</span>
                        <span style={{ fontSize: '0.6rem', fontWeight: 900, background: 'rgba(236,72,153,0.2)', color: '#F472B6', padding: '1px 4px', borderRadius: '3px' }}>
                          {comp.ticker || '363 BID'}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* RIGHT COLUMN: MAIN DESK STAGE                        */}
        {/* ---------------------------------------------------- */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          background: '#040711',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>

          {/* UNIVERSAL CROSS-WORKSPACE TELEPORT STRIP (PERFECT ON ALL DESKS) */}
          <div style={{
            background: 'rgba(9, 13, 22, 0.98)',
            border: '1.5px solid rgba(236, 72, 153, 0.4)',
            borderRadius: '12px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            gap: '12px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 950, color: '#F472B6' }}>
              <Sparkles size={16} color="#F472B6" />
              <span>CROSS-WORKSPACE TELEPORT ({selectedTargetCompany.name.toUpperCase()}):</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onSwitchWorkspace && onSwitchWorkspace('investor', selectedTargetCompany)}
                style={{ padding: '6px 12px', background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', border: '1px solid #10B981', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 900, cursor: 'pointer' }}
              >
                💳 Investor & Lender
              </button>
              <button
                onClick={() => onSwitchWorkspace && onSwitchWorkspace('creditor', selectedTargetCompany)}
                style={{ padding: '6px 12px', background: 'rgba(139, 92, 246, 0.2)', color: '#C084FC', border: '1px solid #8B5CF6', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 900, cursor: 'pointer' }}
              >
                🛡️ Creditor Action
              </button>
              <button
                onClick={() => onSwitchWorkspace && onSwitchWorkspace('headhunter', selectedTargetCompany)}
                style={{ padding: '6px 12px', background: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D', border: '1px solid #F59E0B', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 900, cursor: 'pointer' }}
              >
                👔 Headhunter Radar
              </button>
              <button
                onClick={() => onSwitchWorkspace && onSwitchWorkspace('media', selectedTargetCompany)}
                style={{ padding: '6px 12px', background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', border: '1px solid #38BDF8', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 900, cursor: 'pointer' }}
              >
                📰 Media & Press
              </button>
            </div>
          </div>

          {/* DEFAULT OVERVIEW: 363 LIQUIDATION ASSET DOSSIER STAGE */}
          {activeDesk === null && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Company Dossier Banner */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 22, 0.98) 100%)',
                border: '1.5px solid #EC4899',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                boxShadow: '0 12px 30px rgba(0,0,0,0.6)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 950, background: 'rgba(236, 72, 153, 0.2)', color: '#F472B6', padding: '3px 8px', borderRadius: '4px', border: '1px solid #EC4899' }}>
                      363 AUCTION ASSET DOSSIER
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                      PACER Docket #{selectedTargetCompany.courtCaseNumber || '26-10492'}
                    </span>
                  </div>
                  <h2 style={{ margin: '8px 0 2px 0', fontSize: '1.4rem', fontWeight: 950, color: '#FFF' }}>
                    {selectedTargetCompany.name || selectedTargetCompany.entityName || 'Corporate Entity'} ({selectedTargetCompany.ticker || '363 BID'})
                  </h2>
                  <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                    📍 {selectedTargetCompany.locationJurisdiction || 'Wilmington, DE'} • Stalking Horse Bidding Active
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 800 }}>OPENING BID FLOOR</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 950, color: '#34D399' }}>
                    {selectedTargetCompany.debtAtCollapse ? `$${Math.round(parseInt(selectedTargetCompany.debtAtCollapse.replace(/[^0-9]/g, '') || 500) * 0.35)}M Cash` : '$185,000,000'}
                  </div>
                </div>
              </div>

              {/* Asset Details Grid — DYNAMICALLY SLAVED TO selectedTargetCompany */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(236, 72, 153, 0.4)', borderRadius: '12px', padding: '18px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 950, color: '#F472B6' }}>
                    🏷️ ASSETS UP FOR LIQUIDATION ({(selectedTargetCompany.name || selectedTargetCompany.entityName || 'TARGET').toUpperCase()})
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.6 }}>
                    • Primary Operations & Brand Intellectual Property<br/>
                    • Automated Regional Logistics & Distribution Hubs<br/>
                    • Specialty Equipment & Fleet Inventory<br/>
                    • Free & Clear Title Transfer under 11 U.S.C. § 363(f)
                  </div>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '12px', padding: '18px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 950, color: '#FCD34D' }}>
                    💰 BIDDING PROCEDURES & BREAK-UP FEE
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.6 }}>
                    • Stalking Horse Opening Bid: {selectedTargetCompany.debtAtCollapse ? `$${Math.round(parseInt(selectedTargetCompany.debtAtCollapse.replace(/[^0-9]/g, '') || 500) * 0.35)}M Cash` : '$185M Cash'}<br/>
                    • Break-Up Fee Protection: 3.0% Court Approved<br/>
                    • Overbid Minimum Increment: $2,500,000<br/>
                    • Escrow Deposit Required: 10% Cash Deposit
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* DESK 1: COURT 363 AUCTION FLOOR DIRECTORY */}
          {activeDesk === 'directory' && (
            <AuctionDirectory
              auctions={auctions}
              onSelectAuction={onSelectAuction}
              onOpenDiligenceBrief={onOpenDiligenceBrief}
              onGoBack={onGoBack}
            />
          )}

          {/* DESK 2: STALKING HORSE APA DILIGENCE VAULT */}
          {activeDesk === 'apa' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.25) 100%)', border: '1.5px solid #F59E0B', borderRadius: '12px', padding: '18px' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 950, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={20} color="#F59E0B" /> STALKING HORSE APA DILIGENCE VAULT — {selectedTargetCompany.name.toUpperCase()}
                </div>
                <p style={{ fontSize: '0.78rem', color: '#CBD5E1', margin: '4px 0 0 0' }}>
                  Inspect official Asset Purchase Agreements (APA), break-up fee protections (3.0%), overbid minimum increments ($2.5M), and court-approved bidding procedures under 11 U.S.C. § 363.
                </p>
              </div>

              <div style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                  <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Stalking Horse Opening Bid Floor:</span>
                  <span style={{ color: '#34D399', fontWeight: 950, fontSize: '0.95rem' }}>$185,000,000 Cash + Assumed Liabilities</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                  <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Break-Up Fee Protection:</span>
                  <span style={{ color: '#FCD34D', fontWeight: 900, fontSize: '0.85rem' }}>3.0% ($5.55M) + $500K Expense Cap</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                  <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Minimum Overbid Increment:</span>
                  <span style={{ color: '#38BDF8', fontWeight: 900, fontSize: '0.85rem' }}>$2,500,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Court Bidding Deadline:</span>
                  <span style={{ color: '#EF4444', fontWeight: 950, fontSize: '0.85rem' }}>August 28, 2026 at 5:00 PM EST</span>
                </div>
              </div>
            </div>
          )}

          {/* DESK 3: SECTION 365 LEASE REJECTION & ASSET CATALOG */}
          {activeDesk === 'leases' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #38BDF8', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.92rem', fontWeight: 950, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingBag size={18} /> SECTION 365 LEASE REJECTION & ASSET PROVIDER HUB
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>
                  Unencumbered real estate leases, store closing inventory sales, and brand IP assets available for purchase free and clear of all liens.
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
                {[
                  { title: "Retail Real Estate Leases (45 Prime Locations)", type: "Section 365 Rejection", status: "Unencumbered" },
                  { title: "Global Brand Trademark Portfolio & Patents", type: "Intellectual Property", status: "Stalking Horse Bid Active" },
                  { title: "Automated Distribution Warehouse Equipment", type: "Machinery & Equipment", status: "Liquidation Sale" }
                ].map((asset, aIdx) => (
                  <div key={aIdx} style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', padding: '14px' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 950, color: '#FFF' }}>{asset.title}</div>
                    <div style={{ fontSize: '0.74rem', color: '#38BDF8', marginTop: '4px' }}>{asset.type} • <strong style={{ color: '#34D399' }}>{asset.status}</strong></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DESK 4: AI ASSET ACQUISITION TEASER & BID MEMO BUILDER */}
          {activeDesk === 'bidmemo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #10B981', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 950, color: '#34D399', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={18} /> AI ASSET ACQUISITION TEASER & BID MEMO BUILDER
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>
                    Target Entity: <strong>{selectedTargetCompany.name}</strong> ({selectedTargetCompany.debtAtCollapse || '$812M Debt'})
                  </div>
                </div>

                <span style={{ fontSize: '0.68rem', fontWeight: 900, background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', padding: '3px 8px', borderRadius: '4px', border: '1px solid #10B981' }}>
                  AI COPILOT ACTIVE
                </span>
              </div>

              {/* ⚡ AI COPILOT PROMPT BAR */}
              <div style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Sparkles size={15} color="#10B981" style={{ position: 'absolute', left: '10px' }} />
                    <input
                      type="text"
                      value={aiBidPrompt}
                      onChange={(e) => setAiBidPrompt(e.target.value)}
                      placeholder="Instruct AI CoPilot to refine 363 bid teaser (e.g. 'Highlight break-up fee protection')..."
                      style={{
                        width: '100%',
                        background: 'rgba(3, 7, 18, 0.95)',
                        border: '1px solid rgba(16, 185, 129, 0.5)',
                        borderRadius: '8px',
                        padding: '8px 12px 8px 34px',
                        color: '#FFF',
                        fontSize: '0.82rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (!aiBidPrompt.trim()) return;
                      setIsGeneratingBid(true);
                      setTimeout(() => {
                        setBidMemoText(prev => `${prev}\n\n[REVISED BY 363 AUCTION AI COPILOT: ${aiBidPrompt}]\n• Recommended Stalking Horse Floor: $185M\n• Overbid Protection: 3.0% Break-Up Fee + $500K Expenses.`);
                        setIsGeneratingBid(false);
                      }, 700);
                    }}
                    disabled={isGeneratingBid}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      color: '#000',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 950,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {isGeneratingBid ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                    <span>AI Refine Bid</span>
                  </button>
                </div>

                {/* Quick Action Chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 800 }}>QUICK BID REFINEMENTS:</span>
                  {[
                    "📜 Stalking Horse APA Terms",
                    "💰 Highlight 3.0% Break-Up Fee",
                    "🏬 Section 365 Free & Clear Title",
                    "🔒 Board Bid Summary"
                  ].map((chipText, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => {
                        setAiBidPrompt(chipText);
                        setIsGeneratingBid(true);
                        setTimeout(() => {
                          setBidMemoText(prev => `${prev}\n\n[REVISED BY AI COPILOT: ${chipText}]\n• Overbid Minimum Increment: $2.5M\n• Deposit: 10% Escrow Submitted to Chapter 11 Trustee.`);
                          setIsGeneratingBid(false);
                        }, 600);
                      }}
                      style={{
                        padding: '3px 8px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '4px',
                        color: '#34D399',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      {chipText}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={12}
                value={bidMemoText}
                onChange={(e) => setBidMemoText(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(3, 7, 18, 0.95)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '10px',
                  padding: '18px',
                  color: '#F8FAFC',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  fontFamily: 'monospace',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(bidMemoText);
                    alert('Copied 363 asset bid memorandum to clipboard!');
                  }}
                  style={{
                    padding: '9px 18px',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 950,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Copy size={14} /> Copy Bid Memo
                </button>

                <button
                  onClick={() => setIsEditorModalOpen(true)}
                  style={{
                    padding: '9px 18px',
                    background: 'rgba(236, 72, 153, 0.2)',
                    color: '#F472B6',
                    border: '1px solid #EC4899',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 950,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Edit3 size={14} /> Open Full-Screen Auction Editor & Mobile Preview
                </button>
              </div>
            </div>
          )}

          {/* DESK 5: HISTORICAL 363 VALUATION COMPS MATRIX */}
          {activeDesk === 'comps' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <AuctionCompsSandbox auctionItem={selectedTargetCompany} />
            </div>
          )}

        </div>

      </div>

      {/* Full-Screen AI Rich-Text Editor & Mobile Preview Stage */}
      <FullScreenAIEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        initialText={bidMemoText}
        entity={selectedTargetCompany}
        format="executive_brief"
        tone="bloomberg"
      />

      {/* YouTube-Style Executive Share Modal */}
      <ExecutiveYouTubeShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        entity={selectedTargetCompany}
        customText={bidMemoText}
      />

      {/* Genuine Court Citation Vault Wrapper Modal */}
      <BCCCitationWrapperModal
        isOpen={isCitationWrapperOpen}
        onClose={() => setIsCitationWrapperOpen(false)}
        citation={{
          title: "Official Section 363 Bidding Procedures Order (Docket #022)",
          court: selectedTargetCompany.locationJurisdiction || "United States Bankruptcy Court for the District of Delaware",
          caseName: selectedTargetCompany.name,
          ticker: selectedTargetCompany.ticker,
          debt: selectedTargetCompany.debtAtCollapse || "$812 Million Total Liabilities",
          date: "August 11, 2026",
          checksum: "sha256-c3f91002a881f09c211",
          judge: "Hon. John T. Dorsey"
        }}
      />

    </div>
  );
}
