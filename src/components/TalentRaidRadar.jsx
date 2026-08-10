import React, { useState } from 'react';
import { 
  Users, UserCheck, ShieldAlert, Zap, Search, ExternalLink, 
  Mail, Award, Lock, Sparkles, Building2, ChevronRight, 
  DollarSign, CheckCircle2, AlertTriangle, AlertCircle, FileText,
  Briefcase, Download, Filter, RefreshCw
} from 'lucide-react';

export default function TalentRaidRadar({ companies = [], onSelectCompany }) {
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [minFlightRisk, setMinFlightRisk] = useState(70);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExecutive, setSelectedExecutive] = useState(null);
  const [isGuardrailModalOpen, setIsGuardrailModalOpen] = useState(false);
  const [pendingEnrichment, setPendingEnrichment] = useState(null);
  const [userCredits, setUserCredits] = useState(150); // Default monthly credits
  const [outreachModalExecutive, setOutreachModalExecutive] = useState(null);
  const [generatedEmail, setGeneratedEmail] = useState('');

  // Sample enriched executive talent rosters for active Chapter 11 cases
  const sampleRosters = [
    {
      companyId: 'tupperware',
      companyName: 'Tupperware Brands Corporation',
      ticker: 'TUPQ',
      sector: 'Consumer & Retail',
      flightRisk: 98,
      status: 'Chapter 11 Liquidation',
      bankruptcyCourt: 'U.S. Bankruptcy Court D. Del.',
      kerpDocketNo: 'Docket #412',
      kerpRetentionBonusTotal: '$4.25 Million Total KERP Pool',
      kerpKeyTerms: 'Key executives retain 35% retention bonuses if operational milestones are maintained through Oct 31, 2026.',
      executives: [
        {
          id: 'exec-tup-1',
          name: 'David R. Swain',
          title: 'Executive Vice President, Global Supply Chain & Logistics',
          department: 'Supply Chain',
          tenure: '4.5 Years',
          flightRisk: 98,
          compensationBand: '$450K - $580K Base + KERP',
          kerpAmount: '$180,000 Bonus Lock',
          linkedInSearchQuery: 'https://www.linkedin.com/search/results/people/?keywords=David%20Swain%20Tupperware',
          booleanQuery: 'currentCompany=["Tupperware"] AND (title="Vice President" OR title="Director") AND "Supply Chain"',
          verifiedEmail: 'd.swain@tupperware.com (Enriched)',
          phone: '+1 (407) ***-8921',
          status: 'UNTOUCHED'
        },
        {
          id: 'exec-tup-2',
          name: 'Elena Rostova',
          title: 'Senior Vice President, Direct Sales Digital Platform',
          department: 'E-Commerce / Tech',
          tenure: '3.1 Years',
          flightRisk: 95,
          compensationBand: '$380K - $490K Base',
          kerpAmount: '$140,000 Bonus Lock',
          linkedInSearchQuery: 'https://www.linkedin.com/search/results/people/?keywords=Elena%20Rostova%20Tupperware',
          booleanQuery: 'currentCompany=["Tupperware"] AND (title="SVP" OR title="VP") AND "Digital"',
          verifiedEmail: null,
          phone: null,
          status: 'REQUIRES_ENRICHMENT'
        },
        {
          id: 'exec-tup-3',
          name: 'Marcus Vance',
          title: 'VP of Commercial Operations & Manufacturing Tooling',
          department: 'Manufacturing',
          tenure: '6.2 Years',
          flightRisk: 92,
          compensationBand: '$320K - $410K Base',
          kerpAmount: '$95,000 Bonus Lock',
          linkedInSearchQuery: 'https://www.linkedin.com/search/results/people/?keywords=Marcus%20Vance%20Tupperware',
          booleanQuery: 'currentCompany=["Tupperware"] AND "Operations"',
          verifiedEmail: null,
          phone: null,
          status: 'REQUIRES_ENRICHMENT'
        }
      ]
    },
    {
      companyId: 'spirit-airlines',
      companyName: 'Spirit Airlines, Inc.',
      ticker: 'SAVE',
      sector: 'Airlines & Travel',
      flightRisk: 96,
      status: 'Chapter 11 Restructuring',
      bankruptcyCourt: 'U.S. Bankruptcy Court S.D. N.Y.',
      kerpDocketNo: 'Docket #310',
      kerpRetentionBonusTotal: '$8.50 Million Total KERP Pool',
      kerpKeyTerms: 'Court approved $8.5M retention pool covering 42 key flight operations and maintenance directors.',
      executives: [
        {
          id: 'exec-save-1',
          name: 'Captain Richard Henderson',
          title: 'VP of Flight Operations & Fleet Maintenance',
          department: 'Operations',
          tenure: '7.8 Years',
          flightRisk: 96,
          compensationBand: '$520K - $650K Base',
          kerpAmount: '$210,000 Bonus Lock',
          linkedInSearchQuery: 'https://www.linkedin.com/search/results/people/?keywords=Richard%20Henderson%20Spirit%20Airlines',
          booleanQuery: 'currentCompany=["Spirit Airlines"] AND "Flight Operations"',
          verifiedEmail: null,
          phone: null,
          status: 'REQUIRES_ENRICHMENT'
        },
        {
          id: 'exec-save-2',
          name: 'Sarah Lin',
          title: 'VP of Aircraft Leasing & Capital Markets',
          department: 'Corporate Finance',
          tenure: '5.0 Years',
          flightRisk: 94,
          compensationBand: '$410K - $530K Base',
          kerpAmount: '$175,000 Bonus Lock',
          linkedInSearchQuery: 'https://www.linkedin.com/search/results/people/?keywords=Sarah%20Lin%20Spirit%20Airlines',
          booleanQuery: 'currentCompany=["Spirit Airlines"] AND "Aircraft Leasing"',
          verifiedEmail: null,
          phone: null,
          status: 'REQUIRES_ENRICHMENT'
        }
      ]
    },
    {
      companyId: 'big-lots',
      companyName: 'Big Lots, Inc.',
      ticker: 'BIG',
      sector: 'Retail & Merchandising',
      flightRisk: 94,
      status: 'Chapter 11 Asset Sale',
      bankruptcyCourt: 'U.S. Bankruptcy Court D. Del.',
      kerpDocketNo: 'Docket #520',
      kerpRetentionBonusTotal: '$3.10 Million Total KERP Pool',
      kerpKeyTerms: 'Nexus Capital Stalking Horse bid includes key manager retention carve-outs through store auction completions.',
      executives: [
        {
          id: 'exec-big-1',
          name: 'Thomas K. Bradley',
          title: 'SVP of Distribution Centers & Logistics',
          department: 'Supply Chain',
          tenure: '8.2 Years',
          flightRisk: 94,
          compensationBand: '$480K - $600K Base',
          kerpAmount: '$195,000 Bonus Lock',
          linkedInSearchQuery: 'https://www.linkedin.com/search/results/people/?keywords=Thomas%20Bradley%20Big%20Lots',
          booleanQuery: 'currentCompany=["Big Lots"] AND "Distribution"',
          verifiedEmail: null,
          phone: null,
          status: 'REQUIRES_ENRICHMENT'
        }
      ]
    }
  ];

  // Filter roster items
  const filteredRosters = sampleRosters.filter(r => {
    if (selectedSector !== 'ALL' && r.sector !== selectedSector) return false;
    if (r.flightRisk < minFlightRisk) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchComp = r.companyName.toLowerCase().includes(q) || r.ticker.toLowerCase().includes(q);
      const matchExec = r.executives.some(e => e.name.toLowerCase().includes(q) || e.title.toLowerCase().includes(q) || e.department.toLowerCase().includes(q));
      return matchComp || matchExec;
    }
    return true;
  });

  // Handle Guardrail Prompt for API Enrichment
  const triggerEnrichmentGuardrail = (exec, company) => {
    setPendingEnrichment({ exec, company });
    setIsGuardrailModalOpen(true);
  };

  const confirmEnrichment = () => {
    if (pendingEnrichment) {
      setUserCredits(prev => Math.max(0, prev - 1));
      // Simulate enrichment
      pendingEnrichment.exec.verifiedEmail = `${pendingEnrichment.exec.name.toLowerCase().replace(' ', '.')}@${pendingEnrichment.company.companyId}.com`;
      pendingEnrichment.exec.phone = '+1 (555) 019-2834';
      pendingEnrichment.exec.status = 'ENRICHED';
    }
    setIsGuardrailModalOpen(false);
    setPendingEnrichment(null);
  };

  // Generate Recruiter Outreach Email Draft
  const generateOutreachEmail = (exec, company) => {
    setOutreachModalExecutive({ exec, company });
    const draft = `SUBJECT: Confidential Talent Inquiry — Executive Leadership Role (PE Portfolio Company)

Dear ${exec.name.split(' ')[0]},

I hope this confidential note finds you well. 

Given the recent Chapter 11 proceedings and restructuring updates (${company.kerpDocketNo}) surrounding ${company.companyName}, I wanted to reach out with extreme discretion. 

We represent a top-tier Private Equity portfolio company actively seeking a proven ${exec.title} to lead their upcoming $600M expansion. Given your extensive background in ${exec.department} and leadership track record at ${company.ticker}, we believe your profile is an exceptional fit.

We understand sensitivity around ongoing KERP retention milestone timelines and transition caps (${exec.kerpAmount || 'Retention Lock'}), and we structure compensation packages with explicit sign-on equity and retention replacement guarantees.

Would you be open to a brief, 10-minute confidential discussion this Thursday?

Best regards,

[Your Name]
Senior Managing Director | Executive Search Practice
[Recruiting Firm Name]`;
    setGeneratedEmail(draft);
  };

  return (
    <div style={{ padding: '24px 0', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Header & Value Proposition Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        borderRadius: '16px',
        padding: '24px 28px',
        marginBottom: '28px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)' }}>
              <Users size={22} color="#FFF" />
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF', letterSpacing: '-0.02em', margin: 0 }}>
              📡 EXECUTIVE TALENT RAID RADAR
            </h1>
            <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#FCA5A5', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '3px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 900 }}>
              HEADHUNTER TERMINAL
            </span>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
            Real-time executive flight-risk tracking, PACER KERP/KEIP retention docket disclosures, and 1-click zero-cost LinkedIn boolean search deep-links for corporate recruiters.
          </p>
        </div>

        {/* User Credit Allowance Counter */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          borderRadius: '12px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Monthly Enrichment Credits
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={18} color="#F59E0B" /> {userCredits} <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>/ 250 Left</span>
            </div>
          </div>
          <button
            onClick={() => setUserCredits(prev => prev + 50)}
            style={{
              background: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid #F59E0B',
              color: '#FCD34D',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            + Add Credits
          </button>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        flexWrap: 'wrap',
        marginBottom: '24px',
        background: 'rgba(15, 23, 42, 0.6)',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 280px' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search executive name, title, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              padding: '8px 12px 8px 36px',
              color: '#FFF',
              fontSize: '0.85rem'
            }}
          />
        </div>

        {/* Sector Filter */}
        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '8px',
            padding: '8px 14px',
            color: '#FFF',
            fontSize: '0.85rem'
          }}
        >
          <option value="ALL">All Sectors</option>
          <option value="Consumer & Retail">Consumer & Retail</option>
          <option value="Airlines & Travel">Airlines & Travel</option>
          <option value="Retail & Merchandising">Retail & Merchandising</option>
        </select>

        {/* Flight Risk Range */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 700 }}>Min Flight Risk:</span>
          <input
            type="range"
            min="60"
            max="98"
            value={minFlightRisk}
            onChange={(e) => setMinFlightRisk(Number(e.target.value))}
            style={{ accentColor: '#EF4444', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#EF4444' }}>{minFlightRisk}%+</span>
        </div>
      </div>

      {/* Roster Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {filteredRosters.map((roster) => (
          <div
            key={roster.companyId}
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '14px',
              padding: '20px 24px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Company Banner & Court KERP Details */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '14px', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFF', margin: 0 }}>
                    {roster.companyName} ({roster.ticker})
                  </h2>
                  <span style={{ background: 'rgba(239, 68, 68, 0.25)', color: '#FCA5A5', border: '1px solid #EF4444', padding: '2px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 900 }}>
                    🔥 {roster.flightRisk}% FLIGHT RISK
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>🏛️ {roster.bankruptcyCourt}</span>
                  <span>•</span>
                  <span style={{ color: '#F59E0B', fontWeight: 700 }}>📜 KERP {roster.kerpDocketNo}</span>
                  <span>•</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>💰 {roster.kerpRetentionBonusTotal}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (onSelectCompany) onSelectCompany(roster.ticker);
                }}
                style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#F8FAFC',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                View Full Docket <ChevronRight size={14} />
              </button>
            </div>

            {/* KERP Summary Alert Box */}
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '0.78rem', color: '#FCD34D', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={15} color="#F59E0B" flexShrink={0} />
              <span><strong>PACER Docket Intelligence:</strong> {roster.kerpKeyTerms}</span>
            </div>

            {/* Executive Profiles Table / Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
              {roster.executives.map((exec) => (
                <div
                  key={exec.id}
                  style={{
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                        {exec.department}
                      </span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#EF4444', background: 'rgba(239, 68, 68, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                        ⚡ {exec.flightRisk}% Flight Risk
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', margin: '0 0 4px 0' }}>
                      {exec.name}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: '#CBD5E1', fontWeight: 600, lineHeight: 1.3, marginBottom: '8px' }}>
                      {exec.title}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(15, 23, 42, 0.5)', padding: '8px', borderRadius: '6px' }}>
                      <div>💼 <strong>Tenure:</strong> {exec.tenure}</div>
                      <div>💰 <strong>Est. Compensation:</strong> {exec.compensationBand}</div>
                      <div>📜 <strong>KERP Lock:</strong> <span style={{ color: '#10B981', fontWeight: 700 }}>{exec.kerpAmount}</span></div>
                    </div>
                  </div>

                  {/* Contact / Search Action Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    {/* 100% Free LinkedIn Boolean Deep-Link */}
                    <a
                      href={exec.linkedInSearchQuery}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        background: 'rgba(14, 165, 233, 0.2)',
                        border: '1px solid #0EA5E9',
                        color: '#38BDF8',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textDecoration: 'none',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                      title="Open zero-cost Boolean search directly in LinkedIn / Sales Navigator"
                    >
                      <ExternalLink size={13} /> LinkedIn Roster
                    </a>

                    {/* Verified Contact Enrichment (Consumes API Credit with Guardrail) */}
                    {exec.status === 'ENRICHED' ? (
                      <button
                        onClick={() => generateOutreachEmail(exec, roster)}
                        style={{
                          flex: 1,
                          background: 'rgba(16, 185, 129, 0.2)',
                          border: '1px solid #10B981',
                          color: '#34D399',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Mail size={13} /> AI Recruiter Draft
                      </button>
                    ) : (
                      <button
                        onClick={() => triggerEnrichmentGuardrail(exec, roster)}
                        style={{
                          flex: 1,
                          background: 'rgba(245, 158, 11, 0.2)',
                          border: '1px solid #F59E0B',
                          color: '#FCD34D',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Zap size={13} /> Enrich Contact (1 Cr)
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ANCILLARY CREDIT GUARDRAIL PROMPT MODAL */}
      {isGuardrailModalOpen && pendingEnrichment && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            border: '2px solid #F59E0B',
            borderRadius: '16px',
            maxWidth: '480px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <AlertTriangle size={24} color="#F59E0B" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFF', margin: 0 }}>
                ⚡ Ancillary Enrichment Charge Guardrail
              </h3>
            </div>

            <p style={{ color: '#CBD5E1', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '16px' }}>
              You are requesting verified direct email, mobile phone, and compensation profile enrichment for:
            </p>

            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
              <div style={{ fontWeight: 800, color: '#FFF', fontSize: '0.95rem' }}>{pendingEnrichment.exec.name}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{pendingEnrichment.exec.title}</div>
              <div style={{ color: '#38BDF8', fontSize: '0.78rem', marginTop: '4px' }}>{pendingEnrichment.company.companyName}</div>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '8px', padding: '12px', marginBottom: '20px', fontSize: '0.82rem', color: '#FCD34D' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Credit Cost:</span>
                <strong>1 Enrichment Credit</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Remaining Subscription Balance:</span>
                <strong>{userCredits} Credits</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(245, 158, 11, 0.3)', paddingTop: '4px', marginTop: '4px' }}>
                <span>Ancillary Charge Breakdown:</span>
                <strong style={{ color: '#10B981' }}>$0.00 (Deducted from Monthly Allowance)</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setIsGuardrailModalOpen(false)}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFF',
                  padding: '10px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmEnrichment}
                style={{
                  flex: 1.5,
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  border: 'none',
                  color: '#000',
                  padding: '10px',
                  borderRadius: '8px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)'
                }}
              >
                Approve & Enrich Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI RECRUITER OUTREACH EMAIL DRAFT MODAL */}
      {outreachModalExecutive && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            border: '2px solid #10B981',
            borderRadius: '16px',
            maxWidth: '650px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={22} color="#10B981" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFF', margin: 0 }}>
                  AI Recruiter Outreach Draft Generator
                </h3>
              </div>
              <button
                onClick={() => setOutreachModalExecutive(null)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <textarea
              value={generatedEmail}
              onChange={(e) => setGeneratedEmail(e.target.value)}
              rows={14}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '14px',
                color: '#E2E8F0',
                fontSize: '0.82rem',
                fontFamily: 'monospace',
                lineHeight: 1.5,
                marginBottom: '16px'
              }}
            />

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedEmail);
                  alert('Copied AI Recruiter Outreach Draft to Clipboard!');
                }}
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  border: 'none',
                  color: '#FFF',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <CheckCircle2 size={16} /> Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
