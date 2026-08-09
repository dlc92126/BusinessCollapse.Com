import React, { useState } from 'react';
import { KeyRound, Lock, Mail, Shield, Sparkles, X, ArrowRight, CheckCircle2, UserCheck } from 'lucide-react';

export default function SignInModal({ isOpen, onClose, onSignInSuccess, onOpenOnboarding }) {
  const [emailOrKey, setEmailOrKey] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  if (!isOpen) return null;

  const handleSignIn = (e) => {
    e.preventDefault();
    
    let foundUser = null;
    try {
      const storedUsers = JSON.parse(localStorage.getItem('bc_registered_users') || '[]');
      foundUser = storedUsers.find(u => 
        (u.email && u.email.toLowerCase() === emailOrKey.toLowerCase().trim()) || 
        (u.apiKey && u.apiKey.toUpperCase() === emailOrKey.toUpperCase().trim())
      );
    } catch (err) {}

    const user = foundUser ? {
      name: foundUser.name,
      email: foundUser.email,
      org: foundUser.org || 'Citadel Special Situations Desk',
      tier: foundUser.tier || 'BETA FOUNDER PASS (ACTIVE VIP)',
      apiKey: foundUser.apiKey || 'BCC-FOUNDER-8849-9910'
    } : {
      name: emailOrKey.includes('vance') || emailOrKey.includes('FOUNDER') ? 'Alexander Vance' : (emailOrKey ? emailOrKey.split('@')[0] : 'Verified Subscriber'),
      email: emailOrKey || 'subscriber@citadelcap.com',
      org: 'Citadel Special Situations Desk',
      tier: 'BETA FOUNDER PASS (ACTIVE VIP)',
      apiKey: emailOrKey.toUpperCase().startsWith('BCC-') ? emailOrKey.toUpperCase() : 'BCC-FOUNDER-8849-9910'
    };

    setAuthenticatedUser(user);
    setIsSuccess(true);

    if (onSignInSuccess) {
      onSignInSuccess(user);
    }

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1400);
  };

  const handleQuickFounderLogin = () => {
    setEmailOrKey('vance@citadelcap.com');
    setPasscode('••••••••••••');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 14, 0.92)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 260,
      padding: '24px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #090D16 100%)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(56,189,248,0.2)',
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
        <div style={{ padding: '28px 32px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
            <KeyRound size={16} /> SUBSCRIBER & BETA FOUNDER LOG-IN PORTAL
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
            Sign In to Terminal
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
            Enter your registered email address or Founder API key to unlock full terminal dockets.
          </p>
        </div>

        {isSuccess ? (
          <div style={{ padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <UserCheck size={30} color="#10B981" />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#F8FAFC', marginBottom: '6px' }}>
              Authentication Successful!
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#CBD5E1', margin: '0 0 8px 0' }}>
              Welcome back, <strong>{authenticatedUser?.name}</strong>!
            </p>
            <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 800, background: 'rgba(16,185,129,0.15)', padding: '4px 12px', borderRadius: '6px', display: 'inline-block' }}>
              {authenticatedUser?.tier}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSignIn} style={{ padding: '24px 32px 32px' }}>
            
            {/* Quick Demo Founder Log-In Chip */}
            <div 
              onClick={handleQuickFounderLogin}
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '10px',
                padding: '10px 14px',
                marginBottom: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between'
              }}
            >
              <div style={{ fontSize: '0.78rem', color: '#A7F3D0', fontWeight: 700 }}>
                ⚡ Auto-fill Demo Founder Pass Credentials
              </div>
              <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#000', background: '#10B981', padding: '2px 8px', borderRadius: '4px' }}>
                1-CLICK DEMO
              </span>
            </div>

            {/* Email / API Key Input */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '6px', textTransform: 'uppercase' }}>
                SUBSCRIBER EMAIL OR API KEY
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  required
                  placeholder="vance@citadelcap.com or BCC-FOUNDER-..."
                  value={emailOrKey}
                  onChange={(e) => setEmailOrKey(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px 10px 38px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                />
                <Mail size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              </div>
            </div>

            {/* Passcode / PIN Input */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F8FAFC', textTransform: 'uppercase' }}>
                  PASSCODE / PIN
                </label>
                <span style={{ fontSize: '0.72rem', color: '#38BDF8', cursor: 'pointer', fontWeight: 600 }}>Forgot passcode?</span>
              </div>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px 10px 38px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                />
                <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.92rem',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                color: '#FFF',
                fontWeight: 900,
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.35)',
                marginBottom: '18px'
              }}
            >
              🚀 Authenticate & Enter Terminal →
            </button>

            {/* Sign Up Sub-Link */}
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94A3B8' }}>
              Don't have a Founder Pass yet?{' '}
              <span 
                onClick={() => {
                  onClose();
                  if (onOpenOnboarding) onOpenOnboarding();
                }}
                style={{ color: '#10B981', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
              >
                🌟 Claim 1 of 100 Free Founder Passes
              </span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
