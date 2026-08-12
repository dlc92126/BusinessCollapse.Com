import React, { useState } from 'react';
import { X, Copy, Check, Share2, Code, Mail, MessageSquare, Linkedin, Twitter, ExternalLink, Send, CheckCircle2 } from 'lucide-react';

export default function ExecutiveYouTubeShareModal({ isOpen, onClose, entity, customText }) {
  if (!isOpen) return null;

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [includeCitation, setIncludeCitation] = useState(true);
  const [activeTab, setActiveTab] = useState('social'); // 'social' | 'embed'

  const target = entity || {
    name: "Tupperware Brands Corporation",
    ticker: "TUPQ",
    finalDebt: "$812 Million Total Liabilities",
    summary: "Iconic home goods brand Tupperware Brands filed Chapter 11 bankruptcy in Delaware Court."
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://businesscollapse.com';
  const caseUrl = `${baseUrl}/?company=${(target.ticker || 'tupq').toLowerCase()}&citation=docket001`;
  const embedCode = `<iframe src="${baseUrl}/?company=${(target.ticker || 'tupq').toLowerCase()}&embed=1" width="560" height="315" frameborder="0" allowfullscreen style="border-radius:12px; border:1px solid #38BDF8;"></iframe>`;

  const handleCopyLink = () => {
    // Copy clean valid URL for browser address bar!
    navigator.clipboard.writeText(caseUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyArticle = () => {
    // Copy rich formatted article text with hyperlinked citation URL for Word/Substack!
    const fullArticleWithCitation = customText ? `${customText}\n\n📄 Verified Court Citation: [PACER Docket #001 PDF](${caseUrl})` : `[AP Press Wire] ${target.name} (${target.ticker || 'DEBT'}) Chapter 11 Filing - Verified Court Docket: ${caseUrl}`;
    navigator.clipboard.writeText(fullArticleWithCitation);
    alert('Copied formatted article draft with clickable citation links to clipboard!');
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const shareApps = [
    {
      name: 'X / Twitter',
      color: '#1DA1F2',
      icon: '𝕏',
      action: () => {
        // Guarantee citation URL is NEVER truncated on X!
        const citationSuffix = `\n\n📄 Verified Court Citation Vault: ${caseUrl}`;
        const maxLeadLength = 275 - citationSuffix.length;
        const articleLead = customText ? customText.slice(0, maxLeadLength) : `🚨 BREAKING: ${target.name} (${target.ticker || 'DEBT'}) files Chapter 11 bankruptcy. Verified by @BusinessCollapse`;
        const tweetText = `${articleLead}${citationSuffix}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
      }
    },
    {
      name: 'LinkedIn',
      color: '#0A66C2',
      icon: 'in',
      action: () => {
        const fullText = customText ? `${customText}\n\n📄 Verified Court Citation Vault: ${caseUrl}` : `💼 EXECUTIVE BRIEFING: ${target.name} (${target.ticker || 'DEBT'}) Chapter 11 Filing\n\nVerified Court Citation: ${caseUrl}`;
        navigator.clipboard.writeText(fullText);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(caseUrl)}`, '_blank');
      }
    },
    {
      name: 'Substack',
      color: '#FF6719',
      icon: '✍️',
      action: () => {
        const markdown = customText ? `${customText}\n\n> 📄 **VERIFIED COURT EVIDENCE VAULT**: [Official Court PDFs & Dockets](${caseUrl})` : `[AP Press Wire] ${target.name} (${target.ticker || 'DEBT'}) Chapter 11 Filing - Verified Court Docket: ${caseUrl}`;
        navigator.clipboard.writeText(markdown);
        alert('Copied Substack post draft with clickable citation links to clipboard!');
      }
    },
    {
      name: 'Reddit',
      color: '#FF4500',
      icon: 'r/',
      action: () => {
        const title = `[Chapter 11 Filing] ${target.name} (${target.ticker || 'DEBT'}) - Verified Court Citation`;
        window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(caseUrl)}&title=${encodeURIComponent(title)}`, '_blank');
      }
    },
    {
      name: 'WhatsApp',
      color: '#25D366',
      icon: '💬',
      action: () => {
        const text = customText ? `${customText}\n\n📄 Verified Citation: ${caseUrl}` : `[Restructuring Wire] ${target.name} Chapter 11 Filing: ${caseUrl}`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
      }
    },
    {
      name: 'Telegram',
      color: '#229ED9',
      icon: '✈️',
      action: () => {
        const text = customText ? `${customText}\n\n📄 Verified Citation: ${caseUrl}` : `[Restructuring Wire] ${target.name} Chapter 11 Filing: ${caseUrl}`;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(caseUrl)}&text=${encodeURIComponent(text)}`, '_blank');
      }
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '520px',
        background: '#0F172A',
        border: '1.5px solid rgba(56, 189, 248, 0.4)',
        borderRadius: '16px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.8), 0 0 32px rgba(56, 189, 248, 0.25)',
        padding: '24px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Share2 size={20} color="#38BDF8" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 950, color: '#FFF', margin: 0 }}>
              Share Restructuring Wire & Citation
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher (Share / Embed) */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button
            onClick={() => setActiveTab('social')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 900,
              cursor: 'pointer',
              border: activeTab === 'social' ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.1)',
              background: activeTab === 'social' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(30, 41, 59, 0.5)',
              color: activeTab === 'social' ? '#FFF' : '#94A3B8'
            }}
          >
            📱 Share Wire Link
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 900,
              cursor: 'pointer',
              border: activeTab === 'embed' ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.1)',
              background: activeTab === 'embed' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(30, 41, 59, 0.5)',
              color: activeTab === 'embed' ? '#FFF' : '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Code size={14} /> Embed Code
          </button>
        </div>

        {activeTab === 'social' ? (
          <>
            {/* YouTube-style Horizontal App Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '20px'
            }}>
              {shareApps.map((app, i) => (
                <button
                  key={i}
                  onClick={app.action}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '12px 8px',
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#FFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '1.2rem', fontWeight: 900, color: app.color }}>
                    {app.icon}
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800 }}>
                    {app.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Checkbox: Include Citation PDF Link */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <input
                type="checkbox"
                id="citationCheck"
                checked={includeCitation}
                onChange={(e) => setIncludeCitation(e.target.checked)}
                style={{ cursor: 'pointer', accentColor: '#38BDF8' }}
              />
              <label htmlFor="citationCheck" style={{ fontSize: '0.78rem', color: '#CBD5E1', cursor: 'pointer', fontWeight: 700 }}>
                Include verified court Docket #001 PDF citation link
              </label>
            </div>

            {/* YouTube-style Copy Link Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(9, 13, 22, 0.9)',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              borderRadius: '8px',
              padding: '4px 4px 4px 12px'
            }}>
              <input
                type="text"
                readOnly
                value={caseUrl}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  fontSize: '0.8rem',
                  outline: 'none',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              />
              <button
                onClick={handleCopyLink}
                style={{
                  padding: '8px 16px',
                  background: copiedLink ? '#10B981' : 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 950,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                {copiedLink ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </>
        ) : (
          /* Embed Code View */
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
              HTML EMBED CODE FOR WEBSITES / ARTICLES
            </label>
            <textarea
              readOnly
              value={embedCode}
              rows={4}
              style={{
                width: '100%',
                background: 'rgba(9, 13, 22, 0.9)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                color: '#38BDF8',
                fontSize: '0.78rem',
                fontFamily: 'monospace',
                padding: '10px',
                outline: 'none',
                marginBottom: '14px'
              }}
            />
            <button
              onClick={handleCopyEmbed}
              style={{
                width: '100%',
                padding: '10px',
                background: copiedEmbed ? '#10B981' : 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 950,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              {copiedEmbed ? <Check size={16} /> : <Copy size={16} />}
              {copiedEmbed ? 'Embed Code Copied!' : 'Copy Embed HTML'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
