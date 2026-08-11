import React, { useState } from 'react';
import { CreditCard, ShieldAlert, ArrowLeft, Search, Filter, ChevronRight, Clock, AlertTriangle, Building, Layers, Sparkles, Flame, Star } from 'lucide-react';

export default function DipFinancingMonitor({ companies = [], watchlist = [], toggleWatchlist, onSelectCompany, onGoBack }) {
  const [selectedLenderFilter, setSelectedLenderFilter] = useState('ALL');
  const [selectedUrgencyFilter, setSelectedUrgencyFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all companies that have DIP financing metadata
  const dipCompanies = (companies || []).filter(c => c && c.dipFinancing);

  // Compute Summary KPI Stats
  const totalFacilityCount = dipCompanies.length;
  const totalLenderSyndicates = new Set(dipCompanies.map(c => c.dipFinancing.lender.split(' ')[0])).size;
  const criticalRunwayCount = dipCompanies.filter(c => c.dipFinancing.cashRunwayDays <= 30).length;

  // Unique Lenders for Filter Chips
  const popularLenders = ['ALL', 'Apollo', 'Ares', 'Fortress', 'SoftBank', 'Gordon', 'MPT'];

  // Filter Stream
  const filteredDipList = dipCompanies.filter(c => {
    const dip = c.dipFinancing;
    if (selectedLenderFilter !== 'ALL' && !dip.lender.toLowerCase().includes(selectedLenderFilter.toLowerCase())) return false;
    
    if (selectedUrgencyFilter === 'CRITICAL' && dip.cashRunwayDays > 30) return false;
    if (selectedUrgencyFilter === 'MODERATE' && (dip.cashRunwayDays <= 30 || dip.cashRunwayDays > 60)) return false;
    if (selectedUrgencyFilter === 'STABLE' && dip.cashRunwayDays <= 60) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const name = (c.name || '').toLowerCase();
      const ticker = (c.ticker || '').toLowerCase();
      const lender = (dip.lender || '').toLowerCase();
      return name.includes(q) || ticker.includes(q) || lender.includes(q);
    }
    return true;
  });

  return (
    <div style={{ marginTop: '24px' }}>
      


      {/* DIP Overview Command Header */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', borderLeft: '5px solid #6366F1', background: 'linear-gradient(135deg, rgba(20, 15, 40, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366F1 0%, #3730A3 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(99, 102, 241, 0.65)', border: '1.5px solid rgba(255, 255, 255, 0.25)', flexShrink: 0 }}>
              <CreditCard size={22} color="#FFF" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))' }} />
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
                <h2 style={{
                  fontSize: '1.65rem',
                  fontWeight: 950,
                  letterSpacing: '0.04em',
                  wordSpacing: '0.18em',
                  margin: 0,
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #818CF8 50%, #6366F1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.85))',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  💳 DEBTOR-IN-POSSESSION (DIP) LOAN TERMINAL
                </h2>
                <span style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(55, 48, 163, 0.3) 100%)',
                  color: '#818CF8',
                  border: '1px solid rgba(99, 102, 241, 0.55)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  boxShadow: '0 0 14px rgba(99, 102, 241, 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#818CF8', boxShadow: '0 0 8px #818CF8' }} />
                  CREDIT & REORGANIZATION SUITE
                </span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.82rem', margin: '4px 0 0 0', lineHeight: 1.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                ⚡ SUPER-PRIORITY CREDIT FACILITIES • LENDER SYNDICATES (APOLLO, ARES, FORTRESS) & CASH BURN RADAR
              </p>
            </div>
          </div>

          {/* KPI Stats Box */}
          <div style={{ background: 'rgba(7, 10, 15, 0.85)', padding: '14px 20px', borderRadius: '12px', border: '1px solid rgba(192, 132, 252, 0.4)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>TRACKED DIP FACILITIES</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>
                {totalFacilityCount} Facilities
              </div>
            </div>
            <div style={{ height: '30px', width: '1px', background: 'var(--border-subtle)' }} />
            <div>
              <div style={{ fontSize: '0.68rem', color: '#FCA5A5', fontWeight: 700, textTransform: 'uppercase' }}>CRITICAL (&lt; 30d RUNWAY)</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#EF4444', fontFamily: 'var(--font-mono)' }}>
                {criticalRunwayCount} Urgent
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        
        {/* Lender Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 800 }}>DIP Lender:</span>
          {popularLenders.map(lender => (
            <button
              key={lender}
              onClick={() => setSelectedLenderFilter(lender)}
              style={{
                padding: '5px 12px',
                borderRadius: '16px',
                fontSize: '0.75rem',
                fontWeight: 800,
                cursor: 'pointer',
                border: selectedLenderFilter === lender ? '1px solid #C084FC' : '1px solid var(--border-subtle)',
                background: selectedLenderFilter === lender ? 'rgba(192, 132, 252, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                color: selectedLenderFilter === lender ? '#E9D5FF' : 'var(--text-muted)'
              }}
            >
              {lender === 'ALL' ? '🌐 All Lenders' : lender}
            </button>
          ))}
        </div>

        {/* Urgency & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={selectedUrgencyFilter}
            onChange={(e) => setSelectedUrgencyFilter(e.target.value)}
            style={{
              background: '#0F172A',
              border: '1px solid var(--border-subtle)',
              color: '#FFF',
              fontSize: '0.78rem',
              fontWeight: 800,
              padding: '6px 12px',
              borderRadius: '8px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="ALL">🔥 All Cash Runways</option>
            <option value="CRITICAL">🔴 Critical (&lt; 30 Days Left)</option>
            <option value="MODERATE">🟡 Moderate (30 - 60 Days)</option>
            <option value="STABLE">🟢 Stable (&gt; 60 Days)</option>
          </select>

          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search size={14} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search DIP loans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '6px 12px 6px 34px',
                color: '#FFF',
                fontSize: '0.8rem'
              }}
            />
          </div>
        </div>
      </div>

      {/* DIP Loan Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
        {filteredDipList.map((company) => {
          const dip = company.dipFinancing;
          const isCritical = dip.cashRunwayDays <= 30;

          return (
            <div
              key={company.id}
              onClick={() => onSelectCompany && onSelectCompany(company)}
              className="glass-panel glass-panel-interactive"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: isCritical ? '1.5px solid rgba(239, 68, 68, 0.6)' : '1px solid rgba(192, 132, 252, 0.35)',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Watchlist Star Toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (toggleWatchlist) toggleWatchlist(company.id);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title={watchlist.includes(company.id) ? "Remove from Unified Watchlist" : "Save to Unified Watchlist"}
                      >
                        <Star
                          size={18}
                          color={watchlist.includes(company.id) ? "#F59E0B" : "#64748B"}
                          fill={watchlist.includes(company.id) ? "#F59E0B" : "none"}
                        />
                      </button>

                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>{company.name}</h3>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                        {company.ticker}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#C084FC', fontWeight: 800, marginTop: '2px' }}>
                      📍 {company.locationJurisdiction}
                    </div>
                  </div>

                  <span style={{ background: isCritical ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: isCritical ? '#FCA5A5' : '#FCD34D', border: isCritical ? '1px solid #EF4444' : '1px solid #F59E0B', padding: '2px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
                    {isCritical ? '🔴 CRITICAL RUNWAY' : '🟡 ACTIVE DIP'}
                  </span>
                </div>

                {/* DIP Metric Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'rgba(7, 10, 15, 0.6)', padding: '12px', borderRadius: '8px', margin: '14px 0', border: '1px solid var(--border-subtle)' }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>DIP CREDIT LINE</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>{dip.facilitySize}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>INTEREST RATE</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FCD34D', fontFamily: 'var(--font-mono)' }}>{dip.interestRate}</div>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>DIP LENDER SYNDICATE</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#C084FC' }}>{dip.lender}</div>
                  </div>
                </div>

                {/* Visual Cash Runway Bar */}
                <div style={{ background: 'rgba(7, 10, 15, 0.7)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 800, marginBottom: '6px' }}>
                    <span style={{ color: '#F8FAFC' }}>🔥 WEEKLY BURN: {dip.weeklyCashBurn}</span>
                    <span style={{ color: isCritical ? '#EF4444' : '#F59E0B', fontFamily: 'var(--font-mono)' }}>
                      {dip.cashRunwayDays} DAYS LEFT
                    </span>
                  </div>

                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${Math.min(100, Math.max(5, (dip.cashRunwayDays / 90) * 100))}%`, 
                        height: '100%', 
                        background: isCritical ? 'linear-gradient(90deg, #EF4444 0%, #B71C1C 100%)' : 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)', 
                        borderRadius: '4px' 
                      }} 
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>
                  Lien: <strong style={{ color: '#CBD5E1' }}>{dip.superPriorityStatus.split(' ')[0]} Super-Priority</strong>
                </span>
                <span style={{ color: '#FFF', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                  Inspect Facility <ChevronRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
