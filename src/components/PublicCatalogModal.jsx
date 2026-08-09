import React, { useState } from 'react';
import { X, Eye, Package, ExternalLink, CheckCircle2, ShieldCheck, Tag, Search, Filter } from 'lucide-react';

export default function PublicCatalogModal({ auction, onClose, onOpenBidderModal }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!auction) return null;

  // Specific itemized catalogs per auction
  const catalogLots = auction.entityName.includes('Big Lots') ? [
    { lotNo: 'LOT #101-140', category: 'Store Fixtures', title: 'Heavy-Duty Steel Gondola Shelving Racks (300 Store Footprints)', condition: 'Used - Good', estVal: '$450,000' },
    { lotNo: 'LOT #141-185', category: 'POS Electronics', title: 'NCR RealPOS Touchscreen Terminals & Handheld Scanners (85 Units)', condition: 'Refurbished', estVal: '$125,000' },
    { lotNo: 'LOT #186-220', category: 'Warehouse Equipment', title: 'Raymond Electric Pallet Jacks & Hydraulic Forklifts (14 Units)', condition: 'Operational', estVal: '$280,000' },
    { lotNo: 'LOT #221-300', category: 'Unredeemed Inventory', title: 'Home Furnishings, Outdoor Patio & Seasonal Goods Pallet Lots', condition: 'New in Box', estVal: '$1,200,000' }
  ] : [
    { lotNo: 'LOT #501-540', category: 'Commercial Kitchen', title: 'Vulcan Stainless Steel Deep Fryers & Conveyor Ovens (48 Locations)', condition: 'Commercial Used', estVal: '$380,000' },
    { lotNo: 'LOT #541-580', category: 'Refrigeration', title: 'Walk-In Commercial Freezers & Manitowoc Ice Machines (32 Units)', condition: 'Operational', estVal: '$290,000' },
    { lotNo: 'LOT #581-620', category: 'Dining Furniture', title: 'Dining Room Booth Sets, Tables, Chairs & Hospitality Decor Lots', condition: 'Good Condition', estVal: '$180,000' },
    { lotNo: 'LOT #621-650', category: 'Real Estate Leases', title: 'Prime Restaurant Leasehold Transfer Rights across 48 Shuttered Sites', condition: 'Court Approval Pending', estVal: 'Subject to Bid' }
  ];

  const filteredLots = catalogLots.filter(l =>
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.lotNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 99999, position: 'fixed', inset: 0, background: 'rgba(3, 7, 18, 0.92)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '840px', maxHeight: '90vh', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.5)', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(135deg, rgba(7, 10, 15, 0.98) 0%, rgba(10, 30, 20, 0.98) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Eye size={18} color="#10B981" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                PUBLIC UN-GATED ASSET CATALOG INSPECTION
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF' }}>
              {auction.entityName} — Itemized Auction Lots
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {auction.auctionTitle} • Public Inspection Open (No Sign-Up Required)
            </p>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#FFF', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ padding: '16px 28px', background: 'rgba(15, 23, 42, 0.8)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Search size={16} color="var(--text-dim)" />
          <input
            type="text"
            placeholder="Search lot number, shelving, refrigeration, POS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
          />
        </div>

        {/* Catalog Item Lots List */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredLots.map((lot, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '16px', background: 'rgba(7, 10, 15, 0.6)', borderLeft: '4px solid #10B981', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                    {lot.lotNo}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                    Category: {lot.category}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF' }}>{lot.title}</h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Condition: <strong style={{ color: '#FFF' }}>{lot.condition}</strong>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>ESTIMATED LOT VALUATION</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFE066', fontFamily: 'var(--font-mono)' }}>{lot.estVal}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(7, 10, 15, 0.95)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Ready to bid? Upgrade to PRO for instant Webcast Log-In PINs.
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-secondary" onClick={onClose}>
              Close Catalog
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                onClose();
                if (onOpenBidderModal) onOpenBidderModal(auction);
              }}
              style={{ background: 'linear-gradient(135deg, #10B981 0%, #047857 100%)', fontSize: '0.85rem' }}
            >
              🔐 Access Bidder Log-In & Escrow
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
