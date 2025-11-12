const letters: readonly string[] = ['a', 'b', 'c'];

const numbers: ReadonlyArray<number> = [1, 2, 3];

function sum(nums: ReadonlyArray<number>): number {
  let s = 0;
  for (const n of nums) {
    s += n;
  }
  return s;
}

console.log(sum([1, 2, 3]))
