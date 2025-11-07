class BankAccount {
  public owner: string;
  #otp: number = 1234;
  private balance: number = 0;

  constructor(owner: string) {
    this.owner = owner;
  }

  deposite(amt: number) {
    if (amt < 0) throw new Error('Invalid amount');
    this.balance += amt;
  }

  withdraw(amt: number) {
    if (amt < 0) throw new Error('Invalid amount');
    this.balance -= amt;
  }

  getBalance() {
    return this.balance;
  }
  verifyOtp(code: number) {
    return this.#otp === code;
  }
}

const account = new BankAccount('Soumadip');
account.deposite(100);
account.withdraw(50);
console.log(account.getBalance());
console.log(account.verifyOtp(1234));