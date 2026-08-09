import React, { useState } from 'react';
import { X, Mail, Phone, MessageSquare, Volume2, ShieldAlert, CheckCircle2, User, Filter, ExternalLink, Calendar, Sparkles } from 'lucide-react';
import membersData from '../data/sandbox_members.json';

export default function MockNotificationHarvesterModal({
  isOpen,
  onClose,
  impersonatedUser
}) {
  const [activeTab, setActiveTab] = useState('emails'); // 'emails' | 'sms' | 'voice'
  const [filterMemberMode, setFilterMemberMode] = useState('all'); // 'all' | 'current'
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Generate Harvested Mock Notifications for Sandbox Members
  const mockEmails = [
    {
      id: 'email-01',
      recipientId: 'user-01',
      recipientName: 'Arthur Pendelton',
      recipientEmail: 'a.pendelton@apexrealtycap.com',
      recipientTier: 'pro',
      subject: '⚡ URGENT: WeWork (WE) Chapter 11 Lease Rejection Order Approved',
      timestamp: '2026-08-09 13:15 EST',
      previewText: 'Delaware Bankruptcy Court Judge approves rejection of 18 commercial lease agreements impacting CRE landlords...',
      bodyHtml: `
        <div style="font-family: sans-serif; background: #0F172A; color: #FFF; padding: 20px; border-radius: 10px; border: 1px solid #FF2A4B;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
            <strong style="color: #FF2A4B;">BUSINESSCOLLAPSE.COM PRO ALERT</strong>
            <span style="color: #94A3B8;">AUG 08, 2026 • DOCKET #19865</span>
          </div>
          <h2 style="color: #FFF; margin-top: 14px;">WeWork Chapter 11 Lease Rejection Approved</h2>
          <p style="color: #CBD5E1; line-height: 1.6;">Dear Arthur Pendelton,</p>
          <p style="color: #CBD5E1; line-height: 1.6;">As a PRO subscriber tracking <strong>Commercial Real Estate</strong>, our automated court crawlers have indexed Docket Entry #19865 in U.S. Bankruptcy Court District of New Jersey.</p>
          <div style="background: rgba(255,42,75,0.15); border-left: 4px solid #FF2A4B; padding: 12px; margin: 16px 0;">
            <strong>Order Details:</strong> Judge approves immediate rejection of 18 commercial workspace leases. Total lease cure claim pool set at $42.5M.
          </div>
          <p style="color: #94A3B8; font-size: 0.85rem;">You are receiving this automated alert based on your Watchlist item: WEWORK (WE).</p>
        </div>
      `
    },
    {
      id: 'email-02',
      recipientId: 'user-02',
      recipientName: 'Samantha Vance',
      recipientEmail: 'svance@aerodistress.io',
      recipientTier: 'enterprise',
      subject: '🚨 ENTERPRISE SIGNAL: Spirit Airlines (SAVE) Motion to Reject 28 Airbus Leases',
      timestamp: '2026-08-09 12:45 EST',
      previewText: 'Emergency PACER Filing: Spirit Airlines files Motion for Order authorizing rejection of 28 Airbus A320neo aircraft leases...',
      bodyHtml: `
        <div style="font-family: sans-serif; background: #0F172A; color: #FFF; padding: 20px; border-radius: 10px; border: 1px solid #EC4899;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
            <strong style="color: #EC4899;">ENTERPRISE SIGNAL DISPATCH</strong>
            <span style="color: #94A3B8;">AUG 08, 2026 • PACER EMERGENCY</span>
          </div>

          <h2 style="color: #FFF; margin-top: 14px;">Spirit Airlines Emergency Aircraft Motion</h2>
          <p style="color: #CBD5E1; line-height: 1.6;">Dear Samantha Vance,</p>
          <p style="color: #CBD5E1; line-height: 1.6;">Your Enterprise signal criteria triggered an emergency alert for <strong>Aviation Asset Collapses</strong>.</p>
          <div style="background: rgba(236,72,153,0.15); border-left: 4px solid #EC4899; padding: 12px; margin: 16px 0;">
            <strong>Aircraft Motion:</strong> Motion to Reject 28 Airbus A320neo Leases. Hearing set for Aug 06, 2026 @ 09:00 AM EST. PACER PDF Docket #004 attached to your portal.
          </div>
        </div>
      `
    },
    {
      id: 'email-03',
      recipientId: 'user-03',
      recipientName: 'Diego Ramirez',
      recipientEmail: 'diego@sunstateauctions.com',
      recipientTier: 'pro',
      subject: '🔨 BIDDER ACCESS PIN ISSUED: Tupperware Plastics Machinery Auction',
      timestamp: '2026-08-05 11:20 EST',
      previewText: 'Court-ordered Section 363 liquidation auction bid registration approved. Your Webcast Access PIN is #9942...',
      bodyHtml: `
        <div style="font-family: sans-serif; background: #0F172A; color: #FFF; padding: 20px; border-radius: 10px; border: 1px solid #10B981;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
            <strong style="color: #10B981;">BIDDER ACCESS PIN ISSUED</strong>
            <span style="color: #94A3B8;">AUG 05, 2026 • SECTION 363 SALE</span>
          </div>
          <h2 style="color: #FFF; margin-top: 14px;">Tupperware Global Equipment Auction</h2>
          <p style="color: #CBD5E1; line-height: 1.6;">Dear Diego Ramirez,</p>
          <p style="color: #CBD5E1; line-height: 1.6;">Your pre-registration for the court-ordered <strong>Tupperware Brands Plastics Molding Machinery Liquidation</strong> has been verified by the Bankruptcy Trustee.</p>
          <div style="background: rgba(16,185,129,0.15); border-left: 4px solid #10B981; padding: 12px; margin: 16px 0;">
            <strong>Bidder Access PIN:</strong> #9942-TUPQ<br />
            <strong>Stalker Horse Floor:</strong> $45,000,000 Credit Bid<br />
            <strong>Webcast Login:</strong> auctions.businesscollapse.com/portal/9942
          </div>
        </div>
      `
    }
  ];

  const mockSms = [
    {
      id: 'sms-01',
      recipientName: 'Samantha Vance (+1 305-555-0811)',
      text: '🚨 BUSINESSCOLLAPSE ENTERPRISE: Spirit Airlines (SAVE) filed Emergency Motion Docket #004 to reject 28 Airbus leases. View docket PDF: https://businesscollapse.com/pdf/spirit-004',
      timestamp: '12:45 PM'
    },
    {
      id: 'sms-02',
      recipientName: 'Harrison Forde (+1 212-555-8844)',
      text: '⚡ HIGH RISK RADAR: Commercial Real Estate Sector Risk Index reached 88/100. CMBS maturity wall triggers 14 new default warnings.',
      timestamp: '11:05 AM'
    }
  ];

  const mockVoiceCalls = [
    {
      id: 'voice-01',
      recipientName: 'Victoria Sterling (+44 20 7946 0912)',
      spokenText: 'Hello Victoria. This is your BusinessCollapse.com automated AI Voice Agent. Emergency update: Tupperware Brands has filed Chapter 11 in Delaware Court with $812 Million in debt.',
      timestamp: '01:30 PM',
      duration: '42s'
    }
  ];

  if (!isOpen) return null;

  const filteredEmails = mockEmails.filter(e => {
    if (filterMemberMode === 'current' && impersonatedUser) {
      return e.recipientId === impersonatedUser.id || e.recipientName.includes(impersonatedUser.name);
    }
    return true;
  });

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999, position: 'fixed', inset: 0, background: 'rgba(3, 7, 18, 0.88)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      
      <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '940px', maxHeight: '90vh', overflowY: 'auto', background: '#0B111E', border: '1px solid rgba(236, 72, 153, 0.4)', borderRadius: '16px', boxShadow: '0 25px 60px -15px rgba(236, 72, 153, 0.3)' }}>
        
        {/* Header Bar */}
        <div style={{ padding: '24px 30px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }}>
              <Mail size={22} color="#FFF" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFF' }}>Sandbox Notification & Email Harvester</h2>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#000', background: '#F472B6', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  75-MEMBER SIMULATED INBOX HUB
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Harvested outbound emails, SMS text alerts, and automated AI phone calls for sandbox members</p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '6px', borderRadius: '8px' }}>
            <X size={22} />
          </button>
        </div>

        {/* Sub-Navigation Tabs & Member Filter Switcher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.8)', padding: '8px 30px', borderBottom: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '12px' }}>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveTab('emails')}
              style={{
                background: activeTab === 'emails' ? 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)' : 'transparent',
                color: activeTab === 'emails' ? '#FFF' : 'var(--text-muted)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              📬 Harvested Emails ({filteredEmails.length})
            </button>

            <button
              onClick={() => setActiveTab('sms')}
              style={{
                background: activeTab === 'sms' ? 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)' : 'transparent',
                color: activeTab === 'sms' ? '#FFF' : 'var(--text-muted)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              📱 SMS Text Alerts ({mockSms.length})
            </button>

            <button
              onClick={() => setActiveTab('voice')}
              style={{
                background: activeTab === 'voice' ? 'linear-gradient(135deg, #10B981 0%, #047857 100%)' : 'transparent',
                color: activeTab === 'voice' ? '#FFF' : 'var(--text-muted)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              🎙️ AI Telephony Phone Calls ({mockVoiceCalls.length})
            </button>
          </div>

          {/* Member Filter Mode Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(7, 10, 15, 0.8)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>Filter Stream:</span>
            <button
              onClick={() => setFilterMemberMode('all')}
              style={{ background: filterMemberMode === 'all' ? '#7C3AED' : 'transparent', color: filterMemberMode === 'all' ? '#FFF' : 'var(--text-dim)', border: 'none', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer' }}
            >
              All 75 Sandbox Members
            </button>
            {impersonatedUser && (
              <button
                onClick={() => setFilterMemberMode('current')}
                style={{ background: filterMemberMode === 'current' ? '#EC4899' : 'transparent', color: filterMemberMode === 'current' ? '#FFF' : 'var(--text-dim)', border: 'none', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer' }}
              >
                Only {impersonatedUser.name.split(' ')[0]}
              </button>
            )}
          </div>

        </div>

        <div style={{ padding: '30px' }}>
          
          {activeTab === 'emails' && (
            <div style={{ display: 'grid', gridTemplateColumns: selectedNotification ? '320px 1fr' : '1fr', gap: '20px' }}>
              
              {/* Email Feed List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredEmails.map(email => (
                  <div
                    key={email.id}
                    onClick={() => setSelectedNotification(email)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      background: selectedNotification && selectedNotification.id === email.id ? 'rgba(236, 72, 153, 0.25)' : 'rgba(15, 23, 42, 0.7)',
                      border: selectedNotification && selectedNotification.id === email.id ? '1px solid #F472B6' : '1px solid var(--border-subtle)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F472B6' }}>To: {email.recipientName}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{email.timestamp}</span>
                    </div>

                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFF', marginBottom: '4px' }}>
                      {email.subject}
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {email.previewText}
                    </div>
                  </div>
                ))}
              </div>

              {/* Email Content Inspector */}
              {selectedNotification && (
                <div style={{ background: '#070A0F', border: '1px solid rgba(236, 72, 153, 0.4)', borderRadius: '12px', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>RECIPIENT: <strong style={{ color: '#FFF' }}>{selectedNotification.recipientName} ({selectedNotification.recipientEmail})</strong></div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>TIMESTAMP: <span style={{ fontFamily: 'var(--font-mono)' }}>{selectedNotification.timestamp}</span></div>
                    </div>
                    <button onClick={() => setSelectedNotification(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}><X size={18} /></button>
                  </div>

                  <div dangerouslySetInnerHTML={{ __html: selectedNotification.bodyHtml }} />
                </div>
              )}

            </div>
          )}

          {activeTab === 'sms' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {mockSms.map(sms => (
                <div key={sms.id} style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(124, 58, 237, 0.4)', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.75rem', color: '#C084FC', fontWeight: 800 }}>
                    <span>📱 TO: {sms.recipientName}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{sms.timestamp}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#FFF', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
                    "{sms.text}"
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'voice' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {mockVoiceCalls.map(call => (
                <div key={call.id} style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 800, marginBottom: '4px' }}>
                      🎙️ DISPATCHED TO: {call.recipientName} (Duration: {call.duration})
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#FFF', lineHeight: 1.5 }}>
                      "{call.spokenText}"
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if ('speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance(call.spokenText);
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                    style={{ background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)', color: '#FFF', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Volume2 size={16} /> Play Audio Call Out Loud
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
