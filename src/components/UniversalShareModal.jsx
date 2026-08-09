import React, { useState } from 'react';
import { X, Share2, Copy, Check, ExternalLink, Mail, MessageSquare, Globe, Sparkles } from 'lucide-react';

export default function UniversalShareModal({ isOpen, onClose, shareData }) {
  if (!isOpen || !shareData) return null;

  const [copied, setCopied] = useState(false);

  const title = shareData.title || shareData.name || 'Corporate Distress Alert';
  const subtitle = shareData.ticker ? `(${shareData.ticker})` : '';
  const text = shareData.summary || shareData.headline || 'Corporate bankruptcy and distress dossier on BusinessCollapse.Com';
  
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://businesscollapse.com';
  const rawUrl = shareData.url || (shareData.id ? `${origin}/?company=${shareData.id}&ref=VANCE8849` : origin);
  const deepLinkUrl = rawUrl;

  const shareTextFormatted = `🚨 CORPORATE DISTRESS DOSSIER: ${title} ${subtitle}\n\n${text}\n\nFull court docket & auction specs on BusinessCollapse.Com:\n${deepLinkUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(deepLinkUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareX = () => {
    const tweetText = encodeURIComponent(`🚨 CORPORATE DISTRESS: ${title} ${subtitle}\n\n${text}\n\nFull docket on @BusinessCollapse:\n${deepLinkUrl}\n\n#Bankruptcy #Chapter11 #DistressedDebt`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const shareUrl = encodeURIComponent(deepLinkUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const waText = encodeURIComponent(`🚨 CORPORATE DISTRESS ALERT: ${title} ${subtitle}\n\n${text}\n\nInspect full dossier on BusinessCollapse.Com:\n${deepLinkUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${waText}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`[DISTRESS ALERT] ${title} ${subtitle} Bankruptcy Dossier`);
    const body = encodeURIComponent(`${shareTextFormatted}\n\nVerified via SEC EDGAR & PACER Federal Court Records.`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_self');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} ${subtitle}`,
          text: shareTextFormatted,
          url: deepLinkUrl
        });
      } catch (e) {
        console.log('Native share cancelled or failed');
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 15, 0.88)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '28px',
          borderRadius: '16px',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(9, 13, 22, 0.98) 100%)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(56, 189, 248, 0.2)',
          position: 'relative',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#94A3B8',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'var(--transition-fast)'
          }}
        >
          <X size={16} />
        </button>

        {/* Title Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <Share2 size={22} color="#38BDF8" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFF', margin: 0 }}>
              Share Distress Intelligence
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              Multi-Platform Institutional Dispatch & Citation Link
            </span>
          </div>
        </div>

        {/* Target Entity Box */}
        <div style={{ background: 'rgba(7, 10, 15, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '14px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <strong style={{ color: '#F8FAFC', fontSize: '0.95rem' }}>{title}</strong>
            {subtitle && (
              <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#EF4444', background: 'rgba(239,68,68,0.15)', padding: '1px 6px', borderRadius: '4px' }}>
                {subtitle}
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: 0, lineHeight: 1.4 }}>
            {text.length > 110 ? text.slice(0, 110) + '...' : text}
          </p>
        </div>

        {/* 1-Click Copy Link Bar */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '0.72rem', color: '#38BDF8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
            📋 Direct Link & Citation URL
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              readOnly
              value={deepLinkUrl}
              style={{
                flex: 1,
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#CBD5E1',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)'
              }}
            />
            <button
              onClick={handleCopyLink}
              style={{
                background: copied ? '#10B981' : 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
                color: '#FFF',
                border: 'none',
                padding: '0 16px',
                borderRadius: '8px',
                fontWeight: 900,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Social & Messaging Channels Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {/* X / Twitter */}
          <button
            onClick={handleShareX}
            style={{
              background: '#000000',
              color: '#FFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '10px 14px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'var(--transition-fast)'
            }}
          >
            <span style={{ fontWeight: 900, fontSize: '0.9rem' }}>𝕏</span> Share to X
          </button>

          {/* LinkedIn */}
          <button
            onClick={handleShareLinkedIn}
            style={{
              background: 'rgba(10, 102, 194, 0.25)',
              color: '#38BDF8',
              border: '1px solid #0A66C2',
              padding: '10px 14px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'var(--transition-fast)'
            }}
          >
            <Globe size={16} color="#38BDF8" /> LinkedIn
          </button>

          {/* WhatsApp */}
          <button
            onClick={handleShareWhatsApp}
            style={{
              background: 'rgba(37, 211, 102, 0.2)',
              color: '#25D366',
              border: '1px solid #25D366',
              padding: '10px 14px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'var(--transition-fast)'
            }}
          >
            <MessageSquare size={16} color="#25D366" /> WhatsApp
          </button>

          {/* Executive Email */}
          <button
            onClick={handleShareEmail}
            style={{
              background: 'rgba(124, 58, 237, 0.2)',
              color: '#C084FC',
              border: '1px solid #7C3AED',
              padding: '10px 14px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'var(--transition-fast)'
            }}
          >
            <Mail size={16} color="#C084FC" /> Email Alert
          </button>
        </div>

        {/* Native Mobile Web Share API Button if available */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleNativeShare}
            style={{
              width: '100%',
              marginTop: '12px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#F8FAFC',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Share2 size={14} /> Open System Share Menu
          </button>
        )}
      </div>
    </div>
  );
}
