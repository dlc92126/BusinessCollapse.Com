/**
 * High-Precision State Code Extraction Utility for BusinessCollapse.Com
 * Uses full state name dictionary and word-boundary regex matching across all jurisdiction fields.
 */
const STATE_NAME_TO_CODE = {
  'ALABAMA': 'AL', 'ALASKA': 'AK', 'ARIZONA': 'AZ', 'ARKANSAS': 'AR', 'CALIFORNIA': 'CA',
  'COLORADO': 'CO', 'CONNECTICUT': 'CT', 'DELAWARE': 'DE', 'FLORIDA': 'FL', 'GEORGIA': 'GA',
  'HAWAII': 'HI', 'IDAHO': 'ID', 'ILLINOIS': 'IL', 'INDIANA': 'IN', 'IOWA': 'IA',
  'KANSAS': 'KS', 'KENTUCKY': 'KY', 'LOUISIANA': 'LA', 'MAINE': 'ME', 'MARYLAND': 'MD',
  'MASSACHUSETTS': 'MA', 'MICHIGAN': 'MI', 'MINNESOTA': 'MN', 'MISSISSIPPI': 'MS', 'MISSOURI': 'MO',
  'MONTANA': 'MT', 'NEBRASKA': 'NE', 'NEVADA': 'NV', 'NEW HAMPSHIRE': 'NH', 'NEW JERSEY': 'NJ',
  'NEW MEXICO': 'NM', 'NEW YORK': 'NY', 'NORTH CAROLINA': 'NC', 'NORTH DAKOTA': 'ND', 'OHIO': 'OH',
  'OKLAHOMA': 'OK', 'OREGON': 'OR', 'PENNSYLVANIA': 'PA', 'RHODE ISLAND': 'RI', 'SOUTH CAROLINA': 'SC',
  'SOUTH DAKOTA': 'SD', 'TENNESSEE': 'TN', 'TEXAS': 'TX', 'UTAH': 'UT', 'VERMONT': 'VT',
  'VIRGINIA': 'VA', 'WASHINGTON': 'WA', 'WEST VIRGINIA': 'WV', 'WISCONSIN': 'WI', 'WYOMING': 'WY'
};

export function extractStateCode(item) {
  if (!item) return '';

  // 1. Direct 2-letter state code check
  if (item.region && typeof item.region === 'string' && item.region.length === 2 && item.region !== 'US' && item.region !== 'ALL') {
    return item.region.toUpperCase();
  }

  const textToSearch = [
    item.region,
    item.locationJurisdiction,
    item.state,
    item.name,
    item.entityName,
    item.companyName,
    item.summary,
    item.claimsAgent
  ].filter(Boolean).join(' ').toUpperCase();

  // 2. Full State Name Matching (e.g. "OKLAHOMA" -> "OK", "DELAWARE" -> "DE")
  for (const [stateName, code] of Object.entries(STATE_NAME_TO_CODE)) {
    if (textToSearch.includes(stateName)) {
      return code;
    }
  }

  // 3. Standalone 2-Letter Abbreviation Match
  const stateMatch = textToSearch.match(/\b(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\b/);

  if (stateMatch && stateMatch[1]) {
    return stateMatch[1].toUpperCase();
  }

  return '';
}
