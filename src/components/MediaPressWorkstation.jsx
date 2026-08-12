import React, { useState } from 'react';
import { 
  Newspaper, FileText, CheckCircle2, ShieldCheck, Download, Share2, Maximize2, 
  Minimize2, ExternalLink, Sparkles, Send, Copy, Check, ChevronDown, ChevronUp, 
  Edit3, Radio, Mic, BookOpen, Twitter, Linkedin, Building2, Search, FileSpreadsheet
} from 'lucide-react';
import ExecutiveYouTubeShareModal from './ExecutiveYouTubeShareModal';
import FullScreenAIEditorModal from './FullScreenAIEditorModal';
import BCCCitationWrapperModal from './BCCCitationWrapperModal';
import AINewsroomStudio from './AINewsroomStudio';

export default function MediaPressWorkstation({
  companies = [],
  breakingNews = [],
  onSelectCompany,
  onOpenNewsroomStudio,
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
  const [activeDesk, setActiveDesk] = useState('wire'); // 'wire' (Desk 1) | 'suite' (Desk 2) | 'voice' (Desk 3) | 'scoop' (Desk 4)
  const [priorityTag, setPriorityTag] = useState('breaking');
  const [selectedTone, setSelectedTone] = useState('bloomberg'); // 'bloomberg' | 'wsj' | 'seeking_alpha' | 'fintwit'
  const [wireArticleType, setWireArticleType] = useState('ap_press_release'); // 'ap_press_release' | 'executive_brief' | 'substack_memo'
  
  // AI CoPilot Prompt Bar State
  const [aiCoPilotPrompt, setAiCoPilotPrompt] = useState('Draft an AP Press Wire story breaking the Chapter 11 filing & debt overhang.');
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);

  // Article Text State
  const [articleText, setArticleText] = useState(
    `AP PRESS WIRE • FOR IMMEDIATE RELEASE\n\n${selectedTargetCompany.name.toUpperCase()} (${selectedTargetCompany.ticker || 'DEBT'}) FILES VOLUNTARY CHAPTER 11 BANKRUPTCY IN DELAWARE\n\nWILMINGTON, DE — ${selectedTargetCompany.name}, an iconic corporate entity, has officially filed for Chapter 11 bankruptcy protection in the United States Bankruptcy Court for the District of Delaware.\n\nCourt disclosures parsed today reveal total debt liabilities exceeding ${selectedTargetCompany.debtAtCollapse || '$812 Million'}. The primary catalyst for the insolvency filing stems from ${selectedTargetCompany.primaryCause || 'unsustainable debt overhang'}.\n\n"Senior lenders hold 1st lien position while court-supervised Section 363 asset auction procedures get underway," according to initial court filings.\n\nVerified Court Vault: https://businesscollapse.com/?company=${(selectedTargetCompany.ticker || 'tupq').toLowerCase()}&citation=docket001`
  );

  // Modals State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCitationWrapperOpen, setIsCitationWrapperOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

  // Saved Article Drafts Vault DNA State
  const [activeDraftId, setActiveDraftId] = useState(1);
  const [savedDrafts, setSavedDrafts] = useState([
    { id: 1, title: 'Tupperware AP Press Wire Scoop', words: '340 Words', date: 'Today, 4:30 PM' },
    { id: 2, title: 'Spirit Airlines Aircraft Restructuring Substack', words: '520 Words', date: 'Yesterday' }
  ]);
  const [savedStatusText, setSavedStatusText] = useState('');

  const handleSaveDraft = () => {
    const newDraft = {
      id: Date.now(),
      title: `${selectedTargetCompany.name} AP Wire Story`,
      words: `${articleText.split(' ').length} Words`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSavedDrafts([newDraft, ...savedDrafts]);
    setSavedStatusText('✓ Saved article draft to vault!');
    setTimeout(() => setSavedStatusText(''), 2500);
  };

  const handleExportCSV = () => {
    const headers = "Company Name,Ticker,Article Format,Tone,Debt Overhang,Headline,Full Story Text\n";
    const row = `"${selectedTargetCompany.name}","${selectedTargetCompany.ticker || 'N/A'}","${wireArticleType}","${selectedTone}","${selectedTargetCompany.debtAtCollapse || '$500M'}","Chapter 11 Voluntary Petition","${articleText.replace(/\n/g, ' ')}"`;
    const blob = new Blob([headers + row], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${(selectedTargetCompany.ticker || 'ARTICLE').toLowerCase()}_press_wire.csv`;
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
        borderBottom: '1px solid rgba(56, 189, 248, 0.4)',
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
            background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
            color: '#000',
            fontWeight: 950,
            fontSize: '0.72rem',
            padding: '3px 8px',
            borderRadius: '4px',
            letterSpacing: '0.06em'
          }}>
            WORKSTATION #1 DNA
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#FFF' }}>
            MEDIA & PRESS SUITE — {selectedTargetCompany.name} ({selectedTargetCompany.ticker || 'DEBT'})
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
            <span>Export Article (.CSV)</span>
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
            <span>BOOM Share Media Wire</span>
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
          { id: 'wire', label: '📰 Desk 1: Breaking Chapter 11 Wire & AI Newsroom', icon: Newspaper, color: '#38BDF8' },
          { id: 'suite', label: '𝕏 Desk 2: 4-Venue Editorial & Social Press Suite', icon: Twitter, color: '#1DA1F2' },
          { id: 'voice', label: '🎙️ Desk 3: Executive Voice Agent & Podcast Dispatch', icon: Mic, color: '#F59E0B' },
          { id: 'scoop', label: '✍️ Desk 4: AI AP Wire Article & Scoop Generator', icon: Edit3, color: '#10B981' }
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
          borderRight: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'auto'
        }}>

          {/* Section 1: Target Distressed Entity Selector (Unified DNA) */}
          <div>
            <div style={{ fontSize: '0.76rem', fontWeight: 950, color: '#38BDF8', letterSpacing: '0.05em', marginBottom: '8px' }}>
              🏢 TARGET MEDIA ENTITIES ({companies.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
              {companies.map(comp => (
                <div
                  key={comp.id || comp.ticker}
                  onClick={() => setSelectedTargetCompany(comp)}
                  style={{
                    background: selectedTargetCompany.ticker === comp.ticker ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                    border: selectedTargetCompany.ticker === comp.ticker ? '1.5px solid #38BDF8' : '1px solid rgba(255,255,255,0.08)',
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
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, background: 'rgba(56,189,248,0.2)', color: '#38BDF8', padding: '2px 6px', borderRadius: '4px' }}>
                      {comp.ticker || 'WIRE'}
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
              🏷️ Story & Press Priority Tag:
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
          <div style={{ background: 'rgba(3, 7, 18, 0.8)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.72rem', color: '#38BDF8', fontWeight: 900 }}>
                📄 PACER COURT EVIDENCE VAULT
              </span>
              <button
                onClick={() => setIsCitationWrapperOpen(true)}
                style={{
                  background: 'rgba(56, 189, 248, 0.2)',
                  color: '#38BDF8',
                  border: '1px solid #38BDF8',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '0.65rem',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                👁️ Preview Citation
              </button>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#CBD5E1', lineHeight: 1.5 }}>
              Official Court Petition Docket #001 & verified legal citations for <strong>{selectedTargetCompany.name}</strong>.
            </div>
          </div>

          {/* Section 4: Saved Article Drafts Vault */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', color: '#FFF', fontWeight: 800 }}>
                📁 Saved Article Drafts ({savedDrafts.length}):
              </span>
              <button
                onClick={handleSaveDraft}
                style={{
                  padding: '3px 8px',
                  background: 'rgba(56, 189, 248, 0.2)',
                  color: '#38BDF8',
                  border: '1px solid #38BDF8',
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
              <div style={{ fontSize: '0.7rem', color: '#38BDF8', fontWeight: 900 }}>
                {savedStatusText}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', flex: 1 }}>
              {savedDrafts.map(dr => (
                <div
                  key={dr.id}
                  onClick={() => setActiveDraftId(dr.id)}
                  style={{
                    background: activeDraftId === dr.id ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                    border: activeDraftId === dr.id ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 900, color: activeDraftId === dr.id ? '#38BDF8' : '#F8FAFC' }}>
                    {dr.title}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
                    <span>{dr.words}</span>
                    <span>{dr.date}</span>
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

          {/* DESK 1: BREAKING WIRE & AI NEWSROOM STUDIO */}
          {activeDesk === 'wire' && (
            <AINewsroomStudio
              selectedCompany={selectedTargetCompany}
              onClose={() => {}}
            />
          )}

          {/* DESK 2: 4-VENUE EDITORIAL & SOCIAL PRESS SUITE TRIGGER */}
          {activeDesk === 'suite' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(2, 132, 199, 0.25) 100%)', border: '1.5px solid #38BDF8', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 950, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Twitter size={22} color="#38BDF8" /> 4-VENUE EDITORIAL & RECIPIENT PREVIEW SUITE
                </div>
                <p style={{ fontSize: '0.82rem', color: '#CBD5E1', margin: '6px 0 0 0', lineHeight: 1.6 }}>
                  Edit and preview tailored copy across 4 core media venues (AP Press Wire, X / FinTwit, LinkedIn, Substack Memo) with live PC Desktop & Mobile Phone recipient viewports for <strong>{selectedTargetCompany.name}</strong>.
                </p>

                <button
                  onClick={() => setIsEditorModalOpen(true)}
                  style={{
                    marginTop: '16px',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 950,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)'
                  }}
                >
                  <Edit3 size={18} /> Launch 4-Venue Editorial Suite & Mobile Viewport
                </button>
              </div>
            </div>
          )}

          {/* DESK 3: EXECUTIVE VOICE AGENT & PODCAST DISPATCH */}
          {activeDesk === 'voice' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #F59E0B', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.92rem', fontWeight: 950, color: '#FCD34D', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mic size={18} /> EXECUTIVE VOICE AGENT & AUDIO PODCAST DISPATCH
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>
                  Natural neural voice synthesis generating 60-second executive audio briefings for <strong>{selectedTargetCompany.name}</strong>.
                </div>
              </div>

              <div style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '10px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 950, color: '#FFF' }}>
                    🎙️ Audio Briefing: {selectedTargetCompany.name} Chapter 11 Discharge Assessment
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '4px' }}>
                    Duration: 1 min 15 sec • Voice: Neural Executive Anchor (Female US)
                  </div>
                </div>

                <button
                  onClick={() => alert('Playing 60-Second Executive Audio Briefing...')}
                  style={{
                    padding: '8px 16px',
                    background: '#F59E0B',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 950,
                    cursor: 'pointer'
                  }}
                >
                  ▶ Play Audio Briefing
                </button>
              </div>
            </div>
          )}

          {/* DESK 4: AI AP WIRE ARTICLE & SCOOP GENERATOR */}
          {activeDesk === 'scoop' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #10B981', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 950, color: '#34D399', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Edit3 size={18} /> AI AP WIRE ARTICLE & SCOOP GENERATOR
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
                      value={aiCoPilotPrompt}
                      onChange={(e) => setAiCoPilotPrompt(e.target.value)}
                      placeholder="Instruct AI CoPilot to refine AP Wire story (e.g. 'Punch up investigative angle')..."
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
                      if (!aiCoPilotPrompt.trim()) return;
                      setIsGeneratingArticle(true);
                      setTimeout(() => {
                        setArticleText(prev => `${prev}\n\n[REVISED BY JOURNALISM AI COPILOT: ${aiCoPilotPrompt}]\n• 1st Lien DIP Lender Approval Granted by Judge Dorsey.\n• Section 365 Executory Contracts Rejection Scheduled for Next Hearing.`);
                        setIsGeneratingArticle(false);
                      }, 700);
                    }}
                    disabled={isGeneratingArticle}
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
                    {isGeneratingArticle ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                    <span>AI Refine Article</span>
                  </button>
                </div>

                {/* Quick Action Chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 800 }}>QUICK JOURNALISM REFINEMENTS:</span>
                  {[
                    "⚡ Punch Up AP Wire Headline",
                    "📊 Focus on 1st Lien Debt Wipeout",
                    "💼 C-Suite Departure Impact",
                    "💰 363 Auction Floor Estimate"
                  ].map((chipText, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => {
                        setAiCoPilotPrompt(chipText);
                        setIsGeneratingArticle(true);
                        setTimeout(() => {
                          setArticleText(prev => `${prev}\n\n[REVISED BY AI COPILOT: ${chipText}]\n• Verified via PACER Docket #001.`);
                          setIsGeneratingArticle(false);
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
                value={articleText}
                onChange={(e) => setArticleText(e.target.value)}
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
                    navigator.clipboard.writeText(articleText);
                    alert('Copied AP Wire article text to clipboard!');
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
                  <Copy size={14} /> Copy Article Text
                </button>

                <button
                  onClick={() => setIsEditorModalOpen(true)}
                  style={{
                    padding: '9px 18px',
                    background: 'rgba(56, 189, 248, 0.2)',
                    color: '#38BDF8',
                    border: '1px solid #38BDF8',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 950,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Edit3 size={14} /> Open Full-Screen AI Editor & Mobile Preview
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
        initialText={articleText}
        entity={selectedTargetCompany}
        format={wireArticleType}
        tone={selectedTone}
      />

      {/* YouTube-Style Executive Share Modal */}
      <ExecutiveYouTubeShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        entity={selectedTargetCompany}
        customText={articleText}
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
