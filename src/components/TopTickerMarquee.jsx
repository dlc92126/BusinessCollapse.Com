import React from 'react';
import { Flame, Clock, ShieldAlert, ChevronRight, Zap } from 'lucide-react';

export default function TopTickerMarquee({ breakingNews = [], onSelectEntity }) {
  const alertsList = Array.isArray(breakingNews) ? breakingNews : [breakingNews];
  
  // STRICT 12-HOUR FILTER & AUTO-COLLAPSE RULE
  const nowTime = new Date().getTime();
  const activeAlerts = alertsList.filter(a => {
    if (!a) return false;
    const aTime = a.lastMaterialChangeDate || a.lastUpdated || a.dateTimestamp;
    if (!aTime) return false; // Strictly require valid timestamp
    const hoursAgo = (nowTime - new Date(aTime).getTime()) / (1000 * 3600);
    return hoursAgo >= 0 && hoursAgo <= 12; // STRICTLY COLLAPSE AWAY IF > 12 HOURS OLD!
  });

  // AUTO-COLLAPSE ENTIRE TICKER TO ZERO PIXELS IF 0 ALERTS < 12 HOURS OLD!
  if (activeAlerts.length === 0) return null;

  return (
    <div
      style={{
        width: '100%',
        background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.25) 0%, rgba(15, 23, 42, 0.95) 50%, rgba(245, 158, 11, 0.2) 100%)',
        borderBottom: '1px solid rgba(239, 68, 68, 0.4)',
        padding: '6px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        zIndex: 90
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
          gap: 24px;
          white-space: nowrap;
          animation: marqueeScroll 39s linear infinite;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Ticker Fixed Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', flexShrink: 0, zIndex: 10, background: 'rgba(15, 23, 42, 0.95)', paddingRight: '8px' }}>
        <span className="pulse-dot critical"></span>
        <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#FCA5A5', background: 'rgba(239, 68, 68, 0.3)', border: '1px solid #EF4444', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          ⚡ LIVE 12-HR DISTRESS TICKER
        </span>
      </div>

      {/* Ticker Continuous Smooth Scrolling Track */}
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div className="marquee-track">
          {[...activeAlerts, ...activeAlerts].map((alert, idx) => {
            const alertTime = alert.lastMaterialChangeDate || alert.lastUpdated || alert.dateTimestamp;
            const hoursAgo = alertTime ? Math.max(1, Math.round((nowTime - new Date(alertTime).getTime()) / (1000 * 3600))) : 2;
            const isBreaking = hoursAgo <= 4;


          return (
            <div
              key={alert.id || idx}
              onClick={() => {
                if (onSelectEntity) onSelectEntity(alert.ticker || alert.entityName);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '0.78rem',
                color: '#F8FAFC',
                background: 'rgba(15, 23, 42, 0.7)',
                padding: '3px 10px',
                borderRadius: '6px',
                border: isBreaking ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(245, 158, 11, 0.4)',
                transition: 'all 0.2s ease'
              }}
              className="glass-panel-interactive"
              title="Click to view full corporate case file"
            >
              {isBreaking ? (
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#FCA5A5', background: 'rgba(239, 68, 68, 0.3)', padding: '1px 6px', borderRadius: '3px' }}>
                  🔥 BREAKING ({hoursAgo}h ago)
                </span>
              ) : (
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#FCD34D', background: 'rgba(245, 158, 11, 0.25)', padding: '1px 6px', borderRadius: '3px' }}>
                  ⚡ NEW ({hoursAgo}h ago)
                </span>
              )}

              <strong style={{ color: isBreaking ? '#EF4444' : '#F59E0B' }}>
                {alert.entityName} ({alert.ticker}):
              </strong>
              <span style={{ color: '#E2E8F0' }}>{alert.headline || alert.summary}</span>

              <ChevronRight size={13} color={isBreaking ? '#EF4444' : '#F59E0B'} />
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
