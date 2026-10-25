#!/usr/bin/env node

/**
 * WCAG 2.1 Relative Luminance and Contrast Ratio calculation
 */
function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function channelLuminance(value) {
  const s = value / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const tests = [
  {
    name: 'Ink on Paper',
    fg: '#15130F',
    bg: '#F3EEE4',
    min: 4.5,
    type: 'Normal text (AA/AAA)',
  },
  {
    name: 'Muted on Paper',
    fg: '#5C574B',
    bg: '#F3EEE4',
    min: 4.5,
    type: 'Normal text (AA)',
  },
  {
    name: 'Spark-ink on Paper',
    fg: '#B22C01',
    bg: '#F3EEE4',
    min: 4.5,
    type: 'Small red text / buttons (AA)',
  },
  {
    name: 'Spark-ink on Surface-dim',
    fg: '#B22C01',
    bg: '#E9E3D8',
    min: 4.5,
    type: 'Small red text on card surface (AA)',
  },
  {
    name: 'Spark on Paper (>=24px)',
    fg: '#D9481F',
    bg: '#F3EEE4',
    min: 3.0,
    type: 'Display text >= 24px (AA Large)',
  },
  {
    name: 'Paper on Ink',
    fg: '#F3EEE4',
    bg: '#15130F',
    min: 4.5,
    type: 'Normal text (AA/AAA)',
  },
  {
    name: 'Muted-on-ink on Ink',
    fg: '#A29D91',
    bg: '#15130F',
    min: 4.5,
    type: 'Normal text (AA)',
  },
  {
    name: 'Spark-glow on Ink',
    fg: '#FF6338',
    bg: '#15130F',
    min: 4.5,
    type: 'Small red text on dark (AA)',
  },
];

console.log('='.repeat(80));
console.log('SYNAPSE COLOR CONTRAST VERIFICATION TABLE (WCAG 2.1)');
console.log('='.repeat(80));
console.log(
  [
    'Combination'.padEnd(26),
    'Hex (FG/BG)'.padEnd(20),
    'Ratio'.padEnd(10),
    'Required'.padEnd(10),
    'Status',
  ].join(' ')
);
console.log('-'.repeat(80));

let hasFailure = false;

for (const t of tests) {
  const ratio = contrastRatio(t.fg, t.bg);
  const ratioStr = `${ratio.toFixed(2)}:1`;
  const reqStr = `>= ${t.min.toFixed(1)}:1`;
  const passed = ratio >= t.min;

  if (!passed) {
    hasFailure = true;
  }

  const status = passed ? 'PASS' : 'FAIL';
  console.log(
    [
      t.name.padEnd(26),
      `${t.fg} / ${t.bg}`.padEnd(20),
      ratioStr.padEnd(10),
      reqStr.padEnd(10),
      status,
    ].join(' ')
  );
}

console.log('='.repeat(80));

if (hasFailure) {
  console.error('ERROR: One or more color contrast ratios failed WCAG AA!');
  process.exit(1);
} else {
  console.log('All token contrast ratios pass WCAG AA requirements.');
  process.exit(0);
}
