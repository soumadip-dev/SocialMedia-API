"use strict";
// This async function returns the number 42. Because it is async,
// the actual return type is Promise<42>.
async function fetchCount() {
    return 42;
}
let value;
value = 42; // OK
// value = 10; => ERROR (because the type is exactly 42)
// Promise.resolve(1) creates a promise that resolves to 1.
// Promise.resolve('x') creates a promise that resolves to 'x'.
// Promise.all([...]) waits for both and returns [1, 'x'].
// Therefore, getData returns Promise<[1, 'x']>.
async function getData() {
    return Promise.all([Promise.resolve(1), Promise.resolve('x')]);
}
let result;
result = [1, 'x'];
// result = [1, 'y']; => ERROR (because the type is exactly [1, 'x'])
