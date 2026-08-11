import React, { useState } from 'react';
import { 
  X, User, Key, Bell, BookOpen, MessageSquare, Shield, Check, Copy, 
  ExternalLink, Smartphone, Mail, Building, Save, Send, Sparkles, AlertCircle, Trash2, Gavel, Zap, CreditCard, Download
} from 'lucide-react';


export default function UserAccountSettingsModal({ 
  isOpen, 
  onClose, 
  userProfile, 
  setUserProfile, 
  savedCredentials = [], 
  onOpenMasterAiPrompt,
  setActiveAlerts,
  onFeedbackSubmitted,
  onOpenProRadarPreferences,
  onOpenAdmissionCriteria,
  onOpenCustomRequest,
  onOpenAbout,
  onOpenOnboarding,
  onOpenFaq,
  dismissedCompanyIds = [],
  toggleDismissCompany,
  companies = []
}) {

  const [activeTab, setActiveTab] = useState('concierge'); // 'concierge' | 'profile' | 'credentials' | 'alerts' | 'manual' | 'feedback'


  // Editable Profile Form State
  const [name, setName] = useState(userProfile?.name || 'Alexander Vance');
  const [email, setEmail] = useState(userProfile?.email || 'vance@citadelcap.com');
  const [phone, setPhone] = useState(userProfile?.phone || '+1 (212) 555-0192');
  const [org, setOrg] = useState(userProfile?.org || 'Citadel Special Situations Fund');
  const [role, setRole] = useState(userProfile?.role || 'Managing Director - Distress Desk');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Feedback State
  const [feedbackCategory, setFeedbackCategory] = useState('Feature Request');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState(null);

  // Copy State
  const [copiedId, setCopiedId] = useState(null);

  // Live Gemini API Key Landing State
  const [geminiApiKeyInput, setGeminiApiKeyInput] = useState(() => localStorage.getItem('bcc_gemini_api_key') || '');
  const [isAiKeyPanelOpen, setIsAiKeyPanelOpen] = useState(false);
  const [aiKeySaveMsg, setAiKeySaveMsg] = useState('');

  const handleSaveGeminiKey = (e) => {
    e.preventDefault();
    const cleanKey = geminiApiKeyInput.trim();
    if (cleanKey) {
      localStorage.setItem('bcc_gemini_api_key', cleanKey);
      setAiKeySaveMsg('✅ Live Gemini API Key Saved & Activated!');
    } else {
      localStorage.removeItem('bcc_gemini_api_key');
      setAiKeySaveMsg('ℹ️ Cleared API Key. Reverted to Local Seeded Engine.');
    }
    setTimeout(() => setAiKeySaveMsg(''), 4000);
  };

  // Payment Options State
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'card-1',
      brand: 'Visa',
      last4: '9914',
      expMonth: '11',
      expYear: '2029',
      isDefault: true,
      cardholder: userProfile?.name || 'Alexander Vance'
    },
    {
      id: 'card-2',
      brand: 'Mastercard',
      last4: '4402',
      expMonth: '08',
      expYear: '2028',
      isDefault: false,
      cardholder: userProfile?.name || 'Alexander Vance'
    }
  ]);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExp, setNewCardExp] = useState('');
  const [newCardCvc, setNewCardCvc] = useState('');
  const [newCardName, setNewCardName] = useState('');
  const [cardSuccessMsg, setCardSuccessMsg] = useState('');

  // AI Concierge & Support Tickets State
  const [conciergeInput, setConciergeInput] = useState('');
  const [conciergeFilter, setConciergeFilter] = useState('all');
  const [selectedConciergeTicketId, setSelectedConciergeTicketId] = useState('t-101');
  const [isConciergeThinking, setIsConciergeThinking] = useState(false);

  const [conciergeTickets, setConciergeTickets] = useState([
    {
      id: 't-101',
      ticketNumber: 'BC-8921',
      title: 'Upgrade Account to $499 Sales Conquest Pass',
      category: 'Billing & Tiers',
      status: 'open',
      priority: 'HIGH',
      createdAt: '10:15 AM Today',
      updatedAt: '10:30 AM Today',
      messages: [
        {
          id: 'cm1',
          sender: 'user',
          senderName: userProfile?.name || 'Alexander Vance',
          text: 'Hi, I need to upgrade our account to the $499 Sales Conquest Pass so our sales team can access automated WARN notice CRM exports.',
          timestamp: '10:15 AM'
        },
        {
          id: 'cm2',
          sender: 'ai',
          senderName: 'VERITAS AI',
          text: 'I have logged your upgrade request under Ticket #BC-8921 and auto-routed an escalation dispatch to support@businesscollapse.com. A billing coordinator will confirm your upgraded API access key shortly.',
          timestamp: '10:16 AM'
        }
      ]
    },
    {
      id: 't-102',
      ticketNumber: 'BC-8810',
      title: 'PACER Docket Downloader 4-Digit PIN Verification',
      category: 'Technical Support',
      status: 'closed',
      priority: 'MEDIUM',
      createdAt: 'Yesterday 02:45 PM',
      updatedAt: 'Yesterday 03:10 PM',
      messages: [
        {
          id: 'cm3',
          sender: 'user',
          senderName: userProfile?.name || 'Alexander Vance',
          text: 'Requesting PIN verification for downloading Delaware Chapter 11 PACER dockets.',
          timestamp: '02:45 PM'
        },
        {
          id: 'cm4',
          sender: 'ai',
          senderName: 'VERITAS AI',
          text: 'Your security PIN (8849) has been verified. You can now download PDFs directly from the court docket viewer.',
          timestamp: '02:46 PM'
        }
      ]
    }
  ]);

  const handleSendConciergeMessage = async (textToSend) => {
    const query = textToSend || conciergeInput;
    if (!query || !query.trim()) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      senderName: name || 'VIP Subscriber',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (selectedConciergeTicketId) {
      setConciergeTickets(prev => prev.map(t => {
        if (t.id === selectedConciergeTicketId) {
          return {
            ...t,
            updatedAt: 'Just now',
            messages: [...t.messages, userMsg]
          };
        }
        return t;
      }));
      setConciergeInput('');
    }

    const newTicketId = selectedConciergeTicketId || ('t-' + Date.now());
    const newTicketNum = 'BC-' + Math.floor(8000 + Math.random() * 1900);
    const needsEscalation = query.toLowerCase().includes('human') || 
                            query.toLowerCase().includes('upgrade') || 
                            query.toLowerCase().includes('pin') || 
                            query.toLowerCase().includes('billing') ||
                            query.toLowerCase().includes('api');

    if (!selectedConciergeTicketId) {
      const initialTicket = {
        id: newTicketId,
        ticketNumber: newTicketNum,
        title: query.length > 50 ? query.slice(0, 50) + '...' : query,
        category: needsEscalation ? 'Executive Support' : 'General Support',
        status: 'open',
        priority: needsEscalation ? 'HIGH' : 'MEDIUM',
        createdAt: 'Just now',
        updatedAt: 'Just now',
        messages: [userMsg]
      };
      setConciergeTickets(prev => [initialTicket, ...prev]);
      setSelectedConciergeTicketId(newTicketId);
      setConciergeInput('');
    }

    setIsConciergeThinking(true);

    // Extract active thread message history for multi-turn AI context
    const currentTicket = conciergeTickets.find(t => t.id === newTicketId);
    const historyPayload = (currentTicket?.messages || []).map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      text: m.text
    }));

    // Call Seeded / Live AI Serverless Concierge API Endpoint
    try {
      const storedKey = geminiApiKeyInput || localStorage.getItem('bcc_gemini_api_key');
      const response = await fetch('/.netlify/functions/ai-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          history: historyPayload,
          apiKey: storedKey ? storedKey.trim() : undefined,
          userProfile: { name, email, tier: userProfile?.tier || 'BETA FOUNDER PASS' }
        })
      });

      const resData = await response.json();
      setIsConciergeThinking(false);

      const aiReplyText = resData.reply || `I have logged your request under Ticket #${newTicketNum} and auto-routed an escalation dispatch to support@businesscollapse.com.`;

      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        senderName: 'VERITAS AI',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConciergeTickets(prev => prev.map(t => {
        if (t.id === newTicketId) {
          return {
            ...t,
            updatedAt: 'Just now',
            messages: [...t.messages, aiMsg]
          };
        }
        return t;
      }));

    } catch (err) {
      console.log('AI Concierge fallback:', err);
      setIsConciergeThinking(false);

      const fallbackText = `That's a fantastic feature idea! I've logged your request under Ticket #${newTicketNum} and auto-routed an engineering note to support@businesscollapse.com. 🚀`;

      const fallbackAiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        senderName: 'VERITAS AI',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConciergeTickets(prev => prev.map(t => {
        if (t.id === newTicketId) {
          return {
            ...t,
            updatedAt: 'Just now',
            messages: [...t.messages, fallbackAiMsg]
          };
        }
        return t;
      }));
    }

    // Auto-dispatch background internal email to support@businesscollapse.com for escalation
    try {
      fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: email || 'subscriber@businesscollapse.com',
          to: 'support@businesscollapse.com',
          subject: `[TICKET #${newTicketNum}] ${query.slice(0, 50)}`,
          text: `NEW CONCIERGE TICKET #${newTicketNum}\nSubscriber: ${name} (${email})\nQuery: ${query}`
        })
      }).catch(() => {});
    } catch (e) {}
  };

  if (!isOpen) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (setUserProfile) {
      setUserProfile({
        name,
        email,
        phone,
        org,
        role,
        tier: userProfile?.tier || 'BETA FOUNDER PASS',
        apiKey: userProfile?.apiKey || 'BCC-VIP-8849-9910'
      });
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCopyCredential = (cred) => {
    const text = `==================================================
⚡ BUSINESSCOLLAPSE.COM — 363 AUCTION BIDDER CREDENTIALS
==================================================
CASE ENTITY: ${cred.entityName} (${cred.ticker || 'CH-11'})
AUCTION TITLE: ${cred.auctionTitle}
WEBCAST PORTAL: ${cred.onlinePortalUrl || 'https://auctions.businesscollapse.com'}
LOG-IN PIN: ${cred.pin || 'PIN-8849-TRUSTEE'}
BIDDER ID: ${cred.bidderId || 'BID-2026-9914'}
ESCROW STATUS: ${cred.registrationParticulars || '$1,000 Refundable Escrow Verified'}
STALKER-HORSE FLOOR: ${cred.stalkerHorseBid || '$15,000,000'}
==================================================`;

    navigator.clipboard.writeText(text);
    setCopiedId(cred.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;

    const newFeedback = {
      id: `fb-${Date.now()}`,
      category: feedbackCategory,
      message: feedbackMessage.trim(),
      userEmail: email,
      userName: name,
      timestamp: new Date().toISOString()
    };

    // Netlify Forms automatic POST handler
    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'feedback');
      formData.append('name', name);
      formData.append('email', email);
      formData.append('category', feedbackCategory);
      formData.append('message', feedbackMessage.trim());

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      }).catch(err => console.log('Netlify form post:', err));
    } catch (err) {
      console.log('Feedback dispatch:', err);
    }

    if (onFeedbackSubmitted) onFeedbackSubmitted(newFeedback);
    setFeedbackSuccess(true);
    setFeedbackMessage('');

    // Native mailto trigger fallback for instant email client draft
    const mailtoSubject = encodeURIComponent(`[BusinessCollapse Feedback] ${feedbackCategory} - ${name}`);
    const mailtoBody = encodeURIComponent(`Category: ${feedbackCategory}\nSubscriber: ${name} (${email})\n\nMessage:\n${feedbackMessage.trim()}`);
    window.open(`mailto:feedback@businesscollapse.com?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');
    
    setTimeout(() => setFeedbackSuccess(false), 4000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 14, 0.92)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }} onClick={onClose}>
      
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 15, 28, 0.99) 100%)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '960px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          background: 'rgba(7, 10, 15, 0.8)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(124, 58, 237, 0.2)', padding: '8px', borderRadius: '10px', border: '1px solid rgba(124, 58, 237, 0.4)' }}>
              <User size={22} color="#C084FC" />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#C084FC', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                BusinessCollapse PRO • Subscriber Portal
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F8FAFC', margin: 0 }}>
                My Account Vault & Platform Settings
              </h3>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: '#94A3B8',
              borderRadius: '8px',
              padding: '6px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              fontWeight: 700
            }}
          >
            <X size={16} /> Close
          </button>
        </div>

        {/* Multi-Tab Navigation Bar */}
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '12px 24px 0 24px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(10, 15, 28, 0.6)',
          overflowX: 'auto'
        }}>
          {[
            { id: 'concierge', label: '💬 AI Concierge & Support Tickets', icon: Sparkles },
            { id: 'billing', label: '💳 Billing & Subscriptions', icon: CreditCard },
            { id: 'profile', label: '👤 Profile & SMS', icon: User },
            { id: 'briefs', label: '📄 Saved Briefs Vault', icon: Gavel },
            { id: 'credentials', label: `🔑 Saved PINs (${(savedCredentials || []).length})`, icon: Key },
            { id: 'muted', label: `🚫 Muted Assets (${(dismissedCompanyIds || []).length})`, icon: Trash2 },
            { id: 'alerts', label: '🔔 Active Alerts', icon: Bell },
            { id: 'manual', label: '📖 User Manual', icon: BookOpen },
            { id: 'feedback', label: '💡 Feedback Box', icon: MessageSquare }
          ].map(tab => {

            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(79, 70, 229, 0.3) 100%)' : 'transparent',
                  color: isActive ? '#F8FAFC' : '#94A3B8',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #C084FC' : '2px solid transparent',
                  padding: '10px 16px',
                  borderRadius: '8px 8px 0 0',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                <TabIcon size={16} color={isActive ? '#C084FC' : '#94A3B8'} />
                {tab.label}
              </button>
            );
          })}

        </div>

        {/* Modal Body Container */}
        <div style={{ padding: activeTab === 'concierge' ? '16px' : '24px', overflowY: activeTab === 'concierge' ? 'hidden' : 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* TAB 0: AI CONCIERGE & MINI-CRM SUPPORT TICKETS */}
          {activeTab === 'concierge' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minHeight: '520px', maxHeight: 'calc(80vh - 120px)' }}>
              
              {/* LIVE GEMINI API KEY LANDING PANEL */}
              <div style={{ background: '#090D16', border: '1px solid rgba(192, 132, 252, 0.3)', borderRadius: '12px', padding: '10px 14px', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#C084FC', letterSpacing: '0.05em' }}>
                      🔑 LIVE GEMINI AI ENGINE CONFIGURATION
                    </span>
                    {localStorage.getItem('bcc_gemini_api_key') ? (
                      <span style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22C55E', color: '#4ADE80', padding: '2px 8px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 900 }}>
                        🟢 LIVE GEMINI 1.5 FLASH ACTIVE
                      </span>
                    ) : (
                      <span style={{ background: 'rgba(234, 179, 8, 0.15)', border: '1px solid #EAB308', color: '#FDE047', padding: '2px 8px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 900 }}>
                        ⚡ LOCAL SEEDED ENGINE (ZERO KEY NEEDED)
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setIsAiKeyPanelOpen(!isAiKeyPanelOpen)}
                    style={{
                      background: 'rgba(192, 132, 252, 0.15)',
                      border: '1px solid rgba(192, 132, 252, 0.4)',
                      color: '#E9D5FF',
                      padding: '3px 10px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    {isAiKeyPanelOpen ? '▲ Hide API Key Landing' : '▼ Add / Edit Gemini API Key'}
                  </button>
                </div>

                {/* Collapsible Key Landing Form */}
                {isAiKeyPanelOpen && (
                  <form onSubmit={handleSaveGeminiKey} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(15, 23, 42, 0.8)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8', lineHeight: 1.4 }}>
                      Paste your Google Gemini API key below to unlock 100% dynamic, multi-turn AI reasoning powered by Google Gemini 1.5 Flash. Get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: '#38BDF8', fontWeight: 700 }}>aistudio.google.com</a>.
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="password"
                        placeholder="AIzaSy..."
                        value={geminiApiKeyInput}
                        onChange={(e) => setGeminiApiKeyInput(e.target.value)}
                        style={{
                          flex: 1,
                          background: '#0B0F19',
                          border: '1px solid rgba(192, 132, 252, 0.3)',
                          borderRadius: '6px',
                          color: '#F8FAFC',
                          padding: '6px 12px',
                          fontSize: '0.8rem',
                          outline: 'none'
                        }}
                      />
                      <button
                        type="submit"
                        style={{
                          background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                          color: '#FFF',
                          border: 'none',
                          padding: '6px 16px',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        💾 Save Key
                      </button>
                    </div>

                    {aiKeySaveMsg && (
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: aiKeySaveMsg.includes('✅') ? '#4ADE80' : '#FDE047', marginTop: '4px' }}>
                        {aiKeySaveMsg}
                      </div>
                    )}
                  </form>
                )}
              </div>

              {/* FREQUENT TOPICS QUICK CHIPS */}
              <div style={{ background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '10px 14px', flexShrink: 0 }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 900, color: '#64748B', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  FREQUENT TOPICS
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'c1', label: '🎟️ Upgrade Subscription Tier ($299 -> $499)' },
                    { id: 'c2', label: '🔑 Reset PACER Docket 4-Digit Security PIN' },
                    { id: 'c3', label: '📡 Request Custom API Webhook Integration' },
                    { id: 'c4', label: '📞 Escalate Ticket to Human Restructuring Desk' }
                  ].map(chip => (
                    <button
                      key={chip.id}
                      onClick={() => handleSendConciergeMessage(chip.label)}
                      style={{
                        background: 'rgba(56, 189, 248, 0.1)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        color: '#38BDF8',
                        padding: '4px 10px',
                        borderRadius: '16px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2-COLUMN WORKSTATION BODY: LEFT TICKETS DRAWER, RIGHT CHAT */}
              <div style={{ flex: 1, display: 'flex', gap: '14px', overflow: 'hidden', minHeight: 0 }}>
                
                {/* LEFT TICKET DRAWER */}
                <div style={{ width: '270px', background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                  <button
                    onClick={() => setSelectedConciergeTicketId(null)}
                    className="btn-primary"
                    style={{ padding: '8px 12px', fontSize: '0.8rem', fontWeight: 900, width: '100%', marginBottom: '10px' }}
                  >
                    + New Inquiry
                  </button>

                  <div style={{ fontSize: '0.68rem', fontWeight: 900, color: '#64748B', marginBottom: '8px' }}>
                    MY SUPPORT TICKETS & CHATS
                  </div>

                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {conciergeTickets.map(t => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedConciergeTicketId(t.id)}
                        style={{
                          padding: '8px 10px',
                          borderRadius: '8px',
                          background: selectedConciergeTicketId === t.id ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.02)',
                          border: selectedConciergeTicketId === t.id ? '1px solid #38BDF8' : '1px solid transparent',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 900, color: '#38BDF8' }}>
                          <span>#{t.ticketNumber}</span>
                          <span style={{ color: t.status === 'open' ? '#10B981' : '#64748B' }}>{t.status === 'open' ? '🟢 OPEN' : '⚪ CLOSED'}</span>
                        </div>
                        <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                          {t.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT CHAT THREAD (FIXED INPUT AT BOTTOM) */}
                <div style={{ flex: 1, background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  
                  {/* MESSAGES AREA */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px', marginBottom: '10px' }}>
                    {(() => {
                      const activeT = selectedConciergeTicketId 
                        ? conciergeTickets.find(t => t.id === selectedConciergeTicketId) 
                        : null;

                      if (!activeT) {
                        return (
                          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '12px', borderRadius: '50%', border: '1px solid rgba(56, 189, 248, 0.3)', marginBottom: '12px' }}>
                              <Sparkles size={26} color="#38BDF8" />
                            </div>
                            <h4 style={{ color: '#F8FAFC', margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 800 }}>
                              New AI Concierge Inquiry
                            </h4>
                            <p style={{ fontSize: '0.8rem', color: '#64748B', maxWidth: '380px', margin: 0, lineHeight: 1.5 }}>
                              Type your inquiry below or select a Frequent Topic above. Our AI Concierge will assist you instantly and log an escalation ticket if human support is required.
                            </p>
                          </div>
                        );
                      }

                      return activeT.messages.map(m => (
                        <div key={m.id} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '82%' }}>
                          <div style={{ fontSize: '0.66rem', color: '#64748B', marginBottom: '2px' }}>{m.senderName} • {m.timestamp}</div>
                          <div style={{
                            padding: '10px 14px',
                            borderRadius: '10px',
                            background: m.sender === 'user' ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' : 'rgba(15, 23, 42, 0.95)',
                            border: m.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
                            color: '#FFF',
                            fontSize: '0.82rem',
                            lineHeight: 1.5
                          }}>
                            {m.text}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>

                  {/* INPUT FORM ALWAYS FIXED & READILY VISIBLE AT BOTTOM */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendConciergeMessage();
                    }}
                    style={{ display: 'flex', gap: '10px', flexShrink: 0, background: 'rgba(15, 23, 42, 0.8)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
                  >
                    <input
                      type="text"
                      placeholder="Type your inquiry or question..."
                      value={conciergeInput}
                      onChange={(e) => setConciergeInput(e.target.value)}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        color: '#FFF',
                        padding: '6px 10px',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.82rem', gap: '6px' }}>
                      <Send size={14} /> Send
                    </button>
                  </form>
                </div>

              </div>

            </div>
          )}

          {/* TAB 0.5: BILLING & SUBSCRIPTION MATRIX */}
          {activeTab === 'billing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* CURRENT ACTIVE SUBSCRIPTION CARD */}
              <div style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 22, 0.98) 100%)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#38BDF8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    ACTIVE MEMBERSHIP PLAN
                  </span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F8FAFC', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {userProfile?.tier || 'BETA FOUNDER PASS ($0 VIP ACCESS)'}
                    <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', color: '#10B981', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '6px', fontWeight: 900 }}>
                      🟢 ACTIVE & VERIFIED
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '6px', display: 'flex', gap: '16px' }}>
                    <span>Next Renewal: <strong style={{ color: '#F8FAFC' }}>Sept 10, 2026</strong></span>
                    <span>Payment Method: <strong style={{ color: '#F8FAFC' }}>Visa ending in 9914</strong></span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  {onOpenOnboarding && (
                    <button
                      onClick={() => { onClose(); onOpenOnboarding(); }}
                      className="btn-primary"
                      style={{ padding: '10px 18px', fontSize: '0.84rem', fontWeight: 900, gap: '6px' }}
                    >
                      ⚡ Upgrade Tier & Checkout ↗
                    </button>
                  )}
                </div>
              </div>

              {/* MY PAYMENT OPTIONS SECTION */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#64748B', letterSpacing: '0.05em' }}>
                    MY PAYMENT OPTIONS & SAVED CARDS
                  </div>

                  <button
                    onClick={() => setIsAddCardOpen(!isAddCardOpen)}
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid #38BDF8',
                      color: '#38BDF8',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CreditCard size={14} /> + Add Payment Method
                  </button>
                </div>

                {cardSuccessMsg && (
                  <div style={{ padding: '8px 12px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', color: '#A7F3D0', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '10px' }}>
                    {cardSuccessMsg}
                  </div>
                )}

                {/* ADD NEW CARD FORM MODAL / COLLAPSIBLE */}
                {isAddCardOpen && (
                  <div style={{ background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', marginBottom: '14px' }}>
                    <h4 style={{ color: '#F8FAFC', margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CreditCard size={16} color="#38BDF8" /> Add New Payment Card
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 800, display: 'block', marginBottom: '4px' }}>CARDHOLDER NAME</label>
                        <input
                          type="text"
                          placeholder="Name on card"
                          value={newCardName}
                          onChange={(e) => setNewCardName(e.target.value)}
                          style={{ width: '100%', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-subtle)', color: '#FFF', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 800, display: 'block', marginBottom: '4px' }}>CARD NUMBER</label>
                        <input
                          type="text"
                          placeholder="•••• •••• •••• 4402"
                          value={newCardNumber}
                          onChange={(e) => setNewCardNumber(e.target.value)}
                          style={{ width: '100%', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-subtle)', color: '#FFF', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 800, display: 'block', marginBottom: '4px' }}>EXPIRATION (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={newCardExp}
                          onChange={(e) => setNewCardExp(e.target.value)}
                          style={{ width: '100%', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-subtle)', color: '#FFF', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 800, display: 'block', marginBottom: '4px' }}>CVC CODE</label>
                        <input
                          type="password"
                          placeholder="•••"
                          value={newCardCvc}
                          onChange={(e) => setNewCardCvc(e.target.value)}
                          style={{ width: '100%', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-subtle)', color: '#FFF', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => {
                          if (!newCardNumber.trim()) return;
                          const last4 = newCardNumber.trim().slice(-4) || '8810';
                          const newCardObj = {
                            id: 'card-' + Date.now(),
                            brand: 'Visa / Card',
                            last4: last4,
                            expMonth: newCardExp.split('/')[0] || '12',
                            expYear: '20' + (newCardExp.split('/')[1] || '28'),
                            isDefault: false,
                            cardholder: newCardName || 'Alexander Vance'
                          };
                          setPaymentMethods(prev => [...prev, newCardObj]);
                          setCardSuccessMsg(`✓ Saved new payment card ending in •••• ${last4}!`);
                          setIsAddCardOpen(false);
                          setNewCardNumber('');
                          setNewCardName('');
                          setNewCardExp('');
                          setNewCardCvc('');
                          setTimeout(() => setCardSuccessMsg(''), 3500);
                        }}
                        className="btn-primary"
                        style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                      >
                        💾 Save Card Method
                      </button>

                      <button
                        onClick={() => setIsAddCardOpen(false)}
                        style={{ background: 'transparent', border: '1px solid var(--border-subtle)', color: '#94A3B8', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* SAVED CARDS GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                  {paymentMethods.map(card => (
                    <div
                      key={card.id}
                      style={{
                        background: '#090D16',
                        border: card.isDefault ? '1.5px solid #10B981' : '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justify: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CreditCard size={16} color={card.isDefault ? '#10B981' : '#38BDF8'} /> {card.brand} •••• {card.last4}
                          </span>
                          {card.isDefault ? (
                            <span style={{ fontSize: '0.64rem', fontWeight: 900, color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', padding: '2px 6px', borderRadius: '4px' }}>
                              DEFAULT
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                setPaymentMethods(prev => prev.map(c => ({ ...c, isDefault: c.id === card.id })));
                                setCardSuccessMsg(`✓ Set ${card.brand} •••• ${card.last4} as primary default payment method!`);
                                setTimeout(() => setCardSuccessMsg(''), 3500);
                              }}
                              style={{ background: 'transparent', border: '1px solid var(--border-subtle)', color: '#94A3B8', padding: '2px 6px', borderRadius: '4px', fontSize: '0.64rem', cursor: 'pointer' }}
                            >
                              Set Default
                            </button>
                          )}
                        </div>

                        <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                          Cardholder: <strong style={{ color: '#E2E8F0' }}>{card.cardholder}</strong>
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '2px' }}>
                          Expires: <strong style={{ color: '#E2E8F0' }}>{card.expMonth}/{card.expYear}</strong>
                        </div>
                      </div>

                      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                        {!card.isDefault && (
                          <button
                            onClick={() => {
                              setPaymentMethods(prev => prev.filter(c => c.id !== card.id));
                            }}
                            style={{ background: 'transparent', border: 'none', color: '#EF4444', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 700 }}
                          >
                            Remove Card
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5-TIER SUBSCRIPTION MATRIX */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#64748B', letterSpacing: '0.05em', marginBottom: '10px' }}>
                  BUSINESSCOLLAPSE 5-TIER PRICING MATRIX
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {[
                    { title: '$0 Beta Founder Pass', price: '$0 / Lifetime', desc: '100-Member VIP Founder Access, Daily Briefings & Wire Feed', badge: 'ACTIVE', isCurrent: true, color: '#38BDF8' },
                    { title: '$299 Media Wire Pass', price: '$299 / Mo', desc: 'Real-time Press Release Distribution & Wire Integration', badge: 'AVAILABLE', color: '#C084FC' },
                    { title: '$299 Headhunter Pass', price: '$299 / Mo', desc: 'Executive Layoff Alerts, Restructuring Contacts & WARN Data', badge: 'POPULAR', color: '#F59E0B' },
                    { title: '$499 Sales Conquest Pass', price: '$499 / Mo', desc: 'Automated Layoff CRM Exports & Direct Outreach Suite', badge: 'RECOMMENDED', color: '#10B981' },
                    { title: '$999 Institutional Terminal', price: '$999 / Mo', desc: 'Raw API Streams, Unlimited PACER Ingestion & Custom Webhooks', badge: 'ENTERPRISE', color: '#EF4444' }
                  ].map((p, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: p.isCurrent ? 'rgba(56, 189, 248, 0.08)' : '#090D16',
                        border: p.isCurrent ? `1.5px solid ${p.color}` : '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justify: 'space-between',
                        position: 'relative'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.66rem', fontWeight: 900, color: p.color, background: `${p.color}22`, border: `1px solid ${p.color}55`, padding: '2px 6px', borderRadius: '4px' }}>
                            {p.badge}
                          </span>
                        </div>
                        <h4 style={{ color: '#F8FAFC', margin: '0 0 4px 0', fontSize: '0.92rem', fontWeight: 900 }}>{p.title}</h4>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: p.color, marginBottom: '8px' }}>{p.price}</div>
                        <p style={{ fontSize: '0.74rem', color: '#94A3B8', lineHeight: 1.4, margin: 0 }}>{p.desc}</p>
                      </div>

                      <button
                        onClick={() => {
                          if (setUserProfile) {
                            setUserProfile({ ...userProfile, tier: p.title.toUpperCase() });
                          }
                          if (onOpenOnboarding) {
                            onClose();
                            onOpenOnboarding();
                          }
                        }}
                        style={{
                          marginTop: '14px',
                          width: '100%',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: 800,
                          border: p.isCurrent ? '1px solid #10B981' : `1px solid ${p.color}`,
                          background: p.isCurrent ? 'rgba(16, 185, 129, 0.15)' : `${p.color}15`,
                          color: p.isCurrent ? '#10B981' : p.color,
                          cursor: 'pointer'
                        }}
                      >
                        {p.isCurrent ? '✓ Current Plan' : 'Select Plan'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* INVOICES & BILLING HISTORY TABLE */}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#64748B', letterSpacing: '0.05em', marginBottom: '10px' }}>
                  INVOICE & PAYMENT RECEIPTS HISTORY
                </div>

                <div style={{ background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '12px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(15, 23, 42, 0.9)', borderBottom: '1px solid var(--border-subtle)', color: '#64748B', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '10px 14px' }}>Invoice ID</th>
                        <th style={{ padding: '10px 14px' }}>Date</th>
                        <th style={{ padding: '10px 14px' }}>Description</th>
                        <th style={{ padding: '10px 14px' }}>Amount</th>
                        <th style={{ padding: '10px 14px' }}>Status</th>
                        <th style={{ padding: '10px 14px', textAlign: 'right' }}>Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 'INV-2026-0801', date: 'Aug 01, 2026', desc: 'Beta Founder Pass ($0 VIP Access)', amount: '$0.00', status: '🟢 PAID' },
                        { id: 'INV-2026-0701', date: 'Jul 01, 2026', desc: 'VIP Account Setup & PACER Key Allocation', amount: '$0.00', status: '🟢 PAID' }
                      ].map((inv, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#F8FAFC' }}>
                          <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontWeight: 700, color: '#38BDF8' }}>{inv.id}</td>
                          <td style={{ padding: '10px 14px', color: '#94A3B8' }}>{inv.date}</td>
                          <td style={{ padding: '10px 14px' }}>{inv.desc}</td>
                          <td style={{ padding: '10px 14px', fontWeight: 800 }}>{inv.amount}</td>
                          <td style={{ padding: '10px 14px', fontWeight: 800, color: '#10B981' }}>{inv.status}</td>
                          <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                            <button
                              onClick={() => alert(`Downloading Invoice Receipt ${inv.id}...`)}
                              style={{ background: 'transparent', border: 'none', color: '#38BDF8', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Download size={13} /> PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 1: PROFILE & SMS */}
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'rgba(124, 58, 237, 0.1)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(124, 58, 237, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#C084FC', textTransform: 'uppercase' }}>CURRENT ACTIVE TIER</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFF' }}>
                    {userProfile?.tier || 'BETA FOUNDER PASS (LIMITED 100-MEMBER VIP)'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px' }}>
                    API Key: <code style={{ color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>{userProfile?.apiKey || 'BCC-VIP-8849-9910'}</code>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800, color: '#10B981' }}>
                    ✓ FREE BETA PASS ACTIVE
                  </div>
                  {onOpenOnboarding && (
                    <button
                      onClick={() => { onClose(); onOpenOnboarding(); }}
                      style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: '#FFF', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 900, cursor: 'pointer', boxShadow: '0 0 12px rgba(245, 158, 11, 0.4)' }}
                    >
                      ⭐ Start 7-Day Free Trial ($0) ↗
                    </button>
                  )}
                </div>

              </div>

              {/* Terminal & Platform Utilities Launcher Bar (Folded from Console) */}
              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#C084FC', textTransform: 'uppercase', marginBottom: '10px' }}>
                  ⚡ TERMINAL OPTIONS & PLATFORM UTILITIES
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {onOpenProRadarPreferences && (
                    <button
                      type="button"
                      onClick={() => { onClose(); onOpenProRadarPreferences(); }}
                      style={{ background: 'rgba(30, 41, 59, 0.8)', color: '#F8FAFC', border: '1px solid var(--border-subtle)', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      ⚙️ PRO Radar Preferences
                    </button>
                  )}
                  {onOpenFaq && (
                    <button
                      type="button"
                      onClick={() => { onClose(); onOpenFaq(); }}
                      style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}
                    >
                      ❓ FAQ & Dataset Rules
                    </button>
                  )}
                  {onOpenAdmissionCriteria && (
                    <button
                      type="button"
                      onClick={() => { onClose(); onOpenAdmissionCriteria(); }}
                      style={{ background: 'rgba(30, 41, 59, 0.8)', color: '#F8FAFC', border: '1px solid var(--border-subtle)', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      📜 Admission Criteria
                    </button>
                  )}

                  {onOpenCustomRequest && (
                    <button
                      type="button"
                      onClick={() => { onClose(); onOpenCustomRequest(); }}
                      style={{ background: 'rgba(30, 41, 59, 0.8)', color: '#F8FAFC', border: '1px solid var(--border-subtle)', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      ➕ Custom Entity Request
                    </button>
                  )}
                  {onOpenOnboarding && (
                    <button
                      type="button"
                      onClick={() => { onClose(); onOpenOnboarding(); }}
                      style={{ background: 'rgba(30, 41, 59, 0.8)', color: '#F8FAFC', border: '1px solid var(--border-subtle)', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      💳 Membership Tiers
                    </button>
                  )}
                  {onOpenAbout && (
                    <button
                      type="button"
                      onClick={() => { onClose(); onOpenAbout(); }}
                      style={{ background: 'rgba(30, 41, 59, 0.8)', color: '#F8FAFC', border: '1px solid var(--border-subtle)', padding: '8px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      ℹ️ About Platform
                    </button>
                  )}
                </div>

                {/* TROJAN HORSE AMBASSADOR REFERRAL PROGRAM */}
                <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)', padding: '20px', borderRadius: '12px', border: '1.5px solid rgba(245, 158, 11, 0.45)', marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 900, color: '#FCD34D', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        🏆 TROJAN HORSE AMBASSADOR PROGRAM
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFF', margin: 0 }}>
                        Enterprise Subscription Offset & VIP Perks Tracker
                      </h4>
                    </div>
                    <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D', border: '1px solid #F59E0B', padding: '3px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
                      CURRENT DISCOUNT: 30% OFF ENTERPRISE TIER
                    </span>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '14px' }}>
                    Share Trojan Horse court dockets or liquidation events with your professional network. Every active referral automatically offsets your monthly subscription by 10% (up to 50% max offset)!
                  </p>

                  {/* Progress Bar */}
                  <div style={{ background: 'rgba(7, 10, 15, 0.8)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, marginBottom: '6px' }}>
                      <span style={{ color: '#F8FAFC' }}>3 OF 5 ACTIVE REFERRALS (30% DISCOUNT ACTIVE)</span>
                      <span style={{ color: '#FCD34D', fontFamily: 'var(--font-mono)' }}>2 MORE FOR 50% MAX OFFSET</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)', borderRadius: '5px' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="text"
                      readOnly
                      value="https://businesscollapse.com/?ref=VANCE8849"
                      style={{
                        flex: 1,
                        background: 'rgba(7, 10, 15, 0.9)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        color: '#F8FAFC',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)'
                      }}
                    />
                    <button
                      onClick={() => {
                        try {
                          navigator.clipboard.writeText('https://businesscollapse.com/?ref=VANCE8849');
                        } catch (e) {}
                        alert('Personal Ambassador Referral Link Copied to Clipboard!');
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                        color: '#FFF',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        cursor: 'pointer'
                      }}
                    >
                      📋 Copy Ambassador Link
                    </button>
                  </div>
                </div>
              </div>


              <form onSubmit={handleSaveProfile} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>FULL NAME *</label>
                  <input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>WORK EMAIL *</label>
                  <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#EF4444', marginBottom: '6px' }}>DIRECT MOBILE PHONE (FOR 24/7 SMS ALERTS) *</label>
                  <input 
                    type="tel" 
                    required 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (212) 555-0192"
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>FIRM / ORGANIZATION</label>
                  <input 
                    type="text" 
                    value={org} 
                    onChange={(e) => setOrg(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>PRIMARY PROFESSIONAL ROLE</label>
                  <input 
                    type="text" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                  <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Save size={16} /> Save Profile Settings
                  </button>

                  {saveSuccess && (
                    <span style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Check size={16} /> Subscriber settings updated successfully!
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* TAB: SAVED DILIGENCE BRIEFS VAULT */}
          {activeTab === 'briefs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10B981' }}>
                    📄 MY SAVED 363 DILIGENCE BRIEFS VAULT
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px' }}>
                    Instant access to generated Section 363 court diligence briefs, lien maps, and cure schedules.
                  </div>
                </div>
              </div>

              {(() => {
                let briefs = [];
                try {
                  briefs = JSON.parse(localStorage.getItem('bc_saved_briefs') || '[]');
                } catch (e) {}

                if (briefs.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '36px', background: 'rgba(15,23,42,0.6)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📜</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#F8FAFC' }}>No Saved Briefs Yet</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '4px' }}>
                        Click "Generate 1-Click Diligence Brief PDF" on any 363 Auction to save reports to your vault.
                      </div>
                    </div>
                  );
                }

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {briefs.map((b) => (
                      <div key={b.id} style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#F8FAFC' }}>{b.entityName} 363 Diligence Brief</div>
                          <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px' }}>Saved on: {b.date} EST • Report Ref: {b.id}</div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => {
                              const text = `================================================================================\nOFFICIAL SECTION 363 DILIGENCE BRIEF — ${b.entityName}\nBUSINESSCOLLAPSE.COM INSTITUTIONAL TERMINAL\n================================================================================\nTarget Entity: ${b.entityName}\nDate Saved: ${b.date}\nVault URL: ${b.shareUrl}`;
                              const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                              const url = URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = `${b.entityName.toLowerCase().replace(/\s+/g, '_')}_363_diligence_brief.txt`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            style={{ background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}
                          >
                            ⬇️ Re-Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

            </div>
          )}


          {/* TAB 2: SAVED CREDENTIALS */}
          {activeTab === 'credentials' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10B981' }}>
                    🔑 Saved Section 363 Auction Bidder Credentials Vault
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    All official webcast log-in PINs, bidder IDs, and court portal links generated during your session.
                  </p>
                </div>
              </div>

              {(!savedCredentials || savedCredentials.length === 0) ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '12px', border: '1px border-subtle' }}>
                  <Gavel size={32} color="#64748B" style={{ marginBottom: '10px' }} />
                  <div style={{ fontSize: '0.95rem', color: '#94A3B8', fontWeight: 700 }}>No Saved Auction Credentials Yet</div>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>
                    Click "Access Bidder Credentials" in the Court-Ordered Auctions directory to generate and save your log-in PINs here.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {savedCredentials.map((cred, idx) => (
                    <div 
                      key={cred.id || idx}
                      style={{
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                              AUCTION CREDENTIAL
                            </span>
                            <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 600 }}>{cred.locationJurisdiction || 'U.S. Bankruptcy Court'}</span>
                          </div>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                            {cred.entityName} ({cred.ticker || 'CH-11'}) — {cred.auctionTitle}
                          </h4>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleCopyCredential(cred)}
                            style={{
                              background: copiedId === cred.id ? '#10B981' : 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
                              color: '#FFF',
                              border: 'none',
                              padding: '8px 14px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            {copiedId === cred.id ? <Check size={14} /> : <Copy size={14} />}
                            {copiedId === cred.id ? 'Copied to Clipboard!' : '📋 Copy Credentials & Webcast Link'}
                          </button>

                          <a
                            href={cred.onlinePortalUrl || "https://auctions.businesscollapse.com"}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              background: 'rgba(16, 185, 129, 0.2)',
                              color: '#10B981',
                              border: '1px solid rgba(16, 185, 129, 0.4)',
                              padding: '8px 14px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <ExternalLink size={14} /> Open Bidding Portal
                          </a>
                        </div>
                      </div>

                      {/* Credentials Detail Bar */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: 'rgba(7, 10, 15, 0.7)', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                        <div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 600 }}>WEBCAST LOG-IN PIN</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>{cred.pin || 'PIN-8849-TRUSTEE'}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 600 }}>BIDDER ID</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#10B981', fontFamily: 'var(--font-mono)' }}>{cred.bidderId || 'BID-2026-9914'}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 600 }}>ESCROW REQUIREMENT</div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1' }}>{cred.registrationParticulars || '$1,000 Refundable Escrow Verified'}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ACTIVE ALERTS */}
          {activeTab === 'alerts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🔔 Active Real-Time Alert Subscriptions
                    <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#10B981', background: 'rgba(16, 185, 129, 0.2)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                      🔒 FREE BETA ALLOWANCE: 1 ACTIVE SLOT USED
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                    Free Beta Tier includes 1 free active alert slot. Upgrade to VIP Pass for unlimited multi-sector, 50-state alerts, & webhooks.
                  </p>
                </div>
              </div>


              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { title: "24/7 Emergency PACER Docket Filings", desc: "Instant SMS alerts for all new Chapter 11 voluntary petitions", type: "SMS & Email", active: true },
                  { title: "Section 363 Auction 60-Minute Reminders", desc: "Countdown SMS reminders before court auction bidding begins", type: "SMS Direct", active: true },
                  { title: "Pre-Judicial WARN Act & Rating Downgrade Wire", desc: "Pre-bankruptcy layoff notices and S&P/Moody's default alerts", type: "Email Wire", active: true },
                  { title: "Custom Sub-$10M Regional Distress Radar (Houston, LA, Miami)", desc: "Sub-$10M regional business insolvencies in major metropolises", type: "Custom Radar", active: true }
                ].map((alertItem, idx) => (
                  <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFF' }}>{alertItem.title}</div>
                      <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{alertItem.desc}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F59E0B', background: 'rgba(245, 158, 11, 0.15)', padding: '3px 8px', borderRadius: '4px' }}>
                        {alertItem.type}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981' }}>✓ ACTIVE</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: USER MANUAL */}
          {activeTab === 'manual' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%)', padding: '20px 24px', borderRadius: '12px', border: '1px solid rgba(192, 132, 252, 0.4)' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#C084FC', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BookOpen size={22} color="#C084FC" /> BusinessCollapse.Com Terminal User Manual & Button Guide
                </div>
                <p style={{ fontSize: '0.84rem', color: '#CBD5E1', marginTop: '6px', margin: 0, lineHeight: 1.5 }}>
                  Detailed section & button usage guide for liquidators, turnaround attorneys, distress funds, and credit risk desks.
                </p>
              </div>

              {/* MASTER AI CONCIERGE PROMPT BANNER */}
              <div style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(79, 70, 229, 0.15) 100%)', border: '1.5px solid #C084FC', borderRadius: '12px', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: '#C084FC', color: '#0B0F19', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem' }}>NEW</span>
                    🤖 Master AI Concierge Onboarding Prompt Pack (Bring-Your-Own-AI)
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '4px' }}>
                    Copy our master Wall Street prompt pack directly into ChatGPT, Claude, or Gemini to turn AI into your 24/7 Terminal Assistant!
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    if (onOpenMasterAiPrompt) onOpenMasterAiPrompt();
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
                    color: '#FFF',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 0 16px rgba(124, 58, 237, 0.4)'
                  }}
                >
                  🤖 Open Master AI Prompt Pack (1-Click) →
                </button>
              </div>

              {/* SECTION 1: HEADER NAVIGATION BUTTONS & SEARCH */}
              <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px' }}>

                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#F59E0B', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={16} /> 🎯 Top Header Navigation Controls & Buttons
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  
                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #C084FC' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#C084FC' }}>⚙️ "Account" Button (Far Right Toolbar)</div>
                    <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '4px' }}>
                      <strong>Why & How to Use:</strong> Central hub for managing your subscriber profile, setting your mobile phone number for 24/7 SMS distress alerts, viewing saved 363 auction log-in PINs, checking active alert subscriptions, accessing this manual, and submitting product feedback.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #F87171' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#F87171' }}>⚡ "Welcome Brief" Button</div>
                    <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '4px' }}>
                      <strong>Why & How to Use:</strong> Gives new users and institutional investors an instant 60-second executive orientation of the platform's features, distress scoring, and core workflows.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #F59E0B' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#F59E0B' }}>❓ "FAQ" Button</div>
                    <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '4px' }}>
                      <strong>Why & How to Use:</strong> Clarifies threshold rules ($10M+ liabilities vs sub-$10M regional insolvencies), data sources (PACER, SEC Edgar 8-K, WARN Act, state labor portals), and court decree discharge rules.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #10B981' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10B981' }}>🛡️ "VIP Membership" Button</div>
                    <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '4px' }}>
                      <strong>Why & How to Use:</strong> Registers your account for the 100-Member VIP Founder Pass, unlocking real-time SMS alerts, raw PACER court PDF downloads, sub-$10M regional radars, and direct API key access.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #38BDF8' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38BDF8' }}>🔍 Global Search Bar ("Search Ticker, Docket, Entity...")</div>
                    <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '4px' }}>
                      <strong>Why & How to Use:</strong> Instant search engine across all corporate autopsies, tickers, bankruptcy court jurisdictions, and docket case numbers. Type any ticker (e.g. <code>SAVE</code>, <code>WE</code>, <code>BBBYQ</code>) or case number to jump straight to the dossier.
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION 2: WORKSPACE TABS */}
              <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#EF4444', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Gavel size={16} /> 📊 Workspace Views & Features
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  
                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFF' }}>📊 Graveyard Post-Mortems</div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                      Executive case studies on famous corporate collapses with debt breakdowns, failure causes, and key lessons.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFF' }}>⚡ Distress Wire Feed</div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                      Real-time live feed of active Chapter 11 dockets, pre-judicial WARN Act layoff notices, and credit rating downgrades.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFF' }}>⚖️ Section 363 Court Auctions</div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                      Active court-ordered asset liquidation auctions where investors can bid on IP, real estate, aircraft fleets, and equipment.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFF' }}>💀 Zombie Crypto Tracker</div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                      Specialized tracker monitoring insolvent crypto exchanges, DeFi protocols, and distressed web3 treasuries.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFF' }}>🧬 Anatomy of Failure</div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                      Diagnostic visual breakdown of failure patterns (overleverage, fraud, supply chain breakdown, tech disruption).
                    </div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFF' }}>⭐ Watchlist & Sector Index</div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                      Bookmark distressed entities and view real-time distress heatmaps across Retail, CRE, Fintech, Energy, and Healthcare.
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION 3: ACTION BUTTONS & CREDENTIAL UTILITIES */}
              <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#10B981', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Key size={16} /> 🔨 Auction Credential Buttons & Usage Tips
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #F59E0B' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#F59E0B' }}>🔔 "Set Up 24/7 Custom Alerts" Button</div>
                    <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '4px' }}>
                      <strong>Why & How to Use:</strong> Configures instant SMS & Email radar alerts across 16 sectors, state WARN Act layoff threshold limits, and active Section 363 liquidation auctions.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #38BDF8' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38BDF8' }}>🤖 1-Click Google AI Chronological Intelligence Brief</div>
                    <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '4px' }}>
                      <strong>Why & How to Use:</strong> Bypasses news publisher paywalls (WSJ, Bloomberg) by launching a structured Google AI query synthesizing WARN notices, SEC EDGAR 8-Ks, and docket milestones into an un-paywalled chronological briefing.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #7C3AED' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#C084FC' }}>📋 "Copy Credentials & Webcast Link" Button</div>
                    <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '4px' }}>
                      <strong>Why & How to Use:</strong> Formats bidder log-in PINs, trustee escrow requirements, bidder IDs, and webcast portal links into a clean 1-click text block ready to paste into court filings, emails, or internal memos.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #10B981' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10B981' }}>↗ "Open Official Webcast Portal" Button</div>
                    <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '4px' }}>
                      <strong>Why & How to Use:</strong> Direct link to court-approved video/audio webcast portals for active Chapter 11 auction bidding sessions. Launches in a new browser tab during scheduled auction hours.
                    </div>
                  </div>

                  <div style={{ background: 'rgba(7, 10, 15, 0.6)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #F59E0B' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#F59E0B' }}>💡 "Digital Suggestion Box" (Account Vault - Tab 5)</div>
                    <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '4px' }}>
                      <strong>Why & How to Use:</strong> Direct line to Product Engineering for requesting new data feeds, reporting dockets, or suggesting UI enhancements. Posts automatically to Netlify Forms & draft emails.
                    </div>
                  </div>


                </div>
              </div>

            </div>
          )}


          {/* TAB 5: FEEDBACK BOX */}
          {activeTab === 'feedback' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(124, 58, 237, 0.1)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#C084FC' }}>
                  💡 Digital Suggestion Box & Product Desk
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                  Have a feature request, data anomaly report, or strategic suggestion? Submissions route directly to our Product Engineering team.
                </p>
              </div>

              <form onSubmit={handleSubmitFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>FEEDBACK CATEGORY *</label>
                  <select 
                    value={feedbackCategory}
                    onChange={(e) => setFeedbackCategory(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '10px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none' }}
                  >
                    <option value="Feature Request">💡 New Feature Request</option>
                    <option value="Data Anomaly">⚠️ Data Anomaly or Docket Correction</option>
                    <option value="UI & Mobile">📱 Mobile / UI Improvement</option>
                    <option value="General Feedback">💬 General Platform Feedback</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', marginBottom: '6px' }}>YOUR SUGGESTION OR FEEDBACK MESSAGE *</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="Tell us what new features or data feeds you'd like to see added..."
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    style={{ width: '100%', background: 'rgba(15,23,42,0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '12px 14px', color: '#F8FAFC', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Send size={16} /> Submit Feedback to Product Desk
                  </button>

                  <a 
                    href={`mailto:feedback@businesscollapse.com?subject=${encodeURIComponent(`[${feedbackCategory}] Suggestion from ${name}`)}&body=${encodeURIComponent(feedbackMessage || 'My feedback:')}`}
                    style={{ fontSize: '0.78rem', color: '#C084FC', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Mail size={14} /> Send via Email Client (feedback@businesscollapse.com) ↗
                  </a>
                </div>

                {feedbackStatus === 'SUCCESS' && (
                  <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '12px 16px', borderRadius: '8px', color: '#10B981', fontSize: '0.82rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={16} /> Thank you! Your feedback has been logged into our Product Engineering Desk and copied to feedback@businesscollapse.com.
                  </div>
                )}
              </form>
            </div>
          )}

          {/* TAB: Muted Assets Registry */}
          {activeTab === 'muted' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Trash2 size={24} color="#EF4444" />
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                    Muted & Dismissed Asset Registry
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
                    Entities muted here will be suppressed from your active main feed wire. You can restore them to your active feed at any time with 1-click.
                  </p>
                </div>
              </div>

              {(dismissedCompanyIds || []).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', border: '1px border var(--border-subtle)' }}>
                  <Sparkles size={32} color="#10B981" style={{ marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF' }}>No Muted Assets</h4>
                  <p style={{ fontSize: '0.82rem', color: '#94A3B8', maxWidth: '420px', margin: '6px auto 0 auto' }}>
                    Your active main feed wire is showing all tracked corporate distress signals. Use the 🙈 Dismiss button under any card's Share link to suppress noise.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(dismissedCompanyIds || []).map(id => {
                    const matched = (companies || []).find(c => c.id === id || c.ticker === id);
                    const name = matched ? matched.name : id;
                    const ticker = matched ? matched.ticker : '';
                    return (
                      <div key={id} style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 800, color: '#FFF', fontSize: '0.95rem' }}>{name}</span>
                            {ticker && <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>{ticker}</span>}
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#EF4444' }}>🚫 Stream Muted</span>
                        </div>

                        {toggleDismissCompany && (
                          <button
                            onClick={() => toggleDismissCompany(id)}
                            style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          >
                            ↺ Restore to Active Feed
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
