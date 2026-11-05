import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const pluginDir = resolve('node_modules/@jofr/capacitor-media-session');
const entryPoint = join(pluginDir, 'dist/plugin.cjs.js');

if (!existsSync(pluginDir) || existsSync(entryPoint)) {
  process.exit(0);
}

const checkoutDir = mkdtempSync(join(tmpdir(), 'bccsa-media-session-'));

try {
  execFileSync('git', [
    'clone',
    '--depth',
    '1',
    'https://github.com/bccsa/capacitor-media-session.git',
    checkoutDir,
  ], { stdio: 'inherit' });

  for (const entry of ['src', 'rollup.config.js', 'tsconfig.json']) {
    cpSync(join(checkoutDir, entry), join(pluginDir, entry), { recursive: true });
  }

  const tsconfigPath = join(pluginDir, 'tsconfig.json');
  const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'));
  delete tsconfig.files;
  tsconfig.include = ['src/**/*.ts'];
  tsconfig.compilerOptions.types = [];
  writeFileSync(tsconfigPath, `${JSON.stringify(tsconfig, null, 2)}\n`);

  execFileSync('npm', [
    'install',
    '--include=dev',
    '--ignore-scripts',
    '--legacy-peer-deps',
  ], { cwd: pluginDir, stdio: 'inherit' });

  execFileSync('npm', [
    'install',
    '--no-save',
    '--legacy-peer-deps',
    'typescript@5.9.3',
  ], { cwd: pluginDir, stdio: 'inherit' });

  execFileSync('npm', ['run', 'clean'], { cwd: pluginDir, stdio: 'inherit' });
  execFileSync('./node_modules/.bin/tsc', [], { cwd: pluginDir, stdio: 'inherit' });
  execFileSync('./node_modules/.bin/rollup', ['-c', 'rollup.config.js'], {
    cwd: pluginDir,
    stdio: 'inherit',
  });
} finally {
  rmSync(checkoutDir, { recursive: true, force: true });
}
