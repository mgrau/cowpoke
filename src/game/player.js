export default class Player {
  constructor(playerID) {
    this.playerID = playerID;
    this.money = 6;
    this.deck = [];
    this.moves = 3;
    this.cowboys = 1;
    this.craftsmen = 1;
    this.engineers = 1;
    this.location = "start";
    this.engine = 0;
    this.certificates = 0;
  }
}
