"use strict";
const patch10 = {
    name: 'Soumadip', // Updating only the name is allowed due to Partial<>
};
console.log(patch10);
const userAllRequired10 = {
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
const userReadonly10 = {
    id: '1',
    name: 'Soumadip',
    address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
    },
};
const userPick10 = {
    id: '1',
    name: 'Soumadip',
    // email: 'yNc9d@example.com', => Error: Property 'email' is missing in type 'Pick<User10, "id" | "name">'
};
const userOmit10 = {
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
