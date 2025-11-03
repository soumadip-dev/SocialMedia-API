"use strict";
function move(d) {
    console.log(d);
}
const d1 = 'left';
move(d1);
// But it will not work with let (because let can be changed letter)
let d2 = 'left';
// move(d2); => Argument of type 'string' is not assignable to parameter of type 'Direction'.
// for this we have to again mention direction in let
let d3 = 'left';
move(d3);
