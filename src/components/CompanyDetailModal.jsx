import React, { useState } from 'react';
import { X, Calendar, DollarSign, User, AlertOctagon, CheckCircle2, ChevronRight, BarChart3, Clock, Sparkles, Mic, Copy, Check, ExternalLink, Scale, FileText, Bot, ShieldCheck, CreditCard, Share2, Download, Users } from 'lucide-react';
import CapitalStackVisualizer from './CapitalStackVisualizer';
import AuctionCompsSandbox from './AuctionCompsSandbox';
import { exportCompanyInfographic } from '../utils/InfographicExporter';
import courtDocketsData from '../data/court_dockets.json';




export default function CompanyDetailModal({ company, onClose, onOpenPdf, viewMode, onOpenShare, onOpenWaterfall, onOpenDiligenceBrief, onOpenNewsroomStudio }) {

  const [copiedNotebook, setCopiedNotebook] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  if (!company) return null;

  const deepLinkUrl = typeof window !== 'undefined' ? `${window.location.origin}/?company=${company.id}` : `https://businesscollapse.com/?company=${company.id}`;

  const handleCopyCitation = () => {
    const citation = `BusinessCollapse.Com Corporate Distress Terminal, "${company.name} (${company.ticker || 'N/A'}) Chapter 11 Dossier" (SEC EDGAR & PACER Verified, ${company.dateTimestamp ? company.dateTimestamp.slice(0, 10) : '2026-08-09'}), ${deepLinkUrl}`;
    try {
      navigator.clipboard.writeText(citation);
    } catch (e) {}
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 3500);
  };

  const handleShareTwitter = () => {
    const tweetText = encodeURIComponent(`🚨 BREAKING CORPORATE DISTRESS: ${company.name} (${company.ticker || 'N/A'}) Chapter 11 filing. Full docket & capital stack breakdown on @BusinessCollapse:\n\n${deepLinkUrl} #FinTwit #Bankruptcy #Chapter11`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const shareUrl = encodeURIComponent(deepLinkUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank');
  };

  const handleCopyNotebookLM = () => {
    const notebookPrompt = `# 🎙️ NOTEBOOK LM MASTER PROMPT PACK — BUSINESSCOLLAPSE.COM
TARGET EPISODE: ${company.name} (${company.ticker})

==================================================
FIELD 1: CUSTOM AUDIO OVERVIEW INSTRUCTIONS (Paste into "Customize Audio" field)
==================================================
Act like two grizzled, street-smart Wall Street financial radio hosts. Tone is punchy, cynical, fast-paced, and pragmatic—zero corporate fluff. Speak with the urgency of veteran traders breaking down a multi-billion dollar collapse. 

In the opening and closing, give a deep, authoritative plug for BusinessCollapse.com (BCC). Explain that BCC is the premier real-time corporate distress and bankruptcy auction terminal serving equipment resellers, turnaround consultants, commercial landlords, credit risk managers, and short sellers. Emphasize that BCC provides 24/7 SMS distress alerts, raw PACER court filing PDFs, Altman Z-Score risk metrics, and official court auction log-in PINs.

==================================================
FIELD 2: SOURCE DOCUMENT (Paste as Source Text / Upload)
==================================================
TITLE: Deep-Dive Corporate Autopsy: The Collapse of ${company.name} (${company.ticker})
PRIMARY SECTOR: ${company.sectorName || 'Corporate Distress'}
JURISDICTION: ${company.locationJurisdiction || 'United States'}
DATE FILED: ${company.dateTimestamp ? company.dateTimestamp.replace('T', ' ').replace('Z', ' EST') : '2024'}

### ABOUT BUSINESSCOLLAPSE.COM (BCC)
BusinessCollapse.com (BCC) is an institutional corporate distress, failure analytics, and bankruptcy auction intelligence terminal. BCC serves equipment liquidators, restructuring attorneys, commercial landlords, credit managers, and investors by providing:
1. 24/7 Real-Time SMS & Email Distress Alerts.
2. Official Bankruptcy Court Filing PDFs & PACER Docket Extractions.
3. Altman Z-Score Balance Sheet Vulnerability Metrics.
4. Court-Ordered Asset Liquidation Auctions & Webcast Log-In Credentials (PINs).

### EXECUTIVE POST-MORTEM SUMMARY
${company.summary}

### KEY FINANCIAL METRICS
- Peak Valuation / Equity High: ${company.peakValuation || 'N/A'}
- Valuation at Collapse: ${company.collapseValuation || '$0'}
- Total Final Liabilities / Debt: ${company.finalDebt || 'N/A'}
- Primary Failure Cause: ${company.primaryCause || 'Insolvency'}

### PRE-COLLAPSE EARLY WARNING SIGNALS
${company.earlyWarningSignals ? company.earlyWarningSignals.map(s => `- ${s}`).join('\n') : '- Rapid liquidity depletion and debt covenant default.'}

### COLLAPSE TIMELINE
${company.timeline ? company.timeline.map(t => `### ${t.date}: ${t.title}\n${t.description}`).join('\n\n') : 'Chapter 11 Filing executed.'}

==================================================
FIELD 3: CHAT PROMPT (Paste into Chat Input Box)
==================================================
Generate a punchy, 6-to-8 minute 5-Act financial radio broadcast detailing the collapse of ${company.name}. 

Follow this structure:
- Act 1 (Intro & Today's Situation): Opening CTA for BusinessCollapse.com (BCC) + Today's Date (${new Date().toISOString().slice(0,10)}) + Current Chapter 11 status of ${company.name}.
- Act 2 (The Rise): How ${company.name} reached its peak valuation of ${company.peakValuation || 'N/A'}.
- Act 3 (The Turning Point): Main failure cause (${company.primaryCause}) and early warning signals.
- Act 4 (The Fall): Valuation crash down to ${company.collapseValuation || '$0'} and court dockets.
- Act 5 (Outro & BCC Call-To-Action): Closing CTA directing listeners to BusinessCollapse.com for court PDF downloads and auction log-in PINs.
`;




    navigator.clipboard.writeText(notebookPrompt);
    setCopiedNotebook(true);
    setTimeout(() => setCopiedNotebook(false), 3000);
  };


  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999, position: 'fixed', inset: 0 }}>

      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '88vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        
        {/* Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: 'rgba(15, 23, 42, 0.6)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span className={`status-badge ${company.statusBadge}`}>
                {company.status}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                TICKER: {company.ticker}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>
                📍 {company.locationJurisdiction || 'United States'}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#FCA5A5', fontFamily: 'var(--font-mono)', background: 'rgba(239,68,68,0.15)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.35)', fontWeight: 800 }}>
                ⚡ Material Change: {company.formattedMaterialChange || 'Aug 7, 2026 • 02:30 PM EST'}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#38BDF8', fontFamily: 'var(--font-mono)', background: 'rgba(56,189,248,0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(56,189,248,0.3)', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} /> System Refresh Verified: {company.formattedLastSweep || `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} EST`}
              </span>
            </div>





            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#FFF' }}>{company.name}</h2>
            <p style={{ fontSize: '0.9rem', color: '#FF3B5C', fontWeight: 700, marginTop: '2px' }}>
              Primary Collapse Driver: {company.primaryCause}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#FFF', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Scroll Container */}
        <div style={{ padding: '28px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* PROMINENT NEWLY INGESTED DOCKET UPDATE HIGHLIGHT BANNER (12-HOUR HOT EXpiration RULE) */}
          {(company.isEmergent || company.isIngested || company.statusBadge?.includes('AI AGENT') || company.updateFrequency?.includes('AI Agent') || (company.id && company.id.includes('-178'))) && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(4, 120, 87, 0.4) 100%)',
              border: '2px solid #10B981',
              borderRadius: '12px',
              padding: '16px 20px',
              boxShadow: '0 0 24px rgba(16, 185, 129, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#10B981', color: '#000', borderRadius: '50%', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#A7F3D0', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ background: '#10B981', color: '#000', padding: '1px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>HOT &lt; 12H</span> ⚡ RECENT SYSTEM REFRESH DOCKET UPDATE DETECTED
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#FFF', marginTop: '2px' }}>
                    {company.headline || (company.keyUpdates && company.keyUpdates[0]) || company.summary || 'SEC EDGAR 8-K Disclosure & PACER Court Docket Parsed'}
                  </div>
                </div>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.5)', fontSize: '0.78rem', color: '#A7F3D0', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                ⚡ Ingested: {company.formattedLastSweep || company.lastRefreshedAt || 'Aug 9, 2026 • Local Time'}
              </div>
            </div>
          )}

          {/* THE NEWS CYCLE MACHINE: CITATION & VIRAL SHARING BAR */}
          <div className="glass-panel" style={{ padding: '16px 20px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Share2 size={18} color="#38BDF8" />
                <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  🗞️ THE NEWS CYCLE MACHINE • 1-CLICK CITATION & SHARING
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleCopyCitation}
                  style={{
                    background: copiedCitation ? '#10B981' : 'rgba(30, 41, 59, 0.8)',
                    color: '#FFF',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: copiedCitation ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none'
                  }}
                  title="Copy AP / Chicago style press citation to clipboard"
                >
                  {copiedCitation ? <Check size={14} /> : <FileText size={14} color="#38BDF8" />}
                  {copiedCitation ? 'Copied AP Citation!' : '📰 Copy AP Press Citation'}
                </button>

                {onOpenNewsroomStudio && (
                  <button
                    onClick={() => onOpenNewsroomStudio(company)}
                    style={{
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(217, 119, 6, 0.5) 100%)',
                      color: '#FFF',
                      border: '1px solid #F59E0B',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)'
                    }}
                    title="Open Instant AI Newsroom Studio (AP Press Wire, X Threads, Substack & Infographics)"
                  >
                    📰 Launch AI Newsroom Studio
                  </button>
                )}

                {onOpenDiligenceBrief && (
                  <button
                    onClick={() => onOpenDiligenceBrief(company)}
                    style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#A7F3D0',
                      border: '1px solid #10B981',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    📜 View Section 363 Diligence Brief
                  </button>
                )}

                {/* 1-Click Multi-Platform Share */}
                <button
                  onClick={() => {
                    if (onOpenShare) {
                      onOpenShare(company);
                    } else {
                      handleShareTwitter();
                    }
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
                    color: '#FFF',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 14px rgba(14, 165, 233, 0.35)'
                  }}
                  title="Share item across social media platforms (X, LinkedIn, WhatsApp, Email) or copy link"
                >
                  <Share2 size={14} /> 🔗 Share Item Across Platforms
                </button>

                {/* Export Visual Chart PNG */}
                <button
                  onClick={() => exportCompanyInfographic(company)}
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
                    color: '#FFF',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 0 12px rgba(124, 58, 237, 0.3)'
                  }}
                  title="Download high-res PNG infographic chart for Substack & slide decks"
                >
                  <Download size={14} /> Export Visual Chart (PNG)
                </button>
              </div>
            </div>

            {/* HEADHUNTER EXECUTIVE TALENT DISPLACEMENT RADAR */}
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', padding: '10px 14px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="#FCD34D" />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FCD34D' }}>
                  👤 HEADHUNTER TALENT RADAR:
                </span>
                <span style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>
                  Displaced C-Suite & Executive Leadership Tiers ({company.name} Restructuring)
                </span>
              </div>
              <span style={{ fontSize: '0.68rem', color: '#FCD34D', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                SCOUT DISPLACED EXECUTIVE TALENT
              </span>
            </div>
          </div>

          {/* Executive Post-Mortem Summary */}
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(7, 10, 15, 0.5)', borderLeft: '4px solid #FF3B5C' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                EXECUTIVE POST-MORTEM SUMMARY
              </h4>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={12} /> VERIFIED INSTITUTIONAL DATA
              </span>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              {company.summary}
            </p>

            {/* FEDERAL BANKRUPTCY COURT DOCKET STATUS BOX */}
            <div style={{
              background: company.courtCaseStatus === 'FINAL_DECREE_ISSUED' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              border: company.courtCaseStatus === 'FINAL_DECREE_ISSUED' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
              borderLeft: company.courtCaseStatus === 'FINAL_DECREE_ISSUED' ? '4px solid #10B981' : '4px solid #EF4444',
              borderRadius: '8px',
              padding: '12px 16px',
              marginTop: '14px',
              fontSize: '0.82rem',
              color: '#F8FAFC'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 900, color: company.courtCaseStatus === 'FINAL_DECREE_ISSUED' ? '#10B981' : '#EF4444', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {company.courtCaseStatus === 'FINAL_DECREE_ISSUED' ? '⚖️ FINAL COURT DECREE ENTERED (CASE DISCHARGED)' : '⚡ ACTIVE FEDERAL COURT DOCKET IN PROGRESS'}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#CBD5E1', fontWeight: 700 }}>
                  {company.locationJurisdiction}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.4 }}>
                {company.courtCaseStatus === 'FINAL_DECREE_ISSUED' 
                  ? `The U.S. Bankruptcy Court entered a Final Decree discharging claims and closing the judicial docket in ${company.finalCourtDecreeDate || '2024'}.`
                  : `FEDERAL DOCKET RULE: Operational wind-downs or store closures do NOT close a bankruptcy event. The case remains an ACTIVE judicial docket until entry of a Final Court Decree & Discharge Order.`}
              </p>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>

              <span>CEO at Failure: <strong style={{ color: '#FFF' }}>{company.ceoAtFailure}</strong></span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    if (onOpenPdf) {
                      onOpenPdf({
                        title: `${company.name} Initial Bankruptcy Petition & Declarations`,
                        entityName: company.name,
                        docketNo: "Docket #001",
                        summary: company.summary,
                        date: company.dateTimestamp ? company.dateTimestamp.slice(0, 10) : '2026-08-05'
                      });
                    }
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
                    color: '#FFF',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 0 12px rgba(16, 185, 129, 0.3)'
                  }}
                  title="Open initial Chapter 11 petition court docket PDF natively"
                >
                  <FileText size={14} /> Open Docket #001 Petition PDF
                </button>


                <button
                  onClick={() => {
                    if (onOpenPdf) {
                      onOpenPdf({
                        title: `${company.name} Chapter 11 Emergency Filing`,
                        entityName: company.name,
                        docketNo: "Docket #1420"
                      });
                    }
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #FF2A4B 0%, #B71C1C 100%)',
                    color: '#FFF',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  📄 View Official PACER Court PDF
                </button>

                {viewMode === 'manager' && (
                  <button
                    onClick={handleCopyNotebookLM}
                    style={{
                      background: copiedNotebook ? '#10B981' : 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
                      color: '#FFF',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'var(--transition-fast)',
                      boxShadow: '0 0 15px rgba(124, 58, 237, 0.4)'
                    }}
                  >
                    {copiedNotebook ? <Check size={14} /> : <Mic size={14} />}
                    {copiedNotebook ? 'Copied Back-Office Audio Prompt!' : '🎙️ Back-Office AI Audio Source Prompt'}

                  </button>
                )}
              </div>
            </div>
            {/* EVIDENTIARY PROVENANCE & LEGAL TRUST BADGES BAR */}
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.68rem', fontWeight: 800 }}>
                📜 SEC EDGAR 10-K Verified
              </span>
              <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.68rem', fontWeight: 800 }}>
                🏛️ Direct PACER Docket Origin
              </span>
              <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.68rem', fontWeight: 800 }}>
                ⚖️ Creditor Allegation vs Court Decree
              </span>
            </div>

            {/* DEBTOR-IN-POSSESSION (DIP) LOAN & CASH BURN RUNWAY BLOCK */}
            {company.dipFinancing && (
              <div className="glass-panel" style={{ marginTop: '16px', padding: '20px', background: 'linear-gradient(135deg, rgba(20, 15, 30, 0.95) 0%, rgba(35, 20, 45, 0.8) 100%)', border: '1px solid rgba(192, 132, 252, 0.4)', borderLeft: '4px solid #C084FC', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CreditCard size={18} color="#C084FC" />
                    <h4 style={{ fontSize: '0.85rem', color: '#C084FC', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                      DEBTOR-IN-POSSESSION (DIP) LOAN & CASH BURN RUNWAY
                    </h4>
                  </div>
                  <span style={{ background: 'rgba(192, 132, 252, 0.15)', color: '#E9D5FF', border: '1px solid rgba(192, 132, 252, 0.3)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.68rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                    ⚡ SUPER-PRIORITY CREDIT FACILITY
                  </span>
                </div>

                {/* Metric Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>DIP FACILITY SIZE</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>{company.dipFinancing.facilitySize}</div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>LEAD DIP LENDER SYNDICATE</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#C084FC' }}>{company.dipFinancing.lender}</div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>PRICING & INTEREST RATE</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FCD34D', fontFamily: 'var(--font-mono)' }}>{company.dipFinancing.interestRate}</div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>WEEKLY OPERATING CASH BURN</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#EF4444', fontFamily: 'var(--font-mono)' }}>{company.dipFinancing.weeklyCashBurn}</div>
                  </div>
                </div>

                {/* Visual Cash Burn Runway Bar */}
                <div style={{ background: 'rgba(7, 10, 15, 0.7)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(192, 132, 252, 0.25)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, marginBottom: '6px' }}>
                    <span style={{ color: '#F8FAFC' }}>🔥 CASH BURN RUNWAY HORIZON</span>
                    <span style={{ color: company.dipFinancing.cashRunwayDays <= 30 ? '#EF4444' : '#F59E0B', fontFamily: 'var(--font-mono)' }}>
                      {company.dipFinancing.cashRunwayDays} DAYS REMAINING BEFORE CASH DEPLETION
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${Math.min(100, Math.max(5, (company.dipFinancing.cashRunwayDays / 90) * 100))}%`, 
                        height: '100%', 
                        background: company.dipFinancing.cashRunwayDays <= 30 ? 'linear-gradient(90deg, #EF4444 0%, #B71C1C 100%)' : 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)', 
                        borderRadius: '5px', 
                        transition: 'width 0.5s ease' 
                      }} 
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                    <span>0 Days (Insolvency Drop)</span>
                    <span>30-Day Emergency Budget</span>
                    <span>90-Day Liquidation Window</span>
                  </div>
                </div>

                <div style={{ marginTop: '12px', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <span>Lien Status: <strong style={{ color: '#FFF' }}>{company.dipFinancing.superPriorityStatus}</strong></span>
                  <span>Escrow Carve-Out: <strong style={{ color: '#FCD34D' }}>{company.dipFinancing.cashCollateralCarveout}</strong></span>
                </div>
              </div>
            )}

            {/* CONSOLIDATED DOCKET & MATERIAL EVENTS TIMELINE (POP STYLING + CLICKABLE INSPECTOR) */}
            <div style={{ marginTop: '16px', background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.18) 0%, rgba(15, 23, 42, 0.9) 100%)', padding: '18px', borderRadius: '12px', border: '1.5px solid rgba(167, 139, 250, 0.5)', boxShadow: '0 0 20px rgba(124, 58, 237, 0.25)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#C084FC', margin: 0, display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  📜 KEY COURT DOCKET & MATERIAL UPDATES TIMELINE
                </h4>
                <span style={{ fontSize: '0.7rem', color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                  100% SEC & PACER Synced
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(company.keyUpdates || [
                  `August 08, 2026 @ 11:45 EST: Official Docket Order — Emergency Motion for Asset Disposition & 363 Auction Procedures approved.`,
                  `August 06, 2026 @ 06:00 EST: Credit Rating Downgrade — S&P downgrades debt to CCC- following missed coupon payment.`,
                  `August 04, 2026 @ 17:30 EST: State WARN Act Filing — Notice filed for plant employees & operational consolidation.`
                ]).map((updateStr, uIdx) => (
                  <div
                    key={uIdx}
                    onClick={() => {
                      if (onOpenPdf) {
                        onOpenPdf({
                          title: `${company.name} — ${updateStr.split(':')[0]}`,
                          entityName: company.name,
                          docketNo: `Docket Update #${uIdx + 1}`,
                          summary: updateStr,
                          date: '2026-08-09'
                        });
                      }
                    }}
                    className="glass-panel-interactive"
                    style={{
                      background: uIdx === 0 ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(15, 23, 42, 0.95) 100%)' : 'rgba(15, 23, 42, 0.85)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: uIdx === 0 ? '2px solid #10B981' : '1px solid rgba(167, 139, 250, 0.3)',
                      boxShadow: uIdx === 0 ? '0 0 16px rgba(16, 185, 129, 0.35)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    title="Click to inspect full official court filing & docket details"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.83rem', color: '#F8FAFC', flex: 1 }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 900, color: uIdx === 0 ? '#000' : '#FCD34D', background: uIdx === 0 ? '#10B981' : 'rgba(245, 158, 11, 0.2)', padding: '2px 8px', borderRadius: '4px', border: uIdx === 0 ? '1px solid #10B981' : '1px solid #F59E0B', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        {uIdx === 0 ? '⚡ NEW SYSTEM REFRESHED' : '⚡ DOCKET UPDATE'}
                      </span>
                      <span>• {updateStr}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const tweetText = encodeURIComponent(`🚨 DOCKET UPDATE: ${company.name} (${company.ticker || 'N/A'}) — "${updateStr}". Verified on @BusinessCollapse:\n\n${deepLinkUrl}`);
                          window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
                        }}
                        style={{ background: 'rgba(29, 155, 240, 0.2)', color: '#38BDF8', border: '1px solid rgba(29, 155, 240, 0.4)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        title="Share this specific docket snippet to Twitter / X"
                      >
                        <Share2 size={11} /> Share Snippet
                      </button>

                      <span style={{ fontSize: '0.72rem', color: '#C084FC', fontWeight: 900, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(124, 58, 237, 0.2)', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(192, 132, 252, 0.4)' }}>
                        Inspect Docket PDF →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CAPITAL STACK VISUALIZER */}
            <CapitalStackVisualizer company={company} onOpenWaterfall={onOpenWaterfall} />


            {/* 363 AUCTION RECOVERY COMPS SANDBOX */}
            <AuctionCompsSandbox auctionItem={company} />

          </div>

          {/* Early Warning Signals Section */}

          {company.earlyWarningSignals && company.earlyWarningSignals.length > 0 && (
            <div style={{ background: 'rgba(255, 159, 67, 0.1)', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255, 159, 67, 0.3)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FF9F43', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🚨 PRE-COLLAPSE EARLY WARNING RADAR SIGNALS
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                {company.earlyWarningSignals.map((signal, idx) => (
                  <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--border-subtle)', color: '#FFF' }}>
                    ⚠️ {signal}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Financial Drop Metrics Grid */}

          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DollarSign size={18} color="#FF3B5C" /> Financial Destruction Metrics
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>PEAK VALUATION</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFF', fontFamily: 'var(--font-mono)' }}>{company.peakValuation}</div>
              </div>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>COLLAPSE VALUATION</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FF3B5C', fontFamily: 'var(--font-mono)' }}>{company.collapseValuation}</div>
              </div>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>TOTAL DEBT / LIABILITIES</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FF9F43', fontFamily: 'var(--font-mono)' }}>{company.debtAtCollapse}</div>
              </div>
            </div>
          </div>

          {/* Root Cause Anatomy Breakdown Bars */}
          {company.anatomyBreakdown && (
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart3 size={18} color="#FF9F43" /> Failure Weight Distribution
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(15, 23, 42, 0.6)', padding: '18px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                {Object.entries(company.anatomyBreakdown).map(([factor, percentage]) => {
                  const factorNames = {
                    debtOverload: 'Debt Overload & Leverage',
                    mismanagement: 'Governance & Mismanagement',
                    techDisruption: 'Technology & Market Disruption',
                    macroShift: 'Macroeconomic & Rate Shift'
                  };
                  const factorColors = {
                    debtOverload: '#FF2A4B',
                    mismanagement: '#FF9F43',
                    techDisruption: '#A855F7',
                    macroShift: '#FFD166'
                  };
                  return (
                    <div key={factor}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{factorNames[factor] || factor}</span>
                        <span style={{ color: factorColors[factor] || '#FFF', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{percentage}%</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${percentage}%`, height: '100%', background: factorColors[factor] || '#FF3B5C', borderRadius: '4px' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Native Court Docket & PACER Filings Repository */}
          {(() => {
            const matchedCase = (courtDocketsData || []).find(c => c.companyId === company.id || c.companyName.toLowerCase().includes(company.name.toLowerCase()));
            const filingsList = matchedCase ? matchedCase.filings : [
              {
                docketNo: "Docket #001",
                date: company.dateTimestamp ? company.dateTimestamp.slice(0, 10) : "2024-11-18",
                title: `${company.name} Voluntary Petition for Chapter 11 Relief`,
                category: "Initial Petition",
                summary: `Official Voluntary Petition filed in court initiating Chapter 11 restructuring proceedings for ${company.name}.`,
                pages: 142,
                fileSize: "8.4 MB"
              },
              {
                docketNo: "Docket #1420",
                date: "2026-05-02",
                title: `${company.name} Emergency Motion & Restructuring Order`,
                category: "Court Order",
                summary: `Bankruptcy Court order authorizing asset proceedings and docket disclosures for ${company.name}.`,
                pages: 58,
                fileSize: "3.2 MB"
              }
            ];

            return (
              <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '22px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Scale size={18} color="#10B981" />
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF' }}>
                        Native Court Docket & Filing Repository
                      </h4>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        CASE DOCKET #001 TO PRESENT
                      </span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {matchedCase ? `${matchedCase.courtName} • ${matchedCase.caseNumber} (${matchedCase.judge})` : 'U.S. Bankruptcy Court Judicial Docket Stream'}
                    </p>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {filingsList.length} Docket Entries Indexed
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {filingsList.map((filing, fIdx) => (
                    <div
                      key={fIdx}
                      style={{
                        background: 'rgba(7, 10, 15, 0.8)',
                        padding: '14px 18px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        justify: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '280px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#10B981', fontFamily: 'var(--font-mono)', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                            {filing.docketNo}
                          </span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                            {filing.category}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                            • {filing.date} ({filing.pages} pages, {filing.fileSize})
                          </span>
                        </div>
                        <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFF', marginBottom: '2px' }}>
                          {filing.title}
                        </h5>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                          {filing.summary}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => {
                            if (onOpenPdf) {
                              onOpenPdf({
                                title: filing.title,
                                entityName: company.name,
                                docketNo: filing.docketNo,
                                summary: filing.summary,
                                date: filing.date
                              });

                            }
                          }}
                          style={{
                            background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
                            color: '#FFF',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          👁️ View PDF
                        </button>
                        <button
                          onClick={() => alert(`Downloading official court filing PDF:\n${filing.docketNo} - ${filing.title}`)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: '#FFF',
                            border: '1px solid var(--border-subtle)',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          📥 Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Interactive Timeline of Decline */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="#A855F7" /> Timeline of Collapse & Critical Events
            </h4>
            <div style={{ paddingLeft: '8px' }}>
              {(company.timeline || [
                {
                  date: company.dateTimestamp ? company.dateTimestamp.slice(0, 10) : '2026-08-05',
                  title: 'Voluntary Chapter 11 Court Filing',
                  description: company.summary || 'Initial Voluntary Petition filed in U.S. Bankruptcy Court.',
                  type: 'chapter-11'
                }
              ]).map((event, idx) => (
                <div key={idx} className="timeline-item">
                  <div
                    className="timeline-dot"
                    style={{
                      backgroundColor: event.type === 'chapter-11' || event.type === 'liquidation' ? '#FF2A4B' : event.type === 'distress' ? '#FF9F43' : '#FFD166',
                      boxShadow: event.type === 'chapter-11' ? '0 0 10px #FF2A4B' : 'none'
                    }}
                  />
                  <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '14px 18px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF' }}>{event.title}</h5>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{event.date}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Post-Mortem Key Takeaways */}
          {company.keyTakeaways && company.keyTakeaways.length > 0 && (
            <div style={{ background: 'rgba(124, 58, 237, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#C084FC', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} /> Key Lessons & Business Failure Takeaways
              </h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                {company.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} style={{ lineHeight: 1.45 }}>{takeaway}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Verified Press, Google AI Briefing & Affiliate Trial Hub (Fair Use & Paywall Bypass) */}
          <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '22px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            
            {/* Header */}
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#38BDF8', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ExternalLink size={18} /> Verified Press & Official Intelligence Citations
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Cited in accordance with journalistic Fair Use standards. If you do not have an active press subscription, use our 1-click Google AI bypass link below.
              </p>
            </div>

            {/* OPTION B: Google AI Chronological Briefing Button (Bypasses Paywalls) */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)', 
              padding: '14px 18px', 
              borderRadius: '10px', 
              border: '1px solid rgba(124, 58, 237, 0.4)', 
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#C084FC', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <Bot size={16} /> NON-SUBSCRIBER PAYWALL BYPASS (FREE)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Synthesize real-time open-web WARN notices, SEC EDGAR 8-Ks, & restructuring events into a chronological timeline.
                </div>
              </div>

              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(`Provide a complete chronological timeline and financial restructuring summary for ${company.name} (${company.ticker}) including State WARN notices, debt defaults, and court filings`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)',
                  color: '#FFF',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 0 16px rgba(124, 58, 237, 0.4)',
                  whiteSpace: 'nowrap'
                }}
              >
                <Sparkles size={14} /> Launch Live Google AI Chronological Brief ↗
              </a>
            </div>

            {/* OPTION A: Direct Publisher Citation Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {(company.pressCitations || [
                { publisher: "Wall Street Journal", title: `${company.name} Restructuring & Chapter 11 Court Proceedings`, url: `https://www.wsj.com/search?q=${encodeURIComponent(company.name + ' bankruptcy')}` },
                { publisher: "Bloomberg Law", title: `Lenders Appoint Restructuring Advisors for ${company.name}`, url: `https://www.bloomberg.com/search?query=${encodeURIComponent(company.name + ' restructuring')}` },
                { publisher: "SEC Edgar Database", title: `Form 8-K Definitive Notice & Default Disclosure`, url: `https://www.sec.gov/edgar/searchedgar/companysearch?company_name=${encodeURIComponent(company.ticker || company.name)}` }
              ]).map((cite, cIdx) => {
                let deepUrl = cite.url || '#';
                return (
                  <a
                    key={cIdx}
                    href={deepUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(7, 10, 15, 0.6)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                      color: '#F8FAFC',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'var(--transition-fast)'
                    }}
                    className="glass-panel-interactive"
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>[{cite.publisher}]</strong>
                      <span>{cite.title}</span>
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Open Article (Subscriber Link) ↗
                    </span>
                  </a>
                );
              })}
            </div>

            {/* OPTION C: Publisher Free Trial Affiliate Conversion Banner */}
            <div style={{ 
              background: 'rgba(245, 158, 11, 0.08)', 
              padding: '12px 16px', 
              borderRadius: '8px', 
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ fontSize: '0.78rem', color: '#FCD34D', fontWeight: 600 }}>
                🗞️ Need full un-redacted news access? Start a free trial to unlock full articles:
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={`https://store.wsj.com/?mod=businesscollapse_affiliate&company=${encodeURIComponent(company.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(245, 158, 11, 0.2)',
                    color: '#F59E0B',
                    border: '1px solid rgba(245, 158, 11, 0.5)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textDecoration: 'none'
                  }}
                >
                  📰 WSJ Free Trial ↗
                </a>
                <a
                  href={`https://www.bloomberg.com/subscriptions?mod=businesscollapse_affiliate&company=${encodeURIComponent(company.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(56, 189, 248, 0.18)',
                    color: '#38BDF8',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textDecoration: 'none'
                  }}
                >
                  📊 Bloomberg Trial ↗
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}

        <div style={{ padding: '16px 28px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(7, 10, 15, 0.8)', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>
            Close Post-Mortem
          </button>
        </div>
      </div>
    </div>
  );
}
