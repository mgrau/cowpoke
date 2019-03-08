function Building(name, actions = []) {
  return {
    tile: "neutral",
    name: name,
    actions: actions
  };
}

const neutralA = Building("neutralA", ["neutralA1", "neutralA2", "neutralA3"]);
const neutralB = Building("neutralB", ["neutralB1", "neutralB2"]);
const neutralC = Building("neutralC", ["neutralC1", "neutralC2"]);
const neutralD = Building("neutralD", ["neutralD1", "neutralD2"]);
const neutralE = Building("neutralE", ["neutralE1", "neutralE2"]);
const neutralF = Building("neutralF", ["neutralF1", "neutralF2"]);
const neutralG = Building("neutralG", ["neutralG1", "neutralG2"]);

export { neutralA, neutralB, neutralC, neutralD, neutralE, neutralF, neutralG };
