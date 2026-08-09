import json

companies_list = [
  # -------------------------------------------------------------
  # 1. AVIATION & AEROSPACE (sectorId: "aviation")
  # -------------------------------------------------------------
  {
    "id": "spirit-airlines",
    "name": "Spirit Airlines",
    "ticker": "SAVE",
    "sectorId": "aviation",
    "sectorName": "Aviation & Aerospace",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 BANKRUPT",
    "distressScore": 99,
    "peakValuation": "$1.15 Billion",
    "collapseValuation": "$450 Million Credit Bid",
    "debtAtCollapse": "$1.10 Billion",
    "yearFounded": 1980,
    "yearCollapsed": 2024,
    "dateTimestamp": "2024-11-18",
    "locationJurisdiction": "Newark, NJ (D. N.J.)",
    "ceoAtFailure": "Ted Christie",
    "primaryCause": "Blocked JetBlue Merger & Unviable Low-Cost Carrier Economics",
    "claimsAgent": "Epiq Corporate Restructuring",
    "claimsAgentUrl": "https://dm.epiq11.com/case/spirit/info",
    "sourceType": "SEC_EDGAR_FILING",
    "sourceName": "U.S. Bankruptcy Court D. N.J. Form 8-K",
    "summary": "Spirit Airlines filed for Chapter 11 bankruptcy protection following years of mounting losses, failed JetBlue merger, engine recall groundings, and unsustainable aircraft lease obligations.",
    "earlyWarningSignals": [
      "DOJ Antitrust ruling blocking JetBlue acquisition in Jan 2024",
      "Pratt & Whitney GTF engine recalls grounding 25%+ of Airbus fleet",
      "2025/2026 senior secured note maturity wall ($1.1B)",
      "Uncompetitive ultra-low-cost carrier (ULCC) domestic pricing margins"
    ],
    "anatomyBreakdown": {
      "structural": "Ultra-low-cost carrier business model reliant on unbundled ancillary fees and high aircraft utilization.",
      "financial": "$1.1B in convertible notes due Sept 2025; cumulative net losses of $2.2B since 2020.",
      "market": "Legacy carriers matched ultra-low fares with basic economy tiers while capturing premium traffic.",
      "regulatory": "Federal antitrust court blocked the $3.8B JetBlue buyout deal, destroying Spirit's exit strategy."
    },
    "timeline": [
      { "date": "Jan 2024", "event": "U.S. District Court blocks JetBlue merger on antitrust grounds." },
      { "date": "Mar 2024", "event": "JetBlue terminates merger agreement; Spirit retains $69M fee." },
      { "date": "Aug 2024", "event": "Pratt & Whitney engine recalls ground 26 Airbus A320neo jets." },
      { "date": "Nov 18, 2024", "event": "Files prearranged Chapter 11 bankruptcy in District of New Jersey." }
    ],
    "keyTakeaways": [
      "ULCC models face severe margin compression when network carriers introduce Basic Economy.",
      "Regulatory antitrust opposition can kill liquidity exit lifelines for distressed airlines.",
      "Geopolitical & engine supplier recalls compound debt service vulnerabilities."
    ]
  },
  {
    "id": "virgin-orbit",
    "name": "Virgin Orbit Holdings",
    "ticker": "VORBQ",
    "sectorId": "aviation",
    "sectorName": "Aviation & Aerospace",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 LIQUIDATED",
    "distressScore": 96,
    "peakValuation": "$3.80 Billion",
    "collapseValuation": "$36 Million Asset Sales",
    "debtAtCollapse": "$380 Million",
    "yearFounded": 2017,
    "yearCollapsed": 2023,
    "dateTimestamp": "2023-04-04",
    "locationJurisdiction": "Wilmington, DE (D. Del.)",
    "ceoAtFailure": "Dan Hart",
    "primaryCause": "Failed Cornwall Rocket Launch & Capital Burn Out",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/virginorbit",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court D. Del. Case #23-10433",
    "summary": "Richard Branson's air-launched satellite rocket startup collapsed into Chapter 11 after a high-profile U.K. launch failure drained cash reserves.",
    "earlyWarningSignals": [
      "January 2023 LauncherOne rocket anomaly failing to reach orbit",
      "High cash burn exceeding $50M per quarter with zero commercial scale",
      "Failed emergency equity financing negotiations with Matthew Brown"
    ],
    "anatomyBreakdown": {
      "structural": "Air-launched rocket system using modified Boeing 747 ('Cosmic Girl') faced high operational complexity.",
      "financial": "Depleted $1B+ in investor capital with negative gross margins on satellite payloads.",
      "market": "SpaceX Falcon 9 rideshare pricing undercut air-launched smallsat unit economics by 60%+.",
      "regulatory": "Complex U.K. Civil Aviation Authority launch licensing delays."
    },
    "timeline": [
      { "date": "Jan 2023", "event": "UK mission fails due to fuel filter anomaly; rocket payload lost." },
      { "date": "Mar 2023", "event": "Ceases operations and furloughs 85% of workforce." },
      { "date": "Apr 4, 2023", "event": "Files Chapter 11 bankruptcy in Delaware court; assets sold to Rocket Lab & Stratolaunch." }
    ],
    "keyTakeaways": [
      "Capital-intensive hardware startups cannot survive single-point launch failures without deep reserves.",
      "Reusable heavy-lift launchers make air-launched smallsat systems economically unviable."
    ]
  },

  # -------------------------------------------------------------
  # 2. COMMERCIAL REAL ESTATE (sectorId: "cre")
  # -------------------------------------------------------------
  {
    "id": "wework",
    "name": "WeWork Inc.",
    "ticker": "WE",
    "sectorId": "cre",
    "sectorName": "Commercial Real Estate",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 REORGANIZED",
    "distressScore": 99,
    "peakValuation": "$47.00 Billion",
    "collapseValuation": "$450 Million Reorg Equity",
    "debtAtCollapse": "$18.60 Billion",
    "yearFounded": 2010,
    "yearCollapsed": 2023,
    "dateTimestamp": "2023-11-06",
    "locationJurisdiction": "New York, NY (SDNY)",
    "ceoAtFailure": "David Tolley",
    "primaryCause": "Long-Term Commercial Lease Obligations vs. Short-Term Desk Revenue",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/wework",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court SDNY Case #23-10982",
    "summary": "Flexible workspace pioneer filed Chapter 11 to cancel over $8B in toxic commercial office leases after remote work permanently impaired commercial office demand.",
    "earlyWarningSignals": [
      "2019 aborted IPO revealing corporate governance abuses & related-party transactions",
      "Over $3B in annual fixed lease commitments vs declining office occupancy",
      "SoftBank multi-billion dollar bailouts failing to achieve profitability"
    ],
    "anatomyBreakdown": {
      "structural": "Asset-light brand wrapped over 15-to-20 year non-cancelable commercial real estate lease liabilities.",
      "financial": "$18.6B in total lease liabilities with interest coverage ratios below 0.4x.",
      "market": "Post-COVID hybrid work models permanently lowered central business district office desk demand.",
      "regulatory": "SEC investigations into S-1 disclosure accuracy and founder loan transactions."
    },
    "timeline": [
      { "date": "Aug 2019", "event": "Files notorious S-1 draft; IPO pulled amidst investor backlash." },
      { "date": "Oct 2021", "event": "Goes public via SPAC merger at $9B valuation." },
      { "date": "Nov 6, 2023", "event": "Files Chapter 11 bankruptcy in SDNY to reject 160+ office leases." },
      { "date": "May 2024", "event": "Emerges from Chapter 11 having cut $12B in future lease liabilities." }
    ],
    "keyTakeaways": [
      "Mismatched duration arbitrage (long leases vs. short sub-leases) is catastrophic in CRE downcycles.",
      "High valuation tech multiples applied to low-margin real estate businesses invite insolvency."
    ]
  },
  {
    "id": "china-evergrande",
    "name": "China Evergrande Group",
    "ticker": "3333.HK",
    "sectorId": "cre",
    "sectorName": "Commercial Real Estate",
    "status": "LIQUIDATING",
    "statusBadge": "COURT ORDERED LIQUIDATION",
    "distressScore": 100,
    "peakValuation": "$50.00 Billion",
    "collapseValuation": "Defunct / $0.00",
    "debtAtCollapse": "$300.00 Billion",
    "yearFounded": 1996,
    "yearCollapsed": 2024,
    "dateTimestamp": "2024-01-29",
    "locationJurisdiction": "Hong Kong High Court",
    "ceoAtFailure": "Hui Ka Yan",
    "primaryCause": "Three Red Lines Leverage Caps & Unfinished Apartment Debt Crisis",
    "claimsAgent": "Alvarez & Marsal Asia",
    "claimsAgentUrl": "https://www.evergrande.com/en/",
    "sourceType": "REGULATORY_RELEASE",
    "sourceName": "Hong Kong High Court Liquidation Order HCCW 220/2021",
    "summary": "The world's most indebted property developer was ordered into liquidation by a Hong Kong court with over $300B in unpaid debt obligations.",
    "earlyWarningSignals": [
      "Beijing 'Three Red Lines' debt restriction policy enacted in 2020",
      "Offshore US dollar bond coupon defaults in December 2021",
      "Suspension of construction across hundreds of residential tower developments"
    ],
    "anatomyBreakdown": {
      "structural": "Pre-sale residential model financed by wealth management products and commercial paper.",
      "financial": "$300B total liabilities representing ~2% of China's total gross domestic product.",
      "market": "China residential real estate sales volume plunged 35%+ amidst loss of buyer confidence.",
      "regulatory": "Founder Hui Ka Yan detained under mandatory surveillance for suspected illegal crimes."
    },
    "timeline": [
      { "date": "Aug 2020", "event": "PBOC enforces 'Three Red Lines' restricting Evergrande's borrowing." },
      { "date": "Dec 2021", "event": "Fitch downgrades Evergrande to 'Restricted Default' on offshore bonds." },
      { "date": "Jan 29, 2024", "event": "Hong Kong High Court issues formal liquidation order." }
    ],
    "keyTakeaways": [
      "Real estate mega-developers built on speculative leverage cannot survive state debt-tightening mandates.",
      "Offshore dollar bondholders face near-total losses in Chinese property liquidations."
    ]
  },

  # -------------------------------------------------------------
  # 3. LEGACY BRICK & MORTAR RETAIL (sectorId: "legacy-retail")
  # -------------------------------------------------------------
  {
    "id": "tupperware-brands",
    "name": "Tupperware Brands Corp",
    "ticker": "TUPQ",
    "sectorId": "legacy-retail",
    "sectorName": "Legacy Brick & Mortar Retail",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 AUCTION",
    "distressScore": 97,
    "peakValuation": "$1.20 Billion",
    "collapseValuation": "$23.5M Debt Sale Floor",
    "debtAtCollapse": "$812.00 Million",
    "yearFounded": 1946,
    "yearCollapsed": 2024,
    "dateTimestamp": "2024-09-17",
    "locationJurisdiction": "Wilmington, DE (D. Del.)",
    "ceoAtFailure": "Laurie Ann Goldman",
    "primaryCause": "Direct-Sales MLM Channel Breakdown & Resin Raw Material Cost Spikes",
    "claimsAgent": "Epiq Corporate Restructuring",
    "claimsAgentUrl": "https://dm.epiq11.com/case/tupperware/info",
    "sourceType": "SEC_EDGAR_FILING",
    "sourceName": "U.S. Bankruptcy Court D. Del. Form 10-K / Chapter 11 Petition",
    "summary": "78-year-old iconic food storage brand filed Chapter 11 following severe revenue declines, debt defaults, and an obsolete direct-sales multi-level marketing model.",
    "earlyWarningSignals": [
      "Going-concern warning issued in April 2023 SEC filings",
      "Failure to file audited 10-K annual reports on time",
      "Over $700M in term loan maturities defaulted in 2024"
    ],
    "anatomyBreakdown": {
      "structural": "Reliance on independent direct-sales consultants in an era of digital e-commerce & Target/Amazon distribution.",
      "financial": "$812M in total debt against declining cash flow; interest expenses exceeded operating income.",
      "market": "Low-cost plastic food container competition from Rubbermaid, Systema, and Amazon Basics.",
      "regulatory": "Delayed SEC accounting disclosures due to internal financial control material weaknesses."
    },
    "timeline": [
      { "date": "Apr 2023", "event": "Issues going-concern warning and hires Moelis & Co for restructuring." },
      { "date": "Aug 2023", "event": "Restructures debt but fails to turn around retail store sales." },
      { "date": "Sep 17, 2024", "event": "Files Chapter 11 bankruptcy in Delaware; agrees to sell brand IP to lender group." }
    ],
    "keyTakeaways": [
      "Iconic brand heritage cannot overcome obsolete direct-sales distribution models.",
      "Failure to maintain financial reporting controls accelerates lender debt default triggers."
    ]
  },
  {
    "id": "bed-bath-beyond",
    "name": "Bed Bath & Beyond",
    "ticker": "BBBYQ",
    "sectorId": "legacy-retail",
    "sectorName": "Legacy Brick & Mortar Retail",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 LIQUIDATED",
    "distressScore": 99,
    "peakValuation": "$17.00 Billion",
    "collapseValuation": "$21.5 Million IP Sale",
    "debtAtCollapse": "$5.20 Billion",
    "yearFounded": 1971,
    "yearCollapsed": 2023,
    "dateTimestamp": "2023-04-23",
    "locationJurisdiction": "Newark, NJ (D. N.J.)",
    "ceoAtFailure": "Sue Gove",
    "primaryCause": "Disastrous Private Label Pivot & Supplier Credit Cutoffs",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/bbby",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court D. N.J. Case #23-13359",
    "summary": "Home goods retail giant collapsed after CEO Mark Tritton replaced popular national brands with failed private-label products, driving away loyal customers and triggering supplier credit cutoffs.",
    "earlyWarningSignals": [
      "Removal of national brands (Calphalon, Oxo) in favor of private-label lines",
      "Supplier credit insurance cutoffs causing empty store shelves in 2022",
      "Failed emergency equity offerings with Hudson Bay Capital"
    ],
    "anatomyBreakdown": {
      "structural": "Massive 1,000+ store footprint with high fixed lease costs and bloated inventory.",
      "financial": "$5.2B total debt; $1.5B annual cash burn in final 24 months.",
      "market": "Loss of coupon-loving suburban customer base to Target, Amazon, and HomeGoods.",
      "regulatory": "SEC scrutiny over emergency meme-stock equity dilution schemes."
    },
    "timeline": [
      { "date": "Nov 2021", "event": "Announces private label strategy; sales drop 28% quarter-over-quarter." },
      { "date": "Jan 2023", "event": "Receives default notice from JPMorgan Chase on credit facility." },
      { "date": "Apr 23, 2023", "event": "Files Chapter 11 bankruptcy; liquidates all 360 stores." }
    ],
    "keyTakeaways": [
      "Abruptly gutting national brand inventory in retail destroys core customer retention.",
      "When suppliers demand Cash-In-Advance (CIA), retail bankruptcy is imminent within 90 days."
    ]
  },
  {
    "id": "big-lots",
    "name": "Big Lots, Inc.",
    "ticker": "BIG",
    "sectorId": "legacy-retail",
    "sectorName": "Legacy Brick & Mortar Retail",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 SALE",
    "distressScore": 95,
    "peakValuation": "$2.10 Billion",
    "collapseValuation": "$707 Million Debt Stalking Horse",
    "debtAtCollapse": "$707.00 Million",
    "yearFounded": 1967,
    "yearCollapsed": 2024,
    "dateTimestamp": "2024-09-09",
    "locationJurisdiction": "Wilmington, DE (D. Del.)",
    "ceoAtFailure": "Bruce Thorn",
    "primaryCause": "Inflation Discretionary Spend Freeze & Furniture Inventory Drag",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/biglots",
    "sourceType": "SEC_EDGAR_FILING",
    "sourceName": "U.S. Bankruptcy Court D. Del. Case #24-11967",
    "summary": "Discount home decor retailer entered Chapter 11 to sell operations to private equity firm Nexus Capital after high inflation eroded lower-income consumer spending.",
    "earlyWarningSignals": [
      "Quarterly same-store sales declines exceeding 10% throughout 2023-2024",
      "Going-concern warning added to Q1 2024 SEC Form 10-Q",
      "Closure of 300+ store locations prior to bankruptcy petition"
    ],
    "anatomyBreakdown": {
      "structural": "1,400 store discount footprint heavily exposed to big-ticket patio & indoor furniture.",
      "financial": "$707M in long-term debt and lease commitments with negative operating cash flow.",
      "market": "Inflation squeezed lower-middle income core demographic, curtailing discretionary purchases.",
      "regulatory": "Delaware bankruptcy filing under Section 363 asset sale framework."
    },
    "timeline": [
      { "date": "Jun 2024", "event": "Reports $205M net loss in Q1 2024; flags going concern doubt." },
      { "date": "Aug 2024", "event": "Amends credit facility to gain emergency liquidity." },
      { "date": "Sep 9, 2024", "event": "Files Chapter 11 in Delaware with Nexus Capital as stalking-horse bidder." }
    ],
    "keyTakeaways": [
      "Discount retailers reliant on discretionary furniture items suffer severe demand contraction during high inflation.",
      "Sale-leaseback transactions leave retailers vulnerable to soaring fixed rent costs."
    ]
  },

  # -------------------------------------------------------------
  # 4. REGIONAL BANKING (sectorId: "regional-banking")
  # -------------------------------------------------------------
  {
    "id": "silicon-valley-bank",
    "name": "Silicon Valley Bank",
    "ticker": "SIVBQ",
    "sectorId": "regional-banking",
    "sectorName": "Regional Banking & CRE Lenders",
    "status": "CHAPTER_11",
    "statusBadge": "FDIC RECEIVERSHIP / CH. 11",
    "distressScore": 100,
    "peakValuation": "$44.00 Billion",
    "collapseValuation": "Acquired by First Citizens",
    "debtAtCollapse": "$209.00 Billion Assets",
    "yearFounded": 1983,
    "yearCollapsed": 2023,
    "dateTimestamp": "2023-03-10",
    "locationJurisdiction": "New York, NY (SDNY)",
    "ceoAtFailure": "Greg Becker",
    "primaryCause": "Unrealized HTM Bond Losses & Uninsured Deposit Bank Run",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/svb",
    "sourceType": "REGULATORY_RELEASE",
    "sourceName": "California DFPI & FDIC Receivership Order",
    "summary": "16th largest U.S. bank collapsed in 48 hours after liquidating a $21B bond portfolio at a $1.8B loss, sparking a $42B digital bank run by venture capital depositors.",
    "earlyWarningSignals": [
      "90%+ of total bank deposits exceeded the $250k FDIC insurance limit",
      "Heavy allocation of influx tech deposits into long-duration 10-year Treasury bonds",
      "Federal Reserve aggressive rate hikes causing $15B+ in unhedged mark-to-market bond losses"
    ],
    "anatomyBreakdown": {
      "structural": "Concentrated startup VC deposit base interconnected via Twitter/X and WhatsApp group chats.",
      "financial": "$209B in assets; $1.8B net loss realized on emergency bond portfolio sale.",
      "market": "Sudden panic led to $42B in deposit withdrawal requests in a single day (March 9).",
      "regulatory": "FDIC invoked Systemic Risk Exception to guarantee all uninsured deposits."
    },
    "timeline": [
      { "date": "Mar 8, 2023", "event": "Announces $1.8B loss on bond sale; seeks $2.25B emergency capital raise." },
      { "date": "Mar 9, 2023", "event": "VC founders advise portfolio companies to pull cash; $42B withdrawn." },
      { "date": "Mar 10, 2023", "event": "California regulator shuts down SVB; FDIC appointed receiver." }
    ],
    "keyTakeaways": [
      "Digital banking and mobile apps enable historic $40B+ bank runs in under 24 hours.",
      "Unhedged interest rate duration risk on fixed-rate bonds can instantly destroy bank equity."
    ]
  },
  {
    "id": "first-republic-bank",
    "name": "First Republic Bank",
    "ticker": "FRCB",
    "sectorId": "regional-banking",
    "sectorName": "Regional Banking & CRE Lenders",
    "status": "CHAPTER_7",
    "statusBadge": "FDIC TAKEOVER",
    "distressScore": 99,
    "peakValuation": "$40.00 Billion",
    "collapseValuation": "Acquired by JPMorgan Chase",
    "debtAtCollapse": "$229.00 Billion Assets",
    "yearFounded": 1985,
    "yearCollapsed": 2023,
    "dateTimestamp": "2023-05-01",
    "locationJurisdiction": "San Francisco, CA (FDIC)",
    "ceoAtFailure": "Michael Roffler",
    "primaryCause": "Low-Yield Jumbo Mortgage Book & $100B Deposit Flight",
    "claimsAgent": "FDIC Receivership Desk",
    "claimsAgentUrl": "https://www.fdic.gov/resources/resolutions/bank-failures/failed-bank-list/firstrepublic.html",
    "sourceType": "REGULATORY_RELEASE",
    "sourceName": "FDIC Press Release PR-34-2023",
    "summary": "Wealthy client lender seized by regulators after losing $100B in deposits following SVB's collapse, leaving it burdened with low-yielding jumbo mortgages.",
    "earlyWarningSignals": [
      "$100B+ deposit flight revealed in Q1 2023 earnings report",
      "Massive portfolio of 30-year jumbo mortgages locked in at 2.75% interest rates",
      "Heavy reliance on $30B short-term rescue deposits from major Wall Street banks"
    ],
    "anatomyBreakdown": {
      "structural": "Focus on high-net-worth individuals offering ultra-low rate jumbo mortgages to win wealth deposits.",
      "financial": "$229B in total assets; asset yield lagged soaring Fed funds borrowing costs by 400+ bps.",
      "market": "Loss of depositor confidence post-SVB triggered continuous, unstoppable withdrawals.",
      "regulatory": "FDIC conducted emergency weekend auction; sold deposits & assets to JPMorgan Chase."
    },
    "timeline": [
      { "date": "Mar 16, 2023", "event": "Consortium of 11 US banks injects $30B uninsured deposits to bolster liquidity." },
      { "date": "Apr 24, 2023", "event": "Reveals $100B deposit drain in Q1 results; stock plummets 50%." },
      { "date": "May 1, 2023", "event": "FDIC seizes bank and sells substantially all assets to JPMorgan Chase." }
    ],
    "keyTakeaways": [
      "Low-yielding long-term mortgages become toxic assets when central banks rapidly raise rates.",
      "Uninsured rescue deposits only buy temporary time if core depositor panic persists."
    ]
  },

  # -------------------------------------------------------------
  # 5. CASUAL DINING & FRANCHISES (sectorId: "casual-dining")
  # -------------------------------------------------------------
  {
    "id": "red-lobster",
    "name": "Red Lobster Management",
    "ticker": "PRIVATE",
    "sectorId": "casual-dining",
    "sectorName": "Casual Dining & Franchises",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 REORGANIZED",
    "distressScore": 96,
    "peakValuation": "$2.10 Billion",
    "collapseValuation": "Fortress Investment Debt Reorg",
    "debtAtCollapse": "$1.00 Billion",
    "yearFounded": 1968,
    "yearCollapsed": 2024,
    "dateTimestamp": "2024-05-19",
    "locationJurisdiction": "Orlando, FL (M.D. Fla.)",
    "ceoAtFailure": "Jonathan Tibus",
    "primaryCause": "Endless Shrimp Promotion Losses & Sale-Leaseback Rent Traps",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/redlobster",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court M.D. Fla. Case #24-02486",
    "summary": "56-year-old seafood chain entered Chapter 11 after a permanent $20 'Ultimate Endless Shrimp' promotion generated $11M in operating losses alongside crippling rent costs.",
    "earlyWarningSignals": [
      "Golden Gate Capital sale-leaseback transaction stripping company of real estate assets",
      "Thai Union Group $20 Endless Shrimp promotion decision causing severe supply chain losses",
      "Rejection of 100+ unprofitable restaurant leases in early 2024"
    ],
    "anatomyBreakdown": {
      "structural": "Stripped of real estate via private equity sale-leaseback; forced to pay above-market rent.",
      "financial": "$1B debt burden with cumulative annual operating losses exceeding $76M.",
      "market": "Casual dining foot traffic declined 15% post-COVID as consumers shifted to fast-casual.",
      "regulatory": "Conflict-of-interest allegations regarding owner Thai Union's exclusive shrimp supply contract."
    },
    "timeline": [
      { "date": "Jun 2023", "event": "Makes $20 Endless Shrimp a permanent menu item; loses $11M in Q3." },
      { "date": "Jan 2024", "event": "Thai Union announces plan to exit investment and write off $530M." },
      { "date": "May 19, 2024", "event": "Files Chapter 11 bankruptcy; court approves sale to Fortress Investment Group." }
    ],
    "keyTakeaways": [
      "Selling underlying real estate via sale-leaseback removes a chain's core downside protection.",
      "Unhedged loss-leader promotions in inflationary environments can instantly break operating income."
    ]
  },
  {
    "id": "tgi-fridays",
    "name": "TGI Fridays Inc.",
    "ticker": "PRIVATE",
    "sectorId": "casual-dining",
    "sectorName": "Casual Dining & Franchises",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 REORGANIZING",
    "distressScore": 94,
    "peakValuation": "$850.00 Million",
    "collapseValuation": "Restructuring Securitized Debt",
    "debtAtCollapse": "$370.00 Million",
    "yearFounded": 1965,
    "yearCollapsed": 2024,
    "dateTimestamp": "2024-11-02",
    "locationJurisdiction": "Dallas, TX (N.D. Tex.)",
    "ceoAtFailure": "Rohit Manocha",
    "primaryCause": "Securitized Debt Default & Casual Dining Traffic Decline",
    "claimsAgent": "Epiq Corporate Restructuring",
    "claimsAgentUrl": "https://dm.epiq11.com/case/tgifridays/info",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court N.D. Tex. Case #24-80006",
    "summary": "Iconic American casual bar and grill chain filed for Chapter 11 protection after losing control of its asset-backed debt securitization manager.",
    "earlyWarningSignals": [
      "Closure of 50+ underperforming corporate store locations in early 2024",
      "Termination of U.K. master franchise licensee amidst financial distress",
      "Manager termination event under Whole-Business Securitization (WBS) debt facility"
    ],
    "anatomyBreakdown": {
      "structural": "Asset-light franchise model burdened by complex Whole-Business Securitization debt structures.",
      "financial": "$370M in debt obligations; quarterly cash flow failed to cover debt service ratios.",
      "market": "Younger consumers shifted to fast-casual alternatives like Chipotle and Cava.",
      "regulatory": "Chapter 11 protection covers 39 corporate stores while independent franchisees operate normally."
    },
    "timeline": [
      { "date": "Jan 2024", "event": "Closes 36 corporate restaurants in U.S. restructuring effort." },
      { "date": "Sep 2024", "event": "Defaults on Whole-Business Securitization debt manager covenants." },
      { "date": "Nov 2, 2024", "event": "Files Chapter 11 bankruptcy in Dallas, Texas." }
    ],
    "keyTakeaways": [
      "Complex Whole-Business Securitization (WBS) structures limit management operational flexibility during downturns.",
      "Legacy casual dining concepts face severe structural headwinds against modern fast-casual chains."
    ]
  },

  # -------------------------------------------------------------
  # 6. TRADITIONAL LINEAR MEDIA (sectorId: "linear-media")
  # -------------------------------------------------------------
  {
    "id": "diamond-sports-group",
    "name": "Diamond Sports Group (Bally Sports)",
    "ticker": "PRIVATE",
    "sectorId": "linear-media",
    "sectorName": "Traditional Linear Media & Cable",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 REORGANIZED",
    "distressScore": 98,
    "peakValuation": "$10.60 Billion",
    "collapseValuation": "$450 Million Amazon Reorg",
    "debtAtCollapse": "$8.60 Billion",
    "yearFounded": 2019,
    "yearCollapsed": 2023,
    "dateTimestamp": "2023-03-14",
    "locationJurisdiction": "Houston, TX (S.D. Tex.)",
    "ceoAtFailure": "David Preschlack",
    "primaryCause": "Cable Cord-Cutting & Outsized Sinclair LBO Debt",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/diamondsports",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court S.D. Tex. Case #23-90116",
    "summary": "Largest Regional Sports Network (RSN) operator in the U.S. filed Chapter 11 to cut $8B in debt incurred during Sinclair's leveraged buyout from Disney.",
    "earlyWarningSignals": [
      "Accelerating cable TV subscriber cord-cutting reducing affiliate fee revenues by 10%+ annually",
      "Over $8B in LBO debt obligations with $1B annual interest expense",
      "MLB, NBA, and NHL team broadcast rights payments exceeding linear television carriage revenue"
    ],
    "anatomyBreakdown": {
      "structural": "Regional Sports Network operator reliant on legacy pay-TV bundle subscriber fees.",
      "financial": "$8.6B debt stack; unviable team rights fee contracts ($2B+ annual obligations).",
      "market": "Direct-to-consumer streaming services bypass regional cable bundles.",
      "regulatory": "Bankruptcy court authorized rejection of unprofitable MLB broadcast rights contracts."
    },
    "timeline": [
      { "date": "Aug 2019", "event": "Sinclair Broadcast Group acquires Fox RSNs for $10.6B via leverage." },
      { "date": "Feb 2023", "event": "Skips $140M interest payment on senior notes." },
      { "date": "Mar 14, 2023", "event": "Files Chapter 11; reaches reorg deal with Amazon Prime Video in 2024." }
    ],
    "keyTakeaways": [
      "Leveraged buyouts executed right before major consumer distribution shifts invite instant restructuring.",
      "Linear sports broadcast economics are fundamentally broken without guaranteed cable bundle fees."
    ]
  },
  {
    "id": "vice-media",
    "name": "Vice Media Group",
    "ticker": "PRIVATE",
    "sectorId": "linear-media",
    "sectorName": "Traditional Linear Media & Cable",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 SOLD",
    "distressScore": 97,
    "peakValuation": "$5.70 Billion",
    "collapseValuation": "$350 Million Lender Credit Bid",
    "debtAtCollapse": "$834.00 Million",
    "yearFounded": 1994,
    "yearCollapsed": 2023,
    "dateTimestamp": "2023-05-15",
    "locationJurisdiction": "New York, NY (SDNY)",
    "ceoAtFailure": "Bruce Dixon & Hrossi Hrossi",
    "primaryCause": "Digital Advertising Market Shift to Meta/Google & Excessive Capital Burn",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/vicemedia",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court SDNY Case #23-10738",
    "summary": "Digital media darling once valued at $5.7B filed Chapter 11 and was sold to its senior lenders (Fortress & Soros) for $350M.",
    "earlyWarningSignals": [
      "Missed revenue targets by $100M+ in 2022",
      "Cancellation of flagship 'Vice News Tonight' linear broadcast",
      "Failure to find a buyer at valuation above $1B in late 2022"
    ],
    "anatomyBreakdown": {
      "structural": "High-cost video production model reliant on digital ad networks and platform licensing deals.",
      "financial": "$834M total debt stack; negative free cash flow exceeding $80M annually.",
      "market": "Meta, Google, and TikTok captured 70%+ of total digital advertising growth.",
      "regulatory": "Chapter 11 Section 363 credit bid sale to Fortress Investment Group."
    },
    "timeline": [
      { "date": "Sep 2017", "event": "TPG invests $450M, valuing Vice Media at peak $5.7B valuation." },
      { "date": "Apr 2023", "event": "Cancels Vice News Tonight and lays off 100+ journalists." },
      { "date": "May 15, 2023", "event": "Files Chapter 11 in SDNY; sold to Fortress lender group." }
    ],
    "keyTakeaways": [
      "Digital media venture valuations built on social media referral traffic algorithms collapse when platforms pivot.",
      "High overhead journalism operations cannot survive digital ad duopoly price controls."
    ]
  },

  # -------------------------------------------------------------
  # 7. LEGACY HARDWARE & SOFTWARE (sectorId: "legacy-tech")
  # -------------------------------------------------------------
  {
    "id": "fisker-inc",
    "name": "Fisker Inc.",
    "ticker": "FSRN",
    "sectorId": "legacy-tech",
    "sectorName": "Legacy Hardware & Software",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 LIQUIDATED",
    "distressScore": 99,
    "peakValuation": "$4.10 Billion",
    "collapseValuation": "$4.6M Fleet Sale to American Lease",
    "debtAtCollapse": "$1.40 Billion",
    "yearFounded": 2016,
    "yearCollapsed": 2024,
    "dateTimestamp": "2024-06-17",
    "locationJurisdiction": "Wilmington, DE (D. Del.)",
    "ceoAtFailure": "Henrik Fisker",
    "primaryCause": "Fisker Ocean Software Glitches, Outsourced Manufacturing Bottlenecks & Cash Burn",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/fisker",
    "sourceType": "SEC_EDGAR_FILING",
    "sourceName": "U.S. Bankruptcy Court D. Del. Case #24-11343",
    "summary": "EV startup created by Henrik Fisker filed Chapter 11 after severe software bugs, customer return waves, and outsourced manufacturing hurdles drained liquidity.",
    "earlyWarningSignals": [
      "NHTSA investigations into vehicle rollaway & brake loss glitches",
      "Inability to complete Q4 2023 SEC Form 10-K filing due to internal controls collapse",
      "Termination of rescue investment talks with Nissan in March 2024"
    ],
    "anatomyBreakdown": {
      "structural": "'Asset-light' EV model outsourcing vehicle manufacturing to Magna Steyr in Austria.",
      "financial": "$1.4B in senior convertible notes; revenue fell short of cash burn by $600M+.",
      "market": "Tesla price cuts and EV demand slowdown severely impacted startup adoption.",
      "regulatory": "SEC enforcement investigation into accounting irregularities and missing customer payments."
    },
    "timeline": [
      { "date": "Feb 2021", "event": "Stock reaches peak $28/share following SPAC merger, valuing firm at $4.1B." },
      { "date": "Mar 2024", "event": "Nissan walks away from $400M investment deal; NYSE delists stock." },
      { "date": "Jun 17, 2024", "event": "Files Chapter 11 in Delaware; sells remaining 3,200 EV fleet for $4.6M." }
    ],
    "keyTakeaways": [
      "Outsourcing EV manufacturing does not eliminate software engineering integration risks.",
      "Failing to maintain basic accounting revenue controls destroys strategic OEM rescue deals."
    ]
  },
  {
    "id": "avaya-holdings",
    "name": "Avaya Holdings Corp",
    "ticker": "AVYAQ",
    "sectorId": "legacy-tech",
    "sectorName": "Legacy Hardware & Software",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 REORGANIZED",
    "distressScore": 95,
    "peakValuation": "$3.20 Billion",
    "collapseValuation": "$780 Million Debt Reorg",
    "debtAtCollapse": "$3.40 Billion",
    "yearFounded": 2000,
    "yearCollapsed": 2023,
    "dateTimestamp": "2023-02-14",
    "locationJurisdiction": "Wilmington, DE (D. Del.)",
    "ceoAtFailure": "Alan Maserek",
    "primaryCause": "On-Premise PBX Legacy Trap & Accounting Accounting Errors",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/avaya",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court D. Del. Case #23-10167",
    "summary": "Enterprise telecommunications giant entered its second Chapter 11 bankruptcy in six years after lagging cloud communications shifts (Teams, Zoom) and failing audit reviews.",
    "earlyWarningSignals": [
      "Substantial doubt about going concern issued 6 months after $600M debt financing raise",
      "Audit committee probe into internal financial controls and whistleblower allegations",
      "Customer migration from legacy on-premise hardware to Microsoft Teams and Zoom"
    ],
    "anatomyBreakdown": {
      "structural": "Enterprise PBX telecom provider with massive legacy maintenance contracts.",
      "financial": "$3.4B in debt maturity obligations vs rapidly declining license renewals.",
      "market": "Remote work accelerated cloud-native Unified Communications (UCaaS) replacement.",
      "regulatory": "Chapter 11 prearranged plan cut debt stack by 75% ($2.6B reduction)."
    },
    "timeline": [
      { "date": "May 2022", "event": "Raises $600M in debt; stock drops 60% three months later on earnings miss." },
      { "date": "Sep 2022", "event": "Removes CEO Jim Chirico following audit committee internal investigation." },
      { "date": "Feb 14, 2023", "event": "Files Chapter 11 in Delaware; emerges 3 months later as private entity." }
    ],
    "keyTakeaways": [
      "Legacy hardware licensing models face rapid terminal decline when cloud SaaS substitutes achieve scale.",
      "Debt raises executed right before massive accounting restatements destroy lender trust."
    ]
  },

  # -------------------------------------------------------------
  # 8. ENERGY & CLEANTECH (sectorId: "energy")
  # -------------------------------------------------------------
  {
    "id": "sunpower-corp",
    "name": "SunPower Corporation",
    "ticker": "SPWR",
    "sectorId": "energy",
    "sectorName": "Energy & Cleantech",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 ASSET SALE",
    "distressScore": 98,
    "peakValuation": "$2.10 Billion",
    "collapseValuation": "$45 Million Asset Sale to Complete Solaria",
    "debtAtCollapse": "$2.00 Billion",
    "yearFounded": 1985,
    "yearCollapsed": 2024,
    "dateTimestamp": "2024-08-05",
    "locationJurisdiction": "Wilmington, DE (D. Del.)",
    "ceoAtFailure": "Tom Werner",
    "primaryCause": "High Interest Rates, California NEM 3.0 Policy Shift & Accounting Misstatements",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/sunpower",
    "sourceType": "SEC_EDGAR_FILING",
    "sourceName": "U.S. Bankruptcy Court D. Del. Case #24-11680",
    "summary": "39-year-old residential solar pioneer filed Chapter 11 after soaring interest rates, California net metering rule cuts (NEM 3.0), and accounting restatements wiped out consumer solar demand.",
    "earlyWarningSignals": [
      "Restatement of 2022 and 2023 financial statements due to inventory accounting errors",
      "Breach of credit agreement covenants leading to lender default notices in Dec 2023",
      "Complete halt of new lease and installation operations in July 2024"
    ],
    "anatomyBreakdown": {
      "structural": "Residential solar installer reliant on consumer financing & solar lease/PPA securitization.",
      "financial": "$2B total liabilities; soaring interest rates pushed monthly solar loan payments above utility bills.",
      "market": "California's NEM 3.0 policy reduced rooftop solar export compensation rates by 75%.",
      "regulatory": "SEC inquiry into restated quarterly inventory reporting."
    },
    "timeline": [
      { "date": "Apr 2023", "event": "California enacts NEM 3.0, causing 50%+ drop in state residential solar demand." },
      { "date": "Dec 2023", "event": "Defaults on credit agreement covenants following financial restatements." },
      { "date": "Aug 5, 2024", "event": "Files Chapter 11 in Delaware; agrees to sell assets to Complete Solaria for $45M." }
    ],
    "keyTakeaways": [
      "Residential solar business models are hyper-sensitive to central bank interest rate policy.",
      "Regulatory net-metering tariff changes can eliminate consumer solar payback unit economics overnight."
    ]
  },
  {
    "id": "proterra-inc",
    "name": "Proterra Inc.",
    "ticker": "PTRAQ",
    "sectorId": "energy",
    "sectorName": "Energy & Cleantech",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 SOLD",
    "distressScore": 96,
    "peakValuation": "$1.60 Billion",
    "collapseValuation": "$210 Million Asset Sales",
    "debtAtCollapse": "$450.00 Million",
    "yearFounded": 2004,
    "yearCollapsed": 2023,
    "dateTimestamp": "2023-08-07",
    "locationJurisdiction": "Wilmington, DE (D. Del.)",
    "ceoAtFailure": "Gareth Joyce",
    "primaryCause": "Commercial EV Bus Contract Fixed Pricing vs Inflationary Component Spikes",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/proterra",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court D. Del. Case #23-11120",
    "summary": "Commercial electric bus and battery technology manufacturer collapsed into Chapter 11 due to long lead-time fixed price municipal bus contracts signed before post-pandemic inflation.",
    "earlyWarningSignals": [
      "12-to-18 month fixed-price municipal bus manufacturing backlogs incurring gross margin losses",
      "Battery production line scale bottlenecks at South Carolina facility",
      "Heavy quarterly cash burn exceeding $50M"
    ],
    "anatomyBreakdown": {
      "structural": "Dual business unit: Commercial EV Transit Bus manufacturing + Proterra Powered battery supply.",
      "financial": "$450M in liabilities; negative gross margins on municipal bus delivery contracts.",
      "market": "Supply chain component shortages delayed bus assembly, triggering contract penalty clauses.",
      "regulatory": "Chapter 11 auction split assets: Volvo acquired battery unit ($210M); Phoenix Motor acquired bus unit."
    },
    "timeline": [
      { "date": "Jun 2021", "event": "Goes public via SPAC merger at $1.6B valuation." },
      { "date": "Mar 2023", "event": "Restructures debt covenants as cash reserves fall below threshold." },
      { "date": "Aug 7, 2023", "event": "Files Chapter 11 in Delaware; sells battery business to Volvo Group." }
    ],
    "keyTakeaways": [
      "Fixed-price long-lead municipal manufacturing contracts can become toxic liabilities during inflationary spikes.",
      "Cleantech hardware startups must separate battery tech IP from capital-intensive vehicle assembly."
    ]
  },

  # -------------------------------------------------------------
  # 9. CRYPTO & WEB3 PROTOCOLS (sectorId: "crypto-protocols")
  # -------------------------------------------------------------
  {
    "id": "ftx-trading",
    "name": "FTX Trading Ltd",
    "ticker": "FTT",
    "sectorId": "crypto-protocols",
    "sectorName": "Crypto & Web3 Protocols",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 REORGANIZING",
    "distressScore": 100,
    "peakValuation": "$32.00 Billion",
    "collapseValuation": "$16B Customer Recovery Plan",
    "debtAtCollapse": "$8.90 Billion Shortfall",
    "yearFounded": 2019,
    "yearCollapsed": 2022,
    "dateTimestamp": "2022-11-11",
    "locationJurisdiction": "Wilmington, DE (D. Del.)",
    "ceoAtFailure": "Sam Bankman-Fried",
    "primaryCause": "Co-Mingling Customer Funds with Alameda Research & FTT Backstop Fraud",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://restructuring.ra.kroll.com/FTX/",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court D. Del. Case #22-11068",
    "summary": "Second-largest global crypto exchange collapsed in 72 hours after CoinDesk revealed Alameda Research held billions in illiquid FTT tokens, triggering an $8B bank run and uncovering fraud.",
    "earlyWarningSignals": [
      "Nov 2, 2022 CoinDesk report revealing Alameda Research balance sheet dominated by FTT tokens",
      "Binance CEO CZ announcing liquidating $500M+ in FTT holdings on Nov 6",
      "Halt of customer withdrawals on Nov 8 after $6B in withdrawal requests"
    ],
    "anatomyBreakdown": {
      "structural": "Unregulated offshore exchange with zero independent board oversight or CFO oversight.",
      "financial": "$8.9B customer asset deficit secretively siphoned to Alameda hedge fund.",
      "market": "Loss of confidence caused complete liquidity freeze across crypto markets.",
      "regulatory": "DOJ criminal indictment of Sam Bankman-Fried (sentenced to 25 years in prison)."
    },
    "timeline": [
      { "date": "Nov 2, 2022", "event": "CoinDesk leaks Alameda Research balance sheet holding billions in FTT." },
      { "date": "Nov 8, 2022", "event": "Binance signs non-binding LOI to acquire FTX, then cancels 24h later." },
      { "date": "Nov 11, 2022", "event": "Files Chapter 11 in Delaware; John J. Ray III appointed CEO." }
    ],
    "keyTakeaways": [
      "Co-mingling customer exchange deposits with proprietary trading funds is catastrophic fraud.",
      "Illiquid exchange tokens cannot serve as real collateral for institutional debt balances."
    ]
  },
  {
    "id": "celsius-network",
    "name": "Celsius Network",
    "ticker": "CEL",
    "sectorId": "crypto-protocols",
    "sectorName": "Crypto & Web3 Protocols",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 REORGANIZED",
    "distressScore": 98,
    "peakValuation": "$25.00 Billion Assets",
    "collapseValuation": "MiningCo Distribution Reorg",
    "debtAtCollapse": "$4.70 Billion",
    "yearFounded": 2017,
    "yearCollapsed": 2022,
    "dateTimestamp": "2022-07-13",
    "locationJurisdiction": "New York, NY (SDNY)",
    "ceoAtFailure": "Alex Mashinsky",
    "primaryCause": "Unhedged DeFi Yield Leverage, stETH Liquidity Trap & Terra Collapse",
    "claimsAgent": "Stretto Restructuring",
    "claimsAgentUrl": "https://cases.stretto.com/celsius",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court SDNY Case #22-10964",
    "summary": "Crypto lending platform promising 18% APY yield paused all customer withdrawals after losing $500M+ in UST/LUNA and illiquid stETH staking pools.",
    "earlyWarningSignals": [
      "Anchor Protocol 20% yield unsustainability warnings in early 2022",
      "Lido stETH de-pegging from ETH causing liquidity lockup",
      "Sudden suspension of all customer account transfers on June 12, 2022"
    ],
    "anatomyBreakdown": {
      "structural": "Promised high retail yields while taking directional unhedged DeFi positions.",
      "financial": "$4.7B owed to 1.7 million retail depositors against $1.2B balance sheet hole.",
      "market": "Terra/LUNA $40B collapse triggered contagion throughout crypto lending desks.",
      "regulatory": "SEC, CFTC, and FTC filed fraud lawsuits against CEO Alex Mashinsky."
    },
    "timeline": [
      { "date": "May 2022", "event": "Terra/LUNA collapses; Celsius loses $500M+ in UST depeg." },
      { "date": "Jun 12, 2022", "event": "Pauses all customer withdrawals, swaps, and transfers." },
      { "date": "Jul 13, 2022", "event": "Files Chapter 11 in SDNY; emerges in 2024 distributing crypto & Bitcoin mining stock." }
    ],
    "keyTakeaways": [
      "High yield yields promised on crypto deposits are red flags for unhedged directional gambling.",
      "Illiquid derivative tokens (stETH) lock up liquidity when retail depositors panic."
    ]
  }
]

# Save updated companies.json
output_file = r'c:\Users\dlc92\Projects\BusinessCollapse.Com\src\data\companies.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(companies_list, f, indent=2)

print(f"Successfully populated companies.json with {len(companies_list)} comprehensive corporate failure autopsies across ALL sectors!")
