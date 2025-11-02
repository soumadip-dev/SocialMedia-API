"use strict";
// let title: string = 'Majila';
// title = undefined; --- > Throw error for strinct checking that we have added in tsConfig.js
//  For this we have to use union
let userName = 'Soumadip';
userName = undefined;
console.log(userName);
// void: function doesn't return a useful value
function log(msg) {
    console.log(msg);
}
function fail(msg) {
    throw new Error(msg);
}
// DO NOT USE ANY - > Try to ignore
