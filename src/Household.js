
class Household {
  constructor() {
    this._powerPlants = [];
  }

  get hasEletricity() {
    const alivePowerPlants = this._powerPlants.filter((item) => {
      return (item instanceof Household) ? item.hasEletricity : item.isAlive;
    });

    return alivePowerPlants.length > 0;
  }

  connect(powerPlant) {
    this._powerPlants.push(powerPlant);
  }

  disconnect(powerPlant) {
    this._powerPlants = this._powerPlants.filter((item) => !Object.is(item, powerPlant));
  }
}

module.exports = Household;
