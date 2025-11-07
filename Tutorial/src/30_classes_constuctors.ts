class UserN15 {
  id: string;
  name: string;
  email?: string;
  createdAt: Date = new Date();

  constructor(id: string, name: string, email?: string) {
    this.id = id;
    this.name = name;
    if (email) this.email = email;
  }
}

const result4 = new UserN15('1', 'Soumadip');
console.log(result4);

const result5 = new UserN15('1', 'Soumadip', 'soumadip@me.com');
console.log(result5);
