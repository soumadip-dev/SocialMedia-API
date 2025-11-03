type User = {
  id: string;
  name: string;
  email?: string;
  readonly createdAt: Date;
};

const user1: User = {
  id: 'u1',
  name: 'Soumadip',
  createdAt: new Date(),
  email: 'soumadipmajila@gmail.com',
};

// user1.createdAt = new Date(); -> Cannot assign to 'createdAt' because it is a read-only property

console.log(user1);

type Count = {
  [k: string]: number;
};

const c1: Count = { Whatever: 3 };

type Count1 = Record<'likes' | 'views' | 'shares', number>;

const c2: Count1 = { likes: 1, views: 2, shares: 3 };
// const c2: Count1 = { likes: 1, views: 2, shares: 3, temp: 2 }; => Error (Object literal may only specify known properties, and 'temp' does not exist in type 'Count1'.)
