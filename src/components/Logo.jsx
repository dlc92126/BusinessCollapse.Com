import React from 'react';

export default function Logo({ size = 'medium', onClick }) {
  const isSmall = size === 'small';
  const logoHeight = isSmall ? 60 : 85;

  return (
    <div 
      onClick={onClick}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        flexShrink: 0,
        gap: '4px'
      }}
    >
      {/* Top Row: Official Approved Logo Shield & Logotype */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img 
          src="/logo_concept_c_official.png" 
          alt="BusinessCollapse.com Official Logo" 
          style={{ 
            height: `${logoHeight}px`, 
            width: 'auto', 
            objectFit: 'contain',
            borderRadius: '6px',
            filter: 'contrast(1.08) brightness(1.05)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.7)'
          }} 
        />
      </div>

      {/* Bottom Row: Crystal Clear, High-Contrast Sub-caption */}
      {!isSmall && (
        <div style={{ 
          fontSize: '0.78rem', 
          fontWeight: 800, 
          letterSpacing: '0.18em', 
          color: '#E2E8F0', 
          textTransform: 'uppercase',
          paddingLeft: '2px',
          fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)'
        }}>
          FINANCIAL NEWS WIRE <span style={{ color: '#EF4444', margin: '0 4px' }}>|</span> GLOBAL MARKET INTELLIGENCE
        </div>
      )}
    </div>
  );
}
