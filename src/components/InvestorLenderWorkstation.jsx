import React, { useState } from 'react';
import { 
  TrendingDown, DollarSign, Layers, ShieldCheck, Download, Share2, Sparkles, Send, Copy, 
  ExternalLink, Search, Filter, AlertTriangle, Clock, Briefcase, FileSpreadsheet, 
  Linkedin, Mail, ArrowRight, Upload, RefreshCw, CheckCircle2, ChevronRight, MapPin, Building2, Lock, Tag, Folder, Eye, Edit3, Grid, BarChart3, PieChart, Star
} from 'lucide-react';
import DistressHeatmap from './DistressHeatmap';
import DipFinancingMonitor from './DipFinancingMonitor';
import RecoveryWaterfallModal from './RecoveryWaterfallModal';
import ExecutiveYouTubeShareModal from './ExecutiveYouTubeShareModal';
import BCCCitationWrapperModal from './BCCCitationWrapperModal';
import FullScreenAIEditorModal from './FullScreenAIEditorModal';

export default function InvestorLenderWorkstation({
  companies = [],
  watchlist = [],
  onToggleBookmark,
  onSelectCompany,
  onOpenWaterfall,
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
  const [activeDesk, setActiveDesk] = useState(null); // null (Default Executive Dossier Stage) | 'heatmap' (Desk 1) | 'dip' (Desk 2) | 'waterfall' (Desk 3) | 'memo' (Desk 4)
  const [priorityTag, setPriorityTag] = useState('dip');
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [dismissedCompanyIds, setDismissedCompanyIds] = useState([]);
  const [aiMemoPrompt, setAiMemoPrompt] = useState('Draft an institutional investment committee memo detailing 1st Lien DIP loan opportunity & recovery shortfall.');
  const [isGeneratingMemo, setIsGeneratingMemo] = useState(false);

  // Credit Memo Text State
  const [memoText, setMemoText] = useState(
    `INSTITUTIONAL INVESTMENT COMMITTEE MEMORANDUM\n\nTARGET ENTITY: ${selectedTargetCompany.name} (${selectedTargetCompany.ticker || 'DEBT'})\nTOTAL CAPITAL AT RISK: ${selectedTargetCompany.debtAtCollapse || '$812M'}\n\n1. EXECUTIVE SUMMARY & RESTRUCTURING THESIS:\n${selectedTargetCompany.name} has initiated voluntary Chapter 11 proceedings in ${selectedTargetCompany.locationJurisdiction || 'Delaware'}.\n\n2. CAPITAL STACK & RECOVERY WATERFALL ANALYSIS:\n• DIP Credit Facility (100% Super-Priority): $150M Full Par Recovery\n• 1st Lien Senior Secured Notes ($450M): Estimated 78 cents on the dollar ($0.78/$1.00)\n• Unsecured Claims & Trade Debt ($212M): High impairment risk (< 12 cents)\n\n3. RECOMMENDED CREDIT POSITION:\nParticipate in Senior DIP Roll-Up Facility with 12.5% Exit Fee & Stalking Horse Asset Rights.\n\nVerification Vault: https://businesscollapse.com/?company=${(selectedTargetCompany.ticker || 'tupq').toLowerCase()}&citation=docket001`
  );

  // Modals State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCitationWrapperOpen, setIsCitationWrapperOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [isWaterfallOpen, setIsWaterfallOpen] = useState(false);

  // Saved Investment Scenarios Vault DNA State
  const [activeScenarioId, setActiveScenarioId] = useState(1);
  const [savedScenarios, setSavedScenarios] = useState([
    { id: 1, title: 'Tupperware 1st Lien DIP Roll-Up Thesis', debt: '$812M', date: 'Today, 2:45 PM' },
    { id: 2, title: 'Spirit Airlines Aircraft Lease Restructuring', debt: '$1.4B', date: 'Yesterday' }
  ]);
  const [savedStatusText, setSavedStatusText] = useState('');

  const handleSaveScenario = () => {
    const newScen = {
      id: Date.now(),
      title: `${selectedTargetCompany.name} Restructuring Thesis`,
      debt: selectedTargetCompany.debtAtCollapse || '$500M',
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSavedScenarios([newScen, ...savedScenarios]);
    setSavedStatusText('✓ Saved investment scenario to vault!');
    setTimeout(() => setSavedStatusText(''), 2500);
  };

  const handleExportCSV = () => {
    const headers = "Target Company,Ticker,Debt Overhang,Jurisdiction,Primary Cause,DIP Facility,Status\n";
    const row = `"${selectedTargetCompany.name}","${selectedTargetCompany.ticker || 'N/A'}","${selectedTargetCompany.debtAtCollapse || '$500M'}","${selectedTargetCompany.locationJurisdiction || 'US Court'}","${selectedTargetCompany.primaryCause || 'Chapter 11'}","$150M DIP","Active Monitoring"`;
    const blob = new Blob([headers + row], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${(selectedTargetCompany.ticker || 'INVESTMENT').toLowerCase()}_credit_thesis.csv`;
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
        borderBottom: '1px solid rgba(16, 185, 129, 0.4)',
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
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: '#000',
            fontWeight: 950,
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '4px',
            letterSpacing: '0.06em'
          }}>
            WORKSTATION #3 DNA
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#FFF' }}>
            INVESTOR & LENDER TERMINAL — {selectedTargetCompany.name} ({selectedTargetCompany.ticker || 'DEBT'})
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
            <span>Export Credit Thesis (.CSV)</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#000',
              border: 'none',
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 950,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)'
            }}
          >
            <Share2 size={14} />
            <span>BOOM Share Credit Memo</span>
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
          { id: null, label: '📋 Executive Corporate Dossier (Overview)', icon: Building2, color: '#38BDF8' },
          { id: 'heatmap', label: '📊 Desk 1: Macro Distress Heatmap & Sector Intensity', icon: BarChart3, color: '#38BDF8' },
          { id: 'dip', label: '💳 Desk 2: DIP Loan & Pre-Filing Monitor', icon: DollarSign, color: '#10B981' },
          { id: 'waterfall', label: '🌊 Desk 3: Creditor Recovery Waterfall Simulator', icon: Layers, color: '#F59E0B' },
          { id: 'memo', label: '✍️ Desk 4: AI Institutional Credit Memo Builder', icon: Mail, color: '#EC4899' }
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
          borderRight: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          overflowY: 'auto'
        }}>

          {/* Position #1: TOP-MOUNTED WORKSTATION ASSET SEARCH BAR */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#10B981' }} />
            <input
              type="text"
              placeholder="Search distressed debt & DIP assets..."
              value={assetSearchQuery}
              onChange={(e) => setAssetSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.95)',
                border: assetSearchQuery ? '1.5px solid #10B981' : '1px solid rgba(16, 185, 129, 0.4)',
                color: '#FFF',
                padding: '6px 28px 6px 30px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                outline: 'none',
                boxShadow: assetSearchQuery ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none',
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

          {/* Position #2: TARGET DISTRESSED ENTITIES TRAY WITH DISMISS FUNCTIONALITY */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 950, color: '#34D399', letterSpacing: '0.05em' }}>
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
                        if (onSelectCompany) onSelectCompany(comp);
                        setActiveDesk(null); // DIRECTLY DISPLAY FULL DOSSIER ON CANVAS BELOW TELEPORT MENU
                      }}
                      style={{
                        background: isSelected ? 'rgba(16, 185, 129, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                        border: isSelected ? '1.5px solid #10B981' : '1px solid rgba(255,255,255,0.08)',
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
                        <span style={{ fontSize: '0.6rem', fontWeight: 900, background: 'rgba(16,185,129,0.2)', color: '#34D399', padding: '1px 4px', borderRadius: '3px' }}>
                          {comp.ticker || 'DEBT'}
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
            border: '1.5px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '12px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            gap: '12px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 950, color: '#34D399' }}>
              <Sparkles size={16} color="#34D399" />
              <span>CROSS-WORKSPACE TELEPORT ({selectedTargetCompany.name.toUpperCase()}):</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onSwitchWorkspace && onSwitchWorkspace('marketplace', selectedTargetCompany)}
                style={{ padding: '6px 12px', background: 'rgba(236, 72, 153, 0.2)', color: '#F472B6', border: '1px solid #EC4899', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 900, cursor: 'pointer' }}
              >
                🔨 363 Marketplace
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

          {/* DEFAULT OVERVIEW: EXECUTIVE CORPORATE & FINANCIAL DOSSIER STAGE */}
          {activeDesk === null && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Company Dossier Banner */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 22, 0.98) 100%)',
                border: '1.5px solid #10B981',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                boxShadow: '0 12px 30px rgba(0,0,0,0.6)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 950, background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', padding: '3px 8px', borderRadius: '4px', border: '1px solid #10B981' }}>
                      EXECUTIVE CORPORATE DOSSIER
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                      PACER Case #{selectedTargetCompany.courtCaseNumber || '26-10492'}
                    </span>
                  </div>
                  <h2 style={{ margin: '8px 0 2px 0', fontSize: '1.4rem', fontWeight: 950, color: '#FFF' }}>
                    {selectedTargetCompany.name} ({selectedTargetCompany.ticker || 'DEBT'})
                  </h2>
                  <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                    📍 {selectedTargetCompany.locationJurisdiction || 'Wilmington, DE'} • {selectedTargetCompany.primaryCause || 'Chapter 11 Proceedings'}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 800 }}>TOTAL CAPITAL AT RISK</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 950, color: '#EF4444' }}>
                    {selectedTargetCompany.debtAtCollapse || '$812,000,000'}
                  </div>
                </div>
              </div>

              {/* Financial & Capital Stack Grid — DYNAMICALLY SLAVED TO selectedTargetCompany */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                
                {/* Box 1: Senior DIP & 1st Lien Capital Stack */}
                <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '12px', padding: '18px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 950, color: '#34D399', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    💳 SENIOR DEBT & DIP CAPITAL STACK ({selectedTargetCompany.ticker || 'DEBT'})
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ color: '#94A3B8' }}>Super-Priority DIP Roll-Up:</span>
                      <span style={{ color: '#FFF', fontWeight: 900 }}>
                        {selectedTargetCompany.debtAtCollapse ? `$${Math.round(parseInt(selectedTargetCompany.debtAtCollapse.replace(/[^0-9]/g, '') || 500) * 0.25)}M` : '$150M'} (100% Par Recovery)
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ color: '#94A3B8' }}>1st Lien Senior Secured Notes:</span>
                      <span style={{ color: '#FFF', fontWeight: 900 }}>
                        {selectedTargetCompany.debtAtCollapse ? `$${Math.round(parseInt(selectedTargetCompany.debtAtCollapse.replace(/[^0-9]/g, '') || 500) * 0.55)}M` : '$450M'} (78% Recovery)
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94A3B8' }}>Unsecured Claims & Trade Deficit:</span>
                      <span style={{ color: '#EF4444', fontWeight: 900 }}>
                        {selectedTargetCompany.debtAtCollapse ? `$${Math.round(parseInt(selectedTargetCompany.debtAtCollapse.replace(/[^0-9]/g, '') || 500) * 0.20)}M` : '$212M'} (&lt; 12% Recovery)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Box 2: 363 Liquidation & Asset Terms */}
                <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '12px', padding: '18px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 950, color: '#FCD34D', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    💰 363 ASSET SALE & AUCTION STATUS
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ color: '#94A3B8' }}>Stalking Horse Opening Floor:</span>
                      <span style={{ color: '#34D399', fontWeight: 900 }}>
                        {selectedTargetCompany.debtAtCollapse ? `$${Math.round(parseInt(selectedTargetCompany.debtAtCollapse.replace(/[^0-9]/g, '') || 500) * 0.35)}M Cash` : '$185M Cash'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ color: '#94A3B8' }}>Break-Up Fee Protection:</span>
                      <span style={{ color: '#FCD34D', fontWeight: 900 }}>3.0% Fee Approved</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94A3B8' }}>Title Transfer Terms:</span>
                      <span style={{ color: '#34D399', fontWeight: 900 }}>Free & Clear (§ 363(f))</span>
                    </div>
                  </div>
                </div>

                {/* Box 3: Restructuring Timeline & PACER Court Dockets */}
                <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '12px', padding: '18px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 950, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    📄 RESTRUCTURING & COURT VAULT
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ color: '#94A3B8' }}>Court Jurisdiction:</span>
                      <span style={{ color: '#FFF', fontWeight: 900 }}>{selectedTargetCompany.locationJurisdiction || 'US Court'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ color: '#94A3B8' }}>Insolvency Cause:</span>
                      <span style={{ color: '#FCD34D', fontWeight: 900 }}>{selectedTargetCompany.primaryCause || 'Chapter 11 Petition'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94A3B8' }}>PACER Evidence Vault:</span>
                      <button
                        onClick={() => setIsCitationWrapperOpen(true)}
                        style={{ background: 'none', border: 'none', color: '#38BDF8', cursor: 'pointer', fontWeight: 900, textDecoration: 'underline', fontSize: '0.76rem' }}
                      >
                        Inspect Docket Filings
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* DESK 1: MACRO DISTRESS HEATMAP */}
          {activeDesk === 'heatmap' && (
            <DistressHeatmap
              companies={companies}
              onSelectCompany={onSelectCompany}
            />
          )}

          {/* DESK 2: DIP LOAN MONITOR */}
          {activeDesk === 'dip' && (
            <DipFinancingMonitor
              companies={companies}
              onSelectCompany={onSelectCompany}
              onOpenWaterfall={(c) => {
                setSelectedTargetCompany(c);
                setIsWaterfallOpen(true);
              }}
            />
          )}

          {/* DESK 3: RECOVERY WATERFALL SIMULATOR TRIGGER */}
          {activeDesk === 'waterfall' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.25) 100%)', border: '1.5px solid #10B981', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 950, color: '#34D399', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={22} /> CREDITOR RECOVERY WATERFALL SIMULATOR (ABSOLUTE PRIORITY RULE)
                </div>
                <p style={{ fontSize: '0.82rem', color: '#CBD5E1', margin: '6px 0 0 0', lineHeight: 1.6 }}>
                  Simulate liquidation proceeds ($0M to $5,000M) across senior DIP credit, 1st Lien notes, 2nd Lien debt, general unsecured claims (GUCs), and equity tranches for <strong>{selectedTargetCompany.name}</strong>.
                </p>

                <button
                  onClick={() => setIsWaterfallOpen(true)}
                  style={{
                    marginTop: '16px',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 950,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  <Layers size={18} /> Launch Interactive Waterfall Simulator Stage
                </button>
              </div>
            </div>
          )}

          {/* DESK 4: AI INSTITUTIONAL CREDIT MEMO BUILDER */}
          {activeDesk === 'memo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #EC4899', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 950, color: '#F472B6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={18} /> AI INSTITUTIONAL CREDIT MEMORANDUM BUILDER
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>
                    Target Entity: <strong>{selectedTargetCompany.name}</strong> ({selectedTargetCompany.debtAtCollapse || '$812M Debt'})
                  </div>
                </div>

                <span style={{ fontSize: '0.68rem', fontWeight: 900, background: 'rgba(236, 72, 153, 0.2)', color: '#F472B6', padding: '3px 8px', borderRadius: '4px', border: '1px solid #EC4899' }}>
                  AI COPILOT ACTIVE
                </span>
              </div>

              {/* ⚡ AI COPILOT PROMPT BAR */}
              <div style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px solid rgba(236, 72, 153, 0.4)', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Sparkles size={15} color="#EC4899" style={{ position: 'absolute', left: '10px' }} />
                    <input
                      type="text"
                      value={aiMemoPrompt}
                      onChange={(e) => setAiMemoPrompt(e.target.value)}
                      placeholder="Instruct AI CoPilot to refine credit thesis (e.g. 'Highlight 1st Lien DIP roll-up yield')..."
                      style={{
                        width: '100%',
                        background: 'rgba(3, 7, 18, 0.95)',
                        border: '1px solid rgba(236, 72, 153, 0.5)',
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
                      if (!aiMemoPrompt.trim()) return;
                      setIsGeneratingMemo(true);
                      setTimeout(() => {
                        setMemoText(prev => `${prev}\n\n[CREDIT MEMO REVISED BY INSTITUTIONAL AI COPILOT: ${aiMemoPrompt}]\n• Recommended Action: Participate in $150M Senior DIP Credit Facility.\n• Target Exit Yield: 14.5% IRR with Stalking Horse Credit-Bid Floor.`);
                        setIsGeneratingMemo(false);
                      }, 700);
                    }}
                    disabled={isGeneratingMemo}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
                      color: '#FFF',
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
                    {isGeneratingMemo ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                    <span>AI Refine Memo</span>
                  </button>
                </div>

                {/* Quick Action Chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 800 }}>QUICK CREDIT REFINEMENTS:</span>
                  {[
                    "💳 1st Lien DIP Roll-Up Yield",
                    "🌊 Recovery Shortfall Breakdown",
                    "💼 Board Investment Summary",
                    "🔒 Stalking Horse Credit-Bid Rights"
                  ].map((chipText, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => {
                        setAiMemoPrompt(chipText);
                        setIsGeneratingMemo(true);
                        setTimeout(() => {
                          setMemoText(prev => `${prev}\n\n[REVISED BY AI COPILOT: ${chipText}]\n• Priority Tier: 100% Super-Priority DIP Facility.\n• Downside Risk: Fully Collateralized by Real Estate & IP Assets.`);
                          setIsGeneratingMemo(false);
                        }, 600);
                      }}
                      style={{
                        padding: '3px 8px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '4px',
                        color: '#F472B6',
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
                value={memoText}
                onChange={(e) => setMemoText(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(3, 7, 18, 0.95)',
                  border: '1px solid rgba(236, 72, 153, 0.3)',
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
                    navigator.clipboard.writeText(memoText);
                    alert('Copied institutional credit memo to clipboard!');
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
                  <Copy size={14} /> Copy Credit Memo
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
                  <Edit3 size={14} /> Open Full-Screen AI Credit Editor & Mobile Preview
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Interactive Recovery Waterfall Simulator Modal */}
      <RecoveryWaterfallModal
        isOpen={isWaterfallOpen}
        onClose={() => setIsWaterfallOpen(false)}
        company={selectedTargetCompany}
      />

      {/* Full-Screen AI Rich-Text Editor & Mobile Preview Stage */}
      <FullScreenAIEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        initialText={memoText}
        entity={selectedTargetCompany}
        format="executive_brief"
        tone="bloomberg"
      />

      {/* YouTube-Style Executive Share Modal */}
      <ExecutiveYouTubeShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        entity={selectedTargetCompany}
        customText={memoText}
      />

      {/* Genuine Court Citation Vault Wrapper Modal */}
      <BCCCitationWrapperModal
        isOpen={isCitationWrapperOpen}
        onClose={() => setIsCitationWrapperOpen(false)}
        citation={{
          title: "Official DIP Financing Motion (Docket #014)",
          court: selectedTargetCompany.locationJurisdiction || "United States Bankruptcy Court for the District of Delaware",
          caseName: selectedTargetCompany.name,
          ticker: selectedTargetCompany.ticker,
          debt: selectedTargetCompany.debtAtCollapse || "$812 Million Total Liabilities",
          date: "August 11, 2026",
          checksum: "sha256-b9e7c331a89f001d22e05",
          judge: "Hon. John T. Dorsey"
        }}
      />

    </div>
  );
}
