import React from 'react';
import { ShieldCheck, Scale, FileText, CheckCircle2, X, AlertTriangle, Cpu } from 'lucide-react';

export default function AdmissionCriteriaModal({ isOpen, onClose, onOpenCustomRequest }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 99999, position: 'fixed', inset: 0, background: 'rgba(5, 8, 14, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', width: '100%', padding: '0', maxHeight: '88vh', overflowY: 'auto', border: '1px solid rgba(124, 58, 237, 0.4)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>

        
        {/* Modal Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(135deg, rgba(16, 23, 36, 0.95) 0%, rgba(25, 15, 45, 0.8) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={20} color="#10B981" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                INSTITUTIONAL DATA & GOVERNANCE POLICY
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF' }}>
              Official Dataset Admission Criteria
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
              The published standards governing which corporate distress events qualify for inclusion on BusinessCollapse.com.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
          
          {/* PRO Custom Feature Banner (Prominently at Top) */}
          <div style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(245, 158, 11, 0.2) 100%)', padding: '18px 20px', borderRadius: '12px', border: '1.5px solid rgba(245, 158, 11, 0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)' }}>
            <div>
              <div style={{ color: '#FCD34D', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={16} color="#F59E0B" /> NEED TO TRACK AN ENTITY BELOW OUR $10M THRESHOLD?
              </div>
              <p style={{ fontSize: '0.85rem', color: '#FFF', fontWeight: 600, lineHeight: 1.45 }}>
                PRO & Terminal subscribers can deploy custom AI crawlers to track out-of-scope mid-market businesses, regional chains, and private liquidations.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                if (onOpenCustomRequest) onOpenCustomRequest();
              }}
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', fontSize: '0.82rem', fontWeight: 900, whiteSpace: 'nowrap', boxShadow: '0 0 16px rgba(245, 158, 11, 0.4)', color: '#FFF', border: 'none' }}
            >
              <Cpu size={14} /> Request Custom Entity Audit →
            </button>
          </div>

          {/* Criterion 1 */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px 20px', borderRadius: '10px', borderLeft: '4px solid #10B981', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Scale size={18} color="#10B981" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF' }}>1. Asset Scale & Valuation Threshold ($10M+ Minimum)</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Entities tracked on the public main feed must possess at least <strong>$10 Million USD</strong> in peak equity market capitalization or total outstanding liabilities. This ensures our public index remains focused on market-moving corporate events.
            </p>
          </div>

          {/* Criterion 2 */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px 20px', borderRadius: '10px', borderLeft: '4px solid #7C3AED', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <FileText size={18} color="#C084FC" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF' }}>2. Official Judicial or Regulatory Filing</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              The event must be backed by an executed legal document: an emergency Federal Bankruptcy Petition (Chapter 7, Chapter 11, Chapter 15), an SEC Form 8-K distress disclosure, an SEC Form 10-K "Going Concern" warning, or an official FDIC/OTS receivership order.
            </p>
          </div>

          {/* Criterion 3 */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px 20px', borderRadius: '10px', borderLeft: '4px solid #F59E0B', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <CheckCircle2 size={18} color="#F59E0B" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF' }}>3. Institutional Sourcing Only (Zero Rumor Policy)</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              100% of data is derived from official PACER court dockets, SEC EDGAR disclosures, or Tier-1 institutional financial press (The Wall Street Journal, Bloomberg, Reuters). Social media rumors and unverified commentators are strictly excluded.
            </p>
          </div>

        </div>


        {/* Modal Footer */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(7, 10, 15, 0.9)', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>
            Close Criteria
          </button>
        </div>
      </div>
    </div>
  );
}
