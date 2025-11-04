"use strict";
function sumAllNumbers(...nums) {
    return nums.reduce((a, b) => a + b, 0);
}
console.log(sumAllNumbers(1, 2, 3, 4));
// Tuple Rest Parameter
function makeRange(...args) {
    const [start, end, step = 1] = args;
    const out = [];
    for (let n = start; n <= end; n += step)
        out.push(n);
    return out;
}
console.log(makeRange(1, 10));
console.log(makeRange(1, 10, 2));
function draw(x, y) {
    console.log(x, y);
}
const points = [10, 12];
// draw(...points); => not a fixed [number, number] tuple
const pointsFixed = [10, 12]; // now it is fixed and read only
draw(...pointsFixed); // now we can use it
