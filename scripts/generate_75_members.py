import json
import random

first_names = [
  "Arthur", "Samantha", "Diego", "Elena", "Marcus", "Victoria", "Harrison", "Beatrice", "Sterling", "Chloe",
  "Nathaniel", "Gabriella", "Julian", "Evangeline", "Dominic", "Seraphina", "Sebastian", "Genevieve", "Zachary", "Vivian",
  "Alexander", "Charlotte", "Maximilian", "Penelope", "Theodore", "Audrey", "Gideon", "Camilla", "Tristan", "Isolde",
  "Valerie", "Vincent", "Adriana", "Christian", "Gene", "Jonathan", "Lillian", "Raymond", "Eleanor", "Benjamin",
  "Nora", "Caleb", "Madeline", "Lucas", "Clara", "Julian", "Stella", "Owen", "Violet", "Henry",
  "Lydia", "Wyatt", "Hazel", "Oliver", "Aurora", "Leo", "Savannah", "Miles", "Brooklyn", "Jasper"
]

last_names = [
  "Pendelton", "Vance", "Ramirez", "Rostova", "Sterling", "Chen", "Cross", "Montgomery", "Blackwood", "Dupont",
  "Thorne", "Sinclair", "Vanderbilt", "Mercer", "Kensington", "Hawthorne", "Fairfax", "Kingsley", "Ashford", "Winslow",
  "Miller", "Jenkins", "Croft", "Elliot", "Sutton", "Barrington", "Prescott", "Wellington", "Delaney", "Bancroft",
  "Gallagher", "Langdon", "Holloway", "Stratford", "Davenport", "Pembroke", "Radcliffe", "Somerset", "Standish", "Whitmore"
]

roles_companies = [
  ("Hedge Fund Analyst", "Citadel Special Situations"),
  ("Distressed Debt Partner", "Latham & Watkins LLP"),
  ("Commercial Real Estate Landlord", "Apex Realty Capital"),
  ("Aviation Asset Arbitrageur", "AeroDistress Partners"),
  ("Heavy Equipment Liquidator", "SunState Asset Recovery"),
  ("Chapter 11 Trustee", "Delaware Restructuring Advisors"),
  ("Senior Credit Risk Analyst", "Goldman Sachs Special Credits"),
  ("Bankruptcy Attorney", "Kirkland & Ellis LLP"),
  ("Distressed Retail Arbitrageur", "Blackstone Credit & Distress"),
  ("Turnaround Managing Director", "Alvarez & Marsal"),
  ("Senior Debt Investor", "Oaktree Capital Management"),
  ("Special Situations Portfolio Manager", "Elliott Investment Management"),
  ("CRE Restructuring Lead", "CBRE Capital Markets"),
  ("Asset Liquidation Specialist", "Hilco Industrial"),
  ("Private Equity Restructuring VP", "Apollo Global Management")
]

tiers = ["terminal", "pro", "pro", "terminal", "free", "pro", "terminal"]

locations = [
  "New York, NY", "Chicago, IL", "Wilmington, DE", "Miami, FL", "Dallas, TX",
  "Los Angeles, CA", "Boston, MA", "Atlanta, GA", "San Francisco, CA", "Houston, TX"
]

company_ids = [
  "spirit-airlines", "wework", "tupperware-brands", "bed-bath-beyond", "silicon-valley-bank",
  "ftx-trading", "big-lots", "red-lobster", "express-inc", "fisker-inc"
]

members = []

for i in range(1, 76):
    fname = first_names[(i - 1) % len(first_names)]
    lname = last_names[(i - 1) % len(last_names)]
    name = f"{fname} {lname}"
    email_domain = random.choice(["apexcap.com", "citadeldistress.io", "restructuringadvisors.com", "kirkland.com", "blackstonecredit.com", "hilco.com", "oaktreecap.com"])
    email = f"{fname[0].lower()}.{lname.lower()}@{email_domain}"
    role, company = roles_companies[(i - 1) % len(roles_companies)]
    tier = tiers[(i - 1) % len(tiers)]
    area_code = random.choice([212, 312, 305, 214, 415, 617, 302, 404, 713, 310])
    prefix = random.randint(500, 599)
    line = random.randint(1000, 9999)
    phone = f"+1 ({area_code}) {prefix}-{line}"
    location = locations[(i - 1) % len(locations)]
    
    # Pick 2-4 watchlist entities
    num_wl = random.randint(2, 4)
    wl = random.sample(company_ids, num_wl)
    
    avatar_id = random.randint(1, 70)
    avatar = f"https://i.pravatar.cc/150?img={avatar_id}"
    
    member = {
        "id": f"user-{i:02d}",
        "name": name,
        "email": email,
        "phone": phone,
        "role": role,
        "company": company,
        "organization": company,
        "tier": tier,
        "status": "ACTIVE",
        "avatar": avatar,
        "interests": ["distress", "court-dockets", "auctions"],
        "watchlist": wl,
        "location": location,
        "memberSince": f"2026-0{random.randint(1,8)}-{random.randint(10,28):02d}",
        "apiKey": f"BCC-{tier.upper()}-{random.randint(1000,9999)}-{random.randint(1000,9999)}",
        "crmNotes": [
          {
            "id": f"note-{i:02d}-1",
            "date": "2026-08-04",
            "text": f"Verified SEC EDGAR alert preferences for {wl[0].upper()}. Account active.",
            "author": "System Auto-Ingest"
          }
        ]
    }
    members.append(member)

# Write to sandbox_members.json
out_path = r'c:\Users\dlc92\Projects\BusinessCollapse.Com\src\data\sandbox_members.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(members, f, indent=2)

print(f"Successfully generated {len(members)} realistic sandbox member records!")
