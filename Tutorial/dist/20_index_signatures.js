"use strict";
const counters = {};
counters['likes'] = 1;
counters['views'] = 2;
counters['shares'] = 3;
console.log(counters);
const counters2 = {
    likes: 1,
    views: 2,
    shares: 3,
};
const priceMap = new Map();
priceMap.set('apple', 1);
priceMap.set('banana', 2);
priceMap.set('orange', 3);
const priceMap2 = {
    apple: 1,
    banana: 2,
    orange: 3,
    mango: undefined,
};
console.log(priceMap2);
