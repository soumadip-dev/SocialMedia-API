// interface -> named shape for objects

interface User333 {
  id: string;
  name: string;
  email?: string;
  readonly createdAt: Date;
}

const user333: User333 = {
  id: 'u1',
  name: 'Soumadip',
  createdAt: new Date(),
  email: 'soumadipmajila@gmail.com',
};

interface Admin333 extends User333 {
  permission: string[];
}
interface MetaData {
  updatedAt: Date;
}

const admin333: Admin333 = {
  permission: ['read', 'write'],
  id: 'u1',
  name: 'Soumadip',
  createdAt: new Date(),
};

const adminWithMeta: Admin333 & MetaData = {
  permission: ['read', 'write'],
  id: 'u1',
  name: 'Soumadip',
  createdAt: new Date(),
  updatedAt: new Date(),
};
