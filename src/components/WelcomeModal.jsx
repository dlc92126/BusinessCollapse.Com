import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Scale, FileText, Zap, Radio, Bell, ArrowRight, X, ChevronRight, Bot, Building2, Gavel, Cpu, Layers, HardHat, TrendingUp, Shield, Newspaper, Check, Copy } from 'lucide-react';

export default function WelcomeModal({ isOpen, onClose, onOpenFaq, onOpenOnboarding, onOpenMasterAiPrompt }) {
  const [selectedProfession, setSelectedProfession] = useState('liquidator');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!isOpen) return null;

  const professions = [
    {
      id: 'liquidator',
      title: '🔨 Equipment Liquidator & Heavy Machinery Auctioneer',
      bespokeTitle: 'Equipment Liquidator Tactical Hustle Playbook',
      color: '#EC4899',
      grittyPlaybook: 'Target Section 363 sale motions and Subchapter V asset liquidations within 12 hours of filing. Snag CNC stamping presses, Peterbilt fleet trucks, stainless kitchen fryers, and medical MRI machinery for 20-30 cents on the dollar before regional liquidator syndicates even spot the PACER notice.',
      strikeVectors: [
        '363 STALKING-HORSE CREDIT-BID AMBUSH: Lock down CNC stamping presses, Peterbilt fleet trucks, and MRI machines at 20-30 cents on the dollar within 12 hours of filing before regional liquidators open PACER.',
        'SUBCHAPTER V INVENTORY LIQUIDATION BLITZ: Target Subchapter V small-business liquidations where court-appointed trustees want fast cash disbursement to satisfy equipment lenders without drawn-out hearings.',
        'WEBCAST PIN & LIVE INTERCEPT: Register for official 363 court webcast auction PINs on Day 1. Deploy stalking-horse credit bids to set low reserve prices that scare off casual buyers.'
      ],
      weapons: [
        '11 U.S.C. § 363(b): Emergency Asset Sale Motions',
        '11 U.S.C. § 363(f): Free & Clear Title Carveouts (Strip All Liens)',
        '363 Auction Webcast PIN & Live Credit-Bidding Portal'
      ],
      terminalMoves: [
        'Open 🔨 363 MARKETPLACE or 🏬 SUB-$10M RADAR workstation.',
        'Filter by Asset Category (FLEET_TRUCKS, KITCHEN_EQUIPMENT, HEAVY_MACHINERY, MEDICAL_MACHINERY).',
        'Inspect Section 363 auction dates & stalking-horse credit bids.',
        'Generate 1-Click AI Diligence Brief PDF & register for webcast PINs.'
      ]
    },
    {
      id: 'investor',
      title: '📈 Distressed Debt Investor & Special Situations PE',
      bespokeTitle: 'Distressed Debt Investor Tactical Hustle Playbook',
      color: '#10B981',
      grittyPlaybook: 'Surveil capital stack break lines, 1st lien senior debt maturity walls, and DIP financing super-priority carveouts. Identify high-yield DIP loan opportunities at SOFR + 7% or position yourself to credit-bid and take control of operating assets at a deep discount.',
      strikeVectors: [
        'FULCRUM SECURITY DEBT-TO-EQUITY CONVERSION: Target the exact tranche where enterprise value breaks (e.g. 2nd Lien Notes trading at 35c on the dollar). Accumulate blocking positions to convert debt into 100% equity.',
        'MATURITY WALL REFINANCING TRAP: Identify companies approaching senior debt maturity walls with negative EBITDA. Offer restructuring capital or credit-bid at the bankruptcy threshold to seize cash-flowing operating divisions.',
        'SUPER-PRIORITY LOAN PRIMING: Prime existing senior lenders by providing emergency capital carveouts that jump straight to the top of the recovery waterfall.'
      ],
      weapons: [
        '11 U.S.C. § 364(d): Super-Priority Priming DIP Liens',
        '11 U.S.C. § 1126: Plan Voting Lockup & Blocking Position',
        '11 U.S.C. § 1129(b): Non-Consensual Plan Cramdown'
      ],
      terminalMoves: [
        'Open 📈 INVESTOR TERMINAL & filter by 🏦 INSTITUTIONAL +$10M.',
        'Inspect Capital Stack Waterfall & DIP Financing Monitor (Super-priority liens & weekly cash burn).',
        'Analyze pre-petition WARN layoffs & bond defaults on 🔥 LIVE DISTRESS WIRE.',
        'Model recovery scenarios using the 363 Diligence Sandbox.'
      ]
    },
    {
      id: 'attorney',
      title: '⚖️ Restructuring Attorney & Insolvency Counsel',
      bespokeTitle: 'Restructuring Attorney Tactical Hustle Playbook',
      color: '#8B5CF6',
      grittyPlaybook: 'Identify C-suite resignations, WARN notices, and bond defaults 90-180 days prior to Chapter 11 petitions. Beat rival law firms to pitch unsecured creditor committee (UCC) representation and Section 365 lease cramdown counsel.',
      strikeVectors: [
        'PRE-PETITION C-SUITE RETAINER LOCK: Detect executive exoduses and WARN Act leaks 90-180 days prior to Chapter 11. Pitch debtor representation and secure pre-petition retainers before rival restructuring law firms catch wind.',
        'UCC UNSECURED CREDITOR COMMITTEE LEAD GEN: Extract the Top-20 Unsecured Creditor Matrix on Day 1 of filing. Contact major trade vendors and pitch lead counsel representation for the official creditors committee.',
        'SECTION 365 LEASE & CONTRACT CRAMDOWN: Advise corporate debtors on rejecting toxic commercial leases and burdensome supply contracts under Section 365, forcing landlords and vendors to accept pennies on the dollar.'
      ],
      weapons: [
        '11 U.S.C. § 1102: Official Unsecured Creditors Committee (UCC)',
        '11 U.S.C. § 365: Executory Contract & Lease Rejection Cramdown',
        '11 U.S.C. § 327: Retention of Bankruptcy Court Professionals'
      ],
      terminalMoves: [
        'Filter 🔥 LIVE DISTRESS WIRE by Pre-Judicial Leak Signals.',
        'Export Top-20 Unsecured Creditor Matrix & retained legal counsel lists.',
        'Inspect PACER initial petition dockets and Section 363 bidding procedure motions.'
      ]
    },
    {
      id: 'headhunter',
      title: '👔 Executive Headhunter & Talent Raid Recruiter',
      bespokeTitle: 'Executive Headhunter Tactical Hustle Playbook',
      color: '#F59E0B',
      grittyPlaybook: 'Raid top-tier C-suite talent, VP engineers, and sales leaders from distressed entities 60-120 days prior to filing. Poach elite teams before WARN Act layoff notices go public or equity retention packages expire.',
      strikeVectors: [
        'PRE-WARN ACT C-SUITE TALENT RAID: Identify executive resignations and WARN Act layoff notices 60-120 days prior to filing. Poach elite Chief Revenue Officers, VP Engineers, and top sales reps before news goes public.',
        'RETENTION PACKAGE (KERP) BYPASS: Strike when equity retention packages and executive bonuses get frozen or voided by bankruptcy court order. Offer displaced leaders immediate lateral placements at healthy competitors.',
        'DEPARTMENTAL TEAM SWEEP: Lift entire high-performing product, sales, or engineering units in a single sweep while corporate leadership is paralyzed in restructuring meetings.'
      ],
      weapons: [
        '29 U.S.C. § 2101: WARN Act 60-Day Disclosures',
        '11 U.S.C. § 503(c): Key Employee Retention (KERP) Restrictions',
        'Executive Talent Raid Roster & Contact Ingestion'
      ],
      terminalMoves: [
        'Open 👔 EXECUTIVE TALENT RAID RADAR workstation.',
        'Filter state WARN Act layoff notices & executive resignation alerts.',
        'Extract displaced executive rosters & key department lead contact lists.'
      ]
    },
    {
      id: 'conquest',
      title: '🎯 Sales Conquest & Competitor Client Snatcher',
      bespokeTitle: 'Sales Conquest Tactical Hustle Playbook',
      color: '#EF4444',
      grittyPlaybook: 'Poach enterprise client contracts, vendor accounts, and market share from failing competitors while their operations freeze in Chapter 11 bankruptcy or court receivership.',
      strikeVectors: [
        'CUSTOMER CHURN HIJACK: Identify failing competitors entering Chapter 11 or receivership. Contact their enterprise clients while their customer support freezes, offering seamless contract migration.',
        'SUPPLY CHAIN VENDOR DEFECTION: Intercept vendors who have stopped receiving payments from distressed rivals. Offer cash-on-delivery or 15-day terms to absorb their inventory and market share.',
        'ABANDONED ACCOUNT PITCH: Arm your sales team with AI-generated conquest pitch scripts highlighting the operational insolvency of target rivals.'
      ],
      weapons: [
        '11 U.S.C. § 365: Contract Rejection Customer Disruption',
        'Competitor Bankruptcy Filing Feed & Account Ingestion',
        'AI Sales Conquest Script Generator'
      ],
      terminalMoves: [
        'Open 🎯 SALES CONQUEST RADAR workstation.',
        'Filter by distressed industry rivals & supply chain vendor defaults.',
        'Generate AI Sales Pitch Scripts to win over abandoned corporate accounts.'
      ]
    },
    {
      id: 'journalist',
      title: '📰 Financial Journalist & Investigative Newsroom Desk',
      bespokeTitle: 'Financial Journalist Tactical Hustle Playbook',
      color: '#38BDF8',
      grittyPlaybook: 'Break corporate collapse stories 4-12 hours before major financial wires. Access raw PACER petitions, receiver court orders, and AI post-mortem breakdowns for immediate editorial publication.',
      strikeVectors: [
        '4-HOUR BREAKING NEWS SCOOP: Monitor raw PACER RSS dockets and SEC Form 8-K filings to break major corporate bankruptcies 4-12 hours before Bloomberg, Reuters, or Wall Street Journal.',
        'PRE-PETITION C-SUITE FRAUD & LEAK INVESTIGATION: Track insider stock sales, executive resignations, and unsealed creditor complaints to uncover corporate governance scandals pre-filing.',
        'JUDICIAL DECREE VS. ALLEGATION FACT-CHECKING: Separate unverified creditor lawsuits from confirmed Judge-signed discharge decrees using BCC\'s 3-Tier Evidentiary Provenance Standard.'
      ],
      weapons: [
        'Federal Bankruptcy Court Docket RSS Wire',
        'SEC EDGAR Form 8-K / 10-K Live Feed Ingestion',
        'BCC 3-Tier Evidentiary Provenance Verification Standard'
      ],
      terminalMoves: [
        'Open 📰 MEDIA & PRESS WORKSTATION.',
        'Launch AI Newsroom Studio to generate AP/Bloomberg-style wire stories from court filings.',
        'Copy verified citation footers for immediate publication.'
      ]
    },
    {
      id: 'landlord',
      title: '🏢 Commercial Real Estate Landlord & CRE Broker',
      bespokeTitle: 'CRE Landlord Tactical Hustle Playbook',
      color: '#A855F7',
      grittyPlaybook: 'Detect commercial tenant lease default notices and Subchapter V Section 365 lease rejection motions on day 1. Re-tenant high-street retail or suburban shopping centers before 90-day rent defaults hit your property P&L.',
      strikeVectors: [
        'DAY 1 LEASE REJECTION COUNTER-STRIKE: Detect tenant lease default notices and Subchapter V Section 365 lease rejection motions on Day 1. Start re-tenanting property before 90-day rent defaults hit P&L.',
        '120-DAY COMMERCIAL LEASE DEADLINE LOCKUP: Enforce the strict 120-day statutory deadline under 11 U.S.C. § 365(d)(4) forcing bankrupt tenants to assume and pay full rent or surrender premises immediately.',
        'STALKING-HORSE LEASE ASSIGNMENT AUCTION: Intercept 363 lease assignment motions to approve strong replacement anchor tenants and capture lease assignment premiums.'
      ],
      weapons: [
        '11 U.S.C. § 365(d)(4): Strict 120-Day Commercial Lease Assumption/Rejection',
        '11 U.S.C. § 365(b): Adequate Assurance of Future Performance Defense',
        'Subchapter V Real Estate Lease Default Monitor'
      ],
      terminalMoves: [
        'Open 🏬 SUB-$10M RADAR & filter by State (TX, FL, CA, NY, OK).',
        'Filter by 🏢 CRE & Retail sector.',
        'Inspect 363 Stalking-Horse bids & real estate lease rejection motions.'
      ]
    },
    {
      id: 'creditor',
      title: '🛡️ Trade Creditor & Claims Purchaser',
      bespokeTitle: 'Trade Creditor Tactical Hustle Playbook',
      color: '#EAB308',
      grittyPlaybook: 'Defend your vendor receivables against 90-day preference clawback lawsuits or sell uncollateralized trade claims for immediate cash before 11 U.S.C. § 502 objections hit the court docket.',
      strikeVectors: [
        '503(b)(9) 100% CASH PRIORITY RECOVERY: File 20-day administrative priority claims under 11 U.S.C. § 503(b)(9) for goods delivered immediately prior to filing, locking in 100c on the dollar cash recovery ahead of general trade claims.',
        '90-DAY PREFERENCE CLAWBACK SHIELD: Defend past vendor invoice payments against aggressive 90-day preference clawback lawsuits using Ordinary Course of Business and New Value statutory defenses.',
        'TRADE CLAIM CASH LIQUIDATION: Sell uncollateralized trade receivables to claim purchasing funds for instant cash liquidity before lengthy court objections reduce recovery values.'
      ],
      weapons: [
        '11 U.S.C. § 503(b)(9): 20-Day Administrative Cash Priority Claim',
        '11 U.S.C. § 547(c): Statutory Ordinary Course Preference Defense',
        'Official Form 410 Proof of Claim Generator Wizard'
      ],
      terminalMoves: [
        'Open 🛡️ CREDITOR ACTION WORKSTATION.',
        'Launch Form 410 Official Proof of Claim Wizard.',
        'Check bar dates & 20-day 503(b)(9) administrative priority claim deadlines.'
      ]
    },
    {
      id: 'diplender',
      title: '🏦 DIP Lender & Emergency Capital Provider',
      bespokeTitle: 'DIP Lender Tactical Hustle Playbook',
      color: '#06B6D4',
      grittyPlaybook: 'Structure Debtor-in-Possession (DIP) emergency financing lines with 1st lien super-priority status and cash collateral carveouts. Lock in SOFR + 6.50%-8.50% yields while maintaining priming lien protection.',
      strikeVectors: [
        'SUPER-PRIORITY PRIMING LIEN LOCK: Structure Debtor-in-Possession (DIP) emergency financing lines with 1st lien super-priority status that prime pre-petition lenders and guarantee full repayment.',
        'SOFR + 8.50% YIELD & CARVEOUT EXTRACTION: Capture high-yield interest rates, upfront arrangement fees, and strict cash collateral carveouts while maintaining emergency court protection.',
        'ROLL-UP CREDIT BID LIQUIDATION SHIELD: Roll pre-petition debt into DIP financing lines and use credit-bidding power under Section 363(k) to acquire target assets at a steep discount if reorganization fails.'
      ],
      weapons: [
        '11 U.S.C. § 364(c) & (d): Priming Super-Priority DIP Liens',
        '11 U.S.C. § 363(k): Stalking-Horse Credit Bidding Rights',
        'DIP Financing Cash Collateral Escrow Monitor'
      ],
      terminalMoves: [
        'Open 📈 INVESTOR TERMINAL & DIP Financing Monitor.',
        'Inspect cash runway countdowns & weekly cash burn schedules.',
        'Analyze super-priority liens & cash collateral escrow requirements.'
      ]
    },
    {
      id: 'turnaround',
      title: '📊 Turnaround CRO & Restructuring Advisory Consultant',
      bespokeTitle: 'Turnaround Advisor Tactical Hustle Playbook',
      color: '#6366F1',
      grittyPlaybook: 'Deploy Chief Restructuring Officers (CROs) and financial advisors to distressed middle-market enterprises needing operational turnarounds, 13-week cash forecasts, or Section 363 sale prep.',
      strikeVectors: [
        '13-WEEK CASH FORECAST EMERGENCY INTERVENTION: Step in as Chief Restructuring Officer (CRO) when middle-market companies face zero liquidity. Implement emergency 13-week cash burn controls and vendor payment freezes.',
        'SUBCHAPTER V PLAN CONFIRMATION BLITZ: Guide small business debtors through expedited Subchapter V reorganizations, confirming 3 to 5-year debt payout plans without creditor committee consent.',
        'PRE-PACKAGED CHAPTER 11 BOARD ADVISORY: Pitch pre-packaged Chapter 11 plans to distressed corporate boards 90 days pre-filing to compress bankruptcy duration from 18 months down to 45 days.'
      ],
      weapons: [
        '11 U.S.C. § 1183: Subchapter V Expedited Trustee Rules',
        '11 U.S.C. § 1125: Pre-Packaged Disclosure Statement Approval',
        '13-Week Cash Flow Emergency Forecasting Engine'
      ],
      terminalMoves: [
        'Monitor pre-judicial Warn notices & balance sheet distress signals.',
        'Inspect capital stack break lines & liquidity runway days.',
        'Export restructuring briefs for client pitches & board presentations.'
      ]
    }
  ];

  const currentProf = professions.find(p => p.id === selectedProfession) || professions[0];

  const handleCopyPrompt = () => {
    const text = `================================================================================
⚡ ${currentProf.bespokeTitle.toUpperCase()}
SOURCE COCKPIT: BUSINESSCOLLAPSE.COM (BCC) DISTRESS TERMINAL
================================================================================

--------------------------------------------------------------------------------
1. THE UNFAIR ADVANTAGE & ARMS RACE WARNING
--------------------------------------------------------------------------------
"${currentProf.grittyPlaybook}"

THIS IS AN ARMS RACE. In corporate restructuring and distress dealmaking, second place gets zero. 

If you are using BusinessCollapse.com, you hold a 48 to 120-hour unfair advantage over every traditional firm in your market. While your competitors wait for slow news wires or public court notices, this cockpit feeds you pre-docket WARN Act leaks, executive exoduses, Subchapter V distress signals, and Section 363 liquidation auctions in real time. 

MAKE NO MISTAKE: IF YOU DO NOT SUBSCRIBE TO THIS COCKPIT... YOUR COMPETITORS WILL. AND THEY WILL HUNT IN YOUR TERRITORY WHILE YOU ARE BLIND.

--------------------------------------------------------------------------------
2. BESPOKE STRIKE VECTORS FOR ${currentProf.title.toUpperCase()}
--------------------------------------------------------------------------------
${currentProf.strikeVectors.map((v, idx) => `⚡ STRIKE VECTOR ${idx + 1}: ${v}`).join('\n\n')}

--------------------------------------------------------------------------------
3. WAR-ROOM STATUTORY WEAPONS & COCKPIT TOOLS
--------------------------------------------------------------------------------
${currentProf.weapons.map((w, idx) => `• ${w}`).join('\n')}

--------------------------------------------------------------------------------
4. TERMINAL EXECUTION SEQUENCE ON BUSINESSCOLLAPSE.COM
--------------------------------------------------------------------------------
${currentProf.terminalMoves.map((m, idx) => `STEP ${idx + 1}: ${m}`).join('\n')}

--------------------------------------------------------------------------------
5. BATTLE-TESTED CONQUEST OUTREACH SCRIPT
--------------------------------------------------------------------------------
"Subject: Urgent: Pre-Docket Opportunity re: [Target Company Name]

We are tracking [Target Company Name] in real time via BusinessCollapse.com. Based on capital stack break lines and Section 363 auction timelines, there is a narrow 72-hour window to execute [Insert Specific Goal] before court lockup.

Our desk is prepared to deploy immediate capital and execution capacity today. Let's schedule a 5-minute war-room briefing before your competitors catch wind of this filing."

================================================================================
Generated via BusinessCollapse.com Executive Cockpit Terminal
================================================================================`;

    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 999999, position: 'fixed', inset: 0, background: 'rgba(5, 8, 14, 0.90)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '860px', width: '100%', padding: '0', maxHeight: '90vh', overflowY: 'auto', border: '2px solid rgba(255, 42, 75, 0.5)', boxShadow: '0 25px 70px rgba(0,0,0,0.95)' }}>
        
        {/* Modal Header with Official Logo */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(135deg, rgba(40, 10, 18, 0.98) 0%, rgba(15, 23, 42, 0.95) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
          <div>
            {/* Prominent Official Brand Logo */}
            <div style={{ marginBottom: '14px', background: '#090D16', border: '2px solid #EF4444', borderRadius: '10px', padding: '6px 14px', display: 'inline-block', boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}>
              <img 
                src="/logo_wide_official.png" 
                alt="BusinessCollapse.com Official Logo" 
                style={{ height: '54px', objectFit: 'contain', display: 'block' }} 
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span style={{ background: '#EF4444', color: '#FFF', fontSize: '0.72rem', fontWeight: 950, padding: '3px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.08em', boxShadow: '0 0 10px rgba(239, 68, 68, 0.4)' }}>
                ⚡ OFFICIAL INTELLIGENCE WIRE
              </span>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 800, background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.35)' }}>
                ✓ Live Institutional Terminal
              </span>
            </div>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 950, color: '#FFF', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
              Your Command Center for Corporate Bankruptcy Filings, Debt Restructuring & Asset Auctions
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#94A3B8', marginTop: '8px', lineHeight: 1.55 }}>
              Surveilling enterprise Chapter 11 mega-cases, Subchapter V small-business reorganizations, Section 363 liquidation auctions, and pre-petition WARN Act leaks across all 50 U.S. States & Territories.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#FFF', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <X size={20} />
          </button>
        </div>

        {/* PROFESSION SELECTOR & TACTICAL PLAYBOOK SECTION INSIDE WELCOME BRIEF */}
        <div style={{ padding: '24px 32px 0 32px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)',
            border: `2px solid ${currentProf.color}`,
            borderRadius: '14px',
            padding: '22px 26px',
            boxShadow: `0 0 24px ${currentProf.color}30`
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 950, color: currentProf.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color={currentProf.color} /> SELECT YOUR PROFESSION TO UNLOCK TACTICAL PLAYBOOK:
            </div>

            {/* Profession Dropdown Selector */}
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '9px',
                background: '#090D16',
                border: `2px solid ${currentProf.color}`,
                color: '#FFFFFF',
                fontSize: '0.96rem',
                fontWeight: 950,
                outline: 'none',
                cursor: 'pointer',
                marginBottom: '16px',
                boxShadow: `0 0 16px ${currentProf.color}40`
              }}
            >
              {professions.map(p => (
                <option key={p.id} value={p.id} style={{ background: '#0F172A', color: '#FFF' }}>
                  {p.title}
                </option>
              ))}
            </select>

            {/* Semi-Gritty Playbook Body */}
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '14px 18px', borderRadius: '10px', borderLeft: `4px solid ${currentProf.color}`, marginBottom: '14px' }}>
              <div style={{ fontSize: '0.80rem', fontWeight: 950, color: currentProf.color, textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.04em' }}>
                ⚡ TACTICAL HUSTLE PLAYBOOK:
              </div>
              <p style={{ fontSize: '0.88rem', color: '#F1F5F9', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                "{currentProf.grittyPlaybook}"
              </p>
            </div>

            {/* Terminal Moves */}
            <div style={{ fontSize: '0.78rem', fontWeight: 950, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
              🚀 HOW TO EXECUTE IN BUSINESSCOLLAPSE.COM:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              {currentProf.terminalMoves.map((move, idx) => (
                <div key={idx} style={{ fontSize: '0.82rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: currentProf.color, fontWeight: 950 }}>Step {idx + 1}:</span> {move}
                </div>
              ))}
            </div>

            {/* Quick Action Bar inside Welcome Brief */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenMasterAiPrompt) onOpenMasterAiPrompt();
                }}
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                  color: '#FFF',
                  border: 'none',
                  padding: '11px 20px',
                  borderRadius: '9px',
                  fontSize: '0.86rem',
                  fontWeight: 950,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 18px rgba(124, 58, 237, 0.45)'
                }}
              >
                <Bot size={16} /> 🤖 Launch AI Concierge Prompt Pack →
              </button>

              <button
                onClick={handleCopyPrompt}
                style={{
                  background: `linear-gradient(135deg, ${currentProf.color}45 0%, ${currentProf.color}20 100%)`,
                  color: '#FFF',
                  border: `1.5px solid ${currentProf.color}`,
                  padding: '11px 20px',
                  borderRadius: '9px',
                  fontSize: '0.86rem',
                  fontWeight: 950,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {copiedPrompt ? <Check size={16} /> : <Copy size={16} />}
                {copiedPrompt ? '✅ Playbook Copied!' : '📋 Copy Profession Playbook'}
              </button>
            </div>
          </div>
        </div>

        {/* SLEEK COMPACT MEMBERSHIP TIER COMPARISON REGIME BAR */}
        <div style={{ padding: '24px 32px 28px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 950, color: '#FCD34D', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>⚡ TERMINAL MEMBERSHIP REGIMES:</span>
            <span style={{ color: '#10B981', fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              ⭐ 100 BETA FOUNDER SPOTS OPEN (50% OFF)
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            
            {/* TIER 1: PUBLIC WIRE */}
            <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 950, color: '#FFF' }}>⚡ PUBLIC WIRE</span>
                  <span style={{ fontSize: '0.70rem', fontWeight: 800, color: '#94A3B8', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px' }}>FREE</span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94A3B8', lineHeight: 1.45 }}>
                  • 14-Day Live Wire Feed<br />
                  • Basic State & Sector Search<br />
                  • Public Post-Mortem Summaries
                </div>
              </div>
            </div>

            {/* TIER 2: PRO RADAR (MOST POPULAR) */}
            <div style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1.5px solid #C084FC', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 0 16px rgba(192, 132, 252, 0.2)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 950, color: '#C084FC' }}>💼 PRO RADAR PASS</span>
                  <span style={{ fontSize: '0.70rem', fontWeight: 900, color: '#FFF', background: '#7C3AED', padding: '2px 6px', borderRadius: '4px' }}>$199 / MO</span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#E2E8F0', lineHeight: 1.45 }}>
                  • Option B PACER RSS Feeds<br />
                  • Sub-$10M Regional Radar<br />
                  • 363 Auction Webcast PINs & SMS
                </div>
              </div>
            </div>

            {/* TIER 3: INSTITUTIONAL FIRM */}
            <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 950, color: '#FCA5A5' }}>🏛️ INSTITUTIONAL DESK</span>
                  <span style={{ fontSize: '0.70rem', fontWeight: 900, color: '#EF4444', background: 'rgba(239, 68, 68, 0.15)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>$499 / MO</span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94A3B8', lineHeight: 1.45 }}>
                  • Unlimited Multi-Seat Pass<br />
                  • Form 410 Claim Wizard<br />
                  • Raw PDF Vault & API Webhooks
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons Footer */}
        <div style={{ padding: '20px 32px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(15, 23, 42, 0.95)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => {
              onClose();
              if (onOpenFaq) onOpenFaq();
            }}
            className="btn-secondary"
            style={{ fontSize: '0.86rem', padding: '11px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ❓ Read Platform FAQ
          </button>

          <button
            onClick={() => {
              onClose();
              if (onOpenOnboarding) onOpenOnboarding();
            }}
            className="btn-primary"
            style={{ fontSize: '0.90rem', padding: '11px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            Explore VIP Membership <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
