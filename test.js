import {
  isNull, isUndefined, isNil, isString, isNumber, isBoolean, isSymbol, isBigInt,
  isFunction, isObject, isArray, isDate, isRegExp, isError, isMap, isSet,
  isWeakMap, isWeakSet, isPromise, isPrimitive, isPlainObject, isTypedArray,
  isArrayBuffer, isDataView, isClass, isAsyncFunction, isArrowFunction,
  isIterable, isAsyncIterable, isGenerator, isConstructor,
  isEmpty, isTruthy, isFalsy,
  isInteger, isSafeInteger, isFloat, isNaN, isFinite, isPositive, isNegative,
  isNonNegative, isNonPositive, isZero, isEven, isOdd, isPrime, isDivisibleBy,
  isInRange, isBetween, isPowerOfTwo, isPerfectSquare,
  isAlpha, isAlphanumeric, isNumeric, isAlphaDash, isLowerCase, isUpperCase,
  isCapitalized, isPalindrome, isSlug, isHex, isBase64, isBase64URL, isBase32,
  isASCII, isMultibyte, hasMinLength, hasMaxLength, hasLength,
  isEmail, isURL, isIPv4, isIPv6, isIP, isPort, isUUID, isUUIDv4, isUUIDv7,
  isHexColor, isRGBColor, isHSLColor, isJSON, isISOString, isTimestamp,
  isCreditCard, isISBN, isISSN, isEAN, isMACAddress, isIMEI, isIBAN, isJWT,
  isSemVer, isMIMEType, isDataURI, isPhoneNumber, isPostalCode, isCurrency,
  isLatitude, isLongitude, isColor,
  compose, anyOf, allOf, noneOf, oneOf, optional, nullable, withDefault, not,
  validate,
} from './index.js';

let passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; }
  catch (e) { failed++; console.error(`  FAIL: ${name}: ${e.message}`); }
}
function assert(c, m) { if (!c) throw new Error(m || 'assertion failed'); }
function eq(a, b) { assert(a === b, `expected ${JSON.stringify(b)} got ${JSON.stringify(a)}`); }
function T(v) { return () => eq(v, true); }
function F(v) { return () => eq(v, false); }

// ── TYPE CHECKS ──
test('isNull', () => { eq(isNull(null), true); eq(isNull(undefined), false); });
test('isUndefined', () => { eq(isUndefined(undefined), true); eq(isUndefined(null), false); });
test('isNil', () => { eq(isNil(null), true); eq(isNil(undefined), true); eq(isNil(0), false); });
test('isString', () => { eq(isString(''), true); eq(isString(123), false); });
test('isNumber', () => { eq(isNumber(42), true); eq(isNumber(NaN), false); eq(isNumber('42'), false); });
test('isBoolean', () => { eq(isBoolean(true), true); eq(isBoolean(1), false); });
test('isSymbol', () => { eq(isSymbol(Symbol()), true); eq(isSymbol('s'), false); });
test('isBigInt', () => { eq(isBigInt(1n), true); eq(isBigInt(1), false); });
test('isFunction', () => { eq(isFunction(() => {}), true); eq(isFunction(1), false); });
test('isObject', () => { eq(isObject({}), true); eq(isObject(null), false); eq(isObject([]), true); });
test('isArray', () => { eq(isArray([]), true); eq(isArray({}), false); });
test('isDate', () => { eq(isDate(new Date()), true); eq(isDate(new Date('invalid')), false); eq(isDate({}), false); });
test('isRegExp', () => { eq(isRegExp(/x/), true); eq(isRegExp('x'), false); });
test('isError', () => { eq(isError(new Error()), true); eq(isError({}), false); });
test('isMap', () => { eq(isMap(new Map()), true); eq(isMap(new Set()), false); });
test('isSet', () => { eq(isSet(new Set()), true); eq(isSet(new Map()), false); });
test('isWeakMap', () => { eq(isWeakMap(new WeakMap()), true); eq(isWeakMap(new Map()), false); });
test('isWeakSet', () => { eq(isWeakSet(new WeakSet()), true); eq(isWeakSet(new Set()), false); });
test('isPromise', () => { eq(isPromise(Promise.resolve()), true); eq(isPromise({}), false); eq(isPromise({then:()=>{}}), true); });
test('isPrimitive', () => { eq(isPrimitive(42), true); eq(isPrimitive(null), true); eq(isPrimitive({}), false); });
test('isPlainObject', () => { eq(isPlainObject({}), true); eq(isPlainObject([]), false); eq(isPlainObject(new Map()), false); });
test('isTypedArray', () => { eq(isTypedArray(new Uint8Array(4)), true); eq(isTypedArray([]), false); });
test('isArrayBuffer', () => { eq(isArrayBuffer(new ArrayBuffer(8)), true); eq(isArrayBuffer({}), false); });
test('isDataView', () => { eq(isDataView(new DataView(new ArrayBuffer(8))), true); eq(isDataView({}), false); });
test('isClass', () => { eq(isClass(class Foo {}), true); eq(isClass(function(){}), false); });
test('isAsyncFunction', () => { eq(isAsyncFunction(async () => {}), true); eq(isAsyncFunction(() => {}), false); });
test('isArrowFunction', () => { eq(isArrowFunction(() => {}), true); eq(isArrowFunction(function(){}), false); });
test('isIterable', () => { eq(isIterable([]), true); eq(isIterable(''), true); eq(isIterable(42), false); });
test('isGenerator', () => {
  function* gen() { yield 1; }
  eq(isGenerator(gen()), true); eq(isGenerator({}), false);
});

// ── EMPTY / TRUTHY ──
test('isEmpty', () => {
  eq(isEmpty(''), true); eq(isEmpty([]), true); eq(isEmpty({}), true);
  eq(isEmpty(null), true); eq(isEmpty(undefined), true);
  eq(isEmpty(new Map()), true); eq(isEmpty(new Set()), true);
  eq(isEmpty('x'), false); eq(isEmpty([1]), false); eq(isEmpty({a:1}), false);
});
test('isTruthy', () => { eq(isTruthy(1), true); eq(isTruthy(0), false); eq(isTruthy(''), false); });
test('isFalsy', () => { eq(isFalsy(0), true); eq(isFalsy(1), false); eq(isFalsy(''), true); });

// ── NUMBER CHECKS ──
test('isInteger', () => { eq(isInteger(42), true); eq(isInteger(42.5), false); eq(isInteger('42'), false); });
test('isSafeInteger', () => { eq(isSafeInteger(Number.MAX_SAFE_INTEGER), true); eq(isSafeInteger(Number.MAX_SAFE_INTEGER + 2), false); });
test('isFloat', () => { eq(isFloat(42.5), true); eq(isFloat(42), false); });
test('isNaN', () => { eq(isNaN(NaN), true); eq(isNaN(42), false); });
test('isFinite', () => { eq(isFinite(42), true); eq(isFinite(Infinity), false); });
test('isPositive', () => { eq(isPositive(1), true); eq(isPositive(0), false); eq(isPositive(-1), false); });
test('isNegative', () => { eq(isNegative(-1), true); eq(isNegative(0), false); });
test('isNonNegative', () => { eq(isNonNegative(0), true); eq(isNonNegative(-1), false); });
test('isNonPositive', () => { eq(isNonPositive(0), true); eq(isNonPositive(1), false); });
test('isZero', () => { eq(isZero(0), true); eq(isZero(-0), true); eq(isZero(0.1), false); });
test('isEven', () => { eq(isEven(4), true); eq(isEven(3), false); });
test('isOdd', () => { eq(isOdd(3), true); eq(isOdd(4), false); });
test('isPrime', () => {
  eq(isPrime(2), true); eq(isPrime(3), true); eq(isPrime(4), false);
  eq(isPrime(17), true); eq(isPrime(1), false); eq(isPrime(0), false);
});
test('isDivisibleBy', () => { eq(isDivisibleBy(10, 5), true); eq(isDivisibleBy(10, 3), false); });
test('isInRange', () => { eq(isInRange(5, 1, 10), true); eq(isInRange(0, 1, 10), false); eq(isInRange(10, 1, 10), true); });
test('isBetween', () => { eq(isBetween(5, 1, 10), true); eq(isBetween(1, 1, 10), false); eq(isBetween(10, 1, 10), false); });
test('isPowerOfTwo', () => { eq(isPowerOfTwo(8), true); eq(isPowerOfTwo(6), false); eq(isPowerOfTwo(1), true); });
test('isPerfectSquare', () => { eq(isPerfectSquare(16), true); eq(isPerfectSquare(15), false); eq(isPerfectSquare(0), true); });

// ── STRING CHECKS ──
test('isAlpha', () => { eq(isAlpha('hello'), true); eq(isAlpha('hello123'), false); eq(isAlpha(''), false); });
test('isAlphanumeric', () => { eq(isAlphanumeric('abc123'), true); eq(isAlphanumeric('abc!'), false); });
test('isNumeric', () => { eq(isNumeric('12345'), true); eq(isNumeric('12.3'), false); });
test('isAlphaDash', () => { eq(isAlphaDash('hello_world-1'), true); eq(isAlphaDash('hello!'), false); });
test('isLowerCase', () => { eq(isLowerCase('hello'), true); eq(isLowerCase('Hello'), false); });
test('isUpperCase', () => { eq(isUpperCase('HELLO'), true); eq(isUpperCase('Hello'), false); });
test('isCapitalized', () => { eq(isCapitalized('Hello'), true); eq(isCapitalized('hello'), false); });
test('isPalindrome', () => { eq(isPalindrome('racecar'), true); eq(isPalindrome('A man a plan a canal Panama'), true); eq(isPalindrome('hello'), false); });
test('isSlug', () => { eq(isSlug('hello-world'), true); eq(isSlug('Hello World'), false); eq(isSlug('-leading'), false); });
test('isHex', () => { eq(isHex('deadbeef'), true); eq(isHex('xyz'), false); });
test('isBase64', () => { eq(isBase64('SGVsbG8='), true); eq(isBase64('not base64!'), false); });
test('isBase64URL', () => { eq(isBase64URL('SGVsbG8_w'), true); eq(isBase64URL('has+plus'), false); });
test('isBase32', () => { eq(isBase32('JBSWY3DPEBLW64TMMQ======'), true); eq(isBase32('lower1'), false); });
test('isASCII', () => { eq(isASCII('Hello!'), true); eq(isASCII('café'), false); });
test('isMultibyte', () => { eq(isMultibyte('café'), true); eq(isMultibyte('hello'), false); });
test('hasMinLength', () => { eq(hasMinLength('hello', 3), true); eq(hasMinLength('hi', 3), false); });
test('hasMaxLength', () => { eq(hasMaxLength('hi', 3), true); eq(hasMaxLength('hello', 3), false); });
test('hasLength', () => { eq(hasLength('hello', 5), true); eq(hasLength('hi', 5), false); eq(hasLength('abc', 1, 5), true); });

// ── FORMAT CHECKS ──
test('isEmail', () => {
  eq(isEmail('user@example.com'), true); eq(isEmail('a@b.co'), true);
  eq(isEmail('not-email'), false); eq(isEmail('a@b'), false); eq(isEmail('@b.com'), false);
});
test('isURL', () => {
  eq(isURL('https://example.com'), true); eq(isURL('http://localhost:3000'), true);
  eq(isURL('not-url'), false);
});
test('isIPv4', () => {
  eq(isIPv4('192.168.1.1'), true); eq(isIPv4('255.255.255.255'), true);
  eq(isIPv4('256.1.1.1'), false); eq(isIPv4('1.2.3'), false); eq(isIPv4('01.01.01.01'), false);
});
test('isIPv6', () => {
  eq(isIPv6('::1'), true); eq(isIPv6('2001:db8::1'), true);
  eq(isIPv6('fe80::1ff:fe23:4567:890a'), true);
  eq(isIPv6('::ffff:192.168.1.1'), true);
  eq(isIPv6('2001:db8:0:0:0:0:0:1'), true);
  eq(isIPv6('not-ipv6'), false); eq(isIPv6(':::1'), false);
});
test('isIP', () => { eq(isIP('192.168.1.1'), true); eq(isIP('::1'), true); eq(isIP('not'), false); });
test('isPort', () => { eq(isPort(8080), true); eq(isPort(0), true); eq(isPort(65535), true); eq(isPort(65536), false); eq(isPort(-1), false); });
test('isUUID', () => { eq(isUUID('550e8400-e29b-41d4-a716-446655440000'), true); eq(isUUID('not-uuid'), false); });
test('isUUIDv4', () => { eq(isUUIDv4('550e8400-e29b-41d4-a716-446655440000'), true); eq(isUUIDv4('550e8400-e29b-31d4-a716-446655440000'), false); });
test('isUUIDv7', () => { eq(isUUIDv7('018f6a1c-5e0f-7000-8000-000000000000'), true); eq(isUUIDv7('550e8400-e29b-41d4-a716-446655440000'), false); });
test('isHexColor', () => { eq(isHexColor('#fff'), true); eq(isHexColor('#ff5733'), true); eq(isHexColor('#ff573388'), true); eq(isHexColor('#ggg'), false); eq(isHexColor('fff'), false); });
test('isRGBColor', () => { eq(isRGBColor('rgb(255, 0, 128)'), true); eq(isRGBColor('rgb(300, 0, 0)'), false); });
test('isHSLColor', () => { eq(isHSLColor('hsl(180, 50%, 50%)'), true); eq(isHSLColor('hsl(400, 50%, 50%)'), false); });
test('isColor', () => { eq(isColor('#fff'), true); eq(isColor('rgb(1,2,3)'), true); eq(isColor('red'), false); });
test('isJSON', () => { eq(isJSON('{"a":1}'), true); eq(isJSON('[1,2,3]'), true); eq(isJSON('not json'), false); });
test('isISOString', () => { eq(isISOString('2024-01-15T00:00:00.000Z'), true); eq(isISOString('2024-01-15'), false); });
test('isTimestamp', () => { eq(isTimestamp(1700000000), true); eq(isTimestamp(-1), false); eq(isTimestamp(99999999999999), false); });
test('isCreditCard', () => {
  eq(isCreditCard('4111111111111111'), true); eq(isCreditCard('4111 1111 1111 1111'), true);
  eq(isCreditCard('4111111111111112'), false); eq(isCreditCard('123'), false);
});
test('isISBN', () => {
  eq(isISBN('978-3-16-148410-0'), true); eq(isISBN('0-306-40615-2'), true);
  eq(isISBN('1234567890'), false);
});
test('isISSN', () => { eq(isISSN('0317-8471'), true); eq(isISSN('0024-9319'), true); eq(isISSN('1234-5678'), false); });
test('isEAN', () => { eq(isEAN('4006381333931'), true); eq(isEAN('4006381333932'), false); });
test('isMACAddress', () => { eq(isMACAddress('01:23:45:67:89:ab'), true); eq(isMACAddress('01-23-45-67-89-ab'), true); eq(isMACAddress('0123456789ab'), true); eq(isMACAddress('zz:zz:zz:zz:zz:zz'), false); });
test('isIMEI', () => { eq(isIMEI('490154203237518'), true); eq(isIMEI('490154203237519'), false); });
test('isIBAN', () => {
  eq(isIBAN('GB82 WEST 1234 5698 7654 32'), true);
  eq(isIBAN('DE89 3704 0044 0532 0130 00'), true);
  eq(isIBAN('GB82 WEST 1234 5698 7654 33'), false);
});
test('isJWT', () => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  eq(isJWT(token), true); eq(isJWT('not.jwt'), false); eq(isJWT('a.b'), false);
});
test('isSemVer', () => {
  eq(isSemVer('1.0.0'), true); eq(isSemVer('1.2.3-beta.1+build.5'), true);
  eq(isSemVer('v1.0.0'), false); eq(isSemVer('1.0'), false);
});
test('isMIMEType', () => { eq(isMIMEType('application/json'), true); eq(isMIMEType('text/plain'), true); eq(isMIMEType('not-mime'), false); });
test('isDataURI', () => { eq(isDataURI('data:text/plain,Hello'), true); eq(isDataURI('data:image/png;base64,iVBOR'), true); eq(isDataURI('https://example.com'), false); });
test('isPhoneNumber', () => { eq(isPhoneNumber('+6281234567890'), true); eq(isPhoneNumber('(555) 123-4567'), true); eq(isPhoneNumber('abc'), false); });
test('isPostalCode', () => {
  eq(isPostalCode('12345', 'US'), true); eq(isPostalCode('12345-6789', 'US'), true);
  eq(isPostalCode('V6B 1A1', 'CA'), true); eq(isPostalCode('40125', 'ID'), true);
  eq(isPostalCode('0000', 'AU'), true);
});
test('isCurrency', () => {
  eq(isCurrency('$1,234.56'), true); eq(isCurrency('1234.56'), true); eq(isCurrency('-¥1000'), false);
  eq(isCurrency('$1,234.56'), true);
});
test('isLatitude', () => { eq(isLatitude(45.0), true); eq(isLatitude(91), false); eq(isLatitude(-90), true); });
test('isLongitude', () => { eq(isLongitude(180), true); eq(isLongitude(181), false); eq(isLongitude(-180), true); });

// ── COMPOSITION ──
test('compose', () => {
  const check = compose(isString, hasMinLength(3), hasMaxLength(10));
  eq(check('hello'), true); eq(check('hi'), false); eq(check('hello world'), false); eq(check(42), false);
});
test('anyOf', () => {
  const check = anyOf(isString, isNumber);
  eq(check('hello'), true); eq(check(42), true); eq(check(true), false);
});
test('allOf', () => {
  const check = allOf(isInteger, isPositive);
  eq(check(5), true); eq(check(-5), false); eq(check(5.5), false);
});
test('noneOf', () => {
  const check = noneOf(isString, isNumber);
  eq(check(true), true); eq(check('x'), false); eq(check(1), false);
});
test('oneOf', () => {
  const check = oneOf(['red', 'green', 'blue']);
  eq(check('red'), true); eq(check('yellow'), false);
  const check2 = oneOf({a: 1, b: 2});
  eq(check2(1), true); eq(check2(3), false);
});
test('optional', () => {
  const check = optional(isString);
  eq(check(undefined), true); eq(check('hello'), true); eq(check(42), false);
});
test('nullable', () => {
  const check = nullable(isString);
  eq(check(null), true); eq(check('hello'), true); eq(check(42), false);
});
test('withDefault', () => {
  const check = withDefault('default', isString);
  eq(check(undefined), true); eq(check('hello'), true); eq(check(42), false);
});
test('not', () => {
  const check = not(isString);
  eq(check(42), true); eq(check('hello'), false);
});
test('validate schema', () => {
  const schema = {
    name: isString,
    age: allOf(isInteger, isPositive),
    email: optional(isEmail),
  };
  const r1 = validate({ name: 'Alice', age: 30 }, schema);
  eq(r1.valid, true);
  const r2 = validate({ name: 'Alice', age: -5 }, schema);
  eq(r2.valid, false); assert('age' in r2.errors);
  const r3 = validate({ age: 30 }, schema);
  eq(r3.valid, false); assert('name' in r3.errors);
});

// ── SUMMARY ──
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
