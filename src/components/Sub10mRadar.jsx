import React, { useState } from 'react';
import { Building2, Filter, ArrowLeft, Search, ChevronRight, Share2, Tag, MapPin, DollarSign, Clock, ShieldAlert, Sparkles, Check, FileText, Star } from 'lucide-react';
import sub10mCatalog from '../data/sub10m_companies.json';

export default function Sub10mRadar({ watchlist = [], toggleWatchlist, onSelectCompany, onGoBack, onOpenShare }) {
  const [selectedDebtFilter, setSelectedDebtFilter] = useState('ALL');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('ALL');
  const [selectedAssetFilter, setSelectedAssetFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedShareId, setCopiedShareId] = useState(null);

  // Compute KPI Summary Stats
  const totalFilings = sub10mCatalog.length;
  const subchapterVCount = sub10mCatalog.filter(c => c.status === 'SUBCHAPTER_V').length;

  // Filter Logic
  const filteredList = sub10mCatalog.filter(c => {
    if (selectedDebtFilter !== 'ALL' && c.debtRangeCategory !== selectedDebtFilter) return false;
    if (selectedRegionFilter !== 'ALL' && c.regionalZone !== selectedRegionFilter) return false;
    if (selectedAssetFilter !== 'ALL' && c.assetLiquidationType !== selectedAssetFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const name = (c.name || '').toLowerCase();
      const summary = (c.summary || '').toLowerCase();
      const cause = (c.primaryCause || '').toLowerCase();
      const badge = (c.assetLiquidationBadge || '').toLowerCase();
      return name.includes(q) || summary.includes(q) || cause.includes(q) || badge.includes(q);
    }
    return true;
  });

  // Trojan Horse 1-Click Share Helper
  const handleTrojanShareX = (company, e) => {
    e.stopPropagation();
    const deepLinkUrl = typeof window !== 'undefined' ? `${window.location.origin}/?company=${company.id}&ref=VANCE8849` : `https://businesscollapse.com/?company=${company.id}&ref=VANCE8849`;
    
    // Niche Hashtag Mapper for Trojan Horse Groups
    let nicheHashtags = '#SubchapterV #Bankruptcy #Liquidation';
    if (company.assetLiquidationType === 'FLEET_TRUCKS') nicheHashtags = '#Trucking #FreightFleets #TruckAuction #SubchapterV';
    if (company.assetLiquidationType === 'KITCHEN_EQUIPMENT') nicheHashtags = '#RestaurantOwners #KitchenAuction #Franchise #ResellerCommunity';
    if (company.assetLiquidationType === 'RETAIL_LEASES') nicheHashtags = '#CommercialRealEstate #CRE #LeaseRejection #Retail';
    if (company.assetLiquidationType === 'MEDICAL_MACHINERY') nicheHashtags = '#MedicalEquipment #Healthcare #MRIAuction';
    if (company.assetLiquidationType === 'HEAVY_MACHINERY') nicheHashtags = '#MachineryAuction #CNCPress #Manufacturing #Industrial';

    const tweetText = encodeURIComponent(`🚨 SUB-$10M REGIONAL LIQUIDATION: ${company.name} — ${company.assetLiquidationBadge}.\n\nFull court dossier & auction specs on @BusinessCollapse:\n${deepLinkUrl}\n\n${nicheHashtags}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const handleCopyCitation = (company, e) => {
    e.stopPropagation();
    const deepLinkUrl = typeof window !== 'undefined' ? `${window.location.origin}/?company=${company.id}&ref=VANCE8849` : `https://businesscollapse.com/?company=${company.id}&ref=VANCE8849`;
    const citation = `BusinessCollapse.Com Sub-$10M Terminal, "${company.name} Subchapter V Dossier" (SEC & PACER Verified, ${company.officialFilingDate}), ${deepLinkUrl}`;
    try {
      navigator.clipboard.writeText(citation);
    } catch (err) {}
    setCopiedShareId(company.id);
    setTimeout(() => setCopiedShareId(null), 3000);
  };

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

      {/* Sub-$10M Command Header */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', borderLeft: '4px solid #F59E0B', background: 'linear-gradient(135deg, rgba(25, 18, 10, 0.95) 0%, rgba(35, 25, 12, 0.85) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Building2 size={20} color="#FCD34D" />
              <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#FCD34D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                BusinessCollapse PRO • SUB-$10M REGIONAL & SUBCHAPTER V RADAR
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px', color: '#FFF' }}>
              Sub-$10M Mid-Market Insolvency & Subchapter V Reorganizations
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '820px' }}>
              Real-time radar tracking small-to-midsize business bankruptcies, Subchapter V reorganizations (&lt; $7.5M debt limit), local commercial fleet liquidations, restaurant kitchen auctions, and regional real estate lease rejections across North America.
            </p>
          </div>

          {/* KPI Header Stats */}
          <div style={{ background: 'rgba(7, 10, 15, 0.85)', padding: '14px 20px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.4)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>TRACKED REGIONAL EVENTS</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>
                {totalFilings} Mid-Market
              </div>
            </div>
            <div style={{ height: '30px', width: '1px', background: 'var(--border-subtle)' }} />
            <div>
              <div style={{ fontSize: '0.68rem', color: '#FCD34D', fontWeight: 700, textTransform: 'uppercase' }}>SUBCHAPTER V REORGS</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>
                {subchapterVCount} Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        
        {/* Category Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          
          {/* Debt Size */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(15, 23, 42, 0.7)', padding: '4px 10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 800 }}>Debt Size:</span>
            <select
              value={selectedDebtFilter}
              onChange={(e) => setSelectedDebtFilter(e.target.value)}
              style={{ background: 'transparent', color: '#FFF', border: 'none', fontSize: '0.78rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
            >
              <option value="ALL" style={{ background: '#0F172A' }}>🌐 All Debt Sizes</option>
              <option value="2M_5M" style={{ background: '#0F172A' }}>💵 $2M - $5M Debt</option>
              <option value="5M_10M" style={{ background: '#0F172A' }}>💰 $5M - $10M Debt</option>
            </select>
          </div>

          {/* Region */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(15, 23, 42, 0.7)', padding: '4px 10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 800 }}>Region:</span>
            <select
              value={selectedRegionFilter}
              onChange={(e) => setSelectedRegionFilter(e.target.value)}
              style={{ background: 'transparent', color: '#FFF', border: 'none', fontSize: '0.78rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
            >
              <option value="ALL" style={{ background: '#0F172A' }}>📍 All Regions</option>
              <option value="TEXAS" style={{ background: '#0F172A' }}>🤠 Texas (S.D. / N.D. Tex)</option>
              <option value="FLORIDA" style={{ background: '#0F172A' }}>🌴 Florida (M.D. Fla)</option>
              <option value="CALIFORNIA" style={{ background: '#0F172A' }}>☀️ California (C.D. Cal)</option>
              <option value="NEW_YORK" style={{ background: '#0F172A' }}>🗽 New York (E.D. N.Y.)</option>
              <option value="MIDWEST" style={{ background: '#0F172A' }}>🏭 Midwest (N.D. Ill.)</option>
            </select>
          </div>

          {/* Asset Category */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(15, 23, 42, 0.7)', padding: '4px 10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 800 }}>Asset Type:</span>
            <select
              value={selectedAssetFilter}
              onChange={(e) => setSelectedAssetFilter(e.target.value)}
              style={{ background: 'transparent', color: '#FFF', border: 'none', fontSize: '0.78rem', outline: 'none', cursor: 'pointer', fontWeight: 700 }}
            >
              <option value="ALL" style={{ background: '#0F172A' }}>📦 All Liquidating Assets</option>
              <option value="FLEET_TRUCKS" style={{ background: '#0F172A' }}>🚚 Trucking & Commercial Fleets</option>
              <option value="KITCHEN_EQUIPMENT" style={{ background: '#0F172A' }}>🍳 Restaurant Kitchen Gear</option>
              <option value="RETAIL_LEASES" style={{ background: '#0F172A' }}>🏬 Strip Mall Retail Leases</option>
              <option value="MEDICAL_MACHINERY" style={{ background: '#0F172A' }}>🩺 Medical & Imaging Systems</option>
              <option value="HEAVY_MACHINERY" style={{ background: '#0F172A' }}>⚙️ Heavy Manufacturing Machinery</option>
            </select>
          </div>

        </div>

        {/* Instant Search Bar */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={14} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search regional event..."
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

      {/* Sub-$10M Regional Card Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
        {filteredList.map((company) => (
          <div
            key={company.id}
            onClick={() => onSelectCompany && onSelectCompany(company)}
            className="glass-panel glass-panel-interactive"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div>
              {/* Header Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Watchlist Star Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (toggleWatchlist) toggleWatchlist(company.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title={watchlist.includes(company.id) ? "Remove from Unified Watchlist" : "Save to Unified Watchlist"}
                    >
                      <Star
                        size={18}
                        color={watchlist.includes(company.id) ? "#F59E0B" : "#64748B"}
                        fill={watchlist.includes(company.id) ? "#F59E0B" : "none"}
                      />
                    </button>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>{company.name}</h3>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#FCD34D', fontWeight: 800, marginTop: '2px' }}>
                    📍 {company.locationJurisdiction}
                  </div>
                </div>

                <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D', border: '1px solid #F59E0B', padding: '2px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
                  {company.statusBadge}
                </span>
              </div>

              {/* Asset Badge Box */}
              <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1px solid rgba(245, 158, 11, 0.35)', padding: '10px 14px', borderRadius: '8px', margin: '12px 0' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
                  TARGET LIQUIDATING ASSETS
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#FFF' }}>
                  {company.assetLiquidationBadge}
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                {company.summary}
              </p>

              {/* Debt & DIP Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: 'rgba(7, 10, 15, 0.6)', padding: '10px', borderRadius: '6px', fontSize: '0.75rem', marginBottom: '14px', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.68rem' }}>DEBT AT FILING</span>
                  <strong style={{ color: '#EF4444', fontFamily: 'var(--font-mono)' }}>{company.debtAtCollapse}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block', fontSize: '0.68rem' }}>EST. ASSET VALUE</span>
                  <strong style={{ color: '#FCD34D', fontFamily: 'var(--font-mono)' }}>{company.collapseValuation.split(' ')[0]}</strong>
                </div>
              </div>

              <div style={{ fontSize: '0.68rem', color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 8px', borderRadius: '4px', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={11} /> ⚡ System Refresh Verified: {company.formattedLastSweep || company.formattedMaterialChange || (new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' EST')}
              </div>
            </div>

            {/* Trojan Horse Niche Sharing Bar */}
            <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                
                {/* 1-Click Multi-Platform Share */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenShare) {
                      onOpenShare(company);
                    } else {
                      handleTrojanShareX(company, e);
                    }
                  }}
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    color: '#38BDF8',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Share item across social media platforms or copy direct citation link"
                >
                  <Share2 size={12} /> Share Asset Listing
                </button>

                {/* Copy Citation */}
                <button
                  onClick={(e) => handleCopyCitation(company, e)}
                  style={{
                    background: copiedShareId === company.id ? '#10B981' : 'rgba(30, 41, 59, 0.8)',
                    color: '#FFF',
                    border: '1px solid var(--border-subtle)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                  title="Copy AP Press Citation"
                >
                  {copiedShareId === company.id ? 'Copied!' : '📰 Citation'}
                </button>
              </div>

              <span style={{ color: '#FFF', fontWeight: 800, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                Inspect File <ChevronRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
