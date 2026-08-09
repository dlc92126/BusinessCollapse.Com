import React, { useState } from 'react';
import { UserCheck, Users, Mail, Phone, Shield, Star, RefreshCw, X, ChevronDown, Check, Sparkles, Filter, Lock } from 'lucide-react';
import membersData from '../data/sandbox_members.json';

export default function SandboxImpersonationBar({
  impersonatedUser,
  onSelectUser,
  onResetToAdmin,
  onOpenHarvester
}) {
  const [isOpenSelector, setIsOpenSelector] = useState(false);
  const [filterTier, setFilterTier] = useState('ALL'); // 'ALL' | 'free' | 'pro' | 'enterprise'
  const [searchMember, setSearchMember] = useState('');

  const filteredMembers = (membersData || []).filter(m => {
    if (filterTier !== 'ALL' && m.tier !== filterTier) return false;
    if (searchMember.trim()) {
      const q = searchMember.toLowerCase();
      return m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.company.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ background: 'linear-gradient(90deg, #0F172A 0%, #1E1035 50%, #0F172A 100%)', borderBottom: '1px solid rgba(192, 132, 252, 0.35)', padding: '8px 24px', zIndex: 60, position: 'sticky', top: '38px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        
        {/* Left: Active Impersonated Member Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(124, 58, 237, 0.25)', border: '1px solid rgba(192, 132, 252, 0.5)', padding: '3px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 900, color: '#C084FC', letterSpacing: '0.05em' }}>
            <UserCheck size={14} /> IMPERSONATION SANDBOX
          </div>

          {impersonatedUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src={impersonatedUser.avatar} 
                alt={impersonatedUser.name} 
                style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #C084FC', objectFit: 'cover' }} 
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFF' }}>{impersonatedUser.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({impersonatedUser.role} @ {impersonatedUser.company})</span>
                
                {/* Tier Badge */}
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 900,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: impersonatedUser.tier === 'enterprise' ? 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)' : impersonatedUser.tier === 'pro' ? 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)' : 'rgba(255,255,255,0.1)',
                  color: '#FFF',
                  border: impersonatedUser.tier === 'enterprise' ? '1px solid #F472B6' : impersonatedUser.tier === 'pro' ? '1px solid #C084FC' : '1px solid var(--border-subtle)'
                }}>
                  {impersonatedUser.tier === 'enterprise' ? '👑 ENTERPRISE' : impersonatedUser.tier === 'pro' ? '⚡ PRO SUBSCRIBER' : 'FREE TIER'}
                </span>
              </div>
            </div>
          ) : (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No member currently selected. Logging in as default Admin.</span>
          )}
        </div>

        {/* Right Actions: Impersonate Selector & Notification Harvester Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Harvester Mini-App Trigger */}
          <button
            onClick={onOpenHarvester}
            style={{
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(190, 24, 93, 0.4) 100%)',
              color: '#F472B6',
              border: '1px solid rgba(244, 114, 182, 0.5)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 12px rgba(236, 72, 153, 0.25)'
            }}
            title="Open Sandbox Email, SMS & Voice Notification Harvester Mini-App"
          >
            📬 Mock Email & Alert Harvester
          </button>

          {/* Member Selector Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsOpenSelector(!isOpenSelector)}
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
                color: '#FFF',
                border: '1px solid rgba(192, 132, 252, 0.5)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Users size={14} /> Impersonate Member ({membersData.length}) <ChevronDown size={14} />
            </button>

            {/* Dropdown Selector Drawer */}
            {isOpenSelector && (
              <div style={{ position: 'absolute', top: '110%', right: 0, width: '380px', maxHeight: '480px', background: '#0F172A', border: '1px solid rgba(192, 132, 252, 0.5)', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.9)', zIndex: 200, padding: '14px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#FFF' }}>SELECT SANDBOX MEMBER</span>
                  <button onClick={() => setIsOpenSelector(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}><X size={16} /></button>
                </div>

                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                  {['ALL', 'free', 'pro', 'enterprise'].map(t => (
                    <button
                      key={t}
                      onClick={() => setFilterTier(t)}
                      style={{
                        background: filterTier === t ? '#7C3AED' : 'rgba(255,255,255,0.06)',
                        color: filterTier === t ? '#FFF' : 'var(--text-dim)',
                        border: 'none',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Search member name, role, company..."
                  value={searchMember}
                  onChange={(e) => setSearchMember(e.target.value)}
                  style={{ width: '100%', padding: '6px 10px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#FFF', fontSize: '0.78rem', marginBottom: '10px', outline: 'none' }}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {filteredMembers.map(m => (
                    <div
                      key={m.id}
                      onClick={() => {
                        onSelectUser(m);
                        setIsOpenSelector(false);
                      }}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: impersonatedUser && impersonatedUser.id === m.id ? 'rgba(124, 58, 237, 0.3)' : 'rgba(15, 23, 42, 0.7)',
                        border: impersonatedUser && impersonatedUser.id === m.id ? '1px solid #C084FC' : '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'background 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={m.avatar} alt={m.name} style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFF' }}>{m.name}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.role} • {m.company}</div>
                        </div>
                      </div>

                      <span style={{ fontSize: '0.6rem', fontWeight: 900, color: m.tier === 'enterprise' ? '#F472B6' : m.tier === 'pro' ? '#C084FC' : 'var(--text-dim)', textTransform: 'uppercase' }}>
                        {m.tier}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {impersonatedUser && (
            <button
              onClick={onResetToAdmin}
              style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
              title="Exit impersonation mode and return to standard view"
            >
              ✕ Exit Sandbox
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
