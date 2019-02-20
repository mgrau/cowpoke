class WorkerTile {
  constructor(type) {
    this.tile = "worker";
    if (["cowboy", "craftsman", "engineer"].includes(type)) {
      this.type = type;
    }
  }
}

class Teepee {
  constructor(color) {
    this.tile = "teepee";
    if (["blue", "green"].includes(color)) {
      this.color = color;
      this.hand = color == "blue" ? "black" : "green";
    }
  }
}

class Hazard {
  constructor(type, points, hand) {
    this.tile = "hazard";
    if (["flood", "drought", "rockfall"].includes(type)) {
      this.type = type;
      this.points = points;
      this.hand = hand;
    }
  }
}

export default class Foresight {
  constructor(ctx) {
    this.pile1 = [];
    this.pile2 = [];
    this.pile3 = [];

    // ### 1 Tiles
    // - 6 flood hazards
    //   - 2x4pt, green hands
    //   - 2x 3pt, one green hand, one black hand
    //   - 2x 2pt, one green hand, one black hand
    // - 6 drought hazards
    //   - 2x4pt, green hands
    //   - 2x 3pt, one green hand, one black hand
    //   - 2x 2pt, one green hand, one black hand
    // - 6 rockfall hazards
    //   - 2x4pt, green hands
    //   - 2x 3pt, one green hand, one black hand
    //   - 2x 2pt, one green hand, one black hand
    // - 8 blue teepee, black hand
    // - 9 green teepee, green hand

    this.pile1.push(new Hazard("flood", 2, "green"));
    this.pile1.push(new Hazard("flood", 2, "black"));
    this.pile1.push(new Hazard("flood", 3, "green"));
    this.pile1.push(new Hazard("flood", 3, "black"));
    this.pile1.push(new Hazard("flood", 4, "green"));
    this.pile1.push(new Hazard("flood", 4, "green"));

    this.pile1.push(new Hazard("drought", 2, "green"));
    this.pile1.push(new Hazard("drought", 2, "black"));
    this.pile1.push(new Hazard("drought", 3, "green"));
    this.pile1.push(new Hazard("drought", 3, "black"));
    this.pile1.push(new Hazard("drought", 4, "green"));
    this.pile1.push(new Hazard("drought", 4, "green"));

    this.pile1.push(new Hazard("rockfall", 2, "green"));
    this.pile1.push(new Hazard("rockfall", 2, "black"));
    this.pile1.push(new Hazard("rockfall", 3, "green"));
    this.pile1.push(new Hazard("rockfall", 3, "black"));
    this.pile1.push(new Hazard("rockfall", 4, "green"));
    this.pile1.push(new Hazard("rockfall", 4, "green"));

    for (var i = 0; i < 8; i++) {
      this.pile1.push(new Teepee("blue"));
    }
    for (var i = 0; i < 9; i++) {
      this.pile1.push(new Teepee("green"));
    }

    // ### 2 Tiles
    // - 12 cowboy
    // - 11 craftsman
    // - 11 engineer
    for (var i = 0; i < 12; i++) {
      this.pile2.push(new WorkerTile("cowboy"));
    }
    for (var i = 0; i < 11; i++) {
      this.pile2.push(new WorkerTile("craftsman"));
    }
    for (var i = 0; i < 11; i++) {
      this.pile2.push(new WorkerTile("engineer"));
    }

    // ### 3 Tiles
    // - 3 blue teepees
    // - 2 green teepees
    // - 6 cowboy
    // - 7 craftsman
    // - 7 engineer
    for (var i = 0; i < 3; i++) {
      this.pile3.push(new Teepee("blue"));
    }
    for (var i = 0; i < 2; i++) {
      this.pile3.push(new Teepee("green"));
    }
    for (var i = 0; i < 6; i++) {
      this.pile3.push(new WorkerTile("cowboy"));
    }
    for (var i = 0; i < 7; i++) {
      this.pile3.push(new WorkerTile("craftsman"));
    }
    for (var i = 0; i < 7; i++) {
      this.pile3.push(new WorkerTile("engineer"));
    }

    this.pile1 = ctx.random.Shuffle(this.pile1);
    this.pile2 = ctx.random.Shuffle(this.pile2);
    this.pile3 = ctx.random.Shuffle(this.pile3);
  }
}
