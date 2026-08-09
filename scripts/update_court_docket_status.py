import json

file_path = r'c:\Users\dlc92\Projects\BusinessCollapse.Com\src\data\companies.json'

with open(file_path, 'r', encoding='utf-8') as f:
    companies = json.load(f)

for c in companies:
    # Set explicit federal court docket status vs operational status
    if c['id'] in ['bed-bath-beyond', 'virgin-orbit', 'fisker-inc', 'yellow-corp', 'convoy-freight']:
        c['courtCaseStatus'] = 'FINAL_DECREE_ISSUED'
        c['finalCourtDecreeDate'] = c.get('dateTimestamp', '2024-01-01')[:4]
        c['docketStatusBadge'] = '⚖️ COURT CASE CLOSED (FINAL DECREE ENTERED)'
    else:
        c['courtCaseStatus'] = 'ACTIVE_DOCKET_IN_PROGRESS'
        c['finalCourtDecreeDate'] = None
        c['docketStatusBadge'] = '⚡ ACTIVE COURT DOCKET (363 SALE / CLAIMS IN PROGRESS)'
    
    c['courtLegalNotice'] = f"NOTICE: While public operations may be suspended or reorganized, this corporate bankruptcy proceeding remains an open judicial docket in {c.get('locationJurisdiction', 'Federal Court')} until entry of a Final Court Decree and Discharge Order."

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(companies, f, indent=2)

print(f"Successfully updated all {len(companies)} company profiles with Federal Court Docket Status fields!")
