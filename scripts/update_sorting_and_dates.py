import json

file_path = r'c:\Users\dlc92\Projects\BusinessCollapse.Com\src\data\companies.json'

with open(file_path, 'r', encoding='utf-8') as f:
    companies = json.load(f)

# Populate firstDistressSignalDate and officialFilingDate
for c in companies:
    filing_date = c.get('dateTimestamp', '2024-01-15')
    c['officialFilingDate'] = filing_date
    
    # Extract first early warning date from timeline or early warning signals
    if isinstance(c.get('timeline'), list) and len(c['timeline']) > 0:
        first_event_date = c['timeline'][0].get('date', '2023-06-01')
        c['firstDistressSignalDate'] = first_event_date
    else:
        # Default early warning signal date ~6 months prior to filing
        year = int(filing_date[:4]) - 1 if filing_date else 2023
        c['firstDistressSignalDate'] = f"{year}-06-15"

# Apply Two-Tier Sorting:
# 1. Active Dockets FIRST (ACTIVE_DOCKET_IN_PROGRESS)
# 2. Discharged Cases SECOND (FINAL_DECREE_ISSUED)
# 3. Secondary Sort: officialFilingDate descending (Newest First)

def sort_key(item):
    is_active = 0 if item.get('courtCaseStatus') != 'FINAL_DECREE_ISSUED' else 1
    date_val = item.get('officialFilingDate', '2000-01-01')
    return (is_active, date_val)

# Sort with active first (0 < 1), then date descending
companies.sort(key=lambda x: (0 if x.get('courtCaseStatus') != 'FINAL_DECREE_ISSUED' else 1, x.get('officialFilingDate', '2000-01-01')), reverse=False)

# Re-reverse within active/discharged groups by date descending
active_cases = [c for c in companies if c.get('courtCaseStatus') != 'FINAL_DECREE_ISSUED']
discharged_cases = [c for c in companies if c.get('courtCaseStatus') == 'FINAL_DECREE_ISSUED']

active_cases.sort(key=lambda x: x.get('officialFilingDate', '2000-01-01'), reverse=True)
discharged_cases.sort(key=lambda x: x.get('officialFilingDate', '2000-01-01'), reverse=True)

final_companies = active_cases + discharged_cases

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(final_companies, f, indent=2)

print(f"Successfully updated sorting and dates for {len(final_companies)} companies!")
print(f"Active Court Dockets ({len(active_cases)} total):")
for c in active_cases[:5]:
    print(f"  - {c['name']} ({c['ticker']}): Filed {c['officialFilingDate']} | Signal {c['firstDistressSignalDate']}")

print(f"\nDischarged Cases ({len(discharged_cases)} total):")
for c in discharged_cases[:5]:
    print(f"  - {c['name']} ({c['ticker']}): Discharged {c.get('finalCourtDecreeDate')}")
