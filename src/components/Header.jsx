import React, { useState, useRef, useEffect } from 'react';
import { Activity, Search, Shield, X, BellRing, Sparkles, UserCheck, Clock, Settings, Lock, HelpCircle, Zap, LogIn } from 'lucide-react';
import TopTickerMarquee from './TopTickerMarquee';

export default function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  companies = [],
  onSelectCompany,
  onOpenFounders,
  onOpenAbout,
  onOpenIngestionScheduler,
  lastIngestionTime,
  impersonatedUser,
  onOpenHarvester,
  viewMode,
  onOpenOnboarding,
  onSelectSector,
  onOpenFaq,
  onOpenWelcome,
  onOpenAccountSettings,
  onOpenSignIn,
  breakingNews = []
}) {



  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchRef = useRef(null);
  const consoleRef = useRef(null);

  // Close console menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (consoleRef.current && !consoleRef.current.contains(event.target)) {
        setIsConsoleOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter companies for instant dropdown
  const searchResults = (companies || []).filter((c) => {
    if (!c) return false;
    if (!searchQuery || !searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return (
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.ticker && c.ticker.toLowerCase().includes(q)) ||
      (c.primaryCause && c.primaryCause.toLowerCase().includes(q)) ||
      (c.sectorName && c.sectorName.toLowerCase().includes(q))
    );
  });

  const allTabs = [
    { id: 'graveyard', label: '🔥 LIVE DISTRESS WIRE' },
    { id: 'sub10m', label: '📡 SUB-$10M RADAR' },
    { id: 'heatmap', label: '📊 DISTRESS HEATMAP' },
    { id: 'dip', label: '💳 DIP LOAN TERMINAL' },
    { id: 'auctions', label: '🏛️ COURT AUCTIONS' },
    { id: 'graveyard_archive', label: '🪦 CORPORATE GRAVEYARD' }
  ];


  if (viewMode === 'manager') {
    allTabs.push({ id: 'admin', label: '🤖 AI MANAGER STUDIO' });
  }

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-header)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
      
      {/* MODULAR DUAL-BOX HEADER LAYOUT */}
      <div style={{
        width: '100%',
        margin: '0 auto',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'stretch',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        
        {/* LEFT DEDICATED COMMAND BOX: BRAND HERO MODULE */}

        <div 
          onClick={() => setActiveTab('graveyard')}
          style={{
            background: '#090D16',
            border: '2px solid #EF4444',
            borderRadius: '12px',
            padding: '0',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 24px rgba(239, 68, 68, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'var(--transition-normal)'
          }}
          className="glass-panel-interactive"
          title="BusinessCollapse.com — Public Terminal Home"
        >
          <img 
            src="/logo_wide_official.png" 
            alt="BusinessCollapse.com Official Logo" 
            style={{ 
              height: '135px', 
              width: '360px', 
              objectFit: 'cover',
              display: 'block'
            }} 
          />
        </div>


        {/* RIGHT DISCONNECTED COMMAND BOX: UTILITIES & WORKSPACE MODULE */}
        <div style={{ 
          flex: 1, 
          minWidth: '500px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(11, 15, 23, 0.95) 100%)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '14px 20px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          gap: '12px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
        }}>
          
          {/* Top Utilities Row: Search, Centered Welcome Brief, Membership Onboarding, Account */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>

            
            {/* Global Search Input */}
            <div ref={searchRef} style={{ position: 'relative', flex: '0 1 320px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(9, 13, 22, 0.9)',
                border: isSearchFocused ? '1.5px solid #EF4444' : '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '8px 12px',
                gap: '8px',
                boxShadow: isSearchFocused ? '0 0 16px rgba(239, 68, 68, 0.3)' : 'none',
                transition: 'var(--transition-fast)'
              }}>
                <Search size={16} color={isSearchFocused ? '#EF4444' : '#64748B'} />
                <input
                  type="text"
                  placeholder="Search ticker, court docket, or entity..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#F8FAFC',
                    fontSize: '0.85rem',
                    outline: 'none',
                    width: '100%'
                  }}
                />
                {searchQuery && (
                  <X size={14} color="#64748B" style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />
                )}
              </div>

              {/* Instant Search Results Dropdown */}
              {isSearchFocused && searchResults.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  right: 0,
                  background: '#0F172A',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.8)',
                  maxHeight: '280px',
                  overflowY: 'auto',
                  zIndex: 100
                }}>
                  {searchResults.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        if (onSelectCompany) onSelectCompany(c);
                        setIsSearchFocused(false);
                      }}
                      style={{
                        padding: '10px 14px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        transition: 'var(--transition-fast)'
                      }}
                      className="glass-panel-interactive"
                    >
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#F8FAFC' }}>{c.name}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{c.primaryCause}</div>
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#EF4444', background: 'rgba(239,68,68,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                        {c.ticker}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>


            {/* LIVE SYSTEM REFRESH TIMESTAMP BADGE — RESTRICTED TO MANAGER BACK OFFICE */}
            {viewMode === 'manager' && (
              <button
                onClick={onOpenIngestionScheduler}
                style={{
                  height: '38px',
                  boxSizing: 'border-box',
                  fontSize: '0.78rem',
                  padding: '0 12px',
                  gap: '6px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#A7F3D0',
                  border: '1px solid #10B981',
                  borderRadius: '8px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 0 14px rgba(16, 185, 129, 0.25)'
                }}
                title="System Refresh Scheduler & Status Control — Back Office Management Function"
              >
                <Clock size={14} color="#10B981" /> ⚡ SYSTEM REFRESH: {lastIngestionTime ? new Date(lastIngestionTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' EST' : 'SYNCED'}
              </button>
            )}

            {/* CENTERED PROMINENT WELCOME BRIEF BUTTON (Electric Cyan Glow) */}
            <button
              onClick={onOpenWelcome}
              style={{
                height: '38px',
                boxSizing: 'border-box',
                fontSize: '0.82rem',
                padding: '0 16px',
                gap: '8px',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%)',
                color: '#38BDF8',
                border: '1.5px solid #38BDF8',
                borderRadius: '8px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                boxShadow: '0 0 16px rgba(56, 189, 248, 0.35)',
                transition: 'var(--transition-fast)',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap'
              }}
              className="glass-panel-interactive"
              title="60-Second Executive Welcome Brief & Platform Guide"
            >
              <Zap size={15} color="#38BDF8" /> ⚡ Welcome Brief
            </button>

            {/* VIP Access / Onboarding & Account Utility Buttons */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              
              <div 
                style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '38px' }}
                title="Claim 1 of 100 Free Beta Founder Pass Spots"
              >
                <button
                  onClick={onOpenOnboarding}
                  className="btn-primary"
                  style={{ height: '38px', boxSizing: 'border-box', fontSize: '0.82rem', padding: '0 16px', gap: '6px', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}
                >
                  <Shield size={14} /> VIP Membership
                </button>
              </div>

              {/* FAR-RIGHT STACKED COLUMN (Account & FAQ on top, Log In directly underneath, right-justified) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                <button
                  onClick={onOpenAccountSettings}
                  style={{
                    height: '38px',
                    boxSizing: 'border-box',
                    fontSize: '0.82rem',
                    padding: '0 16px',
                    gap: '6px',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.4) 0%, rgba(79, 70, 229, 0.5) 100%)',
                    color: '#FFF',
                    border: '1.5px solid #C084FC',
                    borderRadius: '8px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)',
                    transition: 'var(--transition-fast)',
                    whiteSpace: 'nowrap'
                  }}
                  className="glass-panel-interactive"
                  title="My Account Vault, FAQ, Saved PINs, Alerts & Manual"
                >
                  <Settings size={15} color="#FFF" /> ⚙️ Account & FAQ
                </button>


                <button
                  onClick={onOpenSignIn}
                  style={{
                    fontSize: '0.72rem',
                    padding: '3px 10px',
                    gap: '4px',
                    background: 'rgba(2, 132, 199, 0.2)',
                    color: '#38BDF8',
                    border: '1px solid #38BDF8',
                    borderRadius: '6px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.25)',
                    transition: 'var(--transition-fast)',
                    whiteSpace: 'nowrap'
                  }}
                  className="glass-panel-interactive"
                  title="Subscriber & Founder Log-In Portal"
                >
                  <LogIn size={12} color="#38BDF8" /> 🔑 Log In
                </button>
              </div>

            </div>



          </div>


          {/* Bottom Workspace Navigation Tabs Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {allTabs.map((tab) => {
              const isActive = activeTab === tab.id;

              if (tab.id === 'sectors') {
                return (
                  <div key={tab.id} style={{ position: 'relative' }}>
                    <button
                      onClick={() => {
                        setActiveTab('sectors');
                        setIsSectorDropdownOpen(!isSectorDropdownOpen);
                      }}
                      style={{
                        background: isActive ? 'linear-gradient(135deg, #EF4444 0%, #991B1B 100%)' : 'rgba(30, 41, 59, 0.6)',
                        color: isActive ? '#FFFFFF' : '#94A3B8',
                        border: isActive ? '1px solid #EF4444' : '1px solid var(--border-subtle)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: isActive ? 900 : 600,
                        letterSpacing: '0.04em',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)',
                        boxShadow: isActive ? '0 4px 14px rgba(239, 68, 68, 0.3)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {tab.label} <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>▼</span>
                    </button>

                    {isSectorDropdownOpen && (
                      <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: 0,
                        width: '280px',
                        background: '#0F172A',
                        border: '1.5px solid rgba(239, 68, 68, 0.45)',
                        borderRadius: '10px',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.95), 0 0 20px rgba(239, 68, 68, 0.2)',
                        padding: '8px 0',
                        zIndex: 300,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                      }}>
                        <div style={{ padding: '6px 14px', fontSize: '0.68rem', fontWeight: 900, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          ⚡ SELECT SECTOR DISTRESS WIRE
                        </div>
                        
                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('ALL'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#F8FAFC', cursor: 'pointer', fontWeight: 700 }}
                          className="glass-panel-interactive"
                        >
                          🌐 All Sectors (Full Registry)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('aviation'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#60A5FA', cursor: 'pointer', fontWeight: 900, background: 'rgba(59, 130, 246, 0.15)', borderLeft: '3px solid #3B82F6' }}
                          className="glass-panel-interactive"
                        >
                          ✈️ Aviation & Aerospace (SAVE, VORBQ)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('automotive'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#FB7185', cursor: 'pointer', fontWeight: 900, background: 'rgba(225, 29, 72, 0.15)', borderLeft: '3px solid #E11D48' }}
                          className="glass-panel-interactive"
                        >
                          🚗 Automotive & EV (Fisker, Lordstown)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('cre'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#F8FAFC', cursor: 'pointer', fontWeight: 600 }}
                          className="glass-panel-interactive"
                        >
                          🏢 Commercial Real Estate (WeWork)
                        </div>


                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('legacy-retail'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#F8FAFC', cursor: 'pointer', fontWeight: 600 }}
                          className="glass-panel-interactive"
                        >
                          🛍️ Legacy Retail (Tupperware, BBBYQ)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('regional-banking'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#F8FAFC', cursor: 'pointer', fontWeight: 600 }}
                          className="glass-panel-interactive"
                        >
                          🏦 Regional Banking (SVB, FRCB)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('casual-dining'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#F8FAFC', cursor: 'pointer', fontWeight: 600 }}
                          className="glass-panel-interactive"
                        >
                          🍔 Casual Dining (Red Lobster, TGI Fridays)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('linear-media'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#F8FAFC', cursor: 'pointer', fontWeight: 600 }}
                          className="glass-panel-interactive"
                        >
                          📺 Linear Media (Bally Sports, Vice)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('legacy-tech'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#F8FAFC', cursor: 'pointer', fontWeight: 600 }}
                          className="glass-panel-interactive"
                        >
                          💻 Legacy Tech (Fisker, Avaya)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('energy'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#F8FAFC', cursor: 'pointer', fontWeight: 600 }}
                          className="glass-panel-interactive"
                        >
                          ⚡ Energy & Cleantech (SunPower, Proterra)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('crypto-protocols'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#F8FAFC', cursor: 'pointer', fontWeight: 600 }}
                          className="glass-panel-interactive"
                        >
                          🪙 Crypto & Web3 (FTX, Celsius)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('healthcare'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#34D399', cursor: 'pointer', fontWeight: 800, background: 'rgba(16,185,129,0.12)', borderLeft: '3px solid #10B981' }}
                          className="glass-panel-interactive"
                        >
                          🏥 Healthcare & Hospitals (Steward, Mallinckrodt)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('logistics'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#FBBF24', cursor: 'pointer', fontWeight: 800, background: 'rgba(245,158,11,0.12)', borderLeft: '3px solid #F59E0B' }}
                          className="glass-panel-interactive"
                        >
                          🚛 Supply Chain & Logistics (Yellow Corp, Convoy)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('fintech'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#A78BFA', cursor: 'pointer', fontWeight: 800 }}
                          className="glass-panel-interactive"
                        >
                          💳 Fintech & Subprime Credit (Synapse)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('biotech'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#F472B6', cursor: 'pointer', fontWeight: 800 }}
                          className="glass-panel-interactive"
                        >
                          🧬 Biotech & Synthetic Bio (Amyris)
                        </div>

                        <div 
                          onClick={() => { if (onSelectSector) onSelectSector('telecom'); setIsSectorDropdownOpen(false); }}
                          style={{ padding: '8px 14px', fontSize: '0.78rem', color: '#22D3EE', cursor: 'pointer', fontWeight: 800 }}
                          className="glass-panel-interactive"
                        >
                          📡 Telecom & Fiber (Intelsat)
                        </div>


                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #EF4444 0%, #991B1B 100%)' : 'rgba(30, 41, 59, 0.6)',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    border: isActive ? '1px solid #EF4444' : '1px solid var(--border-subtle)',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: isActive ? 900 : 600,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)',
                    boxShadow: isActive ? '0 4px 14px rgba(239, 68, 68, 0.3)' : 'none'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* Live 12-Hour Marquee Ticker (Auto-collapses to 0px if 0 alerts < 12h old) */}
      <TopTickerMarquee
        breakingNews={breakingNews}
        companies={companies}
        onSelectEntity={(ticker) => {
          if (setSearchQuery) setSearchQuery(ticker);
          if (setActiveTab) setActiveTab('graveyard');
        }}
      />
    </header>
  );
}
