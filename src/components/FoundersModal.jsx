import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldAlert, Bell, Zap, Star, Gift, ArrowRight, Lock, Users, Mail, Check, Shield } from 'lucide-react';
import sandboxMembers from '../data/sandbox_members.json';

export default function FoundersModal({ isOpen, onClose, onClaimPass, onOpenOnboarding }) {
  const [activeTab, setActiveTab] = useState('roster'); // 'roster' | 'claim'
  const [email, setEmail] = useState('');
  const [claimed, setClaimed] = useState(false);
  const [memberId, setMemberId] = useState('');

  if (!isOpen) return null;

  // Gather all registered members from sandbox_members + localStorage
  let localUsers = [];
  try {
    localUsers = JSON.parse(localStorage.getItem('bc_registered_users') || '[]');
  } catch (e) {}

  const allFoundersList = [...localUsers, ...(sandboxMembers || [])];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const generatedId = `FOUNDER-#${Math.floor(100 + Math.random() * 400)}`;
      setMemberId(generatedId);
      setClaimed(true);
      if (onClaimPass) onClaimPass(generatedId);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 99999, position: 'fixed', inset: 0, background: 'rgba(3, 7, 18, 0.92)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px', maxHeight: '88vh', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.6)', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ padding: '24px 28px 16px', borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(135deg, rgba(20, 16, 10, 0.95) 0%, rgba(40, 28, 10, 0.95) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Zap size={18} color="#F59E0B" className="animate-pulse" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                BUSINESSCOLLAPSE PRO • VIP FOUNDERS CLUB & ROSTER
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFF', margin: 0 }}>
              Official Founders Registry & Directory
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Exclusive 100-Member Beta Founder Directory, VIP Access Keys & Active Subscriber Registry
            </p>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#FFF', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Sub Navigation Bar */}
        <div style={{ padding: '12px 28px', background: 'rgba(7, 10, 15, 0.9)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveTab('roster')}
            style={{
              background: activeTab === 'roster' ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
              color: activeTab === 'roster' ? '#FCD34D' : '#94A3B8',
              border: activeTab === 'roster' ? '1px solid #F59E0B' : '1px solid transparent',
              padding: '6px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            📜 OFFICIAL VIP FOUNDERS ROSTER ({allFoundersList.length})
          </button>

          <button
            onClick={() => setActiveTab('claim')}
            style={{
              background: activeTab === 'claim' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
              color: activeTab === 'claim' ? '#A7F3D0' : '#94A3B8',
              border: activeTab === 'claim' ? '1px solid #10B981' : '1px solid transparent',
              padding: '6px 16px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            🚀 CLAIM BETA FOUNDER PASS
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          
          {activeTab === 'roster' ? (
            <div>
              <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#F59E0B', fontWeight: 900, textTransform: 'uppercase' }}>100-MEMBER FOUNDERS ALLOCATION</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFF' }}>
                    {allFoundersList.length} Active Founding Members Registered
                  </div>
                </div>
                {onOpenOnboarding && (
                  <button
                    onClick={() => { onClose(); onOpenOnboarding(); }}
                    className="btn-primary"
                    style={{ background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)', padding: '8px 16px', fontSize: '0.82rem', fontWeight: 900 }}
                  >
                    + Register As Beta Founder
                  </button>
                )}
              </div>

              {/* Roster Table */}
              <div style={{ background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1.5fr 1.5fr 1fr 1fr', padding: '12px 16px', background: 'rgba(15, 23, 42, 0.9)', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.72rem', fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  <span>SEAT</span>
                  <span>MEMBER NAME</span>
                  <span>ORGANIZATION</span>
                  <span>FOUNDER TIER</span>
                  <span>STATUS</span>
                </div>

                <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
                  {allFoundersList.map((member, index) => {
                    const isDavid = member.name === 'David Church' || member.id === 'david-church-founder';
                    return (
                      <div
                        key={member.id || index}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '80px 1.5fr 1.5fr 1fr 1fr',
                          padding: '14px 16px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                          alignItems: 'center',
                          fontSize: '0.82rem',
                          background: isDavid ? 'rgba(245, 158, 11, 0.12)' : 'transparent'
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, color: isDavid ? '#F59E0B' : 'var(--text-dim)' }}>
                          #{String(index + 1).padStart(3, '0')}
                        </span>
                        <div>
                          <strong style={{ color: isDavid ? '#FCD34D' : '#FFF', display: 'block' }}>{member.name}</strong>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{member.email}</span>
                        </div>
                        <span style={{ color: 'var(--text-muted)' }}>{member.organization || member.company || member.org || 'Special Situations Desk'}</span>
                        <div>
                          <span style={{ background: isDavid ? 'rgba(245, 158, 11, 0.25)' : 'rgba(16, 185, 129, 0.15)', color: isDavid ? '#FCD34D' : '#A7F3D0', border: isDavid ? '1px solid #F59E0B' : '1px solid rgba(16, 185, 129, 0.4)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
                            {member.tier ? member.tier.toUpperCase() : 'VIP FOUNDER'}
                          </span>
                        </div>
                        <span style={{ color: '#10B981', fontWeight: 900, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={14} color="#10B981" /> Verified VIP
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Offer Comparison Box */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>PUBLIC FEED</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF', margin: '4px 0' }}>FREE</div>
                  <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '16px', lineHeight: 1.6 }}>
                    <li>24-Hour Delayed News Feed</li>
                    <li>Basic Graveyard Catalog</li>
                    <li>Public Sector Indices</li>
                  </ul>
                </div>

                <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(180, 83, 9, 0.25) 100%)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.6)', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '-10px', right: '12px', background: '#F59E0B', color: '#000', fontSize: '0.65rem', fontWeight: 900, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    LIMITED BETA PASS
                  </span>
                  <div style={{ fontSize: '0.75rem', color: '#FFE066', fontWeight: 800 }}>VIP FOUNDERS TIER</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF', margin: '4px 0' }}>
                    $0 <span style={{ fontSize: '0.8rem', textDecoration: 'line-through', color: 'var(--text-dim)' }}>$199/mo</span>
                  </div>
                  <ul style={{ fontSize: '0.8rem', color: '#FFF', paddingLeft: '16px', lineHeight: 1.6 }}>
                    <li>⚡ 14-Day Free VIP Trial</li>
                    <li>📱 24/7 Real-Time SMS/Email Distress Alerts</li>
                    <li>🔨 Official Bankruptcy Court Webcast Log-In PINs</li>
                    <li>📜 Native PACER Bankruptcy Court Petition PDFs</li>
                  </ul>
                </div>
              </div>

              {/* Form or Confirmation */}
              {!claimed ? (
                <form onSubmit={handleSubmit} style={{ background: 'rgba(7, 10, 15, 0.8)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.4)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Gift size={18} color="#F59E0B" /> Claim Your 14-Day VIP Pro Free Trial Pass:
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="email"
                      placeholder="Enter your email to activate trial..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ flex: 1, padding: '12px 16px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem', outline: 'none' }}
                    />
                    <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: '#000', fontWeight: 900, padding: '12px 20px', fontSize: '0.9rem' }}>
                      Activate Founders Pass <ArrowRight size={16} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>
                    🔒 No credit card required for 14-Day Beta Trial. Limited to the first 500 founding members.
                  </div>
                </form>
              ) : (
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.5)', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                  <CheckCircle2 size={36} color="#10B981" style={{ margin: '0 auto 10px auto', display: 'block' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF', marginBottom: '4px' }}>
                    VIP Founders Pass Activated!
                  </h3>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFE066', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                    MEMBER CERTIFICATE: {memberId}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Your 14-Day VIP Pro Access is live. Real-time SMS & Court Auction PIN alerts have been enabled for <strong>{email}</strong>.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(7, 10, 15, 0.9)', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
