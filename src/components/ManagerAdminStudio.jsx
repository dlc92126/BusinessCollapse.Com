import React, { useState } from 'react';
import { Settings, Cpu, FileEdit, Database, HardDrive, Terminal, Plus, Trash2, CheckCircle2, ShieldAlert, Activity, Play, RefreshCw, Eye, Users, Shield, Award, UserCheck, Search, ArrowLeft } from 'lucide-react';
import MembershipCrmStudio from './MembershipCrmStudio';



export default function ManagerAdminStudio({
  companies,
  setCompanies,
  breakingNews,
  setBreakingNews,
  auctions,
  setAuctions,
  agentLogs,
  onRunIngestSimulation,
  onSwitchToPublic,
  lastIngestionTime,
  onOpenIngestionScheduler,
  onOpenAuditModal,
  onOpenFounders
}) {

  const [adminTab, setAdminTab] = useState('cms'); // 'cms', 'members', 'ai', 'health'
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState(agentLogs);

  // Managed Members State
  const [members, setMembers] = useState([
    { id: 'usr-001', name: 'Gene Miller', email: 'gene@capitalpartners.com', tier: '⚡ VIP Founders Pass ($29)', badge: 'FOUNDER-#042', status: 'ACTIVE', joinDate: '2026-08-04', pacerAccess: true },
    { id: 'usr-002', name: 'Sarah Jenkins', email: 'sjenkins@apexdistressed.com', tier: '🏛️ Terminal ($199/mo)', badge: 'TERMINAL-PRO', status: 'ACTIVE', joinDate: '2026-08-03', pacerAccess: true },
    { id: 'usr-003', name: 'Marcus Vance', email: 'mvance@liquidationcap.com', tier: '⚡ VIP Founders Pass ($29)', badge: 'FOUNDER-#018', status: 'ACTIVE', joinDate: '2026-08-02', pacerAccess: true },
    { id: 'usr-004', name: 'David Croft', email: 'dcroft@restructuringadvisors.com', tier: '⚡ PRO ($49/mo)', badge: 'PRO-MEMBER', status: 'TRIAL', joinDate: '2026-08-01', pacerAccess: false }
  ]);
  const [memberSearch, setMemberSearch] = useState('');

  const toggleMemberStatus = (id) => {
    setMembers(members.map(m => m.id === id ? { ...m, status: m.status === 'ACTIVE' ? 'REVOKED' : 'ACTIVE' } : m));
  };


  // CMS Form State
  const [newAlertName, setNewAlertName] = useState('');
  const [newAlertTicker, setNewAlertTicker] = useState('');
  const [newAlertHeadline, setNewAlertHeadline] = useState('');
  const [newAlertSummary, setNewAlertSummary] = useState('');

  const handleCreateAlert = (e) => {
    e.preventDefault();
    if (newAlertName && newAlertHeadline) {
      const newEntry = {
        id: `breaking-${Date.now()}`,
        isEmergent: true,
        entityName: newAlertName,
        ticker: newAlertTicker || 'DISTRESS',
        lastUpdated: new Date().toISOString(),
        locationJurisdiction: 'Wilmington, DE (U.S. Bankruptcy Court D. Del.)',
        updateFrequency: 'Emergency Admin Filing',
        badgeText: 'MANAGER PUBLISHED ALERT',
        headline: newAlertHeadline,
        summary: newAlertSummary || 'Emergency Chapter 11 motion filed in federal bankruptcy court.',
        keyUpdates: [
          `${new Date().toISOString().slice(11, 16)} EST: Admin Published Emergency Docket Notice.`
        ],
        sourceType: "Manager CMS Entry",
        sourceName: "SEC EDGAR Form 8-K & Bankruptcy Docket"
      };
      setBreakingNews([newEntry, ...(Array.isArray(breakingNews) ? breakingNews : [breakingNews])]);
      setNewAlertName('');
      setNewAlertTicker('');
      setNewAlertHeadline('');
      setNewAlertSummary('');
      alert('New Breaking Distress Alert Published Live to Public Feed!');
    }
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        agent: "Autonomous System Refresh Agent v3.1",
        event: "Manager Ingestion Trigger Executed",
        target: "D:\\Projects\\BusinessCollapse.Com\\data\\companies.json",
        status: "SUCCESS",
        details: "Parsed SEC 8-K filings and PACER Docket #001. Ingested 1 New Case File (Tupperware Brands Corp - TUPQ). Synchronized D: drive storage."
      };
      setLogs([newLog, ...logs]);
      setIsSimulating(false);
      if (onRunIngestSimulation) onRunIngestSimulation();
      alert('🤖 SYSTEM REFRESH SUCCESSFUL!\n\nParsed SEC Form 8-K & PACER Docket #001.\nIngested 1 New Court Case File:\n- Tupperware Brands Corporation (TUPQ)\n\nSwitch to Public View or check the Graveyard / Auctions tab to view the live newly populated data!');
    }, 1200);
  };


  return (
    <div style={{ marginTop: '24px' }}>
      
      {/* Universal Back Button */}
      {onSwitchToPublic && (
        <button
          onClick={onSwitchToPublic}
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

      {/* Admin Header Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px', borderLeft: '4px solid #7C3AED', background: 'linear-gradient(135deg, rgba(20, 10, 30, 0.95) 0%, rgba(10, 15, 28, 0.95) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Settings size={20} color="#C084FC" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C084FC', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                OPERATIONAL MANAGER ADMIN COMMAND CENTER
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFF' }}>
              System Management & Content CMS
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
              Internal operational portal for system managers, data operators, and content editors.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={onRunIngestSimulation}
              disabled={isSimulating}
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)', color: '#FFF', fontWeight: 900, padding: '10px 18px', fontSize: '0.85rem' }}
            >
              <RefreshCw size={16} className={isSimulating ? "animate-spin" : ""} />
              {isSimulating ? "Parsing SEC 8-K..." : "⚡ Trigger System Refresh Now"}
            </button>
            <button
              onClick={onOpenIngestionScheduler}
              className="btn-secondary"
              style={{ padding: '10px 18px', fontSize: '0.85rem', fontWeight: 800 }}
            >
              ⚙️ Scheduler & Cron Settings
            </button>
          </div>
        </div>

        {/* SYSTEM REFRESH BACK OFFICE DAEMON STATUS BAR */}
        <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '10px', padding: '14px 18px', marginTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '8px', borderRadius: '8px' }}>
              <Cpu size={18} color="#10B981" />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 900, textTransform: 'uppercase' }}>
                ⚡ AUTOMATED INGESTION DAEMON ACTIVE (BACK OFFICE MANAGEMENT)
              </div>
              <div style={{ fontSize: '0.88rem', color: '#F8FAFC', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                LAST SYSTEM REFRESH: {lastIngestionTime ? new Date(lastIngestionTime).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' EST' : 'SYNCED'}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {onOpenFounders && (
              <button
                onClick={onOpenFounders}
                style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #F59E0B', color: '#FCD34D', padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                title="View VIP 100-Member Beta Founders Pass Registry & Credentials Roster"
              >
                📜 Executive Founders Roster
              </button>
            )}
            {onOpenAuditModal && (
              <button
                onClick={onOpenAuditModal}
                style={{ background: 'rgba(16, 185, 129, 0.18)', border: '1px solid #10B981', color: '#A7F3D0', padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                title="View Cryptographic SHA-256 Checksum & Diff Certificate"
              >
                🔒 Checksum & Diff Certificate
              </button>
            )}
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              Schedule: <code style={{ color: '#C084FC', background: 'rgba(192, 132, 252, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>*/15 * * * *</code> (Every 15m) • Netlify & Local Sync
            </div>
          </div>
        </div>
      </div>

        {/* Manager Sub-Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <button
            onClick={() => setAdminTab('cms')}
            style={{
              background: adminTab === 'cms' ? 'rgba(124, 58, 237, 0.3)' : 'transparent',
              color: adminTab === 'cms' ? '#C084FC' : 'var(--text-muted)',
              border: adminTab === 'cms' ? '1px solid #7C3AED' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileEdit size={14} /> Content & Alert CMS
          </button>
          <button
            onClick={() => setAdminTab('members')}
            style={{
              background: adminTab === 'members' ? 'rgba(124, 58, 237, 0.3)' : 'transparent',
              color: adminTab === 'members' ? '#C084FC' : 'var(--text-muted)',
              border: adminTab === 'members' ? '1px solid #7C3AED' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Users size={14} /> Membership CRM & Contacts

          </button>

          <button
            onClick={() => setAdminTab('ai')}
            style={{
              background: adminTab === 'ai' ? 'rgba(124, 58, 237, 0.3)' : 'transparent',
              color: adminTab === 'ai' ? '#C084FC' : 'var(--text-muted)',
              border: adminTab === 'ai' ? '1px solid #7C3AED' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Cpu size={14} /> AI Ingest Pipeline
          </button>
          <button
            onClick={() => setAdminTab('health')}
            style={{
              background: adminTab === 'health' ? 'rgba(124, 58, 237, 0.3)' : 'transparent',
              color: adminTab === 'health' ? '#C084FC' : 'var(--text-muted)',
              border: adminTab === 'health' ? '1px solid #7C3AED' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <HardDrive size={14} /> D: Drive Disk & System Health
          </button>
        </div>

      {/* Tab 1: Content & Alert CMS */}
      {adminTab === 'cms' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Quick Publish Alert Form */}
          <div className="glass-panel" style={{ padding: '24px', background: 'rgba(7, 10, 15, 0.7)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={18} color="#C084FC" /> Publish Emergency Breaking Alert
            </h3>
            <form onSubmit={handleCreateAlert} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Entity Name (e.g. Spirit Airlines)"
                  value={newAlertName}
                  onChange={(e) => setNewAlertName(e.target.value)}
                  required
                  style={{ padding: '10px 14px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                />
                <input
                  type="text"
                  placeholder="Ticker (SAVE)"
                  value={newAlertTicker}
                  onChange={(e) => setNewAlertTicker(e.target.value)}
                  style={{ padding: '10px 14px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              <input
                type="text"
                placeholder="Alert Headline (e.g. Emergency Lease Rejection Approved)"
                value={newAlertHeadline}
                onChange={(e) => setNewAlertHeadline(e.target.value)}
                required
                style={{ padding: '10px 14px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
              />

              <textarea
                rows={3}
                placeholder="Fluid Situation Summary..."
                value={newAlertSummary}
                onChange={(e) => setNewAlertSummary(e.target.value)}
                style={{ padding: '10px 14px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#FFF', fontSize: '0.85rem', outline: 'none', resize: 'none' }}
              />

              <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)', alignSelf: 'flex-start' }}>
                Publish Live to Public Feed →
              </button>
            </form>
          </div>

          {/* Active Entities List */}
          <div className="glass-panel" style={{ padding: '24px', background: 'rgba(7, 10, 15, 0.7)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={18} color="#C084FC" /> Managed Case Files ({companies.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '380px', overflowY: 'auto' }}>
              {companies.map((c) => (
                <div key={c.id} style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#FFF', fontSize: '0.9rem' }}>{c.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: '6px', fontFamily: 'var(--font-mono)' }}>({c.ticker})</span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Status: <span style={{ color: '#FF5252' }}>{c.status}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(124, 58, 237, 0.2)', color: '#C084FC', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(124, 58, 237, 0.4)' }}>
                    Active Entity
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Membership CRM & Contact Roster */}
      {adminTab === 'members' && (
        <MembershipCrmStudio />
      )}



      {/* Tab 2: AI Ingest Pipeline */}
      {adminTab === 'ai' && (
        <div>
          <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', background: 'rgba(7, 10, 15, 0.7)', border: '1px solid rgba(124, 58, 237, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>Autonomous Ingestion Crawler Control</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Triggers SEC EDGAR 8-K parser and updates D: drive primary datasets.</p>
            </div>
            <button
              className="btn-primary"
              onClick={handleSimulate}
              disabled={isSimulating}
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)' }}
            >
              {isSimulating ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
              {isSimulating ? 'Executing Ingest Agent...' : 'Trigger AI Ingest Run'}
            </button>
          </div>

          <div className="glass-panel" style={{ padding: '24px', background: '#070A0F', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Terminal size={18} color="#C084FC" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>Live Ingestion Execution Terminal Logs</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              {logs.map((log) => (
                <div key={log.id} style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: '#C084FC', fontWeight: 700, marginBottom: '2px' }}>[{log.timestamp}] {log.agent}</div>
                  <div style={{ color: '#FFF' }}>Event: {log.event} ({log.target})</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>{log.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: D: Drive Health */}
      {adminTab === 'health' && (
        <div className="glass-panel" style={{ padding: '24px', background: 'rgba(7, 10, 15, 0.7)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HardDrive size={18} color="#C084FC" /> System Storage & Disk Audit
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>PRIMARY DISK STORAGE</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>D:\Projects\BusinessCollapse.Com\data\</div>
              <div style={{ fontSize: '0.75rem', color: '#10B981' }}>✓ Primary Disk Mounted</div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>A2A AGENT FEED API STATUS</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>/api/distress.json</div>
              <div style={{ fontSize: '0.75rem', color: '#10B981' }}>✓ Machine-Readable Active</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
