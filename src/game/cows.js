class Jersey {
  constructor() {
    this.name = "Jersey";
    this.value = 1;
    this.points = 0;
  }
}

export class Guernsey {
  constructor() {
    this.name = "Guernsey";
    this.value = 2;
    this.points = 0;
  }
}

class DutchBelt {
  constructor() {
    this.name = "Dutch Belt";
    this.value = 2;
    this.points = 0;
  }
}

class BlackAngus {
  constructor() {
    this.name = "Black Angus";
    this.value = 2;
    this.points = 0;
  }
}

class Holstein {
  constructor() {
    this.name = "Holstein";
    this.value = 3;
    this.points = 1;
  }
}

class BrownSwiss {
  constructor() {
    this.name = "Brown Swiss";
    this.value = 3;
    this.points = 2;
  }
}

class Aryshire {
  constructor() {
    this.name = "Aryshire";
    this.value = 3;
    this.points = 3;
  }
}

class WestHighland {
  constructor(points) {
    this.name = "West Highland";
    this.value = 4;
    this.points = points;
  }
}

class TexasLonghorn {
  constructor(points) {
    this.name = "Texas Longhorn";
    this.value = 5;
    this.points = points;
  }
}

export class StartingDeck {
  constructor() {
    this.deck = [];
    this.discard = [];
    this.hand = [];
    this.deck.push(new Jersey());
    this.deck.push(new Jersey());
    this.deck.push(new Jersey());
    this.deck.push(new Jersey());
    this.deck.push(new Jersey());
    this.deck.push(new Guernsey());
    this.deck.push(new Guernsey());
    this.deck.push(new Guernsey());
    this.deck.push(new DutchBelt());
    this.deck.push(new DutchBelt());
    this.deck.push(new DutchBelt());
    this.deck.push(new BlackAngus());
    this.deck.push(new BlackAngus());
    this.deck.push(new BlackAngus());
  }

  draw(ctx) {
    if (this.deck.length == 0) {
      this.deck = this.discard;
      this.discard = [];
    }
    this.deck = ctx.random.Shuffle(this.deck);
    this.hand.push(this.deck.pop());
  }
}

export const market_cattle = [];
market_cattle.push(new Holstein());
market_cattle.push(new Holstein());
market_cattle.push(new Holstein());
market_cattle.push(new Holstein());
market_cattle.push(new Holstein());
market_cattle.push(new Holstein());
market_cattle.push(new Holstein());

market_cattle.push(new BrownSwiss());
market_cattle.push(new BrownSwiss());
market_cattle.push(new BrownSwiss());
market_cattle.push(new BrownSwiss());
market_cattle.push(new BrownSwiss());
market_cattle.push(new BrownSwiss());
market_cattle.push(new BrownSwiss());

market_cattle.push(new Aryshire());
market_cattle.push(new Aryshire());
market_cattle.push(new Aryshire());
market_cattle.push(new Aryshire());
market_cattle.push(new Aryshire());
market_cattle.push(new Aryshire());
market_cattle.push(new Aryshire());

market_cattle.push(new WestHighland(3));
market_cattle.push(new WestHighland(3));
market_cattle.push(new WestHighland(3));
market_cattle.push(new WestHighland(4));
market_cattle.push(new WestHighland(4));
market_cattle.push(new WestHighland(4));
market_cattle.push(new WestHighland(5));
market_cattle.push(new WestHighland(5));
market_cattle.push(new WestHighland(5));

market_cattle.push(new TexasLonghorn(5));
market_cattle.push(new TexasLonghorn(5));
market_cattle.push(new TexasLonghorn(6));
market_cattle.push(new TexasLonghorn(6));
market_cattle.push(new TexasLonghorn(7));
market_cattle.push(new TexasLonghorn(7));
