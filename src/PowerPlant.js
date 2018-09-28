
class PowerPlant {
  constructor() {
    this._alive = true;
  }

  get isAlive() {
    return this._alive;
  }

  set isAlive(value) {
    this._alive = value;
  }
}

module.exports = PowerPlant;
