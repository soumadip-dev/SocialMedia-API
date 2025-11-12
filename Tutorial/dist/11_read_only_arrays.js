"use strict";
const letters = ['a', 'b', 'c'];
const numbers = [1, 2, 3];
function sum(nums) {
    let s = 0;
    for (const n of nums) {
        s += n;
    }
    return s;
}
console.log(sum([1, 2, 3]));
