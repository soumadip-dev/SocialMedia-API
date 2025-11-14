// understand what is "type parameter" <T>
// How TypeScript infers <T> from your arguments automatically

// is a function where ttypes are blanks -> you fill in letter
// <T> is a placeholder for a type
// TS will try to understand what T should be

function id<T>(x: T): T {
  return x;
}

const xyzz = id(5);
console.log(xyzz + 2);

console.log(id('soumadip'));

function firstGen<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(firstGen([1, 2, 3, 4]));
