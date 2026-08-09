import React, { useState, useEffect } from 'react';
import { X, DollarSign, PieChart, ShieldAlert, CheckCircle2, Download, RefreshCw, Layers, ArrowRight, Save, Info, AlertTriangle } from 'lucide-react';

export default function RecoveryWaterfallModal({ isOpen, onClose, company }) {
  const [liquidationProceeds, setLiquidationProceeds] = useState(450); // In Millions USD
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [scenarioName, setScenarioName] = useState('');
  const [exportSuccessMsg, setExportSuccessMsg] = useState('');

  // Default capital stack tranches derived from company data or defaults (in Millions USD)
  const [tranches, setTranches] = useState([
    { id: 'dip', name: '1. DIP Credit Facility (Super-Priority)', faceValue: 100, priority: 1, color: '#10B981' },
    { id: 'firstLien', name: '2. 1st Lien Senior Secured Notes', faceValue: 250, priority: 2, color: '#38BDF8' },
    { id: 'secondLien', name: '3. 2nd Lien / Mezzanine Debt', faceValue: 150, priority: 3, color: '#F59E0B' },
    { id: 'guc', name: '4. General Unsecured Claims (GUCs) & Trade', faceValue: 200, priority: 4, color: '#EF4444' },
    { id: 'subDebt', name: '5. Subordinated Debt & Preferred Equity', faceValue: 100, priority: 5, color: '#EC4899' },
    { id: 'commonEquity', name: '6. Common Equity', faceValue: 200, priority: 6, color: '#8B5CF6' }
  ]);

  // Update initial tranches based on company data if present
  useEffect(() => {
    if (company) {
      // Parse debtAtCollapse or peakValuation if possible
      let estimatedTotalDebt = 1000;
      if (company.debtAtCollapse) {
        const parsed = parseFloat(company.debtAtCollapse.replace(/[^0-9.]/g, ''));
        if (!isNaN(parsed) && parsed > 0) estimatedTotalDebt = parsed;
      }

      const dip = Math.round(estimatedTotalDebt * 0.1);
      const first = Math.round(estimatedTotalDebt * 0.3);
      const second = Math.round(estimatedTotalDebt * 0.2);
      const guc = Math.round(estimatedTotalDebt * 0.2);
      const sub = Math.round(estimatedTotalDebt * 0.1);
      const eq = Math.round(estimatedTotalDebt * 0.1);

      setTranches([
        { id: 'dip', name: '1. DIP Credit Facility (Super-Priority)', faceValue: dip || 50, priority: 1, color: '#10B981' },
        { id: 'firstLien', name: '2. 1st Lien Senior Secured Notes', faceValue: first || 200, priority: 2, color: '#38BDF8' },
        { id: 'secondLien', name: '3. 2nd Lien / Mezzanine Debt', faceValue: second || 150, priority: 3, color: '#F59E0B' },
        { id: 'guc', name: '4. General Unsecured Claims (GUCs) & Trade', faceValue: guc || 150, priority: 4, color: '#EF4444' },
        { id: 'subDebt', name: '5. Subordinated Debt & Preferred Equity', faceValue: sub || 80, priority: 5, color: '#EC4899' },
        { id: 'commonEquity', name: '6. Common Equity', faceValue: eq || 100, priority: 6, color: '#8B5CF6' }
      ]);

      setLiquidationProceeds(Math.round(estimatedTotalDebt * 0.45));
    }
  }, [company]);

  // Rehydrate saved scenarios from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bc_waterfall_scenarios');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setSavedScenarios(parsed);
      }
    } catch (e) {}
  }, []);

  if (!isOpen) return null;

  // Calculate Waterfall Distributions based on Absolute Priority Rule (APR)
  let remainingCash = liquidationProceeds;
  const totalClaims = tranches.reduce((acc, t) => acc + t.faceValue, 0);

  const calculatedTranches = tranches.map((t) => {
    const claim = t.faceValue;
    let payout = 0;
    if (remainingCash >= claim) {
      payout = claim;
      remainingCash -= claim;
    } else if (remainingCash > 0) {
      payout = remainingCash;
      remainingCash = 0;
    } else {
      payout = 0;
    }

    const recoveryPct = claim > 0 ? (payout / claim) * 100 : 0;
    const centsOnDollar = claim > 0 ? (payout / claim).toFixed(2) : '0.00';
    const shortfall = claim - payout;
    const isImpaired = recoveryPct < 100;
    const isWipedOut = payout === 0 && claim > 0;

    return {
      ...t,
      payout,
      recoveryPct,
      centsOnDollar,
      shortfall,
      isImpaired,
      isWipedOut
    };
  });

  const totalDistributed = calculatedTranches.reduce((acc, t) => acc + t.payout, 0);
  const totalShortfall = Math.max(0, totalClaims - liquidationProceeds);
  const overallRecoveryPct = totalClaims > 0 ? ((totalDistributed / totalClaims) * 100).toFixed(1) : 0;

  // Feed type detection
  const isGraveyard = company?.status === 'CHAPTER_7' || company?.status === 'LIQUIDATION' || company?.status === 'CLOSED';

  const handleSaveScenario = () => {
    if (!scenarioName.trim()) return;
    const newScenario = {
      id: `scen-${Date.now()}`,
      name: scenarioName,
      date: new Date().toISOString(),
      companyName: company?.name || 'General Case',
      proceeds: liquidationProceeds,
      tranches,
      totalDistributed,
      overallRecoveryPct
    };
    const updated = [newScenario, ...savedScenarios];
    setSavedScenarios(updated);
    try {
      localStorage.setItem('bc_waterfall_scenarios', JSON.stringify(updated));
    } catch (e) {}
    setScenarioName('');
    setExportSuccessMsg('✅ Scenario saved to LocalStorage!');
    setTimeout(() => setExportSuccessMsg(''), 3000);
  };

  const handleExportCSV = () => {
    let csv = `tranche_priority,tranche_name,face_value_m,payout_m,cents_on_dollar,recovery_pct,shortfall_m,status\n`;
    calculatedTranches.forEach((t) => {
      csv += `"${t.priority}","${t.name}",${t.faceValue},${t.payout},${t.centsOnDollar},${t.recoveryPct.toFixed(1)},${t.shortfall},"${t.isWipedOut ? 'WIPED OUT' : t.isImpaired ? 'IMPAIRED' : 'FULL RECOVERY'}"\n`;
    });
    csv += `\nSUMMARY,,,\nTotal Claims,$${totalClaims}M\nLiquidation Proceeds,$${liquidationProceeds}M\nTotal Distributed,$${totalDistributed}M\nTotal Shortfall,$${totalShortfall}M\nOverall Recovery,${overallRecoveryPct}%\n`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waterfall_recovery_${company?.ticker || 'case'}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    setExportSuccessMsg('📥 CSV Waterfall Report Downloaded!');
    setTimeout(() => setExportSuccessMsg(''), 3000);
  };

  const handleExportJSON = () => {
    const payload = {
      entity: company?.name || 'General Distress Entity',
      ticker: company?.ticker || 'N/A',
      timestamp: new Date().toISOString(),
      liquidationProceedsM: liquidationProceeds,
      totalClaimsM: totalClaims,
      totalDistributedM: totalDistributed,
      totalShortfallM: totalShortfall,
      overallRecoveryPct: `${overallRecoveryPct}%`,
      tranches: calculatedTranches
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waterfall_recovery_${company?.ticker || 'case'}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExportSuccessMsg('📥 JSON Waterfall Payload Downloaded!');
    setTimeout(() => setExportSuccessMsg(''), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 99999, position: 'fixed', inset: 0, background: 'rgba(3, 7, 18, 0.92)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '960px', width: '100%', maxHeight: '92vh', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.4)', background: '#0B111E', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Header Bar */}
        <div style={{ padding: '24px 30px', borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <PieChart size={22} color="#38BDF8" />
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                ABSOLUTE PRIORITY RULE (APR) WATERFALL SIMULATOR
              </span>
              <span style={{ fontSize: '0.65rem', fontWeight: 900, color: isGraveyard ? '#EF4444' : '#10B981', background: isGraveyard ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)', border: isGraveyard ? '1px solid #EF4444' : '1px solid #10B981', padding: '2px 8px', borderRadius: '4px' }}>
                {isGraveyard ? '🪦 CORPORATE GRAVEYARD CASE' : '🔥 LIVE DISTRESS WIRE CASE'}
              </span>
            </div>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#FFF', margin: 0 }}>
              {company ? `${company.name} (${company.ticker})` : 'Corporate Restructuring'} — Recovery Waterfall
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Model asset liquidation distributions across priority debt tiers, cents-on-the-dollar recovery, and tranche impairment gaps.
            </p>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '6px' }}>
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '28px', overflowY: 'auto', flex: 1 }}>

          {/* Asset Proceeds Interactive Slider Card */}
          <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 900, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DollarSign size={18} color="#10B981" /> Total Liquidation Asset Proceeds Available for Distribution:
                </label>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Slide to simulate asset sale recovery valuation ($0M – $5,000M)
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#10B981', fontFamily: 'var(--font-mono)' }}>
                  ${liquidationProceeds.toLocaleString()}M
                </span>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  Total Claims: ${totalClaims.toLocaleString()}M
                </div>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="5000"
              step="10"
              value={liquidationProceeds}
              onChange={(e) => setLiquidationProceeds(Number(e.target.value))}
              style={{
                width: '100%',
                height: '10px',
                borderRadius: '5px',
                accentColor: '#10B981',
                cursor: 'pointer',
                background: 'rgba(7, 10, 15, 0.9)'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '8px' }}>
              <span>$0M (Liquidation Wiped Out)</span>
              <span>$1,250M</span>
              <span>$2,500M</span>
              <span>$3,750M</span>
              <span>$5,000M (Full Par Recovery)</span>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase' }}>TOTAL CLAIMS IN STACK</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFF', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                ${totalClaims.toLocaleString()}M
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>6 Debt Tranches Monitored</div>
            </div>

            <div style={{ background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase' }}>FUNDS DISTRIBUTED</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#10B981', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                ${totalDistributed.toLocaleString()}M
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Overall Recovery: {overallRecoveryPct}%</div>
            </div>

            <div style={{ background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase' }}>UNSATISFIED SHORTFALL GAP</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: totalShortfall > 0 ? '#EF4444' : '#10B981', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                ${totalShortfall.toLocaleString()}M
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{totalShortfall > 0 ? 'Uncovered Impairment' : 'Fully Covered'}</div>
            </div>
          </div>

          {/* Tranches Waterfall Table */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#FFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="#38BDF8" /> Tranche Payout Breakdown (Absolute Priority Rule)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {calculatedTranches.map((t) => (
                <div
                  key={t.id}
                  style={{
                    background: 'rgba(7, 10, 15, 0.85)',
                    border: `1px solid ${t.isWipedOut ? 'rgba(239, 68, 68, 0.4)' : t.isImpaired ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
                    borderRadius: '10px',
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.color }} />
                      <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#FFF' }}>
                        {t.name}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                        Claim: <strong>${t.faceValue}M</strong>
                      </span>

                      <span style={{ fontSize: '0.82rem', color: t.isWipedOut ? '#EF4444' : t.isImpaired ? '#F59E0B' : '#10B981', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
                        Payout: ${t.payout}M (${t.centsOnDollar}¢ / $)
                      </span>

                      <span style={{ fontSize: '0.7rem', fontWeight: 900, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', background: t.isWipedOut ? 'rgba(239, 68, 68, 0.2)' : t.isImpaired ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)', color: t.isWipedOut ? '#EF4444' : t.isImpaired ? '#F59E0B' : '#10B981', border: `1px solid ${t.isWipedOut ? '#EF4444' : t.isImpaired ? '#F59E0B' : '#10B981'}` }}>
                        {t.isWipedOut ? '❌ WIPED OUT' : t.isImpaired ? '⚠️ IMPAIRED' : '✓ FULL PAR'}
                      </span>
                    </div>
                  </div>

                  {/* Visual Payout Progress Bar */}
                  <div style={{ background: 'rgba(15, 23, 42, 0.9)', height: '10px', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
                    <div
                      style={{
                        width: `${Math.min(100, t.recoveryPct)}%`,
                        background: t.isWipedOut ? '#EF4444' : t.isImpaired ? 'linear-gradient(90deg, #F59E0B 0%, #EF4444 100%)' : 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
                        height: '100%',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                    <span>Recovery: <strong>{t.recoveryPct.toFixed(1)}%</strong></span>
                    {t.shortfall > 0 && (
                      <span style={{ color: '#EF4444' }}>Shortfall Deficit: -${t.shortfall}M</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {exportSuccessMsg && (
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', padding: '12px 16px', borderRadius: '10px', color: '#FFF', fontSize: '0.85rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} color="#10B981" />
              {exportSuccessMsg}
            </div>
          )}

          {/* Action Bar: Save Scenario & Exports */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: 1, minWidth: '280px' }}>
              <input
                type="text"
                placeholder="Scenario Name (e.g. Base Case 363 Auction)"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                style={{
                  background: 'rgba(7, 10, 15, 0.9)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#FFF',
                  fontSize: '0.82rem',
                  flex: 1
                }}
              />
              <button
                onClick={handleSaveScenario}
                disabled={!scenarioName.trim()}
                style={{
                  background: 'rgba(56, 189, 248, 0.2)',
                  border: '1px solid #38BDF8',
                  color: '#38BDF8',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: scenarioName.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Save size={16} /> Save Scenario
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleExportCSV}
                style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid #10B981',
                  color: '#A7F3D0',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Download size={16} /> Export CSV
              </button>

              <button
                onClick={handleExportJSON}
                style={{
                  background: 'rgba(192, 132, 252, 0.2)',
                  border: '1px solid #C084FC',
                  color: '#E9D5FF',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Download size={16} /> Export JSON Payload
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
