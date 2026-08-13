import React, { useState } from 'react';
import { 
  ShieldCheck, FileText, Clock, AlertTriangle, Download, Share2, Sparkles, Send, Copy, 
  ExternalLink, Search, Filter, Briefcase, FileSpreadsheet, Linkedin, Mail, ArrowRight, 
  Upload, RefreshCw, CheckCircle2, ChevronRight, MapPin, Building2, Lock, Tag, Folder, Eye, Edit3, Scale, Star
} from 'lucide-react';
import ExecutiveYouTubeShareModal from './ExecutiveYouTubeShareModal';
import BCCCitationWrapperModal from './BCCCitationWrapperModal';
import FullScreenAIEditorModal from './FullScreenAIEditorModal';
import Form410ClaimWizardModal from './Form410ClaimWizardModal';

export default function CreditorActionWorkstation({
  companies = [],
  watchlist = [],
  onToggleBookmark,
  onOpenEmailClient,
  onOpenOnboarding,
  onOpenForm410Wizard,
  onSwitchWorkspace,
  onGoBack
}) {
  // Target Company Selection State (Left Sidebar DNA)
  const [selectedTargetCompany, setSelectedTargetCompany] = useState(companies[0] || {
    name: "Tupperware Brands Corporation",
    ticker: "TUPQ",
    debtAtCollapse: "$812 Million Total Liabilities",
    locationJurisdiction: "Wilmington, DE Court",
    primaryCause: "Debt Overhang & Direct Sales Decline"
  });

  // Workstation DNA State
  const [activeDesk, setActiveDesk] = useState(null); // null (Default Creditor Claim Dossier Stage) | 'wizard' (Desk 1) | 'bardates' (Desk 2) | 'leases' (Desk 3) | 'objection' (Desk 4)
  const [priorityTag, setPriorityTag] = useState('high_priority');
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [dismissedCompanyIds, setDismissedCompanyIds] = useState([]);
  const [aiObjectionPrompt, setAiObjectionPrompt] = useState('Draft an official Creditor Objection to Chapter 11 Debtor Disclosure Statement & Bar Date Order.');
  const [isGeneratingObjection, setIsGeneratingObjection] = useState(false);

  // Objection Text State
  const [objectionText, setObjectionText] = useState(
    `UNITED STATES BANKRUPTCY COURT\nDISTRICT OF DELAWARE\n\nIN RE: ${selectedTargetCompany.name.toUpperCase()}\nDEBTOR. CHAPTER 11 CASE NO. 26-10492\n\nOFFICIAL CREDITOR OBJECTION TO DEBTOR DISCLOSURE STATEMENT & BAR DATE MOTION\n\nCOMES NOW, Trade Creditor & Supplier Group, by and through undersigned counsel, and hereby files this Objection:\n\n1. OBLIGATION DETAIL:\nCreditor holds a liquidated, non-contingent General Unsecured Claim (GUC) in the amount of $4,850,000 for trade inventory delivered under Section 503(b)(9).\n\n2. OBJECTION GROUNDS:\nDebtor's proposed Bar Date Notice provides insufficient 14-day notice to foreign trade vendors and fails to preserve priority administrative expense status.\n\nVerified Docket: https://businesscollapse.com/?company=${(selectedTargetCompany.ticker || 'tupq').toLowerCase()}&citation=docket001`
  );

  // Modals State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCitationWrapperOpen, setIsCitationWrapperOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [isForm410ModalOpen, setIsForm410ModalOpen] = useState(false);

  // Saved Creditor Claims Vault DNA State
  const [activeClaimId, setActiveClaimId] = useState(1);
  const [savedClaims, setSavedClaims] = useState([
    { id: 1, title: 'Tupperware $4.85M Section 503(b)(9) Priority Claim', amount: '$4,850,000', date: 'Today, 4:10 PM' },
    { id: 2, title: 'Spirit Airlines Aircraft Engine Supplier Lease Claim', amount: '$12,400,000', date: 'Yesterday' }
  ]);
  const [savedStatusText, setSavedStatusText] = useState('');

  const handleSaveClaim = () => {
    const newClaim = {
      id: Date.now(),
      title: `${selectedTargetCompany.name} Form 410 Proof of Claim`,
      amount: '$1,250,000 GUC Claim',
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSavedClaims([newClaim, ...savedClaims]);
    setSavedStatusText('✓ Saved creditor claim to vault!');
    setTimeout(() => setSavedStatusText(''), 2500);
  };

  const handleExportCSV = () => {
    const headers = "Target Entity,Ticker,Claim Type,Claim Amount,Jurisdiction,Bar Date Status\n";
    const row = `"${selectedTargetCompany.name}","${selectedTargetCompany.ticker || 'N/A'}","Form 410 Unsecured Claim","$4,850,000","${selectedTargetCompany.locationJurisdiction || 'DE Court'}","Bar Date Active (32 Days Left)"`;
    const blob = new Blob([headers + row], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${(selectedTargetCompany.ticker || 'CREDITOR').toLowerCase()}_form410_claims.csv`;
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
        borderBottom: '1px solid rgba(139, 92, 246, 0.4)',
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
            background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
            color: '#FFF',
            fontWeight: 950,
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '4px',
            letterSpacing: '0.06em'
          }}>
            WORKSTATION #5 DNA
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#FFF' }}>
            CREDITOR ACTION CENTER — {selectedTargetCompany.name} ({selectedTargetCompany.ticker || 'DEBT'})
          </span>
        </div>

        {/* WORKSTATION BRANDING TITLE */}

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
            <span>Export Claims (.CSV)</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
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
              boxShadow: '0 0 16px rgba(139, 92, 246, 0.4)'
            }}
          >
            <Share2 size={14} />
            <span>BOOM Share Creditor Wire</span>
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
          { id: null, label: '📋 Creditor Claim & Case Dossier (Overview)', icon: Building2, color: '#8B5CF6' },
          { id: 'wizard', label: '🛡️ Desk 1: Official Form 410 Proof of Claim Wizard', icon: FileText, color: '#8B5CF6' },
          { id: 'bardates', label: '⏰ Desk 2: Bar Date Countdown & Deadline Alerts', icon: Clock, color: '#EF4444' },
          { id: 'leases', label: '🏬 Desk 3: Section 365 Lease Rejection Claim Hub', icon: Scale, color: '#F59E0B' },
          { id: 'objection', label: '✍️ Desk 4: AI Creditor Objection & Claim Notice Builder', icon: Mail, color: '#10B981' }
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
          borderRight: '1px solid rgba(139, 92, 246, 0.3)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          overflowY: 'auto'
        }}>

          {/* Position #1: TOP-MOUNTED WORKSTATION ASSET SEARCH BAR */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#8B5CF6' }} />
            <input
              type="text"
              placeholder="Search creditor assets & claims (e.g. 503(b)(9), lien)..."
              value={assetSearchQuery}
              onChange={(e) => setAssetSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.95)',
                border: assetSearchQuery ? '1.5px solid #8B5CF6' : '1px solid rgba(139, 92, 246, 0.4)',
                color: '#FFF',
                padding: '6px 28px 6px 30px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                outline: 'none',
                boxShadow: assetSearchQuery ? '0 0 12px rgba(139, 92, 246, 0.4)' : 'none',
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

          {/* Position #2: TARGET CREDITOR ENTITIES TRAY WITH DISMISS FUNCTIONALITY */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 950, color: '#C084FC', letterSpacing: '0.05em' }}>
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
                  const compId = comp.id || comp.ticker || comp.name;
                  if (dismissedCompanyIds.includes(compId)) return false;
                  
                  if (assetSearchQuery) {
                    const q = assetSearchQuery.toLowerCase();
                    return (comp.name && comp.name.toLowerCase().includes(q)) ||
                           (comp.ticker && comp.ticker.toLowerCase().includes(q)) ||
                           (comp.primaryCause && comp.primaryCause.toLowerCase().includes(q)) ||
                           (comp.locationJurisdiction && comp.locationJurisdiction.toLowerCase().includes(q)) ||
                           (comp.summary && comp.summary.toLowerCase().includes(q));
                  }

                  // STRICT FAVORITES + ACTIVE SELECTION ONLY (DUMP HUGE UNFILTERED LIST)
                  const isFav = comp.isBookmarked || (watchlist && (watchlist.includes(comp.id) || watchlist.includes(comp.ticker)));
                  const isSelected = (selectedTargetCompany.id && selectedTargetCompany.id === comp.id) || selectedTargetCompany.name === comp.name;
                  return isFav || isSelected;
                })
                .map(comp => {
                  const compId = comp.id || comp.ticker || comp.name;
                  const isFav = comp.isBookmarked || (watchlist && (watchlist.includes(comp.id) || watchlist.includes(comp.ticker)));
                  const isSelected = (selectedTargetCompany.id && selectedTargetCompany.id === comp.id) || selectedTargetCompany.name === comp.name;
                  return (
                    <div
                      key={compId}
                      onClick={() => {
                        setSelectedTargetCompany(comp);
                        setActiveDesk(null); // DIRECTLY DISPLAY FULL DOSSIER ON CANVAS BELOW TELEPORT MENU
                      }}
                      style={{
                        background: isSelected ? 'rgba(139, 92, 246, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                        border: isSelected ? '1.5px solid #8B5CF6' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '8px 10px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 950, color: isSelected ? '#FFF' : '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {isFav && <Star size={11} color="#F59E0B" fill="#F59E0B" />}
                          {comp.name}
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
                        <span style={{ fontSize: '0.6rem', fontWeight: 900, background: 'rgba(139,92,246,0.2)', color: '#C084FC', padding: '1px 4px', borderRadius: '3px' }}>
                          {comp.ticker || 'CLAIM'}
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
            border: '1.5px solid rgba(139, 92, 246, 0.4)',
            borderRadius: '12px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            gap: '12px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 950, color: '#C084FC' }}>
              <Sparkles size={16} color="#C084FC" />
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
                onClick={() => onSwitchWorkspace && onSwitchWorkspace('marketplace', selectedTargetCompany)}
                style={{ padding: '6px 12px', background: 'rgba(236, 72, 153, 0.2)', color: '#F472B6', border: '1px solid #EC4899', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 900, cursor: 'pointer' }}
              >
                🔨 363 Marketplace
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

          {/* DEFAULT OVERVIEW: CREDITOR CLAIM & CASE DOSSIER STAGE */}
          {activeDesk === null && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Company Dossier Banner */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 22, 0.98) 100%)',
                border: '1.5px solid #8B5CF6',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                boxShadow: '0 12px 30px rgba(0,0,0,0.6)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 950, background: 'rgba(139, 92, 246, 0.2)', color: '#C084FC', padding: '3px 8px', borderRadius: '4px', border: '1px solid #8B5CF6' }}>
                      CREDITOR CASE DOSSIER
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                      PACER Case #{selectedTargetCompany.courtCaseNumber || '26-10492'}
                    </span>
                  </div>
                  <h2 style={{ margin: '8px 0 2px 0', fontSize: '1.4rem', fontWeight: 950, color: '#FFF' }}>
                    {selectedTargetCompany.name} ({selectedTargetCompany.ticker || 'CLAIM'})
                  </h2>
                  <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                    📍 {selectedTargetCompany.locationJurisdiction || 'Wilmington, DE'} • Unsecured Creditor Bar Date Approaching
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 800 }}>ESTIMATED TOTAL CLAIMS</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 950, color: '#A78BFA' }}>
                    {selectedTargetCompany.debtAtCollapse || '$812,000,000'}
                  </div>
                </div>
              </div>

              {/* Creditor Claims Overview Grid — DYNAMICALLY SLAVED TO selectedTargetCompany */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '12px', padding: '18px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 950, color: '#C084FC' }}>
                    🛡️ PROOF OF CLAIM DEADLINES & RIGHTS
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.6 }}>
                    • Official Form 410 Deadline: 18 Days Remaining<br/>
                    • Section 503(b)(9) Priority Goods Claim Eligible<br/>
                    • Automatic Stay (11 U.S.C. § 362) Enforced<br/>
                    • Unsecured Creditor Committee (UCC) Formed
                  </div>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '18px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 950, color: '#FCA5A5' }}>
                    🚨 LEASE REJECTION & DEFAULT DISCLOSURE
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.6 }}>
                    • Motion to Reject Commercial Leases filed under § 365<br/>
                    • 210 Facility Vendors Impacted Across State Lines<br/>
                    • Cure Claim Deadline: 14 Days Post-Notice<br/>
                    • PACER Filing Vault Verified
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* DESK 1: OFFICIAL FORM 410 PROOF OF CLAIM WIZARD */}
          {activeDesk === 'wizard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.25) 100%)', border: '1.5px solid #8B5CF6', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 950, color: '#C084FC', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={22} /> OFFICIAL FORM 410 PROOF OF CLAIM WIZARD — {selectedTargetCompany.name.toUpperCase()}
                </div>
                <p style={{ fontSize: '0.82rem', color: '#CBD5E1', margin: '6px 0 0 0', lineHeight: 1.6 }}>
                  Generate court-ready Official Form 410 Proof of Claim filings with automatic Section 503(b)(9) 20-day priority goods designation for <strong>{selectedTargetCompany.name}</strong>.
                </p>

                <button
                  onClick={() => setIsForm410ModalOpen(true)}
                  style={{
                    marginTop: '16px',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 950,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
                  }}
                >
                  <FileText size={18} /> Launch Form 410 Claim Filing Wizard
                </button>
              </div>
            </div>
          )}

          {/* DESK 2: BAR DATE COUNTDOWN & DEADLINE ALERTS */}
          {activeDesk === 'bardates' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #EF4444', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.92rem', fontWeight: 950, color: '#EF4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={18} /> OFFICIAL COURT BAR DATE DEADLINE MONITOR
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>
                  Filing a Proof of Claim after the court bar date results in total claim disallowance under 11 U.S.C. § 502.
                </div>
              </div>

              <div style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 950, color: '#FFF' }}>
                    {selectedTargetCompany.name} Bar Date Order
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '4px' }}>
                    General Creditor Bar Date: <strong>September 14, 2026 at 5:00 PM EST</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700 }}>BAR DATE COUNTDOWN</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 950, color: '#F59E0B' }}>
                    34 Days Remaining
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DESK 3: SECTION 365 LEASE REJECTION CLAIM HUB */}
          {activeDesk === 'leases' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #F59E0B', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.92rem', fontWeight: 950, color: '#FCD34D', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Scale size={18} /> SECTION 365 LEASE REJECTION & CURE CLAIM CALCULATOR
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>
                  Calculate statutory 15% lease rejection damages cap under 11 U.S.C. § 502(b)(6).
                </div>
              </div>

              <div style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '10px', padding: '16px', fontSize: '0.82rem', color: '#CBD5E1' }}>
                <div style={{ fontWeight: 900, color: '#FFF', marginBottom: '6px' }}>
                  Section 502(b)(6) Statutory Cap Formula:
                </div>
                Rent reserved under lease for 15% (not to exceed 3 years) of remaining term + unpaid pre-petition rent.
              </div>
            </div>
          )}

          {/* DESK 4: AI CREDITOR OBJECTION & CLAIM NOTICE BUILDER */}
          {activeDesk === 'objection' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #10B981', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 950, color: '#34D399', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={18} /> AI CREDITOR OBJECTION & CLAIM NOTICE BUILDER
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
                      value={aiObjectionPrompt}
                      onChange={(e) => setAiObjectionPrompt(e.target.value)}
                      placeholder="Instruct AI CoPilot to refine creditor objection (e.g. 'Assert Section 503(b)(9) 20-day goods priority')..."
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
                      if (!aiObjectionPrompt.trim()) return;
                      setIsGeneratingObjection(true);
                      setTimeout(() => {
                        setObjectionText(prev => `${prev}\n\n[CREDITOR OBJECTION REVISED BY AI COPILOT: ${aiObjectionPrompt}]\n• Asserted Statutory Priority: 11 U.S.C. § 503(b)(9) Goods Delivered Within 20 Days Pre-Petition.`);
                        setIsGeneratingObjection(false);
                      }, 700);
                    }}
                    disabled={isGeneratingObjection}
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
                    {isGeneratingObjection ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                    <span>AI Refine Objection</span>
                  </button>
                </div>

                {/* Quick Action Chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 800 }}>QUICK OBJECTION REFINEMENTS:</span>
                  {[
                    "🛡️ Section 503(b)(9) 20-Day Goods Priority",
                    "⏰ Insufficient Bar Date Notice Objection",
                    "🏬 Lease Rejection Cure Claim",
                    "🔒 Committee Joinder Reservation"
                  ].map((chipText, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => {
                        setAiObjectionPrompt(chipText);
                        setIsGeneratingObjection(true);
                        setTimeout(() => {
                          setObjectionText(prev => `${prev}\n\n[REVISED BY AI COPILOT: ${chipText}]\n• Statutory Reserve Demand: Full Escrow Deposit Mandatory.`);
                          setIsGeneratingObjection(false);
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
                value={objectionText}
                onChange={(e) => setObjectionText(e.target.value)}
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
                    navigator.clipboard.writeText(objectionText);
                    alert('Copied creditor objection notice to clipboard!');
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
                  <Copy size={14} /> Copy Objection Text
                </button>

                <button
                  onClick={() => setIsEditorModalOpen(true)}
                  style={{
                    padding: '9px 18px',
                    background: 'rgba(139, 92, 246, 0.2)',
                    color: '#C084FC',
                    border: '1px solid #8B5CF6',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 950,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Edit3 size={14} /> Open Full-Screen Creditor Editor & Mobile Preview
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Official Form 410 Claim Wizard Modal */}
      <Form410ClaimWizardModal
        isOpen={isForm410ModalOpen}
        onClose={() => setIsForm410ModalOpen(false)}
        company={selectedTargetCompany}
      />

      {/* Full-Screen AI Rich-Text Editor & Mobile Preview Stage */}
      <FullScreenAIEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        initialText={objectionText}
        entity={selectedTargetCompany}
        format="executive_brief"
        tone="bloomberg"
      />

      {/* YouTube-Style Executive Share Modal */}
      <ExecutiveYouTubeShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        entity={selectedTargetCompany}
        customText={objectionText}
      />

      {/* Genuine Court Citation Vault Wrapper Modal */}
      <BCCCitationWrapperModal
        isOpen={isCitationWrapperOpen}
        onClose={() => setIsCitationWrapperOpen(false)}
        citation={{
          title: "Official Court Bar Date Order (Docket #009)",
          court: selectedTargetCompany.locationJurisdiction || "United States Bankruptcy Court for the District of Delaware",
          caseName: selectedTargetCompany.name,
          ticker: selectedTargetCompany.ticker,
          debt: selectedTargetCompany.debtAtCollapse || "$812 Million Total Liabilities",
          date: "August 11, 2026",
          checksum: "sha256-d4e819001f33a882b",
          judge: "Hon. John T. Dorsey"
        }}
      />

    </div>
  );
}
