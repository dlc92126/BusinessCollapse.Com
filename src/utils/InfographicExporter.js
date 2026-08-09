// HTML5 Canvas High-Res PNG Infographic Generator for BusinessCollapse.Com

export function exportCompanyInfographic(company) {
  if (!company) return;

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 675;
  const ctx = canvas.getContext('2d');

  // Background Dark Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 675);
  bgGrad.addColorStop(0, '#070A0F');
  bgGrad.addColorStop(0.5, '#0F172A');
  bgGrad.addColorStop(1, '#1A0814');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 675);

  // Decorative Border & Glow Frame
  ctx.strokeStyle = '#FF3B5C';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 1160, 635);

  ctx.strokeStyle = 'rgba(124, 58, 237, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, 1144, 619);

  // Top Watermark Branding Header
  ctx.fillStyle = '#FF3B5C';
  ctx.font = '900 16px "Courier New", monospace';
  ctx.fillText('BUSINESSCOLLAPSE.COM • THE LEAN NIMBLE TRUTH MACHINE', 50, 65);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 14px sans-serif';
  ctx.fillText('INSTITUTIONAL CORPORATE DISTRESS & CHAPTER 11 POST-MORTEM DOSSIER', 680, 65);

  // Separator Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, 85);
  ctx.lineTo(1150, 85);
  ctx.stroke();

  // Company Name & Ticker Header
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 42px sans-serif';
  ctx.fillText(company.name || 'Corporate Entity', 50, 140);

  ctx.fillStyle = '#FCD34D';
  ctx.font = '900 24px "Courier New", monospace';
  ctx.fillText(`[TICKER: ${company.ticker || 'N/A'}]`, 50 + ctx.measureText(company.name || 'Corporate Entity').width + 20, 136);

  // Metadata Subtitle Line
  ctx.fillStyle = '#C084FC';
  ctx.font = '700 18px sans-serif';
  ctx.fillText(`📍 ${company.locationJurisdiction || 'US Bankruptcy Court'}  •  Sector: ${company.sectorName || 'Retail'}  •  Status: ${company.statusBadge || 'CHAPTER 11'}`, 50, 175);

  // Card 1: Valuation Collapse Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.fillRect(50, 210, 530, 180);
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(50, 210, 530, 180);

  ctx.fillStyle = '#FCA5A5';
  ctx.font = '800 14px sans-serif';
  ctx.fillText('VALUATION COLLAPSE & DEBT AT FILING', 70, 240);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 14px sans-serif';
  ctx.fillText('Peak Valuation:', 70, 280);
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '900 20px "Courier New", monospace';
  ctx.fillText(company.peakValuation || 'N/A', 220, 280);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 14px sans-serif';
  ctx.fillText('Collapse Valuation:', 70, 315);
  ctx.fillStyle = '#EF4444';
  ctx.font = '900 20px "Courier New", monospace';
  ctx.fillText(company.collapseValuation || '$0.00', 220, 315);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 14px sans-serif';
  ctx.fillText('Total Debt at Filing:', 70, 350);
  ctx.fillStyle = '#FCD34D';
  ctx.font = '900 20px "Courier New", monospace';
  ctx.fillText(company.debtAtCollapse || 'N/A', 220, 350);

  // Card 2: DIP Financing & Cash Runway Box
  ctx.fillStyle = 'rgba(20, 15, 30, 0.8)';
  ctx.fillRect(620, 210, 530, 180);
  ctx.strokeStyle = '#C084FC';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(620, 210, 530, 180);

  ctx.fillStyle = '#E9D5FF';
  ctx.font = '800 14px sans-serif';
  ctx.fillText('DEBTOR-IN-POSSESSION (DIP) FINANCING & CASH BURN', 640, 240);

  if (company.dipFinancing) {
    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 14px sans-serif';
    ctx.fillText('DIP Facility Size:', 640, 280);
    ctx.fillStyle = '#F8FAFC';
    ctx.font = '900 20px "Courier New", monospace';
    ctx.fillText(company.dipFinancing.facilitySize, 810, 280);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 14px sans-serif';
    ctx.fillText('Lead Lender:', 640, 315);
    ctx.fillStyle = '#C084FC';
    ctx.font = '800 16px sans-serif';
    ctx.fillText(company.dipFinancing.lender, 810, 315);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 14px sans-serif';
    ctx.fillText('Cash Runway:', 640, 350);
    ctx.fillStyle = company.dipFinancing.cashRunwayDays <= 30 ? '#EF4444' : '#F59E0B';
    ctx.font = '900 20px "Courier New", monospace';
    ctx.fillText(`${company.dipFinancing.cashRunwayDays} Days Left (${company.dipFinancing.weeklyCashBurn})`, 810, 350);
  } else {
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '600 14px sans-serif';
    ctx.fillText('No DIP Super-Priority Loan Facility Recorded.', 640, 290);
  }

  // Summary / Primary Cause Block
  ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
  ctx.fillRect(50, 415, 1100, 160);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.strokeRect(50, 415, 1100, 160);

  ctx.fillStyle = '#FF3B5C';
  ctx.font = '800 14px sans-serif';
  ctx.fillText('PRIMARY CAUSE OF FAILURE & ANATOMY SUMMARY:', 70, 445);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 16px sans-serif';
  const summaryText = company.summary || company.primaryCause || 'Corporate liquidation monitored by AI ingestion engine.';
  // Wrap text simply
  const words = summaryText.split(' ');
  let line = '';
  let y = 475;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 1050 && n > 0) {
      ctx.fillText(line, 70, y);
      line = words[n] + ' ';
      y += 24;
      if (y > 540) break;
    } else {
      line = testLine;
    }
  }
  if (y <= 540) ctx.fillText(line, 70, y);

  // Footer Citation Watermark
  ctx.fillStyle = '#64748B';
  ctx.font = '600 12px "Courier New", monospace';
  ctx.fillText(`VERIFIED SEC EDGAR & PACER DOCKET INGESTION • CITED VIA BUSINESSCOLLAPSE.COM • ${new Date().toISOString().slice(0, 10)}`, 50, 620);

  // Trigger Download
  const link = document.createElement('a');
  link.download = `${(company.name || 'Company').replace(/[^a-z0-9]/gi, '_')}_Distress_Infographic.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
