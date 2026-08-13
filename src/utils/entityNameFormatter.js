/**
 * Real-World Entity Name Formatter for BusinessCollapse.Com
 * Converts synthetic placeholders like "Casual Corp #35 (Oklahoma)" or "Oklahoma Enterprise #35 LLC"
 * into 100% realistic, distinct commercial company names WITHOUT generic # number tags.
 */

const OKLAHOMA_FLEET_NAMES = [
  "Tulsa Regional Fleet & Cargo Logistics LLC",
  "Sooner State Heavy Freight Lines Inc.",
  "Oil Capital Transport & Rigging Group",
  "Cimarron Precision Machining & Tooling LLC",
  "Prairie Transport & Supply Chain Corp",
  "Thunderbird Heavy Equipment & Repair LLC",
  "Red River Fleet Operations Inc.",
  "Green Country Fleet Services LLC",
  "Oklahoma Metal Fabrication & Supply",
  "Keystone Heavy Haulers LLC"
];

const TEXAS_FLEET_NAMES = [
  "Lone Star Heavy Fleet & Logistics LLC",
  "Alamo Regional Transport & Supply Corp",
  "Gulf Coast Industrial Machining LLC",
  "Brazos Metal Stamping & Fabrication Inc.",
  "Permian Basin Fleet & Equipment Services",
  "Panhandle Freight & Logistics LLC",
  "Trinity Heavy Machinery & Rigging Corp",
  "Austin Industrial Tooling & Fleet LLC"
];

const GENERAL_FLEET_NAMES = [
  "Pinnacle Industrial Logistics Corp",
  "Crestline Heavy Machining & Fabrication LLC",
  "Keystone Freight Systems Inc.",
  "Atlas Precision Tooling & Equipment LLC",
  "Summit Commercial Fleet Solutions Inc.",
  "Vanguard Logistics & Transport Corp",
  "Meridian Metal Manufacturing LLC",
  "Highland Industrial Services Group",
  "Frontier Supply Chain Solutions Inc.",
  "Beacon Fleet Liquidations LLC",
  "Titan Commercial Machinery & Tooling",
  "Velocity Freight Lines Corp",
  "Midwest Metal Machining LLC",
  "Peach Tree Commercial Equipment Inc.",
  "Gold Coast Industrial Logistics LLC",
  "Apex Freight & Heavy Transport Corp",
  "Cascade Commercial Storage & Logistics",
  "Horizon Industrial Supply Chain LLC",
  "Sterling Fleet Maintenance & Equipment",
  "Pioneer Freight & Machinery Corp"
];

const DINING_RETAIL_NAMES = [
  "Cimarron Dining & Hospitality Group LLC",
  "Lone Star Grill & Restaurant Partners Inc.",
  "Heritage Hospitality & Dining Group LLC",
  "Southern Table Restaurant Operations Inc.",
  "Prairie Oak Retail & Dining Group LLC"
];

const HEALTHCARE_NAMES = [
  "Sooner State Regional Health System Inc.",
  "Alamo Regional Medical Center LLC",
  "CarePoint Regional Health Network Corp",
  "Highland Regional Health System LLC"
];

const AVIATION_NAMES = [
  "Thunderbird Aviation & Fleet Maintenance LLC",
  "Gulf Coast Fleet Aviation Services Inc.",
  "Skyway Air Cargo & Turbine Maintenance LLC",
  "Pinnacle Aviation Flight Spares Inc."
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

  // Extract sector, state, and ID seed for deterministic distinct name selection
  const sector = (typeof item === 'object' ? (item.sectorId || item.sectorName || item.assetLiquidationType || item.primaryCause || '') : '').toLowerCase();
  const location = (typeof item === 'object' ? (item.locationJurisdiction || item.region || '') : '').toLowerCase();
  const isOkla = location.includes('oklahoma') || rawName.includes('Oklahoma');
  const isTex = location.includes('texas') || rawName.includes('Texas');

  const rawIdStr = typeof item === 'object' && item.id ? item.id : rawName;
  let hashSeed = 0;
  for (let i = 0; i < rawIdStr.length; i++) {
    hashSeed = (hashSeed * 31 + rawIdStr.charCodeAt(i)) % 100000;
  }
  const numericId = Math.abs(hashSeed);

  if (rawName.includes('Casual Corp') || sector.includes('dining') || sector.includes('casual')) {
    return DINING_RETAIL_NAMES[numericId % DINING_RETAIL_NAMES.length];
  }

  if (rawName.includes('Healthcare Corp') || sector.includes('health') || sector.includes('medical')) {
    return HEALTHCARE_NAMES[numericId % HEALTHCARE_NAMES.length];
  }

  if (rawName.includes('Aviation Corp') || sector.includes('aviation') || sector.includes('air')) {
    return AVIATION_NAMES[numericId % AVIATION_NAMES.length];
  }

  if (isOkla) {
    return OKLAHOMA_FLEET_NAMES[numericId % OKLAHOMA_FLEET_NAMES.length];
  }

  if (isTex) {
    return TEXAS_FLEET_NAMES[numericId % TEXAS_FLEET_NAMES.length];
  }

  return GENERAL_FLEET_NAMES[numericId % GENERAL_FLEET_NAMES.length];
}
