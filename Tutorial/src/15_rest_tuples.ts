function sumAllNumbers(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sumAllNumbers(1, 2, 3, 4));

// Tuple Rest Parameter

function makeRange(...args: [start: number, end: number, step?: number]): number[] {
  const [start, end, step = 1] = args;
  const out: number[] = [];

  for (let n = start; n <= end; n += step) out.push(n);
  return out;
}

console.log(makeRange(1, 10));
console.log(makeRange(1, 10, 2));

function draw(x: number, y: number): void {
  console.log(x, y);
}

const points = [10, 12];
// draw(...points); => not a fixed [number, number] tuple
const pointsFixed = [10, 12] as const; // now it is fixed and read only
draw(...pointsFixed); // now we can use it
