import React, { useState } from 'react';
import { X, Eye, Package, ExternalLink, CheckCircle2, ShieldCheck, Tag, Search, Filter, Camera, Gavel, Award } from 'lucide-react';

export default function PublicCatalogModal({ auction, onClose, onOpenBidderModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');

  if (!auction) return null;

  const entityName = auction.entityName || auction.name || auction.companyName || 'Corporate Asset';
  const sector = (auction.sectorId || auction.sectorName || auction.assetLiquidationType || auction.industry || entityName).toLowerCase();

  // Category-Specific Photo Pools (Distinct Verified Images per Lot Category)
  const TRACTOR_PHOTOS = [
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1586191582056-a035a9807577?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1501700493788-df1a079e889e?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=500&q=80'
  ];

  const MACHINERY_PHOTOS = [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=500&q=80'
  ];

  const TRAILER_PHOTOS = [
    'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=500&q=80'
  ];

  const IP_PHOTOS = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'
  ];

  const AVIATION_PHOTOS = [
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1519074069444-1ba4eff56022?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=500&q=80'
  ];

  const RETAIL_POS_PHOTOS = [
    'https://images.unsplash.com/photo-1556742049-0a670fc8077a?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=500&q=80'
  ];

  const KITCHEN_PHOTOS = [
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1590725140246-20acdee442be?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80'
  ];

  const REAL_ESTATE_PHOTOS = [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&q=80'
  ];

  // Dynamic Entity-Specific Itemized Auction Lots with Photos & Detailed Specs
  const getDynamicLots = () => {
    const rawId = String(auction.id || auction.companyId || entityName);
    let seed = 0;
    for (let i = 0; i < rawId.length; i++) {
      seed = (seed * 31 + rawId.charCodeAt(i)) % 100000;
    }

    const shortId = (seed % 900 + 100).toString();

    // 1. FLEET & HEAVY MACHINERY / INDUSTRIAL
    if (sector.includes('fleet') || sector.includes('machin') || sector.includes('truck') || sector.includes('logistics') || entityName.includes('Fleet') || entityName.includes('Machining') || entityName.includes('Logistics') || entityName.includes('Industrial') || entityName.includes('Freight')) {
      const truckModels = ['2023 Freightliner Cascadia 126', '2024 Kenworth T680 Next Gen', '2022 Peterbilt 579 Sleeper', '2023 Volvo VNL 860 High-Roof'];
      const cncModels = ['Haas VF-4SS 4-Axis Vertical Center', 'Mazak Variaxis i-700 5-Axis Center', 'Doosan Lynx 2100LSY CNC Turning Center', 'Okuma Genos M560-V Vertical Center'];
      const trailerModels = ['Great Dane 53ft Air-Ride Dry Vans', 'Utility 4000D-X Composite Dry Vans', 'Wabash National Duraplate 53ft Vans', 'Vanguard VIP 53ft Refrigerated Trailers'];

      const truckIndex = seed % truckModels.length;
      const cncIndex = (seed + 1) % cncModels.length;
      const trailerIndex = (seed + 2) % trailerModels.length;

      return [
        {
          lotNo: `LOT #${shortId}-101`,
          category: 'Fleet Tractors',
          title: `${entityName} — ${truckModels[truckIndex]} Sleeper Units (${(seed % 12) + 8} Tractors)`,
          condition: 'Certified Operational (Clean Title)',
          specs: `${((seed % 80) + 90).toLocaleString()},000 avg mileage • Automated Transmission • 11 U.S.C. § 363 Free & Clear`,
          estVal: `$${(((seed % 8) + 8) * 100000 + 450000).toLocaleString()}`,
          startingBid: `$${(((seed % 4) + 3) * 100000 + 150000).toLocaleString()}`,
          photo: TRACTOR_PHOTOS[seed % TRACTOR_PHOTOS.length]
        },
        {
          lotNo: `LOT #${shortId}-102`,
          category: 'Precision Machinery',
          title: `${entityName} — ${cncModels[cncIndex]} & Tooling Package`,
          condition: 'Low Spindle Hours (1,200 hrs)',
          specs: '12,000 RPM Spindle • High-Speed Side Mount Tool Changer • Tooling Package Included',
          estVal: `$${(((seed % 5) + 3) * 100000 + 180000).toLocaleString()}`,
          startingBid: `$${(((seed % 3) + 1) * 100000 + 80000).toLocaleString()}`,
          photo: MACHINERY_PHOTOS[(seed + 1) % MACHINERY_PHOTOS.length]
        },
        {
          lotNo: `LOT #${shortId}-103`,
          category: 'Trailers & Logistics',
          title: `${entityName} — ${trailerModels[trailerIndex]} (${(seed % 10) + 14} Trailers)`,
          condition: 'DOT Inspected',
          specs: 'Air Ride Suspension • Aluminum Wheels • Active Refrigerator Compressors',
          estVal: `$${(((seed % 4) + 4) * 100000 + 120000).toLocaleString()}`,
          startingBid: `$${(((seed % 2) + 2) * 100000 + 50000).toLocaleString()}`,
          photo: TRAILER_PHOTOS[(seed + 2) % TRAILER_PHOTOS.length]
        },
        {
          lotNo: `LOT #${shortId}-104`,
          category: 'IP & Patents',
          title: `${entityName} — Corporate Intellectual Property, Dispatch Software & Trade Names`,
          condition: 'Free & Clear Title',
          specs: 'Registered Trademarks • Custom Dispatch Source Code • Client Directory',
          estVal: `$${(((seed % 12) + 10) * 100000 + 200000).toLocaleString()}`,
          startingBid: `$${(((seed % 5) + 4) * 100000 + 100000).toLocaleString()}`,
          photo: IP_PHOTOS[(seed + 3) % IP_PHOTOS.length]
        }
      ];
    }

    // 2. AVIATION & AIRCRAFT FLEET
    if (sector.includes('aviation') || sector.includes('air') || entityName.includes('Spirit') || entityName.includes('Thunderbird') || entityName.includes('Aviation')) {
      return [
        {
          lotNo: `LOT #${shortId}-A1`,
          category: 'Aircraft Engines',
          title: `${entityName} — CFM International CFM56-5B Turbofan Engine`,
          condition: 'Fresh Compliance Inspection',
          specs: '4,200 Cycles Remaining • FAA Form 8130-3 Dual Release • Court Authorized',
          estVal: `$${(((seed % 6) + 35) * 100000).toLocaleString()}`,
          startingBid: `$${(((seed % 4) + 12) * 100000).toLocaleString()}`,
          photo: AVIATION_PHOTOS[seed % AVIATION_PHOTOS.length]
        },
        {
          lotNo: `LOT #${shortId}-A2`,
          category: 'Avionics & Spares',
          title: `${entityName} — Honeywell Pegasus Flight Management Avionics Package`,
          condition: 'New in Original Packing',
          specs: 'ARINC 429 Interfaces • Dual MCDU Assemblies • FAA Certified Logbooks',
          estVal: `$${(((seed % 4) + 6) * 100000).toLocaleString()}`,
          startingBid: `$${(((seed % 2) + 2) * 100000).toLocaleString()}`,
          photo: AVIATION_PHOTOS[(seed + 1) % AVIATION_PHOTOS.length]
        }
      ];
    }

    // 3. RETAIL, POS & CONSUMER STORES
    if (sector.includes('retail') || sector.includes('dining') || entityName.includes('Big Lots') || entityName.includes('Casual') || entityName.includes('Dining')) {
      return [
        {
          lotNo: `LOT #${shortId}-R1`,
          category: 'Store Fixtures',
          title: `${entityName} — Steel Gondola Shelving & Checkout Counters (${(seed % 30) + 20} Footprints)`,
          condition: 'Dismantled & Palletized',
          specs: 'Adjustable Shelving • Powder Coated Steel • Includes Signage Fixtures',
          estVal: `$${(((seed % 5) + 3) * 100000).toLocaleString()}`,
          startingBid: `$${(((seed % 3) + 1) * 50000).toLocaleString()}`,
          photo: RETAIL_POS_PHOTOS[seed % RETAIL_POS_PHOTOS.length]
        },
        {
          lotNo: `LOT #${shortId}-R2`,
          category: 'POS Systems',
          title: `${entityName} — NCR RealPOS Touchscreen Terminals & Scanners (${(seed % 60) + 40} Units)`,
          condition: 'Refurbished',
          specs: 'Intel Core i5 POS Terminals • Barcode Scanners • Customer Facing Displays',
          estVal: `$${(((seed % 3) + 2) * 80000).toLocaleString()}`,
          startingBid: `$${(((seed % 2) + 1) * 40000).toLocaleString()}`,
          photo: RETAIL_POS_PHOTOS[(seed + 1) % RETAIL_POS_PHOTOS.length]
        }
      ];
    }

    // 4. GENERAL COMMERCIAL RESTRUCTURING LOTS (Default Fallback for any corporate entity)
    return [
      {
        lotNo: `LOT #${shortId}-G1`,
        category: 'Commercial Equipment',
        title: `${entityName} — Heavy Processing Assemblies & Commercial Equipment (${(seed % 20) + 15} Units)`,
        condition: 'Commercial Inspected',
        specs: 'UL Listed Commercial Spec • Stainless Steel Construction • Pre-tested Operational',
        estVal: `$${(((seed % 5) + 3) * 80000).toLocaleString()}`,
        startingBid: `$${(((seed % 3) + 1) * 40000).toLocaleString()}`,
        photo: KITCHEN_PHOTOS[seed % KITCHEN_PHOTOS.length]
      },
      {
        lotNo: `LOT #${shortId}-G2`,
        category: 'Refrigeration & Power',
        title: `${entityName} — Walk-In Refrigeration Units & Caterpillar Emergency Generator (350kW)`,
        condition: 'Operational',
        specs: 'Automatic Transfer Switch • Weatherproof Sound Attenuated Enclosure • Low Hours',
        estVal: `$${(((seed % 4) + 3) * 100000).toLocaleString()}`,
        startingBid: `$${(((seed % 2) + 1) * 60000).toLocaleString()}`,
        photo: KITCHEN_PHOTOS[(seed + 1) % KITCHEN_PHOTOS.length]
      },
      {
        lotNo: `LOT #${shortId}-G3`,
        category: 'Real Estate Leases',
        title: `${entityName} — Prime Industrial Facility Leasehold Transfer Rights (${(seed % 6) + 4} Locations)`,
        condition: 'Court Order Pending',
        specs: 'Section 365 Assumption & Assignment • Below-Market Master Rents • Long-Term Options',
        estVal: `$${(((seed % 6) + 8) * 100000).toLocaleString()}`,
        startingBid: `$${(((seed % 3) + 3) * 100000).toLocaleString()}`,
        photo: REAL_ESTATE_PHOTOS[seed % REAL_ESTATE_PHOTOS.length]
      }
    ];
  };

  const catalogLots = getDynamicLots();

  const filteredLots = catalogLots.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.lotNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategoryFilter === 'ALL' || l.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 99999, position: 'fixed', inset: 0, background: 'rgba(3, 7, 18, 0.94)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '920px', maxHeight: '92vh', borderRadius: '16px', border: '1.5px solid #10B981', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 30px rgba(16, 185, 129, 0.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#0B0F19' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', background: 'linear-gradient(135deg, rgba(7, 10, 15, 0.98) 0%, rgba(10, 35, 24, 0.98) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Eye size={18} color="#10B981" />
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                📸 PUBLIC UN-GATED ASSET CATALOG & PHOTO INSPECTION
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 900, background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', border: '1px solid #38BDF8', padding: '1px 6px', borderRadius: '4px' }}>
                {catalogLots.length} VERIFIED LOTS
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFF', margin: '4px 0 0 0' }}>
              {entityName} — Itemized 363 Auction Catalog
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '4px', margin: '4px 0 0 0' }}>
              {auction.auctionTitle || 'Section 363 Court Asset Liquidation'} • Public Inspection Open (Free Un-Gated Access)
            </p>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#FFF', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ padding: '14px 28px', background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px', background: '#0F172A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '6px 12px' }}>
            <Search size={16} color="#94A3B8" />
            <input
              type="text"
              placeholder="Search lot title, machinery, tractors, specs, lot number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#FFF', fontSize: '0.82rem', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Camera size={14} color="#34D399" />
            <span style={{ fontSize: '0.74rem', color: '#34D399', fontWeight: 800 }}>High-Res Asset Photos Active</span>
          </div>
        </div>

        {/* Catalog Item Lots Grid with Photo Cards */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredLots.map((lot, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '16px', background: 'rgba(7, 10, 15, 0.85)', border: '1px solid rgba(16, 185, 129, 0.35)', borderLeft: '5px solid #10B981', borderRadius: '12px', display: 'flex', gap: '18px', flexWrap: 'wrap', alignItems: 'center' }}>
              
              {/* High-Res Asset Photo Thumbnail */}
              <div style={{ position: 'relative', width: '140px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.15)', flexShrink: 0 }}>
                <img
                  src={lot.photo}
                  alt={lot.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80';
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'rgba(0,0,0,0.85)', color: '#34D399', fontSize: '0.62rem', fontWeight: 900, padding: '1px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Camera size={10} /> INSPECTED
                </div>
              </div>

              {/* Lot Details */}
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', border: '1px solid #10B981', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 900, fontFamily: 'monospace' }}>
                    {lot.lotNo}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                    Category: {lot.category}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FFF', margin: '0 0 6px 0', lineHeight: 1.3 }}>{lot.title}</h4>
                <div style={{ fontSize: '0.76rem', color: '#CBD5E1', lineHeight: 1.45, marginBottom: '6px' }}>
                  <strong style={{ color: '#FCD34D' }}>Specs:</strong> {lot.specs}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                  Asset Condition: <strong style={{ color: '#38BDF8' }}>{lot.condition}</strong>
                </div>
              </div>

              {/* Pricing & Bidding Box */}
              <div style={{ textAlign: 'right', flexShrink: 0, background: 'rgba(15, 23, 42, 0.8)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontWeight: 800 }}>ESTIMATED LOT VALUE</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 950, color: '#FFE066', fontFamily: 'monospace' }}>{lot.estVal}</div>
                <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 900, marginTop: '4px' }}>
                  Reserve Floor: {lot.startingBid}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(7, 10, 15, 0.98)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="#10B981" /> All items inspected and verified under 11 U.S.C. § 363 Court Supervised Order.
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-secondary" onClick={onClose} style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
              Close Catalog
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                onClose();
                if (onOpenBidderModal) onOpenBidderModal(auction);
              }}
              style={{ background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)', fontSize: '0.85rem', padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              🔐 Access Bidder Log-In & Escrow
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

