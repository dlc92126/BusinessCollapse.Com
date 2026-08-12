import React, { useState, useRef, useEffect } from 'react';
import { Activity, Search, Shield, X, BellRing, Sparkles, UserCheck, Clock, Settings, Lock, HelpCircle, Zap, LogIn, Skull, Mail } from 'lucide-react';
import TopTickerMarquee from './TopTickerMarquee';

export default function Header({
  activeTab,
  setActiveTab,
  activeWorkspace = 'all',
  setActiveWorkspace = () => {},
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
  breakingNews = [],
  onOpenNewsroomStudio,
  onOpenEmailClient,
  onOpenSubscriberBackOffice,
  dismissedCompanyIds = []
}) {



  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

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
    { id: 'graveyard_archive', label: '🪦 CORPORATE GRAVEYARD' }
  ];


  if (viewMode === 'manager') {
    allTabs.push({ id: 'admin', label: '🤖 AI MANAGER STUDIO' });
  }

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-header)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: isHeaderCollapsed ? '4px' : '16px' }}>
      
      {/* 1-ROW ULTRA-COMPACT COLLAPSED TOP HEADER BAR WITH DIFFUSE METALLIC MOTIF */}
      {isHeaderCollapsed ? (
        <div style={{
          width: '100%',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          background: 'linear-gradient(135deg, rgba(9, 13, 22, 0.98) 0%, rgba(15, 23, 42, 0.95) 100%)',
          borderBottom: '1px solid rgba(239, 68, 68, 0.4)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
          flexWrap: 'wrap'
        }}>
          {/* LEFT: Diffuse Metallic Motif Brand Logo */}
          <div 
            onClick={() => setActiveTab('graveyard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              padding: '4px 12px',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '8px',
              boxShadow: '0 0 12px rgba(239, 68, 68, 0.2)'
            }}
            className="glass-panel-interactive"
            title="BusinessCollapse.com — Public Terminal Home"
          >
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 7.5px rgba(239, 68, 68, 0.45)'
            }}>
              <Skull size={15} color="#FFF" />
            </div>
            <span style={{
              fontSize: '1.08rem',
              fontWeight: 950,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
              color: '#F8FAFC'
            }}>
              BUSINESS<span style={{ color: '#EF4444', textShadow: '0 0 8px rgba(239, 68, 68, 0.5)' }}>COLLAPSE.COM</span>
            </span>
          </div>

          {/* MIDDLE: Global Compact Search & Welcome Brief */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '0 1 420px' }}>
            <div ref={searchRef} style={{ position: 'relative', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(9, 13, 22, 0.9)', border: isSearchFocused ? '1.5px solid #EF4444' : '1px solid var(--border-subtle)', borderRadius: '6px', padding: '4px 10px', gap: '6px' }}>
                <Search size={14} color={isSearchFocused ? '#EF4444' : '#64748B'} />
                <input
                  type="text"
                  placeholder="Search ticker, court docket, or entity..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsSearchFocused(true); }}
                  onFocus={() => setIsSearchFocused(true)}
                  style={{ background: 'transparent', border: 'none', color: '#F8FAFC', fontSize: '0.78rem', outline: 'none', width: '100%' }}
                />
                {searchQuery && <X size={12} color="#64748B" style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />}
              </div>

              {isSearchFocused && searchResults.length > 0 && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#0F172A', border: '1px solid var(--border-subtle)', borderRadius: '8px', boxShadow: '0 12px 36px rgba(0,0,0,0.8)', maxHeight: '240px', overflowY: 'auto', zIndex: 100 }}>
                  {searchResults.map((c) => (
                    <div key={c.id} onClick={() => { if (onSelectCompany) onSelectCompany(c); setIsSearchFocused(false); }} style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#F8FAFC' }}>{c.name}</div>
                        <div style={{ fontSize: '0.68rem', color: '#64748B' }}>{c.primaryCause}</div>
                      </div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#EF4444', background: 'rgba(239,68,68,0.1)', padding: '2px 6px', borderRadius: '4px' }}>{c.ticker}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={onOpenWelcome} style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38BDF8', border: '1px solid #38BDF8', padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 900, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
              <Zap size={13} color="#38BDF8" /> Welcome Brief
            </button>
          </div>

          {/* RIGHT: VIP Membership + Account + Log In + Expand Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={onOpenOnboarding} className="btn-primary" style={{ height: '32px', fontSize: '0.76rem', padding: '0 12px', gap: '4px', whiteSpace: 'nowrap' }}>
              <Shield size={13} /> VIP Membership
            </button>

            <button onClick={onOpenAccountSettings} style={{ height: '32px', background: 'rgba(124, 58, 237, 0.3)', color: '#FFF', border: '1px solid #C084FC', padding: '0 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 900, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
              <Settings size={13} /> Account
            </button>

            <button onClick={onOpenSignIn} style={{ height: '32px', background: 'rgba(2, 132, 199, 0.2)', color: '#38BDF8', border: '1px solid #38BDF8', padding: '0 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 900, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
              <LogIn size={12} color="#38BDF8" /> Log In
            </button>

            <button
              onClick={() => setIsHeaderCollapsed(false)}
              style={{ height: '32px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#000', border: 'none', padding: '0 10px', borderRadius: '6px', fontSize: '0.74rem', fontWeight: 900, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)', whiteSpace: 'nowrap' }}
              title="Expand Full Dual-Box Branding & Utility Console"
            >
              🔽 Expand Header
            </button>
          </div>
        </div>
      ) : (
        /* EXPANDED FULL DUAL-BOX HEADER LAYOUT WITH COLLAPSE TOGGLE BUTTON */
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
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
            position: 'relative'
          }}>
            
            {/* Top Utilities Row: Search, Centered Welcome Brief, Membership Onboarding, Account, Collapse Button */}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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

                  <button
                    onClick={onOpenEmailClient}
                    style={{
                      height: '38px',
                      boxSizing: 'border-box',
                      fontSize: '0.78rem',
                      padding: '0 12px',
                      gap: '6px',
                      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(185, 28, 28, 0.3) 100%)',
                      color: '#FCA5A5',
                      border: '1.5px solid #EF4444',
                      borderRadius: '8px',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 0 14px rgba(239, 68, 68, 0.3)'
                    }}
                    className="glass-panel-interactive"
                    title="Back Office Executive Email Client Workstation"
                  >
                    <Mail size={14} color="#EF4444" /> 📧 MAIL CLIENT
                  </button>
                </div>
              )}

              {/* CENTERED PROMINENT WELCOME BRIEF BUTTON */}
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

              {/* VIP Access / Onboarding & Account Utility Buttons + Collapse Toggle Button */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '38px' }} title="Claim 1 of 100 Free Beta Founder Pass Spots">
                  <button
                    onClick={onOpenOnboarding}
                    className="btn-primary"
                    style={{ height: '38px', boxSizing: 'border-box', fontSize: '0.82rem', padding: '0 16px', gap: '6px', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}
                  >
                    <Shield size={14} /> VIP Membership
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                      title="Settings & Account: AI Concierge, Support Tickets, PIN Vault & Manual"
                    >
                      <Settings size={15} color="#FFF" /> ⚙️ Settings & Account
                    </button>

                    <button
                      onClick={() => setIsHeaderCollapsed(true)}
                      style={{
                        height: '38px',
                        boxSizing: 'border-box',
                        fontSize: '0.74rem',
                        padding: '0 10px',
                        gap: '4px',
                        background: 'rgba(30, 41, 59, 0.85)',
                        color: '#F8FAFC',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        whiteSpace: 'nowrap'
                      }}
                      title="Collapse Top Header into Single Elegant Row"
                    >
                      ▲ Collapse Bar
                    </button>
                  </div>

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
          </div>
        </div>
      )}

      {/* Live 12-Hour Marquee Ticker Feed */}
      <TopTickerMarquee
        breakingNews={breakingNews}
        companies={companies}
        onSelectEntity={(ticker) => {
          if (setSearchQuery) setSearchQuery(ticker);
          if (setActiveTab) setActiveTab('graveyard');
        }}
      />

      {/* HEROIC WORKSTATIONS BAR — DIRECTLY UNDER TICKER FEED, UNCOUPLED, CENTERED & 30% LARGER */}
      <div style={{
        width: '100%',
        background: 'linear-gradient(135deg, rgba(7, 10, 15, 0.99) 0%, rgba(15, 23, 42, 0.98) 100%)',
        borderTop: '2px solid rgba(255, 42, 75, 0.45)',
        borderBottom: '2px solid rgba(255, 42, 75, 0.45)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        marginTop: '2px',
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.85)'
      }}>
        {[
          { id: 'all', label: '🔥 LIVE DISTRESS WIRE', color: '#EF4444', desc: 'Active Restructuring & Chapter 11 Feed (Liveyard)' },
          { id: 'investor', label: '📈 INVESTOR TERMINAL', color: '#10B981', desc: 'Distress Heatmap, DIP Loans & Waterfall' },
          { id: 'marketplace', label: '🔨 363 MARKETPLACE', color: '#EC4899', desc: '363 Auction Directory & Diligence Vault' },
          { id: 'creditor', label: '🛡️ CREDITOR ACTION', color: '#8B5CF6', desc: 'Form 410 Claim Wizard & Bar Dates' },
          { id: 'sub10m', label: '🏬 SUB-$10M RADAR', color: '#A855F7', desc: 'Sub-$10M Subchapter V Regional Distress Radar' },
          { id: 'headhunter', label: '👔 EXECUTIVE TALENT', color: '#F59E0B', desc: 'Talent Raid Radar & WARN Feed' },
          { id: 'media', label: '📰 MEDIA & PRESS', color: '#38BDF8', desc: 'AI Newsroom, AP Wires & Editorial Suite' },
          { id: 'graveyard_archive', label: '🪦 GRAVEYARD ARCHIVE', color: '#64748B', desc: 'Post-Mortem Discharged Insolvencies & Final Decrees' }
        ].map(ws => {
          const isActive = activeWorkspace === ws.id || 
                           (ws.id === 'graveyard_archive' && activeTab === 'graveyard_archive') ||
                           (ws.id === 'sub10m' && activeTab === 'sub10m');
          return (
            <button
              key={ws.id}
              onClick={() => {
                if (ws.id === 'graveyard_archive') {
                  setActiveWorkspace('all');
                  if (setActiveTab) setActiveTab('graveyard_archive');
                } else if (ws.id === 'sub10m') {
                  setActiveWorkspace('all');
                  if (setActiveTab) setActiveTab('sub10m');
                } else {
                  setActiveWorkspace(ws.id);
                  if (ws.id === 'all' && setActiveTab) setActiveTab('graveyard');
                }
              }}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: 950,
                cursor: 'pointer',
                letterSpacing: '0.03em',
                border: isActive ? `2px solid ${ws.color}` : `1.5px solid ${ws.color}65`,
                background: isActive 
                  ? `linear-gradient(135deg, ${ws.color}50 0%, ${ws.color}20 100%)` 
                  : `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)`,
                color: '#FFFFFF',
                textShadow: '0 1px 3px rgba(0,0,0,0.95)',
                boxShadow: isActive 
                  ? `0 0 20px ${ws.color}75, inset 0 0 10px ${ws.color}30` 
                  : `0 0 10px ${ws.color}25`,
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px'
              }}
              title={ws.desc}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: ws.color, boxShadow: `0 0 10px ${ws.color}` }} />
              {ws.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
