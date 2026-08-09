import React, { useEffect } from 'react';

export default function SEOHead({ activeTab, selectedCompany, selectedAuction }) {
  useEffect(() => {
    let title = 'BusinessCollapse.com | Corporate Graveyard, PACER Bankruptcy Dockets & AI Risk Index';
    let description = 'The definitive corporate graveyard, Chapter 11 bankruptcy docket tracker, and AI-driven corporate distress index.';

    if (selectedCompany) {
      title = `${selectedCompany.name} (${selectedCompany.ticker || 'PRIVATE'}) Chapter 11 Post-Mortem | BusinessCollapse.com`;
      description = `In-depth bankruptcy case breakdown, failure cause, peak vs liquidation valuation, and timeline for ${selectedCompany.name}.`;
    } else if (selectedAuction) {
      title = `Court Asset Auction: ${selectedAuction.auctionTitle} | BusinessCollapse.com`;
      description = `Section 363 liquidation auction for ${selectedAuction.entityName}. Stalker-horse floor bid: ${selectedAuction.stalkerHorseBid}.`;
    } else {
      switch (activeTab) {
        case 'graveyard':
          title = 'Corporate Graveyard & Chapter 11 Bankruptcy Index | BusinessCollapse.com';
          description = 'Browse recent corporate bankruptcies, Chapter 11 court dockets, and failure post-mortems.';
          break;
        case 'auctions':
          title = 'Section 363 Bankruptcy Asset Auction Directory | BusinessCollapse.com';
          description = 'Court-ordered liquidation auctions, bidder pre-registration PINs, and Stalker-Horse floor bids.';
          break;
        case 'sectors':
          title = 'Sector Distress Risk Heatmap & Macro Ratings | BusinessCollapse.com';
          description = 'Quantitative distress risk scores (0-100/100) for Commercial Real Estate, Retail, Aviation, and Crypto.';
          break;
        case 'anatomy':
          title = 'Anatomy of Corporate Failure Diagnostic Lab | BusinessCollapse.com';
          description = 'Interactive failure pattern analysis comparing capital structure flaws across historical corporate collapses.';
          break;
        case 'crypto':
          title = 'Zombie Crypto Protocol & Insolvency Tracker | BusinessCollapse.com';
          description = 'Audit of insolvent crypto protocols, locked TVL, and restructuring recovery claims.';
          break;
        case 'agent':
          title = 'Autonomous System Refresh Agent Logs & Court Crawlers | BusinessCollapse.com';
          description = 'Real-time telemetry and PACER court docket parsing logs for the BusinessCollapse.com AI ingestion engine.';
          break;
        default:
          break;
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
