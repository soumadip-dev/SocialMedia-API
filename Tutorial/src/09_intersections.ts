//  Value must be everything from A and from B
type Inter1 = { id: string };
type Inter2 = { createdAt: Date };

type Entity = Inter1 & Inter2; // Must have bothe id and createdAt

const entity: Entity = {
  id: '123',
  createdAt: new Date(),
};

// type numberHolder = { a: number };
// type stringHolder = { a: string };

// type IdHolder = numberHolder & stringHolder;
// IdHolder is the intersection of { a: number } and { a: string }.
// That means the property a must be both a number and a string at the same time, which is impossible.

// const idHolder: IdHolder = { a: '123' };
// const IHolder: IdHolder = { a: 123 };
