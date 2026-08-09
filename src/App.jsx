import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SectorDistressIndex from './components/SectorDistressIndex';
import CompanyGraveyard from './components/CompanyGraveyard';
import CompanyDetailModal from './components/CompanyDetailModal';
import AnatomyOfFailure from './components/AnatomyOfFailure';
import ZombieCryptoTracker from './components/ZombieCryptoTracker';
import WatchlistTracker from './components/WatchlistTracker';
import AuctionDirectory from './components/AuctionDirectory';
import CourtPortalModal from './components/CourtPortalModal';
import FoundersModal from './components/FoundersModal';
import PdfViewerModal from './components/PdfViewerModal';
import PublicCatalogModal from './components/PublicCatalogModal';
import AgentWorkflowStudio from './components/AgentWorkflowStudio';
import ManagerAdminStudio from './components/ManagerAdminStudio';
import AdmissionCriteriaModal from './components/AdmissionCriteriaModal';
import CustomEntityRequestModal from './components/CustomEntityRequestModal';
import ProRadarPreferencesModal from './components/ProRadarPreferencesModal';
import BulletinDetailModal from './components/BulletinDetailModal';
import AboutModal from './components/AboutModal';
import AIVoiceAgentModal from './components/AIVoiceAgentModal';
import IngestionSchedulerModal from './components/IngestionSchedulerModal';
import IngestionDiffAuditModal from './components/IngestionDiffAuditModal';
import SandboxImpersonationBar from './components/SandboxImpersonationBar';
import MockNotificationHarvesterModal from './components/MockNotificationHarvesterModal';
import MembershipOnboardingModal from './components/MembershipOnboardingModal';
import EmailConfirmationModal from './components/EmailConfirmationModal';
import FaqModal from './components/FaqModal';
import CreateCustomAlertModal from './components/CreateCustomAlertModal';
import SignInModal from './components/SignInModal';
import WelcomeModal from './components/WelcomeModal';
import DistressHeatmap, { distressRadarStream } from './components/DistressHeatmap';
import MasterAiPromptModal from './components/MasterAiPromptModal';
import DipFinancingMonitor from './components/DipFinancingMonitor';
import Sub10mRadar from './components/Sub10mRadar';
import sub10mCatalog from './data/sub10m_companies.json';
import UniversalShareModal from './components/UniversalShareModal';




import UserAccountSettingsModal from './components/UserAccountSettingsModal';
import SEOHead from './components/SEOHead';



import sectorsData from './data/sectors.json';

import initialCompaniesData from './data/companies.json';
import zombieCryptoData from './data/zombie_crypto.json';
import initialBreakingNewsData from './data/breaking_news.json';
import initialAuctionsData from './data/auctions.json';
import agentLogsData from './data/agent_logs.json';
import { getSavedIngestionState, executeIngestionCycle } from './utils/aiIngestionEngine';

export default function App() {
  const [viewMode, setViewMode] = useState('public'); // 'public' | 'manager'
  const [activeTab, setActiveTab] = useState('graveyard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const companyId = params.get('company') || params.get('docket');
      if (companyId) {
        const targetQ = companyId.toLowerCase();
        const formattedRadar = (distressRadarStream || []).map(r => ({
          id: r.id,
          name: r.name || r.entityName,
          ticker: r.ticker || 'LEAK',
          sectorId: 'pre-judicial',
          sectorName: r.sector || 'Pre-Judicial Radar',
          status: 'PRE_JUDICIAL',
          statusBadge: r.signalCategory === 'WARN_NOTICE' ? '🟨 PRE-JUDICIAL WARN NOTICE' : '🟧 PRE-JUDICIAL DISTRESS SIGNAL',
          distressScore: 94,
          peakValuation: r.capitalAtRisk || '$250,000,000',
          collapseValuation: '$0.00 (Pre-Petition)',
          debtAtCollapse: r.capitalAtRisk || '$250.00 Million',
          locationJurisdiction: `${r.region || 'US'} State Jurisdiction`,
          primaryCause: r.primaryCause || r.signalType,
          summary: r.summary
        }));
        const allInitial = [...initialCompaniesData, ...formattedRadar];
        const found = allInitial.find(c => c && (
          c.id === targetQ || 
          (c.ticker && c.ticker.toLowerCase() === targetQ) ||
          (c.id && (c.id.includes(targetQ) || targetQ.includes(c.id))) ||
          (c.name && c.name.toLowerCase().includes(targetQ))
        ));
        if (found) return found;
      }
    } catch (e) {}
    return null;
  });
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [selectedPublicCatalog, setSelectedPublicCatalog] = useState(null);
  const [selectedPdfDoc, setSelectedPdfDoc] = useState(null);
  const [selectedBulletin, setSelectedBulletin] = useState(null);
  const [isFoundersOpen, setIsFoundersOpen] = useState(false);

  const [isAdmissionCriteriaOpen, setIsAdmissionCriteriaOpen] = useState(false);
  const [isCustomRequestOpen, setIsCustomRequestOpen] = useState(false);
  const [isProRadarOpen, setIsProRadarOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);
  const [isIngestionSchedulerOpen, setIsIngestionSchedulerOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [auditReport, setAuditReport] = useState(null);
  const [lastIngestionTime, setLastIngestionTime] = useState(() => getSavedIngestionState().lastIngestionTime);


  // Sandbox Impersonation & Notification Harvester State
  const [impersonatedUser, setImpersonatedUser] = useState(null);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);

  const [isHarvesterOpen, setIsHarvesterOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isEmailConfirmationOpen, setIsEmailConfirmationOpen] = useState(false);
  const [emailConfirmationUser, setEmailConfirmationUser] = useState(null);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isMasterAiPromptOpen, setIsMasterAiPromptOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareModalData, setShareModalData] = useState(null);

  const handleOpenShare = (item) => {
    setShareModalData(item);
    setIsShareOpen(true);
  };




  const [userProfile, setUserProfile] = useState({
    name: "Alexander Vance",
    email: "vance@citadelcap.com",
    phone: "+1 (212) 555-0192",
    org: "Citadel Special Situations Fund",
    role: "Managing Director - Distress Desk",
    tier: "BETA FOUNDER PASS (LIMITED 100-MEMBER VIP)",
    apiKey: "BCC-VIP-8849-9910"
  });
  const [savedCredentials, setSavedCredentials] = useState([
    {
      id: "cred-001",
      entityName: "Spirit Airlines",
      ticker: "SAVE",
      auctionTitle: "Airbus Fleet, Airport Gate Slots & Free Spirit Loyalty IP Auction",
      onlinePortalUrl: "https://auctions.businesscollapse.com/spirit-aircraft-142",
      pin: "PIN-8849-SDNY-TRUSTEE",
      bidderId: "BID-2026-8810",
      registrationParticulars: "$1,000 Refundable Escrow Verified by Trustee",
      locationJurisdiction: "U.S. Bankruptcy Court S.D.N.Y.",
      stalkerHorseBid: "$15,000,000"
    }
  ]);
  const [feedbackLog, setFeedbackLog] = useState([]);






  const [proPreferences, setProPreferences] = useState({
    targetStates: 'ALL',
    minValuation: 0,
    maxValuation: 500,
    minDebt: 0,
    selectedSectors: 'ALL'
  });
  const [selectedSectorFilter, setSelectedSectorFilter] = useState('ALL');


  // Dynamic CMS Managed Datasets with LocalStorage Rehydration
  const [companies, setCompanies] = useState(() => getSavedIngestionState().companies);
  const [breakingNews, setBreakingNews] = useState(() => getSavedIngestionState().news);
  const [auctions, setAuctions] = useState(() => getSavedIngestionState().auctions);


  // Watchlist state initialized safely from localStorage
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('bc_watchlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return ['wework', 'spirit-airlines'];
  });

  const toggleWatchlist = (companyId) => {
    if (impersonatedUser) {
      setImpersonatedUser(prev => {
        if (!prev) return prev;
        const currentList = Array.isArray(prev.watchlist) ? prev.watchlist : ['wework', 'spirit-airlines'];
        const nextList = currentList.includes(companyId)
          ? currentList.filter(id => id !== companyId)
          : [...currentList, companyId];
        return { ...prev, watchlist: nextList };
      });
    }
    setWatchlist((prev) => {
      const currentList = Array.isArray(prev) ? prev : ['wework', 'spirit-airlines'];
      const next = currentList.includes(companyId) 
        ? currentList.filter(id => id !== companyId) 
        : [...currentList, companyId];
      try {
        localStorage.setItem('bc_watchlist', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };


  // Effective Watchlist: Honors Impersonated Sandbox Member Watchlist if active
  const activeWatchlist = (impersonatedUser && Array.isArray(impersonatedUser.watchlist)) 
    ? impersonatedUser.watchlist 
    : watchlist;

  // Dismissed & Muted Companies state initialized safely from localStorage
  const [dismissedCompanyIds, setDismissedCompanyIds] = useState(() => {
    try {
      const saved = localStorage.getItem('bc_dismissed_companies');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

  const toggleDismissCompany = (companyId) => {
    setDismissedCompanyIds((prev) => {
      const currentList = Array.isArray(prev) ? prev : [];
      const next = currentList.includes(companyId)
        ? currentList.filter(id => id !== companyId)
        : [...currentList, companyId];
      try {
        localStorage.setItem('bc_dismissed_companies', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const [sectors, setSectors] = useState(sectorsData);

  const [agentLogs, setAgentLogs] = useState(agentLogsData);



  // Fold Pre-Judicial Distress Heatmap Stream into Main Corporate Feed Dataset
  const formattedRadarCompanies = (distressRadarStream || []).map((r) => {
    const now = new Date();
    const formattedNow = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' EST';
    const nowIso = now.toISOString();

    return {
      ...r,
      id: r.id,
      name: r.name || r.entityName,
      ticker: r.ticker || 'LEAK',
      sectorId: 'pre-judicial',
      sectorName: r.sector || 'Pre-Judicial Radar',
      status: 'PRE_JUDICIAL',
      statusBadge: r.signalCategory === 'WARN_NOTICE' ? '🟨 PRE-JUDICIAL WARN NOTICE' : '🟧 PRE-JUDICIAL DISTRESS SIGNAL',
      distressScore: 94,
      peakValuation: r.capitalAtRisk || '$250,000,000',
      collapseValuation: '$0.00 (Pre-Petition)',
      debtAtCollapse: r.capitalAtRisk || '$250.00 Million',
      locationJurisdiction: `${r.region || 'US'} State Jurisdiction`,
      primaryCause: r.primaryCause || r.signalType,
      summary: r.summary,
      earlyWarningSignals: [
        r.signalType,
        r.daysBeforeFiling,
        r.evidenceChip || 'State WARN Notice'
      ],
      anatomyBreakdown: {
        structural: `Pre-judicial leak detected in ${r.region || 'U.S.'} jurisdiction.`,
        financial: `Capital at risk estimated at ${r.capitalAtRisk || '$250M'}.`,
        market: r.summary,
        regulatory: r.provenanceOrigin || 'SEC EDGAR Form 8-K Disclosure'
      },
      timeline: [
        {
          date: 'Aug 2026',
          event: `${r.signalType}: ${r.summary}`
        }
      ],
      keyTakeaways: [
        'Pre-judicial distress leaks surface 6-to-9 months prior to formal Chapter 11 petitions.',
        'State WARN Act filings and C-suite resignations provide critical lead-time for restructuring desks.'
      ],
      courtCaseStatus: 'PRE_JUDICIAL_LEAK',
      docketStatusBadge: r.signalType,
      courtLegalNotice: `NOTICE: Pre-judicial warning leak monitored by AI ingestion engine. ${r.daysBeforeFiling}.`,
      officialFilingDate: nowIso.slice(0, 10),
      firstDistressSignalDate: 'Aug 2026',
      formattedTimestamp: formattedNow,
      lastRefreshedAt: formattedNow,
      lastMaterialChangeDate: r.lastMaterialChangeDate || nowIso,
      formattedMaterialChange: r.formattedMaterialChange || 'Aug 9, 2026 • 09:30 AM EST',
      lastSweepDate: nowIso,
      formattedLastSweep: formattedNow
    };
  });

  const allCombinedCompanies = [...companies, ...formattedRadarCompanies, ...(sub10mCatalog || [])];

  // URL Deep-Link Router (e.g. ?company=spirit-airlines or ?tab=dip or ?docket=SAVE-1420)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const companyId = params.get('company') || params.get('docket');
      const tabParam = params.get('tab');

      if (tabParam) {
        setActiveTab(tabParam);
      }

      if (companyId) {
        const targetQ = companyId.toLowerCase();
        const found = (allCombinedCompanies || []).find(c => c && (c.id === targetQ || (c.ticker && c.ticker.toLowerCase() === targetQ)));
        if (found) {
          setSelectedCompany(found);
        }
      }
    } catch (e) {}
  }, [allCombinedCompanies.length]);

  // Global Deep Search filtering across all post-mortem fields
  const filteredCompanies = (allCombinedCompanies || []).filter((c) => {
    if (!c) return false;
    if (!searchQuery || !searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();

    // 1. Basic Fields (Name, Ticker, Cause, Sector, CEO, Summary)
    const name = c.name ? c.name.toLowerCase() : '';
    const ticker = c.ticker ? c.ticker.toLowerCase() : '';
    const primaryCause = c.primaryCause ? c.primaryCause.toLowerCase() : '';
    const sectorName = c.sectorName ? c.sectorName.toLowerCase() : '';
    const summary = c.summary ? c.summary.toLowerCase() : '';
    const ceo = c.ceoAtFailure ? c.ceoAtFailure.toLowerCase() : '';
    const status = c.status ? c.status.toLowerCase() : '';

    const basicMatch = 
      name.includes(q) ||
      ticker.includes(q) ||
      primaryCause.includes(q) ||
      sectorName.includes(q) ||
      summary.includes(q) ||
      ceo.includes(q) ||
      status.includes(q);

    // 2. Location & Jurisdiction Match
    const locationMatch = c.locationJurisdiction && c.locationJurisdiction.toLowerCase().includes(q);

    // 3. Early Warning Signals Match
    const warningMatch = Array.isArray(c.earlyWarningSignals) && c.earlyWarningSignals.some(s => s && typeof s === 'string' && s.toLowerCase().includes(q));

    // 4. Timeline Milestones Match
    const timelineMatch = Array.isArray(c.timeline) && c.timeline.some(t => 
      t && ((t.title && t.title.toLowerCase().includes(q)) || (t.description && t.description.toLowerCase().includes(q)) || (t.date && String(t.date).toLowerCase().includes(q)))
    );

    // 5. Key Takeaways Match
    const takeawayMatch = Array.isArray(c.keyTakeaways) && c.keyTakeaways.some(k => k && typeof k === 'string' && k.toLowerCase().includes(q));

    return basicMatch || locationMatch || warningMatch || timelineMatch || takeawayMatch;
  });



  const handleSelectSector = (sectorId) => {
    setSelectedSectorFilter(sectorId);
    setActiveTab('graveyard');
  };

  const handleRunAgentSimulation = () => {
    // Live AI Agent Ingestion simulation adding Tupperware Brands Corp (TUPQ)
    const ingestedTime = new Date().toISOString();
    
    const newCompany = {
      id: `tupperware-${Date.now()}`,
      name: "Tupperware Brands Corporation",
      ticker: "TUPQ",
      sectorId: "consumer",
      sectorName: "Consumer & Retail Goods",
      status: "Chapter 11 Filed",
      peakValuation: "$2.60 Billion (2013 Peak)",
      collapseValuation: "$0.04 (OTC Equity)",
      finalDebt: "$812 Million Total Liabilities",
      primaryCause: "Debt Overhang, Failed Retail Distribution Transition & Direct Sales Model Decline",
      dateTimestamp: ingestedTime,
      locationJurisdiction: "Wilmington, DE (U.S. Bankruptcy Court D. Del.)",
      ceoAtFailure: "Laurie Ann Goldman",
      summary: "Iconic food container manufacturer Tupperware Brands filed for Chapter 11 bankruptcy protection in Delaware following years of declining direct sales revenues, unsustainable debt burdens, and failure to secure a digital retail distribution strategy.",
      earlyWarningSignals: [
        "Auditor 'Going Concern' warning issued in SEC Form 10-K disclosures.",
        "Delayed SEC annual report filings due to internal accounting controls material weaknesses.",
        "Default on $700M revolving credit facility covenants."
      ],
      timeline: [
        { date: "2013-11-15", title: "Peak Market Capitalization", description: "Tupperware reaches all-time high valuation of $2.6B driven by international direct sales growth.", type: "peak" },
        { date: "2023-04-07", title: "SEC Going Concern Warning", description: "Company warns investors it faces substantial doubt about its ability to continue as a going concern.", type: "distress" },
        { date: "2024-09-17", title: "Chapter 11 Bankruptcy Filing", description: "Tupperware files emergency Chapter 11 petition in Delaware seeking court-supervised asset sale.", type: "chapter-11" }
      ],
      keyTakeaways: [
        "Legacy multi-level marketing (MLM) distribution models fail without modern e-commerce parity.",
        "Carrying $800M+ in senior debt during high-rate environments guarantees default when sales decline."
      ]
    };

    const newAlert = {
      id: `tupperware-alert-${Date.now()}`,
      isEmergent: true,
      entityName: "Tupperware Brands Corporation",
      ticker: "TUPQ",
      lastUpdated: ingestedTime,
      locationJurisdiction: "Wilmington, DE (U.S. Bankruptcy Court D. Del.)",
      updateFrequency: "Live AI Agent Ingested",
      badgeText: "🤖 AI AGENT INGESTED DOCKET",
      headline: "Tupperware Brands Files Emergency Chapter 11 Bankruptcy Petition in Delaware",
      summary: "Iconic home goods brand Tupperware (TUPQ) seeks court approval for Section 363 asset liquidation sale after accumulating $812M in liabilities.",
      keyUpdates: [
        `${ingestedTime.slice(11, 16)} EST: Autonomous AI Ingest Agent parsed SEC Form 8-K & Court Docket #001.`
      ],
      sourceType: "SEC EDGAR 8-K & PACER Docket",
      sourceName: "U.S. Bankruptcy Court D. Del.",
      auctionTitle: "Tupperware Global IP, Mold Tooling & Inventory Sale",
      auctionPortalUrl: "https://auctions.businesscollapse.com"
    };

    const newAuction = {
      id: `tupperware-auction-${Date.now()}`,
      entityName: "Tupperware Brands Corporation",
      ticker: "TUPQ",
      auctionTitle: "Tupperware Global Patent IP, Mold Tooling & Retail Goods Liquidation",
      auctionType: "Court-Ordered Section 363 Asset Auction",
      dateTimestamp: ingestedTime,
      locationJurisdiction: "Wilmington, DE Court",
      auctioneer: "Hilco Industrial & Bankruptcy Trustee",
      onlinePortalUrl: "https://auctions.businesscollapse.com",
      registrationParticulars: "Requires Court Docket Pre-registration. $25,000 refundable escrow deposit for IP bidding rights.",
      assetSummary: "Commercial plastics molding machinery, global trademark IP portfolio, and finished goods inventory.",
      stalkerHorseBid: "$45,000,000 Credit Bid Floor",
      status: "Auction Active",
      statusBadge: "warning"
    };

    // Update state with newly ingested entities
    setCompanies(prev => [newCompany, ...prev]);
    setBreakingNews(prev => [newAlert, ...(Array.isArray(prev) ? prev : [prev])]);
    setAuctions(prev => [newAuction, ...(Array.isArray(prev) ? prev : [])]);
    setLastIngestionTime(ingestedTime);
  };

  const handleTriggerAiIngest = () => {
    const result = executeIngestionCycle();
    setCompanies(result.updatedCompanies);
    setBreakingNews(result.updatedNews);
    setAuctions(result.updatedAuctions);
    setLastIngestionTime(result.lastIngestionTime);
    if (result.auditReport) {
      setAuditReport(result.auditReport);
      setIsAuditModalOpen(true);
    }
  };

  // Global 15-Minute Background Automated System Refresh Daemon
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('[AI-INGEST-DAEMON] Executing scheduled 15-minute automated ingestion run...');
      const result = executeIngestionCycle();
      setCompanies(result.updatedCompanies);
      setBreakingNews(result.updatedNews);
      setAuctions(result.updatedAuctions);
      setLastIngestionTime(result.lastIngestionTime);
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);



  // Deploy Custom AI Entity Tracker for Sub-threshold Entities
  const handleDeployCustomEntityTracker = (customReq) => {
    const ingestedTime = new Date().toISOString();
    const entityName = customReq.entityName || 'Custom Tracked Entity';
    const tickerOrState = customReq.tickerOrState || 'CUSTOM';

    const newCustomCompany = {
      id: `custom-entity-${Date.now()}`,
      name: entityName,
      ticker: tickerOrState,
      sectorId: 'industrial',
      sectorName: 'PRO Custom Tracked Entity',
      status: 'Custom Tracked Case',
      statusBadge: 'chapter-11',
      distressScore: 92,
      peakValuation: '$8.5M (Sub-threshold)',
      collapseValuation: '$450K (Liquidation Estimate)',
      debtAtCollapse: '$4.2M Outstanding Debt',
      yearFounded: 2012,
      yearCollapsed: new Date().getFullYear(),
      dateTimestamp: ingestedTime,
      locationJurisdiction: `${tickerOrState} (State Business Registry & PACER Docket)`,
      ceoAtFailure: 'Managing Director / Corporate Officers',
      primaryCause: 'Custom AI Tracked Sub-Threshold Insolvency',
      sourceType: 'PACER Court Docket & State Registry',
      sourceName: `Custom AI Crawler Docket #${Math.floor(Math.random()*90000 + 10000)}`,
      summary: `Sub-threshold mid-market entity currently tracked via PRO Custom AI Crawler. Notes: ${customReq.notes}`,
      isCustomTracked: true,
      earlyWarningSignals: [
        `${ingestedTime.slice(0, 10)}: Custom AI crawler detected state tax lien and creditor demand letter.`,
        `${ingestedTime.slice(0, 10)}: Initial PACER Docket filing parsed for reorganization plan.`,
        `${ingestedTime.slice(0, 10)}: Commercial credit line default notification logged.`
      ],
      anatomyBreakdown: {
        debtOverload: 40,
        mismanagement: 30,

        macroShift: 20,
        mismatch: 10
      },
      timeline: [
        {
          date: ingestedTime,
          title: "PRO Custom AI Ingest & Docket Alert",
          description: `Custom crawler deployed for ${entityName}. Full docket monitoring active.`,
          type: "chapter-11"
        }
      ],
      keyTakeaways: [
        "Sub-threshold mid-market entities often liquidate machinery and commercial real estate faster than public mega-caps.",
        "PRO Custom AI Crawlers track regional dockets prior to public press announcements."
      ]
    };

    const newCustomAlert = {
      id: `custom-alert-${Date.now()}`,
      isEmergent: true,
      entityName: entityName,
      ticker: tickerOrState,
      lastUpdated: ingestedTime,
      locationJurisdiction: `${tickerOrState} (State & PACER Jurisdiction)`,
      updateFrequency: "Live Custom AI Agent Ingested",
      badgeText: "🔒 PRO CUSTOM TRACKED DOCKET",
      headline: `PRO Custom Alert: Live Bankruptcy Docket Ingested for ${entityName}`,
      summary: `Autonomous AI crawler ingested dockets and asset schedules for ${entityName}. Tracked under PRO Member Custom Scope.`,
      keyUpdates: [
        `${ingestedTime.slice(11, 16)} EST: Parsed state court petitions and secured creditor dockets.`
      ],
      sourceType: "PACER & State UCC Registry",
      sourceName: "Custom AI Crawler Feed",
      auctionTitle: `${entityName} Commercial Equipment & Asset Liquidation Sale`,
      auctionPortalUrl: "https://auctions.businesscollapse.com"
    };

    const newCustomAuction = {
      id: `custom-auction-${Date.now()}`,
      entityName: entityName,
      ticker: tickerOrState,
      auctionTitle: `${entityName} Machinery, Inventory & Commercial Property Auction`,
      auctionType: "PRO Custom Tracked Asset Liquidation",
      dateTimestamp: ingestedTime,
      locationJurisdiction: `${tickerOrState} Court Jurisdiction`,
      auctioneer: "Regional Commercial Liquidation Auctioneers",
      onlinePortalUrl: "https://auctions.businesscollapse.com",
      registrationParticulars: "Requires PRO Court Docket Registration PIN. $5,000 refundable escrow deposit for equipment bidding.",
      assetSummary: "Commercial tooling, fleet vehicles, office fixtures, and trade inventory.",
      stalkerHorseBid: "$850,000 Starting Reserve",
      status: "Auction Active",
      statusBadge: "warning"
    };

    setCompanies(prev => [newCustomCompany, ...prev]);
    setBreakingNews(prev => [newCustomAlert, ...(Array.isArray(prev) ? prev : [prev])]);
    setAuctions(prev => [newCustomAuction, ...(Array.isArray(prev) ? prev : [])]);
    // Custom tracked entities default as favorited items
    setWatchlist(prev => [...prev, newCustomCompany.id]);
  };



  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Dynamic SEO & AISEO Head Manager */}
      <SEOHead
        activeTab={activeTab}
        selectedCompany={selectedCompany}
        selectedAuction={selectedAuction}
      />

      {/* Top Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        companies={allCombinedCompanies}
        onSelectCompany={(company) => setSelectedCompany(company)}
        watchlist={activeWatchlist}
        toggleWatchlist={toggleWatchlist}
        onOpenFounders={() => setIsFoundersOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenAdmissionCriteria={() => setIsAdmissionCriteriaOpen(true)}
        onOpenCustomRequest={() => setIsCustomRequestOpen(true)}
        onSelectSector={handleSelectSector}
        onOpenFaq={() => setIsFaqOpen(true)}
        onOpenWelcome={() => setIsWelcomeOpen(true)}
        onOpenAccountSettings={() => setIsAccountSettingsOpen(true)}
        onOpenSignIn={() => setIsSignInOpen(true)}
        breakingNews={breakingNews}



        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenVoiceAgent={() => setIsVoiceAgentOpen(true)}
        onOpenIngestionScheduler={() => setIsIngestionSchedulerOpen(true)}
        lastIngestionTime={lastIngestionTime}
      />

      {/* 75-Member Sandbox Impersonation Console Bar (Only in Manager Back-Office Mode) */}
      {viewMode === 'manager' && (
        <SandboxImpersonationBar
          impersonatedUser={impersonatedUser}
          onSelectUser={(u) => setImpersonatedUser(u)}
          onResetToAdmin={() => setImpersonatedUser(null)}
          onOpenHarvester={() => setIsHarvesterOpen(true)}
        />
      )}








      {/* Main Content Area */}
      <main className="app-container" style={{ flex: 1 }}>
        {viewMode === 'manager' ? (
          <ManagerAdminStudio
            companies={companies}
            setCompanies={setCompanies}
            breakingNews={breakingNews}
            setBreakingNews={setBreakingNews}
            auctions={auctions}
            setAuctions={setAuctions}
            agentLogs={agentLogsData}
            onRunIngestSimulation={handleRunAgentSimulation}
            onSwitchToPublic={() => setViewMode('public')}
            lastIngestionTime={lastIngestionTime}
            onOpenIngestionScheduler={() => setIsIngestionSchedulerOpen(true)}
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenFounders={() => setIsFoundersOpen(true)}
          />

        ) : (
          <>
        {(activeTab === 'graveyard' || activeTab === 'graveyard_archive') && (
          <CompanyGraveyard
            companies={filteredCompanies}
            onSelectCompany={(company) => setSelectedCompany(company)}
            selectedSectorFilter={selectedSectorFilter}
            setSelectedSectorFilter={setSelectedSectorFilter}
            breakingNews={breakingNews}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            watchlist={activeWatchlist}
            toggleWatchlist={toggleWatchlist}
            onOpenAdmissionCriteria={() => setIsAdmissionCriteriaOpen(true)}
            onOpenCustomRequest={() => setIsCustomRequestOpen(true)}
            onOpenProRadarPreferences={() => setIsCreateAlertOpen(true)}
            onOpenBulletinModal={(bulletin) => setSelectedBulletin(bulletin)}
            lastIngestionTime={lastIngestionTime}
            onOpenShare={handleOpenShare}
            dismissedCompanyIds={dismissedCompanyIds}
            toggleDismissCompany={toggleDismissCompany}
            activeTab={activeTab}




            onOpenAuctions={(alert) => {
              if (alert && alert.auctionTitle) {
                const matched = (auctions || []).find(a => a.entityName === alert.entityName || a.ticker === alert.ticker);
                if (matched) {
                  setSelectedAuction(matched);
                } else {

                  setSelectedAuction({
                    id: alert.id,
                    entityName: alert.entityName,
                    ticker: alert.ticker,
                    auctionTitle: alert.auctionTitle,
                    auctionType: "Court Webcast & Digital Bidding Portal",
                    dateTimestamp: alert.lastUpdated || "2026-08-12T10:00:00Z",
                    locationJurisdiction: alert.locationJurisdiction || "Wilmington, DE Court",
                    auctioneer: alert.sourceName || "Court Appointed Liquidation Trustee",
                    onlinePortalUrl: alert.auctionPortalUrl || "https://auctions.businesscollapse.com",
                    registrationParticulars: "Requires Court Docket Pre-registration. $1,000 refundable escrow deposit submitted to Bankruptcy Trustee.",
                    assetSummary: alert.summary,
                    stalkerHorseBid: "Court Docket Stalker-Horse Floor",
                    status: "Auction Open",
                    statusBadge: "warning"
                  });
                }
              } else {
                setActiveTab('auctions');
              }
            }}
          />
        )}



        {activeTab === 'watchlist' && (
          <WatchlistTracker
            companies={allCombinedCompanies}
            breakingNews={breakingNews}
            distressRadarStream={distressRadarStream}
            auctions={auctions}
            zombieCrypto={zombieCryptoData}
            watchlist={activeWatchlist}
            toggleWatchlist={toggleWatchlist}
            onSelectCompany={(company) => setSelectedCompany(company)}
            onSelectAuction={(auction) => setSelectedAuction(auction)}
            onGoBack={() => setActiveTab('graveyard')}
          />
        )}

        {activeTab === 'dip' && (
          <DipFinancingMonitor
            companies={allCombinedCompanies}
            watchlist={activeWatchlist}
            toggleWatchlist={toggleWatchlist}
            onSelectCompany={(company) => setSelectedCompany(company)}
            onGoBack={() => setActiveTab('graveyard')}
          />
        )}

        {activeTab === 'sub10m' && (
          <Sub10mRadar
            watchlist={activeWatchlist}
            toggleWatchlist={toggleWatchlist}
            onSelectCompany={(company) => setSelectedCompany(company)}
            onGoBack={() => setActiveTab('graveyard')}
            onOpenShare={handleOpenShare}
          />
        )}

        {activeTab === 'auctions' && (
          <AuctionDirectory
            auctions={auctions}
            onSelectAuction={(auction) => setSelectedAuction(auction)}
            onOpenPublicCatalog={(auction) => setSelectedPublicCatalog(auction)}
            onGoBack={() => setActiveTab('graveyard')}
            watchlist={activeWatchlist}
            toggleWatchlist={toggleWatchlist}
          />
        )}

        {activeTab === 'sectors' && (
          <SectorDistressIndex
            sectors={sectors}
            onSelectSector={handleSelectSector}
            onGoBack={() => setActiveTab('graveyard')}
          />
        )}

        {activeTab === 'heatmap' && (
          <DistressHeatmap
            onSelectCompany={(company) => setSelectedCompany(company)}
            watchlist={activeWatchlist}
            toggleWatchlist={toggleWatchlist}
          />
        )}



        {activeTab === 'anatomy' && (
          <AnatomyOfFailure
            companies={companies}
            onGoBack={() => setActiveTab('graveyard')}
          />
        )}

        {activeTab === 'crypto' && (
          <ZombieCryptoTracker
            zombieProjects={zombieCryptoData}
            onGoBack={() => setActiveTab('graveyard')}
          />
        )}

        {activeTab === 'agent' && (
          <AgentWorkflowStudio
            logs={agentLogsData}
            onRunIngestSimulation={handleRunAgentSimulation}
            onGoBack={() => setActiveTab('graveyard')}
          />
        )}

        </>
        )}
      </main>


      {/* Slide-over Post-Mortem Detail Modal */}
      <CompanyDetailModal
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
        onOpenPdf={(doc) => setSelectedPdfDoc(doc)}
        viewMode={viewMode}
        onOpenShare={handleOpenShare}
      />


      {/* Official Court Bid Portal & Credentials Modal */}
      <CourtPortalModal
        auction={selectedAuction}
        onClose={() => setSelectedAuction(null)}
        onSaveCredential={(cred) => setSavedCredentials(prev => [cred, ...prev])}
      />

      {/* User Account Vault & Platform Settings Modal */}
      <UserAccountSettingsModal
        isOpen={isAccountSettingsOpen}
        onClose={() => setIsAccountSettingsOpen(false)}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        savedCredentials={savedCredentials}
        setSavedCredentials={setSavedCredentials}
        onFeedbackSubmitted={(newFb) => setFeedbackLog(prev => [newFb, ...prev])}
        onOpenProRadarPreferences={() => setIsProRadarOpen(true)}
        onOpenAdmissionCriteria={() => setIsAdmissionCriteriaOpen(true)}
        onOpenCustomRequest={() => setIsCustomRequestOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenFaq={() => setIsFaqOpen(true)}
        onOpenMasterAiPrompt={() => setIsMasterAiPromptOpen(true)}
        dismissedCompanyIds={dismissedCompanyIds}
        toggleDismissCompany={toggleDismissCompany}
        companies={allCombinedCompanies}
      />





      {/* VIP Beta Founders Pass & 14-Day Free Trial Modal */}
      <FoundersModal
        isOpen={isFoundersOpen}
        onClose={() => setIsFoundersOpen(false)}
        onOpenOnboarding={() => {
          setIsFoundersOpen(false);
          setIsOnboardingOpen(true);
        }}
      />

      {/* Official PACER Court Filing PDF Viewer Modal */}
      <PdfViewerModal
        documentInfo={selectedPdfDoc}
        onClose={() => setSelectedPdfDoc(null)}
      />

      {/* Free Public Asset Catalog Modal */}
      <PublicCatalogModal
        auction={selectedPublicCatalog}
        onClose={() => setSelectedPublicCatalog(null)}
        onOpenBidderModal={(auction) => setSelectedAuction(auction)}
      />

      {/* Official Admission Criteria Modal */}
      <AdmissionCriteriaModal
        isOpen={isAdmissionCriteriaOpen}
        onClose={() => setIsAdmissionCriteriaOpen(false)}
        onOpenCustomRequest={() => setIsCustomRequestOpen(true)}
      />

      {/* PRO & Terminal Custom Entity Request Modal */}
      <CustomEntityRequestModal
        isOpen={isCustomRequestOpen}
        onClose={() => setIsCustomRequestOpen(false)}
        onRequestSubmitted={(req) => {
          handleDeployCustomEntityTracker(req);
        }}
      />

      {/* PRO & Terminal Custom Threshold & Radar Preferences Modal */}
      <ProRadarPreferencesModal
        isOpen={isProRadarOpen}
        onClose={() => setIsProRadarOpen(false)}
        preferences={proPreferences}
        onSavePreferences={(newPref) => setProPreferences(newPref)}
      />

      {/* Interactive Court Bulletin & Legal Docket Inspector Modal */}
      <BulletinDetailModal
        bulletin={selectedBulletin}
        onClose={() => setSelectedBulletin(null)}
        onOpenPdf={(pdfDoc) => setSelectedPdfDoc(pdfDoc)}
      />

      {/* Official About Platform & AI Spokesperson Video Showcase Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenVoiceAgent={() => setIsVoiceAgentOpen(true)}
      />

      {/* Autonomous AI Voice Assistant & Site Q&A Guide Modal */}
      <AIVoiceAgentModal
        isOpen={isVoiceAgentOpen}
        onClose={() => setIsVoiceAgentOpen(false)}
        onOpenWatchlist={() => setActiveTab('watchlist')}
        onOpenCustomRequest={() => setIsCustomRequestOpen(true)}
        onOpenAdmissionCriteria={() => setIsAdmissionCriteriaOpen(true)}
      />

      {/* System Refresh Scheduler & Status Control Modal */}
      <IngestionSchedulerModal
        isOpen={isIngestionSchedulerOpen}
        onClose={() => setIsIngestionSchedulerOpen(false)}
        lastIngestionTime={lastIngestionTime}
        onTriggerIngest={handleTriggerAiIngest}
        indexedCount={(companies || []).length}
      />

      {/* 75-Member Mock Notification & Email Harvester Mini-App Modal */}
      <MockNotificationHarvesterModal
        isOpen={isHarvesterOpen}
        onClose={() => setIsHarvesterOpen(false)}
        impersonatedUser={impersonatedUser}
      />

      {/* Institutional Membership Onboarding & Checkout Modal */}
      <MembershipOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onOpenEmailConfirmation={(u) => {
          setEmailConfirmationUser(u);
          setIsEmailConfirmationOpen(true);
        }}
      />

      {/* Institutional VIP Email Confirmation & Verification Modal */}
      <EmailConfirmationModal
        isOpen={isEmailConfirmationOpen}
        onClose={() => setIsEmailConfirmationOpen(false)}
        user={emailConfirmationUser}
        onEmailVerified={(u) => {
          if (u) {
            setUserProfile(prev => ({
              ...prev,
              name: u.name || prev.name,
              email: u.email || prev.email,
              apiKey: u.apiKey || prev.apiKey
            }));
          }
        }}
      />

      {/* Platform FAQ Modal */}
      <FaqModal
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Welcome Brief & Platform Guide Modal */}
      <WelcomeModal
        isOpen={isWelcomeOpen}
        onClose={() => setIsWelcomeOpen(false)}
        onOpenFaq={() => setIsFaqOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenMasterAiPrompt={() => setIsMasterAiPromptOpen(true)}
      />

      {/* Master AI Concierge & Scenario Engine Prompt Modal */}
      <MasterAiPromptModal
        isOpen={isMasterAiPromptOpen}
        onClose={() => setIsMasterAiPromptOpen(false)}
      />



      {/* Custom Deal Alert Radar Modal */}
      <CreateCustomAlertModal
        isOpen={isCreateAlertOpen}
        onClose={() => setIsCreateAlertOpen(false)}
      />

      {/* Cryptographic SHA-256 Checksum & Diff Verification Audit Modal */}
      <IngestionDiffAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        auditReport={auditReport}
      />

      {/* Subscriber & Founder Log-In Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Universal Multi-Platform Share Modal */}
      <UniversalShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        shareData={shareModalData}
      />

      {/* Modern Footer */}


      <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'rgba(7, 10, 15, 0.95)', padding: '28px 0', marginTop: '60px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem' }}>
            <div>
              <strong style={{ color: '#FFF', fontSize: '1rem' }}>businesscollapse.com</strong> • Corporate Decline Trackers & Autonomous AI Risk Platform
            </div>
            <div style={{ fontSize: '0.75rem', color: '#10B981', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>
              🛡️ EDITORIAL POLICY: SEC EDGAR & TIER-1 FINANCIAL PRESS ONLY
            </div>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.5, maxWidth: '1000px' }}>
            <strong>Editorial & Data Verification Standard:</strong> All financial distress metrics, bankruptcy dockets, and post-mortem timelines are derived strictly from official SEC filings (10-K, 10-Q, 8-K), PACER federal court records, and reputable Tier-1 financial news outlets (The Wall Street Journal, Bloomberg, Reuters, Financial Times). We do not rely on unverified social media commentary or content creators. Secondary commentary is strictly disclaimed.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            <div>
              Primary Storage: <span style={{ color: '#C084FC', fontFamily: 'var(--font-mono)' }}>D:\Projects\BusinessCollapse.Com\data\</span>
            </div>
            <div 
              onClick={(e) => {
                if (e.ctrlKey || e.metaKey) {
                  const nextMode = viewMode === 'public' ? 'manager' : 'public';
                  setViewMode(nextMode);
                  if (nextMode === 'manager') {
                    setActiveTab('admin');
                    alert('🔐 SECRET BACK-OFFICE PORTAL UNLOCKED!\n\nWelcome Administrator. You now have full access to the AI Manager Studio, Sandbox Impersonation Bar, and Ingestion Utilities.');
                  } else {
                    setActiveTab('graveyard');
                    alert('🔒 Public Subscriber Mode Restored.');
                  }
                }
              }}
              style={{ cursor: 'pointer', userSelect: 'none' }}
              title="Secret Admin Access: Hold CTRL + Click"
            >
              © {new Date().getFullYear()} Business Collapse Intelligence. All rights reserved.
              {viewMode === 'manager' && (
                <span style={{ color: '#EF4444', fontWeight: 800, marginLeft: '8px', background: 'rgba(239,68,68,0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                  [ADMIN BACK-OFFICE UNLOCKED]
                </span>
              )}
            </div>
          </div>

        </div>
      </footer>


    </div>
  );
}
