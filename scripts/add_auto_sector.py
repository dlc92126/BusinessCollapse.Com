import json

sectors_file = r'c:\Users\dlc92\Projects\BusinessCollapse.Com\src\data\sectors.json'
companies_file = r'c:\Users\dlc92\Projects\BusinessCollapse.Com\src\data\companies.json'

with open(sectors_file, 'r', encoding='utf-8') as f:
    sectors = json.load(f)

# Check if automotive sector exists, else add it
auto_sector_exists = any(s['id'] == 'automotive' for s in sectors)
if not auto_sector_exists:
    sectors.insert(3, {
        "id": "automotive",
        "name": "Automotive & EV Manufacturing",
        "riskScore": 86,
        "riskLevel": "CRITICAL",
        "accentColor": "#E11D48",
        "failingCompaniesCount": 29,
        "totalDebtAtRisk": "$78.5B",
        "trend30d": "+4.8%",
        "description": "High capital burn in EV scaling, battery component inflation, legacy OEM dealer inventory gluts, and outsourced manufacturing quality bottlenecks.",
        "topFailureDrivers": ["EV Scaling Capital Burn", "Outsourced Quality Bottlenecks", "High Interest Rate Auto Loans", "Battery Material Inflation"]
    })
    with open(sectors_file, 'w', encoding='utf-8') as f:
        json.dump(sectors, f, indent=2)
    print("Added Automotive & EV Manufacturing to sectors.json!")

with open(companies_file, 'r', encoding='utf-8') as f:
    companies = json.load(f)

# Update Fisker Inc to automotive sector
for c in companies:
    if c['id'] == 'fisker-inc':
        c['sectorId'] = 'automotive'
        c['sectorName'] = 'Automotive & EV Manufacturing'

# Add Lordstown Motors Corp if not exists
lordstown_exists = any(c['id'] == 'lordstown-motors' for c in companies)
if not lordstown_exists:
    companies.append({
        "id": "lordstown-motors",
        "name": "Lordstown Motors Corp",
        "ticker": "RIDEQ",
        "sectorId": "automotive",
        "sectorName": "Automotive & EV Manufacturing",
        "status": "CHAPTER_11",
        "statusBadge": "CHAPTER 11 ASSET SALE",
        "distressScore": 98,
        "peakValuation": "$5.30 Billion",
        "collapseValuation": "$10 Million Asset Reorg",
        "debtAtCollapse": "$380.00 Million",
        "yearFounded": 2018,
        "yearCollapsed": 2023,
        "dateTimestamp": "2023-06-27",
        "locationJurisdiction": "Wilmington, DE (D. Del.)",
        "ceoAtFailure": "Edward Hightower",
        "primaryCause": "Foxconn Investment Breach Dispute & Endurance EV Truck Production Failure",
        "claimsAgent": "Kroll Restructuring Administration",
        "claimsAgentUrl": "https://cases.ra.kroll.com/lordstown",
        "sourceType": "SEC_EDGAR_FILING",
        "sourceName": "U.S. Bankruptcy Court D. Del. Case #23-10831",
        "summary": "Electric pickup truck manufacturer filed for Chapter 11 bankruptcy and sued strategic partner Foxconn for fraud after the Taiwanese contract manufacturer failed to complete a promised $170M equity investment.",
        "earlyWarningSignals": [
          "Hindenburg Research short seller report alleging faked pre-orders in Mar 2021",
          "SEC and DOJ criminal investigations into misleading pre-order claims",
          "Production halt of Endurance EV pickup truck after selling fewer than 40 units"
        ],
        "anatomyBreakdown": {
          "structural": "Acquired former GM Lordstown plant; struggled with commercial EV truck tooling costs.",
          "financial": "Depleted $1B+ SPAC capital with $50M+ quarterly cash burn.",
          "market": "Ford F-150 Lightning and Rivian R1T dominated commercial EV fleet adoption.",
          "regulatory": "Fraud lawsuit filed against Foxconn for failing to purchase preferred stock."
        },
        "timeline": [
          { "date": "Oct 2020", "event": "Goes public via SPAC merger at $1.6B valuation; shares hit peak $30." },
          { "date": "May 2022", "event": "Sells Lordstown plant facility to Foxconn for $230M." },
          { "date": "Jun 27, 2023", "event": "Files Chapter 11 in Delaware; sues Foxconn for breach of contract." }
        ],
        "keyTakeaways": [
          "Relying on a single contract manufacturing partner for survival creates existential hold-up risk.",
          "Fabricating non-binding customer pre-orders invites regulatory SEC fraud enforcement."
        ]
    })

with open(companies_file, 'w', encoding='utf-8') as f:
    json.dump(companies, f, indent=2)

print(f"Successfully updated companies.json! Total companies: {len(companies)}")
