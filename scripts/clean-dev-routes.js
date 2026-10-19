#!/usr/bin/env node
/**
 * Exclude development-only routes (/_kit and /kit) from the production build distribution.
 */

import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist');
const devRoutes = ['_kit', 'kit'];

for (const route of devRoutes) {
  const targetPath = path.join(distDir, route);
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
    console.log(
      `[clean-dev-routes] Removed development route from dist: ${route}`
    );
  }
}
