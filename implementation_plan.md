# BusinessCollapse.Com — Strategic Roadmap & Implementation Plan

## Priority Goals for Tomorrow's Session

### 1. 🔍 Comprehensive End-to-End Sign-Up & Email/SMS Dispatch Traceability Audit
- **Objective**: Trace every input, state transition, email dispatch API call (`send-email.js`), SMS route (`send-sms.js`), and login authentication check step-by-step.
- **Components**:
  - `MembershipOnboardingModal.jsx` (Password creation & credential storage)
  - `EmailConfirmationModal.jsx` (Resend email dispatch trigger & magic code verification)
  - `SignInModal.jsx` (Local storage authentication against registered users)
  - `FoundersModal.jsx` (VIP Founders Roster registry display)

---

### 2. ⚙️ AI Ingestion Scheduler & Data Refresh Engine Audit
- **Objective**: Fix automated background ingestion schedule and manual trigger in `IngestionSchedulerModal.jsx` so manual invocations instantly update live breaking news, auction items, and corporate distress records in state and local storage.
- **Components**:
  - `IngestionSchedulerModal.jsx` (Cron scheduling & manual invocation trigger)
  - `App.jsx` (`lastIngestionTime` state & data refresh handlers)
  - `distressRadarStream` / data ingestion hooks
