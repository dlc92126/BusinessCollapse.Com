import React from 'react';
import { Gavel, ExternalLink, Calendar, MapPin, Key, ShieldCheck, DollarSign, Clock, AlertTriangle, ArrowLeft, Star } from 'lucide-react';

export default function AuctionDirectory({ auctions, onSelectAuction, onOpenPublicCatalog, onGoBack, watchlist = [], toggleWatchlist, onOpenDiligenceBrief }) {
  return (
    <div style={{ marginTop: '24px' }}>
      
      {/* Universal Back Button */}
      {onGoBack && (
        <button
          onClick={onGoBack}
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            color: '#F8FAFC',
            border: '1px solid var(--border-subtle)',
            padding: '8px 18px',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            transition: 'all 0.2s ease'
          }}
          className="glass-panel-interactive"
        >
          <ArrowLeft size={16} color="#EF4444" /> ← Back to Main Distress Wire
        </button>
      )}

      {/* Banner */}

      <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px', borderLeft: '4px solid #10B981', background: 'linear-gradient(135deg, rgba(16, 23, 36, 0.95) 0%, rgba(10, 30, 20, 0.8) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Gavel size={20} color="#10B981" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Court-Ordered Asset Auctions & Liquidation Directory
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
              Bankruptcy Auctions & Log-In Particulars
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px' }}>
              Official docket reference listing for upcoming physical and digital court auctions. Includes direct bidder registration portals, log-in credentials, escrow requirements, and stalker-horse floor bids.
            </p>
          </div>

          <div style={{ background: 'rgba(7, 10, 15, 0.7)', padding: '12px 18px', borderRadius: '10px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>ACTIVE COURT AUCTIONS</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10B981', fontFamily: 'var(--font-mono)' }}>{(auctions || []).length} Verified Lists</div>

          </div>
        </div>
      </div>

      {/* Grid of Auctions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '24px' }}>
        {(auctions || []).map((auction) => (

          <div
            key={auction.id}
            className="glass-panel glass-panel-interactive"
            style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(16, 185, 129, 0.35)' }}
          >
            <div>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFF' }}>{auction.entityName}</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                      {auction.ticker}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700, marginTop: '2px' }}>
                    Auctioneer: {auction.auctioneer}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {toggleWatchlist && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchlist(auction.id || auction.entityName);
                      }}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px' }}
                      title={watchlist && watchlist.includes(auction.id || auction.entityName) ? 'Remove from Watchlist' : 'Bookmark Auction to Watchlist'}
                    >
                      <Star
                        size={18}
                        color={watchlist && watchlist.includes(auction.id || auction.entityName) ? '#F59E0B' : 'var(--text-dim)'}
                        fill={watchlist && watchlist.includes(auction.id || auction.entityName) ? '#F59E0B' : 'none'}
                      />
                    </button>
                  )}
                  <span className={`status-badge ${auction.statusBadge}`}>
                    {auction.status}
                  </span>
                </div>
              </div>

              {/* Auction Title */}
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF', marginBottom: '14px', lineHeight: 1.3 }}>
                🔨 {auction.auctionTitle}
              </h4>

              {/* Date & Location Pill */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '0.75rem', marginBottom: '16px' }}>
                <span style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10B981', padding: '4px 10px', borderRadius: '6px', fontWeight: 700, border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} /> {auction.locationJurisdiction}
                </span>
                <span style={{ background: 'rgba(15, 23, 42, 0.8)', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontWeight: 700, border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> Auction: {auction.dateTimestamp ? auction.dateTimestamp.replace('T', ' ').replace('Z', ' EST') : '2026-08-15 10:00 EST'}
                </span>
                <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '4px 10px', borderRadius: '6px', fontWeight: 800, border: '1px solid rgba(56, 189, 248, 0.3)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> Refreshed: {auction.formattedTimestamp || (auction.dateTimestamp ? `${auction.dateTimestamp.replace('T', ' ')} EST` : `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} EST`)}
                </span>
              </div>


              {/* Asset Summary */}
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5, background: 'rgba(7, 10, 15, 0.5)', padding: '12px 14px', borderRadius: '8px', borderLeft: '3px solid #10B981' }}>
                <strong>Assets for Bidding:</strong> {auction.assetSummary}
              </p>

              {/* Log-In & Registration Particulars Box */}
              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '16px' }}>
                <div style={{ color: '#FFE066', fontWeight: 800, fontSize: '0.8rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Key size={14} color="#FFE066" /> LOG-IN & REGISTRATION PARTICULARS:
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
                  {auction.registrationParticulars}
                </div>
                <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Stalker-Horse Floor: <strong style={{ color: '#FFF' }}>{auction.stalkerHorseBid}</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons: Diligence Brief + Free Public Catalog + Gated Court Bidder Credentials */}
            <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => {
                  if (onOpenDiligenceBrief) onOpenDiligenceBrief(auction);
                }}
                style={{
                  width: '100%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10B981',
                  color: '#A7F3D0',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.2)'
                }}
              >
                📜 View Section 363 Diligence Brief
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={() => {
                    if (onOpenPublicCatalog) onOpenPublicCatalog(auction);
                  }}
                  className="btn-secondary"
                  style={{ justifyContent: 'center', fontSize: '0.78rem', background: 'rgba(15, 23, 42, 0.9)' }}
                >
                  👁️ Free Catalog
                </button>

                <button
                  onClick={() => {
                    if (onSelectAuction) onSelectAuction(auction);
                  }}
                  className="btn-primary"
                  style={{ justifyContent: 'center', background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)', fontSize: '0.78rem' }}
                >
                  🔐 Bidder Log-In <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



