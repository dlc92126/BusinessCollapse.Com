import React, { useState, useEffect } from 'react';
import { X, Clock, RefreshCw, Zap, CheckCircle2, Play, Calendar, ShieldAlert, Cpu, Settings, ToggleLeft, ToggleRight, Database } from 'lucide-react';

export default function IngestionSchedulerModal({
  isOpen,
  onClose,
  lastIngestionTime,
  onTriggerIngest,
  indexedCount
}) {
  const [isAutoEnabled, setIsAutoEnabled] = useState(true);
  const [frequency, setFrequency] = useState('15m');
  const [cronExpression, setCronExpression] = useState('*/15 * * * *');
  const [selectedSources, setSelectedSources] = useState({
    pacer: true,
    edgar: true,
    ucc: true,
    auctions: true
  });
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestSuccessMsg, setIngestSuccessMsg] = useState('');
  const [countdown, setCountdown] = useState(864); // 14m 24s in seconds

  // Auto-countdown timer simulation
  useEffect(() => {
    let timer;
    if (isAutoEnabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (onTriggerIngest) onTriggerIngest();
            return 900;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAutoEnabled, onTriggerIngest]);

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  if (!isOpen) return null;

  const handleRunNow = () => {
    setIsIngesting(true);
    setIngestSuccessMsg('');
    setTimeout(() => {
      if (onTriggerIngest) onTriggerIngest();
      setIsIngesting(false);
      setIngestSuccessMsg('✅ System Refresh Pipeline Executed! Form 8-K disclosures & PACER Dockets Processed. Database synchronized & saved to LocalStorage!');
      setCountdown(900); // Reset timer to 15m
    }, 1200);
  };

  const formattedLastRun = lastIngestionTime 
    ? new Date(lastIngestionTime).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' EST'
    : new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' EST';


  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999, position: 'fixed', inset: 0, background: 'rgba(3, 7, 18, 0.88)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      
      <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '840px', maxHeight: '90vh', overflowY: 'auto', background: '#0B111E', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '16px', boxShadow: '0 25px 60px -15px rgba(16, 185, 129, 0.3)' }}>
        
        {/* Header Bar */}
        <div style={{ padding: '24px 30px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>
              <Clock size={22} color="#FFF" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFF' }}>System Refresh Scheduler & Status</h2>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#000', background: '#10B981', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  AUTOMATION DAEMON ACTIVE
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Automated PACER docket crawlers, SEC Form 8-K parsers, and cron schedule settings</p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '6px', borderRadius: '8px' }}>
            <X size={22} />
          </button>
        </div>

        <div style={{ padding: '30px' }}>
          
          {/* Status Overview Card */}
          <div style={{ background: 'rgba(15, 23, 42, 0.85)', borderRadius: '14px', border: '1px solid var(--border-subtle)', padding: '20px 24px', marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                ⚡ LAST INGESTION COMPLETED
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#10B981', fontFamily: 'var(--font-mono)' }}>
                {formattedLastRun}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Status: 100% Synced ({indexedCount || 150} Entities Indexed)
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                ⏳ NEXT AUTOMATED INGESTION RUN
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>
                {isAutoEnabled ? formatCountdown(countdown) : 'SCHEDULE PAUSED'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Cron Schedule: <code style={{ color: '#C084FC' }}>{cronExpression}</code>
              </div>
            </div>

          </div>

          {/* Trigger Ingestion Button Banner */}
          <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '12px', padding: '20px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>
                Execute Manual System Refresh Pipeline
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Force an immediate poll of federal PACER court dockets, SEC 8-K filings, and liquidation schedules.
              </p>
            </div>

            <button
              onClick={handleRunNow}
              disabled={isIngesting}
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
                color: '#FFF',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 900,
                cursor: isIngesting ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
              }}
            >
              <RefreshCw size={18} className={isIngesting ? 'animate-spin' : ''} />
              {isIngesting ? "Running AI Pipeline..." : "⚡ Trigger System Refresh Now"}
            </button>
          </div>

          {ingestSuccessMsg && (
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.5)', padding: '12px 16px', borderRadius: '10px', color: '#FFF', fontSize: '0.85rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={20} color="#10B981" />
              {ingestSuccessMsg}
            </div>
          )}

          {/* Schedule Configuration Settings */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', border: '1px solid var(--border-subtle)', padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={18} color="#10B981" /> Automated Ingestion Schedule Settings
              </h4>

              {/* Enable/Disable Toggle */}
              <div 
                onClick={() => setIsAutoEnabled(!isAutoEnabled)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(7, 10, 15, 0.8)', padding: '6px 14px', borderRadius: '20px', border: '1px solid var(--border-subtle)' }}
              >
                <span style={{ fontSize: '0.78rem', color: isAutoEnabled ? '#10B981' : 'var(--text-dim)', fontWeight: 800 }}>
                  {isAutoEnabled ? 'AUTOMATION ENABLED' : 'AUTOMATION PAUSED'}
                </span>
                {isAutoEnabled ? <ToggleRight size={26} color="#10B981" /> : <ToggleLeft size={26} color="var(--text-dim)" />}
              </div>
            </div>

            {/* Frequency Options */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                Ingestion Frequency Interval:
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                {[
                  { id: '15m', label: '⚡ Every 15 Minutes', cron: '*/15 * * * *', note: 'Recommended for PACER Monitoring' },
                  { id: '30m', label: '🕒 Every 30 Minutes', cron: '*/30 * * * *', note: 'Standard Operations' },
                  { id: '1h', label: '⏰ Every Hour', cron: '0 * * * *', note: 'Off-Peak Hours' },
                  { id: 'daily', label: '📅 Daily at 09:00 AM', cron: '0 9 * * *', note: 'Morning Report Sync' }
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setFrequency(opt.id);
                      setCronExpression(opt.cron);
                      setCountdown(opt.id === '15m' ? 900 : opt.id === '30m' ? 1800 : 3600);
                    }}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      background: frequency === opt.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(7, 10, 15, 0.6)',
                      border: frequency === opt.id ? '1px solid #10B981' : '1px solid var(--border-subtle)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: frequency === opt.id ? '#FFF' : 'var(--text-main)' }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                      {opt.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Data Sources Checkboxes */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                Target Crawl Sources:
              </label>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {[
                  { key: 'pacer', label: 'Federal PACER Court Dockets' },
                  { key: 'edgar', label: 'SEC EDGAR 8-K Filings' },
                  { key: 'ucc', label: 'State UCC Tax Liens' },
                  { key: 'auctions', label: 'Auctioneer Webcast Schedules' }
                ].map((src) => (
                  <label key={src.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#FFF' }}>
                    <input
                      type="checkbox"
                      checked={selectedSources[src.key]}
                      onChange={(e) => setSelectedSources({ ...selectedSources, [src.key]: e.target.checked })}
                      style={{ accentColor: '#10B981', cursor: 'pointer' }}
                    />
                    {src.label}
                  </label>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
