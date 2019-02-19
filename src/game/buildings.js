class Building {
  constructor(name, actions = []) {
    this.name = name;
    this.actions = actions;
  }
}

const neutralA = new Building("neutralA");
const neutralB = new Building("neutralB");
const neutralC = new Building("neutralC");
const neutralD = new Building("neutralD");
const neutralE = new Building("neutralE");
const neutralF = new Building("neutralF");
const neutralG = new Building("neutralG");

export { neutralA, neutralB, neutralC, neutralD, neutralE, neutralF, neutralG };
