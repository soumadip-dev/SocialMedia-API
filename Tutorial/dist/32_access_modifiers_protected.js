"use strict";
class Animal {
    energy = 100;
    eat(amount) {
        this.energy += amount;
    }
}
class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
        this.energy -= 10;
    }
    getEnergy() {
        return this.energy;
    }
}
const dog = new Dog();
dog.bark();
console.log(dog.getEnergy());
