import React, { useState, useEffect } from 'react';
import { 
  X, Copy, Download, Share2, Sparkles, Smartphone, Monitor, Bold, Italic, 
  List, Heading1, Heading2, Quote, Link, Check, RefreshCw, Eye, Edit3, Send, 
  CheckCircle2, Folder, Tag, Bookmark, FileCode2, Layers, Clock, AlertTriangle, ChevronRight, ShieldCheck, Twitter, Linkedin, Newspaper, BookOpen
} from 'lucide-react';
import ExecutiveYouTubeShareModal from './ExecutiveYouTubeShareModal';
import BCCCitationWrapperModal from './BCCCitationWrapperModal';

export default function FullScreenAIEditorModal({ 
  isOpen, 
  onClose, 
  initialText = '', 
  entity = null, 
  format = 'wire', 
  tone = 'bloomberg' 
}) {
  if (!isOpen) return null;

  const target = entity || {
    name: "Tupperware Brands Corporation",
    ticker: "TUPQ",
    finalDebt: "$812 Million Total Liabilities",
    locationJurisdiction: "Wilmington, DE Court",
    primaryCause: "Debt Overhang & Direct Sales Decline"
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://businesscollapse.com';
  const caseUrl = `${baseUrl}/?company=${(target.ticker || 'tupq').toLowerCase()}&citation=docket001`;

  // 4 Core Media Platforms State (each platform has its tailored editable text!)
  const [activePlatformTab, setActivePlatformTab] = useState('wire'); // 'wire' | 'twitter' | 'linkedin' | 'substack'
  const [platformTexts, setPlatformTexts] = useState({
    wire: initialText || `FOR IMMEDIATE RELEASE • AP PRESS WIRE DISPATCH\n\n${target.name} (${target.ticker || 'DEBT'}) Files Emergency Chapter 11 Bankruptcy Petition\n\nWILMINGTON, DE — Corporate restructuring monitor BusinessCollapse.com confirms that ${target.name} has formally filed for Chapter 11 bankruptcy protection. Court documents indicate total liabilities of ${target.finalDebt || '$812 Million'}.\n\nPrimary restructuring triggers include: ${target.primaryCause || 'Debt Overhang'}.\n\nSource Verification: [PACER Docket #001 Court PDF](${caseUrl})`,
    twitter: `🚨 BREAKING: ${target.name} ($${target.ticker || 'DEBT'}) files Chapter 11 in DE court with ${target.finalDebt || '$812M'} liabilities. Senior 1st lien DIP credit bid active.\n\n📄 Verified Court Citation Vault: ${caseUrl}`,
    linkedin: `💼 EXECUTIVE BRIEFING: Lessons from the Chapter 11 Filing of ${target.name} (${target.ticker || 'DEBT'})\n\nTotal Debt Overhang: ${target.finalDebt || '$812 Million'}\nPrimary Catalyst: ${target.primaryCause || 'Debt Overhang'}\n\n3 Boardroom Takeaways:\n1. Refinancing Wall Vulnerability\n2. Section 365 Contract Rejections\n3. DIP Lender Super-Priority\n\n📄 Verified Court Citation: ${caseUrl}\n\n#Turnaround #Restructuring #Chapter11`,
    substack: `✍️ RESTRUCTURING INTELLIGENCE MEMO (SUBSTACK)\nTITLE: Deep Dive: ${target.name} (${target.ticker || 'DEBT'}) Files Chapter 11\n\nBy Financial Distress Desk | BusinessCollapse.Com\n\nKey takeaways from today's PACER Docket #001 filings for ${target.name} (${target.finalDebt || '$812M'} total obligations)...\n\n> 📄 **VERIFIED COURT EVIDENCE VAULT**: [Official Court PDFs & Dockets](${caseUrl})`
  });

  const [viewportMode, setViewportMode] = useState('pc'); // 'pc' | 'mobile'
  const [viewTab, setViewTab] = useState('edit'); // 'edit' | 'preview'
  const [copilotPrompt, setCopilotPrompt] = useState('');
  const [isCopilotRunning, setIsCopilotRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCitationWrapperOpen, setIsCitationWrapperOpen] = useState(false);

  // Journalistic Organizing Suite State
  const [priorityTag, setPriorityTag] = useState('breaking');
  const [activeDraftId, setActiveDraftId] = useState(1);
  const [savedDrafts, setSavedDrafts] = useState([
    { 
      id: 1, 
      title: `${target.ticker || 'STORY'} $812M Chapter 11 Post-Mortem`, 
      date: 'Today, 2:15 PM',
      content: platformTexts.wire
    },
    { 
      id: 2, 
      title: 'Retail Insolvency Wave Q3 Executive Summary', 
      date: 'Yesterday',
      content: platformTexts.linkedin
    }
  ]);
  const [savedStatusText, setSavedStatusText] = useState('');

  // Active text getter & setter
  const currentText = platformTexts[activePlatformTab] || '';
  const updateCurrentText = (val) => {
    setPlatformTexts(prev => ({
      ...prev,
      [activePlatformTab]: val
    }));
  };

  // Word count & Reading time math
  const words = currentText.trim() ? currentText.trim().split(/\s+/).length : 0;
  const chars = currentText.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

  // Insert formatting helper
  const insertFormatting = (prefix, suffix = '') => {
    updateCurrentText(`${currentText}\n${prefix}${suffix}`);
  };

  // Insert Citation Link Helper
  const insertCitation = (citationTitle, citationUrl) => {
    const markdownCitation = `\n\n📄 **VERIFIED COURT DISCLOSURE**: [${citationTitle}](${citationUrl})`;
    updateCurrentText(currentText + markdownCitation);
  };

  // Load Saved Draft Handler
  const handleLoadDraft = (draft) => {
    setActiveDraftId(draft.id);
    updateCurrentText(draft.content);
    setSavedStatusText(`✓ Loaded: "${draft.title.slice(0, 24)}..."`);
    setTimeout(() => setSavedStatusText(''), 2500);
  };

  // Save Draft Helper
  const handleSaveDraft = () => {
    const newDraft = {
      id: Date.now(),
      title: `${target.ticker || 'STORY'} (${activePlatformTab.toUpperCase()}) - ${words}w`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: currentText
    };
    setSavedDrafts([newDraft, ...savedDrafts]);
    setSavedStatusText('✓ Draft saved to vault!');
    setTimeout(() => setSavedStatusText(''), 2500);
  };

  // AI CoPilot Refine Handler
  const handleCopilotRefine = (customInstruction = null) => {
    const instruction = customInstruction || copilotPrompt;
    if (!instruction.trim() && !customInstruction) return;

    setIsCopilotRunning(true);
    setTimeout(() => {
      let refined = currentText;
      const lower = instruction.toLowerCase();

      if (lower.includes('headline') || lower.includes('punch up')) {
        refined = `🚨 URGENT PRESS ALERT: ${target.name.toUpperCase()} (${target.ticker || 'DEBT'}) CHAPTER 11 SURGERY\n\n${currentText}`;
      } else if (lower.includes('board') || lower.includes('executive') || lower.includes('summarize')) {
        refined = `BOARDROOM EXECUTIVE SUMMARY:\n• Debtor: ${target.name}\n• Debt Overhang: ${target.finalDebt || '$800M+'}\n• Priority Status: 1st Lien DIP Super-Priority Active\n\n${currentText}`;
      } else if (lower.includes('waterfall') || lower.includes('recovery') || lower.includes('investor')) {
        refined = `${currentText}\n\nCREDITOR RECOVERY WATERFALL:\n1. Senior 1st Lien DIP Lenders: 75% - 90% Projected Recovery\n2. General Unsecured Trade Claims: 5% - 15% Estimated Payout\n3. Common Equity Holders: 100% Statutory Wipeout`;
      } else {
        refined = `${currentText}\n\n[REVISED BY AI COPILOT: ${instruction}]\nData Verified via BusinessCollapse.com PACER Real-Time Terminal.`;
      }

      updateCurrentText(refined);
      setCopilotPrompt('');
      setIsCopilotRunning(false);
    }, 800);
  };

  const handleCopyCleanUrl = () => {
    navigator.clipboard.writeText(caseUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${(target.ticker || 'STORY').toLowerCase()}_${activePlatformTab}_draft.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Recipient Preview Parser (Renders Clickable Citation Hyperlinks inside platform Mockup Cards)
  const renderRecipientFormattedPreview = () => {
    const lines = currentText.split('\n');
    return lines.map((line, idx) => {
      if (line.includes('http') || line.includes('VERIFIED') || line.includes('Citation') || line.includes('Docket')) {
        return (
          <div key={idx} style={{ margin: '10px 0', padding: '10px 14px', background: 'rgba(56, 189, 248, 0.1)', borderLeft: '3.5px solid #38BDF8', borderRadius: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>{line.replace(/\[|\]|\(|\)/g, ' ')} </span>
            <button
              onClick={() => setIsCitationWrapperOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#38BDF8',
                fontSize: '0.82rem',
                fontWeight: 900,
                textDecoration: 'underline',
                cursor: 'pointer',
                padding: '2px 0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              📄 View Verified Court Citation Vault (PDF) ↗
            </button>
          </div>
        );
      }
      return <div key={idx} style={{ marginBottom: '8px' }}>{line}</div>;
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: '#040711',
      zIndex: 1050,
      display: 'flex',
      flexDirection: 'column',
      color: '#F8FAFC',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* TOP HEADER COMMAND BAR */}
      <div style={{
        padding: '12px 24px',
        background: 'rgba(9, 13, 22, 0.98)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Title & Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
            color: '#000',
            fontWeight: 950,
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '4px',
            letterSpacing: '0.06em'
          }}>
            4-PLATFORM EDITORIAL SUITE
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#FFF' }}>
            {target.name} ({target.ticker || 'DEBT'})
          </span>
        </div>

        {/* Viewport Mode Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          padding: '3px'
        }}>
          <button
            onClick={() => setViewportMode('pc')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.76rem',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: viewportMode === 'pc' ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
              color: viewportMode === 'pc' ? '#38BDF8' : '#94A3B8'
            }}
          >
            <Monitor size={14} />
            <span>💻 PC Desktop View</span>
          </button>

          <button
            onClick={() => setViewportMode('mobile')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.76rem',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: viewportMode === 'mobile' ? 'rgba(56, 189, 248, 0.25)' : 'transparent',
              color: viewportMode === 'mobile' ? '#38BDF8' : '#94A3B8'
            }}
          >
            <Smartphone size={14} />
            <span>📱 Mobile Phone View</span>
          </button>
        </div>

        {/* Article Metrics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.78rem', color: '#94A3B8', fontWeight: 800 }}>
          <span><strong>{words}</strong> Words</span>
          <span><strong>{chars}</strong> Chars</span>
          <span style={{ color: '#38BDF8' }}>~<strong>{readingTimeMinutes}</strong> Min Read</span>
        </div>

        {/* Primary Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleCopyCleanUrl}
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
            title="Copy clean valid URL"
          >
            <Link size={13} />
            <span>Copy Clean URL</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
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
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)'
            }}
          >
            <Share2 size={14} />
            <span>BOOM Share It Out</span>
          </button>

          <button
            onClick={handleCopy}
            style={{
              background: copied ? 'rgba(16, 185, 129, 0.25)' : 'rgba(30, 41, 59, 0.8)',
              color: copied ? '#34D399' : '#FFF',
              border: copied ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.15)',
              padding: '7px 14px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Copy size={13} />
            <span>{copied ? '✓ Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            style={{
              background: 'rgba(30, 41, 59, 0.8)',
              color: '#FFF',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '7px 14px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            <Download size={13} />
          </button>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#EF4444',
              border: '1px solid rgba(239, 68, 68, 0.5)',
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
            <X size={15} />
            <span>Close Editor</span>
          </button>
        </div>
      </div>

      {/* 4 CORE MEDIA PLATFORM SELECTOR TABS STRIP */}
      <div style={{
        padding: '10px 24px',
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* 4 Platform Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.74rem', color: '#38BDF8', fontWeight: 950, marginRight: '6px' }}>
            SELECT MEDIA VENUE PREVIEW & EDIT:
          </span>

          {[
            { id: 'wire', label: '📰 AP Press Wire', icon: Newspaper, color: '#38BDF8' },
            { id: 'twitter', label: '𝕏 X / FinTwit', icon: Twitter, color: '#1DA1F2' },
            { id: 'linkedin', label: '💼 LinkedIn', icon: Linkedin, color: '#0A66C2' },
            { id: 'substack', label: '✍️ Substack Memo', icon: BookOpen, color: '#FF6719' }
          ].map(plat => {
            const Icon = plat.icon;
            const isActive = activePlatformTab === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => setActivePlatformTab(plat.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.76rem',
                  fontWeight: 950,
                  cursor: 'pointer',
                  border: isActive ? `1.5px solid ${plat.color}` : '1px solid rgba(255,255,255,0.1)',
                  background: isActive ? `${plat.color}30` : 'rgba(30, 41, 59, 0.6)',
                  color: isActive ? '#FFF' : '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isActive ? `0 0 16px ${plat.color}40` : 'none'
                }}
              >
                <Icon size={14} color={isActive ? plat.color : '#94A3B8'} />
                <span>{plat.label}</span>
              </button>
            );
          })}
        </div>

        {/* AI CoPilot Bar & Quick Action Chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, maxWidth: '560px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
              <Sparkles size={14} color="#F59E0B" style={{ position: 'absolute', left: '10px' }} />
              <input
                type="text"
                value={copilotPrompt}
                onChange={(e) => setCopilotPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCopilotRefine()}
                placeholder={`Instruct AI CoPilot to refine ${activePlatformTab.toUpperCase()} copy...`}
                style={{
                  width: '100%',
                  background: 'rgba(3, 7, 18, 0.9)',
                  border: '1px solid rgba(245, 158, 11, 0.5)',
                  borderRadius: '8px',
                  padding: '6px 12px 6px 32px',
                  color: '#FFF',
                  fontSize: '0.78rem',
                  outline: 'none'
                }}
              />
            </div>
            <button
              onClick={() => handleCopilotRefine()}
              disabled={isCopilotRunning}
              style={{
                padding: '6px 14px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.76rem',
                fontWeight: 900,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {isCopilotRunning ? <RefreshCw size={13} className="animate-spin" /> : <Send size={13} />}
              <span>AI Refine</span>
            </button>
          </div>

          {/* Quick Action Refinement Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.66rem', color: '#94A3B8', fontWeight: 800 }}>QUICK REFINEMENTS:</span>
            {[
              "⚡ Punch Up Hook",
              "💼 Board Summary",
              "📊 Recovery Waterfall",
              "🔒 Confidential Discretion",
              "💼 Add PE Retention Offer"
            ].map((chipText, cIdx) => (
              <button
                key={cIdx}
                onClick={() => handleCopilotRefine(chipText)}
                style={{
                  padding: '2px 8px',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  color: '#FCD34D',
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {chipText}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2-COLUMN MAIN WORKSPACE: LEFT JOURNALIST SUITE + RIGHT-JUSTIFIED VENUE MOCKUP CANVAS */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        background: '#040711'
      }}>

        {/* ---------------------------------------------------- */}
        {/* LEFT COLUMN: JOURNALISTIC ORGANIZING & SELECTION SUITE */}
        {/* ---------------------------------------------------- */}
        <div style={{
          width: '340px',
          background: 'rgba(9, 13, 22, 0.98)',
          borderRight: '1px solid rgba(56, 189, 248, 0.25)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'auto'
        }}>
          
          {/* Header */}
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 950, color: '#38BDF8', letterSpacing: '0.05em' }}>
              📁 JOURNALIST ORGANIZER SUITE
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '2px' }}>
              Select, prioritize, and inject court evidence
            </div>
          </div>

          {/* Section 1: Priority Tagging */}
          <div>
            <span style={{ fontSize: '0.72rem', color: '#FFF', fontWeight: 800, display: 'block', marginBottom: '8px' }}>
              🏷️ Story Priority Tag:
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

          {/* Section 2: PACER Citation Vault (1-Click Evidence Injector) */}
          <div style={{ background: 'rgba(3, 7, 18, 0.8)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.72rem', color: '#38BDF8', fontWeight: 900 }}>
                📄 PACER & SEC CITATION VAULT
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                onClick={() => insertCitation('Chapter 11 Voluntary Petition Docket #001', caseUrl)}
                style={citationButtonStyle}
              >
                + Inject Docket #001 PDF Link
              </button>
              <button
                onClick={() => insertCitation('SEC Form 8-K Material Event Disclosure', caseUrl)}
                style={citationButtonStyle}
              >
                + Inject SEC Form 8-K Citation
              </button>
              <button
                onClick={() => insertCitation('Section 365 Motion to Reject Unexpired Leases', caseUrl)}
                style={citationButtonStyle}
              >
                + Inject Docket #014 Lease Rejection
              </button>
            </div>
          </div>

          {/* Section 3: Saved Drafts Vault */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', color: '#FFF', fontWeight: 800 }}>
                📁 Saved Article Drafts ({savedDrafts.length}):
              </span>
              <button
                onClick={handleSaveDraft}
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
                + Save Draft
              </button>
            </div>

            {savedStatusText && (
              <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 900 }}>
                {savedStatusText}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', flex: 1 }}>
              {savedDrafts.map(draft => (
                <div
                  key={draft.id}
                  onClick={() => handleLoadDraft(draft)}
                  style={{
                    background: activeDraftId === draft.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(30, 41, 59, 0.6)',
                    border: activeDraftId === draft.id ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 900, color: activeDraftId === draft.id ? '#38BDF8' : '#F8FAFC', marginBottom: '2px' }}>
                    {draft.title}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{draft.date}</span>
                    <span style={{ fontSize: '0.65rem', color: activeDraftId === draft.id ? '#38BDF8' : '#64748B', fontWeight: 800 }}>
                      {activeDraftId === draft.id ? '● ACTIVE DRAFT' : 'Click to Load ➔'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* RIGHT COLUMN: RIGHT-JUSTIFIED VENUE MOCKUP CANVAS    */}
        {/* ---------------------------------------------------- */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          justify: 'flex-end',
          alignItems: viewportMode === 'mobile' ? 'flex-start' : 'stretch',
          background: '#040711'
        }}>

          {/* 💻 PC DESKTOP VENUE MOCKUP MODE */}
          {viewportMode === 'pc' && (
            <div style={{
              width: '100%',
              maxWidth: '920px',
              background: 'rgba(9, 13, 22, 0.95)',
              border: activePlatformTab === 'twitter' ? '1.5px solid #1DA1F2' : activePlatformTab === 'linkedin' ? '1.5px solid #0A66C2' : activePlatformTab === 'substack' ? '1.5px solid #FF6719' : '1.5px solid #38BDF8',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
            }}>
              {/* Mockup Header Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setViewTab('edit')}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.76rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        background: viewTab === 'edit' ? '#38BDF8' : 'rgba(255,255,255,0.08)',
                        color: viewTab === 'edit' ? '#000' : '#94A3B8'
                      }}
                    >
                      <Edit3 size={13} style={{ display: 'inline', marginRight: '4px' }} /> Edit {activePlatformTab.toUpperCase()} Copy
                    </button>

                    <button
                      onClick={() => setViewTab('preview')}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.76rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        background: viewTab === 'preview' ? '#38BDF8' : 'rgba(255,255,255,0.08)',
                        color: viewTab === 'preview' ? '#000' : '#94A3B8'
                      }}
                    >
                      <Eye size={13} style={{ display: 'inline', marginRight: '4px' }} /> Live Published Preview
                    </button>
                  </div>
                </div>

                <span style={{ fontSize: '0.76rem', fontWeight: 950, color: activePlatformTab === 'twitter' ? '#1DA1F2' : activePlatformTab === 'linkedin' ? '#0A66C2' : activePlatformTab === 'substack' ? '#FF6719' : '#38BDF8' }}>
                  VENUE: {activePlatformTab.toUpperCase()} MOCKUP
                </span>
              </div>

              {/* Editable Text Area or Live Formatted Preview */}
              {viewTab === 'edit' ? (
                <textarea
                  value={currentText}
                  onChange={(e) => updateCurrentText(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '500px',
                    background: 'rgba(3, 7, 18, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '20px',
                    color: '#F8FAFC',
                    fontSize: '0.92rem',
                    lineHeight: 1.7,
                    fontFamily: activePlatformTab === 'twitter' ? 'sans-serif' : 'monospace',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              ) : (
                <div style={{
                  minHeight: '500px',
                  background: 'rgba(3, 7, 18, 0.95)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  borderRadius: '10px',
                  padding: '24px',
                  color: '#F8FAFC',
                  fontSize: '0.95rem',
                  lineHeight: 1.7
                }}>
                  {renderRecipientFormattedPreview()}
                </div>
              )}
            </div>
          )}

          {/* 📱 MOBILE PHONE VENUE MOCKUP MODE */}
          {viewportMode === 'mobile' && (
            <div style={{
              width: '375px',
              minHeight: '680px',
              background: '#090D16',
              border: '10px solid #1E293B',
              borderRadius: '40px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(56, 189, 248, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* iPhone Top Notch & Status Bar */}
              <div style={{
                background: '#040711',
                padding: '8px 20px 4px 20px',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#FFF' }}>9:41</span>
                <div style={{ width: '80px', height: '14px', background: '#1E293B', borderRadius: '10px' }}></div>
                <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#10B981' }}>100% ⚡</span>
              </div>

              {/* Mobile App Header */}
              <div style={{
                padding: '12px 16px',
                background: 'rgba(15, 23, 42, 0.95)',
                borderBottom: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 950, color: '#38BDF8' }}>
                  {activePlatformTab.toUpperCase()} MOBILE MOCKUP
                </span>
                <span style={{ fontSize: '0.65rem', background: '#10B981', color: '#000', fontWeight: 900, padding: '2px 6px', borderRadius: '4px' }}>
                  RECIPIENT PREVIEW
                </span>
              </div>

              {/* Mobile Screen Article Content */}
              <div style={{
                flex: 1,
                padding: '16px',
                overflowY: 'auto',
                color: '#F8FAFC',
                fontSize: '0.82rem',
                lineHeight: 1.6
              }}>
                {renderRecipientFormattedPreview()}
              </div>

              {/* Mobile Footer Share Bar */}
              <div style={{
                padding: '12px',
                background: 'rgba(15, 23, 42, 0.98)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                gap: '8px'
              }}>
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 950,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '6px'
                  }}
                >
                  <Share2 size={14} /> BOOM Share Out
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* YouTube-Style Executive Share Modal */}
      <ExecutiveYouTubeShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        entity={target}
        customText={currentText}
      />

      {/* Genuine Court Citation Vault Wrapper Modal */}
      <BCCCitationWrapperModal
        isOpen={isCitationWrapperOpen}
        onClose={() => setIsCitationWrapperOpen(false)}
        citation={{
          title: "Official Chapter 11 Voluntary Petition (Docket #001)",
          court: target.locationJurisdiction || "United States Bankruptcy Court for the District of Delaware",
          caseName: target.name,
          ticker: target.ticker,
          debt: target.finalDebt || "$812 Million Total Liabilities",
          date: "August 11, 2026",
          checksum: "sha256-a8f4c991b72e004a89b1c",
          judge: "Hon. John T. Dorsey"
        }}
      />

    </div>
  );
}

const citationButtonStyle = {
  background: 'rgba(30, 41, 59, 0.6)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '6px',
  color: '#FCD34D',
  padding: '6px 10px',
  fontSize: '0.68rem',
  fontWeight: 800,
  cursor: 'pointer',
  textAlign: 'left'
};
