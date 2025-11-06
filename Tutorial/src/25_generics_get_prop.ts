type UserN7 = {
  id: string;
  name: string;
  email?: string;
};

function getUserPropN7<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const uN7: UserN7 = {
  id: '1',
  name: 'Soumadip',
  email: 'soumadip@me.com',
};

const idValueN7 = getUserPropN7(uN7, 'id');
console.log(idValueN7);

function setUserPropN7<T, K extends keyof T>(objN7: T, keyN7: K, newVal: T[K]): void {
  objN7[keyN7] = newVal;
}

setUserPropN7(uN7, 'id', '2');
setUserPropN7(uN7, 'email', 'soumadip@gmail.com');
console.log(uN7);
