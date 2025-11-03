"use strict";
// Raw JSON string coming from some external or unsafe source
const raw = '{"id":1, "name":"soumadip"}';
// Directly parsing and force-casting to a User-like object
// This is risky because TypeScript trusts the cast without runtime checks
const riskyUser = JSON.parse(raw);
// Runtime type guard to verify that an unknown value is actually a User22
function isUser(v) {
    return (
    // Must be a non-null object
    typeof v === 'object' &&
        v !== null &&
        // Must contain the key "id"
        'id' in v &&
        // And id must be a number
        typeof v.id === 'number' &&
        // Must contain the key "name"
        'name' in v &&
        // And name must be a string
        typeof v.name === 'string');
}
// Parse again, but keep the type unknown so we do not assume its structure
const safeUser = JSON.parse(raw);
// Only use the parsed value if the runtime check confirms it matches User22
if (isUser(safeUser)) {
    // Now TypeScript knows safeUser is User22
    console.log(safeUser.name);
}
