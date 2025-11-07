class Animal {
  protected energy = 100;

  eat(amount: number) {
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
