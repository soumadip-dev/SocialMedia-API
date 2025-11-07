"use strict";
class Temperature {
    _celsius = 0;
    get celsius() {
        return this._celsius;
    }
    set celsius(value) {
        this._celsius = value;
    }
}
const temp = new Temperature();
temp.celsius = 23;
console.log(temp.celsius);
