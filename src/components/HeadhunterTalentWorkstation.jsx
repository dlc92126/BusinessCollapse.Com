import React, { useState } from 'react';
import { 
  Users, UserCheck, ShieldCheck, Download, Share2, Sparkles, Send, Copy, Check, 
  ExternalLink, Search, Filter, AlertTriangle, Clock, Briefcase, FileSpreadsheet, 
  Linkedin, Mail, ArrowRight, Upload, RefreshCw, CheckCircle2, ChevronRight, MapPin, Building2, Lock, Tag, Folder, Eye, Edit3, Monitor, Smartphone, Link, Star
} from 'lucide-react';
import ExecutiveYouTubeShareModal from './ExecutiveYouTubeShareModal';
import BCCCitationWrapperModal from './BCCCitationWrapperModal';
import FullScreenAIEditorModal from './FullScreenAIEditorModal';

export default function HeadhunterTalentWorkstation({
  companies = [],
  watchlist = [],
  onToggleBookmark,
  onOpenEmailClient,
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
  const [activeDesk, setActiveDesk] = useState(null); // null (Default Executive Talent Dossier Stage) | 'execs' (Desk 1) | 'warn' (Desk 2) | 'matcher' (Desk 3) | 'outreach' (Desk 4)
  const [priorityTag, setPriorityTag] = useState('c_suite');
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [dismissedCompanyIds, setDismissedCompanyIds] = useState([]);
  const [viewportMode, setViewportMode] = useState('pc');
  const [viewTab, setViewTab] = useState('edit');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [aiPitchPrompt, setAiPitchPrompt] = useState('Draft a discreet, highly confidential outreach email offering a turnaround opportunity.');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  
  // Executive Candidate Target Database
  const candidateDatabase = [
    {
      id: 'cand-001',
      name: "Marcus Vance",
      currentRole: "Chief Financial Officer (CFO)",
      tier: "csuite",
      company: "Tupperware Brands Corporation",
      ticker: "TUPQ",
      distressContext: "Chapter 11 Voluntary Petition Filed ($812M Debt Overhang)",
      distressCategory: "ch11",
      readinessScore: 96,
      flightRisk: "CRITICAL HIGH",
      kerpStatus: "KERP Rejected / Free Agent",
      location: "Wilmington, DE / New York, NY",
      experienceYears: "18 Years Finance & Turnaround",
      linkedInQuery: `"Marcus Vance" OR ("CFO" AND "Tupperware Brands") AND "Restructuring"`,
      email: "m.vance@tupperware-exec.com",
      summary: "Led debt restructuring negotiations with 1st Lien DIP lenders. Expert in cash-flow forecasting and liquidity preservation."
    },
    {
      id: 'cand-002',
      name: "Elena Rostova",
      currentRole: "Chief Supply Chain & Logistics Officer",
      tier: "csuite",
      company: "Tupperware Brands Corporation",
      ticker: "TUPQ",
      distressContext: "WARN Notice Filed (450 Corporate Roles Impacted)",
      distressCategory: "warn",
      readinessScore: 92,
      flightRisk: "HIGH RISK",
      kerpStatus: "KERP Pending Court Approval",
      location: "Orlando, FL",
      experienceYears: "15 Years Global Supply Chain",
      linkedInQuery: `"Elena Rostova" OR ("Supply Chain" AND "Tupperware Brands")`,
      email: "e.rostova@tupperware-exec.com",
      summary: "Manages global distribution networks across 35 countries. Specialized in vendor SLA renegotiation under Section 365."
    },
    {
      id: 'cand-003',
      name: "David Sterling",
      currentRole: "VP of Enterprise Sales & Revenue",
      tier: "vp",
      company: "Spirit Airlines, Inc.",
      ticker: "SAVE",
      distressContext: "Chapter 11 Pre-Pack Negotiation ($1.4B Lease Liability)",
      distressCategory: "ch11",
      readinessScore: 89,
      flightRisk: "MODERATE",
      kerpStatus: "KERP Approved by Board",
      location: "Miramar, FL",
      experienceYears: "14 Years Aviation Sales",
      linkedInQuery: `"David Sterling" OR ("VP Sales" AND "Spirit Airlines")`,
      email: "d.sterling@spirit-exec.com",
      summary: "Architected enterprise ticket revenue algorithms. Managing fleet restructuring transitions."
    },
    {
      id: 'cand-004',
      name: "Sarah Jenkins",
      currentRole: "Director of Procurement & Vendor Relations",
      tier: "vp",
      company: "Red Lobster Seafood Co.",
      ticker: "RLOB",
      distressContext: "Section 363 Stalking Horse Auction Active",
      distressCategory: "ch11",
      readinessScore: 94,
      flightRisk: "CRITICAL HIGH",
      kerpStatus: "KERP Approved by Court",
      location: "Orlando, FL",
      experienceYears: "12 Years Restaurant Procurement",
      linkedInQuery: `"Sarah Jenkins" OR ("Procurement" AND "Red Lobster")`,
      email: "s.jenkins@redlobster-exec.com",
      summary: "Managed $300M in annual seafood & food distribution supply agreements. Expert in contract rejection risk mitigation."
    },
    {
      id: 'cand-005',
      name: "Jonathan Thorne",
      currentRole: "Chief Restructuring Officer (CRO) / EVP Operations",
      tier: "kerp",
      company: "Big Lots, Inc.",
      ticker: "BIG",
      distressContext: "WARN Act Notice Filed (320 Store Closures)",
      distressCategory: "warn",
      readinessScore: 98,
      flightRisk: "FREE AGENT READY",
      kerpStatus: "KERP Active (11 U.S.C. § 503(c))",
      location: "Columbus, OH",
      experienceYears: "22 Years Retail Turnaround",
      linkedInQuery: `"Jonathan Thorne" OR ("EVP" AND "Big Lots")`,
      email: "j.thorne@biglots-exec.com",
      summary: "Specialist in store closing liquidations, inventory monetization, and court-supervised Section 363 asset sales."
    }
  ];

  // Saved Target Candidates Vault DNA State
  const [activeTargetId, setActiveTargetId] = useState(1);
  const [savedTargets, setSavedTargets] = useState([
    { id: 1, title: 'Tupperware C-Suite Talent Raid Target', count: '2 Officers', date: 'Today, 3:10 PM' },
    { id: 2, title: 'Spirit Airlines VP Ops & Revenue Pool', count: '3 Directors', date: 'Yesterday' }
  ]);
  const [savedStatusText, setSavedStatusText] = useState('');

  // AI Pitch State
  const [pitchText, setPitchText] = useState(
    `CONFIDENTIAL EXECUTIVE CAREER OPPORTUNITY\n\nDear Marcus,\n\nI am reaching out on a strictly confidential basis regarding a Senior Vice President / CFO role with a premier PE-backed portfolio firm in corporate turnaround & growth.\n\nIn light of the recent Chapter 11 restructuring proceedings at ${selectedTargetCompany.name} (${selectedTargetCompany.debtAtCollapse || '$812M Debt'}), our client is actively recruiting proven financial leaders.\n\nPlease let me know your availability for a brief 10-minute confidential discussion.\n\nSource Verification: https://businesscollapse.com/?company=${(selectedTargetCompany.ticker || 'tupq').toLowerCase()}&citation=docket001`
  );

  // Modals State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCitationWrapperOpen, setIsCitationWrapperOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

  // Deterministic unique seed helper for target company executive generation
  const getCompanySeed = (str) => {
    let hash = 0;
    if (!str) return 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const displayCandidates = React.useMemo(() => {
    if (!selectedTargetCompany) return [];

    const compName = selectedTargetCompany.name || 'Target Entity';
    const ticker = (selectedTargetCompany.ticker || 'DEBT').toUpperCase();

    // Check if there are handcrafted candidates specifically matching this exact company name
    const exactMatches = candidateDatabase.filter(c => 
      c.company && c.company.toLowerCase() === compName.toLowerCase()
    );
    if (exactMatches.length > 0) return exactMatches;

    // Generate unique, realistic executive candidates dynamically for this specific target company
    const idSeed = selectedTargetCompany.id || compName;
    const seed = getCompanySeed(idSeed + compName + ticker);
    const domain = (selectedTargetCompany.ticker || compName.split(' ')[0]).toLowerCase().replace(/[^a-z0-9]/g, '') || 'exec';

    const firstNames = ['Robert', 'Catherine', 'William', 'Elizabeth', 'Michael', 'Victoria', 'James', 'Alexandra', 'Richard', 'Eleanor', 'Thomas', 'Margaret', 'Charles', 'Patricia', 'Daniel', 'Sophia', 'Christopher', 'Jennifer', 'Matthew', 'Linda', 'Brandon', 'Rachel', 'Steven', 'Amanda'];
    const lastNames = ['Sterling', 'Vance', 'Thorne', 'Rostova', 'Chandler', 'Hawthorne', 'Montgomery', 'Sinclair', 'Blackwood', 'Kensington', 'Mercer', 'DuPont', 'Gallagher', 'Prescott', 'Livingston', 'Fairfax', 'Barrington', 'Carrington', 'Pembroke', 'Winslow', 'Vanderbilt', 'Ashford', 'Kingsley', 'Thornton'];

    const fn1 = firstNames[(seed * 3 + 1) % firstNames.length];
    const ln1 = lastNames[(seed * 7 + 2) % lastNames.length];
    const fn2 = firstNames[(seed * 5 + 3) % firstNames.length];
    const ln2 = lastNames[(seed * 11 + 4) % lastNames.length];
    const fn3 = firstNames[(seed * 9 + 5) % firstNames.length];
    const ln3 = lastNames[(seed * 13 + 6) % lastNames.length];
    const fn4 = firstNames[(seed * 15 + 7) % firstNames.length];
    const ln4 = lastNames[(seed * 17 + 8) % lastNames.length];

    const loc = selectedTargetCompany.locationJurisdiction || 'US Court Jurisdiction';
    const debt = selectedTargetCompany.debtAtCollapse || selectedTargetCompany.peakValuation || '$350M Debt';
    const cause = selectedTargetCompany.primaryCause || 'Chapter 11 Restructuring';

    return [
      {
        id: `exec-${seed}-cfo`,
        name: `${fn1} ${ln1}`,
        currentRole: "Chief Financial Officer (CFO)",
        tier: "csuite",
        company: compName,
        ticker: ticker,
        distressContext: `${cause} (${debt})`,
        distressCategory: "ch11",
        readinessScore: 92 + (seed % 8),
        flightRisk: "CRITICAL HIGH",
        kerpStatus: "KERP Rejected / Free Agent Ready",
        location: loc,
        experienceYears: `${15 + (seed % 9)} Years Corporate Finance`,
        linkedInQuery: `"${fn1} ${ln1}" OR ("CFO" AND "${compName}")`,
        email: `${fn1[0].toLowerCase()}.${ln1.toLowerCase()}@${domain}-exec.com`,
        summary: `Chief Financial Officer directing cash-flow liquidity, 1st lien debt negotiations, and DIP compliance for ${compName}.`
      },
      {
        id: `exec-${seed}-coo`,
        name: `${fn2} ${ln2}`,
        currentRole: "Chief Operating Officer (COO)",
        tier: "csuite",
        company: compName,
        ticker: ticker,
        distressContext: `WARN Layoff Notice & Plant Lease Consolidation`,
        distressCategory: "warn",
        readinessScore: 89 + (seed % 9),
        flightRisk: "HIGH RISK",
        kerpStatus: "KERP Pending Court Approval",
        location: loc,
        experienceYears: `${14 + (seed % 7)} Years Global Operations`,
        linkedInQuery: `"${fn2} ${ln2}" OR ("COO" AND "${compName}")`,
        email: `${fn2[0].toLowerCase()}.${ln2.toLowerCase()}@${domain}-exec.com`,
        summary: `Head of Operations overseeing facility lease rejections under § 365 and workforce restructuring for ${compName}.`
      },
      {
        id: `exec-${seed}-vp-sales`,
        name: `${fn3} ${ln3}`,
        currentRole: "VP of Enterprise Commercial Sales",
        tier: "vp",
        company: compName,
        ticker: ticker,
        distressContext: `Section 363 Stalking Horse Asset Sale Active`,
        distressCategory: "ch11",
        readinessScore: 86 + (seed % 10),
        flightRisk: "MODERATE",
        kerpStatus: "KERP Active (11 U.S.C. § 503(c))",
        location: loc,
        experienceYears: `${12 + (seed % 6)} Years Enterprise Revenue`,
        linkedInQuery: `"${fn3} ${ln3}" OR ("VP Sales" AND "${compName}")`,
        email: `${fn3[0].toLowerCase()}.${ln3.toLowerCase()}@${domain}-exec.com`,
        summary: `Directing key commercial customer retention and revenue transition during ${compName}'s Section 363 asset sale.`
      },
      {
        id: `exec-${seed}-cro`,
        name: `${fn4} ${ln4}`,
        currentRole: "General Counsel & Chief Restructuring Officer",
        tier: "csuite",
        company: compName,
        ticker: ticker,
        distressContext: `State WARN Notice & 1st Lien Credit Default`,
        distressCategory: "warn",
        readinessScore: 94 + (seed % 5),
        flightRisk: "FREE AGENT READY",
        kerpStatus: "KERP Approved by Court",
        location: loc,
        experienceYears: `${18 + (seed % 8)} Years Legal & Restructuring`,
        linkedInQuery: `"${fn4} ${ln4}" OR ("General Counsel" AND "${compName}")`,
        email: `${fn4[0].toLowerCase()}.${ln4.toLowerCase()}@${domain}-exec.com`,
        summary: `Chief Restructuring Officer liaison to Unsecured Creditors Committee (UCC) and 363 stalking horse asset buyers for ${compName}.`
      }
    ];
  }, [selectedTargetCompany]);

  const handleSaveTargetPool = () => {
    const newTarget = {
      id: Date.now(),
      title: `${selectedTargetCompany.name} Talent Target (${priorityTag.toUpperCase()})`,
      count: `${displayCandidates.length} Officers`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSavedTargets([newTarget, ...savedTargets]);
    setSavedStatusText('✓ Saved target pool to vault!');
    setTimeout(() => setSavedStatusText(''), 2500);
  };

  const handleExportCSV = () => {
    const headers = "Name,Current Role,Company,Ticker,Distress Context,Readiness Score,KERP Status,Location,Email\n";
    const rows = displayCandidates.map(c => 
      `"${c.name}","${c.currentRole}","${c.company}","${c.ticker}","${c.distressContext}",${c.readinessScore},"${c.kerpStatus}","${c.location}","${c.email}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${(selectedTargetCompany.ticker || 'TARGET').toLowerCase()}_executive_talent_pool.csv`;
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
        borderBottom: '1px solid rgba(245, 158, 11, 0.3)',
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
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            color: '#000',
            fontWeight: 950,
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '4px',
            letterSpacing: '0.06em'
          }}>
            WORKSTATION #2 DNA
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#FFF' }}>
            HEADHUNTER & TALENT TERMINAL — {selectedTargetCompany.name} ({selectedTargetCompany.ticker || 'DEBT'})
          </span>
        </div>

        {/* Action Buttons Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

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
            <FileSpreadsheet size={13} />
            <span>Export Roster (.CSV)</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
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
              boxShadow: '0 0 16px rgba(245, 158, 11, 0.4)'
            }}
          >
            <Share2 size={14} />
            <span>BOOM Share Talent Wire</span>
          </button>
        </div>
      </div>

      {/* DESK SWITCHER TABS STRIP */}
      <div style={{
        padding: '10px 24px',
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        {[
          { id: null, label: '📋 Executive Talent & C-Suite Dossier (Overview)', icon: Building2, color: '#F59E0B' },
          { id: 'executives', label: '👔 Desk 1: Deep C-Suite & KERP Talent Raid Radar', icon: Users, color: '#F59E0B' },
          { id: 'warn', label: '📜 Desk 2: State WARN Layoff Wire & Plant Closures', icon: FileSpreadsheet, color: '#EF4444' },
          { id: 'poach', label: '🎯 Desk 3: PE Candidate Asset Matcher', icon: UserCheck, color: '#38BDF8' },
          { id: 'pitch', label: '✉️ Desk 4: AI Outbound Recruiter Pitch Builder', icon: Mail, color: '#10B981' }
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
          borderRight: '1px solid rgba(245, 158, 11, 0.25)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          overflowY: 'auto'
        }}>

          {/* Position #1: TOP-MOUNTED WORKSTATION ASSET SEARCH BAR */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#F59E0B' }} />
            <input
              type="text"
              placeholder="Search displaced executive talent & CROs..."
              value={assetSearchQuery}
              onChange={(e) => setAssetSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.95)',
                border: assetSearchQuery ? '1.5px solid #F59E0B' : '1px solid rgba(245, 158, 11, 0.4)',
                color: '#FFF',
                padding: '6px 28px 6px 30px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                outline: 'none',
                boxShadow: assetSearchQuery ? '0 0 12px rgba(245, 158, 11, 0.4)' : 'none',
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

          {/* Position #2: TARGET DISTRESSED COMPANIES TRAY WITH DISMISS FUNCTIONALITY */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 950, color: '#FCD34D', letterSpacing: '0.05em' }}>
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
                        background: isSelected ? 'rgba(245, 158, 11, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                        border: isSelected ? '1.5px solid #F59E0B' : '1px solid rgba(255,255,255,0.08)',
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
                        <span style={{ fontSize: '0.6rem', fontWeight: 900, background: 'rgba(245,158,11,0.2)', color: '#FCD34D', padding: '1px 4px', borderRadius: '3px' }}>
                          {comp.ticker || 'TALENT'}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* RIGHT COLUMN: MAIN STAGE / CANDIDATE ROSTER          */}
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
            border: '1.5px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '12px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            gap: '12px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 950, color: '#FCD34D' }}>
              <Sparkles size={16} color="#FCD34D" />
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
                onClick={() => onSwitchWorkspace && onSwitchWorkspace('creditor', selectedTargetCompany)}
                style={{ padding: '6px 12px', background: 'rgba(139, 92, 246, 0.2)', color: '#C084FC', border: '1px solid #8B5CF6', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 900, cursor: 'pointer' }}
              >
                🛡️ Creditor Action
              </button>
              <button
                onClick={() => onSwitchWorkspace && onSwitchWorkspace('media', selectedTargetCompany)}
                style={{ padding: '6px 12px', background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', border: '1px solid #38BDF8', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 900, cursor: 'pointer' }}
              >
                📰 Media & Press
              </button>
            </div>
          </div>

          {/* DEFAULT OVERVIEW: EXECUTIVE TALENT & C-SUITE DOSSIER STAGE */}
          {activeDesk === null && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Company Dossier Banner */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 22, 0.98) 100%)',
                border: '1.5px solid #F59E0B',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                boxShadow: '0 12px 30px rgba(0,0,0,0.6)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 950, background: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D', padding: '3px 8px', borderRadius: '4px', border: '1px solid #F59E0B' }}>
                      C-SUITE TALENT DOSSIER
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                      KERP Retention Retention Status: High Risk
                    </span>
                  </div>
                  <h2 style={{ margin: '8px 0 2px 0', fontSize: '1.4rem', fontWeight: 950, color: '#FFF' }}>
                    {selectedTargetCompany.name} ({selectedTargetCompany.ticker || 'TALENT'})
                  </h2>
                  <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                    📍 {selectedTargetCompany.locationJurisdiction || 'Wilmington, DE'} • 4 Executive C-Suite Officers Identified
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 800 }}>DISPLACED WORKFORCE</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 950, color: '#FCD34D' }}>
                    450+ Execs & Staff
                  </div>
                </div>
              </div>

              {/* Talent Roster Summary Grid — DYNAMICALLY SLAVED TO selectedTargetCompany */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '18px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 950, color: '#FCD34D' }}>
                    👔 C-SUITE EXECUTIVE FLIGHT RISK
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.6 }}>
                    • Chief Financial Officer (CFO) — Active Job Seeker<br/>
                    • Chief Operating Officer (COO) — KERP Retention Plan Expiry<br/>
                    • VP Corporate Sales — Restructuring Free Agent<br/>
                    • General Counsel / CRO — Chapter 11 Experienced
                  </div>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '18px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 950, color: '#FCA5A5' }}>
                    📜 STATE WARN LAYOFF DISCLOSURES
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.6 }}>
                    • WARN Notice Filed with State Dept of Labor<br/>
                    • 450 Full-Time Employees Impacted<br/>
                    • Plant & HQ Facility Shutdown Date: 30 Days<br/>
                    • Severance & Outplacement Package Filed
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* DESK 1: DEEP C-SUITE & KERP TALENT RAID RADAR */}
          {(activeDesk === 'executives' || activeDesk === 'radar' || activeDesk === 'desk1') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 22, 0.98) 100%)',
                border: '1.5px solid #F59E0B',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 950, color: '#FFF' }}>
                    TARGET: {selectedTargetCompany.name.toUpperCase()} ({selectedTargetCompany.ticker || 'DEBT'})
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>
                    Distress Signal: {selectedTargetCompany.primaryCause || 'Chapter 11 Petition'} • Liabilities: {selectedTargetCompany.debtAtCollapse || '$812M'}
                  </div>
                </div>

                <span style={{ fontSize: '0.75rem', fontWeight: 950, background: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D', padding: '4px 10px', borderRadius: '6px', border: '1px solid #F59E0B' }}>
                  {displayCandidates.length} EXECUTIVE TARGETS READY
                </span>
              </div>

              {/* Candidates Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
                {displayCandidates.map(candidate => (
                  <div
                    key={candidate.id}
                    style={{
                      background: 'rgba(15, 23, 42, 0.95)',
                      border: '1.5px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: '12px',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 950, background: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D', padding: '2px 8px', borderRadius: '4px' }}>
                        READINESS: {candidate.readinessScore}/100
                      </span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 950, color: '#EF4444', background: 'rgba(239, 68, 68, 0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                        {candidate.flightRisk}
                      </span>
                    </div>

                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 950, color: '#FFF' }}>
                        {candidate.name}
                      </h3>
                      <div style={{ fontSize: '0.82rem', color: '#38BDF8', fontWeight: 900, marginTop: '2px' }}>
                        {candidate.currentRole}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '2px' }}>
                        📍 {candidate.location} • {candidate.experienceYears}
                      </div>
                    </div>

                    <div style={{ background: 'rgba(3, 7, 18, 0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px', fontSize: '0.74rem', color: '#CBD5E1' }}>
                      <div style={{ color: '#EF4444', fontWeight: 900, marginBottom: '2px' }}>
                        🚨 DISTRESS CONTEXT:
                      </div>
                      {candidate.distressContext}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                      <button
                        onClick={() => {
                          const url = `https://www.linkedin.com/recruiter/smartsearch?keywords=${encodeURIComponent(candidate.linkedInQuery)}`;
                          window.open(url, '_blank');
                        }}
                        style={{
                          flex: 1,
                          padding: '7px',
                          background: 'rgba(10, 102, 194, 0.25)',
                          color: '#38BDF8',
                          border: '1px solid #0A66C2',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 900,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center',
                          gap: '4px'
                        }}
                      >
                        <Linkedin size={13} /> LinkedIn Recruiter Search
                      </button>

                      <button
                        onClick={() => {
                          setPitchText(`CONFIDENTIAL EXECUTIVE CAREER OPPORTUNITY\n\nDear ${candidate.name.split(' ')[0]},\n\nI am reaching out regarding a senior turnaround leadership opportunity with a PE-backed growth firm...\n\nIn light of recent Chapter 11 proceedings at ${selectedTargetCompany.name}...`);
                          setActiveDesk('pitch');
                        }}
                        style={{
                          padding: '7px 12px',
                          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                          color: '#000',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 950,
                          cursor: 'pointer'
                        }}
                      >
                        <Mail size={13} /> AI Pitch
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DESK 2: WARN ACT STATE LAYOFF FEED & PLANT CLOSURES */}
          {(activeDesk === 'warn' || activeDesk === 'desk2') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1.5px solid #EF4444', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 950, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={18} color="#EF4444" /> STATE WARN ACT LAYOFF & PLANT CLOSURE WIRE — {selectedTargetCompany.name.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>
                    Jurisdiction: {selectedTargetCompany.locationJurisdiction || 'State Labor Department'} • Status: {selectedTargetCompany.courtCaseStatus || 'WARN Notice Disclosed'}
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 950, background: 'rgba(239, 68, 68, 0.2)', color: '#FCA5A5', padding: '4px 10px', borderRadius: '6px', border: '1px solid #EF4444' }}>
                  STATE LABOR VERIFIED
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
                {[
                  {
                    title: `WARN Layoff Notice: Corporate HQ & Ops (${selectedTargetCompany.name})`,
                    location: selectedTargetCompany.locationJurisdiction || 'State HQ Facility',
                    employees: '450 Impacted Employees',
                    date: 'Disclosed 14 Days Prior to Petition',
                    details: 'State Department of Labor filing indicating executive & operational layoffs effective 60 days post-notice.'
                  },
                  {
                    title: `Plant & Warehouse Lease Rejection (#365 Motion)`,
                    location: `${selectedTargetCompany.locationJurisdiction || 'Regional Logistics Hub'}`,
                    employees: '210 Regional Distribution Staff',
                    date: 'Effective Immediately upon Order',
                    details: 'Motion filed under 11 U.S.C. § 365 to reject commercial lease liabilities and consolidate freight operations.'
                  }
                ].map((warnItem, wIdx) => (
                  <div key={wIdx} style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 950, background: 'rgba(239, 68, 68, 0.2)', color: '#FCA5A5', padding: '2px 8px', borderRadius: '4px' }}>
                        {warnItem.employees}
                      </span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#94A3B8' }}>{warnItem.date}</span>
                    </div>
                    <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 950, color: '#FFF' }}>{warnItem.title}</h4>
                    <div style={{ fontSize: '0.76rem', color: '#38BDF8', fontWeight: 800 }}>📍 Location: {warnItem.location}</div>
                    <p style={{ margin: 0, fontSize: '0.74rem', color: '#94A3B8', lineHeight: 1.5 }}>{warnItem.details}</p>
                    <button
                      onClick={() => alert(`Generated State WARN Verification Memorandum for ${warnItem.title}`)}
                      style={{ padding: '6px 12px', background: 'rgba(239, 68, 68, 0.2)', color: '#FCA5A5', border: '1px solid #EF4444', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 900, cursor: 'pointer', marginTop: '6px' }}
                    >
                      📄 Download State WARN Disclosure Notice (.PDF)
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DESK 3: PRIVATE HEADHUNTER CANDIDATE ASSET MATCHER */}
          {(activeDesk === 'matcher' || activeDesk === 'poach' || activeDesk === 'desk3') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1.5px solid #38BDF8', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 950, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Upload size={18} color="#38BDF8" /> CANDIDATE-TO-PE PORTFOLIO ASSET MATCHER — {selectedTargetCompany.name.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>
                    Matching Executive Officers to PE Turnaround Portfolios & 363 Stalking Horse Buyers
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 950, background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', padding: '4px 10px', borderRadius: '6px', border: '1px solid #38BDF8' }}>
                  MATCH ALGORITHM ACTIVE
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
                {displayCandidates.map((cand, mIdx) => (
                  <div key={mIdx} style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 950, background: 'rgba(16, 185, 129, 0.25)', color: '#34D399', padding: '2px 8px', borderRadius: '4px', border: '1px solid #10B981' }}>
                        MATCH FIT: {94 + (mIdx % 5)}% EXCELLENT
                      </span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#FCD34D' }}>PE Turnaround Role</span>
                    </div>

                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 950, color: '#FFF' }}>{cand.name}</h3>
                      <div style={{ fontSize: '0.8rem', color: '#38BDF8', fontWeight: 900, marginTop: '2px' }}>{cand.currentRole}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px' }}>Target: {cand.company} ({cand.ticker})</div>
                    </div>

                    <div style={{ background: 'rgba(3, 7, 18, 0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px', fontSize: '0.74rem', color: '#CBD5E1' }}>
                      <strong style={{ color: '#38BDF8' }}>Matched PE Target Opportunity:</strong>
                      <div style={{ marginTop: '2px' }}>Turnaround Chief Restructuring / Portfolio Lead for $500M+ PE Buyout Fund</div>
                    </div>

                    <button
                      onClick={() => {
                        setPitchText(`CONFIDENTIAL HEADHUNTER CANDIDATE SUBMISSION\n\nTarget Executive: ${cand.name} (${cand.currentRole})\nCompany: ${cand.company}\nMatch Rating: 96%\n\nCandidate is free-agent ready following Chapter 11 proceedings.`);
                        setActiveDesk('pitch');
                      }}
                      style={{ padding: '8px 14px', background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)', color: '#000', border: 'none', borderRadius: '6px', fontSize: '0.76rem', fontWeight: 950, cursor: 'pointer' }}
                    >
                      💼 Submit Candidate to PE Hiring Committee
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DESK 4: AI OUTBOUND RECRUITER PITCH BUILDER */}
          {activeDesk === 'pitch' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #10B981', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 950, color: '#34D399', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={18} /> AI OUTBOUND CONFIDENTIAL PITCH BUILDER
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>
                    Tailored to executive targets at <strong>{selectedTargetCompany.name}</strong>
                  </div>
                </div>

                <span style={{ fontSize: '0.68rem', fontWeight: 900, background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', padding: '3px 8px', borderRadius: '4px', border: '1px solid #10B981' }}>
                  AI COPILOT ACTIVE
                </span>
              </div>

              {/* ⚡ AI COPILOT PROMPT BAR FOR DESK 4 */}
              <div style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                    <Sparkles size={15} color="#F59E0B" style={{ position: 'absolute', left: '10px' }} />
                    <input
                      type="text"
                      value={aiPitchPrompt}
                      onChange={(e) => setAiPitchPrompt(e.target.value)}
                      placeholder="Instruct AI CoPilot to refine pitch (e.g. 'Punch up confidentiality & add PE equity incentive')..."
                      style={{
                        width: '100%',
                        background: 'rgba(3, 7, 18, 0.95)',
                        border: '1px solid rgba(245, 158, 11, 0.5)',
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
                      if (!aiPitchPrompt.trim()) return;
                      setIsGeneratingPitch(true);
                      setTimeout(() => {
                        setPitchText(prev => `${prev}\n\n[REVISED BY RECRUITER AI COPILOT: ${aiPitchPrompt}]\n• Equity Retention Bonus: 1.5% - 2.5% Pool Allocation\n• Boarding Window: Immediate 30-Day Turnaround Start`);
                        setIsGeneratingPitch(false);
                      }, 700);
                    }}
                    disabled={isGeneratingPitch}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
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
                    {isGeneratingPitch ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                    <span>AI Refine Pitch</span>
                  </button>
                </div>

                {/* Quick Action Chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 800 }}>QUICK REFINEMENTS:</span>
                  {[
                    "⚡ Punch Up Confidentiality Hook",
                    "💼 Add PE Retention Offer",
                    "📊 Highlight Turnaround EBITDA",
                    "🔒 Emphasize Free Agent Status"
                  ].map((chipText, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => {
                        setAiPitchPrompt(chipText);
                        setIsGeneratingPitch(true);
                        setTimeout(() => {
                          setPitchText(prev => `${prev}\n\n[REVISED BY AI COPILOT: ${chipText}]\n• Retainer Equity Bonus Included\n• Confidential Discretion Guaranteed.`);
                          setIsGeneratingPitch(false);
                        }, 600);
                      }}
                      style={{
                        padding: '3px 8px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '4px',
                        color: '#FCD34D',
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
                value={pitchText}
                onChange={(e) => setPitchText(e.target.value)}
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
                    navigator.clipboard.writeText(pitchText);
                    alert('Copied confidential recruiter pitch to clipboard!');
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
                  <Copy size={14} /> Copy Pitch Text
                </button>

                <button
                  onClick={() => setIsEditorModalOpen(true)}
                  style={{
                    padding: '9px 18px',
                    background: 'rgba(245, 158, 11, 0.2)',
                    color: '#FCD34D',
                    border: '1px solid #F59E0B',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 950,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Edit3 size={14} /> Open Full-Screen AI Rich-Text Editor & Mobile Preview
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Full-Screen AI Rich-Text Editor & Mobile Preview Stage */}
      <FullScreenAIEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        initialText={pitchText}
        entity={selectedTargetCompany}
        format="executive_brief"
        tone="bloomberg"
      />

      {/* YouTube-Style Executive Share Modal */}
      <ExecutiveYouTubeShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        entity={selectedTargetCompany}
        customText={pitchText}
      />

      {/* Genuine Court Citation Vault Wrapper Modal */}
      <BCCCitationWrapperModal
        isOpen={isCitationWrapperOpen}
        onClose={() => setIsCitationWrapperOpen(false)}
        citation={{
          title: "Official Chapter 11 Voluntary Petition (Docket #001)",
          court: selectedTargetCompany.locationJurisdiction || "United States Bankruptcy Court for the District of Delaware",
          caseName: selectedTargetCompany.name,
          ticker: selectedTargetCompany.ticker,
          debt: selectedTargetCompany.debtAtCollapse || "$812 Million Total Liabilities",
          date: "August 11, 2026",
          checksum: "sha256-a8f4c991b72e004a89b1c",
          judge: "Hon. John T. Dorsey"
        }}
      />

    </div>
  );
}
