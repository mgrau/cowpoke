import { StartingDeck } from "./cows";

export default class Player {
  constructor(playerID) {
    this.playerID = playerID;
    this.name = "";
    this.money = 6 + parseInt(playerID);
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

  pay_toll(ctx, hand) {
    if (hand == undefined) {
      return;
    }
    console.log(hand.includes("bla"));
    if (hand.includes("black")) {
      if (ctx.numPlayers == 3) {
        this.money -= 1;
      } else {
        this.money -= 2;
      }
    }

    if (hand.includes("green")) {
      if (ctx.numPlayers == 4) {
        this.money -= 1;
      } else {
        this.money -= 2;
      }
    }

    this.money = this.money < 0 ? 0 : this.money;
  }

  hire(G, row, col) {
    const cost = G.jobMarket.cost[row] - G.hireCostModifier;
    if (this.money >= cost) {
      const worker = G.jobMarket.hire(row, col);
      if (worker != null) {
        this.money -= cost;
        if (worker.type == "cowboy") {
          this.cowboys += 1;
        }
        if (worker.type == "craftsman") {
          this.craftsmen += 1;
        }
        if (worker.type == "engineer") {
          this.engineers += 1;
        }
      }
    }
  }
}
