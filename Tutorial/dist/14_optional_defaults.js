"use strict";
function greetPersonOptional(name) {
    console.log(`Hello ${(name && name) || 'World'}`);
}
greetPersonOptional();
greetPersonOptional('Soumadip');
function getPersonWithDefault(name = 'World') {
    return `Hello ${name}`;
}
console.log(getPersonWithDefault());
console.log(getPersonWithDefault('Soumadip'));
