function Space(name, prev = [], build = true, woods = false) {
  return {
    prev: Array.isArray(prev) ? prev : [prev],
    name: name,
    build: build,
    woods: woods,
    tile: null
  };
}

function getNext(trail, name) {
  return Object.keys(trail).filter(sp => trail[sp].prev.includes(name));
}

export function isAdjacent(trail, start, end) {
  return getNext(trail, start).includes(end);
}

export function addSmallTile(trail, tile) {
  if (tile.tile == "hazard") {
    for (var i = 0; i < 4; i++) {
      const space = tile.type + (i + 1);
      if (trail[space].tile == null) {
        trail[space].tile = tile;
        // console.log("placing hazard in " + space);
        return;
      }
    }
  } else if (tile.tile == "teepee") {
    const teepees = Object.keys(trail).filter(name =>
      /teepee[-0-9]/.test(name)
    );
    for (var i = 0; i < teepees.length; i++) {
      if (trail[teepees[i]].tile == null) {
        trail[teepees[i]].tile = tile;
        // console.log("placing teepee in " + teepees[i]);
        return;
      }
    }
  } else {
    console.log(tile.tile);
  }
}

export default function MakeTrail() {
  let trail = {
    start: Space("start", [], false),
    A: Space("A", "start"),
    A1: Space("A1", "A"),
    A2: Space("A2", "A1"),
    A3: Space("A3", "A2"),
    flood1: Space("flood1", "A", false),
    flood2: Space("flood2", "flood1", false),
    flood3: Space("flood3", "flood2", false),
    flood4: Space("flood4", "flood3", false),
    floodRisk1: Space("floodRisk1", "flood4"),
    floodRisk2: Space("floodRisk2", "floodRisk1", true, true),
    B: Space("B", ["A3", "floodRisk2"]),
    B1: Space("B1", "B", true, true),
    B2: Space("B2", "B1"),
    B3: Space("B3", "B2"),
    drought1: Space("drought1", "B", false),
    drought2: Space("drought2", "drought1", false),
    drought3: Space("drought3", "drought2", false),
    drought4: Space("drought4", "drought3", false),
    droughtRisk1: Space("droughtRisk1", "drought4"),
    C: Space("C", ["B3", "droughtRisk1"]),
    C1: Space("C1", "C", true, true),
    C2: Space("C2", "C1", true, true),
    C3: Space("C3", "C"),
    D: Space("D", "C3"),
    "teepee-3": Space("teepee-3", "", false),
    "teepee-2": Space("teepee-2", "", false),
    "teepee-1": Space("teepee-1", "", false),
    teepee1: Space("teepee1", "C3", false),
    teepee2: Space("teepee2", "teepee1", false),
    teepee4: Space("teepee4", "teepee2", false),
    teepee6: Space("teepee6", "teepee4", false),
    teepee8: Space("teepee8", "teepee6", false),
    teepee10: Space("teepee10", "teepee8", false),
    teepeeRisk1: Space("teepeeRisk1", "teepee10"),
    teepeeRisk2: Space("teepeeRisk2", "teepeeRisk1"),
    E: Space("E", ["C2", "D", "teepeeRisk2"]),
    E1: Space("E1", "E", true, true),
    E2: Space("E2", "E1", true, true),
    rockfall1: Space("rockfall1", "E", false),
    rockfall2: Space("rockfall2", "rockfall1", false),
    rockfall3: Space("rockfall3", "rockfall2", false),
    rockfall4: Space("rockfall4", "rockfall3", false),
    rockfallRisk1: Space("rockfallRisk1", "rockfall4"),
    rockfallRisk2: Space("rockfallRisk2", "rockfallRisk1", true, true),
    F: Space("F", ["E2", "rockfallRisk2"]),
    F1: Space("F1", "F"),
    F2: Space("F2", "F", true, true),
    G: Space("G", ["F1", "F2"]),
    G1: Space("G1", "G"),
    G2: Space("G2", "G"),
    KansasCity: Space("KansasCity", ["G1", "G2"], false)
  };
  trail["KansasCity"].tile = { name: "KansasCity" };
  return trail;
}
