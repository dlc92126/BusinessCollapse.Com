import localtunnel from 'localtunnel';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startTunnel() {
  console.log('Connecting to LocalTunnel...');
  try {
    const tunnel = await localtunnel({ port: 3000 });
    console.log('\n==================================================');
    console.log('🔗 GENE\'S PUBLIC ACCESSIBLE URL:', tunnel.url);
    console.log('==================================================\n');

    fs.writeFileSync(path.join(__dirname, '../tunnel_url.txt'), tunnel.url);

    tunnel.on('close', () => {
      console.log('Tunnel closed. Reconnecting in 3s...');
      setTimeout(startTunnel, 3000);
    });

    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err);
      tunnel.close();
    });
  } catch (err) {
    console.error('Failed to create tunnel:', err);
    setTimeout(startTunnel, 3000);
  }
}

startTunnel();
