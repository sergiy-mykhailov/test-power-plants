
const Household = require('./Household');
const PowerPlant = require('./PowerPlant');

class World {
  constructor() {

  }

  createPowerPlant() {
    return new PowerPlant();
  }

  createHousehold() {
    return new Household();
  }

  connectHouseholdToPowerPlant(household, powerPlant) {
    household.connect(powerPlant);
  }

  connectHouseholdToHousehold(household1, household2) {
    if (!household1.hasEletricity && household2.hasEletricity) {
      household1.connect(household2);
    } else {
      household2.connect(household1);
    }
  }

  disconnectHouseholdFromPowerPlant(household, powerPlant) {
    household.disconnect(powerPlant);
  }

  killPowerPlant(powerPlant) {
    powerPlant.isAlive = false;
  }

  repairPowerPlant(powerPlant) {
    powerPlant.isAlive = true;
  }

  householdHasEletricity(household) {
    return household.hasEletricity;
  }
}

module.exports = World;
