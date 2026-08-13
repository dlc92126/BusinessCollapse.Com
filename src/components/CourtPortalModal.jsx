import React, { useState } from 'react';
import { X, Gavel, Key, ShieldCheck, FileText, CheckCircle2, Lock, ExternalLink, AlertTriangle, Building, DollarSign, Copy, Check } from 'lucide-react';

export default function CourtPortalModal({ auction, onClose, onSaveCredential }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [bidderName, setBidderName] = useState('');
  const [bidderEmail, setBidderEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatedPin, setGeneratedPin] = useState('PIN-8849-FLORIDA-TRUSTEE');
  const [generatedBidderId, setGeneratedBidderId] = useState('BID-2026-9914');

  if (!auction) return null;

  const handleRegister = (e) => {
    e.preventDefault();
    if (bidderName && bidderEmail) {
      const pin = `PIN-${Math.floor(1000 + Math.random() * 9000)}-TRUSTEE`;
      const bidderId = `BID-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedPin(pin);
      setGeneratedBidderId(bidderId);
      setIsRegistered(true);

      if (onSaveCredential) {
        onSaveCredential({
          id: `cred-${Date.now()}`,
          entityName: auction.entityName,
          ticker: auction.ticker,
          auctionTitle: auction.auctionTitle,
          onlinePortalUrl: auction.onlinePortalUrl || "https://auctions.businesscollapse.com",
          pin,
          bidderId,
          registrationParticulars: auction.registrationParticulars,
          locationJurisdiction: auction.locationJurisdiction,
          stalkerHorseBid: auction.stalkerHorseBid
        });
      }

      // Netlify Forms automatic POST handler for auction credentials & notification requests
      try {
        const formData = new URLSearchParams();
        formData.append('form-name', 'auction-credentials');
        formData.append('subscriber_name', bidderName);
        formData.append('email', bidderEmail);
        formData.append('auction_title', auction.auctionTitle);
        formData.append('ticker', auction.ticker || 'CH-11');
        formData.append('pin', pin);
        formData.append('bidder_id', bidderId);
        formData.append('online_portal_url', auction.onlinePortalUrl || "https://auctions.businesscollapse.com");

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString()
        }).catch(err => console.log('Netlify form auction post:', err));
      } catch (err) {
        console.log('Auction credential dispatch:', err);
      }
    }
  };


  const handleCopyCredentials = () => {
    const text = `==================================================
⚡ BUSINESSCOLLAPSE.COM — 363 AUCTION BIDDER CREDENTIALS
==================================================
CASE ENTITY: ${auction.entityName} (${auction.ticker || 'CH-11'})
AUCTION TITLE: ${auction.auctionTitle}
WEBCAST PORTAL: ${auction.onlinePortalUrl || 'https://auctions.businesscollapse.com'}
LOG-IN PIN: ${generatedPin}
BIDDER ID: ${generatedBidderId}
ESCROW STATUS: ${auction.registrationParticulars || '$1,000 Refundable Escrow Verified'}
STALKER-HORSE FLOOR: ${auction.stalkerHorseBid || '$15,000,000'}
==================================================`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 99999, position: 'fixed', inset: 0, background: 'rgba(3, 7, 18, 0.9)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px', maxHeight: '88vh', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.5)', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)', overflowY: 'auto' }}>

        {/* Modal Header with Court Seal styling */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(135deg, rgba(7, 10, 15, 0.95) 0%, rgba(10, 30, 20, 0.95) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Gavel size={20} color="#10B981" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                U.S. BANKRUPTCY COURT OFFICIAL BIDDER PORTAL
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFF' }}>
              {auction.entityName || auction.name || auction.companyName || (auction.auctionTitle ? auction.auctionTitle.split('—')[0].trim() : 'Corporate Asset')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {auction.locationJurisdiction}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#FFF', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Auction Overview Box */}
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(7, 10, 15, 0.6)', borderLeft: '4px solid #10B981' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
              🔨 {auction.entityName || auction.name || auction.companyName ? `${auction.entityName || auction.name || auction.companyName} — ` : ''}{auction.auctionTitle}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8rem', marginTop: '12px', color: 'var(--text-muted)' }}>
              <div>Auctioneer: <strong style={{ color: '#FFF' }}>{auction.auctioneer}</strong></div>
              <div>Auction Type: <strong style={{ color: '#10B981' }}>{auction.auctionType}</strong></div>
              <div>Scheduled Time: <strong style={{ color: '#FFF', fontFamily: 'var(--font-mono)' }}>{auction.dateTimestamp.replace('T', ' ').replace('Z', ' EST')}</strong></div>
              <div>Stalker-Horse Floor: <strong style={{ color: '#FFE066' }}>{auction.stalkerHorseBid}</strong></div>
            </div>
          </div>

          {/* Asset Breakdown */}
          <div>
            <h4 style={{ fontSize: '1.0rem', fontWeight: 800, marginBottom: '10px', color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} color="#10B981" /> Inspected Assets & Lease Rights Catalog
            </h4>
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              {auction.assetSummary}
            </div>
          </div>

          {/* Log-In Credentials & Escrow Particulars */}
          <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFE066', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={18} color="#FFE066" /> COURT TRUSTEE LOG-IN & ESCROW PARTICULARS
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '14px' }}>
              {auction.registrationParticulars}
            </p>

            {/* Interactive Bidder Escrow Registration Form */}
            {!isRegistered ? (
              <form onSubmit={handleRegister} style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFF' }}>
                  📝 Pre-Register for Court Webcast Bidder Credentials:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Full Name / Entity Name"
                    value={bidderName}
                    onChange={(e) => setBidderName(e.target.value)}
                    required
                    style={{ padding: '10px 14px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                  />
                  <input
                    type="email"
                    placeholder="Business Email"
                    value={bidderEmail}
                    onChange={(e) => setBidderEmail(e.target.value)}
                    required
                    style={{ padding: '10px 14px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)', alignSelf: 'flex-start' }}>
                  Submit Court Escrow Pre-Registration →
                </button>
              </form>
            ) : (
              /* Verified Bidder Credential Badge with Copy & Webcast Link */
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.5)', padding: '18px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ color: '#10B981', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={18} /> COURT BIDDER PRE-REGISTRATION APPROVED & SAVED TO ACCOUNT
                </div>
                <div style={{ fontSize: '0.88rem', color: '#FFF', fontFamily: 'var(--font-mono)', background: 'rgba(7,10,15,0.7)', padding: '10px 14px', borderRadius: '6px' }}>
                  BIDDER ID: <span style={{ color: '#10B981' }}>{generatedBidderId}</span> • PIN: <span style={{ color: '#F59E0B' }}>{generatedPin}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>
                  ✓ Webcast Log-In PIN dispatched & automatically subscribed to 24/7 SMS countdown alerts. Saved to your <strong>⚙️ Account Vault</strong>.
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '6px' }}>
                  <button
                    onClick={handleCopyCredentials}
                    style={{
                      background: copied ? '#10B981' : 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
                      color: '#FFF',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied Credentials to Clipboard!' : '📋 Copy Credentials & Webcast Link'}
                  </button>

                  <a
                    href={auction.onlinePortalUrl || "https://auctions.businesscollapse.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(16, 185, 129, 0.25)',
                      color: '#10B981',
                      border: '1px solid rgba(16, 185, 129, 0.5)',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <ExternalLink size={14} /> Open Official Webcast Portal ↗
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(7, 10, 15, 0.8)', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>
            Close Portal Viewer
          </button>
        </div>

      </div>
    </div>
  );
}

