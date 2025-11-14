type RoleWithPermissions = { role: 'RoleWithPermissions'; permissions: string[] };

type RoleWithExpiry = { role: 'RoleWithExpiry'; expiresAt: Date };

type UserRole = RoleWithPermissions | RoleWithExpiry;

function getUserDescription(user: UserRole): string {
  if ('permissions' in user) {
    return `Admin ${user.permissions.join(', ')}`;
  }
  return `User ${user.expiresAt.toDateString()}`;
}

// Cleaned and corrected profile types

type UserContact = {
  email?: string;
  phone?: string;
};

type UserProfile = {
  id: string;
  name: string;
  createdAt: Date;
  contact?: UserContact;
};

// Usage

const userA: UserProfile = {
  id: 'u1',
  name: 'Soumadip',
  createdAt: new Date(),
};

const userB: UserProfile = {
  id: 'u2',
  name: 'Soumadip',
  createdAt: new Date(),
  contact: {
    email: 'soumadipmajila@gmail.com',
  },
};

const emailA = userA.contact?.email;
const emailB = userB.contact?.email;

console.log(emailA);
console.log(emailB);

// Nullish coalescing examples

const serverCount: number | null = 0;
const serverLabel: string | undefined = '';

// ?? → uses fallback only if left side is null or undefined
// || → uses fallback if left side is falsy (0, '', false, null, undefined, NaN)
const resultA = serverCount ?? 100;
const resultB = serverCount || 100;

console.log(resultA, resultB);
