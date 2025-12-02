#!/usr/bin/env node
// Lightweight wrapper to run k6 on Windows even when not on PATH.
// Usage: node tools/run-k6.cjs run k6/login-smoke.js

const { spawnSync, execSync } = require('node:child_process');
const { existsSync } = require('node:fs');
const path = require('node:path');

function findK6() {
  const candidates = [];

  // 1) Explicit env override
  if (process.env.K6_PATH) {
    candidates.push(process.env.K6_PATH);
  }

  // 2) PATH lookup (where on Windows, which otherwise)
  try {
    const cmd = process.platform === 'win32' ? 'where k6' : 'which k6';
    const out = execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    candidates.push(...out);
  } catch {}

  // 3) Common install locations on Windows
  if (process.platform === 'win32') {
    const programFiles = process.env['ProgramFiles'] || 'C://Program Files';
    const programFilesX86 = process.env['ProgramFiles(x86)'] || 'C://Program Files (x86)';
    const chocolateyBin = 'C://ProgramData//chocolatey//bin//k6.exe';
    const localAppData = process.env['LOCALAPPDATA']
      ? path.join(process.env['LOCALAPPDATA'], 'Programs', 'k6', 'k6.exe')
      : null;

    const commonWin = [
      path.join(programFiles, 'k6', 'k6.exe'),
      path.join(programFilesX86, 'k6', 'k6.exe'),
      chocolateyBin,
      localAppData,
    ].filter(Boolean);
    candidates.push(...commonWin);
  }

  // Deduplicate while preserving order
  const seen = new Set();
  for (const c of candidates) {
    if (!c || seen.has(c)) continue;
    seen.add(c);
    if (existsSync(c)) return c;
  }
  return null;
}

function main() {
  const k6Path = findK6();
  if (!k6Path) {
    console.error('[run-k6] Could not find k6.');
    console.error('- Set K6_PATH env var to k6 executable, e.g.:');
    if (process.platform === 'win32') {
      console.error(String.raw`  $env:K6_PATH='C:\Program Files\k6\k6.exe'`);
    } else {
      console.error("  export K6_PATH='/usr/bin/k6'");
    }
    console.error('- Or add k6 to your PATH and open a new terminal.');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  // If invoked as: node tools/run-k6.cjs run k6/login-smoke.js
  // resolve script path to absolute so k6 can find it reliably
  if (args[0] === 'run' && args[1]) {
    const resolved = path.isAbsolute(args[1])
      ? args[1]
      : path.resolve(process.cwd(), args[1]);
    args[1] = resolved;
  }
  const res = spawnSync(k6Path, args, { stdio: 'inherit', shell: false });
  if (typeof res.status === 'number') process.exit(res.status);
  if (res.error) {
    console.error('[run-k6] Failed to start k6:', res.error.message);
    process.exit(1);
  }
  process.exit(0);
}

main();
