function WorkerTile(type) {
  if (["cowboy", "craftsman", "engineer"].includes(type)) {
    return {
      tile: "worker",
      type: type
    };
  }
}

function Teepee(color) {
  if (["blue", "green"].includes(color)) {
    return {
      tile: "teepee",
      color: color,
      hand: color == "blue" ? "black" : "green"
    };
  }
}

function Hazard(type, points, hand) {
  if (["flood", "drought", "rockfall"].includes(type)) {
    return { tile: "hazard", type: type, points: points, hand: hand };
  }
}

export default function Foresight(ctx) {
  let pile1 = [];
  let pile2 = [];
  let pile3 = [];

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

  pile1.push(Hazard("flood", 2, "green"));
  pile1.push(Hazard("flood", 2, "black"));
  pile1.push(Hazard("flood", 3, "green"));
  pile1.push(Hazard("flood", 3, "black"));
  pile1.push(Hazard("flood", 4, "green"));
  pile1.push(Hazard("flood", 4, "green"));

  pile1.push(Hazard("drought", 2, "green"));
  pile1.push(Hazard("drought", 2, "black"));
  pile1.push(Hazard("drought", 3, "green"));
  pile1.push(Hazard("drought", 3, "black"));
  pile1.push(Hazard("drought", 4, "green"));
  pile1.push(Hazard("drought", 4, "green"));

  pile1.push(Hazard("rockfall", 2, "green"));
  pile1.push(Hazard("rockfall", 2, "black"));
  pile1.push(Hazard("rockfall", 3, "green"));
  pile1.push(Hazard("rockfall", 3, "black"));
  pile1.push(Hazard("rockfall", 4, "green"));
  pile1.push(Hazard("rockfall", 4, "green"));

  for (var i = 0; i < 8; i++) {
    pile1.push(Teepee("blue"));
  }
  for (var i = 0; i < 9; i++) {
    pile1.push(Teepee("green"));
  }

  // ### 2 Tiles
  // - 12 cowboy
  // - 11 craftsman
  // - 11 engineer
  for (var i = 0; i < 12; i++) {
    pile2.push(WorkerTile("cowboy"));
  }
  for (var i = 0; i < 11; i++) {
    pile2.push(WorkerTile("craftsman"));
  }
  for (var i = 0; i < 11; i++) {
    pile2.push(WorkerTile("engineer"));
  }

  // ### 3 Tiles
  // - 3 blue teepees
  // - 2 green teepees
  // - 6 cowboy
  // - 7 craftsman
  // - 7 engineer
  for (var i = 0; i < 3; i++) {
    pile3.push(Teepee("blue"));
  }
  for (var i = 0; i < 2; i++) {
    pile3.push(Teepee("green"));
  }
  for (var i = 0; i < 6; i++) {
    pile3.push(WorkerTile("cowboy"));
  }
  for (var i = 0; i < 7; i++) {
    pile3.push(WorkerTile("craftsman"));
  }
  for (var i = 0; i < 7; i++) {
    pile3.push(WorkerTile("engineer"));
  }

  pile1 = ctx.random.Shuffle(pile1);
  pile2 = ctx.random.Shuffle(pile2);
  pile3 = ctx.random.Shuffle(pile3);

  return {
    foresight1: [pile1.pop(), pile1.pop()],
    foresight2: [pile2.pop(), pile2.pop()],
    foresight3: [pile3.pop(), pile3.pop()],
    pile1: pile1,
    pile2: pile2,
    pile3: pile3
  };
}

export function emptyWorkers(G) {
  const f = tile => tile == undefined || tile.tile != "worker";
  G.foresight.pile1 = G.foresight.pile1.filter(f);
  G.foresight.pile2 = G.foresight.pile3.filter(f);
  G.foresight.pile3 = G.foresight.pile3.filter(f);
  G.foresight.foresight1 = G.foresight.foresight1.filter(f);
  G.foresight.foresight2 = G.foresight.foresight2.filter(f);
  G.foresight.foresight3 = G.foresight.foresight3.filter(f);
}