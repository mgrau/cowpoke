class Building {
  constructor(name, actions = [], player = null, craftsmen = 0, points = 0) {
    this.name = name;
    this.actions = actions;
    this.player = player;
    this.craftsmen = craftsmen;
    this.points = points;
  }
}

const neutralA = Building("A");
const neutralB = Building("B");
const neutralC = Building("C");
const neutralD = Building("D");
const neutralE = Building("E");
const neutralF = Building("F");
const neutralG = Building("G");

export { neutralA, neutralB, neutralC, neutralD, neutralE, neutralF, neutralG };
