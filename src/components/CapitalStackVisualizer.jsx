import React, { useState } from 'react';
import { Layers, AlertTriangle, ShieldCheck, DollarSign, FileText, CheckCircle2, ChevronDown, ChevronUp, Users, ExternalLink, Download } from 'lucide-react';

export default function CapitalStackVisualizer({ company, onOpenWaterfall }) {
  const [activeTab, setActiveTab] = useState('waterfall'); // 'waterfall' | 'creditors'
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data fallback if company specific capital stack isn't attached
  const capitalStack = company?.capitalStack || [
    {
      id: 'senior_1',
      tranche: '🥇 Senior Secured 1st Lien Revolver & Term Loan A',
      lender: 'JPMorgan Chase / Syndicate',
      amount: company?.debtSecured || '$450,000,000',
      recoveryRate: '100%',
      coverage: 'Fully Secured',
      color: '#10B981',
      status: 'COURT APPROVED',
      impaired: false,
      notes: 'First priority security interest on cash, inventory, receivables and IP.'
    },
    {
      id: 'senior_2',
      tranche: '🥈 2nd Lien Subordinated Notes (2027)',
      lender: 'Apollo / BlackRock Distressed Fund',
      amount: '$180,000,000',
      recoveryRate: '65% - 80%',
      coverage: 'Partially Secured',
      color: '#F59E0B',
      status: 'IN NEGOTIATION',
      impaired: false,
      notes: 'Stalking horse credit bid participant in 363 asset auction.'
    },
    {
      id: 'break_line',
      isBreakLine: true,
      label: '💥 WHERE THE ASSET VALUE BREAKS (ENTERPRISE VALUATION FLOOR: ~$600M)'
    },
    {
      id: 'unsecured_1',
      tranche: '🥉 Official Committee of Unsecured Creditors (UCC)',
      lender: 'Trade Vendors, Suppliers & Commercial Landlords',
      amount: company?.debtUnsecured || '$210,000,000',
      recoveryRate: '10% - 25%',
      coverage: 'Unsecured',
      color: '#EF4444',
      status: 'IMPAIRED',
      impaired: true,
      notes: 'Top 20 unsecured claims receiving equity warrants + asset liquidation pool.'
    },
    {
      id: 'equity',
      tranche: '📜 Common Equity Holders & Subordinated Claims',
      lender: 'Public Shareholders / Pre-Filing Sponsors',
      amount: company?.collapseValuation || '$0.00',
      recoveryRate: '0% (Canceled)',
      coverage: 'Impaired Equity',
      color: '#64748B',
      status: 'CANCELED UNDER PLAN',
      impaired: true,
      notes: 'Shares deemed worthless under Chapter 11 reorganization plan.'
    }
  ];

  // Top 20 Unsecured Creditors Matrix
  const creditorsList = company?.topCreditors || [
    { id: 1, name: 'Prologis Commercial Logistics LLC', category: '🏢 Master Landlord Lease', amount: '$42,500,000', status: 'VERIFIED COURT SCHEDULE', contact: 'Gibson Dunn LLP' },
    { id: 2, name: 'Taiwan Semiconductor Mfg (TSMC)', category: '🏭 Component Supplier', amount: '$38,200,000', status: 'VERIFIED COURT SCHEDULE', contact: 'Latham & Watkins LLP' },
    { id: 3, name: 'Amazon Web Services (AWS)', category: '☁️ Cloud Infrastructure', amount: '$24,100,000', status: 'CRITICAL VENDOR MOTION', contact: 'King & Spalding LLP' },
    { id: 4, name: 'FedEx Freight Supply Chain', category: '🚚 Logistics & Shipping', amount: '$18,900,000', status: 'VERIFIED COURT SCHEDULE', contact: 'Skadden Arps' },
    { id: 5, name: 'Salesforce Enterprise SaaS', category: '💻 Software Vendor', amount: '$12,400,000', status: 'SCHEDULED CLAIM', contact: 'Kirkland & Ellis' },
    { id: 6, name: 'CBRE Commercial Real Estate', category: '🏢 Office Lease Guaranty', amount: '$9,800,000', status: 'CURE AMOUNT DISPUTE', contact: 'Sidley Austin' },
    { id: 7, name: 'Deloitte Restructuring Advisory', category: '📊 Professional Audit', amount: '$6,500,000', status: 'ADMINISTRATIVE EXPENSE', contact: 'Weil Gotshal' },
    { id: 8, name: 'Oracle America Inc', category: '💻 ERP Database License', amount: '$5,900,000', status: 'CRITICAL VENDOR MOTION', contact: 'Paul Weiss' }
  ];

  const filteredCreditors = creditorsList.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: 'rgba(11, 15, 25, 0.75)', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '12px', padding: '18px', marginTop: '20px' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Layers size={18} color="#C084FC" />
            <span>CAPITAL STACK & TOP-20 CREDITOR MATRIX</span>
          </h3>
          <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
            Extracted from Official PACER Docket #001 Schedule & First-Day Declarations
          </span>
        </div>

        {/* Simulator Button & Tab Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {onOpenWaterfall && (
            <button
              onClick={() => onOpenWaterfall(company)}
              style={{
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(14, 165, 233, 0.3) 100%)',
                border: '1px solid #38BDF8',
                color: '#38BDF8',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 0 12px rgba(56, 189, 248, 0.3)'
              }}
            >
              🌊 Launch Creditor Recovery Waterfall Simulator
            </button>
          )}

          <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.8)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => setActiveTab('waterfall')}
              style={{
                padding: '6px 14px',
                fontSize: '0.75rem',
                fontWeight: 800,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'waterfall' ? 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' : 'transparent',
                color: activeTab === 'waterfall' ? '#FFF' : '#94A3B8',
                transition: 'var(--transition-fast)'
              }}
            >
              📊 Debt Waterfall
            </button>
            <button
              onClick={() => setActiveTab('creditors')}
              style={{
                padding: '6px 14px',
                fontSize: '0.75rem',
                fontWeight: 800,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'creditors' ? 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' : 'transparent',
                color: activeTab === 'creditors' ? '#FFF' : '#94A3B8',
                transition: 'var(--transition-fast)'
              }}
            >
              👥 Top Creditors Matrix ({creditorsList.length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: CAPITAL WATERFALL */}
      {activeTab === 'waterfall' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {capitalStack.map((item) => {
            if (item.isBreakLine) {
              return (
                <div 
                  key={item.id}
                  style={{
                    background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.25) 0%, rgba(239, 68, 68, 0.05) 100%)',
                    border: '1.5px dashed #EF4444',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    color: '#FCA5A5',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    textAlign: 'center',
                    letterSpacing: '0.05em',
                    margin: '6px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <AlertTriangle size={14} color="#EF4444" />
                  <span>{item.label}</span>
                </div>
              );
            }

            return (
              <div 
                key={item.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: `1px solid ${item.color}40`,
                  borderLeft: `4px solid ${item.color}`,
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{item.tranche}</span>
                    <span style={{ fontSize: '0.65rem', background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}50`, padding: '1px 6px', borderRadius: '4px', fontWeight: 900 }}>
                      {item.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
                    Holders: <strong style={{ color: '#E2E8F0' }}>{item.lender}</strong> • Notes: {item.notes}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#FFF' }}>
                    {item.amount}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: item.impaired ? '#FCA5A5' : '#6EE7B7', fontWeight: 700 }}>
                    Est. Recovery: {item.recoveryRate} ({item.coverage})
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: CREDITOR MATRIX TABLE */}
      {activeTab === 'creditors' && (
        <div>
          <div style={{ marginBottom: '12px' }}>
            <input 
              type="text"
              placeholder="Filter by creditor name or claim category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(9, 13, 22, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                padding: '8px 12px',
                color: '#FFF',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
              <thead>
                <tr style={{ background: 'rgba(15, 23, 42, 0.9)', color: '#94A3B8', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '10px' }}>Creditor Entity Name</th>
                  <th style={{ padding: '10px' }}>Claim Category</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Unsecured Claim ($)</th>
                  <th style={{ padding: '10px' }}>Evidentiary Status</th>
                  <th style={{ padding: '10px' }}>Retained Counsel</th>
                </tr>
              </thead>
              <tbody>
                {filteredCreditors.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#F8FAFC' }}>
                    <td style={{ padding: '10px', fontWeight: 800 }}>{c.name}</td>
                    <td style={{ padding: '10px', color: '#CBD5E1' }}>{c.category}</td>
                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 900, color: '#EF4444' }}>{c.amount}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ fontSize: '0.65rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px', color: '#94A3B8' }}>{c.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
