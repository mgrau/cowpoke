class Building {
  constructor(name, actions = []) {
    this.name = name;
    this.actions = actions;
  }
}

const neutralA = new Building("A");
const neutralB = new Building("B");
const neutralC = new Building("C");
const neutralD = new Building("D");
const neutralE = new Building("E");
const neutralF = new Building("F");
const neutralG = new Building("G");

export { neutralA, neutralB, neutralC, neutralD, neutralE, neutralF, neutralG };
