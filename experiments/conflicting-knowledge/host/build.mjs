import { build } from '../../../packages/vscode/node_modules/esbuild/lib/main.js';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
await build({ entryPoints: [join(here, 'host.ts')], outfile: join(here, 'out/host.cjs'), bundle: true, platform: 'node', format: 'cjs', external: ['pdfjs-dist'], plugins: [{ name: 'observe-vscode', setup(b) {
  b.onResolve({ filter: /^real-vscode$/ }, () => ({ path: 'vscode', external: true }));
  b.onResolve({ filter: /^vscode$/ }, () => ({ path: join(here, 'observer.ts') }));
} }] });
