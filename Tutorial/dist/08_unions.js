"use strict";
//* value => this or that
//* primative union
function printId(id) {
    if (typeof id === 'string') {
        id.toString();
        console.log(typeof id);
    }
    else {
        id = id + '';
    }
    console.log(id);
}
printId(23);
function describeUser(u) {
    if (u.role === 'Admin') {
        console.log(u.permissions);
    }
    else {
        console.log(u.loyaltyPoint);
    }
}
describeUser({
    role: 'Admin',
    permissions: ['read', 'write'],
});
//* using in operator
function describeUserWithInOperator(u) {
    if ('loyaltyPoint' in u) {
        console.log(u.loyaltyPoint);
    }
    else {
        console.log(u.permissions);
    }
}
describeUserWithInOperator({
    role: 'Customer',
    loyaltyPoint: 23,
});
//* array of union and union of array
const arrayOfUnion = [1, 2, 3, 'a', 'b'];
console.log(arrayOfUnion);
const unionOfArray = Math.random() > 0.1 ? [1, 2, 3] : ['a', 'b'];
console.log(unionOfArray);
