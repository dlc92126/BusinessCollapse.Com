import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, MapPin, Gavel, ChevronRight, CheckCircle2, Bell, Flame, Share2 } from 'lucide-react';

function IndividualAlertBanner({ alert, onSelectEntity, onOpenAuctions, onOpenBulletinModal, onOpenShare }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedMaterialTime = alert.formattedMaterialChange || (alert.lastUpdated ? alert.lastUpdated.replace('T', ' ').replace('Z', ' EST') : `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} EST`);
  const formattedSweepTime = alert.formattedLastSweep || `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} EST`;

  // Calculate age in hours
  const alertTime = alert.lastMaterialChangeDate || alert.lastUpdated || alert.dateTimestamp;
  const hoursAgo = alertTime ? Math.max(1, Math.round((new Date().getTime() - new Date(alertTime).getTime()) / (1000 * 3600))) : 2;
  const isBreaking = hoursAgo <= 4;

  return (
    <div
      className="glass-panel"
      style={{
        padding: '0',
        overflow: 'hidden',
        marginBottom: '16px',
        border: isBreaking ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(245, 158, 11, 0.4)',
        background: 'rgba(15, 23, 42, 0.85)',
        boxShadow: isBreaking ? '0 4px 20px rgba(239, 68, 68, 0.25)' : '0 4px 20px rgba(245, 158, 11, 0.15)'
      }}
    >
      {/* Refined Executive Banner Bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          color: '#F8FAFC',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          flexWrap: 'wrap',
          gap: '12px',
          userSelect: 'none',
          borderBottom: isExpanded ? '1px solid var(--border-subtle)' : 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '320px', flexWrap: 'wrap' }}>
          <span className="pulse-dot critical"></span>
          
          {/* Glowing 12-Hour Freshness Badge */}
          {isBreaking ? (
            <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'rgba(239, 68, 68, 0.25)', color: '#FCA5A5', border: '1px solid #EF4444', padding: '2px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Flame size={12} /> 🔥 BREAKING ({hoursAgo}h ago)
            </span>
          ) : (
            <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', background: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D', border: '1px solid #F59E0B', padding: '2px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} /> ⚡ NEW ({hoursAgo}h ago)
            </span>
          )}

          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#F8FAFC', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <strong style={{ color: isBreaking ? '#EF4444' : '#F59E0B' }}>{alert.entityName} ({alert.ticker}):</strong> {alert.headline}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', fontWeight: 600, flexWrap: 'wrap' }}>
          {/* Surface Auction Quick Pill */}
          {alert.auctionPortalUrl && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenAuctions) onOpenAuctions(alert);
              }}
              style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '3px 10px', borderRadius: '5px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              title="Click to view court auction details"
            >
              <Gavel size={13} /> AUCTION LIVE
            </span>
          )}

          {/* Location Tag */}
          <span style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={13} color="#EF4444" /> {alert.locationJurisdiction || 'SDNY Court'}
          </span>

          {/* System Refresh Timestamp */}
          <span style={{ color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} /> System Refresh: {formattedSweepTime}
          </span>

          {/* Upper Right Corner Share Button */}
          {onOpenShare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenShare(alert);
              }}
              style={{
                background: 'rgba(56, 189, 248, 0.18)',
                border: '1px solid #38BDF8',
                color: '#38BDF8',
                padding: '4px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem',
                transition: 'var(--transition-fast)'
              }}
              title="Share alert across social media or copy link"
            >
              <Share2 size={13} /> Share
            </button>
          )}

          <button
            style={{
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid var(--border-subtle)',
              color: '#F8FAFC',
              padding: '4px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem'
            }}
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Expanded Accordion Body */}
      {isExpanded && (
        <div style={{ padding: '20px 24px', background: 'rgba(7, 10, 15, 0.8)', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>DEBT / LIABILITIES</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FF3B5C', fontFamily: 'var(--font-mono)' }}>{alert.totalDebt || '$1.10B Senior Debt'}</div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>ESTIMATED JOBS AT RISK</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FF9F43', fontFamily: 'var(--font-mono)' }}>{alert.jobsLost || 3400} Employees</div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>SOURCE PROVENANCE</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF' }}>{alert.sourceName || 'SEC Form 8-K Filing'}</div>
            </div>
          </div>

          <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
            {alert.summary}
          </p>

          {alert.keyUpdates && alert.keyUpdates.length > 0 && (
            <div style={{ marginBottom: '16px', background: 'rgba(15, 23, 42, 0.5)', padding: '14px', borderRadius: '8px', borderLeft: '3px solid #7C3AED' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C084FC', marginBottom: '8px', textTransform: 'uppercase' }}>
                📜 KEY COURT DOCKET UPDATES INDEXED BY AI:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {alert.keyUpdates.map((update, idx) => (
                  <div key={idx} style={{ fontSize: '0.8rem', color: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>• {update}</span>
                    <span style={{ fontSize: '0.7rem', color: '#C084FC', fontWeight: 800, whiteSpace: 'nowrap', marginLeft: '10px' }}>
                      Inspect Docket →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              className="btn-secondary"
              onClick={() => {
                if (onOpenBulletinModal) onOpenBulletinModal(alert);
              }}
              style={{ fontSize: '0.78rem', padding: '6px 14px' }}
            >
              📜 Open Docket & Hearing Inspector →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BreakingNewsHero({ breakingNews, onSelectEntity, onOpenAuctions, onOpenBulletinModal, onOpenShare }) {
  const alertsList = Array.isArray(breakingNews) ? breakingNews : [breakingNews];
  
  // STRICT 12-HOUR FILTER & AUTO-COLLAPSE RULE
  const nowTime = new Date().getTime();
  const activeAlerts = alertsList.filter(a => {
    if (!a || !a.isEmergent) return false;
    const aTime = a.lastMaterialChangeDate || a.lastUpdated || a.dateTimestamp;
    if (!aTime) return true; // Keep fresh emergent alerts without timestamps
    const hoursAgo = (nowTime - new Date(aTime).getTime()) / (1000 * 3600);
    return hoursAgo <= 12; // STRICTLY COLLAPSE AWAY IF > 12 HOURS OLD!
  });

  // AUTO-COLLAPSE ENTIRE DISTRESS WIRE TO ZERO PIXELS IF 0 ALERTS < 12 HOURS OLD!
  if (activeAlerts.length === 0) return null;

  return (
    <div style={{ marginBottom: '20px' }}>
      {activeAlerts.map((alert) => (
        <IndividualAlertBanner
          key={alert.id}
          alert={alert}
          onSelectEntity={onSelectEntity}
          onOpenAuctions={onOpenAuctions}
          onOpenBulletinModal={onOpenBulletinModal}
          onOpenShare={onOpenShare}
        />
      ))}
    </div>
  );
}
