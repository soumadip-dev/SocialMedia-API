// <T> => constraint T so that only certain shapes can be used

function echo<T extends string | number>(value: T): T {
  return value;
}

console.log(echo('hello'));
console.log(echo(100));
// console.log(echo(true)); => error

function echoWithObjectShape<T extends { name: string }>(value: T): T {
  return value;
}

//  Now it will only work with object that has only name
console.log(echoWithObjectShape({ name: 'Soumadip' }));

interface PersonalInfo {
  name: string;
  age: number;
}
function echoWithInterface<T extends PersonalInfo>(value: T): T {
  return value;
}
console.log(echoWithInterface({ name: 'Soumadip', age: 40 }));

function lenN4<T extends { length: number }>(value: T): number {
  return value.length;
}

console.log(lenN4([1, 2, 3, 4]));
console.log(lenN4('soumadip'));
console.log(lenN4({ name: 'soumadip', length: 4 }));

// console.log(lenN4(true)); => error because it doesn't have length
// console.log(lenN4(123)); => error because it doesn't have length
// console.log(lenN4({ name: 'Soumadip' })); => error because it doesn't have length property with number

type UserN6 = { id: string; name: string; age?: number };
function userN6Extract<T, K extends keyof T>(arrN4: T[], KeyN: K): Array<T[K]> {
  return arrN4.map(item => item[KeyN]);
}

const userN6: UserN6[] = [
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
