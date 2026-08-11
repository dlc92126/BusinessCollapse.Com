import React, { useEffect } from 'react';

const PRIMARY_SEO_TITLE = "BusinessCollapse.com | ⚡ Real-Time Distress Intelligence & Chapter 11 Docket Stream";

export default function SEOHead({ activeTab, selectedCompany, selectedAuction }) {
  useEffect(() => {
    let title = PRIMARY_SEO_TITLE;
    let description = 'The definitive corporate failure tracker, Chapter 11 bankruptcy docket wire, and AI-driven corporate distress index.';

    if (selectedCompany) {
      title = `${selectedCompany.name} (${selectedCompany.ticker || 'PRIVATE'}) Chapter 11 Post-Mortem | BusinessCollapse.com`;
      description = `In-depth bankruptcy case breakdown, failure cause, peak vs liquidation valuation, and timeline for ${selectedCompany.name}.`;
    } else if (selectedAuction) {
      title = `Court Asset Auction: ${selectedAuction.auctionTitle} | BusinessCollapse.com`;
      description = `Section 363 liquidation auction for ${selectedAuction.entityName}. Stalker-horse floor bid: ${selectedAuction.stalkerHorseBid}.`;
    } else {
      if (activeTab === 'graveyard') {
        title = PRIMARY_SEO_TITLE;
      } else if (activeTab === 'auctions') {
        title = 'Section 363 Bankruptcy Asset Auction Directory | BusinessCollapse.com';
      } else if (activeTab === 'heatmap') {
        title = 'Pre-Judicial Distress Heatmap & WARN Leaks | BusinessCollapse.com';
      } else if (activeTab === 'talent_radar') {
        title = 'Executive Talent Raid Radar & KERP Disclosures | BusinessCollapse.com';
      } else if (activeTab === 'sales_conquest') {
        title = 'Sales Conquest & Stranded Account Poaching Terminal | BusinessCollapse.com';
      }
    }

    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [activeTab, selectedCompany, selectedAuction]);

  return null;
}
