#!/usr/bin/env node
/**
 * Pele CLI — Ultra-fast Mermaid to SVG renderer
 * (Powered by Obsidian's Pele v1.6.0)
 *
 * Usage:
 *   node pele_cli.js input.mmd [-o output.svg]
 *   node pele_cli.js -e "graph TD; A-->B" [-o output.svg]
 *   cat input.mmd | node pele_cli.js [-o output.svg]
 */

const fs = require('fs');
const path = require('path');

// Load bundled local Pele
const peleBundlePath = path.join(__dirname, 'vendor', 'pele.global.js');
if (!fs.existsSync(peleBundlePath)) {
  console.error(`[pele-cli error] Bundled Pele library not found at: ${peleBundlePath}`);
  process.exit(1);
}

const peleCode = fs.readFileSync(peleBundlePath, 'utf8');
const pele = eval(peleCode + '; pele;');

function showHelp() {
  console.log(`
Pele CLI — 超高速 Mermaid → SVG レンダラー (Pele v1.6.0)

使い方:
  node pele_cli.js <input.mmd> [-o output.svg]
  node pele_cli.js -e "<mermaid code>" [-o output.svg]
  cat input.mmd | node pele_cli.js [-o output.svg]

オプション:
  -o, --output <path>    出力先SVGファイルパス（指定なしの場合は標準出力）
  -e, --eval <code...>   引数としてMermaidコードを直接渡す
  -h, --help             このヘルプを表示

例:
  node pele_cli.js diagram.mmd -o diagram.svg
  node pele_cli.js -e "graph TD; A-->B" -o simple.svg
`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    showHelp();
    process.exit(0);
  }

  let inputFile = null;
  let inlineCode = null;
  let outputPath = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-o' || arg === '--output') {
      outputPath = args[++i];
    } else if (arg === '-e' || arg === '--eval') {
      inlineCode = args[++i];
    } else if (!arg.startsWith('-')) {
      inputFile = arg;
    }
  }

  let mermaidCode = '';

  if (inlineCode) {
    mermaidCode = inlineCode;
  } else if (inputFile) {
    if (!fs.existsSync(inputFile)) {
      console.error(`[pele-cli error] Input file not found: ${inputFile}`);
      process.exit(1);
    }
    mermaidCode = fs.readFileSync(inputFile, 'utf8');
  } else {
    // Read from stdin
    mermaidCode = fs.readFileSync(0, 'utf8');
  }

  // Strip markdown code fences if present (e.g. ```mermaid ... ```)
  mermaidCode = mermaidCode.trim();
  if (mermaidCode.startsWith('```mermaid')) {
    mermaidCode = mermaidCode.replace(/^```mermaid\s*\n?/, '').replace(/\n?```$/, '');
  } else if (mermaidCode.startsWith('```')) {
    mermaidCode = mermaidCode.replace(/^```\s*\n?/, '').replace(/\n?```$/, '');
  }

  try {
    const res = pele.render(mermaidCode);
    if (!res || !res.svg) {
      console.error('[pele-cli error] Failed to generate SVG.');
      process.exit(1);
    }

    if (outputPath) {
      const resolvedOut = path.resolve(outputPath);
      fs.writeFileSync(resolvedOut, res.svg, 'utf8');
      console.log(`[pele-cli] SVG generated successfully: ${resolvedOut} (${res.width}x${res.height})`);
    } else {
      process.stdout.write(res.svg);
    }
  } catch (err) {
    console.error(`[pele-cli parse error]`, err.message || err);
    process.exit(1);
  }
}

main();
