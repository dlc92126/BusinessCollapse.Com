import React from 'react';
import { Sparkles, ShieldCheck, Scale, FileText, Zap, Radio, Bell, ArrowRight, X, ChevronRight, Bot } from 'lucide-react';

export default function WelcomeModal({ isOpen, onClose, onOpenFaq, onOpenOnboarding, onOpenMasterAiPrompt }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 999999, position: 'fixed', inset: 0, background: 'rgba(5, 8, 14, 0.88)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px', width: '100%', padding: '0', maxHeight: '88vh', overflowY: 'auto', border: '1px solid rgba(239, 68, 68, 0.5)', boxShadow: '0 20px 60px rgba(0,0,0,0.9)' }}>
        
        {/* Modal Header */}
        <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(135deg, rgba(40, 10, 18, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ background: '#EF4444', color: '#FFF', fontSize: '0.72rem', fontWeight: 900, padding: '2px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                ⚡ WELCOME TO BUSINESSCOLLAPSE.COM
              </span>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>
                ✓ Official Institutional Terminal
              </span>
            </div>
            <h2 style={{ fontSize: '2.0rem', fontWeight: 900, color: '#FFF', lineHeight: 1.2 }}>
              The Premier Corporate Distress & Bankruptcy Auction Wire
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '6px', lineHeight: 1.5 }}>
              Tracking multi-billion dollar corporate insolvencies, Section 363 liquidation auctions, PACER court dockets, and early warning balance sheet signals.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#FFF', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Personable Welcome Letter & Founder's Invitation */}
        <div style={{ padding: '24px 32px 0 32px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.12) 100%)',
            border: '1.5px solid rgba(6, 182, 212, 0.4)',
            borderRadius: '12px',
            padding: '20px 24px',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)'
          }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#38BDF8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span>👋 Welcome to BusinessCollapse.com!</span>
              <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#10B981', background: 'rgba(16, 185, 129, 0.2)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                NEW SERVICE • BETA LAUNCH
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#F1F5F9', lineHeight: 1.6, marginBottom: '10px' }}>
              We’re thrilled you’re here! As a brand-new corporate distress intelligence terminal, our mission is simple: bring institutional transparency, real-time speed, and AI clarity to enterprise insolvencies, restructuring dockets, and asset liquidations.
            </p>

            {/* Direct Master AI Concierge Button */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenMasterAiPrompt) onOpenMasterAiPrompt();
                }}
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                  color: '#FFF',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '0.84rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 16px rgba(124, 58, 237, 0.4)'
                }}
              >
                <Bot size={16} /> 🤖 Master AI Concierge Onboarding Prompt Pack →
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenOnboarding) onOpenOnboarding();
                }}
                style={{
                  background: 'rgba(245, 158, 11, 0.2)',
                  color: '#FCD34D',
                  border: '1.5px solid #F59E0B',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '0.84rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🚀 Claim Free Beta Founder Pass →
              </button>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div style={{ padding: '24px 32px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Scale size={20} color="#EF4444" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#FFF' }}>$10M+ Institutional Threshold</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5 }}>
              Only corporate filings with a minimum $10M peak valuation or debt threshold are admitted to the public wire for maximum signal-to-noise ratio.
            </p>
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <ShieldCheck size={20} color="#10B981" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#FFF' }}>Federal Court Decree Rules</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5 }}>
              Operational shutdowns do NOT close a bankruptcy event. Active court dockets rank at the top until entry of a Final Court Decree & Discharge Order.
            </p>
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Bell size={20} color="#F59E0B" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#FFF' }}>24/7 SMS & Email Distress Radar</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5 }}>
              Subscribers receive real-time SMS alerts and Section 363 auction webcast PINs tailored to custom sector scopes and geography.
            </p>
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '18px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <FileText size={20} color="#A78BFA" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#FFF' }}>Native PACER Court Petition PDFs</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5 }}>
              Inspect official Chapter 11 initial petitions, emergency declarations, and Section 363 auction dockets directly inside our built-in PDF viewer.
            </p>
          </div>

        </div>

        {/* Action Buttons Footer */}
        <div style={{ padding: '20px 32px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(15, 23, 42, 0.9)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => {
              onClose();
              if (onOpenFaq) onOpenFaq();
            }}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ❓ Read Platform FAQ
          </button>

          <button
            onClick={() => {
              onClose();
              if (onOpenOnboarding) onOpenOnboarding();
            }}
            className="btn-primary"
            style={{ fontSize: '0.88rem', padding: '10px 22px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            Explore VIP Membership <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
