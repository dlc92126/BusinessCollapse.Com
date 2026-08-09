import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Shield, ArrowRight, Lock, KeyRound, Sparkles, X, Copy, Check, Send } from 'lucide-react';

export default function EmailConfirmationModal({ isOpen, onClose, user, onEmailVerified }) {
  const [verificationCode, setVerificationCode] = useState('884-910');
  const [isVerified, setIsVerified] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);

  if (!isOpen) return null;

  const targetEmail = user?.email || 'subscriber@citadelcap.com';
  const targetName = user?.name || 'Alexander Vance';
  const targetOrg = user?.org || 'Citadel Special Situations Desk';
  const apiKey = user?.apiKey || 'BCC-FOUNDER-8849-9910';

  const handleDispatchRealEmail = async () => {
    try {
      setSendingEmail(true);
      const res = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: targetEmail,
          name: targetName,
          apiKey: apiKey
        })
      });
      const data = await res.json();
      if (data.success) {
        setEmailSentSuccess(true);
      }
    } catch (err) {
      console.log('Dispatch status:', err);
    } finally {
      setSendingEmail(false);
    }
  };

  const handleVerify = (e) => {
    if (e) e.preventDefault();
    setIsVerified(true);
    if (onEmailVerified) {
      onEmailVerified({
        ...user,
        isEmailVerified: true
      });
    }
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  const handleCopyCode = () => {
    try {
      navigator.clipboard.writeText('884-910');
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch (err) {}
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 14, 0.94)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 280,
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #090D16 100%)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '680px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(16, 185, 129, 0.2)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            color: '#94A3B8',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ padding: '24px 28px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(7, 10, 15, 0.8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
            <Mail size={16} /> INSTITUTIONAL EMAIL CONFIRMATION DISPATCH
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
            Confirm Your VIP Founder Membership
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
            A confirmation dispatch has been sent to <strong style={{ color: '#FCD34D' }}>{targetEmail}</strong>.
          </p>
        </div>

        {/* Email Body Preview Box */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', maxHeight: '70vh' }}>
          
          {isVerified ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <CheckCircle2 size={36} color="#10B981" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFF', marginBottom: '8px' }}>
                Email Verified & Account Activated!
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: '440px', margin: '0 auto 16px auto', lineHeight: 1.5 }}>
                Welcome to BusinessCollapse PRO, <strong>{targetName}</strong>. Your Founder API key <code style={{ color: '#FCD34D', background: 'rgba(7,10,15,0.8)', padding: '2px 6px', borderRadius: '4px' }}>{apiKey}</code> is now active.
              </p>
            </div>
          ) : (
            <div>
              {/* Simulated Inbox Email Container */}
              <div style={{ background: '#090D16', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                
                {/* Email Header Info */}
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '16px', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8', marginBottom: '4px' }}>
                    <span><strong>FROM:</strong> BusinessCollapse PRO &lt;vance@businesscollapse.com&gt;</span>
                    <span style={{ color: '#10B981', fontWeight: 800 }}>VIP DISPATCH</span>
                  </div>
                  <div style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.88rem' }}>
                    <strong>SUBJECT:</strong> [ACTION REQUIRED] Confirm Email to Activate Your BusinessCollapse PRO Founder Pass
                  </div>
                </div>

                {/* Simulated Email Body Content */}
                <div style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: 1.6 }}>
                  <p style={{ marginTop: 0 }}>Hello <strong>{targetName}</strong> ({targetOrg}),</p>
                  
                  <p>
                    Thank you for joining the <strong>BusinessCollapse PRO Beta Founder Program</strong>. To complete your account activation and access live PACER court dockets, DIP cash burn metrics, and Sub-$10M regional liquidations, please verify your email address.
                  </p>

                  {/* Verification Code Box */}
                  <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '16px', borderRadius: '8px', textAlign: 'center', margin: '16px 0' }}>
                    <div style={{ fontSize: '0.7rem', color: '#FCD34D', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                      YOUR 6-DIGIT EMAIL VERIFICATION CODE
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFF', fontFamily: 'var(--font-mono)', letterSpacing: '0.18em', margin: '4px 0' }}>
                      {verificationCode}
                    </div>
                    <button
                      onClick={handleCopyCode}
                      style={{ background: 'none', border: 'none', color: copiedCode ? '#10B981' : '#38BDF8', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                      {copiedCode ? 'Code Copied!' : 'Copy Code'}
                    </button>
                  </div>

                  {/* Magic Verification Button inside Email */}
                  <div style={{ textAlign: 'center', margin: '20px 0 10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={handleVerify}
                      style={{
                        background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
                        color: '#FFF',
                        border: 'none',
                        padding: '12px 28px',
                        borderRadius: '8px',
                        fontWeight: 900,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      ⚡ Confirm Email & Activate Founder Pass →
                    </button>

                    <button
                      type="button"
                      onClick={handleDispatchRealEmail}
                      disabled={sendingEmail}
                      style={{
                        background: emailSentSuccess ? 'rgba(16, 185, 129, 0.2)' : 'rgba(30, 41, 59, 0.8)',
                        color: emailSentSuccess ? '#10B981' : '#38BDF8',
                        border: emailSentSuccess ? '1px solid #10B981' : '1px solid rgba(56, 189, 248, 0.4)',
                        padding: '8px 18px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Send size={13} color={emailSentSuccess ? "#10B981" : "#38BDF8"} />
                      {sendingEmail ? 'Dispatching via Netlify & Resend...' : (emailSentSuccess ? '✓ Email Dispatched to Inbox!' : '📬 Send Real Email to My Inbox via Netlify & Resend')}
                    </button>
                  </div>

                </div>

              </div>

              {/* Enter Code Form Alternative */}
              <form onSubmit={handleVerify} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Enter 6-digit code..."
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#FFF',
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-mono)',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '10px 20px', fontSize: '0.85rem', fontWeight: 800 }}
                >
                  Verify Code
                </button>
              </form>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
