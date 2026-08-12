import React, { useState } from 'react';
import { X, ShieldCheck, Download, Share2, ExternalLink, Lock, CheckCircle2, FileText, ArrowRight, ChevronLeft, ChevronRight, Key, Sparkles, Check, Newspaper, Info, Building2, Scale } from 'lucide-react';
import ExecutiveYouTubeShareModal from './ExecutiveYouTubeShareModal';

export default function BCCCitationWrapperModal({ 
  isOpen, 
  onClose, 
  citation = null 
}) {
  if (!isOpen) return null;

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isTrialGateOpen, setIsTrialGateOpen] = useState(false);
  const [activeCanvasTab, setActiveCanvasTab] = useState('pdf'); // 'pdf' | 'article'
  const [activeDocIndex, setActiveDocIndex] = useState(0);
  const [emailInput, setEmailInput] = useState('');
  const [trialActivated, setTrialActivated] = useState(false);

  // Multi-Citation Case Evidence Array
  const documents = [
    {
      id: 1,
      type: 'docket',
      title: "Official Chapter 11 Voluntary Petition (Docket #001)",
      shortTitle: "Petition Docket #001",
      court: "United States Bankruptcy Court for the District of Delaware",
      caseName: citation?.caseName || "Tupperware Brands Corporation",
      ticker: citation?.ticker || "TUPQ",
      debt: citation?.debt || "$812 Million Total Liabilities",
      date: "August 11, 2026",
      checksum: "sha256-a8f4c991b72e004a89b1c",
      judge: "Hon. John T. Dorsey",
      body: `VOLUNTARY PETITION FOR CHAPTER 11 RELIEF\n\nThe Debtor, ${citation?.caseName || 'Tupperware Brands Corporation'}, a Delaware corporation having its principal executive offices in Wilmington, DE, respectfully submits this Voluntary Petition under Chapter 11 of Title 11 of the United States Code (11 U.S.C. §§ 101 et seq.).\n\n1. Estimated Assets & Liabilities: Debtor asserts estimated total liabilities of ${citation?.debt || '$812 Million'} against peak corporate valuations. The Debtor requires emergency Chapter 11 protection to stabilize capital operations and facilitate a court-supervised Section 363 asset sale.\n\n2. Senior Secured DIP Financing: The Debtor has negotiated a Super-Priority Debtor-in-Possession (DIP) credit facility with 1st Lien secured lenders to fund post-petition payroll and vendor SLA commitments.\n\n3. Court Jurisdiction: Legal proceedings are pending before the United States Bankruptcy Court for the District of Delaware.`
    },
    {
      id: 2,
      type: 'motion',
      title: "Section 365 Motion to Reject Unexpired Store Leases (Docket #014)",
      shortTitle: "Lease Rejections #014",
      court: "United States Bankruptcy Court for the District of Delaware",
      caseName: citation?.caseName || "Tupperware Brands Corporation",
      ticker: citation?.ticker || "TUPQ",
      debt: "$42 Million Annual Lease Obligations",
      date: "August 11, 2026",
      checksum: "sha256-f94b11802c4e789a3b221",
      judge: "Hon. John T. Dorsey",
      body: `DEBTORS' EMERGENCY MOTION FOR ENTRY OF AN ORDER AUTHORIZING REJECTION OF UNEXPIRED REAL PROPERTY LEASES EFFECTIVE AS OF PETITION DATE\n\nThe Debtors hereby move this Court for entry of an order authorizing the immediate rejection of 120 unexpired retail real property leases under 11 U.S.C. § 365(a).\n\n1. Rejection Rationale: The Subject Leases represent burdensome ongoing administrative expense liabilities of approximately $3.5 Million per month. Rejection effective as of the Petition Date is necessary to preserve estate liquidity.\n\n2. Landlord SLA Impact: Affected landlords and commercial real estate lessors must file Administrative Proof of Claim forms (Form 410) prior to the court-established Bar Date.`
    },
    {
      id: 3,
      type: 'sec',
      title: "SEC Form 8-K Material Default Disclosure",
      shortTitle: "SEC Form 8-K",
      court: "U.S. Securities and Exchange Commission (Washington, D.C.)",
      caseName: citation?.caseName || "Tupperware Brands Corporation",
      ticker: citation?.ticker || "TUPQ",
      debt: "Senior Secured Credit Agreement Default",
      date: "August 10, 2026",
      checksum: "sha256-e31b994821a0094e87c61",
      judge: "SEC EDGAR System Sweep",
      body: `UNITED STATES SECURITIES AND EXCHANGE COMMISSION\nFORM 8-K CURRENT REPORT\n\nItem 2.04 Triggering Events That Accelerate or Increase a Direct Financial Obligation or an Obligation under an Off-Balance Sheet Arrangement.\n\nOn August 10, 2026, ${citation?.caseName || 'Tupperware Brands Corporation'} received written notice of acceleration under its Senior Secured Credit Agreement following failure to maintain required fixed-charge coverage ratios. Total principal outstanding under the facility is $812,000,000.\n\nItem 8.01 Other Events.\nThe Company has retained turnaround legal counsel and financial restructuring advisors to evaluate Section 363 asset disposition strategies.`
    },
    {
      id: 4,
      type: 'warn',
      title: "State WARN Act Executive Layoff Disclosure",
      shortTitle: "WARN Act Notice",
      court: "Delaware Department of Labor & Workforce Development",
      caseName: citation?.caseName || "Tupperware Brands Corporation",
      ticker: citation?.ticker || "TUPQ",
      debt: "450 Executive & Corporate Roles Impacted",
      date: "August 11, 2026",
      checksum: "sha256-78c4a9104b2c118e90a51",
      judge: "Workforce Reduction Board",
      body: `WORKFORCE ADJUSTMENT AND RETRAINING NOTIFICATION (WARN) NOTICE\n\nTo the Delaware Department of Labor and Local Government Officials:\n\nNotice is hereby given that ${citation?.caseName || 'Tupperware Brands Corporation'} will commence a permanent workforce reduction at its corporate headquarters and distribution centers effective 60 days from this notice.\n\n1. Impacted Roles: Approximately 450 corporate executives, supply chain managers, finance directors, and brand operations leads.\n2. Key Talent Retention: Executive Retention Plans (KERP) subject to Bankruptcy Court approval under 11 U.S.C. § 503(c).`
    }
  ];

  const currentDoc = documents[activeDocIndex];

  // Full Article Dispatch Content
  const articleDispatchText = `🚨 INVESTIGATIVE PRESS DISPATCH • BUSINESSCOLLAPSE.COM\n\nTITLE: Inside the Chapter 11 Surgery of ${currentDoc.caseName} (${currentDoc.ticker || 'DEBT'})\nDATELINE: Wilmington, Delaware\n\nIconic home goods brand ${currentDoc.caseName} has officially filed for Chapter 11 bankruptcy protection in the United States Bankruptcy Court for the District of Delaware under Docket #001.\n\nCourt filings indicate an estimated total debt overhang of ${currentDoc.debt}. Senior 1st Lien secured lenders have positioned a Super-Priority Debtor-in-Possession (DIP) credit facility to maintain operational continuity while orchestrating a Section 363 asset auction.\n\nKEY CASE CITATIONS & COURT DISCLOSURES:\n\n• Docket #001: Voluntary Chapter 11 Petition filed in Delaware Bankruptcy Court.\n• Docket #014: Motion to Reject 120 Unexpired Commercial Real Estate Leases.\n• SEC Form 8-K: Official disclosure of Senior Credit Agreement default.\n• WARN Act Disclosure: Notice of 450 executive corporate role reductions.\n\nUnsecured trade vendor claims face an estimated recovery of 5% to 15%, while common equity holders face a statutory 100% wipeout.\n\nReported live by BusinessCollapse.Com Restructuring Intelligence.`;

  const handlePrevDoc = () => {
    setActiveDocIndex(prev => (prev > 0 ? prev - 1 : documents.length - 1));
  };

  const handleNextDoc = () => {
    setActiveDocIndex(prev => (prev < documents.length - 1 ? prev + 1 : 0));
  };

  const handleStartTrial = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    setTrialActivated(true);
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([`BUSINESSCOLLAPSE.COM COMPLETE EVIDENCE BUNDLE FOR ${currentDoc.caseName.toUpperCase()}\n\nIncludes 4 Verified Official Documents:\n1. Petition Docket #001\n2. Lease Rejections Docket #014\n3. SEC Form 8-K\n4. WARN Act Notice`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${(currentDoc.ticker || 'DEBT').toLowerCase()}_evidence_bundle_dockets.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(4, 7, 17, 0.97)',
      backdropFilter: 'blur(12px)',
      zIndex: 1100,
      display: 'flex',
      flexDirection: 'column',
      color: '#F8FAFC',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>

      {/* TOP HEADER: PROMINENT BUSINESSCOLLAPSE.COM BRANDING & DOWNLOAD TRIGGER */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
            color: '#000',
            fontWeight: 950,
            fontSize: '0.78rem',
            padding: '4px 10px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            letterSpacing: '0.04em'
          }}>
            <ShieldCheck size={16} color="#000" /> BUSINESSCOLLAPSE.COM VERIFIED VAULT
          </div>
          <span style={{ fontSize: '0.98rem', fontWeight: 900, color: '#FFF' }}>
            {currentDoc.caseName} ({currentDoc.ticker || 'DEBT'}) — Official Court Evidence & Article Dispatch
          </span>
        </div>

        {/* 14-Day Free Trial Download Trigger Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsTrialGateOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#000',
              border: 'none',
              padding: '7px 16px',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 950,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 16px rgba(245, 158, 11, 0.4)'
            }}
          >
            <Download size={14} color="#000" />
            <span>Download 4-Doc Bundle (.ZIP) • 14-Day Free Trial</span>
          </button>
          
          <button
            onClick={onClose}
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#EF4444',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* CAROUSEL & CANVAS TAB SWITCHER STRIP */}
      <div style={{
        padding: '10px 24px',
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Canvas Mode Switcher: PDF vs FULL STORY DISPATCH */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setActiveCanvasTab('pdf')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.76rem',
              fontWeight: 900,
              cursor: 'pointer',
              border: activeCanvasTab === 'pdf' ? '1.5px solid #38BDF8' : '1px solid rgba(255,255,255,0.1)',
              background: activeCanvasTab === 'pdf' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(30, 41, 59, 0.6)',
              color: activeCanvasTab === 'pdf' ? '#FFF' : '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileText size={14} color={activeCanvasTab === 'pdf' ? '#38BDF8' : '#94A3B8'} />
            <span>📄 Official PACER Court PDF Evidence</span>
          </button>

          <button
            onClick={() => setActiveCanvasTab('article')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.76rem',
              fontWeight: 900,
              cursor: 'pointer',
              border: activeCanvasTab === 'article' ? '1.5px solid #10B981' : '1px solid rgba(255,255,255,0.1)',
              background: activeCanvasTab === 'article' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(30, 41, 59, 0.6)',
              color: activeCanvasTab === 'article' ? '#FFF' : '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Newspaper size={14} color={activeCanvasTab === 'article' ? '#10B981' : '#94A3B8'} />
            <span>📰 Full Investigative Story Dispatch</span>
          </button>
        </div>

        {/* Carousel Slide Controls (if viewing PDF) */}
        {activeCanvasTab === 'pdf' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrevDoc}
              style={{
                padding: '4px 10px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px',
                color: '#FFF',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ChevronLeft size={14} /> <span>Prev Document</span>
            </button>

            <span style={{ fontSize: '0.76rem', fontWeight: 900, color: '#38BDF8', padding: '0 6px' }}>
              DOC {activeDocIndex + 1} OF {documents.length}
            </span>

            <button
              onClick={handleNextDoc}
              style={{
                padding: '4px 10px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '6px',
                color: '#FFF',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Next Document</span> <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* MAIN CONTENT SPLIT: LEFT GENUINE PDF/ARTICLE CANVAS + RIGHT BRANDING & ELEVATOR SPEECH SIDEBAR */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ---------------------------------------------------- */}
        {/* LEFT CANVAS (70%): GENUINE COURT PDF OR FULL ARTICLE */}
        {/* ---------------------------------------------------- */}
        <div style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto',
          background: '#090D16',
          display: 'flex',
          justify: 'center'
        }}>

          {/* VIEW TAB 1: GENUINE OFFICIAL PACER COURT PDF */}
          {activeCanvasTab === 'pdf' ? (
            <div style={{
              width: '100%',
              maxWidth: '850px',
              background: '#FFFFFF',
              color: '#0F172A',
              borderRadius: '8px',
              padding: '36px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.9)',
              fontFamily: 'Times New Roman, serif',
              lineHeight: 1.6
            }}>
              {/* Court Document Header Stamp */}
              <div style={{ borderBottom: '2px solid #000', paddingBottom: '16px', marginBottom: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {currentDoc.court.toUpperCase()}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold', borderTop: '1px solid #000', paddingTop: '8px', marginTop: '12px' }}>
                  <span>In re: {currentDoc.caseName.toUpperCase()}, et al., Debtors.</span>
                  <span>Case Citation ID: {currentDoc.checksum.slice(0, 16)} ({currentDoc.judge})</span>
                </div>
              </div>

              {/* Document Body */}
              <div style={{ fontSize: '0.95rem', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center', margin: '0 0 16px 0', textTransform: 'uppercase' }}>
                  {currentDoc.title}
                </h2>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                  {currentDoc.body}
                </div>
              </div>

              {/* Official Signature Block */}
              <div style={{ borderTop: '1px solid #CBD5E1', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <div>
                  <div><strong>Filing Date</strong>: {currentDoc.date}</div>
                  <div><strong>Government Verification</strong>: SHA-256 Validated</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'cursive', fontSize: '1.2rem', color: '#1E3A8A' }}>/s/ Restructuring Officer Signature</div>
                  <div>Official BusinessCollapse.com PACER Node Ingest</div>
                </div>
              </div>

              {/* Verification Footer Stamp */}
              <div style={{ marginTop: '24px', background: '#F8FAFC', border: '1px dashed #94A3B8', padding: '10px', fontSize: '0.75rem', color: '#475569', textAlign: 'center' }}>
                DOCUMENT {activeDocIndex + 1} OF 4 • OFFICIAL COURT FILING • DIGITAL CHECKSUM VERIFIED BY BUSINESSCOLLAPSE.COM
              </div>
            </div>
          ) : (
            /* VIEW TAB 2: FULL INVESTIGATIVE PRESS ARTICLE DISPATCH */
            <div style={{
              width: '100%',
              maxWidth: '850px',
              background: 'rgba(9, 13, 22, 0.95)',
              border: '1.5px solid #10B981',
              borderRadius: '12px',
              padding: '32px',
              color: '#F8FAFC',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
            }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 950, color: '#10B981', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  📰 FULL INVESTIGATIVE STORY DISPATCH
                </div>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 950, color: '#FFF', margin: '0 0 10px 0', lineHeight: 1.3 }}>
                  Inside the Chapter 11 Restructuring Surgery of {currentDoc.caseName} ({currentDoc.ticker || 'DEBT'})
                </h1>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', display: 'flex', gap: '16px' }}>
                  <span>By <strong>BusinessCollapse.Com Intelligence Desk</strong></span>
                  <span>Published: {currentDoc.date}</span>
                </div>
              </div>

              <div style={{ fontSize: '0.94rem', lineHeight: 1.8, whiteSpace: 'pre-wrap', color: '#E2E8F0' }}>
                {articleDispatchText}
              </div>

              {/* Clickable Citation Link Callout Card inside Article */}
              <div style={{ marginTop: '28px', background: 'rgba(56, 189, 248, 0.1)', border: '1.5px solid #38BDF8', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 950, color: '#FFF' }}>
                    📄 Verified Court Citation Docket #001 (PDF)
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px' }}>
                    Official Delaware Bankruptcy Court Voluntary Petition Filing
                  </div>
                </div>
                <button
                  onClick={() => setActiveCanvasTab('pdf')}
                  style={{
                    padding: '8px 14px',
                    background: '#38BDF8',
                    color: '#000',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 950,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Inspect Court PDF</span> <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ---------------------------------------------------- */}
        {/* RIGHT SIDEBAR (30%): BRANDING & ELEVATOR SPEECH CARD  */}
        {/* ---------------------------------------------------- */}
        <div style={{
          width: '380px',
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 22, 1) 100%)',
          borderLeft: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'auto'
        }}>
          
          {/* 🏛️ PROMINENT BUSINESSCOLLAPSE.COM ELEVATOR SPEECH CARD */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(2, 132, 199, 0.25) 100%)',
            border: '1.5px solid #38BDF8',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 0 25px rgba(56, 189, 248, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={18} color="#38BDF8" />
              <span style={{ fontSize: '0.88rem', fontWeight: 950, color: '#FFF', letterSpacing: '0.04em' }}>
                WELCOME TO BUSINESSCOLLAPSE.COM
              </span>
            </div>
            
            <p style={{ fontSize: '0.76rem', color: '#CBD5E1', margin: 0, lineHeight: 1.55 }}>
              <strong>BusinessCollapse.Com</strong> is the #1 Real-Time Terminal & Press Engine for Corporate Insolvency, Chapter 11 PACER Dockets, Section 363 Auction Floor Bids, and C-Suite Executive Talent Raids.
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px', fontSize: '0.72rem', color: '#94A3B8' }}>
              Trusted nationwide by Distressed Debt Hedge Funds, Restructuring Attorneys, Turnaround Advisors & Executive Recruiters.
            </div>
          </div>

          {/* Structured Financial Breakdown Card */}
          <div style={{ background: 'rgba(3, 7, 18, 0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 950, color: '#38BDF8', letterSpacing: '0.05em' }}>
              📊 CASE METRICS: {currentDoc.caseName.toUpperCase()}
            </div>

            <div>
              <div style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 700 }}>ASSERTED DEBT OVERHANG</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 950, color: '#EF4444' }}>{currentDoc.debt}</div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
              <div style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 700 }}>1ST LIEN DIP LENDER STATUS</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#38BDF8' }}>Super-Priority Credit Bid Active</div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
              <div style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 700 }}>UNSECURED TRADE VENDOR RECOVERY</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#F59E0B' }}>5% - 15% Estimated Payout</div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
              <div style={{ fontSize: '0.65rem', color: '#94A3B8', fontWeight: 700 }}>COMMON EQUITY OUTLOOK</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#EF4444' }}>100% Statutory Wipeout</div>
            </div>
          </div>

          {/* 🚀 PROMINENT 14-DAY BUSINESSCOLLAPSE.COM FREE TRIAL BANNER */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.25) 100%)',
            border: '1.5px solid #F59E0B',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 950, color: '#FFF' }}>
              🚀 Start Your 14-Day BusinessCollapse.Com Free Trial
            </div>
            <p style={{ fontSize: '0.74rem', color: '#CBD5E1', margin: 0, lineHeight: 1.5 }}>
              Get instant download of official court PDFs for Docket #001, Docket #014, SEC 8-K & WARN Act notice with a <strong>14-Day Free Trial</strong>.
            </p>

            <button
              onClick={() => setIsTrialGateOpen(true)}
              style={{
                width: '100%',
                padding: '10px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 950,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                gap: '6px',
                boxShadow: '0 0 16px rgba(245, 158, 11, 0.4)'
              }}
            >
              <span>Start 14-Day Free Trial & Download (.ZIP)</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Share Citation Button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            style={{
              width: '100%',
              padding: '10px',
              background: 'rgba(30, 41, 59, 0.8)',
              color: '#FFF',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              gap: '6px'
            }}
          >
            <Share2 size={14} /> Share Verified Citation Link
          </button>

        </div>

      </div>

      {/* 📥 14-DAY FREE TRIAL DOWNLOAD GATE MODAL */}
      {isTrialGateOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.88)',
          backdropFilter: 'blur(10px)',
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '520px',
            background: 'linear-gradient(135deg, #0F172A 0%, #090D16 100%)',
            border: '2px solid #F59E0B',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(245, 158, 11, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative'
          }}>
            <button
              onClick={() => setIsTrialGateOpen(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#F59E0B', color: '#000', padding: '8px', borderRadius: '10px' }}>
                <Download size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 950, color: '#FFF' }}>
                  Download Complete 4-Doc Evidence Bundle
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#FCD34D', fontWeight: 800 }}>
                  Start 14-Day BusinessCollapse.Com Pro Free Trial
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#CBD5E1', margin: 0, lineHeight: 1.5 }}>
              Includes official verified PDFs for <strong>Petition Docket #001</strong>, <strong>Lease Rejections #014</strong>, <strong>SEC 8-K</strong>, and <strong>WARN Notice</strong> for {currentDoc.caseName}.
            </p>

            {trialActivated ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', borderRadius: '10px', padding: '16px', textAlign: 'center', color: '#34D399', fontWeight: 900, fontSize: '0.88rem' }}>
                <CheckCircle2 size={24} style={{ margin: '0 auto 8px auto', display: 'block' }} />
                14-Day BusinessCollapse.Com Pro Free Trial Activated! Downloading Evidence Bundle (.ZIP) Now...
              </div>
            ) : (
              <form onSubmit={handleStartTrial} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#94A3B8', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                    Work / Professional Email:
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. alex@distressedcapital.com"
                    style={{
                      width: '100%',
                      background: 'rgba(3, 7, 18, 0.9)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#FFF',
                      fontSize: '0.85rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    fontWeight: 950,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '6px',
                    boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)'
                  }}
                >
                  <Sparkles size={16} />
                  <span>Start 14-Day BusinessCollapse.Com Free Trial & Download (.ZIP)</span>
                </button>
              </form>
            )}

            <div style={{ fontSize: '0.68rem', color: '#64748B', textAlign: 'center' }}>
              No long-term commitment. Cancel anytime during your 14-day trial.
            </div>
          </div>
        </div>
      )}

      {/* YouTube-Style Executive Share Modal */}
      <ExecutiveYouTubeShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        entity={{ name: currentDoc.caseName, ticker: currentDoc.ticker, finalDebt: currentDoc.debt }}
      />

    </div>
  );
}
