"use strict";
class BankAccount {
    owner;
    #otp = 1234;
    balance = 0;
    constructor(owner) {
        this.owner = owner;
    }
    deposite(amt) {
        if (amt < 0)
            throw new Error('Invalid amount');
        this.balance += amt;
    }
    withdraw(amt) {
        if (amt < 0)
            throw new Error('Invalid amount');
        this.balance -= amt;
    }
    getBalance() {
        return this.balance;
    }
    verifyOtp(code) {
        return this.#otp === code;
    }
}
const account = new BankAccount('Soumadip');
account.deposite(100);
account.withdraw(50);
console.log(account.getBalance());
console.log(account.verifyOtp(1234));
