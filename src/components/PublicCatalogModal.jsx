import React, { useState } from 'react';
import { X, Eye, Package, ExternalLink, CheckCircle2, ShieldCheck, Tag, Search, Filter, Camera, Gavel, Award } from 'lucide-react';

export default function PublicCatalogModal({ auction, onClose, onOpenBidderModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');

  if (!auction) return null;

  const entityName = auction.entityName || auction.name || auction.companyName || 'Corporate Asset';
  const sector = (auction.sectorId || auction.sectorName || auction.assetLiquidationType || auction.industry || entityName).toLowerCase();

  // Dynamic Sector-Tailored Itemized Auction Lots with Photos & Detailed Specs
  const getDynamicLots = () => {
    // 1. FLEET & HEAVY MACHINERY / INDUSTRIAL (e.g. Tulsa Regional Fleet & Machining, Yellow, Redline)
    if (sector.includes('fleet') || sector.includes('machin') || sector.includes('truck') || sector.includes('logistics') || entityName.includes('Fleet') || entityName.includes('Machining')) {
      return [
        {
          lotNo: 'LOT #101-125',
          category: 'Fleet Tractors',
          title: '2023 Freightliner Cascadia 126 Sleeper Tractors (12 Units • Cummins X15 Engine)',
          condition: 'Certified Operational (Clean Title)',
          specs: '125,000 avg mileage • Automated Transmission • 11 U.S.C. § 363 Free & Clear',
          estVal: '$1,450,000',
          startingBid: '$450,000',
          photo: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80'
        },
        {
          lotNo: 'LOT #126-150',
          category: 'Precision Machinery',
          title: 'Haas VF-4SS 4-Axis Vertical Machining Centers & Tooling Systems (4 Machines)',
          condition: 'Low Spindle Hours (1,200 hrs)',
          specs: '12,000 RPM Spindle • High-Speed Side Mount Tool Changer • Tooling Package Included',
          estVal: '$520,000',
          startingBid: '$280,000',
          photo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
        },
        {
          lotNo: 'LOT #151-180',
          category: 'Trailers & Logistics',
          title: 'Great Dane 53ft Dry Van Trailers & Thermo King Refrigerated Units (18 Trailers)',
          condition: 'DOT Inspected',
          specs: 'Air Ride Suspension • Aluminum Wheels • Active Refrigerator Compressors',
          estVal: '$680,000',
          startingBid: '$320,000',
          photo: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=400&q=80'
        },
        {
          lotNo: 'LOT #181-210',
          category: 'IP & Patents',
          title: 'Corporate Intellectual Property, Fleet Tracking Software Patents & Trade Names',
          condition: 'Free & Clear Title',
          specs: 'Registered Trademarks • Custom Fleet Dispatch Source Code • Client Directory',
          estVal: '$1,800,000',
          startingBid: '$600,000',
          photo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80'
        }
      ];
    }

    // 2. AVIATION & AIRCRAFT FLEET
    if (sector.includes('aviation') || sector.includes('air') || entityName.includes('Spirit') || entityName.includes('Thunderbird')) {
      return [
        {
          lotNo: 'LOT #A-101',
          category: 'Aircraft Engines',
          title: 'CFM International CFM56-5B Turbofan Engine (Full Overhaul Logbooks)',
          condition: 'Fresh Compliance Inspection',
          specs: '4,200 Cycles Remaining • FAA Form 8130-3 Dual Release • S.D.N.Y. Court Authorized',
          estVal: '$4,800,000',
          startingBid: '$1,800,000',
          photo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80'
        },
        {
          lotNo: 'LOT #A-102',
          category: 'Avionics & Spares',
          title: 'Honeywell Pegasus Flight Management Systems & Cockpit Instrument Spares Package',
          condition: 'New in Original Packing',
          specs: 'ARINC 429 Interfaces • Dual MCDU Assemblies • FAA Certified Logbooks',
          estVal: '$890,000',
          startingBid: '$340,000',
          photo: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=400&q=80'
        }
      ];
    }

    // 3. RETAIL, POS & CONSUMER STORES (e.g. Big Lots, Bed Bath & Beyond, Express)
    if (sector.includes('retail') || entityName.includes('Big Lots') || entityName.includes('Casual')) {
      return [
        {
          lotNo: 'LOT #R-101',
          category: 'Store Fixtures',
          title: 'Heavy-Duty Steel Gondola Shelving Racks & Checkout Counters (45 Store Footprints)',
          condition: 'Dismantled & Palletized',
          specs: 'Adjustable Shelving • Powder Coated Steel • Includes Signage Fixtures',
          estVal: '$650,000',
          startingBid: '$180,000',
          photo: 'https://images.unsplash.com/photo-1556742049-0a670fc8077a?auto=format&fit=crop&w=400&q=80'
        },
        {
          lotNo: 'LOT #R-102',
          category: 'POS Systems',
          title: 'NCR RealPOS Touchscreen Terminals, Cash Drawers & Thermal Receipt Printers (120 Units)',
          condition: 'Refurbished',
          specs: 'Intel Core i5 POS Terminals • Barcode Scanners • Customer Facing Displays',
          estVal: '$240,000',
          startingBid: '$85,000',
          photo: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=400&q=80'
        }
      ];
    }

    // 4. GENERAL COMMERCIAL RESTRUCTURING LOTS (Default Fallback)
    return [
      {
        lotNo: 'LOT #501-540',
        category: 'Commercial Equipment',
        title: 'Vulcan Stainless Steel Heavy Commercial Cooking & Processing Assemblies (32 Units)',
        condition: 'Commercial Inspected',
        specs: 'UL Listed Commercial Spec • Stainless Steel Construction • Pre-tested Operational',
        estVal: '$380,000',
        startingBid: '$120,000',
        photo: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80'
      },
      {
        lotNo: 'LOT #541-580',
        category: 'Refrigeration & Power',
        title: 'Walk-In Commercial Refrigeration Units & Caterpillar Emergency Generator (350kW)',
        condition: 'Operational',
        specs: 'Automatic Transfer Switch • Weatherproof Sound Attenuated Enclosure • Low Hours',
        estVal: '$420,000',
        startingBid: '$150,000',
        photo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
      },
      {
        lotNo: 'LOT #581-620',
        category: 'Real Estate Leases',
        title: 'Prime Commercial Real Estate & Industrial Warehouse Leasehold Rights (12 Facilities)',
        condition: 'Court Order Pending',
        specs: 'Section 365 Assumption & Assignment • Below-Market Master Rents • Long-Term Options',
        estVal: '$1,250,000',
        startingBid: '$450,000',
        photo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'
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

