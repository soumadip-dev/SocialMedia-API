// tuples -> fixed length and fixed type and indexing also matter
const userEntry: [string, number] = ['Soumadip', 23];

let anotherEntry: [status: string, code?: number];
// both work
anotherEntry = ['OK'];
anotherEntry = ['OK', 200];

const corners: readonly [number, number] = [1, 2]; // read only tuple
