"use strict";
// interface -> named shape for objects
const user333 = {
    id: 'u1',
    name: 'Soumadip',
    createdAt: new Date(),
    email: 'soumadipmajila@gmail.com',
};
const admin333 = {
    permission: ['read', 'write'],
    id: 'u1',
    name: 'Soumadip',
    createdAt: new Date(),
};
const adminWithMeta = {
    permission: ['read', 'write'],
    id: 'u1',
    name: 'Soumadip',
    createdAt: new Date(),
    updatedAt: new Date(),
};
