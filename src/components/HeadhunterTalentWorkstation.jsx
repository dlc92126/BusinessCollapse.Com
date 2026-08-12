import React, { useState } from 'react';
import { 
  Users, UserCheck, ShieldCheck, Download, Share2, Sparkles, Send, Copy, Check, 
  ExternalLink, Search, Filter, AlertTriangle, Clock, Briefcase, FileSpreadsheet, 
  Linkedin, Mail, ArrowRight, Upload, RefreshCw, CheckCircle2, ChevronRight, MapPin, Building2, Lock, Tag, Folder, Eye, Edit3, Monitor, Smartphone, Link
} from 'lucide-react';
import ExecutiveYouTubeShareModal from './ExecutiveYouTubeShareModal';
import BCCCitationWrapperModal from './BCCCitationWrapperModal';
import FullScreenAIEditorModal from './FullScreenAIEditorModal';

export default function HeadhunterTalentWorkstation({
  companies = [],
  onOpenEmailClient,
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
  const [activeDesk, setActiveDesk] = useState('radar'); // 'radar' | 'warn' | 'matcher' | 'pitch'
  const [priorityTag, setPriorityTag] = useState('talent');
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

  // Filter candidates for selected company
  const companyCandidates = candidateDatabase.filter(c => 
    c.company.toLowerCase().includes(selectedTargetCompany.name.toLowerCase()) || 
    (c.ticker && selectedTargetCompany.ticker && c.ticker.toLowerCase() === selectedTargetCompany.ticker.toLowerCase())
  );

  const displayCandidates = companyCandidates.length > 0 ? companyCandidates : candidateDatabase;

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
          { id: 'radar', label: '🎯 Desk 1: Deep C-Suite & KERP Talent Radar', icon: Users, color: '#F59E0B' },
          { id: 'warn', label: '📄 Desk 2: WARN Act State Layoff Feed', icon: Clock, color: '#EF4444' },
          { id: 'matcher', label: '💼 Desk 3: Private Headhunter Candidate Asset Matcher', icon: Upload, color: '#38BDF8' },
          { id: 'pitch', label: '✉️ Desk 4: AI Outbound Recruiter Pitch Builder', icon: Mail, color: '#10B981' }
        ].map(desk => {
          const Icon = desk.icon;
          const isActive = activeDesk === desk.id;
          return (
            <button
              key={desk.id}
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
        {/* LEFT COLUMN: SHARED WORKSTATION ORGANIZER & SELECTOR */}
        {/* ---------------------------------------------------- */}
        <div style={{
          width: '340px',
          background: 'rgba(9, 13, 22, 0.98)',
          borderRight: '1px solid rgba(245, 158, 11, 0.25)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'auto'
        }}>

          {/* Section 1: Target Distressed Company Selector (Unified DNA) */}
          <div>
            <div style={{ fontSize: '0.76rem', fontWeight: 950, color: '#F59E0B', letterSpacing: '0.05em', marginBottom: '8px' }}>
              🏢 TARGET DISTRESSED COMPANIES ({companies.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
              {companies.map(comp => (
                <div
                  key={comp.id || comp.ticker}
                  onClick={() => setSelectedTargetCompany(comp)}
                  style={{
                    background: selectedTargetCompany.ticker === comp.ticker ? 'rgba(245, 158, 11, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                    border: selectedTargetCompany.ticker === comp.ticker ? '1.5px solid #F59E0B' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 950, color: selectedTargetCompany.ticker === comp.ticker ? '#FFF' : '#CBD5E1' }}>
                      {comp.name}
                    </span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, background: 'rgba(239,68,68,0.2)', color: '#EF4444', padding: '2px 6px', borderRadius: '4px' }}>
                      {comp.ticker || 'DEBT'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px' }}>
                    {comp.debtAtCollapse || '$500M+ Debt'} • {comp.locationJurisdiction || 'US Court'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Story & Talent Priority Tagging */}
          <div>
            <span style={{ fontSize: '0.72rem', color: '#FFF', fontWeight: 800, display: 'block', marginBottom: '8px' }}>
              🏷️ Story & Raid Priority Tag:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {[
                { id: 'breaking', label: '🚨 Breaking', color: '#EF4444' },
                { id: 'investigation', label: '📊 Deep Invest.', color: '#38BDF8' },
                { id: 'talent', label: '💼 C-Suite Raid', color: '#F59E0B' },
                { id: 'auction', label: '💰 363 Auction', color: '#10B981' }
              ].map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setPriorityTag(tag.id)}
                  style={{
                    padding: '6px 8px',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    border: priorityTag === tag.id ? `1.5px solid ${tag.color}` : '1px solid rgba(255,255,255,0.1)',
                    background: priorityTag === tag.id ? `${tag.color}25` : 'rgba(30, 41, 59, 0.5)',
                    color: priorityTag === tag.id ? '#FFF' : '#94A3B8'
                  }}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: PACER Citation Vault Trigger */}
          <div style={{ background: 'rgba(3, 7, 18, 0.8)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.72rem', color: '#FCD34D', fontWeight: 900 }}>
                📄 PACER COURT EVIDENCE VAULT
              </span>
              <button
                onClick={() => setIsCitationWrapperOpen(true)}
                style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#34D399',
                  border: '1px solid #10B981',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '0.65rem',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                👁️ Preview Wrapper
              </button>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#CBD5E1', lineHeight: 1.5 }}>
              Official Court Petition Docket #001 & Section 365 Lease Rejection Motion for <strong>{selectedTargetCompany.name}</strong>.
            </div>
          </div>

          {/* Section 4: Saved Target Candidate Pools Vault */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', color: '#FFF', fontWeight: 800 }}>
                📁 Saved Target Pools ({savedTargets.length}):
              </span>
              <button
                onClick={handleSaveTargetPool}
                style={{
                  padding: '3px 8px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#34D399',
                  border: '1px solid #10B981',
                  borderRadius: '4px',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                + Save Target
              </button>
            </div>

            {savedStatusText && (
              <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 900 }}>
                {savedStatusText}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', flex: 1 }}>
              {savedTargets.map(tgt => (
                <div
                  key={tgt.id}
                  onClick={() => setActiveTargetId(tgt.id)}
                  style={{
                    background: activeTargetId === tgt.id ? 'rgba(245, 158, 11, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                    border: activeTargetId === tgt.id ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 900, color: activeTargetId === tgt.id ? '#FCD34D' : '#F8FAFC' }}>
                    {tgt.title}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span>{tgt.count}</span>
                    <span>{tgt.date}</span>
                  </div>
                </div>
              ))}
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

          {/* DESK 1: DEEP C-SUITE & KERP TALENT RAID RADAR */}
          {activeDesk === 'radar' && (
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
