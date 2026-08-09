import React from 'react';
import { ExternalLink, Calendar, Clock, MapPin, Scale, FileText, CheckCircle2, X, AlertTriangle } from 'lucide-react';

export default function BulletinDetailModal({ bulletin, onClose, onOpenPdf }) {
  if (!bulletin) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 999999, position: 'fixed', inset: 0, background: 'rgba(5, 8, 14, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', width: '100%', padding: '0', maxHeight: '88vh', overflowY: 'auto', border: '1px solid rgba(255, 42, 75, 0.4)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>

        
        {/* Modal Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(135deg, rgba(30, 10, 18, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#000', background: '#FF3B5C', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {bulletin.badgeText || '⚡ DEVELOPING COURT BULLETIN'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                Docket Ref #{bulletin.id || 'DOC-2026'}
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF', lineHeight: 1.3 }}>
              {bulletin.headline}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="#FF3B5C" /> {bulletin.locationJurisdiction || 'United States Bankruptcy Court'}
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981', fontWeight: 700 }}>
                <Scale size={14} /> {bulletin.sourceType || 'SEC EDGAR / PACER Verified'}
              </span>
            </div>
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
          
          {/* Hearing & Calendar Date Box */}
          <div style={{ background: 'rgba(255, 42, 75, 0.08)', padding: '16px 20px', borderRadius: '10px', border: '1px solid rgba(255, 42, 75, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF3B5C', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>
                📅 Court Hearing & Filing Timestamp
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 900, color: '#FFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} color="#FF3B5C" />
                {bulletin.hearingDateOrTime || bulletin.lastUpdated || 'August 14, 2026 @ 10:00 AM EST'}
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', background: 'rgba(7, 10, 15, 0.8)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)' }}>
              Jurisdiction Timezone: EST / EDT
            </div>
          </div>

          {/* Parsed Executive Summary */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFF', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Parsed Legal & Market Summary
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.6, background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              {bulletin.summary}
            </p>
          </div>

          {/* Key Docket & Hearing Updates */}
          {bulletin.keyUpdates && bulletin.keyUpdates.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFF', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Itemized Court Docket & Procedural Milestones
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {bulletin.keyUpdates.map((update, idx) => (
                  <li key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: '#070A0F', padding: '10px 14px', borderRadius: '6px', borderLeft: '3px solid #7C3AED', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#C084FC" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{update}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Primary Legal Document Link */}
          <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.8) 100%)', padding: '16px 20px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFF' }}>
                Official Primary Source Document Verified
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Source: {bulletin.sourceName || 'U.S. Federal Bankruptcy PACER Portal'}
              </div>
            </div>

            <button
              onClick={() => {
                if (onOpenPdf) {
                  onOpenPdf({
                    title: `${bulletin.entityName || 'Entity'} Official Court Docket PDF`,
                    docketNo: `Docket #${bulletin.id || '2026-001'}`,
                    entityName: bulletin.entityName || 'SPIRIT AIRLINES',
                    summary: bulletin.summary,
                    date: bulletin.lastUpdated ? bulletin.lastUpdated.slice(0, 10) : '2026-08-05'
                  });
                }
              }}
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', fontSize: '0.8rem' }}
            >
              <FileText size={14} /> View Native Court Docket PDF →
            </button>

          </div>

        </div>

        {/* Modal Footer */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(7, 10, 15, 0.9)', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>
            Close Bulletin
          </button>
        </div>
      </div>
    </div>
  );
}
