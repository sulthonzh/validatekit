# validatekit

Zero-dep validation library — 100+ validators for type checking, format verification, and composition. No dependencies, no nonsense.

## Install

```bash
npm install validatekit
```

## Why?

Every project reinvents validation. You copy-paste the same `isEmail` regex, the same `isUUID` check, the same Luhn algorithm. validatekit puts them all in one place — tested, typed, zero-dependency.

## Quick Start

```js
import { isEmail, isUUID, compose, hasMinLength, validate } from 'validatekit';

// Single checks
isEmail('user@example.com')     // true
isUUID('550e8400-e29b-41d4-a716-446655440000')  // true
isIPv4('192.168.1.1')           // true
isCreditCard('4111111111111111') // true (Luhn checked)

// Compose validators
const isValidName = compose(
  isString,
  hasMinLength(2),
  hasMaxLength(50)
);
isValidName('Alice')  // true
isValidName('A')      // false

// Schema validation
const result = validate(user, {
  name: isString,
  email: isEmail,
  age: compose(isInteger, isPositive),
  role: optional(oneOf(['admin', 'user', 'guest']))
});
result.valid   // true/false
result.errors  // { field: "message" }
```

## Validators

### Type Checks (30+)
`isNull`, `isUndefined`, `isNil`, `isString`, `isNumber`, `isBoolean`, `isSymbol`, `isBigInt`, `isFunction`, `isObject`, `isArray`, `isDate`, `isRegExp`, `isError`, `isMap`, `isSet`, `isWeakMap`, `isWeakSet`, `isPromise`, `isPrimitive`, `isPlainObject`, `isTypedArray`, `isArrayBuffer`, `isDataView`, `isClass`, `isAsyncFunction`, `isArrowFunction`, `isIterable`, `isGenerator`, `isConstructor`

### Empty & Truthy
`isEmpty`, `isTruthy`, `isFalsy`

### Number Checks
`isInteger`, `isSafeInteger`, `isFloat`, `isNaN`, `isFinite`, `isPositive`, `isNegative`, `isNonNegative`, `isNonPositive`, `isZero`, `isEven`, `isOdd`, `isPrime`, `isDivisibleBy`, `isInRange`, `isBetween`, `isPowerOfTwo`, `isPerfectSquare`

### String Checks
`isAlpha`, `isAlphanumeric`, `isNumeric`, `isAlphaDash`, `isLowerCase`, `isUpperCase`, `isCapitalized`, `isPalindrome`, `isSlug`, `isHex`, `isBase64`, `isBase64URL`, `isBase32`, `isASCII`, `isMultibyte`, `hasMinLength`, `hasMaxLength`, `hasLength`

### Format Checks
`isEmail`, `isURL`, `isIPv4`, `isIPv6`, `isIP`, `isPort`, `isUUID`, `isUUIDv4`, `isUUIDv7`, `isHexColor`, `isRGBColor`, `isHSLColor`, `isColor`, `isJSON`, `isISOString`, `isTimestamp`, `isCreditCard`, `isISBN`, `isISSN`, `isEAN`, `isMACAddress`, `isIMEI`, `isIBAN`, `isJWT`, `isSemVer`, `isMIMEType`, `isDataURI`, `isPhoneNumber`, `isPostalCode`, `isCurrency`, `isLatitude`, `isLongitude`

### Composition
- `compose(...validators)` — all must pass (AND)
- `anyOf(...validators)` — any must pass (OR)
- `allOf(...validators)` — same as compose
- `noneOf(...validators)` — none must pass (NOT ANY)
- `oneOf(values)` — value must be in list
- `optional(validator)` — allows undefined
- `nullable(validator)` — allows null
- `withDefault(def, validator)` — substitutes default for undefined
- `not(validator)` — negates
- `validate(data, schema)` — object schema validation

### Currying

Multi-arg validators support partial application for composition:

```js
import { hasMinLength, hasMaxLength, isInRange } from 'validatekit';

const min5 = hasMinLength(5);       // → (v) => boolean
const range = isInRange(0, 100);    // → (v) => boolean
```

## CLI

```bash
# Check a value
npx validatekit check isEmail "user@example.com"
npx validatekit check isIPv4 "192.168.1.1"
npx validatekit check isUUIDv4 "550e8400-e29b-41d4-a716-446655440000"

# List all validators
npx validatekit list

# Demo
npx validatekit demo
```

## License

MIT
