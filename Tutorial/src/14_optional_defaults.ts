function greetPersonOptional(name?: string): void {
  console.log(`Hello ${(name && name) || 'World'}`);
}

greetPersonOptional();
greetPersonOptional('Soumadip');

function getPersonWithDefault(name: string = 'World'): string {
  return `Hello ${name}`;
}

console.log(getPersonWithDefault());
console.log(getPersonWithDefault('Soumadip'));
