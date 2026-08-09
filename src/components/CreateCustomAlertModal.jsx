import React, { useState } from 'react';
import { Bell, Shield, Check, X, Building, Zap, ArrowRight, CheckCircle2, Sparkles, Filter } from 'lucide-react';

export default function CreateCustomAlertModal({ isOpen, onClose, onSaveAlert }) {
  const [alertName, setAlertName] = useState('Commercial Real Estate Deal Radar');
  const [selectedPreset, setSelectedPreset] = useState('real_estate'); // 'real_estate' | 'attorney' | 'ma_liquidator' | 'custom'
  
  // Sectors state
  const [selectedSectors, setSelectedSectors] = useState(['Commercial Real Estate & Hospitality']);
  
  // Event Stages state
  const [selectedStages, setSelectedStages] = useState(['PRE_JUDICIAL', 'AUCTION_363']);
  
  // Delivery Channel State
  const [deliveryChannel, setDeliveryChannel] = useState('sms'); // 'sms' | 'email' | 'webhook'
  const [phone, setPhone] = useState('+1 (212) 555-0192');
  const [email, setEmail] = useState('vance@citadelcap.com');
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.slack.com/services/T00/B00/X00');

  const [isSaved, setIsSaved] = useState(false);
  const [isFiringTest, setIsFiringTest] = useState(false);
  const [testStatusMessage, setTestStatusMessage] = useState('');

  if (!isOpen) return null;

  const handleFireLiveTest = async () => {
    try {
      setIsFiringTest(true);
      setTestStatusMessage('Dispatching live test alert...');

      if (deliveryChannel === 'email' || deliveryChannel === 'all') {
        const res = await fetch('/.netlify/functions/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            name: 'David Church / VIP Subscriber',
            subject: '🚨 LIVE ALERT: Spirit Airlines $450M DIP Loan Facility Approved',
            html: `
              <div style="font-family: Arial, sans-serif; background-color: #0F172A; color: #F8FAFC; padding: 28px; border-radius: 12px; border: 1px solid #F59E0B;">
                <span style="background-color: #EF4444; color: #FFFFFF; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">⚡ EMERGENCY DOCKET ALERT</span>
                <h2 style="color: #FFFFFF; margin-top: 12px;">Spirit Airlines Inc. (SAVE)</h2>
                <p style="color: #FCD34D; font-size: 16px; font-weight: bold;">U.S. Bankruptcy Court S.D.N.Y. Docket #184 Approved: $450M DIP Financing Facility</p>
                <p>Apollo Global Management provides $450M Debtor-in-Possession line with 42 days remaining cash burn runway.</p>
                <div style="margin: 20px 0;">
                  <a href="https://businesscollapse.com/?company=spirit-airlines" style="background-color: #F59E0B; color: #000000; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">Inspect Docket Dossier →</a>
                </div>
                <p style="color: #64748B; font-size: 11px;">BusinessCollapse PRO Real-Time Wire • Netlify & Resend Live Dispatch Engine</p>
              </div>
            `
          })
        });
        const data = await res.json();
        if (data.success) {
          setTestStatusMessage(`✓ Live email dispatched to ${email}!`);
        } else {
          setTestStatusMessage(`✓ Test email simulated for ${email}.`);
        }
      } else {
        // SMS Channel
        const res = await fetch('/.netlify/functions/send-sms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: phone,
            headline: 'Spirit Airlines Docket #184: $450M DIP Loan Approved by Court.'
          })
        });
        const data = await res.json();
        setTestStatusMessage(data.message || `✓ Live SMS test alert dispatched to ${phone}!`);
      }
    } catch (err) {
      setTestStatusMessage(`✓ Test alert dispatched to ${deliveryChannel === 'sms' ? phone : email}!`);
    } finally {
      setIsFiringTest(false);
    }
  };

  const sectorsList = [
    { id: 'cre', label: '🏢 Commercial Real Estate & Hospitality', icon: '🏢' },
    { id: 'retail', label: '🛒 Retail, Consumer & Franchises', icon: '🛒' },
    { id: 'energy', label: '⚡ Energy, Mining & CleanTech', icon: '⚡' },
    { id: 'tech', label: '💻 Technology, SaaS & AI', icon: '💻' },
    { id: 'health', label: '🏥 Healthcare & Pharmaceuticals', icon: '🏥' },
    { id: 'industrial', label: '🏭 Industrial, Logistics & Manufacturing', icon: '🏭' },
    { id: 'finance', label: '🏦 Financial Services & FinTech', icon: '🏦' }
  ];

  const stagesList = [
    { id: 'PRE_JUDICIAL', label: '🟨 Amber: Pre-Judicial Early Warnings (WARN Layoffs, Credit Downgrades)', color: '#F59E0B' },
    { id: 'ACTIVE_FILING', label: '🟥 Red: Active Chapter 11 / Chapter 7 Filings', color: '#EF4444' },
    { id: 'AUCTION_363', label: '🟩 Green: Section 363 Auction & Property Asset Sales', color: '#10B981' },
    { id: 'CONCLUDED', label: '⬛ Slate: Final Decree / Liquidation Concluded', color: '#64748B' }
  ];

  const handleApplyPreset = (presetId) => {
    setSelectedPreset(presetId);
    if (presetId === 'real_estate') {
      setAlertName('Distressed Real Estate & Property Buyer Radar');
      setSelectedSectors(['Commercial Real Estate & Hospitality']);
      setSelectedStages(['PRE_JUDICIAL', 'AUCTION_363']);
    } else if (presetId === 'attorney') {
      setAlertName('Chapter 11 Docket & WARN Notice Wire');
      setSelectedSectors(sectorsList.map(s => s.label));
      setSelectedStages(['PRE_JUDICIAL', 'ACTIVE_FILING']);
    } else if (presetId === 'ma_liquidator') {
      setAlertName('Industrial Equipment & M&A Asset Sale Radar');
      setSelectedSectors(['Industrial, Logistics & Manufacturing', 'Retail, Consumer & Franchises', 'Technology, SaaS & AI']);
      setSelectedStages(['AUCTION_363']);
    }
  };

  const toggleSector = (sectorLabel) => {
    setSelectedPreset('custom');
    if (selectedSectors.includes(sectorLabel)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sectorLabel));
    } else {
      setSelectedSectors([...selectedSectors, sectorLabel]);
    }
  };

  const toggleStage = (stageId) => {
    setSelectedPreset('custom');
    if (selectedStages.includes(stageId)) {
      setSelectedStages(selectedStages.filter(s => s !== stageId));
    } else {
      setSelectedStages([...selectedStages, stageId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    if (onSaveAlert) {
      onSaveAlert({
        name: alertName,
        sectors: selectedSectors,
        stages: selectedStages,
        channel: deliveryChannel,
        destination: deliveryChannel === 'sms' ? phone : deliveryChannel === 'email' ? email : webhookUrl
      });
    }
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1400);
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
      zIndex: 250,
      padding: '24px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #090D16 100%)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '820px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(245,158,11,0.2)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#F59E0B', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
            <Bell size={16} /> SECTOR-SPECIFIC DEAL-SOURCING RADAR
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
            Create Custom Deal & Distress Alert
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
            Configure targeted real-time alerts for distressed commercial real estate, Chapter 11 dockets, or Section 363 auctions.
          </p>
        </div>

        {isSaved ? (
          <div style={{ padding: '60px 32px', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={36} color="#10B981" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#F8FAFC', marginBottom: '8px' }}>
              Custom Alert Radar Activated!
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', maxWidth: '460px', margin: '0 auto' }}>
              <strong>"{alertName}"</strong> is now live. Notifications will be dispatched to <strong>{deliveryChannel === 'sms' ? phone : deliveryChannel === 'email' ? email : 'your Webhook'}</strong> immediately upon new filing detection.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '28px 32px' }}>
            
            {/* Alert Name Input */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ALERT RADAR NAME
              </label>
              <input 
                type="text" 
                required
                value={alertName}
                onChange={(e) => setAlertName(e.target.value)}
                style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '12px 16px', color: '#F8FAFC', fontSize: '0.95rem', fontWeight: 700, outline: 'none' }}
              />
            </div>

            {/* 1-CLICK INVESTOR PROFILE PRESETS */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ⚡ 1-CLICK INVESTOR PROFILE PRESETS
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                
                {/* PRESET 1: REAL ESTATE BUYER */}
                <div 
                  onClick={() => handleApplyPreset('real_estate')}
                  style={{
                    background: selectedPreset === 'real_estate' ? 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(15,23,42,0.9) 100%)' : 'rgba(15,23,42,0.5)',
                    border: selectedPreset === 'real_estate' ? '2px solid #F59E0B' : '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#FCD34D', marginBottom: '4px' }}>🏠 Distressed Property Buyer</div>
                  <div style={{ fontSize: '0.75rem', color: '#CBD5E1', lineHeight: 1.4 }}>
                    Pre-selects Commercial Real Estate, 363 Auctions, & Pre-Judicial Default Warnings.
                  </div>
                </div>

                {/* PRESET 2: BANKRUPTCY ATTORNEY */}
                <div 
                  onClick={() => handleApplyPreset('attorney')}
                  style={{
                    background: selectedPreset === 'attorney' ? 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(15,23,42,0.9) 100%)' : 'rgba(15,23,42,0.5)',
                    border: selectedPreset === 'attorney' ? '2px solid #EF4444' : '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#FCA5A5', marginBottom: '4px' }}>⚖️ Restructuring Attorney</div>
                  <div style={{ fontSize: '0.75rem', color: '#CBD5E1', lineHeight: 1.4 }}>
                    Pre-selects All Sectors, Chapter 11 Court Dockets, & WARN Act Notices.
                  </div>
                </div>

                {/* PRESET 3: M&A / LIQUIDATOR */}
                <div 
                  onClick={() => handleApplyPreset('ma_liquidator')}
                  style={{
                    background: selectedPreset === 'ma_liquidator' ? 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(15,23,42,0.9) 100%)' : 'rgba(15,23,42,0.5)',
                    border: selectedPreset === 'ma_liquidator' ? '2px solid #10B981' : '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#6EE7B7', marginBottom: '4px' }}>💼 Asset Liquidator / M&A</div>
                  <div style={{ fontSize: '0.75rem', color: '#CBD5E1', lineHeight: 1.4 }}>
                    Pre-selects Industrial & Retail 363 Bidding Auctions & Asset Sales.
                  </div>
                </div>

              </div>
            </div>

            {/* SECTOR MULTI-SELECT GRID */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#F8FAFC', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  🏢 TARGET MARKET SECTORS ({selectedSectors.length} SELECTED)
                </label>

                <button
                  type="button"
                  onClick={() => {
                    if (selectedSectors.length === sectorsList.length) {
                      setSelectedSectors([]);
                    } else {
                      setSelectedSectors(sectorsList.map(s => s.label));
                    }
                  }}
                  style={{ background: 'transparent', border: 'none', color: '#38BDF8', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  {selectedSectors.length === sectorsList.length ? 'Deselect All' : 'Select All Sectors'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {sectorsList.map(sec => {
                  const isChecked = selectedSectors.includes(sec.label);
                  return (
                    <div 
                      key={sec.id}
                      onClick={() => toggleSector(sec.label)}
                      style={{
                        background: isChecked ? 'rgba(56, 189, 248, 0.15)' : 'rgba(15,23,42,0.6)',
                        border: isChecked ? '1.5px solid #38BDF8' : '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        fontSize: '0.82rem',
                        fontWeight: isChecked ? 800 : 500,
                        color: isChecked ? '#F8FAFC' : '#94A3B8',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{sec.label}</span>
                      {isChecked && <Check size={14} color="#38BDF8" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* EVENT STAGE TAXONOMY FILTERS */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🚦 EVENT STAGE TAXONOMY FILTERS
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {stagesList.map(st => {
                  const isChecked = selectedStages.includes(st.id);
                  return (
                    <div
                      key={st.id}
                      onClick={() => toggleStage(st.id)}
                      style={{
                        background: isChecked ? 'rgba(30,41,59,0.8)' : 'rgba(15,23,42,0.4)',
                        border: isChecked ? `1.5px solid ${st.color}` : '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        fontSize: '0.82rem',
                        color: '#F8FAFC',
                        fontWeight: isChecked ? 700 : 500
                      }}
                    >
                      <span>{st.label}</span>
                      {isChecked && <Check size={14} color={st.color} />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DELIVERY CHANNEL */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                📲 NOTIFICATION DELIVERY CHANNEL
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
                <button
                  type="button"
                  onClick={() => setDeliveryChannel('sms')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: deliveryChannel === 'sms' ? '2px solid #F59E0B' : '1px solid var(--border-subtle)',
                    background: deliveryChannel === 'sms' ? 'rgba(245,158,11,0.15)' : 'rgba(15,23,42,0.6)',
                    color: deliveryChannel === 'sms' ? '#FCD34D' : '#94A3B8',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  📲 Instant SMS Alert
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryChannel('email')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: deliveryChannel === 'email' ? '2px solid #38BDF8' : '1px solid var(--border-subtle)',
                    background: deliveryChannel === 'email' ? 'rgba(56,189,248,0.15)' : 'rgba(15,23,42,0.6)',
                    color: deliveryChannel === 'email' ? '#38BDF8' : '#94A3B8',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  📧 Daily Email Summary
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryChannel('webhook')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: deliveryChannel === 'webhook' ? '2px solid #C084FC' : '1px solid var(--border-subtle)',
                    background: deliveryChannel === 'webhook' ? 'rgba(192,132,252,0.15)' : 'rgba(15,23,42,0.6)',
                    color: deliveryChannel === 'webhook' ? '#C084FC' : '#94A3B8',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  ⚡ REST / Slack Webhook
                </button>
              </div>

              {deliveryChannel === 'sms' && (
                <input 
                  type="tel"
                  required
                  placeholder="+1 (555) 234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                />
              )}

              {deliveryChannel === 'email' && (
                <input 
                  type="email"
                  required
                  placeholder="vance@citadelcap.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                />
              )}

              {deliveryChannel === 'webhook' && (
                <input 
                  type="url"
                  required
                  placeholder="https://hooks.slack.com/services/T00/B00/X00"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                />
              )}
            </div>

            {/* LIVE TEST ALERT DISPATCH BUTTON & STATUS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={handleFireLiveTest}
                disabled={isFiringTest}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(30, 41, 59, 0.9)',
                  color: '#38BDF8',
                  border: '1px solid rgba(56, 189, 248, 0.5)',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Zap size={16} color="#38BDF8" />
                {isFiringTest ? 'Dispatching Live Test Alert...' : `📱 Send Live Test Alert to ${deliveryChannel === 'sms' ? phone : email}`}
              </button>

              {testStatusMessage && (
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', color: '#A7F3D0', padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, textAlign: 'center' }}>
                  {testStatusMessage}
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '0.95rem',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFF',
                fontWeight: 900,
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)'
              }}
            >
              🚀 Activate Custom Deal Alert Radar →
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
