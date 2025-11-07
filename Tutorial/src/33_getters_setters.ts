class Temperature {
  private _celsius: number = 0;

  get celsius() {
    return this._celsius;
  }

  set celsius(value: number) {
    this._celsius = value;
  }
}

const temp = new Temperature();
temp.celsius = 23;
console.log(temp.celsius);
