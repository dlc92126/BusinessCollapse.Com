import React from 'react';
import { Skull, AlertTriangle, ShieldAlert, TrendingDown, ExternalLink, Code, Database, ArrowLeft, Clock } from 'lucide-react';

export default function ZombieCryptoTracker({ zombieProjects, onSelectProject, onGoBack }) {
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

      {/* Header Banner */}

      <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px', borderLeft: '4px solid #A855F7', background: 'linear-gradient(135deg, rgba(16, 23, 36, 0.9) 0%, rgba(35, 15, 45, 0.75) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Skull size={20} color="#C084FC" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#C084FC', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Crypto Project Implosions & Abandoned Assets
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
              Zombie Crypto Assets & Depeg Trackers
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px' }}>
              Real-time monitoring of collapsed crypto protocols, algorithmic depegs, founder fraud implosions, and dead "Zombie" tokens with 0 developer commit activity still trading on liquidity pools.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 18px', borderRadius: '10px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>TOTAL CRYPTO VALUE WIPEOUT</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FF2A4B', fontFamily: 'var(--font-mono)' }}>$120.8+ Billion</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Zombie Tokens */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {zombieProjects.map((project) => (
          <div key={project.id} className="glass-panel glass-panel-interactive" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Top Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFF' }}>{project.name}</h3>
                    <span style={{ fontSize: '0.7rem', color: '#C084FC', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                      {project.symbol}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{project.type} • Founder: {project.founder}</span>
                    <span style={{ fontSize: '0.7rem', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={11} /> Refreshed: {project.formattedTimestamp || (project.lastUpdated ? `${project.lastUpdated.replace('T', ' ')} EST` : `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} EST`)}
                    </span>
                  </div>
                </div>


                {/* Zombie Score Pill */}
                <div style={{ background: 'rgba(255, 42, 75, 0.15)', border: '1px solid rgba(255, 42, 75, 0.4)', padding: '4px 10px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.6rem', color: '#FF2A4B', fontWeight: 800 }}>ZOMBIE SCORE</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FF2A4B', fontFamily: 'var(--font-mono)' }}>{project.zombieScore}/100</div>
                </div>
              </div>

              {/* Summary */}
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.45 }}>
                {project.summary}
              </p>
            </div>

            <div>
              {/* Key Metrics */}
              <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)', marginBottom: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 600 }}>PEAK CAP</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', fontFamily: 'var(--font-mono)' }}>{project.peakMarketCap}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 600 }}>CURRENT</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FF2A4B', fontFamily: 'var(--font-mono)' }}>{project.collapseMarketCap}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 600 }}>FUNDS LOST</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FF9F43', fontFamily: 'var(--font-mono)' }}>{project.fundsLost}</div>
                  </div>
                </div>
              </div>

              {/* Zombie Indicators Bullets */}
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '12px', fontSize: '0.75rem' }}>
                <div style={{ color: '#FF5252', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Code size={12} /> GitHub Dev Activity: <span style={{ color: '#FFF' }}>{project.githubActivity}</span>
                </div>
                <ul style={{ paddingLeft: '16px', color: 'var(--text-muted)' }}>
                  {project.zombieIndicators.slice(0, 2).map((ind, idx) => (
                    <li key={idx}>{ind}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ fontSize: '0.75rem', color: '#FF3B5C', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertTriangle size={12} /> Cause: {project.primaryCause}
                </span>

                {project.claimsAgentUrl && (
                  <a
                    href={project.claimsAgentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
                      color: '#FFF',
                      border: 'none',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <ExternalLink size={12} /> {project.claimsAgent || 'Court Dockets'}
                  </a>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
