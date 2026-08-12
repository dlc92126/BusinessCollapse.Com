import React from 'react';
import { Newspaper, Users, TrendingUp, Hammer, ShieldAlert, Sparkles, Download, FileText, ExternalLink, Filter, CheckCircle } from 'lucide-react';

export default function WorkspaceCommandBar({
  activeWorkspace,
  setActiveWorkspace,
  onOpenNewsroomStudio,
  onOpenEmailClient,
  onOpenOnboarding,
  onOpenForm410Wizard,
  onOpenClaimsDesk
}) {
  if (!activeWorkspace || activeWorkspace === 'all') return null;

  const configs = {
    media: {
      title: '📰 MEDIA & PRESS SUITE',
      badge: 'AP WIRE DISPATCH & CITATION VERIFIER',
      priceTag: '$299/mo Media Wire Pass',
      color: '#38BDF8',
      desc: 'Automated press wire synthesis, 1-click court PDF citation links, and embeddable restructuring graphics.',
      actions: [
        { label: '⚡ Instant AI Newsroom Studio', action: onOpenNewsroomStudio, primary: true },
        { label: '📧 Dispatch Executive Press Release', action: onOpenEmailClient, primary: false },
        { label: '🔒 Upgrade to Media Pass ($299)', action: onOpenOnboarding, primary: false }
      ]
    },
    headhunter: {
      title: '👔 HEADHUNTER & EXECUTIVE TALENT SUITE',
      badge: 'TALENT RAID RADAR & EXECUTIVE SCRAPER',
      priceTag: '$299/mo Headhunter Pass',
      color: '#F59E0B',
      desc: 'Real-time 50-state WARN Act layoff notice tracking, C-suite displacement timelines, and executive CRM export.',
      actions: [
        { label: '📡 Launch Talent Raid Radar', action: () => {}, primary: true },
        { label: '💼 Export Executive Leads (Salesforce/HubSpot)', action: () => {}, primary: false },
        { label: '🔒 Upgrade to Headhunter Pass ($299)', action: onOpenOnboarding, primary: false }
      ]
    },
    investor: {
      title: '📈 INVESTOR & LENDER TERMINAL',
      badge: 'PRE-FILING DISTRESS & WATERFALL SIMULATOR',
      priceTag: '$999/mo Institutional Terminal',
      color: '#10B981',
      desc: 'Capital stack priority modeling, DIP loan terms, Rule 3001(e) claims trading desk, and PACER PIN vault access.',
      actions: [
        { label: '💳 DIP Loan & Credit Monitor', action: () => {}, primary: true },
        { label: '📊 Launch Waterfall Simulator', action: () => {}, primary: false },
        { label: '🔒 Upgrade to Institutional ($999)', action: onOpenOnboarding, primary: false }
      ]
    },
    marketplace: {
      title: '🔨 SECTION 363 ASSET & LIQUIDATION MARKETPLACE',
      badge: 'DILIGENCE VAULT & AUCTION DIRECTORY',
      priceTag: '$499/mo Sales Conquest Pass',
      color: '#EC4899',
      desc: 'Court-supervised asset auctions, stalking horse APA agreements, cure cost lists, and verified broker network.',
      actions: [
        { label: '🏛️ Explore 363 Auction Directory', action: () => {}, primary: true },
        { label: '📄 Download 363 Diligence Brief PDF', action: () => {}, primary: false },
        { label: '🔒 Upgrade to 363 Marketplace Pass ($499)', action: onOpenOnboarding, primary: false }
      ]
    },
    creditor: {
      title: '🛡️ CREDITOR ACTION CENTER',
      badge: 'PROOF OF CLAIM WIZARD & LEASE REJECTION HUB',
      priceTag: '$0 Free Access / $299/mo Landlord Tier',
      color: '#8B5CF6',
      desc: '1-click Official Form 410 Proof of Claim generator, bar date countdown alerts, and commercial lease rejection hub.',
      actions: [
        { label: '📝 File Official Form 410 Claim', action: onOpenForm410Wizard, primary: true },
        { label: '🏢 Check Commercial Lease Assumption Status', action: () => {}, primary: false },
        { label: '🔒 Claim 1 of 100 Free Founder Passes ($0)', action: onOpenOnboarding, primary: false }
      ]
    }
  };

  const current = configs[activeWorkspace];
  if (!current) return null;

  return (
    <div style={{
      width: '100%',
      marginBottom: '20px',
      background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 22, 0.98) 100%)`,
      border: `2px solid ${current.color}`,
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${current.color}30`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      flexWrap: 'wrap',
      transition: 'all 0.3s ease'
    }}>
      {/* Left: Info Header */}
      <div style={{ flex: '1 1 400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span style={{ fontSize: '1.15rem', fontWeight: 950, color: '#FFFFFF', letterSpacing: '0.04em' }}>
            {current.title}
          </span>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 900,
            color: current.color,
            background: `${current.color}20`,
            border: `1px solid ${current.color}60`,
            padding: '2px 8px',
            borderRadius: '4px',
            textTransform: 'uppercase'
          }}>
            {current.badge}
          </span>
        </div>
        <p style={{ fontSize: '0.84rem', color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>
          {current.desc}
        </p>
      </div>

      {/* Right: Action Buttons & Price Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#E2E8F0', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '6px' }}>
          {current.priceTag}
        </span>

        {current.actions.map((act, i) => (
          <button
            key={i}
            onClick={act.action}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 900,
              cursor: 'pointer',
              border: act.primary ? `1.5px solid ${current.color}` : '1px solid rgba(255, 255, 255, 0.2)',
              background: act.primary ? `linear-gradient(135deg, ${current.color} 0%, ${current.color}CC 100%)` : 'rgba(30, 41, 59, 0.8)',
              color: act.primary ? '#000000' : '#FFFFFF',
              boxShadow: act.primary ? `0 0 16px ${current.color}60` : 'none',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {act.label}
          </button>
        ))}

        <button
          onClick={() => setActiveWorkspace('all')}
          style={{
            padding: '8px 10px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 800,
            cursor: 'pointer',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#EF4444',
            whiteSpace: 'nowrap'
          }}
          title="Return to Full Ecosystem Overview"
        >
          ✖ Exit Workspace
        </button>
      </div>
    </div>
  );
}
