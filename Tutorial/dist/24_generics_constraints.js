"use strict";
// <T> => constraint T so that only certain shapes can be used
function echo(value) {
    return value;
}
console.log(echo('hello'));
console.log(echo(100));
// console.log(echo(true)); => error
function echoWithObjectShape(value) {
    return value;
}
//  Now it will only work with object that has only name
console.log(echoWithObjectShape({ name: 'Soumadip' }));
function echoWithInterface(value) {
    return value;
}
console.log(echoWithInterface({ name: 'Soumadip', age: 40 }));
function lenN4(value) {
    return value.length;
}
console.log(lenN4([1, 2, 3, 4]));
console.log(lenN4('soumadip'));
console.log(lenN4({ name: 'soumadip', length: 4 }));
function userN6Extract(arrN4, KeyN) {
    return arrN4.map(item => item[KeyN]);
}
const userN6 = [
    {
        id: '1',
        name: 'Soumadip',
        age: 40,
    },
    {
        id: '2',
        name: 'Soumadip',
    },
];
console.log(userN6Extract(userN6, 'id'));
console.log(userN6Extract(userN6, 'name'));
console.log(userN6Extract(userN6, 'age'));
// console.log(userN6Extract(userN6, 'address')); => ERROR
