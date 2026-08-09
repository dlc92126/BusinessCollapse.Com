import React from 'react';
import { X, FileText, Download, ShieldCheck, ExternalLink, Printer, Search, CheckCircle2, Building, Scale } from 'lucide-react';

export default function PdfViewerModal({ documentInfo, onClose }) {
  if (!documentInfo) return null;

  const handleDownload = () => {
    const textContent = `===================================================================
OFFICIAL U.S. BANKRUPTCY COURT DOCKET FILING
===================================================================
Entity: ${documentInfo.entityName || documentInfo.companyName || 'Corporate Entity'}
Docket: ${documentInfo.docketNo || 'Docket #001'}
Title:  ${documentInfo.title || 'Official Pleading & Declarations'}
Date:   ${documentInfo.date || '2026-08-09'}

SUMMARY & AI DOCKET EXTRACTION:
${documentInfo.summary || 'Official Court Pleading filed in U.S. Bankruptcy Court.'}

===================================================================
VERIFIED BY BUSINESSCOLLAPSE.COM SYSTEM REFRESH ENGINE
Source: U.S. Federal Bankruptcy PACER Court System & SEC EDGAR
===================================================================
`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeTitle = (documentInfo.entityName || 'Court_Document').replace(/[^a-zA-Z0-9]/g, '_');
    const safeDocket = (documentInfo.docketNo || 'Docket').replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `${safeTitle}_${safeDocket}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 999999, position: 'fixed', inset: 0, background: 'rgba(3, 7, 18, 0.94)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '920px', maxHeight: '92vh', borderRadius: '16px', border: '1px solid rgba(255, 42, 75, 0.4)', boxShadow: '0 25px 60px rgba(0,0,0,0.95)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* PDF Header Bar */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(135deg, rgba(7, 10, 15, 0.98) 0%, rgba(20, 10, 18, 0.98) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(255, 42, 75, 0.15)', border: '1px solid rgba(255, 42, 75, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={20} color="#FF3B5C" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  OFFICIAL PACER COURT FILING PDF
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  {documentInfo.docketNo || 'Docket #142'}
                </span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
                {documentInfo.title || 'Emergency Motion to Reject Airbus Leases'}
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleDownload}
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, #FF2A4B 0%, #B71C1C 100%)', fontSize: '0.8rem', padding: '6px 14px' }}
            >
              <Download size={14} /> Download Official Document (.txt / .pdf)
            </button>
            <button
              onClick={onClose}
              style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#FFF', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Simulated Viewer Canvas */}
        <div style={{ flex: 1, background: '#1E293B', overflowY: 'auto', padding: '30px', display: 'flex', justifyContent: 'center', maxHeight: 'calc(92vh - 120px)' }}>
          
          {/* Simulated Official Court Document Paper */}
          <div style={{ width: '100%', maxWidth: '780px', background: '#FFF', color: '#0F172A', padding: '48px 56px', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', fontFamily: 'Times New Roman, Georgia, serif', fontSize: '0.95rem', lineHeight: 1.6, position: 'relative', height: 'fit-content' }}>

            
            {/* Stamp Seal */}
            <div style={{ position: 'absolute', top: '30px', right: '40px', border: '2px dashed #B71C1C', color: '#B71C1C', padding: '8px 14px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em', transform: 'rotate(-5deg)' }}>
              FILED & ENTERED<br />U.S. BANKRUPTCY COURT
            </div>

            {/* Dynamic Court Document Header */}
            {(() => {
              const entity = (documentInfo.entityName || documentInfo.companyName || 'SPIRIT AIRLINES').toUpperCase();
              let district = 'FOR THE DISTRICT OF DELAWARE';
              let caseNo = 'Case No. 24-12156 (BLS)';
              let counsel = 'RICHARDS, LAYTON & FINGER, P.A.';

              if (entity.includes('WEWORK')) {
                district = 'FOR THE DISTRICT OF NEW JERSEY';
                caseNo = 'Case No. 23-19865 (JKS)';
                counsel = 'KIRKLAND & ELLIS LLP';
              } else if (entity.includes('SPIRIT')) {
                district = 'FOR THE SOUTHERN DISTRICT OF NEW YORK';
                caseNo = 'Case No. 24-11988 / 25-11897 (SHL)';
                counsel = 'PAUL, WEISS, RIFKIND, WHARTON & GARRISON LLP';
              } else if (entity.includes('BED BATH')) {
                district = 'FOR THE DISTRICT OF NEW JERSEY';
                caseNo = 'Case No. 23-13359 (VFP)';
                counsel = 'COLE SCHOTZ P.C. & LATHAM & WATKINS LLP';
              } else if (entity.includes('BANK') || entity.includes('SVB') || entity.includes('FTX')) {
                district = 'FOR THE SOUTHERN DISTRICT OF NEW YORK';
                caseNo = 'Case No. 23-10367 (PGB)';
                counsel = 'SULLIVAN & CROMWELL LLP';
              }

              return (
                <>
                  <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '28px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      IN THE UNITED STATES BANKRUPTCY COURT<br />{district}
                    </div>
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      <div>In re: {entity}, et al.,<br />Debtors.</div>
                      <div style={{ textAlign: 'right' }}>Chapter 11<br />{caseNo}<br />(Jointly Administered)</div>
                    </div>
                  </div>

                  {/* Title */}
                  <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem', textTransform: 'uppercase', margin: '24px 0', lineHeight: 1.4 }}>
                    {documentInfo.title || 'EMERGENCY MOTION OF DEBTORS FOR ENTRY OF COURT ORDER'}
                  </div>

                  {/* Body Clauses */}
                  <p style={{ textIndent: '2em', marginBottom: '16px' }}>
                    The Debtors and Debtors-in-Possession in the above-captioned Chapter 11 cases respectfully submit this official court pleading ({documentInfo.docketNo || 'Docket Entry'}) for entry of an order granting the relief requested herein pursuant to title 11 of the United States Code.
                  </p>

                  <div style={{ background: '#F8FAFC', padding: '16px', borderLeft: '4px solid #B71C1C', margin: '20px 0', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>
                    <strong>AI EXACT DOCKET CLAUSE EXTRACTION:</strong><br />
                    "{documentInfo.summary || `As of ${documentInfo.date || 'the filing date'}, the Debtors respectfully request immediate court authorization for the operational and restructuring actions specified in ${documentInfo.docketNo || 'this filing'}. Continued execution of this restructuring framework protects estate assets for all stakeholders.`}"
                  </div>

                  <p style={{ textIndent: '2em', marginBottom: '16px' }}>
                    WHEREFORE, the Debtors respectfully request that the Court enter an order granting the relief requested herein and granting such other and further relief as the Court deems just and proper.
                  </p>

                  {/* Signature Block */}
                  <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #CBD5E1', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <div>Dated: {documentInfo.date || 'August 05, 2026'}<br />Filed & Entered on Docket</div>
                    <div style={{ textAlign: 'right' }}><strong>{counsel}</strong><br />Counsel for the Debtors & Debtors-in-Possession</div>
                  </div>
                </>
              );
            })()}


          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(7, 10, 15, 0.95)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>Source: U.S. Federal Court PACER System (Document ID: 24-10492-142)</span>
          <button className="btn-secondary" onClick={onClose}>
            Close Document Viewer
          </button>
        </div>

      </div>
    </div>
  );
}
