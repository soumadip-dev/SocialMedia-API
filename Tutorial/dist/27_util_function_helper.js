"use strict";
function ExtractUserInfo(id, IsextraInfo) {
    return { id, name: 'Soumadip', log: IsextraInfo ? 'details' : undefined };
}
const argsInfo = ['123', false];
const userInfo = ExtractUserInfo(...argsInfo);
console.log(userInfo);
console.log(argsInfo);
class PersonN1 {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        return `Hi I'm ${this.name} and I'm ${this.age} years old`;
    }
}
const resultInfo1 = ['Soumadip', 22];
const abcn1 = new PersonN1(...resultInfo1);
console.log(abcn1.greet());
