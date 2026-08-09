import json

# Ensure sectors.json contains all primary sectors with updated metrics
sectors_data = [
  {
    "id": "crypto-protocols",
    "name": "Crypto & Web3 Protocols",
    "riskScore": 94,
    "riskLevel": "CRITICAL",
    "accentColor": "#EC4899",
    "failingCompaniesCount": 38,
    "totalDebtAtRisk": "$120.8B",
    "trend30d": "+6.4%",
    "description": "Algorithmic stablecoin depegs, unhedged DeFi yield leverage, founder liquidity pool draining, and exchange customer fund co-mingling.",
    "topFailureDrivers": ["Algorithmic Stablecoin Depeg", "Exchange Custody Fraud", "Deflationary Tax Scams", "Zero Dev Commit Zombies"]
  },
  {
    "id": "cre",
    "name": "Commercial Real Estate",
    "riskScore": 88,
    "riskLevel": "CRITICAL",
    "accentColor": "#FF2A4B",
    "failingCompaniesCount": 42,
    "totalDebtAtRisk": "$145.2B",
    "trend30d": "+4.2%",
    "description": "Severe office space vacancy rates, soaring interest rates, and impending commercial mortgage-backed security (CMBS) maturity walls.",
    "topFailureDrivers": ["Remote Work Paradigm Shift", "Interest Rate Surges", "Refinancing Lockup", "Regional Bank Exposure"]
  },
  {
    "id": "legacy-retail",
    "name": "Legacy Brick & Mortar Retail",
    "riskScore": 85,
    "riskLevel": "CRITICAL",
    "accentColor": "#FF3B5C",
    "failingCompaniesCount": 68,
    "totalDebtAtRisk": "$98.6B",
    "trend30d": "+2.8%",
    "description": "Private equity leveraged buyouts combined with aggressive e-commerce market share erosion and shifting consumer habits.",
    "topFailureDrivers": ["Private Equity LBO Debt", "Amazon & E-Commerce Dominance", "Supply Chain Mismanagement", "Over-Expansion"]
  },
  {
    "id": "regional-banking",
    "name": "Regional Banking & CRE Lenders",
    "riskScore": 79,
    "riskLevel": "HIGH DISTRESS",
    "accentColor": "#FF9F43",
    "failingCompaniesCount": 14,
    "totalDebtAtRisk": "$112.0B",
    "trend30d": "+1.9%",
    "description": "Unrealized bond portfolio losses, uninsured deposit flight, and concentration in distressed CRE loans.",
    "topFailureDrivers": ["Duration Mismatch", "Uninsured Deposit Flight", "CRE Loan Impairment", "Regulatory Scrutiny"]
  },
  {
    "id": "aviation",
    "name": "Aviation & Aerospace",
    "riskScore": 82,
    "riskLevel": "HIGH DISTRESS",
    "accentColor": "#3B82F6",
    "failingCompaniesCount": 18,
    "totalDebtAtRisk": "$48.4B",
    "trend30d": "+3.1%",
    "description": "High fixed lease obligations, engine maintenance supply bottlenecks, jet fuel price volatility, and unviable ULCC yield models.",
    "topFailureDrivers": ["Engine Maintenance Backlogs", "Aircraft Lease Obligation Strain", "Jet Fuel Volatility", "Discount Pricing Wars"]
  },
  {
    "id": "casual-dining",
    "name": "Casual Dining & Franchises",
    "riskScore": 74,
    "riskLevel": "HIGH DISTRESS",
    "accentColor": "#A855F7",
    "failingCompaniesCount": 26,
    "totalDebtAtRisk": "$28.4B",
    "trend30d": "+3.4%",
    "description": "Squeezed consumer discretionary spending, labor wage pressures, endless promotion margin erosion, and debt servicing strain post-expansion.",
    "topFailureDrivers": ["Discretionary Consumer Pullback", "PE Debt Service Strain", "Labor & Food Inflation", "Delivery App Margin Erosion"]
  },
  {
    "id": "linear-media",
    "name": "Traditional Linear Media & Cable",
    "riskScore": 76,
    "riskLevel": "HIGH DISTRESS",
    "accentColor": "#FF7A00",
    "failingCompaniesCount": 24,
    "totalDebtAtRisk": "$64.1B",
    "trend30d": "+5.1%",
    "description": "Accelerating subscriber cord-cutting, ad revenue collapse, sports licensing inflation, and unviable streaming losses.",
    "topFailureDrivers": ["Accelerated Cord-Cutting", "Streaming Unit Economics Collapse", "Sports Rights Inflation", "Legacy Infrastructure"]
  },
  {
    "id": "legacy-tech",
    "name": "Legacy Hardware & Software",
    "riskScore": 68,
    "riskLevel": "ELEVATED",
    "accentColor": "#FFD166",
    "failingCompaniesCount": 31,
    "totalDebtAtRisk": "$42.8B",
    "trend30d": "-0.5%",
    "description": "Inability to adapt to Generative AI capabilities, massive legacy technical debt, and cloud migration lag.",
    "topFailureDrivers": ["Generative AI Disruption", "Technical Debt Bottlenecks", "Agile Competitor Moats", "Cloud Transition Missteps"]
  },
  {
    "id": "energy",
    "name": "Energy & Cleantech",
    "riskScore": 71,
    "riskLevel": "ELEVATED",
    "accentColor": "#10B981",
    "failingCompaniesCount": 22,
    "totalDebtAtRisk": "$35.2B",
    "trend30d": "+1.2%",
    "description": "High interest rate headwinds on solar project financing, EV battery supply chain bottlenecks, and regulatory tariff shifts.",
    "topFailureDrivers": ["Residential Solar Financing Freeze", "EV Adoption Slowdown", "Supply Chain Cost Spikes", "Tariff Volatility"]
  }
]

# Write updated sectors.json
with open(r'c:\Users\dlc92\Projects\BusinessCollapse.Com\src\data\sectors.json', 'w', encoding='utf-8') as f:
    json.dump(sectors_data, f, indent=2)

print("Successfully updated sectors.json!")
