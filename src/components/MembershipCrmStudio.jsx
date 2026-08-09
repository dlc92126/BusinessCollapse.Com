import React, { useState } from 'react';
import { Users, Search, Shield, Filter, Download, Plus, Mail, Phone, Calendar, DollarSign, FileText, CheckCircle2, AlertCircle, Edit3, Trash2, Send, ChevronRight, Bell, Zap, Radio, MessageSquare, ExternalLink, ArrowLeft } from 'lucide-react';
import sandboxMembers from '../data/sandbox_members.json';

export default function MembershipCrmStudio({ onGoBack }) {
  const [memberList, setMemberList] = useState(() => {
    let registered = [];
    try {
      registered = JSON.parse(localStorage.getItem('bc_registered_users') || '[]');
    } catch (e) {}
    const base = sandboxMembers || [];
    // Prepend newly registered local members to the top of the CRM list
    return [...registered, ...base];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTierFilter, setSelectedTierFilter] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [selectedMember, setSelectedMember] = useState(null);
  
  // New CRM Note State
  const [noteInput, setNoteInput] = useState('');
  const [directAlertSubject, setDirectAlertSubject] = useState('');
  const [isSendingAlert, setIsSendingAlert] = useState(false);

  // Calculate MRR and Stats
  const activeMembers = memberList.filter(m => m.status === 'ACTIVE' || !m.status);
  const proCount = activeMembers.filter(m => (m.tier || '').toUpperCase().includes('PRO')).length;
  const terminalCount = activeMembers.filter(m => (m.tier || '').toUpperCase().includes('TERMINAL') || (m.tier || '').toUpperCase().includes('ENTERPRISE') || (m.tier || '').toUpperCase().includes('VIP')).length;
  const estimatedMrr = (proCount * 149) + (terminalCount * 499);

  // Filtered members list including Phone number search
  const filteredMembers = memberList.filter(m => {
    const name = (m.name || '').toLowerCase();
    const email = (m.email || '').toLowerCase();
    const org = (m.org || m.company || m.organization || '').toLowerCase();
    const role = (m.role || '').toLowerCase();
    const phone = (m.phone || '').toLowerCase();
    const q = searchTerm.toLowerCase();

    const matchesSearch = !q || name.includes(q) || email.includes(q) || org.includes(q) || role.includes(q) || phone.includes(q);
    
    let matchesTier = true;
    if (selectedTierFilter !== 'ALL') {
      matchesTier = (m.tier || '').toUpperCase().includes(selectedTierFilter);
    }

    let matchesStatus = true;
    if (selectedStatusFilter !== 'ALL') {
      matchesStatus = (m.status || 'ACTIVE').toUpperCase() === selectedStatusFilter;
    }

    return matchesSearch && matchesTier && matchesStatus;
  });

  // Handle tier upgrade / status toggle
  const handleUpdateTier = (memberId, newTier) => {
    setMemberList(prev => prev.map(m => m.id === memberId ? { ...m, tier: newTier } : m));
    if (selectedMember && selectedMember.id === memberId) {
      setSelectedMember(prev => ({ ...prev, tier: newTier }));
    }
  };

  const handleUpdateStatus = (memberId, newStatus) => {
    setMemberList(prev => prev.map(m => m.id === memberId ? { ...m, status: newStatus } : m));
    if (selectedMember && selectedMember.id === memberId) {
      setSelectedMember(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Add CRM Internal Note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteInput.trim() || !selectedMember) return;
    const newNote = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      text: noteInput.trim(),
      author: 'Admin CRM Desk'
    };
    const updatedNotes = [...(selectedMember.crmNotes || []), newNote];
    setMemberList(prev => prev.map(m => m.id === selectedMember.id ? { ...m, crmNotes: updatedNotes } : m));
    setSelectedMember(prev => ({ ...prev, crmNotes: updatedNotes }));
    setNoteInput('');
  };

  // Send Direct Alert
  const handleSendDirectAlert = (e) => {
    e.preventDefault();
    if (!directAlertSubject.trim() || !selectedMember) return;
    setIsSendingAlert(true);
    
    const newAlertEntry = {
      id: `alert-manual-${Date.now()}`,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ') + 'Z',
      headline: directAlertSubject.trim(),
      summary: 'Direct manual alert dispatched by Admin via CRM Portal.',
      ticker: 'DIRECT_ALERT',
      channel: 'SMS & Email Alert',
      recipientEmail: selectedMember.email,
      recipientPhone: selectedMember.phone || '+1 (212) 555-0192',
      deliveryStatus: 'DELIVERED',
      jurisdiction: 'Admin Dispatch Desk'
    };

    setTimeout(() => {
      const updatedAlerts = [newAlertEntry, ...(selectedMember.dispatchedAlertsLog || [])];
      setMemberList(prev => prev.map(m => m.id === selectedMember.id ? { ...m, dispatchedAlertsLog: updatedAlerts } : m));
      setSelectedMember(prev => ({ ...prev, dispatchedAlertsLog: updatedAlerts }));
      setIsSendingAlert(false);
      setDirectAlertSubject('');
      alert(`✅ Direct Alert & SMS dispatched to ${selectedMember.name} (${selectedMember.phone || '+1 212-555-0192'}):\n"${directAlertSubject}"`);
    }, 600);
  };

  // Export CSV with Phone Number Column
  const handleExportCsv = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Organization', 'Role', 'Tier', 'Status', 'JoinedDate', 'ApiKey'];
    const rows = filteredMembers.map(m => [
      m.id,
      `"${m.name || ''}"`,
      `"${m.email || ''}"`,
      `"${m.phone || '+1 (212) 555-0192'}"`,
      `"${m.org || m.company || m.organization || ''}"`,
      `"${m.role || ''}"`,
      `"${m.tier || 'PRO'}"`,
      `"${m.status || 'ACTIVE'}"`,
      `"${m.joinDate || m.memberSince || '2026-08-01'}"`,
      `"${m.apiKey || 'BCC-PRO-8849-9910'}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BusinessCollapse_CRM_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
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
            alignSelf: 'flex-start',
            transition: 'all 0.2s ease'
          }}
          className="glass-panel-interactive"
        >
          <ArrowLeft size={16} color="#EF4444" /> ← Back to Main Distress Wire
        </button>
      )}

      {/* Top CRM Stats Metrics Header */}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>TOTAL ACTIVE SUBSCRIBERS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#F8FAFC', margin: '4px 0' }}>{activeMembers.length}</div>
          <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700 }}>+14.2% MoM Member Growth</div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>MONTHLY RECURRING REVENUE (MRR)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10B981', margin: '4px 0' }}>${estimatedMrr.toLocaleString()}</div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>PRO ($149) & TERMINAL ($499) Tiers</div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>TERMINAL INSTITUTIONAL SEATS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#F59E0B', margin: '4px 0' }}>{terminalCount}</div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>High-yield hedge fund accounts</div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>PRO MEMBER SEATS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#EF4444', margin: '4px 0' }}>{proCount}</div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Individual attorneys & liquidators</div>
        </div>

      </div>

      {/* Main CRM Workspace: Left Roster List + Right Contact Detail Drawer */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedMember ? '1fr 1fr' : '1fr', gap: '20px' }}>
        
        {/* LEFT PANEL: CONTACT ROSTER LIST */}
        <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Search & Filter Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            
            {/* Search Input (Supports Phone Number search!) */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px 12px', gap: '8px', flex: 1, minWidth: '220px' }}>
              <Search size={14} color="#64748B" />
              <input 
                type="text" 
                placeholder="Search by name, email, phone, firm..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#F8FAFC', fontSize: '0.82rem', outline: 'none', width: '100%' }}
              />
            </div>

            {/* Tier Filter */}
            <select 
              value={selectedTierFilter}
              onChange={(e) => setSelectedTierFilter(e.target.value)}
              style={{ background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px 12px', color: '#F8FAFC', fontSize: '0.8rem', outline: 'none' }}
            >
              <option value="ALL">All Subscription Tiers</option>
              <option value="TERMINAL">Terminal ($499/mo)</option>
              <option value="PRO">PRO ($149/mo)</option>
              <option value="FREE">Free Tier</option>
            </select>

            {/* Status Filter */}
            <select 
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              style={{ background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px 12px', color: '#F8FAFC', fontSize: '0.8rem', outline: 'none' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="PAST_DUE">Past Due</option>
              <option value="SUSPENDED">Suspended</option>
            </select>

            {/* Export CSV Button */}
            <button 
              onClick={handleExportCsv}
              className="btn-primary"
              style={{ padding: '8px 14px', fontSize: '0.8rem', gap: '6px' }}
            >
              <Download size={14} /> Export CSV
            </button>

          </div>

          {/* Members Table */}
          <div style={{ overflowX: 'auto', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ background: 'rgba(30, 41, 59, 0.6)', borderBottom: '1px solid var(--border-subtle)', color: '#94A3B8', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '12px 14px' }}>Subscriber & Phone</th>
                  <th style={{ padding: '12px 14px' }}>Firm / Role</th>
                  <th style={{ padding: '12px 14px' }}>Tier</th>
                  <th style={{ padding: '12px 14px' }}>Status</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map(m => {
                  const isSelected = selectedMember && selectedMember.id === m.id;
                  const isTerminal = (m.tier || '').toUpperCase().includes('TERMINAL') || (m.tier || '').toUpperCase().includes('ENTERPRISE');
                  const isPro = (m.tier || '').toUpperCase().includes('PRO');
                  
                  return (
                    <tr 
                      key={m.id}
                      onClick={() => setSelectedMember(m)}
                      style={{ 
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        background: isSelected ? 'rgba(239, 68, 68, 0.12)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)'
                      }}
                      className="glass-panel-interactive"
                    >
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: 800, color: '#F8FAFC' }}>{m.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{m.email}</div>
                        <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                          <Phone size={10} /> {m.phone || '+1 (212) 555-0192'}
                        </div>
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ color: '#CBD5E1', fontWeight: 600 }}>{m.org || m.company || m.organization || 'Independent'}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{m.role || 'Subscriber'}</div>
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: isTerminal ? 'rgba(245, 158, 11, 0.15)' : isPro ? 'rgba(239, 68, 68, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                          color: isTerminal ? '#F59E0B' : isPro ? '#EF4444' : '#94A3B8',
                          border: isTerminal ? '1px solid rgba(245, 158, 11, 0.3)' : isPro ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(148, 163, 184, 0.3)'
                        }}>
                          {m.tier || 'PRO'}
                        </span>
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: m.status === 'ACTIVE' || !m.status ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: m.status === 'ACTIVE' || !m.status ? '#10B981' : '#EF4444'
                        }}>
                          {m.status || 'ACTIVE'}
                        </span>
                      </td>

                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMember(m);
                          }}
                          style={{ background: 'rgba(30, 41, 59, 0.8)', border: '1px solid var(--border-subtle)', color: '#F8FAFC', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}
                        >
                          CRM Inspect <ChevronRight size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

        {/* RIGHT PANEL: SELECTED MEMBER CRM INSPECTOR, CUSTOM FEED & ALERT AUDIT */}
        {selectedMember && (
          <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1.5px solid var(--border-subtle)', borderRadius: '14px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 12px 36px rgba(0,0,0,0.6)', maxHeight: '85vh', overflowY: 'auto' }}>
            
            {/* Header / Member Overview */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  CRM SUBSCRIBER DOSSIER #{selectedMember.id}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
                  {selectedMember.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '2px' }}>
                  {selectedMember.org || selectedMember.company || selectedMember.organization || 'Independent'} • {selectedMember.role || 'Institutional Member'}
                </div>
              </div>

              <button 
                onClick={() => setSelectedMember(null)}
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94A3B8', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Member Quick Attributes Including Direct Phone Number */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(9, 13, 22, 0.8)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '0.8rem' }}>
              <div>
                <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: 700 }}>EMAIL ADDRESS:</span>
                <span style={{ color: '#F8FAFC', fontWeight: 700 }}>{selectedMember.email}</span>
              </div>

              <div>
                <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: 700 }}>DIRECT PHONE / SMS:</span>
                <a href={`tel:${selectedMember.phone || '+12125550192'}`} style={{ color: '#10B981', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Phone size={12} /> {selectedMember.phone || '+1 (212) 555-0192'}
                </a>
              </div>

              <div>
                <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: 700 }}>SUBSCRIPTION TIER:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <span style={{ fontWeight: 800, color: '#EF4444' }}>{selectedMember.tier || 'PRO'}</span>
                  <button 
                    onClick={() => handleUpdateTier(selectedMember.id, selectedMember.tier === 'TERMINAL' ? 'PRO' : 'TERMINAL')}
                    style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#F8FAFC', fontSize: '0.68rem', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Toggle Tier
                  </button>
                </div>
              </div>

              <div>
                <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: 700 }}>ACCOUNT STATUS:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <span style={{ fontWeight: 800, color: selectedMember.status === 'ACTIVE' || !selectedMember.status ? '#10B981' : '#EF4444' }}>
                    {selectedMember.status || 'ACTIVE'}
                  </span>
                  <button 
                    onClick={() => handleUpdateStatus(selectedMember.id, selectedMember.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE')}
                    style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#F8FAFC', fontSize: '0.68rem', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Toggle Status
                  </button>
                </div>
              </div>
            </div>

            {/* MEMBER'S CUSTOM FEED & DISPATCHED ALERTS LOG */}
            <div style={{ background: 'rgba(9, 13, 22, 0.9)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#F8FAFC', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Bell size={14} color="#10B981" /> Member Custom Feed & Alert Dispatch History ({selectedMember.dispatchedAlertsLog ? selectedMember.dispatchedAlertsLog.length : 0})
                </div>
                <span style={{ fontSize: '0.68rem', color: '#10B981', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  ⚡ Custom Scope Active
                </span>
              </div>

              {/* Custom Scope Preferences Pill Tags */}
              {selectedMember.customScope && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', fontSize: '0.7rem', color: '#CBD5E1' }}>
                  <span style={{ background: 'rgba(30, 41, 59, 0.8)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                    🎯 Min Threshold: <strong>{selectedMember.customScope.minDistressThreshold}</strong>
                  </span>
                  <span style={{ background: 'rgba(30, 41, 59, 0.8)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                    📡 Channels: <strong>{selectedMember.customScope.alertChannels ? selectedMember.customScope.alertChannels.join(' • ') : 'SMS, Email'}</strong>
                  </span>
                </div>
              )}

              {/* Live Dispatched Alerts Log List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                {(!selectedMember.dispatchedAlertsLog || selectedMember.dispatchedAlertsLog.length === 0) ? (
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontStyle: 'italic', padding: '10px 0' }}>
                    No alerts dispatched yet.
                  </div>
                ) : (
                  selectedMember.dispatchedAlertsLog.map(al => (
                    <div key={al.id} style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
                        <span style={{ color: '#EF4444', fontWeight: 800 }}>[{al.ticker || 'DOCKET'}] {al.headline}</span>
                        <span style={{ color: '#10B981', fontWeight: 800, background: 'rgba(16, 185, 129, 0.15)', padding: '1px 6px', borderRadius: '4px' }}>{al.deliveryStatus || 'DELIVERED'}</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{al.summary}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#64748B', marginTop: '2px' }}>
                        <span>Channel: <strong>{al.channel}</strong> ({al.recipientPhone || al.recipientEmail})</span>
                        <span>{al.timestamp}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

            {/* INTERNAL CRM CALL LOG & NOTES SECTION */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={14} color="#EF4444" /> Internal Call Logs & Advisory Notes
              </div>

              {/* Existing Notes List */}
              <div style={{ background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '12px', maxHeight: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                {(!selectedMember.crmNotes || selectedMember.crmNotes.length === 0) ? (
                  <div style={{ color: '#64748B', fontStyle: 'italic', padding: '8px 0' }}>No internal notes recorded yet. Add your first call log below.</div>
                ) : (
                  selectedMember.crmNotes.map(n => (
                    <div key={n.id} style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '8px 10px', borderRadius: '6px', borderLeft: '3px solid #EF4444' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.68rem', marginBottom: '2px' }}>
                        <span>{n.author}</span>
                        <span>{n.date}</span>
                      </div>
                      <div style={{ color: '#F8FAFC', fontWeight: 500 }}>{n.text}</div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Note Input Form */}
              <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Record call log, phone conversation, docket request..." 
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  style={{ flex: 1, background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '8px 12px', color: '#F8FAFC', fontSize: '0.8rem', outline: 'none' }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.78rem' }}>
                  Save Note
                </button>
              </form>
            </div>

            {/* SEND DIRECT VIP ALERT DISPATCH VIA EMAIL / SMS */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Send size={14} color="#F59E0B" /> Dispatch Direct VIP Alert (Email & SMS)
              </div>

              <form onSubmit={handleSendDirectAlert} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input 
                  type="text" 
                  required
                  placeholder="Headline e.g. Urgent PACER Order #184: Spirit Airlines Auction Floor"
                  value={directAlertSubject}
                  onChange={(e) => setDirectAlertSubject(e.target.value)}
                  style={{ background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '8px 12px', color: '#F8FAFC', fontSize: '0.8rem', outline: 'none' }}
                />
                <button 
                  type="submit" 
                  disabled={isSendingAlert}
                  className="btn-primary" 
                  style={{ padding: '8px 14px', fontSize: '0.78rem', justifyContent: 'center' }}
                >
                  {isSendingAlert ? 'Dispatching Alert...' : '🚀 Dispatch Instant Email & SMS Alert'}
                </button>
              </form>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
