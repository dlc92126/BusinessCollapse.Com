import React, { useState } from 'react';
import { Sliders, MapPin, DollarSign, Filter, CheckCircle2, X, ShieldAlert, Sparkles } from 'lucide-react';

export default function ProRadarPreferencesModal({ isOpen, onClose, preferences, onSavePreferences }) {
  const [targetStates, setTargetStates] = useState(preferences?.targetStates || 'ALL');
  const [targetCity, setTargetCity] = useState(preferences?.targetCity || '');
  const [targetStateCode, setTargetStateCode] = useState(preferences?.targetStateCode || '');
  const [minValuation, setMinValuation] = useState(preferences?.minValuation || 0);
  const [maxValuation, setMaxValuation] = useState(preferences?.maxValuation || 500);
  const [minDebt, setMinDebt] = useState(preferences?.minDebt || 0);
  const [selectedSectors, setSelectedSectors] = useState(preferences?.selectedSectors || 'ALL');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (onSavePreferences) {
      onSavePreferences({
        targetStates,
        targetCity,
        targetStateCode,
        minValuation,
        maxValuation,
        minDebt,
        selectedSectors
      });
    }
    onClose();
    alert(`⚙️ PRO RADAR PREFERENCES SAVED!\n\nYour custom distress threshold filters are active:\n- City Focus: ${targetCity || 'All Cities'}\n- State / Jurisdiction: ${targetStateCode || targetStates}\n- Valuation Range: $${minValuation}M - $${maxValuation}M+\n- Min Debt Wall: $${minDebt}M`);
  };


  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 999999, position: 'fixed', inset: 0, background: 'rgba(5, 8, 14, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', width: '100%', padding: '0', maxHeight: '88vh', overflowY: 'auto', border: '1px solid rgba(245, 158, 11, 0.4)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>

        
        {/* Modal Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(135deg, rgba(25, 20, 10, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Sliders size={20} color="#F59E0B" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                PRO & TERMINAL RADAR PREFERENCES
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF' }}>
              Customize Distress Thresholds & Scope
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
              Filter corporate distress alerts by custom geographic regions, cities, states, valuation bounds, and debt walls.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
          
          {/* Target Cities & States */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} color="#10B981" /> Geographic City & State Radar Focus
            </label>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>Target City:</span>
                <input
                  type="text"
                  placeholder="e.g. Austin, Dallas, Houston, Chicago"
                  value={targetCity}
                  onChange={(e) => setTargetCity(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', marginTop: '4px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>State Code / Region:</span>
                <input
                  type="text"
                  placeholder="e.g. TX, CA, NY, FL, DE, IL"
                  value={targetStateCode}
                  onChange={(e) => setTargetStateCode(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', marginTop: '4px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>Primary Federal Court Jurisdiction:</span>
              <select
                value={targetStates}
                onChange={(e) => setTargetStates(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', marginTop: '4px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
              >
                <option value="ALL">All US & Global Jurisdictions (Default)</option>
                <option value="TX">Texas (U.S. Bankruptcy Court S.D. Tex. & N.D. Tex.)</option>
                <option value="DE">Delaware (U.S. Bankruptcy Court D. Del.)</option>
                <option value="NY">New York (U.S. Bankruptcy Court S.D.N.Y.)</option>
                <option value="CA">California (U.S. Bankruptcy Court N.D. Cal. & C.D. Cal.)</option>
                <option value="FL">Florida (U.S. Bankruptcy Court S.D. Fla.)</option>
                <option value="NJ">New Jersey (U.S. Bankruptcy Court D.N.J.)</option>
              </select>
            </div>
          </div>


          {/* Valuation Range Controls */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <DollarSign size={16} color="#F59E0B" /> Peak Valuation Range ($ Millions USD)
            </label>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>Min Valuation ($M):</span>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  value={minValuation}
                  onChange={(e) => setMinValuation(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 12px', marginTop: '4px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>Max Valuation ($M):</span>
                <input
                  type="number"
                  min="1"
                  max="100000"
                  value={maxValuation}
                  onChange={(e) => setMaxValuation(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 12px', marginTop: '4px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Minimum Debt Floor */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShieldAlert size={16} color="#EF4444" /> Minimum Debt Floor at Collapse ($M)
            </label>

            <input
              type="number"
              min="0"
              placeholder="e.g. 5 for $5M minimum debt"
              value={minDebt}
              onChange={(e) => setMinDebt(Number(e.target.value))}
              style={{ width: '100%', padding: '10px 14px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>

          {/* Footer Actions */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: '#000', fontWeight: 900 }}>
              <CheckCircle2 size={15} /> Save PRO Preferences
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
