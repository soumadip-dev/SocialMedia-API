"use strict";
// typeof for premitive types
function describeTypeOf(x) {
    return typeof x;
}
console.log(describeTypeOf('hello'), describeTypeOf(1), describeTypeOf(true), describeTypeOf(10n), describeTypeOf(Symbol('hello')), describeTypeOf(undefined), describeTypeOf(null), describeTypeOf(() => { }), describeTypeOf({}));
function info(x) {
    if (Array.isArray(x)) {
        return 'array';
    }
    if (x instanceof Date) {
        return 'date';
    }
    if (x instanceof Error) {
        return 'error';
    }
    if (x instanceof Object) {
        return 'object';
    }
    return typeof x;
}
console.log(info([1, 2, 3, 4, 5]), info(new Date()), info(new Error(`Something went wrong`)), info({ x: 1 }));
