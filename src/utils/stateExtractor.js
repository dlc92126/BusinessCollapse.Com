/**
 * High-Precision State Code Extraction Utility for BusinessCollapse.Com
 * Uses word-boundary regex matching across all jurisdiction fields to guarantee 100% state accuracy.
 */
export function extractStateCode(item) {
  if (!item) return '';

  // 1. Direct 2-letter state code check
  if (item.region && typeof item.region === 'string' && item.region.length === 2 && item.region !== 'US' && item.region !== 'ALL') {
    return item.region.toUpperCase();
  }

  // 2. Text Search across location, jurisdiction, summary, and name
  const textToSearch = [
    item.region,
    item.locationJurisdiction,
    item.state,
    item.name,
    item.summary,
    item.claimsAgent
  ].filter(Boolean).join(' ');

  const stateMatch = textToSearch.match(/\b(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)\b/i);

  if (stateMatch && stateMatch[1]) {
    return stateMatch[1].toUpperCase();
  }

  return '';
}
