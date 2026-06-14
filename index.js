/**
 * validatekit — Zero-dep validation library
 * 90+ validators: type checks, format checks, number checks, string checks, composition
 */

// ═══════════════════════════════════════════════════════════
// TYPE CHECKS
// ═══════════════════════════════════════════════════════════

export function isNull(v) { return v === null; }
export function isUndefined(v) { return v === void 0; }
export function isNil(v) { return v == null; }
export function isString(v) { return typeof v === 'string'; }
export function isNumber(v) { return typeof v === 'number' && !Number.isNaN(v); }
export function isBoolean(v) { return typeof v === 'boolean'; }
export function isSymbol(v) { return typeof v === 'symbol'; }
export function isBigInt(v) { return typeof v === 'bigint'; }
export function isFunction(v) { return typeof v === 'function'; }
export function isObject(v) { return v !== null && typeof v === 'object'; }
export function isArray(v) { return Array.isArray(v); }
export function isDate(v) { return v instanceof Date && !Number.isNaN(v.getTime()); }
export function isRegExp(v) { return v instanceof RegExp; }
export function isError(v) { return v instanceof Error; }
export function isMap(v) { return v instanceof Map; }
export function isSet(v) { return v instanceof Set; }
export function isWeakMap(v) { return v instanceof WeakMap; }
export function isWeakSet(v) { return v instanceof WeakSet; }
export function isPromise(v) {
  return v instanceof Promise || (isObject(v) && isFunction(v.then));
}
export function isPrimitive(v) {
  return v === null || (typeof v !== 'object' && typeof v !== 'function');
}
export function isPlainObject(v) {
  if (v === null || typeof v !== 'object') return false;
  const proto = Object.getPrototypeOf(v);
  return proto === null || proto === Object.prototype;
}
export function isTypedArray(v) {
  return ArrayBuffer.isView(v) && !(v instanceof DataView);
}
export function isArrayBuffer(v) { return v instanceof ArrayBuffer; }
export function isDataView(v) { return v instanceof DataView; }
export function isClass(v) {
  return isFunction(v) && /^\s*class\s+/.test(Function.prototype.toString.call(v));
}
export function isAsyncFunction(v) {
  return isFunction(v) && v.constructor && v.constructor.name === 'AsyncFunction';
}
export function isArrowFunction(v) {
  if (!isFunction(v)) return false;
  const src = Function.prototype.toString.call(v);
  return !src.startsWith('function') && !src.startsWith('class') && !src.startsWith('AsyncFunction');
}
export function isIterable(v) {
  return v != null && isFunction(v[Symbol.iterator]);
}
export function isAsyncIterable(v) {
  return v != null && isFunction(v[Symbol.asyncIterator]);
}
export function isGenerator(v) {
  return isObject(v) && isFunction(v.next) && isFunction(v.throw);
}
export function isConstructor(v) {
  if (!isFunction(v)) return false;
  try { Reflect.construct(v, []); return true; } catch { return false; }
}

// ═══════════════════════════════════════════════════════════
// EMPTY / TRUTHY
// ═══════════════════════════════════════════════════════════

export function isEmpty(v) {
  if (v == null) return true;
  if (isString(v) || isArray(v)) return v.length === 0;
  if (isMap(v) || isSet(v)) return v.size === 0;
  if (isObject(v)) return Object.keys(v).length === 0;
  return false;
}
export function isTruthy(v) { return !!v; }
export function isFalsy(v) { return !v; }

// ═══════════════════════════════════════════════════════════
// NUMBER CHECKS
// ═══════════════════════════════════════════════════════════

export function isInteger(v) { return Number.isInteger(v); }
export function isSafeInteger(v) { return Number.isSafeInteger(v); }
export function isFloat(v) { return isNumber(v) && v % 1 !== 0; }
export function isNaN(v) { return Number.isNaN(v); }
export function isFinite(v) { return Number.isFinite(v); }
export function isPositive(v) { return isNumber(v) && v > 0; }
export function isNegative(v) { return isNumber(v) && v < 0; }
export function isNonNegative(v) { return isNumber(v) && v >= 0; }
export function isNonPositive(v) { return isNumber(v) && v <= 0; }
export function isZero(v) { return v === 0; }
export function isEven(v) { return isInteger(v) && v % 2 === 0; }
export function isOdd(v) { return isInteger(v) && v % 2 !== 0; }
export function isPrime(v) {
  if (!isInteger(v) || v < 2) return false;
  if (v === 2) return true;
  if (v % 2 === 0) return false;
  for (let i = 3; i * i <= v; i += 2) if (v % i === 0) return false;
  return true;
}
export function isDivisibleBy(n, d) {
  if (d === undefined) return (v) => isInteger(v) && isInteger(n) && n !== 0 && v % n === 0;
  return isInteger(n) && isInteger(d) && d !== 0 && n % d === 0;
}
export function isInRange(v, min, max) {
  if (min === undefined) { const [a,b] = (Array.isArray(v)?v:[]); return (val) => val >= a && val <= b; }
  return v >= min && v <= max;
}
export function isBetween(v, min, max) {
  if (min === undefined) { const [a,b] = (Array.isArray(v)?v:[]); return (val) => val > a && val < b; }
  return v > min && v < max;
}
export function isPowerOfTwo(v) {
  return isInteger(v) && v > 0 && (v & (v - 1)) === 0;
}
export function isPerfectSquare(v) {
  if (!isNonNegative(v)) return false;
  const sqrt = Math.sqrt(v);
  return sqrt === Math.floor(sqrt);
}

// ═══════════════════════════════════════════════════════════
// STRING CHECKS
// ═══════════════════════════════════════════════════════════

export function isAlpha(s) {
  return isString(s) && s.length > 0 && /^[a-zA-Z]+$/.test(s);
}
export function isAlphanumeric(s) {
  return isString(s) && s.length > 0 && /^[a-zA-Z0-9]+$/.test(s);
}
export function isNumeric(s) {
  return isString(s) && s.length > 0 && /^[0-9]+$/.test(s);
}
export function isAlphaDash(s) {
  return isString(s) && /^[a-zA-Z0-9_-]+$/.test(s);
}
export function isLowerCase(s) {
  return isString(s) && s.length > 0 && s === s.toLowerCase() && s !== s.toUpperCase();
}
export function isUpperCase(s) {
  return isString(s) && s.length > 0 && s === s.toUpperCase() && s !== s.toLowerCase();
}
export function isCapitalized(s) {
  return isString(s) && s.length > 0 && s[0] === s[0].toUpperCase();
}
export function isPalindrome(s) {
  if (!isString(s)) return false;
  const norm = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return norm.length > 0 && norm === norm.split('').reverse().join('');
}
export function isSlug(s) {
  return isString(s) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
}
export function isHex(s) {
  return isString(s) && s.length > 0 && /^[0-9a-fA-F]+$/.test(s);
}
export function isBase64(s) {
  if (!isString(s) || s.length === 0) return false;
  return /^[A-Za-z0-9+/]*={0,2}$/.test(s) && s.length % 4 === 0;
}
export function isBase64URL(s) {
  if (!isString(s) || s.length === 0) return false;
  return /^[A-Za-z0-9_-]+$/.test(s);
}
export function isBase32(s) {
  if (!isString(s) || s.length === 0) return false;
  return /^[A-Z2-7]*={0,6}$/.test(s) && s.length % 8 === 0;
}
export function isASCII(s) {
  if (!isString(s)) return false;
  for (let i = 0; i < s.length; i++) if (s.charCodeAt(i) > 127) return false;
  return true;
}
export function isMultibyte(s) {
  return isString(s) && /[^\x00-\x7F]/.test(s);
}
export function hasMinLength(s, n) {
  if (n === undefined) return (v) => isString(v) && v.length >= s;
  return isString(s) && s.length >= n;
}
export function hasMaxLength(s, n) {
  if (n === undefined) return (v) => isString(v) && v.length <= s;
  return isString(s) && s.length <= n;
}
export function hasLength(s, min, max) {
  const arity = arguments.length;
  if (arity === 1) return (v) => isString(v) && v.length === s;
  if (arity === 2 && typeof s === 'number') return (v) => isString(v) && v.length >= s && v.length <= min;
  if (!isString(s)) return false;
  if (max !== undefined) return s.length >= min && s.length <= max;
  return s.length === min;
}

// ═══════════════════════════════════════════════════════════
// FORMAT CHECKS
// ═══════════════════════════════════════════════════════════

export function isEmail(s) {
  if (!isString(s)) return false;
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(s);
}

export function isURL(s, opts = {}) {
  if (!isString(s)) return false;
  try {
    const u = new URL(s);
    if (opts.protocols && !opts.protocols.includes(u.protocol.replace(':', ''))) return false;
    if (opts.requireTld === true && u.hostname && !u.hostname.includes('.')) return false;
    return true;
  } catch { return false; }
}

export function isIPv4(s) {
  if (!isString(s)) return false;
  const parts = s.split('.');
  if (parts.length !== 4) return false;
  return parts.every(p => /^\d{1,3}$/.test(p) && Number(p) <= 255 && String(Number(p)) === p);
}

export function isIPv6(s) {
  if (!isString(s)) return false;
  if (s === '::') return true;
  // Handle IPv4-mapped: ::ffff:1.2.3.4
  const lastColon = s.lastIndexOf(':');
  if (lastColon !== -1 && s.substring(lastColon + 1).includes('.')) {
    if (!isIPv4(s.substring(lastColon + 1))) return false;
    const prefix = s.substring(0, lastColon + 1);
    return _validateIPv6Body(prefix + '0:0'); // replace v4 with 2 groups
  }
  return _validateIPv6Body(s);
}

function _validateIPv6Body(s) {
  if (s === '::') return true;
  const idx = s.indexOf('::');
  if (idx !== -1 && s.indexOf('::', idx + 1) !== -1) return false; // multiple ::
  const parts = s.split(':');
  if (parts.length < 3 || parts.length > 8) return false;
  let hasEmpty = false;
  let nonEmpty = 0;
  for (const p of parts) {
    if (p === '') { hasEmpty = true; continue; }
    if (!/^[0-9a-fA-F]{1,4}$/.test(p)) return false;
    nonEmpty++;
  }
  // With :: we can have fewer than 8 groups
  if (hasEmpty) return nonEmpty <= 7;
  return parts.length === 8 && nonEmpty === 8;
}

export function isIP(s) { return isIPv4(s) || isIPv6(s); }

export function isPort(v) {
  const n = Number(v);
  return Number.isInteger(n) && n >= 0 && n <= 65535;
}

export function isUUID(s) {
  return isString(s) && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
}
export function isUUIDv4(s) {
  return isString(s) && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);
}
export function isUUIDv7(s) {
  return isString(s) && /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);
}

export function isHexColor(s) {
  return isString(s) && /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(s);
}
export function isRGBColor(s) {
  if (!isString(s)) return false;
  const m = s.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
  if (!m) return false;
  return m.slice(1).every(n => Number(n) <= 255);
}
export function isHSLColor(s) {
  if (!isString(s)) return false;
  const m = s.match(/^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i);
  if (!m) return false;
  return Number(m[1]) <= 360 && Number(m[2]) <= 100 && Number(m[3]) <= 100;
}

export function isJSON(s) {
  if (!isString(s)) return false;
  try { JSON.parse(s); return true; } catch { return false; }
}

export function isISOString(s) {
  if (!isString(s)) return false;
  const d = new Date(s);
  return !Number.isNaN(d.getTime()) && s === d.toISOString();
}

export function isTimestamp(v) {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 && n < 4102444800; // before year 2100
}

export function isCreditCard(s) {
  if (!isString(s)) return false;
  const cleaned = s.replace(/[\s-]/g, '');
  if (!/^\d{13,19}$/.test(cleaned)) return false;
  let sum = 0, dbl = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let d = Number(cleaned[i]);
    if (dbl) { d *= 2; if (d > 9) d -= 9; }
    sum += d; dbl = !dbl;
  }
  return sum % 10 === 0;
}

export function isISBN(s) {
  if (!isString(s)) return false;
  const cleaned = s.replace(/[-\s]/g, '');
  if (/^\d{10}$/.test(cleaned)) {
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += Number(cleaned[i]) * (10 - i);
    sum += cleaned[9] === 'X' ? 10 : Number(cleaned[9]);
    return sum % 11 === 0;
  }
  if (/^\d{13}$/.test(cleaned)) {
    let sum = 0;
    for (let i = 0; i < 12; i++) sum += Number(cleaned[i]) * (i % 2 === 0 ? 1 : 3);
    return ((10 - (sum % 10)) % 10) === Number(cleaned[12]);
  }
  return false;
}

export function isISSN(s) {
  if (!isString(s)) return false;
  const cleaned = s.replace(/[-\s]/g, '').toUpperCase();
  if (!/^\d{7}[\dX]$/.test(cleaned)) return false;
  let sum = 0;
  for (let i = 0; i < 7; i++) sum += Number(cleaned[i]) * (8 - i);
  const check = (11 - (sum % 11)) % 11;
  const expected = check === 10 ? 'X' : String(check);
  return cleaned[7] === expected;
}

export function isEAN(s) {
  if (!isString(s)) return false;
  if (!/^\d{13}$/.test(s)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(s[i]) * (i % 2 === 0 ? 1 : 3);
  return ((10 - (sum % 10)) % 10) === Number(s[12]);
}

export function isMACAddress(s) {
  if (!isString(s)) return false;
  const cleaned = s.replace(/[-:.]/g, '');
  return /^[0-9a-fA-F]{12}$/.test(cleaned);
}

export function isIMEI(s) {
  if (!isString(s)) return false;
  const cleaned = s.replace(/[-\s]/g, '');
  if (!/^\d{15}$/.test(cleaned)) return false;
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    let d = Number(cleaned[i]);
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return (sum + Number(cleaned[14])) % 10 === 0;
}

export function isIBAN(s) {
  if (!isString(s)) return false;
  const cleaned = s.replace(/\s/g, '').toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(cleaned) || cleaned.length < 15 || cleaned.length > 34) return false;
  // Rearrange: first 4 chars to end, map A=10..Z=35
  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
  let str = '';
  for (const c of rearranged) str += /[A-Z]/.test(c) ? String(c.charCodeAt(0) - 55) : c;
  // Large number mod 97 — do it in chunks
  let remainder = 0;
  for (let i = 0; i < str.length; i++) {
    remainder = (remainder * 10 + Number(str[i])) % 97;
  }
  return remainder === 1;
}

export function isJWT(s) {
  if (!isString(s)) return false;
  const parts = s.split('.');
  if (parts.length !== 3) return false;
  try {
    const decode = (str) => {
      const padded = str + '='.repeat((4 - (str.length % 4)) % 4);
      return JSON.parse(Buffer.from(padded, 'base64url').toString());
    };
    return isObject(decode(parts[0])) && isObject(decode(parts[1]));
  } catch { return false; }
}

export function isSemVer(s) {
  return isString(s) &&
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(s);
}

export function isMIMEType(s) {
  return isString(s) && /^[a-zA-Z]+\/[a-zA-Z0-9.+-]+$/.test(s);
}

export function isDataURI(s) {
  return isString(s) && /^data:[a-zA-Z]+\/[a-zA-Z0-9.+-]*(?:;base64)?,/.test(s);
}

export function isPhoneNumber(s) {
  // International phone: +prefix followed by digits, optional spaces/dashes
  if (!isString(s)) return false;
  const cleaned = s.replace(/[\s\-()]/g, '');
  return /^\+?[1-9]\d{6,14}$/.test(cleaned);
}

export function isPostalCode(s, country = 'US') {
  if (!isString(s)) return false;
  const patterns = {
    US: /^\d{5}(-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
    CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
    AU: /^\d{4}$/,
    DE: /^\d{5}$/,
    FR: /^\d{5}$/,
    JP: /^\d{3}-\d{4}$/,
    ID: /^\d{5}$/,
    SG: /^\d{6}$/,
    IN: /^\d{6}$/,
  };
  const p = patterns[country.toUpperCase()] || patterns.US;
  return p.test(s);
}

export function isCurrency(s) {
  if (!isString(s)) return false;
  return /^-?\$?\d{1,3}(,\d{3})*(\.\d{2})?$/.test(s) || /^-?\$?\d+(\.\d{2})?$/.test(s);
}

export function isLatitude(v) {
  const n = Number(v);
  return isNumber(n) && n >= -90 && n <= 90;
}
export function isLongitude(v) {
  const n = Number(v);
  return isNumber(n) && n >= -180 && n <= 180;
}
export function isGeoCoordinate(lat, lng) {
  return isLatitude(lat) && isLongitude(lng);
}

export function isColor(s) {
  return isHexColor(s) || isRGBColor(s) || isHSLColor(s);
}

export function isMimeType_(s) { return isMIMEType(s); }

// ═══════════════════════════════════════════════════════════
// COMPOSITION / HIGHER-ORDER
// ═══════════════════════════════════════════════════════════

export function compose(...validators) {
  return (v) => validators.every(fn => fn(v));
}
export function anyOf(...validators) {
  return (v) => validators.some(fn => fn(v));
}
export function allOf(...validators) {
  return (v) => validators.every(fn => fn(v));
}
export function noneOf(...validators) {
  return (v) => !validators.some(fn => fn(v));
}
export function oneOf(values) {
  const set = isArray(values) ? new Set(values) : new Set(Object.values(values));
  return (v) => set.has(v);
}
export function optional(validator) {
  return (v) => v === undefined || validator(v);
}
export function nullable(validator) {
  return (v) => v === null || validator(v);
}
export function withDefault(def, validator) {
  return (v) => validator(v === undefined ? def : v);
}
export function not(validator) {
  return (v) => !validator(v);
}

// Schema validation
export function validate(data, schema) {
  const errors = {};
  for (const [key, rule] of Object.entries(schema)) {
    if (isFunction(rule)) {
      if (!rule(data[key])) errors[key] = `validation failed for "${key}"`;
    } else if (isPlainObject(rule)) {
      if (rule.required && (data[key] === undefined || !rule.validator(data[key]))) {
        errors[key] = rule.message || `validation failed for "${key}"`;
      } else if (data[key] !== undefined && rule.validator && !rule.validator(data[key])) {
        errors[key] = rule.message || `validation failed for "${key}"`;
      }
    }
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

// Collect all exports
export const all = {
  // type
  isNull, isUndefined, isNil, isString, isNumber, isBoolean, isSymbol, isBigInt,
  isFunction, isObject, isArray, isDate, isRegExp, isError, isMap, isSet,
  isWeakMap, isWeakSet, isPromise, isPrimitive, isPlainObject, isTypedArray,
  isArrayBuffer, isDataView, isClass, isAsyncFunction, isArrowFunction,
  isIterable, isAsyncIterable, isGenerator, isConstructor,
  // empty
  isEmpty, isTruthy, isFalsy,
  // number
  isInteger, isSafeInteger, isFloat, isNaN, isFinite, isPositive, isNegative,
  isNonNegative, isNonPositive, isZero, isEven, isOdd, isPrime, isDivisibleBy,
  isInRange, isBetween, isPowerOfTwo, isPerfectSquare,
  // string
  isAlpha, isAlphanumeric, isNumeric, isAlphaDash, isLowerCase, isUpperCase,
  isCapitalized, isPalindrome, isSlug, isHex, isBase64, isBase64URL, isBase32,
  isASCII, isMultibyte, hasMinLength, hasMaxLength, hasLength,
  // format
  isEmail, isURL, isIPv4, isIPv6, isIP, isPort, isUUID, isUUIDv4, isUUIDv7,
  isHexColor, isRGBColor, isHSLColor, isJSON, isISOString, isTimestamp,
  isCreditCard, isISBN, isISSN, isEAN, isMACAddress, isIMEI, isIBAN, isJWT,
  isSemVer, isMIMEType, isDataURI, isPhoneNumber, isPostalCode, isCurrency,
  isLatitude, isLongitude, isColor,
  // composition
  compose, anyOf, allOf, noneOf, oneOf, optional, nullable, withDefault, not,
  validate,
};
