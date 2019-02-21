class Building {
  constructor(name, actions = []) {
    this.tile = "neutral";
    this.name = name;
    this.actions = actions;
  }
}

const neutralA = new Building("neutralA", [
  "neutralA1",
  "neutralA2",
  "neutralA3"
]);
const neutralB = new Building("neutralB", ["neutralB1", "neutralB2"]);
const neutralC = new Building("neutralC", ["neutralC1", "neutralC2"]);
const neutralD = new Building("neutralD", ["neutralD1", "neutralD2"]);
const neutralE = new Building("neutralE", ["neutralE1", "neutralE2"]);
const neutralF = new Building("neutralF", ["neutralF1", "neutralF2"]);
const neutralG = new Building("neutralG", ["neutralG1", "neutralG2"]);

export { neutralA, neutralB, neutralC, neutralD, neutralE, neutralF, neutralG };
