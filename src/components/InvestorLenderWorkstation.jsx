import React, { useState } from 'react';
import { 
  TrendingDown, DollarSign, Layers, ShieldCheck, Download, Share2, Sparkles, Send, Copy, 
  ExternalLink, Search, Filter, AlertTriangle, Clock, Briefcase, FileSpreadsheet, 
  Linkedin, Mail, ArrowRight, Upload, RefreshCw, CheckCircle2, ChevronRight, MapPin, Building2, Lock, Tag, Folder, Eye, Edit3, Grid, BarChart3, PieChart
} from 'lucide-react';
import DistressHeatmap from './DistressHeatmap';
import DipFinancingMonitor from './DipFinancingMonitor';
import RecoveryWaterfallModal from './RecoveryWaterfallModal';
import ExecutiveYouTubeShareModal from './ExecutiveYouTubeShareModal';
import BCCCitationWrapperModal from './BCCCitationWrapperModal';
import FullScreenAIEditorModal from './FullScreenAIEditorModal';

export default function InvestorLenderWorkstation({
  companies = [],
  onSelectCompany,
  onOpenWaterfall,
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
  const [activeDesk, setActiveDesk] = useState('heatmap'); // 'heatmap' (Desk 1) | 'dip' (Desk 2) | 'waterfall' (Desk 3) | 'memo' (Desk 4)
  const [priorityTag, setPriorityTag] = useState('investigation');
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
          { id: 'heatmap', label: '📊 Desk 1: Macro Distress Heatmap & Sector Intensity', icon: BarChart3, color: '#38BDF8' },
          { id: 'dip', label: '💳 Desk 2: DIP Loan & Pre-Filing Monitor', icon: DollarSign, color: '#10B981' },
          { id: 'waterfall', label: '🌊 Desk 3: Creditor Recovery Waterfall Simulator', icon: Layers, color: '#F59E0B' },
          { id: 'memo', label: '✍️ Desk 4: AI Institutional Credit Memo Builder', icon: Mail, color: '#EC4899' }
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
          borderRight: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'auto'
        }}>

          {/* Section 1: Target Distressed Company Selector (Unified DNA) */}
          <div>
            <div style={{ fontSize: '0.76rem', fontWeight: 950, color: '#10B981', letterSpacing: '0.05em', marginBottom: '8px' }}>
              🏢 TARGET DISTRESSED ENTITIES ({companies.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
              {companies.map(comp => (
                <div
                  key={comp.id || comp.ticker}
                  onClick={() => setSelectedTargetCompany(comp)}
                  style={{
                    background: selectedTargetCompany.ticker === comp.ticker ? 'rgba(16, 185, 129, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                    border: selectedTargetCompany.ticker === comp.ticker ? '1.5px solid #10B981' : '1px solid rgba(255,255,255,0.08)',
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
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, background: 'rgba(16,185,129,0.2)', color: '#34D399', padding: '2px 6px', borderRadius: '4px' }}>
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

          {/* Section 2: Priority Tagging */}
          <div>
            <span style={{ fontSize: '0.72rem', color: '#FFF', fontWeight: 800, display: 'block', marginBottom: '8px' }}>
              🏷️ Investment Thesis Priority Tag:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {[
                { id: 'breaking', label: '🚨 Breaking', color: '#EF4444' },
                { id: 'investigation', label: '📊 Deep Invest.', color: '#38BDF8' },
                { id: 'dip', label: '💳 DIP Credit', color: '#10B981' },
                { id: 'waterfall', label: '🌊 Waterfall', color: '#F59E0B' }
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
          <div style={{ background: 'rgba(3, 7, 18, 0.8)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.72rem', color: '#34D399', fontWeight: 900 }}>
                📄 COURT DIP CREDIT AGREEMENT
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
                👁️ Preview Docket
              </button>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#CBD5E1', lineHeight: 1.5 }}>
              Official $150M Senior DIP Credit Order & Stalking Horse Agreement for <strong>{selectedTargetCompany.name}</strong>.
            </div>
          </div>

          {/* Section 4: Saved Investment Scenarios Vault */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', color: '#FFF', fontWeight: 800 }}>
                📁 Saved Investment Scenarios ({savedScenarios.length}):
              </span>
              <button
                onClick={handleSaveScenario}
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
                + Save Thesis
              </button>
            </div>

            {savedStatusText && (
              <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 900 }}>
                {savedStatusText}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', flex: 1 }}>
              {savedScenarios.map(scen => (
                <div
                  key={scen.id}
                  onClick={() => setActiveScenarioId(scen.id)}
                  style={{
                    background: activeScenarioId === scen.id ? 'rgba(16, 185, 129, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                    border: activeScenarioId === scen.id ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 900, color: activeScenarioId === scen.id ? '#34D399' : '#F8FAFC' }}>
                    {scen.title}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span>Debt: {scen.debt}</span>
                    <span>{scen.date}</span>
                  </div>
                </div>
              ))}
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
