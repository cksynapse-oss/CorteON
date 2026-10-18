#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  siteSchema,
  programmesSchema,
  floorsSchema,
  principlesSchema,
  doorsSchema,
  homeSchema,
  faqSchema,
  tutorProblemSchema,
  enquirySchema,
  buildingSchema,
  openProblemsSchema,
  ideaSchema,
  fellowshipSchema,
  librarySchema,
  ventureSchema,
  passportSchema,
  centresSchema,
  questionBoardSchema,
  ventureProblemBoardSchema,
  passportCardSchema,
  laneBoardSchema,
  centresModelSchema,
} from '../src/content/schemas.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDir = path.resolve(__dirname, '../src/content');

const isProd =
  process.argv.includes('--prod') ||
  process.argv.includes('--production') ||
  process.env.NODE_ENV === 'production' ||
  process.argv.includes('--check-tbd');

const BANNED_WORDS = [
  // Forbidden vocabulary from AGENTS.md
  'sanctuary',
  'covenant',
  'folio',
  'plate no.',
  'datum',
  'dispatch',
  'transmission',
  'protocol', // special exception: 'design rules' or 'dialogue engine protocol'
  'portal',
  'bench',
  'field station',
  'cell',
  'codex',
  'codices',
  'axiomatic',
  'epistemic',
  'substrate',
  'immutable',
  'cryptographic',
  'scholar',
  'scholars',
  'warden',
  'manifesto',
  'mandate',
  'charter',
  // Promises & outcomes
  'guaranteed',
  'percentile',
  'selection-rate',
  // Forbidden entities from CONTENT.md section 3
  'court road',
  'dispatch@synapse.org',
  'gian chand',
  'chamba solar inverter diagnostics',
  'pangi pass cold-chain guild',
  'the chamba working paper',
  'the chamba foundation mandate',
  'board charter',
  'charter v0.4',
  'sample spec v0.3',
  'passport spec v3.2',
  'monograph no. 04',
  'socratic agent',
  'reasoning circuit',
  'dialogue engine protocol',
  'sha-256',
  'verifiable in boston',
  'all 780 districts',
  'folio mmxxiv',
  'est. 2024',
  'cohort 01',
  'dharamshala',
  'leh',
  '24 operational hours',
  'acceptance within 72 hours',
];

// Specific invented numbers from CONTENT.md remove list
const EXPLICIT_INVENTED_NUMBERS = [
  '510',
  '480',
  '320',
  '240',
  '120',
  '32',
  '48',
  '16',
  '80',
  '42',
  '14',
  'fellow #24',
  '250',
  '3200',
  '3,200',
  '1420',
  '1,420',
  '300',
  '4090',
  '50',
  '1 Gbps',
  '22000',
  '22,000',
  '18000',
  '18,000',
  '600',
  '4500',
  '4,500',
  '82%',
  '96th',
  '94th',
  '98th',
  'v2.4',
  'v0.4',
  'v0.3',
  'v3.2',
  '4.2',
  '06:00',
  '22:00',
  '23:00',
  '08:00',
];

// Whitelist of valid numbers found in verified facts
const ALLOWED_NUMBERS = new Set([
  '8287248119', // phone
  '91', // country code
  '82872', // phone chunk
  '48119', // phone chunk
  '3', // hours 3:30
  '30', // minutes 3:30, 6:30
  '6', // hours 6:30, centres threshold 5-6
  '5', // 5 days a week, centres threshold 5-6
  '1', // 1 class a day, Floor 1, 1 rotating weekday off
  '2', // Floor 2
  '0', // Floor G / 0
  '4', // 4 tracks
  '7', // 7 sections
  '8', // 8 principles
  '01', // door/principle/section 01
  '02', // door/principle/section 02
  '03', // door/principle/section 03
  '04', // door/principle/section 04
  '05', // door/principle/section 05
  '06', // door/principle/section 06
  '07', // door/principle/section 07
  '08', // door/principle/section 08
  '9', // school class stage (Class 9-10)
  '11', // school class stage (Class 11)
  '12', // school class stage (Class 12)
  '24', // callback window 24 hours (owner decision 2026-10-18)
  '2026', // decision year
  '10', // decision month
  '18', // decision day
]);

const ALLOWED_STATUSES = new Set([
  'LIVE NOW',
  'OPENING NEXT',
  'DIRECTION',
  'OPEN',
]);

const ALLOWED_SOURCES = new Set(['owner-confirmed', 'illustrative']);

let errorCount = 0;
let warningCount = 0;

function logError(file, message) {
  console.error(`❌ [ERROR] ${file}: ${message}`);
  errorCount++;
}

function logWarn(file, message) {
  console.warn(`⚠️  [WARN]  ${file}: ${message}`);
  warningCount++;
}

function checkBannedWords(val, filePath, pathStr) {
  if (typeof val !== 'string') return;
  const lower = val.toLowerCase();
  for (const banned of BANNED_WORDS) {
    // Exception: protocol is allowed in 'protocol (except the tutor's design rules)'
    if (banned === 'protocol' && lower.includes('design rules')) {
      continue;
    }
    const regex = new RegExp(
      `\\b${banned.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:s|es)?\\b`,
      'i'
    );
    if (regex.test(lower)) {
      logError(
        filePath,
        `Contains banned word/phrase "${banned}" at ${pathStr}: "${val}"`
      );
    }
  }
}

function checkCurrencySymbols(val, filePath, pathStr) {
  if (typeof val !== 'string') return;
  if (/₹|\bRs\.?\b|\bINR\b/i.test(val)) {
    logError(
      filePath,
      `Fee/Money rule violation: contains currency symbol/term at ${pathStr}: "${val}"`
    );
  }
}

function checkNumbers(val, filePath, pathStr) {
  if (typeof val !== 'string') return;

  // Check explicit invented numbers list
  for (const numStr of EXPLICIT_INVENTED_NUMBERS) {
    const regex = new RegExp(
      `\\b${numStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
      'i'
    );
    if (regex.test(val)) {
      logError(
        filePath,
        `Contains known invented number "${numStr}" at ${pathStr}: "${val}"`
      );
    }
  }

  // General number check: extract all numeric sequences
  const matches = val.match(/\b\d+\b/g);
  if (matches) {
    for (const m of matches) {
      if (!ALLOWED_NUMBERS.has(m)) {
        logError(
          filePath,
          `Contains unverified/invented number "${m}" at ${pathStr}: "${val}"`
        );
      }
    }
  }
}

function checkTBD(val, filePath, pathStr) {
  if (typeof val === 'string' && val.trim() === 'TBD') {
    if (isProd) {
      logError(
        filePath,
        `Unresolved TBD in production at ${pathStr}. (Rule 1: fails production build until owner sets it)`
      );
    } else {
      logWarn(
        filePath,
        `Pending TBD at ${pathStr}. (Will fail production build until owner sets it)`
      );
    }
  }
}

function checkGeneralRules(obj, filePath, currentPath = '') {
  if (obj === null || obj === undefined) return;

  if (typeof obj === 'string') {
    checkTBD(obj, filePath, currentPath);
    checkBannedWords(obj, filePath, currentPath);
    checkCurrencySymbols(obj, filePath, currentPath);
    checkNumbers(obj, filePath, currentPath);
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      checkGeneralRules(item, filePath, `${currentPath}[${index}]`);
    });
    return;
  }

  if (typeof obj === 'object') {
    // Check status chip if present
    if (obj.status && !ALLOWED_STATUSES.has(obj.status)) {
      logError(
        filePath,
        `Invalid status chip "${obj.status}" at ${currentPath}.status. Allowed: ${Array.from(ALLOWED_STATUSES).join(', ')}`
      );
    }

    // Check source if present
    if (obj.source && !ALLOWED_SOURCES.has(obj.source)) {
      logError(
        filePath,
        `Invalid source "${obj.source}" at ${currentPath}.source. Allowed: ${Array.from(ALLOWED_SOURCES).join(', ')}`
      );
    }

    // Check illustrative label if source is illustrative
    if (obj.source === 'illustrative') {
      const hasLabel =
        obj.isIllustrative === true ||
        (typeof obj.name === 'string' && obj.name.includes('ILLUSTRATIVE')) ||
        (typeof obj.label === 'string' && obj.label.includes('ILLUSTRATIVE'));
      if (!hasLabel) {
        logError(
          filePath,
          `Item at ${currentPath} is marked source "illustrative" but lacks visible ILLUSTRATIVE label.`
        );
      }
    }

    // Check fee field copy
    if (obj.fee && obj.fee !== 'Fees are shared when you enquire.') {
      logError(
        filePath,
        `Fee field must strictly be "Fees are shared when you enquire." at ${currentPath}.fee (found: "${obj.fee}")`
      );
    }

    for (const [key, value] of Object.entries(obj)) {
      const nextPath = currentPath ? `${currentPath}.${key}` : key;
      checkGeneralRules(value, filePath, nextPath);
    }
  }
}

function lintFile(fileName, schema = null) {
  const filePath = path.join(contentDir, fileName);
  if (!fs.existsSync(filePath)) {
    logError(fileName, `Required content file does not exist: ${filePath}`);
    return;
  }

  let content;
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    content = JSON.parse(raw);
  } catch (err) {
    logError(fileName, `Failed to parse JSON: ${err.message}`);
    return;
  }

  // 1. Zod schema validation
  if (schema) {
    const result = schema.safeParse(content);
    if (!result.success) {
      logError(
        fileName,
        `Zod schema validation failed:\n  ` +
          result.error.issues
            .map((i) => `${i.path.join('.') || 'root'}: ${i.message}`)
            .join('\n  ')
      );
    }
  }

  // 2. Recursive content rules (TBD, banned words, invented numbers, etc.)
  checkGeneralRules(content, fileName);
}

console.log(
  '================================================================================'
);
console.log(
  `SYNAPSE CONTENT-LINT ${isProd ? '(PRODUCTION MODE)' : '(DEV MODE)'}`
);
console.log(
  '================================================================================'
);

// Lint primary content collections with schemas
lintFile('site.json', siteSchema);
lintFile('programmes.json', programmesSchema);
lintFile('floors.json', floorsSchema);
lintFile('principles.json', principlesSchema);
lintFile('doors.json', doorsSchema);
lintFile('home.json', homeSchema);
lintFile('faq.json', faqSchema);
lintFile('enquiry.json', enquirySchema);
lintFile('building.json', buildingSchema);
lintFile('open-problems.json', openProblemsSchema);
lintFile('idea.json', ideaSchema);
lintFile('fellowship.json', fellowshipSchema);
lintFile('library.json', librarySchema);
lintFile('venture.json', ventureSchema);
lintFile('passport.json', passportSchema);
lintFile('centres.json', centresSchema);
lintFile('illustrative/tutor-problem.json', tutorProblemSchema);
lintFile('illustrative/question-board.json', questionBoardSchema);
lintFile('illustrative/venture-problems.json', ventureProblemBoardSchema);
lintFile('illustrative/passport.json', passportCardSchema);
lintFile('illustrative/lane-board.json', laneBoardSchema);
lintFile('illustrative/centres-model.json', centresModelSchema);

// Lint any additional JSON files in src/content
if (fs.existsSync(contentDir)) {
  const files = fs.readdirSync(contentDir);
  const knownFiles = [
    'site.json',
    'programmes.json',
    'floors.json',
    'principles.json',
    'doors.json',
    'home.json',
    'faq.json',
    'enquiry.json',
    'building.json',
    'open-problems.json',
    'idea.json',
    'fellowship.json',
    'library.json',
    'venture.json',
    'passport.json',
    'centres.json',
  ];
  for (const file of files) {
    if (file.endsWith('.json') && !knownFiles.includes(file)) {
      lintFile(file, null);
    }
  }
}

console.log(
  '--------------------------------------------------------------------------------'
);
if (errorCount > 0) {
  console.error(`FAILED: ${errorCount} error(s), ${warningCount} warning(s).`);
  process.exit(1);
} else {
  console.log(`PASSED: 0 errors, ${warningCount} warning(s).`);
  process.exit(0);
}
