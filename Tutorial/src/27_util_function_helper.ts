function ExtractUserInfo(id: string, IsextraInfo: boolean) {
  return { id, name: 'Soumadip', log: IsextraInfo ? 'details' : (undefined as string | undefined) };
}

type GetUserReturnInfo = ReturnType<typeof ExtractUserInfo>;
type GetUserParamInfo = Parameters<typeof ExtractUserInfo>;

const argsInfo: GetUserParamInfo = ['123', false];
const userInfo: GetUserReturnInfo = ExtractUserInfo(...argsInfo);

console.log(userInfo);
console.log(argsInfo);

class PersonN1 {
  constructor(public name: string, public age: number) {}

  greet() {
    return `Hi I'm ${this.name} and I'm ${this.age} years old`;
  }
}

type PersonInstanceN1 = InstanceType<typeof PersonN1>;
type PersonConstructorN1 = ConstructorParameters<typeof PersonN1>;

const resultInfo1: PersonConstructorN1 = ['Soumadip', 22];
const abcn1: PersonInstanceN1 = new PersonN1(...resultInfo1);
console.log(abcn1.greet());
