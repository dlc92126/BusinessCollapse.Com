import React from 'react';
import { AlertTriangle, TrendingUp, DollarSign, Building2, Flame, ArrowUpRight, ArrowLeft } from 'lucide-react';

export default function SectorDistressIndex({ sectors, onSelectSector, onGoBack }) {
  return (
    <div style={{ marginTop: '24px' }}>
      
      {/* Universal Back Button */}
      {onGoBack && (
        <button
          onClick={onGoBack}
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            color: '#F8FAFC',
            border: '1px solid var(--border-subtle)',
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            transition: 'all 0.2s ease'
          }}
          className="glass-panel-interactive"
        >
          <ArrowLeft size={16} color="#EF4444" /> ← Back to Main Distress Wire
        </button>
      )}

      {/* Overview Banner */}

      <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px', borderLeft: '4px solid #FF2A4B', background: 'linear-gradient(135deg, rgba(16, 23, 36, 0.9) 0%, rgba(30, 15, 25, 0.7) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="pulse-dot critical"></span>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FF2A4B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Macro Risk Radar • Live Market Index
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
              Industry Sector Distress Index
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px' }}>
              Aggregated financial vulnerability scoring across high-risk macro sectors. Distress scores evaluate refinancing pressure, commercial lease exposure, consumer demand shifts, and debt maturity walls.
            </p>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 18px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>TOTAL DEBT AT RISK</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FF3B5C', fontFamily: 'var(--font-mono)' }}>$481.1 Billion</div>
            </div>
            <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 18px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>DISTRESSED ENTITIES</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FF9F43', fontFamily: 'var(--font-mono)' }}>198 Corporate Giants</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {sectors.map((sector) => (
          <div
            key={sector.id}
            className="glass-panel glass-panel-interactive"
            onClick={() => onSelectSector(sector.id)}
            style={{ padding: '24px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
          >
            {/* Top Bar Accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: sector.accentColor }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>{sector.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Building2 size={12} /> {sector.failingCompaniesCount} Tracked Entities
                </span>
              </div>

              {/* Risk Gauge Radial Pill */}
              <div style={{ background: `${sector.accentColor}20`, border: `1px solid ${sector.accentColor}50`, color: sector.accentColor, padding: '6px 14px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}>DISTRESS SCORE</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>{sector.riskScore}<span style={{ fontSize: '0.8rem' }}>/100</span></div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '18px', minHeight: '50px', lineHeight: 1.45 }}>
              {sector.description}
            </p>

            {/* Risk Gauge Bar */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px', fontWeight: 600 }}>
                <span style={{ color: 'var(--text-dim)' }}>Vulnerability Severity</span>
                <span style={{ color: sector.accentColor }}>{sector.riskLevel} ({sector.trend30d})</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${sector.riskScore}%`, height: '100%', background: sector.accentColor, borderRadius: '3px', boxShadow: `0 0 10px ${sector.accentColor}` }} />
              </div>
            </div>

            {/* Key Drivers Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {sector.topFailureDrivers.slice(0, 3).map((driver, idx) => (
                <span key={idx} style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 500 }}>
                  • {driver}
                </span>
              ))}
            </div>

            {/* Footer Metrics */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-dim)' }}>Debt at Risk: <strong style={{ color: '#FFF' }}>{sector.totalDebtAtRisk}</strong></span>
              <span style={{ color: sector.accentColor, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                Filter Catalog <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
