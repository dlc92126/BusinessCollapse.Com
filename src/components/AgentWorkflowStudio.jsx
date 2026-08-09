import React, { useState } from 'react';
import { Cpu, Play, CheckCircle2, Server, Database, FileText, ArrowRight, RefreshCw, HardDrive, Terminal, ArrowLeft } from 'lucide-react';

export default function AgentWorkflowStudio({ logs, onRunIngestSimulation, onGoBack }) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [agentLogs, setAgentLogs] = useState(logs);


  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        agent: "Autonomous System Refresh Agent v3.1",
        event: "Manual Ingestion Trigger Executed",
        target: "D:\\Projects\\BusinessCollapse.Com\\data\\companies.json",
        status: "SUCCESS",
        details: "Parsed SEC 8-K filings and PACER Docket #001. Ingested 1 New Case File (Tupperware Brands Corp - TUPQ). Synchronized D: drive storage."
      };
      setAgentLogs([newLog, ...agentLogs]);
      setIsSimulating(false);
      if (onRunIngestSimulation) onRunIngestSimulation();
      alert('🤖 SYSTEM REFRESH SUCCESSFUL!\n\nParsed SEC Form 8-K & PACER Docket #001.\nIngested 1 New Court Case File:\n- Tupperware Brands Corporation (TUPQ)\n\nCheck the Graveyard, Breaking Alerts, or Auctions tab to inspect the newly populated data!');
    }, 1200);
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

      {/* Overview Banner */}

      <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px', borderLeft: '4px solid #7C3AED', background: 'linear-gradient(135deg, rgba(16, 23, 36, 0.9) 0%, rgba(25, 15, 45, 0.7) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Cpu size={20} color="#C084FC" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#C084FC', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Autonomous AI Agent Engine Architecture
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
              AI Autonomous Maintenance & Ingest Pipeline
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px' }}>
              Self-operating agent workflow system. Monitors financial filings, calculates Altman Z-Score distress scores, generates structured markdown post-mortems, and publishes data updates autonomously.
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={handleSimulate}
            disabled={isSimulating}
            style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)', boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)' }}
          >
            {isSimulating ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
            {isSimulating ? 'Executing Ingest Agent...' : 'Trigger AI Ingest Run'}
          </button>
        </div>
      </div>

      {/* Primary Storage Location Indicator */}
      <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(7, 10, 15, 0.7)', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
        <HardDrive size={22} color="#C084FC" />
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>PRIMARY DATA ARTIFACT STORAGE PATH (D: DRIVE ROUTED)</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFF', fontFamily: 'var(--font-mono)' }}>
            D:\Projects\BusinessCollapse.Com\data\ [companies.json, sectors.json, schema.json, agent_logs.json]
          </div>
        </div>
      </div>

      {/* Visual Pipeline Stage Flow */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', color: '#FFF' }}>
          Autonomous 4-Stage Execution Pipeline
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', position: 'relative' }}>
          
          {/* Stage 1 */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: '#C084FC', fontWeight: 800, marginBottom: '6px' }}>STAGE 1 • CRAWLER AGENT</div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', marginBottom: '6px' }}>Financial News & SEC Monitor</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Scans SEC 10-K, 10-Q, 8-K filings and restructuring news feeds for distress signals.
            </p>
          </div>

          {/* Stage 2 */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: '#FF9F43', fontWeight: 800, marginBottom: '6px' }}>STAGE 2 • ANALYZER AGENT</div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', marginBottom: '6px' }}>Distress Score Engine</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Calculates Altman Z-Score, lease liability ratios, and updates sector vulnerability ratings.
            </p>
          </div>

          {/* Stage 3 */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: '#FF3B5C', fontWeight: 800, marginBottom: '6px' }}>STAGE 3 • GENERATOR AGENT</div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', marginBottom: '6px' }}>Timeline & Post-Mortem Builder</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Generates structured timeline milestones, executive summaries, and failure breakdown vectors.
            </p>
          </div>

          {/* Stage 4 */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 800, marginBottom: '6px' }}>STAGE 4 • PUBLISHER AGENT</div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', marginBottom: '6px' }}>JSON Schema & Live Sync</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Validates JSON schema standards and publishes live datasets directly to D: drive disk storage.
            </p>
          </div>

        </div>
      </div>

      {/* Strategic Risk Safeguards Panel */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', background: 'rgba(7, 10, 15, 0.8)', borderLeft: '4px solid #10B981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
        <div style={{ color: '#10B981', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={16} /> ARCHITECTURAL RISK MITIGATION & SAFEGUARD SYSTEM
        </div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFF', marginBottom: '12px' }}>
          System Pre-Mortem & Operational Safeguards
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px', fontSize: '0.8rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: '#FFE066', fontWeight: 800, marginBottom: '4px' }}>⚖️ Legal & Defamation Shield</div>
            <div style={{ color: 'var(--text-muted)' }}>Attributes all facts strictly to SEC Form 8-K filings and PACER dockets. Z-Scores are protected mathematical model opinions.</div>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: '#C084FC', fontWeight: 800, marginBottom: '4px' }}>🤖 Crawler Reliability</div>
            <div style={{ color: 'var(--text-muted)' }}>LLM semantic parsers read raw PDF text without relying on fragile HTML CSS selectors.</div>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: '#10B981', fontWeight: 800, marginBottom: '4px' }}>📈 Cyclical Churn Protection</div>
            <div style={{ color: 'var(--text-muted)' }}>Court Liquidation Auctions and Zombie Crypto Assets operate continuously in all market environments.</div>
          </div>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: '#FF3B5C', fontWeight: 800, marginBottom: '4px' }}>⚡ B2B Audience Focus</div>
            <div style={{ color: 'var(--text-muted)' }}>Serves mid-market liquidators, landlords, risk managers, and creators rather than 5-second Wall Street HFT algorithms.</div>
          </div>
        </div>
      </div>


      {/* Live Terminal Agent Execution Logs */}
      <div className="glass-panel" style={{ padding: '24px', background: '#070A0F', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={18} color="#C084FC" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF', fontFamily: 'var(--font-heading)' }}>
              Live Autonomous Agent Execution Stream
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="pulse-dot critical" style={{ backgroundColor: '#10B981', boxShadow: '0 0 8px #10B981' }}></span>
            SYSTEM OPERATIONAL
          </span>
        </div>

        {/* Log Entries List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          {agentLogs.map((log) => (
            <div key={log.id} style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ color: '#C084FC', fontWeight: 700 }}>[{log.timestamp}] {log.agent}</span>
                <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                  {log.status}
                </span>
              </div>
              <div style={{ color: '#FFF', fontWeight: 600, marginBottom: '2px' }}>
                Event: {log.event} ({log.target})
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                {log.details}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
