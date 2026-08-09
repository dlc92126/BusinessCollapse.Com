import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compDir = path.join(__dirname, '../src/components');
const files = fs.readdirSync(compDir).filter(f => f.endsWith('.jsx'));

const knownComponents = new Set([
  'App', 'Header', 'CompanyGraveyard', 'BreakingNewsHero', 'CompanyDetailModal',
  'AnatomyOfFailure', 'ZombieCryptoTracker', 'WatchlistTracker', 'AuctionDirectory',
  'CourtPortalModal', 'FoundersModal', 'PdfViewerModal', 'PublicCatalogModal',
  'AgentWorkflowStudio', 'ManagerAdminStudio', 'AdmissionCriteriaModal',
  'CustomEntityRequestModal', 'ProRadarPreferencesModal', 'BulletinDetailModal',
  'IndividualAlertBanner', 'ErrorBoundary', 'React', 'Logo', 'MembershipCrmStudio', 'MembershipOnboardingModal', 'UserAccountSettingsModal', 'TabIcon',
  'CapitalStackVisualizer', 'AuctionCompsSandbox', 'DistressHeatmap', 'DiligenceBriefModal', 'MasterAiPromptModal', 'TopTickerMarquee'
]);






let missingCount = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(compDir, file), 'utf8');
  
  // Get imported symbols from lucide-react
  const lucideMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
  const lucideImports = new Set(
    lucideMatch ? lucideMatch[1].split(',').map(s => s.trim().split(' as ')[0]) : []
  );

  // Match all JSX components like <IconName ...
  const matches = content.matchAll(/<([A-Z][a-zA-Z0-9]+)/g);
  for (const m of matches) {
    const compName = m[1];
    if (knownComponents.has(compName)) continue;

    if (!lucideImports.has(compName)) {
      console.error(`❌ MISSING IMPORT: <${compName}> in ${file}`);
      missingCount++;
    }
  }
}

if (missingCount === 0) {
  console.log('✓ ALL LUCIDE ICONS PROPERLY IMPORTED ACROSS ALL COMPONENTS!');
}
