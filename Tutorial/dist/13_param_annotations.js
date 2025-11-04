"use strict";
function abc(a, b) {
    return a + b;
}
const nums12 = [1, 2, 3];
const doubled = nums12.map(n => abc(n, n));
console.log(doubled);
function distanceFromOrigin(p) {
    return Math.hypot(p.x, p.y);
}
console.log(distanceFromOrigin({ x: 2, y: 3 }));
