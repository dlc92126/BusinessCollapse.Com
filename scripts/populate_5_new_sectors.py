import json

sectors_file = r'c:\Users\dlc92\Projects\BusinessCollapse.Com\src\data\sectors.json'
companies_file = r'c:\Users\dlc92\Projects\BusinessCollapse.Com\src\data\companies.json'

new_sectors = [
  {
    "id": "healthcare",
    "name": "Healthcare & Hospital Networks",
    "riskScore": 91,
    "riskLevel": "CRITICAL",
    "accentColor": "#10B981",
    "failingCompaniesCount": 35,
    "totalDebtAtRisk": "$112.4B",
    "trend30d": "+5.8%",
    "description": "Private equity hospital roll-ups, Medicare reimbursement cuts, soaring travelling nurse costs, and massive opioid settlement liabilities.",
    "topFailureDrivers": ["Private Equity LBO Debt", "Opioid Settlement Obligations", "Medicare Reimbursement Cuts", "Nurse Labor Inflation"]
  },
  {
    "id": "logistics",
    "name": "Supply Chain, Freight & Logistics",
    "riskScore": 84,
    "riskLevel": "CRITICAL",
    "accentColor": "#F59E0B",
    "failingCompaniesCount": 44,
    "totalDebtAtRisk": "$86.2B",
    "trend30d": "+3.9%",
    "description": "Post-COVID freight recession, spot container rate crashes, diesel fuel price spikes, and over-leveraged LTL trucking fleets.",
    "topFailureDrivers": ["Post-Pandemic Freight Recession", "Spot Container Rate Collapse", "Diesel Fuel Price Spikes", "Over-Leveraged LTL Fleets"]
  },
  {
    "id": "fintech",
    "name": "Fintech & Subprime Credit",
    "riskScore": 88,
    "riskLevel": "CRITICAL",
    "accentColor": "#8B5CF6",
    "failingCompaniesCount": 27,
    "totalDebtAtRisk": "$42.6B",
    "trend30d": "+4.2%",
    "description": "High interest rate headwinds on BNPL loans, subprime auto default spikes, and BaaS banking middleware deposit freezes.",
    "topFailureDrivers": ["BaaS Middleware Lockups", "Subprime Credit Default Spikes", "BNPL Unhedged Losses", "Venture Capital Freeze"]
  },
  {
    "id": "biotech",
    "name": "Biotech & Synthetic Biology",
    "riskScore": 78,
    "riskLevel": "HIGH DISTRESS",
    "accentColor": "#EC4899",
    "failingCompaniesCount": 32,
    "totalDebtAtRisk": "$38.9B",
    "trend30d": "+2.1%",
    "description": "Capital-intensive Phase 3 FDA trial failures, commercialization cash burn, and venture debt maturity walls.",
    "topFailureDrivers": ["Phase 3 FDA Trial Failure", "Zero Commercial Revenue", "Venture Debt Maturity Walls", "High Lab Overhead"]
  },
  {
    "id": "telecom",
    "name": "Telecommunications & Fiber",
    "riskScore": 75,
    "riskLevel": "HIGH DISTRESS",
    "accentColor": "#06B6D4",
    "failingCompaniesCount": 19,
    "totalDebtAtRisk": "$68.5B",
    "trend30d": "+1.8%",
    "description": "Multi-billion dollar leveraged fiber buildout loans, satellite constellation capital burn, and legacy landline revenue decline.",
    "topFailureDrivers": ["Leveraged Fiber Construction Debt", "Satellite Constellation Costs", "Landline Revenue Decline", "High Interest Refinancing"]
  }
]

# Update sectors.json
with open(sectors_file, 'r', encoding='utf-8') as f:
    sectors = json.load(f)

for ns in new_sectors:
    if not any(s['id'] == ns['id'] for s in sectors):
        sectors.append(ns)

with open(sectors_file, 'w', encoding='utf-8') as f:
    json.dump(sectors, f, indent=2)

print(f"Successfully updated sectors.json! Total sectors: {len(sectors)}")

# Add new company profiles to companies.json
new_companies = [
  # HEALTHCARE
  {
    "id": "steward-health-care",
    "name": "Steward Health Care System",
    "ticker": "PRIVATE",
    "sectorId": "healthcare",
    "sectorName": "Healthcare & Hospital Networks",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 AUCTION",
    "distressScore": 100,
    "peakValuation": "$4.50 Billion",
    "collapseValuation": "$9B Liabilities / Hospital Auction",
    "debtAtCollapse": "$9.00 Billion",
    "yearFounded": 2010,
    "yearCollapsed": 2024,
    "dateTimestamp": "2024-05-06",
    "locationJurisdiction": "Houston, TX (S.D. Tex.)",
    "ceoAtFailure": "Dr. Ralph de la Torre",
    "primaryCause": "Private Equity Sale-Leaseback Rent Traps & $9B Medical Debt Overhang",
    "claimsAgent": "Stretto Restructuring",
    "claimsAgentUrl": "https://cases.stretto.com/steward",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court S.D. Tex. Case #24-90213",
    "summary": "Largest physician-owned hospital network in the U.S. filed Chapter 11 with $9B in debt after selling hospital real estate to MPT in a sale-leaseback deal that created unsustainable rent liabilities.",
    "earlyWarningSignals": [
      "Medical Properties Trust (MPT) unpaid rent accumulation exceeding $50M in 2023",
      "Closure of New England Sinai Hospital due to severe cash shortfalls",
      "U.S. Senate health committee subpoena issued to CEO Dr. Ralph de la Torre"
    ],
    "anatomyBreakdown": {
      "structural": "Cerberus Capital sale-leaseback stripped hospital buildings, saddling network with massive rent bills.",
      "financial": "$9B in total liabilities; monthly rent obligations exceeded operating gross margins.",
      "market": "Nursing wage spikes and Medicare reimbursement cuts eroded hospital operating income.",
      "regulatory": "Department of Justice & Senate Finance Committee criminal investigation into executive payouts."
    },
    "timeline": [
      { "date": "Jan 2024", "event": "Medical Properties Trust cuts off funding due to $50M in unpaid back rent." },
      { "date": "May 6, 2024", "event": "Files Chapter 11 bankruptcy in Texas; puts 31 hospitals up for court auction." },
      { "date": "Aug 2024", "event": "Approves sale of 15 hospitals to Lifespan and Boston Medical Center." }
    ],
    "keyTakeaways": [
      "Selling underlying hospital real estate to fund PE dividends creates catastrophic insolvency risks.",
      "Essential community hospitals cannot survive when real estate REIT rent obligations surpass clinical income."
    ]
  },
  {
    "id": "mallinckrodt-pharma",
    "name": "Mallinckrodt Pharmaceuticals",
    "ticker": "MNKTQ",
    "sectorId": "healthcare",
    "sectorName": "Healthcare & Hospital Networks",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 REORGANIZED",
    "distressScore": 98,
    "peakValuation": "$14.00 Billion",
    "collapseValuation": "$1.7B Lender Reorg",
    "debtAtCollapse": "$5.20 Billion",
    "yearFounded": 1867,
    "yearCollapsed": 2023,
    "dateTimestamp": "2023-08-28",
    "locationJurisdiction": "Wilmington, DE (D. Del.)",
    "ceoAtFailure": "Sigurdur Olafsson",
    "primaryCause": "Opioid Litigation Master Settlement Defaults & Acthar Gel Patent Erosion",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/mallinckrodt",
    "sourceType": "SEC_EDGAR_FILING",
    "sourceName": "U.S. Bankruptcy Court D. Del. Case #23-11258",
    "summary": "Major generic drug manufacturer entered its second Chapter 11 bankruptcy in three years after failing to make a mandatory $200M opioid trust settlement payment.",
    "earlyWarningSignals": [
      "Failure to make scheduled $200M payment to National Opioid Abatement Trust in June 2023",
      "Generic competition eroding Acthar Gel revenue (flagship specialty drug)",
      "Going concern warning issued in Q2 2023 SEC Form 10-Q"
    ],
    "anatomyBreakdown": {
      "structural": "Specialty pharmaceutical producer burdened by massive legacy litigation settlements.",
      "financial": "$5.2B in total senior debt against shrinking free cash flow.",
      "market": "Loss of exclusivity on core drug patents exposed firm to low-margin generics.",
      "regulatory": "Second prepackaged Chapter 11 plan transferred equity control to senior noteholders."
    },
    "timeline": [
      { "date": "Oct 2020", "event": "Files first Chapter 11 to resolve $1.7B nationwide opioid claims." },
      { "date": "Jun 2023", "event": "Misses $200M opioid settlement trust payment." },
      { "date": "Aug 28, 2023", "event": "Files second Chapter 11 bankruptcy in Delaware court." }
    ],
    "keyTakeaways": [
      "Master litigation settlement trusts cannot be sustained if underlying drug patent revenues collapse.",
      "Prepackaged bankruptcies often require secondary filings if initial debt cuts are insufficient."
    ]
  },

  # LOGISTICS
  {
    "id": "yellow-corp",
    "name": "Yellow Corporation",
    "ticker": "YELLQ",
    "sectorId": "logistics",
    "sectorName": "Supply Chain, Freight & Logistics",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 LIQUIDATED",
    "distressScore": 100,
    "peakValuation": "$3.50 Billion",
    "collapseValuation": "$2.2B Terminal Real Estate Auction",
    "debtAtCollapse": "$1.50 Billion",
    "yearFounded": 1924,
    "yearCollapsed": 2023,
    "dateTimestamp": "2023-08-06",
    "locationJurisdiction": "Wilmington, DE (D. Del.)",
    "ceoAtFailure": "Darren Hawkins",
    "primaryCause": "Teamsters Strike Threat, One Yellow Restructuring Battle & $1.5B Debt Stack",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/yellow",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court D. Del. Case #23-11069",
    "summary": "99-year-old trucking titan collapsed into the largest liquidation in U.S. freight history, laying off 30,000 workers after a bitter dispute with the Teamsters union over network integration.",
    "earlyWarningSignals": [
      "Teamsters Union strike authorization vote in July 2023",
      "Customer freight diversion to XPO, Saia, and ABF Freight",
      "$700M U.S. Treasury pandemic loan maturity due in 2024"
    ],
    "anatomyBreakdown": {
      "structural": "Inability to merge legacy freight subsidiaries (YRC, Holland, Reddaway) into single 'One Yellow' network.",
      "financial": "$1.5B total debt including $700M federal Treasury loan.",
      "market": "Freight volume plunged 80% in final weeks as shippers fled union strike risk.",
      "regulatory": "Delaware court ordered Section 363 auction selling 130+ freight terminals for $2.2B."
    },
    "timeline": [
      { "date": "Jul 2020", "event": "Receives controversial $700M U.S. Treasury COVID bailout loan." },
      { "date": "Jul 23, 2023", "event": "Averts Teamsters strike but customers pull freight; halts operations." },
      { "date": "Aug 6, 2023", "event": "Files Chapter 11 in Delaware; liquidates 30,000 employee workforce." }
    ],
    "keyTakeaways": [
      "Labor union standoffs during a freight recession can trigger immediate loss of shipper volume.",
      "Freight terminal real estate assets can provide substantial recovery value in Chapter 11 liquidations."
    ]
  },
  {
    "id": "convoy-freight",
    "name": "Convoy Inc.",
    "ticker": "PRIVATE",
    "sectorId": "logistics",
    "sectorName": "Supply Chain, Freight & Logistics",
    "status": "OUT_OF_BUSINESS",
    "statusBadge": "SHUTDOWN / ASSET SALE",
    "distressScore": 99,
    "peakValuation": "$3.80 Billion",
    "collapseValuation": "$5M Technology IP Sale to Flexport",
    "debtAtCollapse": "$220.00 Million",
    "yearFounded": 2015,
    "yearCollapsed": 2023,
    "dateTimestamp": "2023-10-19",
    "locationJurisdiction": "Seattle, WA (Assignment for Benefit of Creditors)",
    "ceoAtFailure": "Dan Lewis",
    "primaryCause": "Freight Spot Rate Collapse & High Engineering Overhead Burn",
    "claimsAgent": "Flexport Acquisition Desk",
    "claimsAgentUrl": "https://convoy.com",
    "sourceType": "REGULATORY_RELEASE",
    "sourceName": "Company Letter to Shareholders & Employees",
    "summary": "Bill Gates and Jeff Bezos-backed digital freight broker valued at $3.8B abruptly shut down operations after freight rates plummeted and emergency M&A talks failed.",
    "earlyWarningSignals": [
      "Post-COVID freight spot rate crash exceeding 40%",
      "Three rounds of employee layoffs reducing staff by 50%",
      "Failed emergency sale negotiations with rival logistics firms"
    ],
    "anatomyBreakdown": {
      "structural": "Digital marketplace matching truck drivers with shippers burdened by high tech burn.",
      "financial": "Depleted $260M in equity funding; credit facility pulled by Hercules Capital.",
      "market": "Plunging freight rates reduced broker margin take-rates across all lanes.",
      "regulatory": "Asset liquidation conducted via Assignment for Benefit of Creditors (ABC)."
    },
    "timeline": [
      { "date": "Apr 2022", "event": "Raises $260M at peak $3.8B valuation." },
      { "date": "Oct 19, 2023", "event": "Abruptly cancels all shipments, fires 500 remaining staff, and halts tech platform." },
      { "date": "Nov 2023", "event": "Flexport acquires Convoy's technology IP for under $10M." }
    ],
    "keyTakeaways": [
      "High tech multiples applied to commoditized freight brokerage models collapse in down-cycles.",
      "When debt lenders pull revolving credit lines, tech startups can shut down in under 24 hours."
    ]
  },

  # FINTECH
  {
    "id": "synapse-financial",
    "name": "Synapse Financial Technologies",
    "ticker": "PRIVATE",
    "sectorId": "fintech",
    "sectorName": "Fintech & Subprime Credit",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 BANKRUPT",
    "distressScore": 99,
    "peakValuation": "$500.00 Million",
    "collapseValuation": "$85M Frozen Customer Funds",
    "debtAtCollapse": "$85.00 Million Deficit",
    "yearFounded": 2014,
    "yearCollapsed": 2024,
    "dateTimestamp": "2024-04-22",
    "locationJurisdiction": "Los Angeles, CA (C.D. Cal.)",
    "ceoAtFailure": "Sankaet Pathak",
    "primaryCause": "Banking-as-a-Service Ledger Discrepancies & Partner Bank Dispute",
    "claimsAgent": "U.S. Trustee / Chapter 11 Trustee Jelena McWilliams",
    "claimsAgentUrl": "https://www.cacb.uscourts.gov",
    "sourceType": "COURT_DOCKET",
    "sourceName": "U.S. Bankruptcy Court C.D. Cal. Case #24-13459",
    "summary": "Banking-as-a-Service (BaaS) middleware provider collapsed after a ledger dispute with Evolve Bank & Trust froze $85M in end-user customer deposits across 100,000+ fintech accounts.",
    "earlyWarningSignals": [
      "Termination of partnership with Evolve Bank & Trust in 2023",
      "$10M+ ledger discrepancies between Synapse internal databases and partner banks",
      "Loss of core customer Yotta Savings after deposit freeze"
    ],
    "anatomyBreakdown": {
      "structural": "Middleware layer routing consumer deposits between consumer fintech apps and FDIC partner banks.",
      "financial": "$85M shortfall in pooled omnibus account reconciliations.",
      "market": "Fintech funding freeze prevented emergency bridge equity raises.",
      "regulatory": "Federal Reserve and FDIC issued enforcement orders against Evolve Bank."
    },
    "timeline": [
      { "date": "Oct 2023", "event": "Evolve Bank cuts off Synapse access following ledger reconciliation dispute." },
      { "date": "May 11, 2024", "event": "Evolve freezes all Synapse customer accounts; 100,000+ consumers lose access to savings." },
      { "date": "May 2024", "event": "Former FDIC Chair Jelena McWilliams appointed Chapter 11 Trustee to audit ledger." }
    ],
    "keyTakeaways": [
      "BaaS middleware platforms creating omnibus pool accounts without sub-ledger verification invite catastrophic deposit lockups.",
      "FDIC insurance does not protect consumers against middleware software bankruptcy disputes."
    ]
  },

  # BIOTECH
  {
    "id": "amyris-inc",
    "name": "Amyris, Inc.",
    "ticker": "AMRSQ",
    "sectorId": "biotech",
    "sectorName": "Biotech & Synthetic Biology",
    "status": "CHAPTER_11",
    "statusBadge": "CHAPTER 11 AUCTION",
    "distressScore": 97,
    "peakValuation": "$1.80 Billion",
    "collapseValuation": "$15.5M Brand Sale",
    "debtAtCollapse": "$1.10 Billion",
    "yearFounded": 2003,
    "yearCollapsed": 2023,
    "dateTimestamp": "2023-08-09",
    "locationJurisdiction": "Wilmington, DE (D. Del.)",
    "ceoAtFailure": "John Melo",
    "primaryCause": "D2C Beauty Brand Marketing Spend & Fermentation Scale Bottlenecks",
    "claimsAgent": "Kroll Restructuring Administration",
    "claimsAgentUrl": "https://cases.ra.kroll.com/amyris",
    "sourceType": "SEC_EDGAR_FILING",
    "sourceName": "U.S. Bankruptcy Court D. Del. Case #23-11131",
    "summary": "Synthetic biology pioneer behind lab-grown squalane filed Chapter 11 after pivoting into expensive direct-to-consumer celebrity consumer beauty brands (Biossance, Pipette) with massive cash burn.",
    "earlyWarningSignals": [
      "Quarterly net cash burn exceeding $100M in late 2022",
      "Restructuring plan announcing complete shutdown of D2C consumer brands",
      "Secured debt default notices from Foris Ventures (John Doerr)"
    ],
    "anatomyBreakdown": {
      "structural": "Industrial fermentation lab that acquired 8 consumer beauty brands requiring huge ad spend.",
      "financial": "$1.1B total debt stack; negative operating margins across consumer lines.",
      "market": "Soaring customer acquisition costs (CAC) on Instagram and TikTok.",
      "regulatory": "Delaware Section 363 asset auction sold Biossance brand to THG for $20M."
    },
    "timeline": [
      { "date": "Jun 2023", "event": "Lays off 260 employees and replaces CEO John Melo." },
      { "date": "Aug 9, 2023", "event": "Files Chapter 11 in Delaware; exits consumer brands to focus on core B2B lab tech." }
    ],
    "keyTakeaways": [
      "Industrial biotech platforms cannot subsidize high-overhead consumer D2C beauty brand marketing.",
      "Deep-tech startups must preserve B2B molecule supply agreements rather than chasing consumer retail."
    ]
  }
]

with open(companies_file, 'r', encoding='utf-8') as f:
    companies = json.load(f)

for nc in new_companies:
    if not any(c['id'] == nc['id'] for c in companies):
        companies.append(nc)

with open(companies_file, 'w', encoding='utf-8') as f:
    json.dump(companies, f, indent=2)

print(f"Successfully updated companies.json! Total companies: {len(companies)}")
