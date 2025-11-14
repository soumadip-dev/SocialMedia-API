"use strict";
function getUserDescription(user) {
    if ('permissions' in user) {
        return `Admin ${user.permissions.join(', ')}`;
    }
    return `User ${user.expiresAt.toDateString()}`;
}
// Usage
const userA = {
    id: 'u1',
    name: 'Soumadip',
    createdAt: new Date(),
};
const userB = {
    id: 'u2',
    name: 'Soumadip',
    createdAt: new Date(),
    contact: {
        email: 'soumadipmajila@gmail.com',
    },
};
const emailA = userA.contact?.email;
const emailB = userB.contact?.email;
console.log(emailA);
console.log(emailB);
// Nullish coalescing examples
const serverCount = 0;
const serverLabel = '';
// ?? → uses fallback only if left side is null or undefined
// || → uses fallback if left side is falsy (0, '', false, null, undefined, NaN)
const resultA = serverCount ?? 100;
const resultB = serverCount || 100;
console.log(resultA, resultB);
