//inference example
const doubleFunc = (n: number) => n * 2;

// explicit return for exported/public functions
export function toTitle(s: string): string {
  return `Hello ${s}`;
}

function booleanToNumber(flag: boolean): number {
  if (flag) {
    return 1;
  }
  return 0;
}
