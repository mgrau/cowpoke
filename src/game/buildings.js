function NeutralBuilding(name, actions = []) {
  return {
    tile: "neutral",
    name: name,
    actions: actions
  };
}

function PrivateBuilding(name, craftsmen = 0, actions = [], hand = "") {
  return {
    tile: "private",
    name: name,
    owner: null,
    craftsmen: craftsmen,
    points: points(craftsmen),
    actions: actions,
    hand: hand
  };
}

const neutralA = NeutralBuilding("neutralA", [
  "neutralA1",
  "neutralA2",
  "neutralA3"
]);
const neutralB = NeutralBuilding("neutralB", ["neutralB1", "neutralB2"]);
const neutralC = NeutralBuilding("neutralC", ["neutralC1", "neutralC2"]);
const neutralD = NeutralBuilding("neutralD", ["neutralD1", "neutralD2"]);
const neutralE = NeutralBuilding("neutralE", ["neutralE1", "neutralE2"]);
const neutralF = NeutralBuilding("neutralF", ["neutralF1", "neutralF2"]);
const neutralG = NeutralBuilding("neutralG", ["neutralG1", "neutralG2"]);

const private1a = PrivateBuilding("private1a", 1, ["private1a1"], "green");
const private2a = PrivateBuilding("private2a", 1, ["private2a1", "private2a2"]);
const private3a = PrivateBuilding("private3a", 1, ["private3a1", "private3a2"]);
const private4a = PrivateBuilding(
  "private4a",
  2,
  ["private4a1", "private4a2"],
  "black"
);
const private5a = PrivateBuilding("private5a", 3, ["private5a1", "private5a2"]);
const private6a = PrivateBuilding("private6a", 4, ["private6a1", "private6a2"]);
const private7a = PrivateBuilding(
  "private7a",
  5,
  ["private7a1"],
  "green black"
);
const private8a = PrivateBuilding(
  "private8a",
  5,
  ["private8a1", "private8a2"],
  "green"
);
const private9a = PrivateBuilding("private9a", 7, ["private9a1", "private9a2"]);
const private10a = PrivateBuilding(
  "private10a",
  9,
  ["private10a1", "private10a2"],
  "black"
);

const private1b = PrivateBuilding(
  "private1b",
  1,
  ["private1b1", "private1b2"],
  "green"
);
const private2b = PrivateBuilding("private2b", 1, ["private2b1", "private2b2"]);
const private3b = PrivateBuilding("private3b", 2, ["private3b1", "private3b2"]);
const private4b = PrivateBuilding(
  "private4b",
  2,
  ["private4b1", "private4b2"],
  "black"
);
const private5b = PrivateBuilding("private5b", 3, ["private5b1", "private5b2"]);
const private6b = PrivateBuilding("private6b", 4, ["private6b1"]);
const private7b = PrivateBuilding(
  "private7b",
  5,
  ["private7b1"],
  "green black"
);
const private8b = PrivateBuilding("private8b", 6, ["private8b1"]);
const private9b = PrivateBuilding("private9b", 6, ["private9b1"]);
const private10b = PrivateBuilding(
  "private10b",
  8,
  ["private10b1", "private10b2", "private10b3"],
  "black"
);

function points(craftsmen) {
  if (craftsmen < 6) {
    return craftsmen + 1;
  } else if (6 <= craftsmen && craftsmen < 8) {
    return craftsmen + 2;
  } else if (craftsmen == 8) {
    return craftsmen + 3;
  } else if (craftsmen == 9) {
    return craftsmen + 4;
  }
}

export {
  neutralA,
  neutralB,
  neutralC,
  neutralD,
  neutralE,
  neutralF,
  neutralG,
  private1a,
  private2a,
  private3a,
  private4a,
  private5a,
  private6a,
  private7a,
  private8a,
  private9a,
  private10a,
  private1b,
  private2b,
  private3b,
  private4b,
  private5b,
  private6b,
  private7b,
  private8b,
  private9b,
  private10b
};
