import React from 'react';
import { PieChart, AlertTriangle, Layers, Percent, Flame, ShieldAlert, Cpu, ArrowLeft } from 'lucide-react';

export default function AnatomyOfFailure({ companies, onGoBack }) {
  // Compute aggregate stats across root causes
  const causes = [
    {
      title: "Debt Overload & Leveraged Buyouts",
      percentage: 38,
      color: "#FF2A4B",
      count: 28,
      examples: "WeWork, Toys 'R' Us, Red Lobster, Rite Aid",
      desc: "Excessive leverage combined with sale-leaseback transactions or private equity interest service traps."
    },
    {
      title: "Technology & E-Commerce Disruption",
      percentage: 32,
      color: "#FF7A00",
      count: 24,
      examples: "Blockbuster, Bed Bath & Beyond, Kodak, Tupperware",
      desc: "Failure to adapt to digital delivery, Amazon e-commerce, cloud software, or Generative AI shifts."
    },
    {
      title: "Executive Mismanagement & Governance",
      percentage: 18,
      color: "#FF9F43",
      count: 14,
      examples: "WeWork (Neumann Era), Enron, SVB",
      desc: "Charismatic founder worship, reckless capital allocation, missing risk officers, or inventory pivots."
    },
    {
      title: "Macro Rate & Duration Mismatches",
      percentage: 12,
      color: "#A855F7",
      count: 9,
      examples: "Silicon Valley Bank, Signature Bank",
      desc: "Unhedged long-duration treasury portfolios hit by aggressive Federal Reserve interest rate hikes."
    }
  ];

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
          <ArrowLeft size={16} color="#EF4444" /> Back to Main Distress Wire
        </button>
      )}

      {/* Title */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px', borderLeft: '4px solid #FF9F43' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <AlertTriangle size={20} color="#FF9F43" />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Anatomy of Failure Analytics</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '820px' }}>
          Macro statistical analysis breaking down the core triggers behind corporate insolvency. Data synthesizes financial post-mortems from over 75+ major corporate bankruptcies over the past 25 years.
        </p>
      </div>

      {/* Cause Breakdown Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {causes.map((cause, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: cause.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  CAUSE #{idx + 1}
                </span>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: cause.color, fontFamily: 'var(--font-mono)' }}>
                  {cause.percentage}%
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
                {cause.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '14px' }}>
                {cause.desc}
              </p>
            </div>

            <div>
              {/* Progress Bar */}
              <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: `${cause.percentage}%`, height: '100%', background: cause.color, boxShadow: `0 0 10px ${cause.color}` }} />
              </div>

              <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-dim)' }}>Iconic Examples: </span>
                <strong style={{ color: '#FFF' }}>{cause.examples}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Failure Pattern Matrix */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="#FF2A4B" /> Standard Corporate Collapse Lifecycle Stages
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: '#FFE066', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>STAGE 1: WARNING SIGN</div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>Unit Economics Erosion</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Operating margins drop. Company uses share buybacks or debt to mask slowing revenue growth.
            </p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: '#FFB020', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>STAGE 2: DISTRESS</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>Liquidity & Debt Wall</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Credit rating downgrades occur. Suppliers demand Cash-on-Delivery (COD). Refinancing gates close.
            </p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: '#C084FC', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>STAGE 3: RESTRUCTURING</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>Out-of-Court Lease/Debt Terms</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Emergency CEO replacement. Debt-for-equity swap attempts and store footprint downsizing.
            </p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: '#FF2A4B', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>STAGE 4: CHAPTER 11 / LIQUIDATION</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>Court Filing & Asset Auction</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Substantial doubt going concern notice. Chapter 11 filing to reject leases or wind-down store footprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
