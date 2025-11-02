let username: string = 'Soumadip';
let age: number = 40;
let isStudent: boolean = false;
const big: bigint = 2n ** 63n - 1n;

// We cannot do any opearion betwen bigint and number
// const mixed = age + big; -> Throw error

const TOKEN: unique symbol = Symbol('TOKEN');

function yearsToday(years: number): number {
  return years * 365;
}

console.log(yearsToday(5));
