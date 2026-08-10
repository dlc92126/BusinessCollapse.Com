import React, { useState } from 'react';
import { Shield, Check, CreditCard, Building, Lock, Sparkles, X, ArrowRight, Zap, CheckCircle2, QrCode } from 'lucide-react';

export default function MembershipOnboardingModal({ isOpen, onClose, onCompleteOnboarding, onOpenEmailConfirmation }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [selectedTier, setSelectedTier] = useState('beta_founder'); // Default to 100-Member Beta Founder Pass!
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'ach' | 'crypto'
  const [step, setStep] = useState(1); // 1: Tier & Form, 2: Payment, 3: Confirmation


  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('Hedge Fund Manager');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');


  if (!isOpen) return null;

  const proPrice = billingCycle === 'annual' ? 119 : 149;
  const terminalPrice = billingCycle === 'annual' ? 399 : 499;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!fullName || !email) {
        alert('Please fill in your full name and work email address.');
        return;
      }

      if (!password) {
        alert('Please create a password for your account.');
        return;
      }

      if (password.length < 4) {
        alert('Password must be at least 4 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match. Please verify your password entry.');
        return;
      }

      const generatedApiKey = `BCC-${selectedTier === 'beta_founder' ? 'FOUNDER' : selectedTier.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

      const userRecord = {
        name: fullName,
        email,
        password,
        tier: selectedTier === 'beta_founder' ? 'BETA FOUNDER PASS (ACTIVE VIP)' : selectedTier.toUpperCase(),
        org: organization || 'Special Situations Desk',
        apiKey: generatedApiKey
      };

      // Save user to localStorage for instant sign-in authentication!
      try {
        const storedUsers = JSON.parse(localStorage.getItem('bc_registered_users') || '[]');
        storedUsers.push(userRecord);
        localStorage.setItem('bc_registered_users', JSON.stringify(storedUsers));
      } catch (err) {}

      // If Beta Founder Pass (NO credit card required), jump directly to Confirmation & API Key!
      if (selectedTier === 'beta_founder') {
        setStep(3);
        if (onCompleteOnboarding) {
          onCompleteOnboarding(userRecord);
        }
        return;
      }

      setStep(2);
    } else if (step === 2) {
      setStep(3);
      const generatedApiKey = `BCC-${selectedTier.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const userRecord = {
        name: fullName,
        email,
        password,
        tier: selectedTier.toUpperCase(),
        org: organization || 'Special Situations Desk',
        apiKey: generatedApiKey
      };
      if (onCompleteOnboarding) {
        onCompleteOnboarding(userRecord);
      }
    }
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
      zIndex: 200,
      padding: '24px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #090D16 100%)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '920px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(239,68,68,0.15)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#EF4444', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
            <Shield size={16} /> INSTITUTIONAL MEMBERSHIP & BETA FOUNDER ONBOARDING
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
            {step === 1 && 'Select Your Distress Intelligence Tier'}
            {step === 2 && 'Secure Payment Details & Checkout'}
            {step === 3 && 'Membership Confirmed & API Key Issued'}
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
            Gain real-time access to US Federal PACER filings, Section 363 auctions, and corporate distress analytics.
          </p>
        </div>

        {/* STEP 1: TIER SELECTOR & SUBSCRIBER INFO */}
        {step === 1 && (
          <div style={{ padding: '28px 32px' }}>
            
            {/* TIER 1: FEATURED BETA FOUNDER PASS (NO CREDIT CARD REQUIRED + COUNTDOWN) */}
            <div 
              onClick={() => setSelectedTier('beta_founder')}
              style={{ 
                background: selectedTier === 'beta_founder' 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.2) 100%)' 
                  : 'rgba(16, 185, 129, 0.08)', 
                padding: '20px 24px', 
                borderRadius: '14px', 
                border: selectedTier === 'beta_founder' ? '2.5px solid #10B981' : '1.5px solid rgba(16, 185, 129, 0.4)', 
                marginBottom: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedTier === 'beta_founder' ? '0 0 25px rgba(16, 185, 129, 0.3)' : 'none',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="#10B981" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FFF', margin: 0 }}>
                    100-Member Beta Founder Pass
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#10B981', color: '#000', fontSize: '0.68rem', fontWeight: 900, padding: '3px 10px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    🌟 NO CREDIT CARD REQUIRED
                  </span>
                  <span style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#FCD34D', fontSize: '0.68rem', fontWeight: 900, padding: '3px 10px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    🔥 87 / 100 SPOTS REMAINING
                  </span>
                </div>
              </div>

              {/* Scarcity Progress Bar */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#A7F3D0', fontWeight: 800, marginBottom: '4px' }}>
                  <span>Beta Founder Seat Availability</span>
                  <span>13% Claimed (13 of 100 Reserved)</span>
                </div>
                <div style={{ width: '100%', background: 'rgba(7, 10, 15, 0.6)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '13%', background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)', height: '100%' }}></div>
                </div>
              </div>

              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10B981', marginBottom: '8px' }}>
                $0.00 <span style={{ fontSize: '0.85rem', color: '#A7F3D0', fontWeight: 600 }}>/ Free Duration of Beta</span>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
                Exclusive invitation for our first 100 early adopters. Get instant 100% free access to live PACER court dockets, Section 363 auctions, and 24/7 SMS alerts during Beta. When Beta ends, unlock an <strong>exclusive 50% OFF your 1st-Year Annual Pass</strong> (if paid annually in advance).
              </p>

              <div style={{ marginTop: '14px', display: 'flex', gap: '16px', fontSize: '0.78rem', color: '#10B981', fontWeight: 800, flexWrap: 'wrap' }}>
                <span>✓ Zero Payment / No Credit Card</span>
                <span>✓ Unlocks 50% OFF 1st Year Annual Pass</span>
                <span>✓ Direct Product Desk Access</span>
              </div>
            </div>

            {/* Billing Cycle Toggle for Paid Tiers */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#F8FAFC' }}>
                Standard Tiers:
              </div>

              <div style={{ background: 'rgba(15,23,42,0.9)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-subtle)', display: 'flex', gap: '4px' }}>
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    border: 'none',
                    background: billingCycle === 'monthly' ? '#EF4444' : 'transparent',
                    color: billingCycle === 'monthly' ? '#FFFFFF' : '#94A3B8',
                    cursor: 'pointer'
                  }}
                >
                  Monthly Billing
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    border: 'none',
                    background: billingCycle === 'annual' ? '#EF4444' : 'transparent',
                    color: billingCycle === 'annual' ? '#FFFFFF' : '#94A3B8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  Annual Billing <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 900 }}>SAVE 20%</span>
                </button>
              </div>
            </div>

            {/* Tier Comparison Grid (3 Columns: Registered Free, PRO, TERMINAL) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
              
              {/* REGISTERED FREE TIER */}
              <div 
                onClick={() => setSelectedTier('free')}
                style={{
                  background: selectedTier === 'free' ? 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(15,23,42,0.9) 100%)' : 'rgba(15,23,42,0.4)',
                  border: selectedTier === 'free' ? '2px solid #3B82F6' : '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '18px',
                  cursor: 'pointer',
                  transition: 'var(--transition-normal)'
                }}
              >
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#60A5FA', marginBottom: '2px' }}>REGISTERED FREE</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '10px' }}>Basic Platform Access</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFF', marginBottom: '10px' }}>
                  $0.00 <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>/ Free Always</span>
                </div>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', color: '#CBD5E1' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#3B82F6" /> Main $10M+ Public Feed</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#3B82F6" /> 1-Click Google AI Briefs</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#3B82F6" /> Sector & Cause Filtering</li>
                </ul>
              </div>

              {/* PRO TIER */}
              <div 
                onClick={() => setSelectedTier('pro')}
                style={{
                  background: selectedTier === 'pro' ? 'linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%)' : 'rgba(15,23,42,0.4)',
                  border: selectedTier === 'pro' ? '2px solid #EF4444' : '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '18px',
                  cursor: 'pointer',
                  transition: 'var(--transition-normal)'
                }}
              >
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#F8FAFC', marginBottom: '2px' }}>PRO SUBSCRIBER</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '10px' }}>For Analysts & Attorneys</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFF', marginBottom: '10px' }}>
                  ${proPrice} <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>/ mo</span>
                </div>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', color: '#CBD5E1' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#EF4444" /> Real-Time PACER Alerts</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#EF4444" /> Native PDF Docket Viewer</li>
                </ul>
              </div>

              {/* TERMINAL TIER */}
              <div 
                onClick={() => setSelectedTier('terminal')}
                style={{
                  background: selectedTier === 'terminal' ? 'linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%)' : 'rgba(15,23,42,0.4)',
                  border: selectedTier === 'terminal' ? '2px solid #C084FC' : '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '18px',
                  cursor: 'pointer',
                  transition: 'var(--transition-normal)'
                }}
              >
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#C084FC', marginBottom: '2px' }}>TERMINAL API</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '10px' }}>For Funds & Desks</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFF', marginBottom: '10px' }}>
                  ${terminalPrice} <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>/ mo</span>
                </div>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', color: '#CBD5E1' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#C084FC" /> Full REST & Webhook API</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#C084FC" /> Deploy Sub-$10M Crawlers</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#C084FC" /> 5 Multi-Seat Licenses</li>
                </ul>
              </div>
            </div>

            {/* Specialized Industry Solution Passes */}
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '12px' }}>
              Specialized Industry Solution Passes:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
              
              {/* HEADHUNTER TALENT PASS */}
              <div 
                onClick={() => setSelectedTier('headhunter')}
                style={{
                  background: selectedTier === 'headhunter' ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(15,23,42,0.9) 100%)' : 'rgba(15,23,42,0.5)',
                  border: selectedTier === 'headhunter' ? '2px solid #EF4444' : '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '12px',
                  padding: '18px',
                  cursor: 'pointer',
                  transition: 'var(--transition-normal)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#FCA5A5' }}>🎯 HEADHUNTER PASS</div>
                  <span style={{ background: '#EF4444', color: '#FFF', fontSize: '0.62rem', fontWeight: 900, padding: '2px 6px', borderRadius: '4px' }}>RECRUITERS</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '10px' }}>Executive Talent Raid & KERP Tracker</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF', marginBottom: '10px' }}>
                  $299 <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>/ mo</span>
                </div>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem', color: '#CBD5E1' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#EF4444" /> Full KERP Bonus Disclosures</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#EF4444" /> 250 Monthly Credits</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#EF4444" /> LinkedIn Boolean Generator</li>
                </ul>
              </div>

              {/* MEDIA & PRESS WIRE PASS */}
              <div 
                onClick={() => setSelectedTier('media')}
                style={{
                  background: selectedTier === 'media' ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(15,23,42,0.9) 100%)' : 'rgba(15,23,42,0.5)',
                  border: selectedTier === 'media' ? '2px solid #F59E0B' : '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '12px',
                  padding: '18px',
                  cursor: 'pointer',
                  transition: 'var(--transition-normal)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#FCD34D' }}>📰 MEDIA WIRE PASS</div>
                  <span style={{ background: '#F59E0B', color: '#000', fontSize: '0.62rem', fontWeight: 900, padding: '2px 6px', borderRadius: '4px' }}>PRESS & X</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '10px' }}>Instant AI Newsroom Studio</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF', marginBottom: '10px' }}>
                  $149 <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>/ mo</span>
                </div>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem', color: '#CBD5E1' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#F59E0B" /> AP Wire & X Thread Generator</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#F59E0B" /> Embeddable SVG Infographics</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#F59E0B" /> Real-time 8-K Feed</li>
                </ul>
              </div>

              {/* ENTERPRISE SALES CONQUEST PASS */}
              <div 
                onClick={() => setSelectedTier('conquest')}
                style={{
                  background: selectedTier === 'conquest' ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(15,23,42,0.9) 100%)' : 'rgba(15,23,42,0.5)',
                  border: selectedTier === 'conquest' ? '2px solid #10B981' : '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '18px',
                  cursor: 'pointer',
                  transition: 'var(--transition-normal)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#A7F3D0' }}>⚡ SALES CONQUEST</div>
                  <span style={{ background: '#10B981', color: '#000', fontSize: '0.62rem', fontWeight: 900, padding: '2px 6px', borderRadius: '4px' }}>SALES VPS</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '10px' }}>Stranded Customer & Account Poaching</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF', marginBottom: '10px' }}>
                  $499 <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>/ mo</span>
                </div>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem', color: '#CBD5E1' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#10B981" /> Docket #1 Top Unsecured Buyers</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Check size={12} color="#10B981" /> Section 365 Battlecard Generator</li>
                </ul>
              </div>
            </div>



            {/* Subscriber Contact Details Form */}
            <form onSubmit={handleNextStep}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>FULL NAME *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Alexander Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>WORK EMAIL *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="vance@citadelcap.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#FCD34D', marginBottom: '6px' }}>CREATE ACCOUNT PASSWORD / SECURITY PIN *</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="Set your account password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#FCD34D', marginBottom: '6px' }}>CONFIRM PASSWORD *</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="Confirm your password..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                  />
                  <div style={{ marginTop: '4px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.7rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      {showPassword ? "🔒 Hide Password Characters" : "👁️ Show Password Characters"}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>DIRECT PHONE / SMS ALERTS *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+1 (212) 555-0192"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>


                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>FIRM / ORGANIZATION</label>
                  <input 
                    type="text" 
                    placeholder="Citadel Special Situations Fund"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>PRIMARY ROLE</label>
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                  >
                    <option value="Hedge Fund Manager">Hedge Fund Manager / Analyst</option>
                    <option value="Bankruptcy Attorney">Distressed Debt / Restructuring Attorney</option>
                    <option value="Commercial Landlord">Commercial Real Estate Landlord</option>
                    <option value="Asset Liquidator">Equipment & Asset Liquidator</option>
                    <option value="M&A Advisory">M&A / Restructuring Advisor</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="btn-primary"
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  fontSize: '0.95rem', 
                  justifyContent: 'center',
                  background: selectedTier === 'beta_founder' ? 'linear-gradient(135deg, #10B981 0%, #047857 100%)' : undefined,
                  fontWeight: 900,
                  boxShadow: selectedTier === 'beta_founder' ? '0 0 20px rgba(16, 185, 129, 0.4)' : undefined
                }}
              >
                {selectedTier === 'beta_founder' 
                  ? '🚀 Claim Free Beta Founder Pass (No Credit Card Required) →' 
                  : 'Proceed to Secure Checkout →'
                }
              </button>


            </form>

          </div>
        )}

        {/* STEP 2: SECURE PAYMENT GATEWAY */}
        {step === 2 && (
          <div style={{ padding: '32px' }}>
            
            {/* Payment Method Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              <button
                onClick={() => setPaymentMethod('card')}
                style={{
                  background: paymentMethod === 'card' ? 'rgba(239,68,68,0.15)' : 'rgba(15,23,42,0.6)',
                  border: paymentMethod === 'card' ? '1.5px solid #EF4444' : '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px',
                  color: '#F8FAFC',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <CreditCard size={16} color="#EF4444" /> Credit Card (Stripe)
              </button>

              <button
                onClick={() => setPaymentMethod('ach')}
                style={{
                  background: paymentMethod === 'ach' ? 'rgba(239,68,68,0.15)' : 'rgba(15,23,42,0.6)',
                  border: paymentMethod === 'ach' ? '1.5px solid #EF4444' : '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px',
                  color: '#F8FAFC',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Building size={16} color="#10B981" /> Corporate ACH / Wire
              </button>

              <button
                onClick={() => setPaymentMethod('crypto')}
                style={{
                  background: paymentMethod === 'crypto' ? 'rgba(239,68,68,0.15)' : 'rgba(15,23,42,0.6)',
                  border: paymentMethod === 'crypto' ? '1.5px solid #EF4444' : '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px',
                  color: '#F8FAFC',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <QrCode size={16} color="#F59E0B" /> Crypto (USDC / BTC)
              </button>
            </div>

            <form onSubmit={handleNextStep}>
              {paymentMethod === 'card' && (
                <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>CARD NUMBER</label>
                    <input 
                      type="text" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      style={{ width: '100%', background: 'rgba(9,13,22,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>EXPIRATION DATE</label>
                      <input 
                        type="text" 
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        style={{ width: '100%', background: 'rgba(9,13,22,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>CVC SECURITY CODE</label>
                      <input 
                        type="text" 
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        style={{ width: '100%', background: 'rgba(9,13,22,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'ach' && (
                <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px', marginBottom: '24px', fontSize: '0.85rem', color: '#CBD5E1' }}>
                  <p style={{ margin: '0 0 10px 0', fontWeight: 700, color: '#10B981' }}>🏦 Corporate ACH / Wire Remittance Instructions:</p>
                  <div>Bank: <strong>JPMorgan Chase N.A.</strong></div>
                  <div>Account Name: <strong>Business Collapse Intelligence LLC</strong></div>
                  <div>Routing Number: <strong>021000021</strong></div>
                  <div>Account Number: <strong>88392019482</strong></div>
                  <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#94A3B8' }}>Instant 14-day provisional access granted upon submission.</div>
                </div>
              )}

              {paymentMethod === 'crypto' && (
                <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px', marginBottom: '24px', fontSize: '0.85rem', color: '#CBD5E1' }}>
                  <p style={{ margin: '0 0 10px 0', fontWeight: 700, color: '#F59E0B' }}>⚡ USDC (ERC-20 / Solana) & Bitcoin Pay:</p>
                  <div style={{ background: '#090D16', padding: '10px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#F8FAFC', marginBottom: '8px' }}>
                    0x8892A41C902931F90283748291039E889381029F
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Auto-detected on 2 network confirmations.</div>
                </div>
              )}

              <div style={{ background: selectedTier === 'trial_7day' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239,68,68,0.1)', border: selectedTier === 'trial_7day' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '12px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 800 }}>Total Due Today:</div>
                  {selectedTier === 'trial_7day' && (
                    <div style={{ fontSize: '0.72rem', color: '#FCD34D', marginTop: '2px' }}>
                      7-Day All-Access VIP Trial • $0 Charged Today • Cancel 1-Click Anytime in Account Vault
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: selectedTier === 'trial_7day' ? '#F59E0B' : '#EF4444' }}>
                  ${selectedTier === 'trial_7day' ? '0.00' : (selectedTier === 'pro' ? proPrice : terminalPrice) + '.00'}
                </div>
              </div>


              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid var(--border-subtle)', color: '#F8FAFC', padding: '12px 20px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Back
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                  style={{ 
                    flex: 1, 
                    padding: '12px', 
                    fontSize: '0.92rem', 
                    justifyContent: 'center',
                    background: selectedTier === 'trial_7day' ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : undefined,
                    color: selectedTier === 'trial_7day' ? '#FFF' : undefined,
                    fontWeight: 900
                  }}
                >
                  <Lock size={15} /> {selectedTier === 'trial_7day' ? '⭐ Activate 7-Day Risk-Free VIP Trial' : 'Complete Order & Activate Tier'}
                </button>
              </div>

            </form>

          </div>
        )}

        {/* STEP 3: CONFIRMATION & API KEY DISPATCH */}
        {step === 3 && (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(16,185,129,0.15)', border: '2px solid #10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 0 25px rgba(16,185,129,0.4)' }}>
              <CheckCircle2 size={36} color="#10B981" />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#F8FAFC', marginBottom: '6px' }}>
              {selectedTier === 'beta_founder' ? '🌟 BETA FOUNDER PASS CLAIMED & ACTIVATED!' : 'Welcome to Business Collapse Intelligence!'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', maxWidth: '540px', margin: '0 auto 24px' }}>
              Your <strong>{selectedTier === 'beta_founder' ? '100-MEMBER BETA FOUNDER PASS' : selectedTier.toUpperCase()}</strong> has been issued to <strong>{fullName || 'Beta Founder'}</strong> ({organization || 'Institutional Subscriber'}).
            </p>

            {/* OFFICIAL BETA FOUNDER CERTIFICATE CARD */}
            {selectedTier === 'beta_founder' ? (
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)', 
                border: '2px solid #10B981', 
                borderRadius: '16px', 
                padding: '24px', 
                maxWidth: '560px', 
                margin: '0 auto 28px', 
                textAlign: 'left',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.25)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid rgba(16,185,129,0.3)', paddingBottom: '10px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={14} color="#10B981" /> OFFICIAL BETA FOUNDER CERTIFICATE
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#000', background: '#10B981', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    SEAT #14 OF 100 RESERVED
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#F8FAFC', marginBottom: '12px', lineHeight: 1.6 }}>
                  <div>• <strong>Active Tier:</strong> <span style={{ color: '#10B981', fontWeight: 800 }}>100-Member Beta Founder Pass (100% Free Duration of Beta)</span></div>
                  <div>• <strong>Payment Status:</strong> <span style={{ color: '#A7F3D0' }}>$0.00 / Zero Credit Card Required</span></div>
                  <div>• <strong>Locked-In Post-Beta Discount:</strong> <span style={{ color: '#FCD34D', fontWeight: 800 }}>50% OFF 1st-Year Annual Pass ($59/mo Billed Annually)</span></div>
                </div>

                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>
                  YOUR VIP FOUNDER API KEY:
                </div>
                <div style={{ background: '#090D16', border: '1px solid #10B981', borderRadius: '8px', padding: '12px 16px', fontFamily: 'monospace', fontSize: '1.05rem', fontWeight: 900, color: '#10B981', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>BCC-FOUNDER-8849-9910</span>
                  <span style={{ fontSize: '0.7rem', color: '#000', background: '#10B981', padding: '3px 8px', borderRadius: '4px', fontWeight: 900 }}>ACTIVE VIP</span>
                </div>
              </div>
            ) : (
              <div style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px', maxWidth: '520px', margin: '0 auto 28px', textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>YOUR INSTITUTIONAL API & ACCESS KEY:</div>
                <div style={{ background: '#090D16', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '6px', padding: '12px', fontFamily: 'monospace', fontSize: '1rem', fontWeight: 800, color: '#EF4444', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>BCC-{selectedTier.toUpperCase()}-8849-9910</span>
                  <span style={{ fontSize: '0.7rem', color: '#10B981', background: 'rgba(16,185,129,0.15)', padding: '2px 8px', borderRadius: '4px' }}>ACTIVE</span>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenEmailConfirmation) {
                    onOpenEmailConfirmation({
                      name: fullName || 'Alexander Vance',
                      email: email || 'subscriber@citadelcap.com',
                      org: organization || 'Citadel Special Situations Desk',
                      apiKey: `BCC-${selectedTier === 'beta_founder' ? 'FOUNDER' : selectedTier.toUpperCase()}-8849-9910`
                    });
                  }
                }}
                style={{
                  background: 'rgba(30, 41, 59, 0.9)',
                  color: '#F8FAFC',
                  border: '1px solid var(--border-subtle)',
                  padding: '14px 24px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                📧 Preview Confirmation Email Dispatch
              </button>

              <button
                onClick={onClose}
                className="btn-primary"
                style={{ 
                  padding: '14px 36px', 
                  fontSize: '0.95rem',
                  background: selectedTier === 'beta_founder' ? 'linear-gradient(135deg, #10B981 0%, #047857 100%)' : undefined,
                  fontWeight: 900,
                  boxShadow: selectedTier === 'beta_founder' ? '0 0 25px rgba(16,185,129,0.4)' : undefined
                }}
              >
                Enter Terminal & Access Vault <Sparkles size={16} />
              </button>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
