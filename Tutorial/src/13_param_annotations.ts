function abc(a: number, b: number): number {
  return a + b;
}

const nums12 = [1, 2, 3];

const doubled = nums12.map(n => abc(n, n));

console.log(doubled);

type Point = { x: number; y: number };

function distanceFromOrigin(p: Point): number {
  return Math.hypot(p.x, p.y);
}

console.log(distanceFromOrigin({ x: 2, y: 3 }));
