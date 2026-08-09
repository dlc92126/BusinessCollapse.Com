# 🤝 EXECUTIVE HANDOFF NOTE & SPRINT 3.8 ROADMAP

**To**: Successor Agent & Engineering Team  
**From**: Antigravity AI Pair Programmer  
**Project**: BusinessCollapse.Com — Institutional Distress Intelligence Terminal  
**Current Version**: `v3.7` (Production Verified & Pushed to GitHub)  
**Target Version**: `v3.8` (Sprint Blueprint Approved)  

---

## 📌 1. Current Codebase State & Repository Information

- **GitHub Repository**: [https://github.com/dlc92126/BusinessCollapse.Com](https://github.com/dlc92126/BusinessCollapse.Com) (`main` branch)
- **Local Workspace**: `c:\Users\dlc92\Projects\BusinessCollapse.Com`
- **Build Health**: Production build (`npm run build`) compiles cleanly in **4.12s** with 0 errors.
- **Icon Import Audit**: `node scripts/audit_imports.js` verified 100% clean icon imports across all components.
- **Local Dev Server**: Running on `http://localhost:3000`.

---

## 🏛️ 2. Established Product Rules & Architecture

1. **🔥 Multi-Feed Navigation**:
   - **`🔥 LIVE DISTRESS WIRE`**: Primary homepage feed for breaking 14-day Chapter 11 dockets, WARN leaks, and 363 auctions.
   - **`🪦 CORPORATE GRAVEYARD`**: Dedicated post-mortem archive for closed cases, final discharge decrees, and historical case studies.
   - **`⚖️ Ongoing Cases (> 3 Months)`**: Sub-filter pill inside Live Wire for active dockets under court supervision for 3+ months.

2. **🙈 1-Click Feed Dismiss & Account Muted Registry**:
   - `🙈 Dismiss` button renders under `🔗 Share` on every card with expanded `28px` spacing.
   - Dismissed entity IDs persist in `localStorage.setItem('bc_dismissed_companies')`.
   - Managed via the **`🚫 Muted Assets Registry`** tab in [`UserAccountSettingsModal.jsx`](file:///c:/Users/dlc92/Projects/BusinessCollapse.Com/src/components/UserAccountSettingsModal.jsx) with 1-click `↺ Restore` buttons.

3. **⭐ Watchlist Star Immunity**:
   - Any entity bookmarked with a Gold Star (`⭐`) **overrides all time cutoffs** (14-day feed cutoff and 90-day heatmap decay), staying permanently tracked in the user's Watchlist.

4. **🎨 Card Geometry**:
   - **`⚡ Material Change`** and **`System Refresh Verified`** badges are right-justified alongside Valuation Drop and action buttons, reducing card height by 2 rows.

5. **🔐 Serverless Functions Suite**:
   - `netlify/functions/send-email.js` (Resend API email dispatch with simulation fallback).
   - `netlify/functions/send-sms.js` (Twilio REST API SMS dispatch with simulation fallback).
   - Documented in [`signup_and_alerts_traceability_audit.md`](file:///c:/Users/dlc92/Projects/BusinessCollapse.Com/signup_and_alerts_traceability_audit.md).

---

## 🎯 3. Approved Sprint 3.8 Implementation Blueprint

### Feature 1: Interactive Creditor Recovery Waterfall Simulator
- **Component**: [`src/components/RecoveryWaterfallModal.jsx`](file:///c:/Users/dlc92/Projects/BusinessCollapse.Com/src/components/RecoveryWaterfallModal.jsx) `[NEW]`
- **Functionality**:
  - Asset liquidation proceeds slider ($0M to $5,000M).
  - Absolute Priority Rule (APR) payout tiers:
    1. DIP Credit Facility (100% Super-priority)
    2. 1st Lien Senior Secured Notes
    3. 2nd Lien / Mezzanine Debt
    4. General Unsecured Claims (GUCs) & Trade Debt
    5. Subordinated Notes & Preferred Equity
    6. Common Equity
  - Calculates cents-on-the-dollar recovery ($/$), cash shortfall gap, and tranche impairment warnings.
  - JSON & CSV export handler.
  - Scenario persistence under `localStorage.setItem('bc_waterfall_scenarios')`.
- **Trigger**: Add **`🌊 Launch Creditor Recovery Waterfall Simulator`** button in [`CapitalStackVisualizer.jsx`](file:///c:/Users/dlc92/Projects/BusinessCollapse.Com/src/components/CapitalStackVisualizer.jsx) and [`CompanyDetailModal.jsx`](file:///c:/Users/dlc92/Projects/BusinessCollapse.Com/src/components/CompanyDetailModal.jsx).

### Feature 2: Restructuring Diligence Brief & PDF Generator
- **Component**: [`src/components/DiligenceBriefModal.jsx`](file:///c:/Users/dlc92/Projects/BusinessCollapse.Com/src/components/DiligenceBriefModal.jsx) `[MODIFY]`
- **Functionality**:
  - Add native `@media print` CSS stylesheet for single/multi-page white-paper PDF downloads.
  - SHA-256 verification watermark badge, advisor roster (Debtor Counsel, UCC, Financial Advisors), capital stack impairment, and explicit Watchlist (`⭐`) / Custom Tracked (`🔒`) metadata badges.

### Feature 3: External Webhook Ingestion Gateway
- **Component**: `netlify/functions/webhook-ingest.js` `[NEW]` & [`src/components/IngestionSchedulerModal.jsx`](file:///c:/Users/dlc92/Projects/BusinessCollapse.Com/src/components/IngestionSchedulerModal.jsx) `[MODIFY]`
- **Functionality**:
  - Serverless endpoint `POST /.netlify/functions/webhook-ingest` with `x-bcc-webhook-secret` authorization header.
  - Ingested dockets automatically format `formattedMaterialChange` timestamp and float to the top of `🔥 LIVE DISTRESS WIRE` (`hoursAgo <= 12`).
  - Add Webhook Ingestion Gateway management tab in `IngestionSchedulerModal.jsx` with endpoint URL copy box & secret API key token generator.

---

## 🧪 4. Successor Action Plan

1. Pull latest code from GitHub: `git pull origin main`.
2. Implement `RecoveryWaterfallModal.jsx` and connect triggers in `App.jsx` and `CapitalStackVisualizer.jsx`.
3. Add `@media print` stylesheet to `DiligenceBriefModal.jsx`.
4. Create `netlify/functions/webhook-ingest.js` and add webhook controls to `IngestionSchedulerModal.jsx`.
5. Run `node scripts/audit_imports.js` and `npm run build` to verify 0 compilation errors.
6. Commit and push to GitHub!

---

*Handoff artifact generated on August 9, 2026 for BusinessCollapse.Com Institutional Terminal.*
