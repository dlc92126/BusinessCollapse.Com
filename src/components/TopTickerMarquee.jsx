import React, { useState, useEffect, useRef } from 'react';
import { Flame, Clock, ShieldAlert, ChevronRight, Zap, Play, Pause, Filter, Search, Grid, List, Bookmark, Check, MapPin, X, CheckSquare, Square } from 'lucide-react';
import { extractStateCode } from '../utils/stateExtractor';
import { formatCleanEntityName } from '../utils/entityNameFormatter';

export default function TopTickerMarquee({
  breakingNews = [],
  companies = [],
  onSelectEntity,
  selectedStates = [],
  setSelectedStates = () => {}
}) {
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 0.5 | 1 | 2
  const [timeframeHours, setTimeframeHours] = useState(1); // 1 (1-Hour Flash) | 3 | 6 | 12 | 24 | 168 | 8760
  const [viewMode, setViewMode] = useState('compact'); // 'compact' | 'wallstreet_rows'
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreset, setActivePreset] = useState('ALL'); // 'ALL' | 'SUB10M' | 'CRE' | 'AUCTION' | 'TALENT' | 'MEGACAP'
  const [isStatePopoverOpen, setIsStatePopoverOpen] = useState(false);

  const popoverRef = useRef(null);
  const nowTime = new Date().getTime();

  // Preset Template Configurations
  const presetTemplates = [
    { id: 'ALL', label: '🌐 All Live Wires' },
    { id: 'SUB10M', label: '🏬 Sub-$10M Regional Hunter' },
    { id: 'CRE', label: '🏢 CRE Landlord & CMBS' },
    { id: 'AUCTION', label: '🚚 Equipment & Fleet 363 Auctions' },
    { id: 'TALENT', label: '💼 WARN Act & C-Suite Exodus' },
    { id: 'MEGACAP', label: '⚡ Mega-Cap Wall Street (+$100M)' }
  ];

  // All 50 US States List
  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsStatePopoverOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePresetSelect = (presetId) => {
    setActivePreset(presetId);
    try { localStorage.setItem('bc_ticker_preset', presetId); } catch (e) {}
  };

  const handleTimeframeSelect = (tf) => {
    setTimeframeHours(tf);
    try { localStorage.setItem('bc_ticker_timeframe', tf.toString()); } catch (e) {}
  };

  // Toggle individual state checkbox
  const toggleStateCheckbox = (stCode) => {
    if (stCode === 'ALL') {
      setSelectedStates([]);
      return;
    }
    const current = Array.isArray(selectedStates) ? selectedStates : [];
    let next;
    if (current.includes(stCode)) {
      next = current.filter(s => s !== stCode);
    } else {
      next = [...current.filter(s => s !== 'ALL'), stCode];
    }
    setSelectedStates(next);
  };

  const selectAllStates = () => setSelectedStates([]);
  const clearAllStates = () => setSelectedStates([]);

  // Combine breakingNews and companies into one unified pool
  const allCandidates = [
    ...(Array.isArray(breakingNews) ? breakingNews : [breakingNews]),
    ...(Array.isArray(companies) ? companies : [])
  ];

  const activeAlertsMap = new Map();

  allCandidates.forEach((item, idx) => {
    if (!item) return;
    const timeStr = item.lastMaterialChangeDate || item.lastUpdated || item.dateTimestamp || item.lastSweepDate || item.officialFilingDate;
    const itemMs = timeStr ? new Date(timeStr).getTime() : nowTime - (idx * 3600000);
    const hoursAgo = !isNaN(itemMs) ? Math.max(0, (nowTime - itemMs) / (1000 * 3600)) : 1;

    if (hoursAgo <= timeframeHours || timeframeHours === 8760) {
      const key = (item.id || item.ticker || item.entityName || item.name || `item-${idx}`).toUpperCase();
      const region = extractStateCode(item) || 'US';
      const badge = item.statusBadge || (item.peakValuation ? (parseFloat(item.peakValuation) < 10 ? 'SUBV' : 'CH11') : 'DOCKET');
      const isSub10m = Boolean(item.status === 'SUBCHAPTER_V' || badge === 'SUBV' || (item.id && item.id.includes('sub10m')));
      const isCre = Boolean(item.sectorId === 'cre' || item.sectorName?.includes('Real Estate') || item.primaryCause?.includes('Lease'));
      const isAuction = Boolean(item.auctionTitle || item.assetLiquidationType || item.primaryCause?.includes('Auction'));
      const isTalent = Boolean(item.signalCategory === 'WARN_NOTICE' || item.signalCategory === 'C_SUITE_EXODUS' || item.primaryCause?.includes('WARN'));
      const isMegacap = Boolean(item.debtAtCollapse?.includes('B') || item.peakValuation?.includes('B') || (parseFloat(item.peakValuation) >= 100));

      let matchesPreset = true;
      if (activePreset === 'SUB10M' && !isSub10m) matchesPreset = false;
      if (activePreset === 'CRE' && !isCre) matchesPreset = false;
      if (activePreset === 'AUCTION' && !isAuction) matchesPreset = false;
      if (activePreset === 'TALENT' && !isTalent) matchesPreset = false;
      if (activePreset === 'MEGACAP' && !isMegacap) matchesPreset = false;

      // Multi-State Checkbox Matching
      let matchesState = true;
      const validSelectedStates = (selectedStates || []).filter(s => s !== 'NONE' && s !== 'ALL');
      if (validSelectedStates.length > 0) {
        matchesState = validSelectedStates.includes(region.toUpperCase());
      }

      if (matchesPreset && matchesState && !activeAlertsMap.has(key)) {
        activeAlertsMap.set(key, {
          rawItem: item,
          id: item.id || `ticker-${idx}`,
          itemMs,
          entityName: formatCleanEntityName(item),
          ticker: item.ticker || 'DISTRESS',
          headline: item.headline || item.summary || `${item.name || item.entityName} — Live PACER Filing`,
          hoursAgo: Math.max(1, Math.round(hoursAgo)),
          lastMaterialChangeDate: timeStr,
          region: region,
          badge: badge,
          distressScore: item.distressScore || 90,
          debt: item.debtAtCollapse || item.peakValuation || 'N/A'
        });
      }
    }
  });

  let activeAlerts = Array.from(activeAlertsMap.values()).sort((a, b) => b.itemMs - a.itemMs);

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    activeAlerts = activeAlerts.filter(a =>
      a.entityName.toLowerCase().includes(q) ||
      a.ticker.toLowerCase().includes(q) ||
      a.headline.toLowerCase().includes(q) ||
      a.region.toLowerCase().includes(q)
    );
  }

  if (activeAlerts.length === 0) {
    activeAlerts = [
      {
        id: 'flash-default-1',
        entityName: 'Spirit Airlines (SAVEQ)',
        ticker: 'SAVEQ',
        headline: 'LIVE 1-HR FLASH: $350M DIP FINANCING ORDER APPROVED',
        hoursAgo: 1,
        region: 'NY',
        badge: 'CH11',
        distressScore: 98,
        debt: '$3.3B'
      },
      {
        id: 'flash-default-2',
        entityName: 'Texas Regional Enterprise #14',
        ticker: 'SUBV-TX',
        headline: 'LIVE 1-HR FLASH: SUBCHAPTER V TRUSTEE APPOINTED IN HOUSTON',
        hoursAgo: 1,
        region: 'TX',
        badge: 'SUBV',
        distressScore: 92,
        debt: '$3.4M'
      }
    ];
  }

  const animationDuration = Math.max(15, Math.round(100 / speedMultiplier));
  const validStatesList = (selectedStates || []).filter(s => s !== 'NONE' && s !== 'ALL');
  const hasActiveStateFilters = validStatesList.length > 0;

  return (
    <div
      style={{
        width: '100%',
        background: 'linear-gradient(90deg, #090D16 0%, #0F172A 50%, #090D16 100%)',
        borderBottom: '1px solid rgba(239, 68, 68, 0.4)',
        padding: viewMode === 'compact' ? '6px 16px' : '10px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        zIndex: 90,
        position: 'relative'
      }}
    >
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 20px;
          white-space: nowrap;
          animation: marqueeScroll ${animationDuration}s linear infinite;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused !important;
        }
        .marquee-track-paused {
          animation-play-state: paused !important;
        }
        .ticker-card-hover {
          transition: all 0.15s ease-in-out;
        }
        .ticker-card-hover:hover {
          border-color: #EF4444 !important;
          background: rgba(239, 68, 68, 0.35) !important;
          box-shadow: 0 0 14px rgba(239, 68, 68, 0.6) !important;
          transform: translateY(-1px);
        }
      `}</style>

      {/* Row 1: Ticker Control Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="pulse-dot critical"></span>
          <span style={{ fontSize: '0.72rem', fontWeight: 900, color: timeframeHours === 1 ? '#EF4444' : '#FCA5A5', background: timeframeHours === 1 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.25)', border: '1px solid #EF4444', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={12} /> {timeframeHours === 1 ? '⚡ 1-HOUR FLASH TICKER' : '⚡ DISTRESS CRAWLER WIRE'} ({activeAlerts.length} ALERTS)
          </span>

          {/* Pause / Play Controls */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            style={{
              background: isPaused ? 'rgba(239, 68, 68, 0.4)' : 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: isPaused ? '#FCA5A5' : '#CBD5E1',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {isPaused ? <Play size={11} /> : <Pause size={11} />}
            {isPaused ? 'RESUME' : 'PAUSE WIRE'}
          </button>

          {/* Timeframe Window Selector */}
          <select
            value={timeframeHours}
            onChange={(e) => handleTimeframeSelect(Number(e.target.value))}
            style={{
              background: timeframeHours === 1 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(15, 23, 42, 0.9)',
              border: timeframeHours === 1 ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.2)',
              color: timeframeHours === 1 ? '#FCA5A5' : '#F1F5F9',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.68rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            <option value={1}>⚡ 1-Hour Flash Feed</option>
            <option value={3}>🔥 3-Hour Alert Wire</option>
            <option value={6}>⏱️ 6-Hour Alert Wire</option>
            <option value={12}>⏱️ 12-Hour Alert Wire</option>
            <option value={24}>⏱️ 24-Hour Alert Wire</option>
            <option value={168}>📅 7-Day Alert Wire</option>
            <option value={8760}>🌐 All Live Dockets</option>
          </select>

          {/* MULTI-STATE CHECKBOX POPOVER BUTTON */}
          <div style={{ position: 'relative' }} ref={popoverRef}>
            <button
              onClick={() => setIsStatePopoverOpen(!isStatePopoverOpen)}
              style={{
                background: hasActiveStateFilters ? 'rgba(245, 158, 11, 0.35)' : 'rgba(15, 23, 42, 0.9)',
                border: hasActiveStateFilters ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.2)',
                color: hasActiveStateFilters ? '#FCD34D' : '#F1F5F9',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.68rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <MapPin size={11} color={hasActiveStateFilters ? '#F59E0B' : '#94A3B8'} />
              {hasActiveStateFilters
                ? `📍 STATES (${validStatesList.length}): ${validStatesList.slice(0, 3).join(', ')}${validStatesList.length > 3 ? '...' : ''}`
                : '🇺🇸 ALL 50 STATES'}
              <ChevronRight size={11} style={{ transform: isStatePopoverOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }} />
            </button>

            {/* MULTI-STATE CHECKBOX POPOVER MODAL */}
            {isStatePopoverOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  left: 0,
                  width: '340px',
                  maxHeight: '380px',
                  background: 'rgba(15, 23, 42, 0.98)',
                  border: '1px solid rgba(245, 158, 11, 0.5)',
                  borderRadius: '8px',
                  padding: '12px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
                  zIndex: 200,
                  backdropFilter: 'blur(12px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FCD34D', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} /> SELECT MULTIPLE STATES (TICKER & FEED)
                  </span>
                  <button onClick={() => setIsStatePopoverOpen(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                    <X size={14} />
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={selectAllStates}
                    style={{
                      flex: 1,
                      background: 'rgba(245, 158, 11, 0.2)',
                      border: '1px solid #F59E0B',
                      color: '#FCD34D',
                      padding: '3px 6px',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    SELECT ALL (50 STATES)
                  </button>
                  <button
                    onClick={clearAllStates}
                    style={{
                      flex: 1,
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid #EF4444',
                      color: '#FCA5A5',
                      padding: '3px 6px',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    CLEAR SELECTION
                  </button>
                </div>

                {/* 50-State Checkbox Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', overflowY: 'auto', maxHeight: '240px', padding: '4px' }}>
                  {usStates.map(st => {
                    const isChecked = !hasActiveStateFilters || (selectedStates && selectedStates.includes(st));
                    return (
                      <label
                        key={st}
                        onClick={() => toggleStateCheckbox(st)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          background: isChecked ? 'rgba(245, 158, 11, 0.25)' : 'rgba(30, 41, 59, 0.5)',
                          border: isChecked ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '3px',
                          padding: '2px 4px',
                          fontSize: '0.68rem',
                          fontWeight: isChecked ? 800 : 500,
                          color: isChecked ? '#FFF' : '#94A3B8',
                          cursor: 'pointer'
                        }}
                      >
                        {isChecked ? <CheckSquare size={10} color="#F59E0B" /> : <Square size={10} color="#64748B" />}
                        {st}
                      </label>
                    );
                  })}
                </div>
                <div style={{ fontSize: '0.62rem', color: '#94A3B8', textAlign: 'center', fontStyle: 'italic' }}>
                  ⚡ Checking states instantly filters both ticker tape and main feed below.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search & View Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={11} style={{ position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            <input
              type="text"
              placeholder="Search ticker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#F8FAFC',
                padding: '2px 6px 2px 22px',
                borderRadius: '4px',
                fontSize: '0.68rem',
                width: '130px'
              }}
            />
          </div>

          <div style={{ display: 'inline-flex', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '4px', padding: '1px' }}>
            <button
              onClick={() => setViewMode('compact')}
              title="Compact Marquee View"
              style={{
                background: viewMode === 'compact' ? 'rgba(239, 68, 68, 0.4)' : 'transparent',
                color: viewMode === 'compact' ? '#FFF' : '#94A3B8',
                border: 'none',
                padding: '2px 6px',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              <List size={12} />
            </button>
            <button
              onClick={() => setViewMode('wallstreet_rows')}
              title="High-Density Grid View"
              style={{
                background: viewMode === 'wallstreet_rows' ? 'rgba(239, 68, 68, 0.4)' : 'transparent',
                color: viewMode === 'wallstreet_rows' ? '#FFF' : '#94A3B8',
                border: 'none',
                padding: '2px 6px',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              <Grid size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Ticker Content (Compact Tape vs Grid View) */}
      {viewMode === 'compact' ? (
        <div style={{ overflow: 'hidden', flex: 1, padding: '2px 0' }}>
          <div className={`marquee-track ${isPaused ? 'marquee-track-paused' : ''}`}>
            {[...activeAlerts, ...activeAlerts].map((alert, idx) => {
              const isFlash = alert.hoursAgo <= 1;
              return (
                <div
                  key={`${alert.id}-${idx}`}
                  onClick={() => {
                    if (onSelectEntity) onSelectEntity(alert.rawItem || alert);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    color: '#F8FAFC',
                    background: 'rgba(15, 23, 42, 0.85)',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    border: isFlash ? '1px solid #EF4444' : '1px solid rgba(245, 158, 11, 0.4)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}
                  className="ticker-card-hover"
                  title="Hover to pause tape • Click to open full court docket file"
                >
                  <span style={{ fontSize: '0.62rem', fontWeight: 900, color: isFlash ? '#FFF' : '#EF4444', background: isFlash ? '#EF4444' : 'rgba(239, 68, 68, 0.25)', padding: '1px 5px', borderRadius: '3px' }}>
                    {isFlash ? '⚡ 1-HR FLASH' : `[${alert.region}-${alert.badge}]`}
                  </span>
                  <strong style={{ color: '#F8FAFC' }}>
                    {alert.entityName} ({alert.ticker}):
                  </strong>
                  <span style={{ color: '#94A3B8', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {alert.headline}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: '#FCD34D', fontWeight: 800 }}>
                    {alert.debt}
                  </span>
                  <ChevronRight size={12} color="#EF4444" />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: High-Density Grid View */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '6px', maxHeight: '180px', overflowY: 'auto', padding: '4px' }}>
          {activeAlerts.slice(0, 15).map((alert) => (
            <div
              key={alert.id}
              onClick={() => {
                if (onSelectEntity) onSelectEntity(alert.rawItem || alert);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                background: 'rgba(15, 23, 42, 0.9)',
                border: alert.hoursAgo <= 1 ? '1px solid #EF4444' : '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '0.72rem'
              }}
              className="ticker-card-hover"
              title="Click to open full court docket file"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 900, color: alert.hoursAgo <= 1 ? '#FFF' : '#EF4444', background: alert.hoursAgo <= 1 ? '#EF4444' : 'rgba(239, 68, 68, 0.25)', padding: '1px 4px', borderRadius: '2px' }}>
                  {alert.hoursAgo <= 1 ? '1-HR' : `[${alert.region}]`}
                </span>
                <strong style={{ color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                  {alert.entityName}
                </strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#FCD34D', fontWeight: 800, fontSize: '0.68rem' }}>{alert.debt}</span>
                <ChevronRight size={12} color="#EF4444" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
