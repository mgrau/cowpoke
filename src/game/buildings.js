function NeutralBuilding(name, actions = 0) {
  return {
    tile: "neutral",
    name: name,
    actions: actions
  };
}

function PrivateBuilding(name, craftsmen = 0, actions = 0, hand = "") {
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

const neutralA = NeutralBuilding("neutralA", 3);
const neutralB = NeutralBuilding("neutralB", 2);
const neutralC = NeutralBuilding("neutralC", 2);
const neutralD = NeutralBuilding("neutralD", 2);
const neutralE = NeutralBuilding("neutralE", 2);
const neutralF = NeutralBuilding("neutralF", 2);
const neutralG = NeutralBuilding("neutralG", 2);

const private1a = PrivateBuilding("private1a", 1, 1, "green");
const private2a = PrivateBuilding("private2a", 1, 2);
const private3a = PrivateBuilding("private3a", 1, 2);
const private4a = PrivateBuilding("private4a", 2, 2, "black");
const private5a = PrivateBuilding("private5a", 3, 2);
const private6a = PrivateBuilding("private6a", 4, 2);
const private7a = PrivateBuilding("private7a", 5, 1, "green black");
const private8a = PrivateBuilding("private8a", 5, 2, "green");
const private9a = PrivateBuilding("private9a", 7, 2);
const private10a = PrivateBuilding("private10a", 9, 2, "black");

const private1b = PrivateBuilding("private1b", 1, 2, "green");
const private2b = PrivateBuilding("private2b", 1, 2);
const private3b = PrivateBuilding("private3b", 2, 2);
const private4b = PrivateBuilding("private4b", 2, 2, "black");
const private5b = PrivateBuilding("private5b", 3, 2);
const private6b = PrivateBuilding("private6b", 4, 1);
const private7b = PrivateBuilding("private7b", 5, 1, "green black");
const private8b = PrivateBuilding("private8b", 6, 1);
const private9b = PrivateBuilding("private9b", 6, 1);
const private10b = PrivateBuilding("private10b", 8, 3, "black");

export const neutrals = [
  neutralA,
  neutralB,
  neutralC,
  neutralD,
  neutralE,
  neutralF,
  neutralG
];

export const privateA = [
  private1a,
  private2a,
  private3a,
  private4a,
  private5a,
  private6a,
  private7a,
  private8a,
  private9a,
  private10a
];

export const privateB = [
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
];
