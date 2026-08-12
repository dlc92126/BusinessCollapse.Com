import React, { useState } from 'react';
import { X, FileText, CheckCircle, ShieldAlert, Download, Send, AlertTriangle } from 'lucide-react';

export default function Form410ClaimWizardModal({ isOpen, onClose, selectedCompany }) {
  if (!isOpen) return null;

  const [creditorName, setCreditorName] = useState('');
  const [creditorAddress, setCreditorAddress] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [claimType, setClaimType] = useState('unsecured');
  const [targetDebtor, setTargetDebtor] = useState(selectedCompany ? selectedCompany.name : 'Tupperware Brands Corporation');
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(9, 13, 22, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '680px',
        background: '#0F172A',
        border: '2px solid #8B5CF6',
        borderRadius: '16px',
        boxShadow: '0 24px 72px rgba(0,0,0,0.8), 0 0 32px rgba(139, 92, 246, 0.3)',
        padding: '28px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid #8B5CF6', borderRadius: '8px' }}>
              <FileText size={22} color="#A78BFA" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 950, color: '#FFF', margin: 0 }}>
                Official Form 410 Proof of Claim Generator
              </h2>
              <span style={{ fontSize: '0.74rem', color: '#A78BFA', fontWeight: 800 }}>
                🛡️ Creditor Action Center • US Bankruptcy Court Standard
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {!isGenerated ? (
          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 900, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                TARGET DEBTOR COMPANY
              </label>
              <input
                type="text"
                value={targetDebtor}
                onChange={(e) => setTargetDebtor(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 900, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                  CREDITOR / SUPPLIER LEGAL NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Logistics LLC"
                  value={creditorName}
                  onChange={(e) => setCreditorName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 900, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                  ASSERTED CLAIM AMOUNT ($USD)
                </label>
                <input
                  type="text"
                  placeholder="e.g. $145,000.00"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 14px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 900, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                CLAIM CLASSIFICATION
              </label>
              <select
                value={claimType}
                onChange={(e) => setClaimType(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem', outline: 'none' }}
              >
                <option value="unsecured">General Unsecured Claim (Trade Vendor / Supplier)</option>
                <option value="secured">Secured Claim (Collateralized Debt / Liens)</option>
                <option value="503b9">503(b)(9) Administrative Priority (Goods Delivered Within 20 Days)</option>
                <option value="lease">Lease Rejection / Cure Obligation Claim</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 900, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                CREDITOR MAILING ADDRESS
              </label>
              <textarea
                placeholder="100 Wall Street, Suite 400, New York, NY 10005"
                value={creditorAddress}
                onChange={(e) => setCreditorAddress(e.target.value)}
                rows={2}
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#FFF', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '14px',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                color: '#FFF',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 950,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <FileText size={18} /> Generate Official Form 410 Claim PDF
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle size={32} color="#10B981" />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 950, color: '#FFF', marginBottom: '8px' }}>
              Official Form 410 Ready for Download!
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '24px' }}>
              Official Form 410 Proof of Claim auto-populated for <strong>{creditorName || 'Creditor'}</strong> against <strong>{targetDebtor}</strong> for <strong>{claimAmount || '$0.00'}</strong>.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => alert(`Downloading Official Form 410 PDF for ${creditorName}...`)}
                style={{ padding: '12px 20px', background: '#10B981', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 950, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Download size={16} /> Download Official Form 410 PDF
              </button>
              <button
                onClick={() => setIsGenerated(false)}
                style={{ padding: '12px 16px', background: 'rgba(30, 41, 59, 0.8)', color: '#FFF', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
              >
                Edit Form
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
