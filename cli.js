#!/usr/bin/env node
import { all } from './index.js';

const [cmd, ...args] = process.argv.slice(2);
const usage = `validatekit — zero-dep validation CLI

Usage: validatekit <command> [options]

Commands:
  check <validator> <value>   Check value against a validator
  list                         List all available validators
  demo                         Show example usage

Options:
  --json                       Output JSON result

Examples:
  validatekit check isEmail "test@example.com"
  validatekit check isUUID "550e8400-e29b-41d4-a716-446655440000"
  validatekit check isIPv4 "192.168.1.1"
  validatekit list --json
`;

if (!cmd || cmd === 'help' || cmd === '--help') {
  console.log(usage);
  process.exit(0);
}

if (cmd === 'list') {
  const names = Object.keys(all).sort();
  if (args.includes('--json')) {
    console.log(JSON.stringify(names));
  } else {
    console.log(`${names.length} validators:\n`);
    for (const name of names) console.log(`  ${name}`);
  }
  process.exit(0);
}

if (cmd === 'demo') {
  const demos = [
    ['isEmail', 'hello@world.com', true],
    ['isEmail', 'not-an-email', false],
    ['isIPv4', '192.168.1.1', true],
    ['isIPv6', '::1', true],
    ['isUUIDv4', '550e8400-e29b-41d4-a716-446655440000', true],
    ['isCreditCard', '4111111111111111', true],
    ['isISBN', '978-3-16-148410-0', true],
    ['isHexColor', '#ff5733', true],
    ['isSemVer', '1.2.3-beta.1+build.5', true],
    ['isBase64', 'SGVsbG8gV29ybGQ=', true],
    ['isPalindrome', 'A man a plan a canal Panama', true],
    ['isPrime', '17', true],
  ];
  console.log('validatekit demo:\n');
  for (const [fn, input, expected] of demos) {
    const result = all[fn](input);
    const ok = result === expected ? '✓' : '✗';
    console.log(`  ${ok} ${fn}(${JSON.stringify(input)}) -> ${result}`);
  }
  process.exit(0);
}

if (cmd === 'check') {
  const filtered = args.filter(a => !a.startsWith('--'));
  const validatorName = filtered[0];
  const value = filtered.slice(1).join(' ');
  const json = args.includes('--json');
  const fn = all[validatorName];
  if (!fn) {
    console.error(`Unknown validator: ${validatorName}`);
    console.error('Run "validatekit list" to see available validators.');
    process.exit(1);
  }
  let parsed = value;
  try { parsed = JSON.parse(value); } catch { /* keep as string */ }
  const result = fn(parsed);
  if (json) {
    console.log(JSON.stringify({ validator: validatorName, input: parsed, valid: result }));
  } else {
    console.log(`${validatorName}(${JSON.stringify(parsed)}) -> ${result}`);
  }
  process.exit(result ? 0 : 1);
}

console.error(`Unknown command: ${cmd}\nRun "validatekit help" for usage.`);
process.exit(1);
