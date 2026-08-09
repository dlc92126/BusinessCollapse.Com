import json

file_path = r'c:\Users\dlc92\Projects\BusinessCollapse.Com\src\data\companies.json'

with open(file_path, 'r', encoding='utf-8') as f:
    companies = json.load(f)

# Sort descending by dateTimestamp or yearCollapsed
companies.sort(key=lambda x: x.get('dateTimestamp', '2000-01-01'), reverse=True)

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(companies, f, indent=2)

print("Successfully sorted companies.json natively newest-first!")
print("Top 5 newest entries:")
for c in companies[:5]:
    print(f" - {c['name']} ({c['ticker']}): {c['dateTimestamp']}")
