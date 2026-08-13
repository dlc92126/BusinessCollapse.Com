import React, { useState } from 'react';
import { Star, Bell, AlertTriangle, ShieldAlert, CheckCircle2, ChevronRight, Trash2, Smartphone, ArrowLeft, Building, Flame, Gavel, Coins, Clock, Search, Layers } from 'lucide-react';
import sub10mCatalog from '../data/sub10m_companies.json';

export default function WatchlistTracker({
  companies = [],
  breakingNews = [],
  distressRadarStream = [],
  auctions = [],
  zombieCrypto = [],
  watchlist = [],
  toggleWatchlist,
  onSelectCompany,
  onSelectAuction,
  onGoBack
}) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Gather all starred assets from all platform streams
  const starredCompanies = (companies || []).filter(c => c && Array.isArray(watchlist) && (watchlist.includes(c.id) || watchlist.includes(c.ticker))).map(c => {
    let type = 'CHAPTER_11';
    let label = '🏢 CHAPTER 11 DOCKET';
    let color = '#EF4444';

    if (c.status === 'SUBCHAPTER_V') {
      type = 'SUBCHAPTER_V';
      label = '🏬 SUBCHAPTER V REORG';
      color = '#F59E0B';
    } else if (c.status === 'PRE_JUDICIAL') {
      type = 'PRE_JUDICIAL';
      label = '🔥 PRE-JUDICIAL LEAK';
      color = '#F59E0B';
    } else if (c.dipFinancing && c.dipFinancing.facilitySize) {
      type = 'DIP_LOAN';
      label = '💳 DIP FINANCING FACILITY';
      color = '#C084FC';
    }

    return {
      ...c,
      assetType: type,
      assetTypeLabel: label,
      badgeColor: color
    };
  });

  const starredSub10m = (sub10mCatalog || []).filter(s => s && Array.isArray(watchlist) && (watchlist.includes(s.id) || watchlist.includes(s.ticker))).map(s => ({
    ...s,
    assetType: 'SUBCHAPTER_V',
    assetTypeLabel: '🏬 SUB-$10M REORG',
    badgeColor: '#F59E0B'
  }));

  const starredLeaks = (breakingNews || []).filter(b => b && Array.isArray(watchlist) && watchlist.includes(b.id)).map(b => ({
    ...b,
    name: b.entityName || b.headline,
    assetType: 'PRE_JUDICIAL',
    assetTypeLabel: '🔥 PRE-JUDICIAL LEAK',
    badgeColor: '#F59E0B'
  }));

  const starredRadar = (distressRadarStream || []).filter(r => r && Array.isArray(watchlist) && watchlist.includes(r.id)).map(r => ({
    ...r,
    name: r.name || r.entityName,
    assetType: 'PRE_JUDICIAL',
    assetTypeLabel: '🔥 PRE-JUDICIAL HEATMAP LEAK',
    badgeColor: '#F59E0B'
  }));

  const starredAuctions = (auctions || []).filter(a => a && Array.isArray(watchlist) && watchlist.includes(a.id)).map(a => ({
    ...a,
    name: a.entityName || a.name || a.companyName || a.auctionTitle,
    assetType: 'AUCTION',
    assetTypeLabel: '🔨 363 COURT AUCTION',
    badgeColor: '#3B82F6'
  }));

  const starredCrypto = (zombieCrypto || []).filter(z => z && Array.isArray(watchlist) && watchlist.includes(z.id)).map(z => ({
    ...z,
    assetType: 'CRYPTO',
    assetTypeLabel: '💀 ZOMBIE CRYPTO',
    badgeColor: '#8B5CF6'
  }));

  // Deduplicate combined stream by asset ID
  const assetMap = new Map();
  [...starredCompanies, ...starredSub10m, ...starredLeaks, ...starredRadar, ...starredAuctions, ...starredCrypto].forEach(item => {
    if (item && item.id && !assetMap.has(item.id)) {
      assetMap.set(item.id, item);
    }
  });

  const allStarredAssets = Array.from(assetMap.values());

  // Filter by category tab
  const filteredAssets = allStarredAssets.filter(item => {
    if (selectedFilter !== 'ALL' && item.assetType !== selectedFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const name = (item.name || item.entityName || '').toLowerCase();
      const ticker = (item.ticker || '').toLowerCase();
      const summary = (item.summary || item.headline || '').toLowerCase();
      return name.includes(q) || ticker.includes(q) || summary.includes(q);
    }
    return true;
  });

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

      {/* Unified Watchlist Overview Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', borderLeft: '4px solid #F59E0B', background: 'linear-gradient(135deg, rgba(20, 16, 10, 0.95) 0%, rgba(35, 25, 10, 0.8) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Star size={20} color="#F59E0B" fill="#F59E0B" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                BusinessCollapse PRO • UNIFIED MONITORED WATCHLIST TERMINAL
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px', color: '#FFF' }}>
              My Starred & Monitored Distress Assets
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px' }}>
              Unified Command Center for your bookmarked Chapter 11 dockets, pre-judicial distress radar leaks, Section 363 court auctions, and zombie crypto implosions.
            </p>
          </div>

          {/* Alert Status Box */}
          <div style={{ background: 'rgba(7, 10, 15, 0.85)', padding: '14px 20px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.4)', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Smartphone size={24} color="#F59E0B" className="animate-pulse" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>REAL-TIME 24/7 PRO WATCHLIST</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFF' }}>
                {allStarredAssets.length} Total Assets Tracked
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        
        {/* Category Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedFilter('ALL')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              border: selectedFilter === 'ALL' ? '1px solid #F59E0B' : '1px solid var(--border-subtle)',
              background: selectedFilter === 'ALL' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedFilter === 'ALL' ? '#FCD34D' : 'var(--text-muted)'
            }}
          >
            ⭐️ ALL FAVORITES ({allStarredAssets.length})
          </button>
          <button
            onClick={() => setSelectedFilter('CHAPTER_11')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              border: selectedFilter === 'CHAPTER_11' ? '1px solid #EF4444' : '1px solid var(--border-subtle)',
              background: selectedFilter === 'CHAPTER_11' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedFilter === 'CHAPTER_11' ? '#FCA5A5' : 'var(--text-muted)'
            }}
          >
            🏢 CHAPTER 11 ({starredCompanies.filter(c => c.assetType === 'CHAPTER_11').length})
          </button>
          <button
            onClick={() => setSelectedFilter('SUBCHAPTER_V')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              border: selectedFilter === 'SUBCHAPTER_V' ? '1px solid #F59E0B' : '1px solid var(--border-subtle)',
              background: selectedFilter === 'SUBCHAPTER_V' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedFilter === 'SUBCHAPTER_V' ? '#FCD34D' : 'var(--text-muted)'
            }}
          >
            🏬 SUB-$10M ({allStarredAssets.filter(item => item.assetType === 'SUBCHAPTER_V').length})
          </button>
          <button
            onClick={() => setSelectedFilter('PRE_JUDICIAL')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              border: selectedFilter === 'PRE_JUDICIAL' ? '1px solid #F59E0B' : '1px solid var(--border-subtle)',
              background: selectedFilter === 'PRE_JUDICIAL' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedFilter === 'PRE_JUDICIAL' ? '#FCD34D' : 'var(--text-muted)'
            }}
          >
            🔥 PRE-JUDICIAL ({starredLeaks.length})
          </button>
          <button
            onClick={() => setSelectedFilter('AUCTION')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              border: selectedFilter === 'AUCTION' ? '1px solid #3B82F6' : '1px solid var(--border-subtle)',
              background: selectedFilter === 'AUCTION' ? 'rgba(59, 130, 246, 0.25)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedFilter === 'AUCTION' ? '#93C5FD' : 'var(--text-muted)'
            }}
          >
            🔨 363 AUCTIONS ({starredAuctions.length})
          </button>
          <button
            onClick={() => setSelectedFilter('CRYPTO')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              border: selectedFilter === 'CRYPTO' ? '1px solid #8B5CF6' : '1px solid var(--border-subtle)',
              background: selectedFilter === 'CRYPTO' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedFilter === 'CRYPTO' ? '#C4B5FD' : 'var(--text-muted)'
            }}
          >
            💀 ZOMBIE CRYPTO ({starredCrypto.length})
          </button>
        </div>

        {/* Watchlist Search */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={14} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search starred assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '6px 12px 6px 34px',
              color: '#FFF',
              fontSize: '0.8rem'
            }}
          />
        </div>
      </div>

      {/* Empty State when Watchlist is Empty */}
      {filteredAssets.length === 0 ? (
        <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <Star size={48} color="#F59E0B" style={{ margin: '0 auto 16px auto', display: 'block' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', color: '#FFF' }}>
            {allStarredAssets.length === 0 ? 'Your Unified Watchlist is Currently Empty' : 'No Matching Starred Assets Found'}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', maxWidth: '520px', margin: '0 auto 24px auto', lineHeight: 1.5 }}>
            {allStarredAssets.length === 0 
              ? 'Click the ⭐ star button on any Chapter 11 company card, pre-judicial distress leak, Section 363 court auction, or zombie crypto project to add it to your personal watchlist.'
              : 'Try clearing your search query or selecting a different category tab above.'}
          </p>
        </div>
      ) : (
        /* Unified Starred Assets Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
          {filteredAssets.map((asset) => {
            const isCompany = asset.assetType === 'CHAPTER_11';
            const isAuction = asset.assetType === 'AUCTION';

            return (
              <div
                key={asset.id}
                className="glass-panel glass-panel-interactive"
                style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: `1px solid ${asset.badgeColor}55`, position: 'relative' }}
              >
                {/* Star Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWatchlist(asset.id);
                  }}
                  style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.6)', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}
                  title="Remove from Watchlist"
                >
                  <Star size={16} color="#F59E0B" fill="#F59E0B" />
                </button>

                <div 
                  onClick={() => {
                    if (isAuction && onSelectAuction) onSelectAuction(asset);
                    else if (onSelectCompany) onSelectCompany(asset);
                  }} 
                  style={{ cursor: 'pointer' }}
                >
                  {/* Category Type Badge */}
                  <div style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 900, color: asset.badgeColor, background: `${asset.badgeColor}20`, border: `1px solid ${asset.badgeColor}40`, padding: '2px 8px', borderRadius: '4px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {asset.assetTypeLabel}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', paddingRight: '36px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>{asset.name || asset.entityName}</h3>
                        {asset.ticker && (
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                            {asset.ticker}
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        <span>📍 {asset.locationJurisdiction || asset.sectorName || 'U.S. Court Jurisdiction'}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.45 }}>
                    {asset.summary || asset.headline}
                  </p>

                  {/* Standardized Dual Timestamps */}
                  <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 12px', marginBottom: '14px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#FCD34D', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        ⚡ Material Change: {asset.formattedMaterialChange || (new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' EST')}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#10B981', fontWeight: 700 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        🔍 System Refresh Verified: {asset.formattedLastSweep || `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} EST`}
                      </span>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    if (isAuction && onSelectAuction) onSelectAuction(asset);
                    else if (onSelectCompany) onSelectCompany(asset);
                  }} 
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ background: `${asset.badgeColor}15`, color: asset.badgeColor, padding: '4px 10px', borderRadius: '6px', fontWeight: 700, border: `1px solid ${asset.badgeColor}30` }}>
                      {asset.statusBadge || asset.badgeText || '⚠️ MONITORED ASSET'}
                    </span>
                    <span style={{ color: '#FFF', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                      Inspect Asset <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

