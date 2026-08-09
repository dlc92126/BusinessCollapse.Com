import React, { useState } from 'react';
import { Cpu, Search, CheckCircle2, X, Plus, Sparkles, Lock } from 'lucide-react';

export default function CustomEntityRequestModal({ isOpen, onClose, onRequestSubmitted }) {
  const [entityName, setEntityName] = useState('');
  const [tickerOrState, setTickerOrState] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entityName) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        if (onRequestSubmitted) {
          onRequestSubmitted({
            entityName,
            tickerOrState: tickerOrState || 'CUSTOM',
            notes: notes || 'PRO Member Custom Sub-threshold Tracking Request'
          });
        }
        setEntityName('');
        setTickerOrState('');
        setNotes('');
        onClose();
        alert(`🤖 SYSTEM REFRESH CRAWLER DEPLOYED!\n\nDeployed custom crawler to track:\n- ${entityName}\n\nOur automated AI agent is now monitoring PACER court dockets and state business registry filings for this entity.`);
      }, 1200);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 999999, position: 'fixed', inset: 0, background: 'rgba(5, 8, 14, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', width: '100%', padding: '0', maxHeight: '88vh', overflowY: 'auto', border: '1px solid rgba(124, 58, 237, 0.4)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>

        
        {/* Modal Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(135deg, rgba(20, 10, 30, 0.95) 0%, rgba(10, 15, 28, 0.95) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Cpu size={20} color="#C084FC" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C084FC', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                PRO & TERMINAL EXCLUSIVE FEATURE
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF' }}>
              Deploy Custom AI Entity Tracker
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
              Track mid-market businesses, regional chains, and local liquidations falling below our $10M public admission threshold.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF', display: 'block', marginBottom: '6px' }}>
              Company / Entity Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Acme Regional Manufacturing LLC or Local Bistro Group"
              value={entityName}
              onChange={(e) => setEntityName(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 14px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF', display: 'block', marginBottom: '6px' }}>
                Ticker or Jurisdiction State
              </label>
              <input
                type="text"
                placeholder="e.g. TX, CA, or OTC Ticker"
                value={tickerOrState}
                onChange={(e) => setTickerOrState(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF', display: 'block', marginBottom: '6px' }}>
                Target Tracking Type
              </label>
              <select style={{ width: '100%', padding: '10px 14px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}>
                <option value="pacer">PACER Bankruptcy Court Dockets</option>
                <option value="sec">SEC EDGAR 8-K / Going Concern</option>
                <option value="auction">Equipment & Real Estate Auctions</option>
                <option value="all">Full AI Multi-Source Radar</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF', display: 'block', marginBottom: '6px' }}>
              Special Notes / Specific Docket # (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Include specific docket numbers, court jurisdictions, or equipment auction types you want tracked..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem', outline: 'none', resize: 'none' }}
            />
          </div>

          <div style={{ background: 'rgba(124, 58, 237, 0.12)', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(124, 58, 237, 0.3)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={14} color="#C084FC" />
            <span>Custom search requests are private to your PRO/Terminal account and run continuously via our background AI crawlers.</span>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)' }}
            >
              {isSubmitting ? 'Deploying AI Crawler...' : '🤖 Deploy Custom AI Tracker'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
