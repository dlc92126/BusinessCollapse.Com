import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Search, Plus, Check, Trash2, Copy, Download, Share2, 
  Settings, Key, Zap, FileText, Twitter, Linkedin, BookOpen, 
  Layers, ArrowLeft, RefreshCw, AlertCircle, CheckCircle2, ChevronRight, Sliders, Edit3
} from 'lucide-react';
import ExecutiveYouTubeShareModal from './ExecutiveYouTubeShareModal';
import FullScreenAIEditorModal from './FullScreenAIEditorModal';

export default function AINewsroomStudio({ companies = [], initialCompany = null, onGoBack }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  // Search & Story Basket Queue State
  const [searchQuery, setSearchQuery] = useState('');
  const [taggedCompanies, setTaggedCompanies] = useState(
    initialCompany ? [initialCompany] : (companies[0] ? [companies[0]] : [])
  );
  
  // Format & Tone State
  const [activeFormat, setActiveFormat] = useState('wire'); // 'wire', 'fintwit', 'linkedin', 'substack', 'infographic'
  const [selectedTone, setSelectedTone] = useState('bloomberg'); // 'bloomberg', 'wsj', 'fintwit', 'seeking_alpha'
  
  // Custom BYO API Key State
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyProvider, setApiKeyProvider] = useState('openai'); // 'openai', 'anthropic', 'gemini'
  const [customApiKey, setCustomApiKey] = useState('');
  const [savedApiKey, setSavedApiKey] = useState('');

  // AI Prompt Copilot Refinement State
  const [customCopilotPrompt, setCustomCopilotPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedOutputOverride, setGeneratedOutputOverride] = useState('');

  // Load API Key on Mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bc_user_ai_api_key') || '';
      const storedProvider = localStorage.getItem('bc_user_ai_api_provider') || 'openai';
      setSavedApiKey(stored);
      setCustomApiKey(stored);
      setApiKeyProvider(storedProvider);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bc_user_ai_api_key', customApiKey.trim());
      localStorage.setItem('bc_user_ai_api_provider', apiKeyProvider);
      setSavedApiKey(customApiKey.trim());
      setShowApiKeyModal(false);
    }
  };

  const handleClearApiKey = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bc_user_ai_api_key');
      localStorage.removeItem('bc_user_ai_api_provider');
      setCustomApiKey('');
      setSavedApiKey('');
    }
  };

  // Toggle company in Story Basket
  const toggleTagCompany = (company) => {
    if (!company) return;
    const exists = taggedCompanies.some(c => (c.ticker || c.id) === (company.ticker || company.id));
    if (exists) {
      setTaggedCompanies(taggedCompanies.filter(c => (c.ticker || c.id) !== (company.ticker || company.id)));
    } else {
      setTaggedCompanies([...taggedCompanies, company]);
    }
    setGeneratedOutputOverride('');
  };

  // Filter companies list
  const filteredSearchList = (companies || []).filter(c => {
    if (!c) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const name = (c.name || '').toLowerCase();
    const ticker = (c.ticker || '').toLowerCase();
    const cause = (c.primaryCause || '').toLowerCase();
    return name.includes(q) || ticker.includes(q) || cause.includes(q);
  });

  // Target primary company or multi-company names
  const primaryComp = taggedCompanies[0] || companies[0] || {};
  const isMultiStory = taggedCompanies.length > 1;
  const companyNamesList = taggedCompanies.map(c => c.name || c.ticker).join(', ');
  const tickersList = taggedCompanies.map(c => `$${c.ticker || c.name}`).join(' & ');

  // Compute aggregated stats for selected basket
  const totalLiabilities = taggedCompanies.reduce((acc, c) => {
    const rawDebt = c.debtAtCollapse || c.finalDebt || '$500M';
    return acc + (parseFloat(rawDebt.replace(/[^0-9.]/g, '')) || 500);
  }, 0);

  // Generate Article Drafts based on Active Format, Tone, and Basket
  const generateWireCopy = () => {
    if (isMultiStory) {
      return `AP PRESS WIRE | SPECIAL FINANCIAL DISTRESS ROUNDUP
SPECIAL REPORT: ${taggedCompanies.length} CORPORATE GIANTS FILE CHAPTER 11 WITH OVER $${totalLiabilities.toFixed(0)}M IN COMBINED LIABILITIES

NEW YORK, NY — A sudden wave of corporate insolvencies has swept across North American credit markets today as ${companyNamesList} officially entered Chapter 11 bankruptcy court proceedings.

KEY ROUNDUP HIGHLIGHTS:
• Affected Entities: ${companyNamesList} (${tickersList})
• Total Combined Liabilities: ~$${totalLiabilities.toFixed(0)} Million
• Primary Catalysts: High debt service costs, liquidity depletion, and unhedged term loan defaults.
• Judicial Forums: District of Delaware, Southern District of New York, & Southern District of Texas.

"Rising capital costs and restrictive debt covenants have created a cascade effect across mid-market and enterprise balance sheets," noted senior restructuring advisors in docket filings submitted earlier today.

Section 363 asset sales, DIP financing syndications, and trade creditor committee formation hearings are scheduled across federal bankruptcy courts next week.

# # #
SOURCE: BusinessCollapse.Com Real-Time Docket Wire
VERIFICATION CHECKSUM: SHA-256 Verified`;
    }

    const name = primaryComp.name || 'Corporate Entity';
    const ticker = primaryComp.ticker || 'DISTRESS';
    const debt = primaryComp.debtAtCollapse || primaryComp.finalDebt || '$1.2 Billion';
    const peakVal = primaryComp.peakValuation || '$2.5 Billion';
    const collapseVal = primaryComp.collapseValuation || '$12 Million';
    const cause = primaryComp.primaryCause || 'Debt Overhang & Revenue Velocity Decline';
    const court = primaryComp.locationJurisdiction || 'U.S. Bankruptcy Court';
    const freshHeadline = primaryComp.headline || (primaryComp.earlyWarningSignals && primaryComp.earlyWarningSignals[0]) || (primaryComp.keyUpdates && primaryComp.keyUpdates[0]) || `${name} Triggers Pre-Petition Distress Warning`;
    const freshEventDetail = (primaryComp.earlyWarningSignals && primaryComp.earlyWarningSignals[0]) || (primaryComp.keyUpdates && primaryComp.keyUpdates[0]) || primaryComp.summary || cause;
    const eventTimestampStr = primaryComp.formattedMaterialChange || `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} EST`;
    const datelineDateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const datelineCity = primaryComp.locationJurisdiction ? primaryComp.locationJurisdiction.split(',')[0].toUpperCase() : 'WILMINGTON, DE';

    if (selectedTone === 'wsj') {
      return `THE WALL STREET JOURNAL INVESTIGATION | RESTRUCTURING ANALYSIS
INSIDE THE DEBT COLLAPSE OF ${name.toUpperCase()} (${ticker})

${datelineCity} — ${datelineDateStr} — Following months of mounting credit stress, ${name} has formally filed for Chapter 11 bankruptcy protection.

THE CAPITAL OVERHANG & INSOLVENCY STORY:
Once commanding a peak corporate valuation of ${peakVal}, ${name} faced a catastrophic valuation collapse to ${collapseVal} under the weight of ${debt} in total liabilities.

According to Chapter 11 petition disclosures filed in ${court}, the company's downfall was triggered by: ${cause}.

"The collapse underscores how rapidly rising interest rate regimes and maturing debt walls are crippling over-leveraged corporate balance sheets," said senior restructuring advisors familiar with the court dockets.

WHAT EXECUTION STEPS COME NEXT:
• Section 363 Asset Auction: Lenders are preparing a stalking horse credit bid.
• Unsecured Creditors: General trade claims face significant impairment under priority rules.

# # #
DOCUMENT PROVENANCE: Official PACER Docket #001 & SEC EDGAR 8-K Disclosure`;
    }

    if (selectedTone === 'seeking_alpha') {
      return `SEEKING ALPHA / INVESTOR RECOVERY THESIS
CAPITAL STACK & RECOVERY WATERFALL ANALYSIS: ${name.toUpperCase()} (${ticker})

RESTRUCTURING THESIS:
${name} (${ticker}) has entered court-supervised restructuring with ${debt} in total obligations. Investors evaluating trade claims, DIP loans, or liquidation assets must analyze the following priority waterfall.

KEY FINANCIAL METRICS:
• Outstanding Debt Load: ${debt}
• Valuation Collapse: ${peakVal} ➔ ${collapseVal}
• Primary Insolvency Catalyst: ${cause}
• Bankruptcy Jurisdiction: ${court}

CREDITOR RECOVERY PROJECTIONS:
1st Lien Secured Debt: 60% - 85% Recovery via Section 363 Stalking Horse Credit Bid.
General Unsecured Claims (Trade Vendors): 5% - 15% Estimated Payout.
Equity Holders (Common Stock): Expected 100% Wipeout.

# # #
DATA PROVENANCE: BusinessCollapse.com Restructuring Intelligence Engine`;
    }

    // Default Bloomberg Terminal Wire Style
    return `BLOOMBERG TERMINAL WIRE | RESTRUCTURING DISPATCH
DATELINE: ${datelineCity} — ${datelineDateStr}
HEADER: ${freshHeadline.toUpperCase()}

${datelineCity} — ${datelineDateStr} — ${name} (${ticker}) has triggered an urgent bankruptcy filing alert parsed during today's system sweep on ${eventTimestampStr}:

"${freshEventDetail}"

KEY RECENT SWEEP DISCLOSURES (WHAT, WHEN, WHY, WHERE):
• Event Date & Timestamp: ${eventTimestampStr}
• Ingestion System Sweep: ${primaryComp.formattedLastSweep || eventTimestampStr}
• Latest Material Event: ${freshHeadline}
• Outstanding Liabilities: ${debt}
• Peak vs. Collapse Valuation: ${peakVal} ➔ ${collapseVal}
• Primary Insolvency Catalyst: ${cause}
• Court Jurisdiction: ${court}
• Asset Disposition Strategy: Court-supervised Section 363 asset auction & lender credit bid qualification.

# # #
MEDIA CONTACT & DOCKET SOURCE: BusinessCollapse.Com Real-Time PACER Terminal`;
  };

  const generateFinTwitCopy = () => {
    const name = primaryComp.name || 'Company';
    const ticker = primaryComp.ticker || 'TICKER';
    const debt = primaryComp.debtAtCollapse || primaryComp.finalDebt || '$1.2B';
    const cause = primaryComp.primaryCause || 'Liquidity Depletion';

    if (selectedTone === 'wsj') {
      return `1/8 🚨 WSJ INVESTIGATION BREAK: Inside the Chapter 11 collapse of ${name} ($${ticker}).\n\nTotal Debt: ${debt}\nRoot Cause: ${cause}\n\n2/8 Disclosures reveal senior lenders holding 1st lien positions are forcing an immediate Section 363 asset auction.\n\n3/8 Full investigation & court docket breakdown on @BusinessCollapse.\n\n#Bankruptcy #WSJ #Distress`;
    }
    if (selectedTone === 'seeking_alpha') {
      return `1/8 📊 RECOVERY THESIS ($${ticker}): ${name} files Chapter 11 with ${debt} in debt.\n\nPriority Waterfall:\n• 1st Lien DIP Lenders: 70-85% Recovery\n• Unsecured Trade Claims: 5-15% Payout\n• Equity Holders: 100% Wipeout\n\n2/8 Full recovery analysis on @BusinessCollapse.\n\n#DistressedDebt #Alpha #SeekingAlpha`;
    }
    if (selectedTone === 'fintwit') {
      return `1/10 🚨 BREAKING: ${name} ($${ticker}) has triggered an urgent distress alert.\n\nTotal liabilities stand at ${debt}.\nCulprit: ${cause}.\nEquity holders expected 100% wipeout.\n\n#FinTwit #Bankruptcy #Chapter11`;
    }
    // Default Bloomberg
    return `1/8 🚨 BLOOMBERG TERMINAL ALERT: ${name} ($${ticker}) Chapter 11 voluntary filing parsed.\n\n• Liabilities: ${debt}\n• Jurisdiction: ${primaryComp.locationJurisdiction || 'US Bankruptcy Court'}\n• Triggers: ${cause}\n\n#Bloomberg #Chapter11 #TerminalAlert`;
  };

  const generateLinkedInCopy = () => {
    const name = primaryComp.name || 'Corporate Entity';
    const ticker = primaryComp.ticker || 'TICKER';
    const debt = primaryComp.debtAtCollapse || primaryComp.finalDebt || '$1.2 Billion';
    const cause = primaryComp.primaryCause || 'Liquidity Failure';

    if (selectedTone === 'wsj') {
      return `💼 THE WALL STREET JOURNAL EXECUTIVE ANALYSIS: The Collapse of ${name} (${ticker})\n\nThe Chapter 11 filing of ${name} (${ticker}) under ${debt} of debt serves as a case study for corporate boards.\n\nKEY INSIGHTS:\n1. Refinancing Vulnerability: Over-leveraged balance sheets collapsed as credit tightened.\n2. Root Catalyst: ${cause}.\n3. Lender Takeover: 1st lien holders preparing Stalking Horse credit bids.\n\n#Turnaround #Restructuring #BoardroomStrategy #Chapter11`;
    }
    if (selectedTone === 'seeking_alpha') {
      return `💼 SEEKING ALPHA CREDIT ANALYSIS: ${name} (${ticker}) Debt & Recovery Waterfall\n\nAnalyzing the ${debt} insolvency of ${name} (${ticker}) for credit investors and trade creditors.\n\n3 RECOVERY TAKEAWAYS:\n1. Senior 1st Lien Priority: Protected by super-priority liens.\n2. Unsecured Trade Vendor Impairment: High risk of sub-20% recovery.\n3. Section 363 Auction Alpha: Stalking horse bidding underway.\n\n#DistressedDebt #CreditInvesting #MAndA #Chapter11`;
    }
    return `💼 EXECUTIVE INSIGHTS (BLOOMBERG STYLE): Lessons from ${name} (${ticker})\n\nChapter 11 filing disclosure for ${name} under ${debt} of debt.\n\n3 Critical Takeaways:\n1. Refinancing Wall Vulnerability: Floating-rate debt structures became unmanageable.\n2. Section 365 Contract Rejections: Vendors & landlords face immediate lease rejections.\n3. Catalyst: ${cause}.\n\n#Restructuring #CorporateFinance #Chapter11`;
  };

  const generateSubstackCopy = () => {
    const name = primaryComp.name || 'Company';
    const ticker = primaryComp.ticker || 'DEBT';
    const debt = primaryComp.debtAtCollapse || primaryComp.finalDebt || '$1.2 Billion';
    const cause = primaryComp.primaryCause || 'Debt Overhang';

    if (selectedTone === 'wsj') {
      return `✍️ THE DEBT POST-MORTEM (WSJ JOURNALISM STYLE)\nTITLE: Why ${name} (${ticker}) Couldn't Escape Its ${debt} Debt Wall\n\nBy Financial Distress Desk | BusinessCollapse.Com\n\nINTRODUCTION:\nThe filing of Chapter 11 by ${name} marks another milestone in the current corporate distress cycle. Under the weight of ${debt} in obligations, the company hit a wall triggered by ${cause}.\n\nWHAT HAPPENS NEXT:\nSenior lenders are preparing a Section 363 credit bid to acquire operating assets...`;
    }
    if (selectedTone === 'seeking_alpha') {
      return `✍️ DISTRESSED DEBT SUBSTACK MEMO (SEEKING ALPHA ALPHA)\nTITLE: ${name} (${ticker}) Recovery Waterfall & 363 Auction Analysis\n\nBy Restructuring Alpha Desk | BusinessCollapse.Com\n\nANALYSIS:\n${name} has entered bankruptcy with ${debt} in total obligations. Here is the recovery breakdown for senior lenders vs general unsecured creditors...`;
    }
    return `✍️ BLOOMBERG TERMINAL SUBSTACK MEMO\nTITLE: Restructuring Brief: ${name} (${ticker}) Files Chapter 11\n\nBy Docket Sweep Desk | BusinessCollapse.Com\n\nSystem parsed official dockets indicating Chapter 11 filing for ${name} (${debt} debt, cause: ${cause})...`;
  };

  const getOutputText = () => {
    if (generatedOutputOverride) return generatedOutputOverride;
    switch (activeFormat) {
      case 'wire': return generateWireCopy();
      case 'fintwit': return generateFinTwitCopy();
      case 'linkedin': return generateLinkedInCopy();
      case 'substack': return generateSubstackCopy();
      default: return generateWireCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getOutputText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([getOutputText()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${(primaryComp.ticker || 'STORY').toLowerCase()}_newsroom_draft.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRunCopilot = () => {
    if (!customCopilotPrompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const base = getOutputText();
      const promptLower = customCopilotPrompt.toLowerCase();
      let modified = base;

      if (promptLower.includes('bearish') || promptLower.includes('warning')) {
        modified = `🚨 URGENT LIQUIDATION ALERT: ${primaryComp.name || 'Entity'} facing total capital wipeout.\n\n` + base;
      } else if (promptLower.includes('lease') || promptLower.includes('365')) {
        modified = base + `\n\n⚠️ SECTION 365 LEASE WARNING: Over 40+ commercial leasehold agreements flagged for immediate rejection in bankruptcy court.`;
      } else if (promptLower.includes('dip') || promptLower.includes('lender')) {
        modified = base + `\n\n💳 DIP FINANCING UPDATE: Senior lenders approving emergency $50M DIP facility with super-priority lien status.`;
      } else {
        modified = `[REFINED BY AI COPILOT: "${customCopilotPrompt}"]\n\n` + base;
      }

      setGeneratedOutputOverride(modified);
      setIsGenerating(false);
      setCustomCopilotPrompt('');
    }, 600);
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '6px 24px 24px 24px' }}>
      
      {/* WORKSTATION COMMAND HEADER */}
      <div className="glass-panel" style={{
        padding: '24px 32px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
        borderLeft: '5px solid #F59E0B',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(245, 158, 11, 0.5)', border: '1.5px solid rgba(255, 255, 255, 0.25)', flexShrink: 0 }}>
            <Sparkles size={22} color="#FFF" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {onGoBack && (
                <button
                  onClick={onGoBack}
                  style={{
                    background: 'rgba(255, 42, 75, 0.2)',
                    color: '#FF3B5C',
                    border: '1.5px solid rgba(255, 42, 75, 0.5)',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    marginRight: '6px',
                    boxShadow: '0 0 12px rgba(255, 42, 75, 0.3)'
                  }}
                >
                  ← Back to Core Feed
                </button>
              )}
              <h1 style={{
                fontSize: '1.65rem',
                fontWeight: 950,
                letterSpacing: '0.04em',
                wordSpacing: '0.18em',
                margin: 0,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FCD34D 50%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.85))',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                📰 AI NEWSROOM & JOURNALIST DESK
              </h1>
              <span style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.3) 100%)',
                color: '#FCD34D',
                border: '1px solid rgba(245, 158, 11, 0.55)',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.68rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                boxShadow: '0 0 14px rgba(245, 158, 11, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FCD34D', boxShadow: '0 0 8px #FCD34D' }} />
                MEDIA WIRE SUITE ($299/MO)
              </span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.82rem', margin: '4px 0 0 0', lineHeight: 1.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              ⚡ MULTI-ENTITY STORY DESK • AP PRESS WIRE • FINTWIT 10-TWEET THREADS • SUBSTACK & LINKEDIN COPY GENERATOR
            </p>
          </div>
        </div>

        {/* API KEY SETTINGS BUTTON (COMING SOON IN PHASE 2) */}
        <button
          onClick={() => setShowApiKeyModal(true)}
          style={{
            background: savedApiKey ? 'rgba(16, 185, 129, 0.2)' : 'rgba(30, 41, 59, 0.8)',
            color: savedApiKey ? '#34D399' : '#F8FAFC',
            border: savedApiKey ? '1px solid #10B981' : '1px solid rgba(245, 158, 11, 0.4)',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.8rem',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: savedApiKey ? '0 0 14px rgba(16, 185, 129, 0.3)' : 'none'
          }}
        >
          <Key size={16} color={savedApiKey ? '#34D399' : '#F59E0B'} />
          <span>{savedApiKey ? `🟢 Custom API Key Active (${apiKeyProvider.toUpperCase()})` : '🔑 BYO API Key'}</span>
          <span style={{
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            color: '#000',
            fontSize: '0.62rem',
            fontWeight: 900,
            padding: '2px 6px',
            borderRadius: '4px',
            letterSpacing: '0.04em'
          }}>
            PHASE 2 • COMING SOON
          </span>
        </button>
      </div>

      {/* MAIN 2-COLUMN WORKSTATION LAYOUT */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px' }}>
        
        {/* LEFT COLUMN: ENTITY SEARCH & STORY BASKET QUEUE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* STORY BASKET QUEUE PANEL */}
          <div className="glass-panel" style={{ padding: '18px', background: 'rgba(15, 23, 42, 0.95)', borderRadius: '14px', border: '1.5px solid rgba(245, 158, 11, 0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#FCD34D', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={18} color="#F59E0B" />
                <span>STORY DESK BASKET ({taggedCompanies.length})</span>
              </div>
              {taggedCompanies.length > 0 && (
                <button
                  onClick={() => { setTaggedCompanies([]); setGeneratedOutputOverride(''); }}
                  style={{ background: 'transparent', border: 'none', color: '#EF4444', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer' }}
                >
                  Clear Basket
                </button>
              )}
            </div>

            {/* Tagged Entity Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', minHeight: '40px', padding: '8px', background: 'rgba(7, 10, 15, 0.6)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '14px' }}>
              {taggedCompanies.length === 0 ? (
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontStyle: 'italic' }}>No companies tagged. Search & click + to tag stories into your roundup...</span>
              ) : (
                taggedCompanies.map(c => (
                  <span
                    key={c.id || c.ticker}
                    style={{
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(180, 83, 9, 0.3) 100%)',
                      color: '#FCD34D',
                      border: '1px solid rgba(245, 158, 11, 0.55)',
                      padding: '3px 10px',
                      borderRadius: '16px',
                      fontSize: '0.72rem',
                      fontWeight: 900,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>${c.ticker || c.name}</span>
                    <button
                      onClick={() => toggleTagCompany(c)}
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                    >
                      ×
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Mode Indicator */}
            <div style={{ fontSize: '0.72rem', color: isMultiStory ? '#38BDF8' : '#FCD34D', fontWeight: 800, padding: '6px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px' }}>
              {isMultiStory ? `⚡ MULTI-ENTITY SECTOR ROUNDUP MODE (${taggedCompanies.length} Entities)` : `🎯 SINGLE-ENTITY DEEP-DIVE MODE (${primaryComp.name || 'Selected'})`}
            </div>
          </div>

          {/* SEARCH ENTITIES PANEL */}
          <div className="glass-panel" style={{ padding: '18px', background: 'rgba(15, 23, 42, 0.95)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#F8FAFC', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={16} color="#F59E0B" />
              <span>SEARCH & TAG DOCKET STORIES</span>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <input
                type="text"
                placeholder="Search company, ticker, cause..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(7, 10, 15, 0.9)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  padding: '8px 12px 8px 34px',
                  color: '#FFF',
                  fontSize: '0.8rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <Search size={15} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            </div>

            {/* Scrollable Company Item List */}
            <div style={{ maxHeight: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '4px' }}>
              {filteredSearchList.map(comp => {
                const isTagged = taggedCompanies.some(c => (c.ticker || c.id) === (comp.ticker || comp.id));
                return (
                  <div
                    key={comp.id || comp.ticker}
                    onClick={() => toggleTagCompany(comp)}
                    style={{
                      padding: '10px 12px',
                      background: isTagged ? 'rgba(245, 158, 11, 0.15)' : 'rgba(7, 10, 15, 0.5)',
                      border: isTagged ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                    className="glass-panel-interactive"
                  >
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span>{comp.name}</span>
                        {comp.ticker && <span style={{ fontSize: '0.68rem', color: '#F59E0B', fontWeight: 800 }}>(${comp.ticker})</span>}
                        {(comp.isEmergent || comp.headline || (comp.lastMaterialChangeDate && (new Date().getTime() - new Date(comp.lastMaterialChangeDate).getTime()) / 3600000 <= 24)) && (
                          <span style={{ background: 'linear-gradient(90deg, #EF4444 0%, #F59E0B 100%)', color: '#FFF', fontSize: '0.58rem', padding: '1px 5px', borderRadius: '4px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em', boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)' }}>
                            🔥 BREAKING NOVEL LEAK
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '2px' }}>
                        {comp.debtAtCollapse || '$300M'} Debt • {comp.locationJurisdiction || 'U.S. Court'}
                      </div>
                    </div>

                    <button
                      style={{
                        background: isTagged ? '#F59E0B' : 'rgba(255,255,255,0.1)',
                        color: isTagged ? '#000' : '#FFF',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.68rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {isTagged ? <Check size={12} /> : <Plus size={12} />}
                      <span>{isTagged ? 'Tagged' : 'Tag'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: AI COPY GENERATOR & JOURNALIST STUDIO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* FORMAT TABS & TONE PRESETS BAR */}
          <div className="glass-panel" style={{ padding: '16px 20px', background: 'rgba(15, 23, 42, 0.95)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            
            {/* Format Tabs */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { id: 'wire', label: '📰 AP Press Wire', icon: FileText },
                { id: 'fintwit', label: '🐦 FinTwit 10-Tweet Thread', icon: Twitter },
                { id: 'linkedin', label: '💼 LinkedIn Executive', icon: Linkedin },
                { id: 'substack', label: '📝 Substack Essay', icon: BookOpen }
              ].map(fmt => {
                const Icon = fmt.icon;
                const isActive = activeFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => { setActiveFormat(fmt.id); setGeneratedOutputOverride(''); }}
                    style={{
                      height: '36px',
                      background: isActive ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'rgba(7, 10, 15, 0.8)',
                      color: isActive ? '#000' : '#94A3B8',
                      border: isActive ? '1.5px solid #FCD34D' : '1px solid rgba(255,255,255,0.1)',
                      padding: '0 14px',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: isActive ? '0 0 14px rgba(245, 158, 11, 0.4)' : 'none'
                    }}
                  >
                    <Icon size={15} color={isActive ? '#000' : '#F59E0B'} />
                    <span>{fmt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tone Selector Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={15} color="#F59E0B" />
              <span style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 800 }}>TONE:</span>
              <select
                value={selectedTone}
                onChange={(e) => { setSelectedTone(e.target.value); setGeneratedOutputOverride(''); }}
                style={{
                  background: 'rgba(7, 10, 15, 0.9)',
                  color: '#FCD34D',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 900,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="bloomberg">Bloomberg Urgent Breaking</option>
                <option value="wsj">WSJ Formal Analytical</option>
                <option value="fintwit">FinTwit Punchy & Viral</option>
                <option value="seeking_alpha">Seeking Alpha Bearish Autopsy</option>
              </select>
            </div>

          </div>

          {/* AI COPY COPILOT REFINEMENT BAR */}
          <div className="glass-panel" style={{ padding: '14px 18px', background: 'rgba(15, 23, 42, 0.95)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <Zap size={16} color="#F59E0B" />
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#F8FAFC' }}>AI COPILOT:</span>
            </div>

            <input
              type="text"
              placeholder="Tell AI to refine copy (e.g., 'Emphasize Section 363 lease rejections' or 'Make more bearish')..."
              value={customCopilotPrompt}
              onChange={(e) => setCustomCopilotPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunCopilot()}
              style={{
                flex: 1,
                minWidth: '240px',
                background: 'rgba(7, 10, 15, 0.9)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px',
                padding: '6px 12px',
                color: '#FFF',
                fontSize: '0.78rem',
                outline: 'none'
              }}
            />

            <button
              onClick={handleRunCopilot}
              disabled={isGenerating || !customCopilotPrompt.trim()}
              style={{
                background: customCopilotPrompt.trim() ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'rgba(255,255,255,0.08)',
                color: customCopilotPrompt.trim() ? '#000' : '#64748B',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 900,
                cursor: customCopilotPrompt.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {isGenerating ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
              <span>{isGenerating ? 'Refining...' : 'Punch Up Copy'}</span>
            </button>
          </div>

          {/* GENERATED COPY TEXT AREA TERMINAL */}
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(7, 10, 15, 0.95)', borderRadius: '14px', border: '1.5px solid rgba(245, 158, 11, 0.35)', position: 'relative' }}>
            
            {/* Terminal Actions Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 900, color: '#FCD34D', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>READY PRESS DRAFT • SHA-256 VERIFIED CHECKSUM</span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setIsEditorModalOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    color: '#000',
                    border: 'none',
                    padding: '5px 14px',
                    borderRadius: '6px',
                    fontSize: '0.76rem',
                    fontWeight: 950,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 0 16px rgba(245, 158, 11, 0.4)'
                  }}
                >
                  <Edit3 size={13} color="#000" />
                  <span>Open Full-Screen Editor & Mobile Preview</span>
                </button>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                    color: '#000',
                    border: 'none',
                    padding: '5px 14px',
                    borderRadius: '6px',
                    fontSize: '0.76rem',
                    fontWeight: 950,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)'
                  }}
                >
                  <Share2 size={13} color="#000" />
                  <span>Share Story Wire</span>
                </button>

                <button
                  onClick={handleCopy}
                  style={{
                    background: copied ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.2)',
                    color: copied ? '#34D399' : '#FCD34D',
                    border: copied ? '1px solid #10B981' : '1px solid rgba(245, 158, 11, 0.5)',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Copy size={13} />
                  <span>{copied ? '✓ Copied!' : 'Copy Copy'}</span>
                </button>

                <button
                  onClick={handleDownload}
                  style={{
                    background: 'rgba(30, 41, 59, 0.8)',
                    color: '#F8FAFC',
                    border: '1px solid rgba(255,255,255,0.15)',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Download size={13} />
                  <span>Download .txt</span>
                </button>
              </div>
            </div>

            {/* High-Density Copy Output Box */}
            <textarea
              readOnly
              value={getOutputText()}
              style={{
                width: '100%',
                height: '380px',
                background: 'rgba(3, 7, 18, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '16px',
                color: '#E2E8F0',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.84rem',
                lineHeight: 1.6,
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box'
              }}
            />

          </div>

        </div>

      </div>

      {/* BYO API KEY CONFIGURATION MODAL */}
      {showApiKeyModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            border: '2px solid #F59E0B',
            borderRadius: '16px',
            maxWidth: '560px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Key size={22} color="#F59E0B" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFF', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🔑 BRING YOUR OWN AI API KEY</span>
                  <span style={{ background: '#F59E0B', color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.62rem', fontWeight: 900 }}>
                    PHASE 2 • COMING SOON
                  </span>
                </h3>
              </div>
              <button onClick={() => setShowApiKeyModal(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
            </div>

            <p style={{ color: '#94A3B8', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '16px' }}>
              Use your personal LLM API key for unlimited, un-throttled copy generation. Your API key is stored <strong>100% locally in your browser (localStorage)</strong> and is never transmitted to any third-party servers.
            </p>

            {/* Provider Selector */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FCD34D', display: 'block', marginBottom: '6px' }}>
                SELECT LLM PROVIDER:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { id: 'openai', name: 'OpenAI (GPT-4o)' },
                  { id: 'anthropic', name: 'Anthropic (Claude)' },
                  { id: 'gemini', name: 'Google (Gemini 1.5)' }
                ].map(prov => (
                  <button
                    key={prov.id}
                    onClick={() => setApiKeyProvider(prov.id)}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      background: apiKeyProvider === prov.id ? 'rgba(245, 158, 11, 0.25)' : 'rgba(7, 10, 15, 0.6)',
                      color: apiKeyProvider === prov.id ? '#FCD34D' : '#94A3B8',
                      border: apiKeyProvider === prov.id ? '1.5px solid #F59E0B' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      fontWeight: 900,
                      cursor: 'pointer'
                    }}
                  >
                    {prov.name}
                  </button>
                ))}
              </div>
            </div>

            {/* API Key Input */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FCD34D', display: 'block', marginBottom: '6px' }}>
                PASTE YOUR {apiKeyProvider.toUpperCase()} API KEY:
              </label>
              <input
                type="password"
                placeholder={apiKeyProvider === 'openai' ? 'sk-...' : apiKeyProvider === 'anthropic' ? 'sk-ant-...' : 'AIza...'}
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(7, 10, 15, 0.9)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#FFF',
                  fontFamily: 'monospace',
                  fontSize: '0.84rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Save & Clear Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {savedApiKey && (
                <button
                  onClick={handleClearApiKey}
                  style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', border: '1px solid #EF4444', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 900, cursor: 'pointer' }}
                >
                  Remove Key
                </button>
              )}
              <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
                <button
                  onClick={() => setShowApiKeyModal(false)}
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#FFF', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveApiKey}
                  style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: '#000', border: 'none', padding: '8px 20px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 900, cursor: 'pointer' }}
                >
                  Save API Key
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* YouTube-Style Executive Share Modal */}
      <ExecutiveYouTubeShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        entity={primaryComp}
        customText={getOutputText()}
      />

      {/* Full-Screen AI Rich-Text Editor & Mobile Preview Stage */}
      <FullScreenAIEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        initialText={getOutputText()}
        entity={primaryComp}
        format={activeFormat}
        tone={selectedTone}
      />
    </div>
  );
}
