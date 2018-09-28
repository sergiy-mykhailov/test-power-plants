const chai = require('chai');
const mocha = require('mocha');
const World = require('../src/World.js');

const { assert } = chai;
const { describe, it } = mocha;

//-------- tests --------

describe("Households + Power Plants", function() {

  it("Household has no electricity by default", () => {
    const world = new World();
    const household = world.createHousehold();
    assert.equal(world.householdHasEletricity(household), false);
  });


  it("Household has electricity if connected to a Power Plant", () => {
    const world = new World();
    const household = world.createHousehold();
    const powerPlant = world.createPowerPlant();

    world.connectHouseholdToPowerPlant(household, powerPlant);

    assert.equal(world.householdHasEletricity(household), true);
  });


  it("Household won't have Electricity after disconnecting from the only Power Plant", () => {
    const world = new World();
    const household = world.createHousehold();
    const powerPlant = world.createPowerPlant();

    world.connectHouseholdToPowerPlant(household, powerPlant);

    assert.equal(world.householdHasEletricity(household), true);

    world.disconnectHouseholdFromPowerPlant(household, powerPlant);
    assert.equal(world.householdHasEletricity(household), false);
  });


  it("Household will have Electricity as long as there's at least 1 alive Power Plant connected", () => {
    const world = new World();
    const household = world.createHousehold();

    const powerPlant1 = world.createPowerPlant();
    const powerPlant2 = world.createPowerPlant();
    const powerPlant3 = world.createPowerPlant();

    world.connectHouseholdToPowerPlant(household, powerPlant1);
    world.connectHouseholdToPowerPlant(household, powerPlant2);
    world.connectHouseholdToPowerPlant(household, powerPlant3);

    assert.equal(world.householdHasEletricity(household), true);

    world.disconnectHouseholdFromPowerPlant(household, powerPlant1);
    assert.equal(world.householdHasEletricity(household), true);

    world.killPowerPlant(powerPlant2);
    assert.equal(world.householdHasEletricity(household), true);

    world.disconnectHouseholdFromPowerPlant(household, powerPlant3);
    assert.equal(world.householdHasEletricity(household), false);
  });


  it("Household won't have Electricity if the only Power Plant dies", () => {
    const world = new World();
    const household = world.createHousehold();
    const powerPlant = world.createPowerPlant();

    world.connectHouseholdToPowerPlant(household, powerPlant);

    assert.equal(world.householdHasEletricity(household), true);

    world.killPowerPlant(powerPlant);
    assert.equal(world.householdHasEletricity(household), false);
  });


  it("PowerPlant can be repaired", () => {
    const world = new World();
    const household = world.createHousehold();
    const powerPlant = world.createPowerPlant();

    world.connectHouseholdToPowerPlant(household, powerPlant);

    assert.equal(world.householdHasEletricity(household), true);

    world.killPowerPlant(powerPlant);
    assert.equal(world.householdHasEletricity(household), false);

    world.repairPowerPlant(powerPlant);
    assert.equal(world.householdHasEletricity(household), true);

    world.killPowerPlant(powerPlant);
    assert.equal(world.householdHasEletricity(household), false);

    world.repairPowerPlant(powerPlant);
    assert.equal(world.householdHasEletricity(household), true);
  });


  it("Few Households + few Power Plants, case 1", () => {
    const world = new World();

    const household1 = world.createHousehold();
    const household2 = world.createHousehold();

    const powerPlant1 = world.createPowerPlant();
    const powerPlant2 = world.createPowerPlant();

    world.connectHouseholdToPowerPlant(household1, powerPlant1);
    world.connectHouseholdToPowerPlant(household1, powerPlant2);
    world.connectHouseholdToPowerPlant(household2, powerPlant2);

    assert.equal(world.householdHasEletricity(household1), true);
    assert.equal(world.householdHasEletricity(household2), true);

    world.killPowerPlant(powerPlant2);
    assert.equal(world.householdHasEletricity(household1), true);
    assert.equal(world.householdHasEletricity(household2), false);

    world.killPowerPlant(powerPlant1);
    assert.equal(world.householdHasEletricity(household1), false);
    assert.equal(world.householdHasEletricity(household2), false);
  });


  it("Few Households + few Power Plants, case 2", () => {
    const world = new World();

    const household1 = world.createHousehold();
    const household2 = world.createHousehold();

    const powerPlant1 = world.createPowerPlant();
    const powerPlant2 = world.createPowerPlant();

    world.connectHouseholdToPowerPlant(household1, powerPlant1);
    world.connectHouseholdToPowerPlant(household1, powerPlant2);
    world.connectHouseholdToPowerPlant(household2, powerPlant2);

    world.disconnectHouseholdFromPowerPlant(household2, powerPlant2);

    assert.equal(world.householdHasEletricity(household1), true);
    assert.equal(world.householdHasEletricity(household2), false);

    world.killPowerPlant(powerPlant2);
    assert.equal(world.householdHasEletricity(household1), true);
    assert.equal(world.householdHasEletricity(household2), false);

    world.killPowerPlant(powerPlant1);
    assert.equal(world.householdHasEletricity(household1), false);
    assert.equal(world.householdHasEletricity(household2), false);
  });


  it("Household + Power Plant, case 1", () => {
    const world = new World();

    const household = world.createHousehold();
    const powerPlant = world.createPowerPlant();

    assert.equal(world.householdHasEletricity(household), false);
    world.killPowerPlant(powerPlant);

    world.connectHouseholdToPowerPlant(household, powerPlant);

    assert.equal(world.householdHasEletricity(household), false);
  });

});


describe("Households + Households + Power Plants", function() {
  it("2 Households + 1 Power Plant", () => {
    const world = new World();

    const household1 = world.createHousehold();
    const household2 = world.createHousehold();
    const powerPlant = world.createPowerPlant();

    world.connectHouseholdToPowerPlant(household1, powerPlant);
    world.connectHouseholdToHousehold(household1, household2);

    assert.equal(world.householdHasEletricity(household1), true);
    assert.equal(world.householdHasEletricity(household2), true);

    world.killPowerPlant(powerPlant);

    assert.equal(world.householdHasEletricity(household1), false);
    assert.equal(world.householdHasEletricity(household2), false);
  });


  it("Power Plant -> Household -> Household -> Household", () => {
    const world = new World();

    const household1 = world.createHousehold();
    const household2 = world.createHousehold();
    const household3 = world.createHousehold();
    const powerPlant = world.createPowerPlant();

    world.connectHouseholdToPowerPlant(household1, powerPlant);
    world.connectHouseholdToHousehold(household1, household2);
    world.connectHouseholdToHousehold(household2, household3);

    assert.equal(world.householdHasEletricity(household1), true);
    assert.equal(world.householdHasEletricity(household2), true);
    assert.equal(world.householdHasEletricity(household3), true);

    world.killPowerPlant(powerPlant);

    assert.equal(world.householdHasEletricity(household1), false);
    assert.equal(world.householdHasEletricity(household2), false);
    assert.equal(world.householdHasEletricity(household3), false);

    world.repairPowerPlant(powerPlant);

    assert.equal(world.householdHasEletricity(household1), true);
    assert.equal(world.householdHasEletricity(household2), true);
    assert.equal(world.householdHasEletricity(household3), true);

    world.disconnectHouseholdFromPowerPlant(household1, powerPlant);

    assert.equal(world.householdHasEletricity(household1), false);
    assert.equal(world.householdHasEletricity(household2), false);
    assert.equal(world.householdHasEletricity(household3), false);
  });



  it("2 Households + 2 Power Plants", () => {
    const world = new World();

    const household1 = world.createHousehold();
    const household2 = world.createHousehold();

    const powerPlant1 = world.createPowerPlant();
    const powerPlant2 = world.createPowerPlant();

    world.connectHouseholdToPowerPlant(household1, powerPlant1);
    world.connectHouseholdToPowerPlant(household2, powerPlant2);

    assert.equal(world.householdHasEletricity(household1), true);
    assert.equal(world.householdHasEletricity(household2), true);

    world.killPowerPlant(powerPlant1);

    assert.equal(world.householdHasEletricity(household1), false);
    assert.equal(world.householdHasEletricity(household2), true);

    world.connectHouseholdToHousehold(household1, household2);

    assert.equal(world.householdHasEletricity(household1), true);
    assert.equal(world.householdHasEletricity(household2), true);

    world.disconnectHouseholdFromPowerPlant(household2, powerPlant2);

    assert.equal(world.householdHasEletricity(household1), false);
    assert.equal(world.householdHasEletricity(household2), false);
  });
});
