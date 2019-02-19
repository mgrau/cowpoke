import { StartingDeck } from "./cows";

export default class Player {
  constructor(playerID) {
    this.playerID = playerID;
    this.name = "";
    if (playerID == 0) {
      this.color = "rgb(66, 138, 255)";
    } else if (playerID == 1) {
      this.color = "rgb(163, 0, 0)";
    } else if (playerID == 2) {
      this.color = "rgb(255, 229, 0)";
    } else {
      this.color = "rgb(255, 255, 255)";
    }
    this.money = 6;
    this.deck = new StartingDeck();
    this.cowboys = 1;
    this.craftsmen = 1;
    this.engineers = 1;
    this.location = "start";
    this.engine = 0;
    this.certificates = 0;
  }

  moves(ctx) {
    return 3;
  }

  hand_size() {
    return 4;
  }

  draw(ctx) {
    while (this.deck.hand.length < this.hand_size()) {
      this.deck.draw(ctx);
    }
  }

  discard(name) {
    const index = this.deck.hand.findIndex(cow => cow.name == name);
    this.deck.discard.push(this.deck.hand.splice(index, 1));
  }

  handIncludes(name) {
    return this.deck.hand.map(cow => cow.name).includes(name);
  }
}
