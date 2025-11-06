"use strict";
function getUserPropN7(obj, key) {
    return obj[key];
}
const uN7 = {
    id: '1',
    name: 'Soumadip',
    email: 'soumadip@me.com',
};
const idValueN7 = getUserPropN7(uN7, 'id');
console.log(idValueN7);
function setUserPropN7(objN7, keyN7, newVal) {
    objN7[keyN7] = newVal;
}
setUserPropN7(uN7, 'id', '2');
setUserPropN7(uN7, 'email', 'soumadip@gmail.com');
console.log(uN7);
