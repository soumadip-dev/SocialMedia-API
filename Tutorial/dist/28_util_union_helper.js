"use strict";
// Exclude<U, V>    => Remove from U the members assignable to V
// Extract<U, V>    => Keep from U the members assignable to V
function handleMouseEvent(event) {
    console.log(event);
}
function handleKeyboardEvent(event) {
    console.log(event);
}
handleMouseEvent('mousemove');
// handleMouseEvent('keyup'); => error because keyup is not assignable to MouseEventTypes
handleKeyboardEvent('keydown');
const abcNum = 123;
// const abcNum2: CleanNumber = null; => error because null is not assignable to CleanNumber
const abcNum2 = null;
