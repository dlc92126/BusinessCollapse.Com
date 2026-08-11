import React, { useState } from 'react';
import { 
  X, MessageSquare, Ticket, Send, Shield, Sparkles, CheckCircle2, Clock, 
  AlertCircle, Plus, ChevronRight, User, Key, Building2, HelpCircle, Lock, RefreshCw, ExternalLink
} from 'lucide-react';

export default function SubscriberBackOfficeModal({ 
  isOpen, 
  onClose, 
  userProfile = {}, 
  setUserProfile = () => {},
  onOpenFounders = () => {}
}) {
  if (!isOpen) return null;

  // Active view: 'chat' | 'tickets' | 'account'
  const [activeTab, setActiveTab] = useState('chat');
  
  // Ticket Filter: 'all' | 'open' | 'closed'
  const [ticketFilter, setTicketFilter] = useState('all');
  const [selectedTicketId, setSelectedTicketId] = useState('ticket-101');

  // Input & Chat State
  const [chatInput, setChatInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Active Tickets State (Mini-CRM)
  const [tickets, setTickets] = useState([
    {
      id: 'ticket-101',
      ticketNumber: 'BC-8921',
      title: 'Upgrade Account to $499 Sales Conquest Pass',
      category: 'Billing & Tiers',
      status: 'open', // 'open' | 'closed'
      priority: 'HIGH',
      createdAt: '10:15 AM Today',
      updatedAt: '10:30 AM Today',
      messages: [
        {
          id: 'm1',
          sender: 'user',
          senderName: userProfile.name || 'VIP Subscriber',
          text: 'Hi, I need to upgrade our account to the $499 Sales Conquest Pass so our sales team can access automated WARN notice CRM exports.',
          timestamp: '10:15 AM'
        },
        {
          id: 'm2',
          sender: 'ai',
          senderName: 'VERITAS AI',
          text: 'I have logged your upgrade request under Ticket #BC-8921 and notified our human Restructuring Desk (support@businesscollapse.com). A billing coordinator will confirm your upgraded API access key shortly.',
          timestamp: '10:16 AM'
        }
      ]
    },
    {
      id: 'ticket-102',
      ticketNumber: 'BC-8810',
      title: 'PACER Docket Downloader 4-Digit PIN Verification',
      category: 'Technical Support',
      status: 'closed',
      priority: 'MEDIUM',
      createdAt: 'Yesterday 02:45 PM',
      updatedAt: 'Yesterday 03:10 PM',
      messages: [
        {
          id: 'm3',
          sender: 'user',
          senderName: userProfile.name || 'VIP Subscriber',
          text: 'Requesting PIN verification for downloading Delaware Chapter 11 PACER dockets.',
          timestamp: '02:45 PM'
        },
        {
          id: 'm4',
          sender: 'ai',
          senderName: 'VERITAS AI',
          text: 'Your security PIN (8849) has been verified. You can now download PDFs directly from the court docket viewer.',
          timestamp: '02:46 PM'
        },
        {
          id: 'm5',
          sender: 'support',
          senderName: 'Human Support Desk (Alex V.)',
          text: 'Ticket resolved. Let us know if you need assistance with custom court sweeps.',
          timestamp: '03:10 PM'
        }
      ]
    }
  ]);

  // Canned Request Subjects Quick Chips
  const cannedChips = [
    { id: 'c1', label: '🎟️ Upgrade Subscription Tier ($299 -> $499)', category: 'Billing & Tiers', priority: 'HIGH' },
    { id: 'c2', label: '🔑 Reset PACER Docket 4-Digit Security PIN', category: 'Technical Support', priority: 'HIGH' },
    { id: 'c3', label: '📡 Request Custom API Webhook Integration', category: 'API & Integrations', priority: 'MEDIUM' },
    { id: 'c4', label: '📞 Escalate Ticket to Human Restructuring Desk', category: 'Executive Support', priority: 'HIGH' }
  ];

  // Handle Send Chat Message & Auto-Ticket Escalation
  const handleSendMessage = (textToSend) => {
    const query = textToSend || chatInput;
    if (!query || !query.trim()) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      senderName: userProfile.name || 'VIP Subscriber',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // If viewing active ticket, append message
    if (activeTab === 'tickets' && selectedTicketId) {
      setTickets(prev => prev.map(t => {
        if (t.id === selectedTicketId) {
          return {
            ...t,
            updatedAt: 'Just now',
            messages: [...t.messages, userMsg]
          };
        }
        return t;
      }));
      setChatInput('');
      return;
    }

    // Otherwise, create a new Ticket in Mini-CRM
    const newTicketId = 'ticket-' + Date.now();
    const newTicketNum = 'BC-' + Math.floor(8000 + Math.random() * 1900);
    
    // Check if escalation is needed
    const needsEscalation = query.toLowerCase().includes('human') || 
                            query.toLowerCase().includes('upgrade') || 
                            query.toLowerCase().includes('pin') || 
                            query.toLowerCase().includes('billing') ||
                            query.toLowerCase().includes('api');

    const aiMsg = {
      id: 'ai-' + Date.now(),
      sender: 'ai',
      senderName: 'VERITAS AI',
      text: needsEscalation 
        ? `I have logged your request under Ticket #${newTicketNum} and auto-routed an escalation dispatch to support@businesscollapse.com. Our human Restructuring Desk has received your request and will respond shortly.`
        : `Thank you for reaching out! Your inquiry has been recorded under Ticket #${newTicketNum}. I am analyzing platform schemas and court ingestion feeds for you.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newTicket = {
      id: newTicketId,
      ticketNumber: newTicketNum,
      title: query.length > 50 ? query.slice(0, 50) + '...' : query,
      category: needsEscalation ? 'Executive Support' : 'General Support',
      status: 'open',
      priority: needsEscalation ? 'HIGH' : 'MEDIUM',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      messages: [userMsg, aiMsg]
    };

    setTickets(prev => [newTicket, ...prev]);
    setSelectedTicketId(newTicketId);
    setChatInput('');
    setIsAiThinking(true);

    // Also simulate silent background internal email dispatch to support@businesscollapse.com
    try {
      fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: userProfile.email || 'subscriber@businesscollapse.com',
          to: 'support@businesscollapse.com',
          subject: `[MINI-CRM TICKET #${newTicketNum}] ${newTicket.title}`,
          text: `NEW SUBSCRIBER TICKET GENERATED VIA AI CONCIERGE\n\nTicket #: ${newTicketNum}\nSubscriber: ${userProfile.name || 'VIP Member'} (${userProfile.email || 'subscriber@domain.com'})\nQuery: ${query}`,
          html: `<div style="font-family: Arial, sans-serif; background: #0F172A; color: #F8FAFC; padding: 20px; border-radius: 8px;">
            <h3 style="color: #38BDF8;">NEW MINI-CRM TICKET #${newTicketNum}</h3>
            <p><strong>Subscriber:</strong> ${userProfile.name || 'VIP Member'} (&lt;${userProfile.email || 'subscriber@domain.com'}&gt;)</p>
            <p><strong>Tier:</strong> ${userProfile.tier || 'BETA FOUNDER PASS'}</p>
            <p><strong>Message:</strong> ${query}</p>
          </div>`
        })
      }).catch(err => console.log('Background ticket sync:', err));
    } catch (e) {}

    setTimeout(() => {
      setIsAiThinking(false);
    }, 600);
  };

  const selectedTicket = selectedTicketId ? tickets.find(t => t.id === selectedTicketId) : null;
  const filteredTickets = tickets.filter(t => {
    if (ticketFilter === 'open') return t.status === 'open';
    if (ticketFilter === 'closed') return t.status === 'closed';
    return true;
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      background: 'rgba(5, 8, 15, 0.95)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '20px'
    }}>
      
      {/* MAIN SUBSCRIBER COMMAND CENTER MODAL */}
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        height: '90vh',
        background: '#090D16',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* TOP HEADER BAR */}
        <div style={{
          padding: '14px 24px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 22, 0.98) 100%)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
              padding: '6px 12px',
              borderRadius: '8px',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 900,
              fontSize: '0.85rem',
              boxShadow: '0 0 12px rgba(56, 189, 248, 0.4)'
            }}>
              <Sparkles size={16} /> SUBSCRIBER BACK OFFICE & MINI-CRM
            </div>
            <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              AI CONCIERGE & SUPPORT TICKET WORKSTATION
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.05)',
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
              <X size={16} /> Close Back Office
            </button>
          </div>
        </div>

        {/* WORKSTATION BODY: 2 COLUMNS (LEFT TICKET CRM DRAWER, RIGHT CONCIERGE CHAT & DETAILS) */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* COLUMN 1: LEFT MINI-CRM TICKET DRAWER (ChatGPT Chat History Style) */}
          <div style={{
            width: '320px',
            background: 'rgba(11, 15, 23, 0.98)',
            borderRight: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 12px'
          }}>
            
            {/* New Chat / Ticket Button */}
            <button
              onClick={() => {
                setActiveTab('chat');
                setSelectedTicketId(null);
              }}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                gap: '8px',
                marginBottom: '16px',
                boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)'
              }}
            >
              <Plus size={16} /> 💬 New AI Concierge Inquiry
            </button>

            {/* Ticket Status Filters */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', background: 'rgba(15, 23, 42, 0.8)', padding: '4px', borderRadius: '8px' }}>
              {[
                { id: 'all', label: `All (${tickets.length})` },
                { id: 'open', label: `🟢 Open (${tickets.filter(t => t.status === 'open').length})` },
                { id: 'closed', label: `⚪ Closed (${tickets.filter(t => t.status === 'closed').length})` }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setTicketFilter(f.id)}
                  style={{
                    flex: 1,
                    padding: '4px 6px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: ticketFilter === f.id ? 900 : 700,
                    border: 'none',
                    background: ticketFilter === f.id ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                    color: ticketFilter === f.id ? '#38BDF8' : '#64748B',
                    cursor: 'pointer'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Ticket List Drawer Items */}
            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#64748B', letterSpacing: '0.05em', marginBottom: '8px', paddingLeft: '4px' }}>
              MY SUPPORT TICKETS & CHATS
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => {
                    setSelectedTicketId(ticket.id);
                    setActiveTab('tickets');
                  }}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: selectedTicketId === ticket.id ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255,255,255,0.02)',
                    border: selectedTicketId === ticket.id ? '1px solid #38BDF8' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  className="glass-panel-interactive"
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#38BDF8', fontFamily: 'monospace' }}>
                      #{ticket.ticketNumber}
                    </span>
                    <span style={{
                      fontSize: '0.64rem',
                      fontWeight: 900,
                      color: ticket.status === 'open' ? '#10B981' : '#64748B',
                      background: ticket.status === 'open' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)',
                      padding: '1px 6px',
                      borderRadius: '4px'
                    }}>
                      {ticket.status === 'open' ? '🟢 OPEN' : '⚪ CLOSED'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '4px' }}>
                    {ticket.title}
                  </div>

                  <div style={{ fontSize: '0.68rem', color: '#64748B', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{ticket.category}</span>
                    <span>{ticket.updatedAt}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Account Quick Status Badge */}
            <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ background: '#0F172A', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User size={18} color="#38BDF8" />
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {userProfile.name || 'VIP Founder Member'}
                  </div>
                  <div style={{ fontSize: '0.66rem', color: '#10B981', fontWeight: 800 }}>
                    {userProfile.tier || 'BETA FOUNDER PASS'}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 2: RIGHT CONCIERGE CHAT & TICKET DISPLAY PANE */}
          <div style={{ flex: 1, background: '#0F172A', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            {/* CANNED SUBJECT QUICK CHIPS BAR */}
            <div style={{ padding: '12px 20px', background: '#090D16', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#64748B', letterSpacing: '0.05em', marginBottom: '8px' }}>
                FREQUENT TOPICS
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {cannedChips.map(chip => (
                  <button
                    key={chip.id}
                    onClick={() => handleSendMessage(chip.label)}
                    style={{
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      color: '#38BDF8',
                      padding: '4px 10px',
                      borderRadius: '16px',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CHAT MESSAGES DISPLAY CONTAINER */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {selectedTicket ? (
                <>
                  {/* Ticket Header Metadata */}
                  <div style={{ background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Ticket size={18} color="#38BDF8" />
                        <h3 style={{ color: '#F8FAFC', margin: 0, fontSize: '1rem', fontWeight: 900 }}>
                          Ticket #{selectedTicket.ticketNumber}: {selectedTicket.title}
                        </h3>
                      </div>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        color: selectedTicket.status === 'open' ? '#10B981' : '#94A3B8',
                        background: selectedTicket.status === 'open' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${selectedTicket.status === 'open' ? '#10B981' : '#64748B'}`,
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}>
                        {selectedTicket.status === 'open' ? '🟢 OPEN & SYNCED TO BACK OFFICE' : '⚪ CLOSED & RESOLVED'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.74rem', color: '#64748B', display: 'flex', gap: '16px' }}>
                      <span>Category: <strong>{selectedTicket.category}</strong></span>
                      <span>Priority: <strong style={{ color: '#EF4444' }}>{selectedTicket.priority}</strong></span>
                      <span>Created: {selectedTicket.createdAt}</span>
                    </div>
                  </div>

                  {/* Message Thread History */}
                  {selectedTicket.messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '4px', fontWeight: 700 }}>
                        {msg.senderName} • {msg.timestamp}
                      </div>

                      <div style={{
                        maxWidth: '75%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        background: msg.sender === 'user' 
                          ? 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' 
                          : (msg.sender === 'support' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15, 23, 42, 0.9)'),
                        border: msg.sender === 'user' 
                          ? 'none' 
                          : (msg.sender === 'support' ? '1px solid #10B981' : '1px solid var(--border-subtle)'),
                        color: '#F8FAFC',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontSize: '0.8rem', fontWeight: 700 }}>
                      <RefreshCw size={14} className="spin-anim" /> AI Concierge is processing & syncing with Back Office Desk...
                    </div>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                  <Sparkles size={32} color="#38BDF8" style={{ marginBottom: '12px' }} />
                  <h3>Welcome to the Subscriber AI Concierge</h3>
                  <p style={{ fontSize: '0.85rem' }}>Select a quick chip above or type your inquiry below to initiate a ticket.</p>
                </div>
              )}

            </div>

            {/* CHAT INPUT FORM BAR */}
            <div style={{ padding: '16px 24px', background: '#090D16', borderTop: '1px solid var(--border-subtle)' }}>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                style={{ display: 'flex', gap: '12px' }}
              >
                <input
                  type="text"
                  placeholder="Ask AI Concierge or request ticket escalation..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    color: '#FFF',
                    padding: '12px 16px',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '12px 20px', gap: '6px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                >
                  <Send size={15} /> Send Request
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
