import React, { useState } from 'react';
import { 
  X, Mail, Inbox, Send, FileText, Folder, Settings, Search, RefreshCw, 
  Trash2, Star, AlertCircle, Plus, CornerUpLeft, CornerUpRight, Paperclip, 
  Check, CheckCircle2, Shield, Flame, Building2, ExternalLink, HelpCircle, Info, Radio,
  Users, UserCheck, Phone, MapPin, Tag
} from 'lucide-react';
import sandboxMembers from '../data/sandbox_members.json';

export default function EmailClientModal({ isOpen, onClose, companies = [], onReturnToBackOffice }) {
  if (!isOpen) return null;

  // Active mailbox account: 'all' | 'events' | 'support' | 'info'
  const [activeAccount, setActiveAccount] = useState('events');

  // Active folder view: 'inbox' | 'sent' | 'drafts' | 'contacts' | 'settings'
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmailId, setSelectedEmailId] = useState('msg-1');
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // Contacts Filtering State
  const [contactSearch, setContactSearch] = useState('');
  const [contactTierFilter, setContactTierFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);

  // Composer Form State
  const [composerFrom, setComposerFrom] = useState('vance@businesscollapse.com');
  const [composerTo, setComposerTo] = useState('vance@citadelcap.com');
  const [composerSubject, setComposerSubject] = useState('[BREAKING WIRE] Chapter 11 Filing Alert: Peach State Freight & Logistics');
  const [composerBody, setComposerBody] = useState(`AP PRESS WIRE | BREAKING FINANCIAL SWEEP DESK NOVEL EVENT: 🚨 WARN LAYOFF NOTICE (220 EMPLOYEES)

WILMINGTON, DE — August 10, 2026 — Peach State Freight & Logistics (PSFL) has triggered an urgent pre-petition distress alert following the latest system sweep.

• Event Date & Timestamp: August 10, 2026 at 14:15 EST
• Primary Distress Cause: Payroll default & debt covenant breach
• Estimated Liabilities: $45,000,000
• Court Docket: U.S. Bankruptcy Court (District of Delaware)

For immediate DIP financing inquiries, contact the restructuring desk at BusinessCollapse Intelligence.`);
  
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState('');
  
  // Real World Resend API Config States
  const [resendApiKey, setResendApiKey] = useState(() => localStorage.getItem('bcc_resend_api_key') || '');
  const [resendFromDomain, setResendFromDomain] = useState(() => localStorage.getItem('bcc_resend_from_domain') || 'onboarding@resend.dev');
  const [testRecipientEmail, setTestRecipientEmail] = useState(() => localStorage.getItem('bcc_test_recipient_email') || '');
  const [apiSaveMessage, setApiSaveMessage] = useState('');

  // Refresh & Sync State
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshNotification, setRefreshNotification] = useState('');

  // Sample Back Office Emails divided into 3 Inboxes
  const [emails, setEmails] = useState([
    // === INBOX 1: EVENT FEED & DISTRESS WIRE (vance@businesscollapse.com) ===
    {
      id: 'msg-1',
      account: 'events',
      folder: 'inbox',
      fromName: 'Delaware Court Electronic Filer',
      fromEmail: 'ecf_notices@deb.uscourts.gov',
      toEmail: 'vance@businesscollapse.com',
      subject: '🔥 [COURT DOCKET] Chapter 11 Voluntary Petition Filed: Peach State Freight & Logistics (Case 26-10492)',
      snippet: 'Notice of Chapter 11 Filing. Debtor: Peach State Freight & Logistics, Inc. Estimated Liabilities $45M. Emergency First Day Motions Scheduled.',
      date: '10:45 AM Today',
      timestamp: '2026-08-10T10:45:00Z',
      unread: true,
      starred: true,
      badge: 'CHAPTER 11',
      badgeColor: '#EF4444',
      bodyHtml: `
        <div style="font-family: monospace; color: #F8FAFC; background: #090D16; padding: 20px; border-radius: 8px; border: 1px solid #EF4444;">
          <h3 style="color: #EF4444; margin-top: 0;">U.S. BANKRUPTCY COURT — DISTRICT OF DELAWARE</h3>
          <p><strong>Case Number:</strong> 26-10492-JTD</p>
          <p><strong>Debtor:</strong> Peach State Freight & Logistics, Inc. (EIN: 48-2910492)</p>
          <p><strong>Primary Cause:</strong> Unfunded Fleet Lease Debt & Freight Rate Contraction</p>
          <hr style="border-color: rgba(255,255,255,0.1);" />
          <p>Notice is hereby given that on August 10, 2026, the debtor filed a voluntary petition for relief under Chapter 11 of Title 11 of the United States Code.</p>
          <ul>
            <li>Estimated Assets: $10,000,000 – $50,000,000</li>
            <li>Estimated Liabilities: $45,000,000</li>
            <li>WARN Layoff Notice: 220 Logistics Workers (Wilmington Hub)</li>
          </ul>
          <p style="color: #64748B; font-size: 0.8rem;">Automated Ingestion Notice • BusinessCollapse.com ECF Sweep</p>
        </div>
      `
    },
    {
      id: 'msg-2',
      account: 'events',
      folder: 'inbox',
      fromName: 'Alexander Vance (Citadel Capital)',
      fromEmail: 'vance@citadelcap.com',
      toEmail: 'vance@businesscollapse.com',
      subject: '💳 [DIP LOAN INQUIRY] Tranche A Emergency Cash Term Sheet for Redline Cargo',
      snippet: 'We are reviewing the Redline Cargo dossier on BusinessCollapse. We have $15M in DIP capital ready to deploy upon Chapter 11 filing.',
      date: '09:12 AM Today',
      timestamp: '2026-08-10T09:12:00Z',
      unread: true,
      starred: false,
      badge: 'DIP CAPITAL',
      badgeColor: '#38BDF8',
      bodyHtml: `
        <div style="font-family: sans-serif; color: #F8FAFC; background: #0F172A; padding: 20px; border-radius: 8px;">
          <h3 style="color: #38BDF8; margin-top: 0;">Citadel Capital Restructuring Desk</h3>
          <p>Hi Team,</p>
          <p>We flagged <strong>Redline Cargo Express</strong> on your Sub-$10M / Regional Distress Radar. Our credit committee has pre-approved a <strong>$15,000,000 Senior Secured DIP Facility</strong>.</p>
          <p>Please connect us with lead counsel listed on docket 26-90214.</p>
          <p>Best regards,<br/><strong>Alexander Vance</strong><br/>Managing Principal, Citadel Capital</p>
        </div>
      `
    },
    {
      id: 'msg-3',
      account: 'events',
      folder: 'inbox',
      fromName: 'AP Press Wire Syndication',
      fromEmail: 'syndication@apnewsdesk.com',
      toEmail: 'vance@businesscollapse.com',
      subject: '📰 [MEDIA SYNDICATION] AP Financial Sweep Ingestion Hook Confirmation',
      snippet: 'Your novel event press wire feeds for Chapter 11 filings are active. 14 media outlets fetched your latest distress memos.',
      date: 'Yesterday 04:30 PM',
      timestamp: '2026-08-09T16:30:00Z',
      unread: false,
      starred: false,
      badge: 'AP WIRE',
      badgeColor: '#F59E0B',
      bodyHtml: `
        <div style="font-family: sans-serif; color: #F8FAFC; background: #0F172A; padding: 20px; border-radius: 8px;">
          <h3 style="color: #F59E0B; margin-top: 0;">AP Financial Sweep Syndication Desk</h3>
          <p>Your automated AP Press Wire generator dispatched 14 novelty alerts to national media subscribers over the past 24 hours.</p>
          <p>Top clicked story: <em>"Sub-Zero Logistics Triggers Emergency WARN Notice"</em></p>
        </div>
      `
    },

    // === INBOX 2: CUSTOMER SUPPORT & MEMBER SERVICES (support@businesscollapse.com) ===
    {
      id: 'msg-sup-1',
      account: 'support',
      folder: 'inbox',
      fromName: 'Marcus Sterling (Aegis Restructuring)',
      fromEmail: 'm.sterling@aegiscap.com',
      toEmail: 'support@businesscollapse.com',
      subject: '🎧 [UPGRADE INQUIRY] Upgrading Account to Sales Conquest Pass ($499/mo)',
      snippet: 'We currently hold the Media Wire Pass ($299). How do we enable real-time CRM export hooks for our sales team?',
      date: '11:20 AM Today',
      timestamp: '2026-08-10T11:20:00Z',
      unread: true,
      starred: true,
      badge: 'SUPPORT',
      badgeColor: '#C084FC',
      bodyHtml: `
        <div style="font-family: sans-serif; color: #F8FAFC; background: #0F172A; padding: 20px; border-radius: 8px;">
          <h3 style="color: #C084FC; margin-top: 0;">BusinessCollapse Support Desk Inquiry</h3>
          <p>Hi Support Team,</p>
          <p>Our team is currently on the <strong>$299 Media Wire Pass</strong>. We want to upgrade immediately to the <strong>$499 Sales Conquest Pass</strong> to enable automated WARN notice CRM exports for our talent acquisition team.</p>
          <p>Can you upgrade our billing portal and issue our sales team API PIN?</p>
          <p>Thanks,<br/><strong>Marcus Sterling</strong> • Aegis Restructuring Group</p>
        </div>
      `
    },
    {
      id: 'msg-sup-2',
      account: 'support',
      folder: 'inbox',
      fromName: 'Elena Rostova (Kroll Advisory)',
      fromEmail: 'elena.rostova@kroll.com',
      toEmail: 'support@businesscollapse.com',
      subject: '🔐 [PIN RESET] Requesting VIP Founder Pass Secret Access PIN Reset',
      snippet: 'We lost our 4-digit PIN for the Chapter 11 PACER docket export tool. Please issue a new security token.',
      date: '08:45 AM Today',
      timestamp: '2026-08-10T08:45:00Z',
      unread: true,
      starred: false,
      badge: 'PIN RESET',
      badgeColor: '#38BDF8',
      bodyHtml: `
        <div style="font-family: sans-serif; color: #F8FAFC; background: #0F172A; padding: 20px; border-radius: 8px;">
          <h3 style="color: #38BDF8; margin-top: 0;">Member Support Inquiry</h3>
          <p>Hello BusinessCollapse Support,</p>
          <p>Our lead analyst lost their 4-digit PIN for the Chapter 11 PACER docket export tool.</p>
          <p>Account Email: <code>elena.rostova@kroll.com</code></p>
          <p>Please send us a reset token or generate a temporary PIN.</p>
        </div>
      `
    },

    // === INBOX 3: GENERAL & MEDIA INQUIRIES (info@businesscollapse.com) ===
    {
      id: 'msg-info-1',
      account: 'info',
      folder: 'inbox',
      fromName: 'Sarah Jenkins (Wall Street Journal)',
      fromEmail: 's.jenkins@wsj.com',
      toEmail: 'info@businesscollapse.com',
      subject: 'ℹ️ [PRESS INQUIRY] Data Request: Q3 Commercial Bankruptcy Wave & WARN Layoffs',
      snippet: 'Writing a front-page feature for WSJ on logistics debt defaults. Can you provide data on your Delaware and Texas filing sweeps?',
      date: '01:15 PM Today',
      timestamp: '2026-08-10T13:15:00Z',
      unread: true,
      starred: true,
      badge: 'PRESS / MEDIA',
      badgeColor: '#F59E0B',
      bodyHtml: `
        <div style="font-family: sans-serif; color: #F8FAFC; background: #0F172A; padding: 20px; border-radius: 8px;">
          <h3 style="color: #F59E0B; margin-top: 0;">The Wall Street Journal — Markets Desk</h3>
          <p>Hi BusinessCollapse Team,</p>
          <p>I am working on a story regarding the surge in commercial freight bankruptcies. Your 12-hour fresh alert sweeps caught our attention.</p>
          <p>Could you provide commentary on the Peach State Freight Chapter 11 filing and your automated WARN notice tracking metrics?</p>
          <p>Best regards,<br/><strong>Sarah Jenkins</strong><br/>Reporter, The Wall Street Journal</p>
        </div>
      `
    },
    {
      id: 'msg-info-2',
      account: 'info',
      folder: 'inbox',
      fromName: 'David Vance (Blackstone Credit)',
      fromEmail: 'd.vance@blackstone.com',
      toEmail: 'info@businesscollapse.com',
      subject: '🏛️ [INSTITUTIONAL TERMINAL] Request for $999/mo Terminal API Trial',
      snippet: 'Our distressed debt desk wants to connect our Bloomberg Terminals to your real-time PACER webhook ingestion engine.',
      date: 'Yesterday 02:10 PM',
      timestamp: '2026-08-09T14:10:00Z',
      unread: false,
      starred: false,
      badge: 'INSTITUTIONAL',
      badgeColor: '#10B981',
      bodyHtml: `
        <div style="font-family: sans-serif; color: #F8FAFC; background: #0F172A; padding: 20px; border-radius: 8px;">
          <h3 style="color: #10B981; margin-top: 0;">Blackstone Credit & Restructuring</h3>
          <p>Greetings,</p>
          <p>We are interested in licensing the <strong>$999/mo Institutional Terminal API</strong> for our trading desk.</p>
          <p>Please send over the API documentation and webhooks specification.</p>
          <p>Sincerely,<br/>David Vance • Blackstone Credit</p>
        </div>
      `
    },

    // OUTBOX & DRAFTS
    {
      id: 'msg-out-1',
      account: 'events',
      folder: 'sent',
      fromName: 'BusinessCollapse Intelligence Outbox',
      fromEmail: 'vance@businesscollapse.com',
      toEmail: 'subscribers-list@businesscollapse.com',
      subject: '⚡ [DAILY DIGEST] Morning Corporate Distress Sweep: 5 Chapter 11 Filings Detected',
      snippet: 'Daily executive summary of North American commercial bankruptcies, WARN notices, and court asset auctions.',
      date: '07:00 AM Today',
      timestamp: '2026-08-10T07:00:00Z',
      unread: false,
      starred: false,
      badge: 'DISPATCHED',
      badgeColor: '#10B981',
      bodyHtml: `
        <div style="font-family: sans-serif; color: #F8FAFC; background: #0F172A; padding: 20px; border-radius: 8px;">
          <h3 style="color: #10B981; margin-top: 0;">BusinessCollapse PRO • Daily Distress Sweep</h3>
          <p>Good morning Founders & Subscribers,</p>
          <p>Here is your 07:00 AM EST distress briefing:</p>
          <ul>
            <li><strong>Peach State Freight:</strong> Chapter 11 ($45M liabilities)</li>
            <li><strong>Apex Solar Energy:</strong> Chapter 7 Liquidation</li>
            <li><strong>Horizon BioPharma:</strong> WARN Notice (180 Employees)</li>
          </ul>
        </div>
      `
    },
    {
      id: 'msg-draft-1',
      account: 'events',
      folder: 'drafts',
      fromName: 'Alexander Vance',
      fromEmail: 'vance@businesscollapse.com',
      toEmail: 'media-desk@reuters.com',
      subject: '📝 [DRAFT] Executive Briefing: National Logistics Distress Wave Q3 2026',
      snippet: 'Draft press memo analyzing supply chain debt defaults across Delaware and Southern District of Texas courts.',
      date: 'Saved 2h ago',
      timestamp: '2026-08-10T14:00:00Z',
      unread: false,
      starred: false,
      badge: 'DRAFT',
      badgeColor: '#94A3B8',
      bodyHtml: `
        <div style="font-family: sans-serif; color: #94A3B8; padding: 20px;">
          <p>[DRAFT MEMO - WORK IN PROGRESS]</p>
          <p>Analysis of Q3 logistics defaults...</p>
        </div>
      `
    }
  ]);

  // Account Inboxes Configuration
  const accountsConfig = [
    {
      id: 'all',
      name: '🌐 ALL INBOXES',
      email: 'All Combined Mailboxes',
      color: '#F8FAFC',
      icon: Inbox
    },
    {
      id: 'events',
      name: '⚡ DISTRESS WIRE',
      email: 'vance@businesscollapse.com',
      color: '#EF4444',
      icon: Radio
    },
    {
      id: 'support',
      name: '🎧 CUSTOMER SUPPORT',
      email: 'support@businesscollapse.com',
      color: '#C084FC',
      icon: HelpCircle
    },
    {
      id: 'info',
      name: 'ℹ️ GENERAL & MEDIA',
      email: 'info@businesscollapse.com',
      color: '#F59E0B',
      icon: Info
    }
  ];

  // Filter Contacts List
  const allContacts = sandboxMembers || [];
  const filteredContacts = allContacts.filter((c) => {
    if (!c) return false;
    if (contactTierFilter !== 'all') {
      const tierStr = (c.tier || '').toLowerCase();
      if (contactTierFilter === 'founder' && !tierStr.includes('founder')) return false;
      if (contactTierFilter === 'media' && !tierStr.includes('media')) return false;
      if (contactTierFilter === 'headhunter' && !tierStr.includes('headhunter')) return false;
      if (contactTierFilter === 'sales' && !tierStr.includes('sales')) return false;
      if (contactTierFilter === 'institutional' && !tierStr.includes('institutional')) return false;
    }
    if (!contactSearch || !contactSearch.trim()) return true;
    const q = contactSearch.toLowerCase();
    return (
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.company && c.company.toLowerCase().includes(q)) ||
      (c.role && c.role.toLowerCase().includes(q)) ||
      (c.location && c.location.toLowerCase().includes(q))
    );
  });

  // Calculate unread counts per inbox account
  const getUnreadCount = (accId) => {
    return emails.filter(e => e.unread && e.folder === 'inbox' && (accId === 'all' || e.account === accId)).length;
  };

  // Filter emails based on selected account, folder, and search query
  const filteredEmails = emails.filter((e) => {
    // Account filtering
    if (activeAccount !== 'all' && e.account && e.account !== activeAccount && e.folder === 'inbox') {
      return false;
    }
    // Folder filtering
    if (activeFolder !== 'settings' && activeFolder !== 'contacts') {
      if (activeFolder === 'inbox' && e.folder !== 'inbox') return false;
      if (activeFolder === 'sent' && e.folder !== 'sent') return false;
      if (activeFolder === 'drafts' && e.folder !== 'drafts') return false;
    }
    // Search query filtering
    if (!searchQuery || !searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.subject.toLowerCase().includes(q) ||
      e.fromName.toLowerCase().includes(q) ||
      e.fromEmail.toLowerCase().includes(q) ||
      e.snippet.toLowerCase().includes(q)
    );
  });

  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || filteredEmails[0] || emails[0];

  // Environment-Aware Smart Dispatch Router (Sandbox Local vs Live World Production)
  const handleSendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendSuccessMessage('');

    const isLocal = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.includes('192.168.')
    );

    const activeApiKey = resendApiKey || localStorage.getItem('bcc_resend_api_key');
    const senderEmail = (resendFromDomain && resendFromDomain.trim()) ? resendFromDomain.trim() : composerFrom;

    // In local dev mode, route real API dispatch to sandbox test email if set, while logging intended target
    const sandboxTestTarget = testRecipientEmail || localStorage.getItem('bcc_test_recipient_email');
    const actualApiRecipient = (isLocal && sandboxTestTarget && sandboxTestTarget.includes('@')) 
      ? sandboxTestTarget.trim() 
      : composerTo.trim();

    const dispatchBadge = isLocal ? '🧪 LOCAL SANDBOX' : '🚀 LIVE WORLD';
    const dispatchBadgeColor = isLocal ? '#38BDF8' : '#10B981';

    const newSentEmail = {
      id: 'msg-' + Date.now(),
      account: activeAccount === 'all' ? 'events' : activeAccount,
      folder: 'sent',
      fromName: `BusinessCollapse (${senderEmail.split('@')[0]})`,
      fromEmail: senderEmail,
      toEmail: composerTo,
      subject: composerSubject,
      snippet: composerBody.slice(0, 100) + '...',
      date: 'Just now',
      timestamp: new Date().toISOString(),
      unread: false,
      starred: false,
      badge: activeApiKey ? dispatchBadge : 'SIMULATED',
      badgeColor: activeApiKey ? dispatchBadgeColor : '#F59E0B',
      bodyHtml: `<div style="font-family: sans-serif; color: #F8FAFC; background: #0F172A; padding: 20px; border-radius: 8px;">
        <h3 style="color: #10B981; margin-top: 0;">${composerSubject}</h3>
        <p><strong>From:</strong> ${senderEmail}</p>
        <p><strong>Intended Recipient:</strong> ${composerTo}</p>
        ${isLocal ? `<p style="color: #38BDF8;"><strong>Environment:</strong> Local Dev Sandbox (Delivered via Resend to ${actualApiRecipient})</p>` : `<p style="color: #10B981;"><strong>Environment:</strong> Live Production (Delivered to World)</p>`}
        <hr style="border-color: rgba(255,255,255,0.1); margin: 16px 0;" />
        <div style="white-space: pre-wrap; margin-top: 16px; line-height: 1.6; color: #E2E8F0;">${composerBody}</div>
      </div>`
    };

    try {
      // Call Serverless Function Endpoint (Handles both Local Dev via Vite & Production Netlify)
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: senderEmail,
          to: actualApiRecipient,
          subject: isLocal ? `[SANDBOX TEST for ${composerTo}] ${composerSubject}` : composerSubject,
          html: newSentEmail.bodyHtml,
          text: composerBody,
          apiKey: activeApiKey
        })
      });

      const resData = await response.json();
      setIsSending(false);

      if (resData.success && (resData.messageId || resData.resendData?.id)) {
        if (isLocal) {
          setSendSuccessMessage(`🧪 LOCAL SANDBOX DISPATCH SUCCESS! Delivered to your Sandbox Test Inbox (${actualApiRecipient})! (Intended for: ${composerTo})`);
        } else {
          setSendSuccessMessage(`🚀 LIVE PRODUCTION DISPATCH DELIVERED to ${composerTo}! Message ID: ${resData.messageId || resData.resendData?.id}`);
        }
      } else if (resData.simulated) {
        setSendSuccessMessage(`✓ Email recorded in Outbox! (To send live emails, add your Resend API Key in Settings)`);
      } else if (resData.error || resData.resendData?.message) {
        const errDetail = resData.error || resData.resendData?.message;
        setSendSuccessMessage(`⚠️ Resend Note: ${errDetail}`);
      } else {
        setSendSuccessMessage(`✓ [DISPATCHED] Email logged in Outbox for ${composerTo}!`);
      }
    } catch (err) {
      console.log('Dispatch fallback:', err);
      setIsSending(false);
      setSendSuccessMessage(`✓ Email recorded in Outbox! (Add your Resend API Key in Settings for live external delivery)`);
    }

    // ALWAYS update local emails state and switch view to Sent folder
    setEmails((prev) => [newSentEmail, ...prev]);
    setSelectedEmailId(newSentEmail.id);

    setTimeout(() => {
      setIsComposerOpen(false);
      setActiveFolder('sent');
      setSendSuccessMessage('');
    }, 2800);
  };

  // Quick launch compose for specific contact
  const handleComposeToContact = (contact) => {
    setComposerTo(contact.email);
    setComposerSubject(`[BUSINESSCOLLAPSE INTELLIGENCE] Executive Briefing for ${contact.name}`);
    setComposerFrom('vance@businesscollapse.com');
    setIsComposerOpen(true);
  };

  // Refresh & Sync Inboxes Handler
  const handleRefreshMailbox = () => {
    setIsRefreshing(true);
    setRefreshNotification('');

    setTimeout(() => {
      const freshNotice = {
        id: 'msg-fresh-' + Date.now(),
        account: activeAccount === 'all' ? 'events' : activeAccount,
        folder: 'inbox',
        fromName: 'Southern District of Texas ECF Clerk',
        fromEmail: 'ecf_alerts@txsb.uscourts.gov',
        toEmail: activeAccount === 'support' ? 'support@businesscollapse.com' : (activeAccount === 'info' ? 'info@businesscollapse.com' : 'vance@businesscollapse.com'),
        subject: `🔥 [FRESH SWEEP] Chapter 11 Voluntary Petition: Sub-Zero Cold Storage (Case 26-${Math.floor(10000 + Math.random() * 90000)})`,
        snippet: 'New pre-petition emergency filing detected during 12-hour PACER sweep. Estimated liabilities: $18,500,000. Emergency financing motion filed.',
        date: 'Just now',
        timestamp: new Date().toISOString(),
        unread: true,
        starred: true,
        badge: 'LIVE SWEEP',
        badgeColor: '#EF4444',
        bodyHtml: `
          <div style="font-family: monospace; color: #F8FAFC; background: #090D16; padding: 20px; border-radius: 8px; border: 1px solid #EF4444;">
            <h3 style="color: #EF4444; margin-top: 0;">U.S. BANKRUPTCY COURT — SOUTHERN DISTRICT OF TEXAS</h3>
            <p><strong>Case Number:</strong> 26-${Math.floor(10000 + Math.random() * 90000)}-H3</p>
            <p><strong>Debtor:</strong> Sub-Zero Cold Storage Holdings, LLC</p>
            <p><strong>Filing Date:</strong> ${new Date().toLocaleTimeString()} EST</p>
            <p><strong>Estimated Liabilities:</strong> $18,500,000</p>
            <hr style="border-color: rgba(255,255,255,0.1);" />
            <p>Live automated PACER ingestion sweep retrieved 1 new court docket entry.</p>
            <p style="color: #64748B; font-size: 0.8rem;">BusinessCollapse Ingestion Engine • Real-Time Webhook Alert</p>
          </div>
        `
      };

      setEmails((prev) => [freshNotice, ...prev]);
      setSelectedEmailId(freshNotice.id);
      setActiveFolder('inbox');
      setIsRefreshing(false);
      setRefreshNotification('✓ Mailboxes Synced! 1 fresh court docket notice fetched.');

      setTimeout(() => {
        setRefreshNotification('');
      }, 3500);
    }, 800);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
      background: 'rgba(5, 8, 15, 0.95)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '20px'
    }}>
      
      {/* MAIN DEDICATED BACK OFFICE MAIL CLIENT WORKSTATION CONTAINER */}
      <div style={{
        width: '100%',
        maxWidth: '1450px',
        height: '92vh',
        background: '#090D16',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(239, 68, 68, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* TOP WORKSTATION TITLE BAR */}
        <div style={{
          padding: '12px 20px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 22, 0.98) 100%)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
              padding: '6px 10px',
              borderRadius: '8px',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 900,
              fontSize: '0.85rem',
              boxShadow: '0 0 12px rgba(239, 68, 68, 0.4)'
            }}>
              <Shield size={16} /> BACK OFFICE MULTI-INBOX & SUBSCRIBER ROLODEX
            </div>
            <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              3 INBOX ACCOUNTS • 75 SUBSCRIBER CONTACTS LOADED
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {refreshNotification && (
              <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#A7F3D0', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', padding: '4px 10px', borderRadius: '6px' }}>
                {refreshNotification}
              </span>
            )}

            <button
              onClick={handleRefreshMailbox}
              disabled={isRefreshing}
              style={{
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid #38BDF8',
                color: '#38BDF8',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <RefreshCw size={15} className={isRefreshing ? 'spin-anim' : ''} /> {isRefreshing ? 'Syncing...' : '🔄 Sync Inboxes'}
            </button>

            <button
              onClick={() => {
                onClose();
                if (onReturnToBackOffice) onReturnToBackOffice();
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(185, 28, 28, 0.35) 100%)',
                border: '1.5px solid #EF4444',
                color: '#FCA5A5',
                borderRadius: '8px',
                padding: '6px 14px',
                fontSize: '0.82rem',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 0 12px rgba(239, 68, 68, 0.3)'
              }}
            >
              <Shield size={15} color="#EF4444" /> ↩️ Return to Back Office & Sandbox Bar
            </button>

            <button
              onClick={() => setIsComposerOpen(true)}
              className="btn-primary"
              style={{
                fontSize: '0.82rem',
                padding: '6px 14px',
                gap: '6px',
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              <Plus size={15} /> ✏️ Compose New Mail
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-subtle)',
                color: '#94A3B8',
                borderRadius: '8px',
                padding: '6px 10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 3-COLUMN MAIL WORKSTATION BODY */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* COLUMN 1: LEFT SIDEBAR NAVIGATION WITH ACCOUNT SWITCHER */}
          <div style={{
            width: '260px',
            background: 'rgba(11, 15, 23, 0.95)',
            borderRight: '1px solid var(--border-subtle)',
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            
            {/* PROMINENT COMPOSE BUTTON AT TOP OF SIDEBAR */}
            <button
              onClick={() => {
                setComposerTo('');
                setComposerSubject('');
                setComposerBody('');
                setIsComposerOpen(true);
              }}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(239, 68, 68, 0.4)',
                cursor: 'pointer'
              }}
            >
              <Plus size={18} /> ✏️ Compose New Mail
            </button>

            {/* MULTI-INBOX ACCOUNT SELECTOR MENU */}
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#64748B', letterSpacing: '0.05em', marginBottom: '8px', paddingLeft: '8px' }}>
                SELECT MAILBOX ACCOUNT
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {accountsConfig.map((acc) => {
                  const IconComp = acc.icon;
                  const unreadCount = getUnreadCount(acc.id);
                  const isSelected = activeAccount === acc.id && activeFolder !== 'contacts';

                  return (
                    <button
                      key={acc.id}
                      onClick={() => {
                        setActiveAccount(acc.id);
                        setActiveFolder('inbox');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: isSelected ? `1.5px solid ${acc.color}` : '1px solid transparent',
                        background: isSelected ? 'rgba(15, 23, 42, 0.9)' : 'transparent',
                        color: isSelected ? '#FFF' : '#94A3B8',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)',
                        textAlign: 'left'
                      }}
                      className="glass-panel-interactive"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <IconComp size={16} color={acc.color} />
                        <div>
                          <div style={{ fontWeight: isSelected ? 900 : 700, fontSize: '0.78rem', color: isSelected ? '#FFF' : '#CBD5E1' }}>
                            {acc.name}
                          </div>
                          <div style={{ fontSize: '0.65rem', color: '#64748B' }}>{acc.email}</div>
                        </div>
                      </div>
                      {unreadCount > 0 && (
                        <span style={{ fontSize: '0.68rem', background: acc.color, color: '#000', padding: '1px 6px', borderRadius: '10px', fontWeight: 900 }}>
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Folder & Contacts Navigation */}
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#64748B', letterSpacing: '0.05em', marginBottom: '8px', paddingLeft: '8px' }}>
                FOLDERS & DIRECTORY
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  onClick={() => setActiveFolder('inbox')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeFolder === 'inbox' ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                    color: activeFolder === 'inbox' ? '#EF4444' : '#94A3B8',
                    fontWeight: activeFolder === 'inbox' ? 800 : 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Inbox size={15} /> 📥 Inbox
                  </span>
                  <span style={{ fontSize: '0.72rem', background: '#EF4444', color: '#FFF', padding: '1px 6px', borderRadius: '10px', fontWeight: 900 }}>
                    {getUnreadCount(activeAccount)}
                  </span>
                </button>

                <button
                  onClick={() => setActiveFolder('sent')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeFolder === 'sent' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: activeFolder === 'sent' ? '#38BDF8' : '#94A3B8',
                    fontWeight: activeFolder === 'sent' ? 800 : 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Send size={15} /> 📤 Outbox / Sent
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#64748B' }}>1</span>
                </button>

                <button
                  onClick={() => setActiveFolder('drafts')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeFolder === 'drafts' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                    color: activeFolder === 'drafts' ? '#F59E0B' : '#94A3B8',
                    fontWeight: activeFolder === 'drafts' ? 800 : 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={15} /> 📝 Drafts
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#64748B' }}>1</span>
                </button>

                {/* 👥 CONTACT ROLODEX TAB */}
                <button
                  onClick={() => setActiveFolder('contacts')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeFolder === 'contacts' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                    color: activeFolder === 'contacts' ? '#10B981' : '#94A3B8',
                    fontWeight: activeFolder === 'contacts' ? 900 : 600,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={15} color="#10B981" /> 👥 Contact Rolodex
                  </span>
                  <span style={{ fontSize: '0.72rem', background: '#10B981', color: '#000', padding: '1px 6px', borderRadius: '10px', fontWeight: 900 }}>
                    {allContacts.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Serverless & Settings */}
            <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => setActiveFolder('settings')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeFolder === 'settings' ? 'rgba(124, 58, 237, 0.2)' : 'transparent',
                  color: activeFolder === 'settings' ? '#C084FC' : '#94A3B8',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                <Settings size={15} /> ⚙️ Netlify & API Settings
              </button>
            </div>

          </div>

          {/* COLUMN 2 & 3: DYNAMIC VIEW (CONTACT ROLODEX OR EMAIL THREADS & READING PANE) */}
          {activeFolder === 'contacts' ? (
            /* 👥 SUBSCRIBER CONTACT ROLODEX DIRECTORY VIEW */
            <div style={{ flex: 1, background: '#0F172A', display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '24px' }}>
              
              {/* Rolodex Top Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ color: '#F8FAFC', margin: 0, fontSize: '1.25rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={20} color="#10B981" /> Subscriber Contact Directory & Rolodex ({filteredContacts.length})
                  </h2>
                  <p style={{ color: '#64748B', fontSize: '0.78rem', margin: '4px 0 0 0' }}>
                    Loaded from 75 Back Office Sandbox Members & Institutional VIP Founder Pass Holders
                  </p>
                </div>

                {/* Search Bar for Contacts */}
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(9, 13, 22, 0.9)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '6px 12px', gap: '8px', width: '320px' }}>
                  <Search size={14} color="#64748B" />
                  <input
                    type="text"
                    placeholder="Search name, email, company, role..."
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    style={{ background: 'transparent', border: 'none', color: '#FFF', fontSize: '0.8rem', outline: 'none', width: '100%' }}
                  />
                  {contactSearch && <X size={14} color="#64748B" style={{ cursor: 'pointer' }} onClick={() => setContactSearch('')} />}
                </div>
              </div>

              {/* Tier Filter Pills */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: `All Members (${allContacts.length})` },
                  { id: 'founder', label: '🔥 VIP Founders' },
                  { id: 'media', label: '📰 Media Wire' },
                  { id: 'headhunter', label: '📡 Headhunter' },
                  { id: 'sales', label: '⚡ Sales Conquest' },
                  { id: 'institutional', label: '🏛️ Institutional' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setContactTierFilter(t.id)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      border: contactTierFilter === t.id ? '1px solid #10B981' : '1px solid var(--border-subtle)',
                      background: contactTierFilter === t.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15, 23, 42, 0.8)',
                      color: contactTierFilter === t.id ? '#10B981' : '#94A3B8'
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Contacts Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    style={{
                      background: '#090D16',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between',
                      gap: '12px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                      transition: 'var(--transition-fast)'
                    }}
                    className="glass-panel-interactive"
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={contact.avatar || `https://i.pravatar.cc/150?u=${contact.id}`}
                            alt={contact.name}
                            style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid #10B981', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 900, color: '#F8FAFC', fontSize: '0.88rem' }}>{contact.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{contact.role || contact.company}</div>
                          </div>
                        </div>

                        <span style={{
                          fontSize: '0.62rem',
                          fontWeight: 900,
                          color: (contact.tier || '').includes('FOUNDER') ? '#F59E0B' : '#38BDF8',
                          background: 'rgba(255,255,255,0.05)',
                          border: `1px solid ${(contact.tier || '').includes('FOUNDER') ? '#F59E0B' : '#38BDF8'}`,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap'
                        }}>
                          {contact.tier || 'MEMBER'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.76rem', color: '#94A3B8', marginTop: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Mail size={13} color="#64748B" /> <code>{contact.email}</code>
                        </div>
                        {contact.phone && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Phone size={13} color="#64748B" /> {contact.phone}
                          </div>
                        )}
                        {contact.location && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MapPin size={13} color="#64748B" /> {contact.location}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: '0.68rem', color: '#64748B', fontFamily: 'monospace' }}>
                        KEY: {contact.apiKey || 'BCC-PASS-2026'}
                      </span>

                      <button
                        onClick={() => handleComposeToContact(contact)}
                        style={{
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.3) 100%)',
                          color: '#A7F3D0',
                          border: '1px solid #10B981',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Mail size={12} color="#10B981" /> 📧 Send Email
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ) : (
            /* REGULAR EMAIL THREADS & READING PANE VIEW */
            <>
              {/* COLUMN 2: EMAIL THREADS LIST PANE */}
              <div style={{
                width: '390px',
                background: '#090D16',
                borderRight: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                
                {/* Search Input Bar with Refresh Sync Control */}
                <div style={{ padding: '12px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '8px' }}>
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    gap: '8px'
                  }}>
                    <Search size={14} color="#64748B" />
                    <input
                      type="text"
                      placeholder="Search subject, sender, ticker..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#F8FAFC',
                        fontSize: '0.78rem',
                        outline: 'none',
                        width: '100%'
                      }}
                    />
                  </div>

                  <button
                    onClick={handleRefreshMailbox}
                    disabled={isRefreshing}
                    title="Fetch latest PACER docket sweep"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      color: isRefreshing ? '#38BDF8' : '#94A3B8',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center'
                    }}
                  >
                    <RefreshCw size={15} className={isRefreshing ? 'spin-anim' : ''} />
                  </button>
                </div>

                {/* Email Items List */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {filteredEmails.length === 0 ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#64748B', fontSize: '0.85rem' }}>
                      No messages in this mailbox folder.
                    </div>
                  ) : (
                    filteredEmails.map((email) => (
                      <div
                        key={email.id}
                        onClick={() => {
                          setSelectedEmailId(email.id);
                          setEmails(prev => prev.map(m => m.id === email.id ? { ...m, unread: false } : m));
                        }}
                        style={{
                          padding: '14px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                          background: selectedEmailId === email.id ? 'rgba(15, 23, 42, 0.9)' : (email.unread ? 'rgba(239, 68, 68, 0.05)' : 'transparent'),
                          borderLeft: selectedEmailId === email.id ? '3px solid #EF4444' : (email.unread ? '3px solid #38BDF8' : '3px solid transparent'),
                          cursor: 'pointer',
                          transition: 'var(--transition-fast)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontWeight: email.unread ? 900 : 700, fontSize: '0.82rem', color: email.unread ? '#FFF' : '#CBD5E1' }}>
                            {email.fromName}
                          </span>
                          <span style={{ fontSize: '0.68rem', color: '#64748B' }}>{email.date}</span>
                        </div>

                        <div style={{ fontWeight: email.unread ? 800 : 600, fontSize: '0.8rem', color: '#F8FAFC', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {email.subject}
                        </div>

                        <div style={{ fontSize: '0.74rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '6px' }}>
                          {email.snippet}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {email.badge && (
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: email.badgeColor, background: 'rgba(255,255,255,0.05)', border: `1px solid ${email.badgeColor}`, padding: '2px 6px', borderRadius: '4px' }}>
                              {email.badge}
                            </span>
                          )}
                          <span style={{ fontSize: '0.65rem', color: '#64748B', fontFamily: 'monospace' }}>
                            To: {email.toEmail}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>

              {/* COLUMN 3: FULL EMAIL READING PANE / SETTINGS */}
              <div style={{ flex: 1, background: '#0F172A', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                
                {activeFolder === 'settings' ? (
                  /* SETTINGS TAB */
                  <div style={{ padding: '32px', maxWidth: '750px' }}>
                    <h3 style={{ color: '#F8FAFC', marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Settings size={20} color="#C084FC" /> Back Office Live Email Dispatch & Inbound Webhook Engine
                    </h3>

                    {/* LIVE RESEND API KEY CONFIGURATION PANEL */}
                    <div style={{ background: '#090D16', border: '1.5px solid #10B981', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <h4 style={{ color: '#10B981', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CheckCircle2 size={18} /> Enable Real-World Live External Email Dispatch
                        </h4>
                        <span style={{ fontSize: '0.7rem', fontWeight: 900, background: resendApiKey ? '#10B981' : '#F59E0B', color: '#000', padding: '2px 8px', borderRadius: '10px' }}>
                          {resendApiKey ? 'LIVE API KEY CONNECTED' : 'SIMULATION MODE'}
                        </span>
                      </div>

                      <p style={{ color: '#CBD5E1', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '16px' }}>
                        Enter a free <strong>Resend API Key</strong> (from <a href="https://resend.com" target="_blank" rel="noreferrer" style={{ color: '#38BDF8', textDecoration: 'underline' }}>Resend.com</a>) to transmit <strong>REAL LIVE EMAILS</strong> directly to any real email inbox on Earth!
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                            RESEND API KEY (re_123456789...)
                          </label>
                          <input
                            type="password"
                            placeholder="re_1234567890abcdef..."
                            value={resendApiKey}
                            onChange={(e) => setResendApiKey(e.target.value)}
                            style={{
                              width: '100%',
                              background: 'rgba(15, 23, 42, 0.9)',
                              border: '1px solid var(--border-subtle)',
                              color: '#FFF',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              fontSize: '0.85rem',
                              fontFamily: 'monospace',
                              outline: 'none'
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                            DEFAULT FROM DOMAIN / SENDER EMAIL
                          </label>
                          <input
                            type="text"
                            placeholder="onboarding@resend.dev or vance@businesscollapse.com"
                            value={resendFromDomain}
                            onChange={(e) => setResendFromDomain(e.target.value)}
                            style={{
                              width: '100%',
                              background: 'rgba(15, 23, 42, 0.9)',
                              border: '1px solid var(--border-subtle)',
                              color: '#FFF',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              fontSize: '0.85rem',
                              fontFamily: 'monospace',
                              outline: 'none'
                            }}
                          />
                          <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block', marginTop: '4px' }}>
                            Tip: Use <code>onboarding@resend.dev</code> for immediate testing without DNS setup.
                          </span>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                            TEST RECIPIENT EMAIL (YOUR REGISTERED RESEND ACCOUNT EMAIL)
                          </label>
                          <input
                            type="email"
                            placeholder="your-email@example.com"
                            value={testRecipientEmail}
                            onChange={(e) => {
                              setTestRecipientEmail(e.target.value);
                              localStorage.setItem('bcc_test_recipient_email', e.target.value.trim());
                            }}
                            style={{
                              width: '100%',
                              background: 'rgba(15, 23, 42, 0.9)',
                              border: '1px solid var(--border-subtle)',
                              color: '#FFF',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              fontSize: '0.85rem',
                              fontFamily: 'monospace',
                              outline: 'none'
                            }}
                          />
                          <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block', marginTop: '4px' }}>
                            Format: pure email (e.g. <code>myname@gmail.com</code>).
                          </span>
                        </div>

                        {apiSaveMessage && (
                          <div style={{ padding: '10px 14px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', color: '#A7F3D0', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                            {apiSaveMessage}
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => {
                              localStorage.setItem('bcc_resend_api_key', resendApiKey.trim());
                              localStorage.setItem('bcc_resend_from_domain', resendFromDomain.trim());
                              localStorage.setItem('bcc_test_recipient_email', testRecipientEmail.trim());
                              setApiSaveMessage('✓ Saved Resend API Key & Settings locally!');
                              setTimeout(() => setApiSaveMessage(''), 3500);
                            }}
                            className="btn-primary"
                            style={{ padding: '8px 18px', fontSize: '0.82rem', gap: '6px', cursor: 'pointer' }}
                          >
                            💾 Save Settings
                          </button>

                          <button
                            onClick={async () => {
                              if (!resendApiKey.trim()) {
                                setApiSaveMessage('⚠️ Please enter a Resend API Key first!');
                                return;
                              }
                              
                              // Extract clean email address
                              const rawTarget = testRecipientEmail || composerTo;
                              const emailMatch = String(rawTarget).match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
                              const cleanToEmail = emailMatch ? emailMatch[0] : String(rawTarget).trim();

                              if (!cleanToEmail || !cleanToEmail.includes('@')) {
                                setApiSaveMessage('⚠️ Please enter a valid email address (e.g. name@domain.com) in TEST RECIPIENT EMAIL!');
                                return;
                              }

                              setApiSaveMessage(`📡 Transmitting test email to ${cleanToEmail} via serverless engine...`);
                              try {
                                const response = await fetch('/.netlify/functions/send-email', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    from: resendFromDomain.trim() || 'onboarding@resend.dev',
                                    to: cleanToEmail,
                                    subject: '🧪 [TEST DISPATCH] BusinessCollapse Real-World Email Engine',
                                    text: 'Success! Your BusinessCollapse Back Office Email Engine is live and transmitting to external inboxes!',
                                    html: '<div style="font-family: Arial, sans-serif; background: #0F172A; color: #F8FAFC; padding: 24px; border-radius: 12px;"><h2 style="color: #10B981;">🚀 Live Dispatch Confirmed!</h2><p>Your BusinessCollapse Executive Back Office Mail Engine is connected and working perfectly!</p></div>',
                                    apiKey: resendApiKey.trim()
                                  })
                                });

                                const resData = await response.json();
                                if (response.ok && (resData.messageId || resData.resendData?.id)) {
                                  setApiSaveMessage(`🎉 SUCCESS! REAL EMAIL TRANSMITTED!\nMessage ID: ${resData.messageId || resData.resendData?.id}\nDelivered to: ${cleanToEmail}`);
                                } else {
                                  const errMessage = resData.error || resData.message || resData.resendData?.message || JSON.stringify(resData);
                                  setApiSaveMessage(`❌ Resend Error (${response.status}): ${errMessage}`);
                                }
                              } catch (err) {
                                setApiSaveMessage(`❌ Network / Dev Server Error: ${err.message}`);
                              }
                            }}
                            style={{ background: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38BDF8', color: '#38BDF8', padding: '8px 16px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer' }}
                          >
                            🧪 TEST LIVE TRANSMISSION
                          </button>

                          {resendApiKey && (
                            <button
                              onClick={() => {
                                localStorage.removeItem('bcc_resend_api_key');
                                localStorage.removeItem('bcc_resend_from_domain');
                                localStorage.removeItem('bcc_test_recipient_email');
                                setResendApiKey('');
                                setResendFromDomain('onboarding@resend.dev');
                                setTestRecipientEmail('');
                                setApiSaveMessage('✓ Cleared API Key & Settings.');
                                setTimeout(() => setApiSaveMessage(''), 3500);
                              }}
                              style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', color: '#EF4444', padding: '8px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
                            >
                              Clear API Key
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* REAL INBOUND EMAIL WEBHOOK SETUP */}
                    <div style={{ background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                      <h4 style={{ color: '#38BDF8', marginTop: 0 }}>📥 Real Inbound Email Webhook Endpoint</h4>
                      <p style={{ color: '#CBD5E1', fontSize: '0.85rem', lineHeight: 1.5 }}>
                        To receive <strong>REAL INBOUND EMAILS</strong> sent to <code>support@businesscollapse.com</code>, <code>info@businesscollapse.com</code>, or <code>vance@businesscollapse.com</code>:
                      </p>
                      <ol style={{ color: '#94A3B8', fontSize: '0.82rem', lineHeight: 1.6, paddingLeft: '20px' }}>
                        <li>Set your Domain MX records (Cloudflare / Namecheap) to point to Resend or Postmark.</li>
                        <li>In your Resend Webhooks dashboard, add destination URL: <br/><code>https://businesscollapse.com/.netlify/functions/inbound-email</code></li>
                        <li>Any email sent from Outlook, Gmail, or Apple Mail to your address will be ingested directly into your Back Office Mail Client!</li>
                      </ol>
                    </div>

                    <div style={{ background: '#090D16', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '20px' }}>
                      <h4 style={{ color: '#F59E0B', marginTop: 0 }}>Active Sender Mailboxes</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                        <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', borderRadius: '6px', color: '#FCA5A5' }}>
                          ⚡ <strong>vance@businesscollapse.com</strong> — Event Feed & Corporate Distress Wire
                        </div>
                        <div style={{ padding: '10px', background: 'rgba(192, 132, 252, 0.1)', border: '1px solid #C084FC', borderRadius: '6px', color: '#E9D5FF' }}>
                          🎧 <strong>support@businesscollapse.com</strong> — Customer Support & Member Services
                        </div>
                        <div style={{ padding: '10px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #F59E0B', borderRadius: '6px', color: '#FDE68A' }}>
                          ℹ️ <strong>info@businesscollapse.com</strong> — General & Media Press Inquiries
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* READING PANE */
                  selectedEmail ? (
                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      
                      {/* Email Header */}
                      <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '12px' }}>
                          <h2 style={{ color: '#F8FAFC', fontSize: '1.25rem', fontWeight: 900, margin: 0, lineHeight: 1.4 }}>
                            {selectedEmail.subject}
                          </h2>
                          <span style={{ fontSize: '0.78rem', color: '#64748B', whiteSpace: 'nowrap' }}>
                            {selectedEmail.date}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: selectedEmail.badgeColor || '#EF4444',
                              color: '#000',
                              fontWeight: 900,
                              display: 'flex',
                              alignItems: 'center',
                              justify: 'center',
                              fontSize: '0.85rem'
                            }}>
                              {selectedEmail.fromName.charAt(0)}
                            </div>
                            <div>
                              <div style={{ fontWeight: 800, color: '#F8FAFC', fontSize: '0.88rem' }}>{selectedEmail.fromName}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>To: {selectedEmail.toEmail} &lt;{selectedEmail.fromEmail}&gt;</div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => {
                                setComposerFrom(selectedEmail.toEmail || 'vance@businesscollapse.com');
                                setComposerTo(selectedEmail.fromEmail);
                                setComposerSubject(selectedEmail.subject.startsWith('RE:') ? selectedEmail.subject : `RE: ${selectedEmail.subject}`);
                                setComposerBody(`\n\n-------------------------\nOn ${selectedEmail.date}, ${selectedEmail.fromName} <${selectedEmail.fromEmail}> wrote:\n> ${selectedEmail.snippet}`);
                                setIsComposerOpen(true);
                              }}
                              style={{
                                background: 'rgba(56, 189, 248, 0.15)',
                                color: '#38BDF8',
                                border: '1px solid #38BDF8',
                                padding: '6px 14px',
                                borderRadius: '6px',
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                              }}
                            >
                              <CornerUpLeft size={14} /> ↩️ Reply
                            </button>

                            <button
                              onClick={() => {
                                setComposerFrom(selectedEmail.toEmail || 'vance@businesscollapse.com');
                                setComposerTo('');
                                setComposerSubject(selectedEmail.subject.startsWith('Fwd:') ? selectedEmail.subject : `Fwd: ${selectedEmail.subject}`);
                                setComposerBody(`\n\n---------- Forwarded message ---------\nFrom: ${selectedEmail.fromName} <${selectedEmail.fromEmail}>\nDate: ${selectedEmail.date}\nSubject: ${selectedEmail.subject}\nTo: ${selectedEmail.toEmail}\n\n${selectedEmail.snippet}`);
                                setIsComposerOpen(true);
                              }}
                              style={{
                                background: 'rgba(16, 185, 129, 0.15)',
                                color: '#A7F3D0',
                                border: '1px solid #10B981',
                                padding: '6px 14px',
                                borderRadius: '6px',
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                              }}
                            >
                              <CornerUpRight size={14} /> ↪️ Forward
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Email Body Renderer */}
                      <div 
                        style={{ flex: 1, marginBottom: '24px' }}
                        dangerouslySetInnerHTML={{ __html: selectedEmail.bodyHtml }}
                      />

                      {/* STANDARD READING PANE FOOTER ACTION BAR */}
                      <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => {
                            setComposerFrom(selectedEmail.toEmail || 'vance@businesscollapse.com');
                            setComposerTo(selectedEmail.fromEmail);
                            setComposerSubject(selectedEmail.subject.startsWith('RE:') ? selectedEmail.subject : `RE: ${selectedEmail.subject}`);
                            setComposerBody(`\n\n-------------------------\nOn ${selectedEmail.date}, ${selectedEmail.fromName} <${selectedEmail.fromEmail}> wrote:\n> ${selectedEmail.snippet}`);
                            setIsComposerOpen(true);
                          }}
                          style={{
                            background: 'rgba(56, 189, 248, 0.15)',
                            color: '#38BDF8',
                            border: '1px solid #38BDF8',
                            padding: '8px 18px',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <CornerUpLeft size={15} /> ↩️ Reply
                        </button>

                        <button
                          onClick={() => {
                            setComposerFrom(selectedEmail.toEmail || 'vance@businesscollapse.com');
                            setComposerTo('');
                            setComposerSubject(selectedEmail.subject.startsWith('Fwd:') ? selectedEmail.subject : `Fwd: ${selectedEmail.subject}`);
                            setComposerBody(`\n\n---------- Forwarded message ---------\nFrom: ${selectedEmail.fromName} <${selectedEmail.fromEmail}>\nDate: ${selectedEmail.date}\nSubject: ${selectedEmail.subject}\nTo: ${selectedEmail.toEmail}\n\n${selectedEmail.snippet}`);
                            setIsComposerOpen(true);
                          }}
                          style={{
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#A7F3D0',
                            border: '1px solid #10B981',
                            padding: '8px 18px',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <CornerUpRight size={15} /> ↪️ Forward
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                      Select an email to view content.
                    </div>
                  )
                )}

              </div>
            </>
          )}

        </div>

      </div>

      {/* RICH EMAIL COMPOSER MODAL / DRAWER */}
      {isComposerOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '750px',
            background: '#090D16',
            border: '2px solid #EF4444',
            borderRadius: '16px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.9), 0 0 30px rgba(239, 68, 68, 0.3)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '14px 20px', background: '#0F172A', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontWeight: 900, color: '#F8FAFC', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="#EF4444" /> ✏️ Back Office Mail Composer (Netlify & Resend)
              </div>
              <button onClick={() => setIsComposerOpen(false)} style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSendEmail} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* SENDER MAILBOX SELECTION DROPDOWN */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '4px' }}>SEND FROM MAILBOX ACCOUNT</label>
                <select
                  value={composerFrom}
                  onChange={(e) => setComposerFrom(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #EF4444', color: '#FFF', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 800, outline: 'none' }}
                >
                  <option value="vance@businesscollapse.com">⚡ vance@businesscollapse.com (Distress Wire)</option>
                  <option value="support@businesscollapse.com">🎧 support@businesscollapse.com (Customer Support)</option>
                  <option value="info@businesscollapse.com">ℹ️ info@businesscollapse.com (General & Media Inquiries)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '4px' }}>RECIPIENT EMAIL</label>
                <input
                  type="email"
                  required
                  value={composerTo}
                  onChange={(e) => setComposerTo(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-subtle)', color: '#FFF', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', display: 'block', marginBottom: '4px' }}>SUBJECT LINE</label>
                <input
                  type="text"
                  required
                  value={composerSubject}
                  onChange={(e) => setComposerSubject(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-subtle)', color: '#FFF', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B' }}>EMAIL BODY (MARKDOWN / HTML)</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => setComposerBody(`AP PRESS WIRE | BREAKING FINANCIAL SWEEP DESK NOVEL EVENT: 🚨 WARN LAYOFF NOTICE (220 EMPLOYEES)

WILMINGTON, DE — August 10, 2026 — Peach State Freight & Logistics (PSFL) has triggered an urgent pre-petition distress alert following the latest system sweep.`)}
                      style={{ fontSize: '0.68rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', border: '1px solid #38BDF8', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      + AP Wire Template
                    </button>
                  </div>
                </div>
                <textarea
                  rows={8}
                  required
                  value={composerBody}
                  onChange={(e) => setComposerBody(e.target.value)}
                  style={{ width: '100%', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--border-subtle)', color: '#FFF', padding: '10px', borderRadius: '8px', fontSize: '0.82rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical' }}
                />
              </div>

              {sendSuccessMessage && (
                <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', color: '#A7F3D0', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 800 }}>
                  {sendSuccessMessage}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(false)}
                  style={{ background: 'transparent', border: '1px solid var(--border-subtle)', color: '#94A3B8', padding: '8px 16px', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '0.85rem', gap: '6px', display: 'flex', alignItems: 'center' }}
                >
                  <Send size={15} /> {isSending ? 'Transmitting Via Resend...' : `📬 Send Real Email From ${composerFrom.split('@')[0]}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
