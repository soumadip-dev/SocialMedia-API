"use strict";
let username = 'Soumadip';
let age = 40;
let isStudent = false;
const big = 2n ** 63n - 1n;
// We cannot do any opearion betwen bigint and number
// const mixed = age + big; -> Throw error
const TOKEN = Symbol('TOKEN');
function yearsToday(years) {
    return years * 365;
}
console.log(yearsToday(5));
