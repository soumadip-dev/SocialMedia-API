type address10 = {
  street: string;
  city: string;
  state: string;
  country: string;
};

type User10 = {
  id: string;
  name: string;
  address: address10;
  email?: string; //  Email is optional
};

// Partial<User10>
type UserPatch10 = Partial<User10>;

const patch10: UserPatch10 = {
  name: 'Soumadip', // Updating only the name is allowed due to Partial<>
};

console.log(patch10);

// Required<User10>
type UserAllRequired10 = Required<User10>;

const userAllRequired10: UserAllRequired10 = {
  id: '1',
  name: 'Soumadip',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    country: 'USA',
  },
  email: 'yNc9d@example.com', // Required<> makes email mandatory
};

console.log(userAllRequired10);

// Readonly<User10>
type UserReadonly10 = Readonly<User10>;

const userReadonly10: UserReadonly10 = {
  id: '1',
  name: 'Soumadip',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    country: 'USA',
  },
};

// userReadonly10.id = '2'; //  Error — cannot modify because Readonly<>

// Pick<User10>

type UserPick10 = Pick<User10, 'id' | 'name'>;

const userPick10: UserPick10 = {
  id: '1',
  name: 'Soumadip',
  // email: 'yNc9d@example.com', => Error: Property 'email' is missing in type 'Pick<User10, "id" | "name">'
};

// Omit<User10>
type UserOmit10 = Omit<User10, 'email'>;

const userOmit10: UserOmit10 = {
  id: '1',
  name: 'Soumadip',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    country: 'USA',
  },
  // email: 'yNc9d@example.com', => Error: Property 'email' is omitted in type 'Omit<User10, "email">'
};
