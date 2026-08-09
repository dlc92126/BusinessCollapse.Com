import json
import random

file_path = r'c:\Users\dlc92\Projects\BusinessCollapse.Com\src\data\sandbox_members.json'

with open(file_path, 'r', encoding='utf-8') as f:
    members = json.load(f)

channels_list = [
  ["Email Digest", "SMS Alert"],
  ["SMS Alert", "Telephony Phone Call", "Email Digest"],
  ["PACER Webhook", "Email Digest"],
  ["SMS Alert", "PACER Webhook"],
  ["Email Digest", "SMS Alert", "Telephony Phone Call", "PACER Webhook"]
]

alert_templates = [
  {
    "title": "Spirit Airlines Docket #184: Section 363 Auction Floor Established",
    "summary": "U.S. Bankruptcy Court D. N.J. issued Order #184 establishing $450M credit bid floor for aircraft lease portfolio.",
    "type": "CHAPTER_11_PACER",
    "ticker": "SAVE",
    "jurisdiction": "Newark, NJ (D. N.J.)"
  },
  {
    "title": "WeWork Lease Rejection Motion #042: 12 Commercial Properties Rejected",
    "summary": "Debtors file emergency omnibus motion to reject 12 prime commercial office leases in Manhattan & San Francisco.",
    "type": "LEASE_REJECTION",
    "ticker": "WE",
    "jurisdiction": "New York, NY (SDNY)"
  },
  {
    "title": "Tupperware Brands Mold Tooling & IP Auction Announced for Sept 24",
    "summary": "Delaware Bankruptcy Court approves Hilco Industrial as lead auctioneer for global mold tooling assets.",
    "type": "AUCTION_NOTICE",
    "ticker": "TUPQ",
    "jurisdiction": "Wilmington, DE (D. Del.)"
  },
  {
    "title": "Bed Bath & Beyond IP Liquidation Sale Finalized at $21.5M",
    "summary": "Overstock acquires digital IP assets; physical retail store liquidation completed across 480 locations.",
    "type": "IP_LIQUIDATION",
    "ticker": "BBBYQ",
    "jurisdiction": "Newark, NJ (D. N.J.)"
  },
  {
    "title": "Silicon Valley Bank Financial Group Chapter 11 Reorganization Plan Confirmed",
    "summary": "Court approves plan of reorganization for parent holding company, clearing $2.2B cash distribution to bondholders.",
    "type": "REORGANIZATION_PLAN",
    "ticker": "SIVBQ",
    "jurisdiction": "New York, NY (SDNY)"
  },
  {
    "title": "Big Lots Files Chapter 11 Bankruptcy Seeking Nexus Capital Sale",
    "summary": "Discount retailer enters Chapter 11 with $707M in liabilities; Nexus Capital named stalking-horse bidder.",
    "type": "CHAPTER_11_PETITION",
    "ticker": "BIG",
    "jurisdiction": "Wilmington, DE (D. Del.)"
  }
]

statuses = ["DELIVERED", "DELIVERED", "CONFIRMED_READ", "DELIVERED"]

for m in members:
    # Set custom scope
    wl = m.get("watchlist", ["wework", "spirit-airlines"])
    m["customScope"] = {
        "preferredSectors": ["Commercial Real Estate", "Aviation & Logistics", "Consumer Retail"] if "wework" in wl or "spirit-airlines" in wl else ["Industrial", "Crypto/Tech"],
        "minDistressThreshold": random.choice(["$2,000,000", "$5,000,000", "$10,000,000", "$25,000,000"]),
        "alertChannels": random.choice(channels_list),
        "autoIngestEnabled": True
    }
    
    # Generate 3-5 dispatched alerts for this member
    num_alerts = random.randint(3, 5)
    alerts_history = []
    
    for idx in range(num_alerts):
        tpl = alert_templates[idx % len(alert_templates)]
        ch = random.choice(m["customScope"]["alertChannels"])
        disp_time = f"2026-08-05 T{random.randint(9,18):02d}:{random.randint(10,59):02d}:00Z"
        
        alerts_history.append({
            "id": f"alert-{m['id']}-{idx+1}",
            "timestamp": disp_time,
            "headline": tpl["title"],
            "summary": tpl["summary"],
            "ticker": tpl["ticker"],
            "channel": ch,
            "recipientEmail": m["email"],
            "recipientPhone": m.get("phone", "+1 (212) 555-0192"),
            "deliveryStatus": random.choice(statuses),
            "jurisdiction": tpl["jurisdiction"]
        })
    
    m["dispatchedAlertsLog"] = alerts_history
    m["customFeedCount"] = len(alerts_history)

# Write back updated members JSON
with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(members, f, indent=2)

print(f"Successfully populated custom feeds and alert logs for all {len(members)} sandbox members!")
