/**
 * Real-World Entity Name Formatter for BusinessCollapse.Com
 * Cleans generic synthetic placeholders like "Casual Corp #35 (Oklahoma)" or "Oklahoma Enterprise #35 LLC"
 * into authentic, diverse commercial brand names.
 */
const DIVERSE_BRAND_NAMES = [
  "Pinnacle Industrial Logistics",
  "Crestline Heavy Machining",
  "Keystone Freight Systems",
  "Prairie Fleet Operations",
  "Atlas Precision Tooling",
  "Summit Commercial Equipment",
  "Vanguard Logistics & Transport",
  "Meridian Metal Manufacturing",
  "Highland Industrial Services",
  "Frontier Supply Chain Solutions",
  "Beacon Fleet Liquidations",
  "Titan Commercial Machinery",
  "Velocity Freight Lines",
  "Midwest Metal Machining",
  "Peach Tree Commercial Equipment",
  "Gold Coast Industrial Logistics",
  "Apex Commercial Fleet & Equipment",
  "Cimarron Precision Engineering",
  "Cascade Transport Services",
  "Cascade Commercial Supply"
];

export function formatCleanEntityName(item) {
  if (!item) return 'Corporate Entity';
  
  const rawName = typeof item === 'string' ? item : (item.name || item.entityName || item.companyName || '');
  
  if (!rawName) {
    if (typeof item === 'object' && item.auctionTitle) {
      return item.auctionTitle.split('—')[0].trim();
    }
    return 'Corporate Entity';
  }

  // If already clean and authentic (e.g., Spirit Airlines, Tupperware, Red Lobster, Big Lots, Redline Cargo Express)
  if (!rawName.includes('#') && !rawName.includes('Corp #') && !rawName.includes('Enterprise #') && !rawName.includes('(Oklahoma)') && !rawName.includes('(Texas)') && !rawName.includes('(Delaware)')) {
    return rawName;
  }

  // Extract sector, state, and ID for authentic commercial name mapping
  const sector = (typeof item === 'object' ? (item.sectorId || item.sectorName || item.assetLiquidationType || item.primaryCause || '') : '').toLowerCase();
  const location = (typeof item === 'object' ? (item.locationJurisdiction || item.region || '') : '').toLowerCase();
  const isOkla = location.includes('oklahoma') || rawName.includes('Oklahoma');
  const isTex = location.includes('texas') || rawName.includes('Texas');
  const idNum = typeof item === 'object' && item.id ? item.id.replace(/[^0-9]/g, '') : '35';

  const numericId = Math.abs(parseInt(idNum, 10) || 0);
  const brandIndex = numericId % DIVERSE_BRAND_NAMES.length;
  const selectedBrand = DIVERSE_BRAND_NAMES[brandIndex];

  if (rawName.includes('Casual Corp') || sector.includes('dining') || sector.includes('casual')) {
    if (isOkla) return `Cimarron Dining Group #${idNum} LLC`;
    if (isTex) return `Lone Star Hospitality & Grill #${idNum} LLC`;
    return `Heritage Dining & Restaurant Group #${idNum} LLC`;
  }

  if (rawName.includes('Healthcare Corp') || sector.includes('health') || sector.includes('medical')) {
    if (isOkla) return `Sooner State Regional Health System #${idNum}`;
    if (isTex) return `Alamo Regional Medical Center #${idNum}`;
    return `CarePoint Regional Medical Center #${idNum}`;
  }

  if (rawName.includes('Aviation Corp') || sector.includes('aviation') || sector.includes('air')) {
    if (isOkla) return `Thunderbird Aviation & Fleet Maintenance #${idNum} LLC`;
    if (isTex) return `Gulf Coast Fleet Aviation #${idNum} Inc.`;
    return `Skyway Air Freight & Maintenance #${idNum} Inc.`;
  }

  if (rawName.includes('Enterprise #') || rawName.includes('Subchapter V') || sector.includes('fleet') || sector.includes('truck')) {
    if (isOkla) return `Tulsa Regional Fleet & Machining #${idNum} LLC`;
    if (isTex) return `Lone Star Industrial Logistics #${idNum} LLC`;
    return `${selectedBrand} #${idNum} LLC`;
  }

  // Fallback for general Oklahoma pattern names
  if (isOkla) {
    return `Oklahoma Commercial Operations #${idNum} LLC`;
  }

  return rawName;
}
