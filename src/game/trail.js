class Space {
  constructor(name, prev = [], build = true, woods = false) {
    this.prev = Array.isArray(prev) ? prev : [prev];
    this.name = name;
    this.build = build;
    this.woods = woods;
    this.tile = {};
  }
}

class Trail {
  constructor(start) {
    this.trail = [start];
  }

  get(name) {
    return this.trail.find(space => space.name === name);
  }

  getNext(name) {
    return this.trail
      .filter(sp => sp.prev.includes(name))
      .map(space => space.name);
  }

  isAdjacent(start, end) {
    return this.getNext(start).includes(end);
  }

  add(newSpace) {
    this.trail.push(newSpace);
  }

  isEmpty(space) {
    return Object.entries(this.get(space).tile).length === 0;
  }

  addBuilding(space, Building) {
    this.get(space).tile = Building;
  }

  addSmallTile(tile) {
    if (tile.tile == "hazard") {
      for (var i = 0; i < 4; i++) {
        const space = tile.type + (i + 1);
        if (this.isEmpty(space)) {
          this.get(space).tile = tile;
          console.log("placing hazard in " + space);
          return;
        }
      }
    } else if (tile.tile == "teepee") {
      const teepees = this.trail
        .filter(space => space.name.match("teepee[-0-9]"))
        .map(space => space.name);
      for (var i = 0; i < teepees.length; i++) {
        if (this.isEmpty(teepees[i])) {
          this.get(teepees[i]).tile = tile;
          console.log("placing teepee in " + teepees[i]);
          return;
        }
      }
    } else {
      console.log(tile.tile);
    }
  }
}

const trail = new Trail(new Space("start", [], false));
trail.add(new Space("A", "start"));
trail.add(new Space("A1", "A"));
trail.add(new Space("A2", "A1"));
trail.add(new Space("A3", "A2"));
trail.add(new Space("flood1", "A", false));
trail.add(new Space("flood2", "flood1", false));
trail.add(new Space("flood3", "flood2", false));
trail.add(new Space("flood4", "flood3", false));
trail.add(new Space("floodRisk1", "flood4"));
trail.add(new Space("floodRisk2", "floodRisk1", true, true));
trail.add(new Space("B", ["A3", "floodRisk2"]));
trail.add(new Space("B1", "B", true, true));
trail.add(new Space("B2", "B1"));
trail.add(new Space("B3", "B2"));
trail.add(new Space("drought1", "B", false));
trail.add(new Space("drought2", "drought1", false));
trail.add(new Space("drought3", "drought2", false));
trail.add(new Space("drought4", "drought3", false));
trail.add(new Space("droughtRisk1", "drought4"));
trail.add(new Space("C", ["B3", "droughtRisk1"]));
trail.add(new Space("C1", "C", true, true));
trail.add(new Space("C2", "C1", true, true));
trail.add(new Space("C3", "C"));
trail.add(new Space("D", "C3"));
trail.add(new Space("teepee-3", "", false));
trail.add(new Space("teepee-2", "", false));
trail.add(new Space("teepee-1", "", false));
trail.add(new Space("teepee1", "C3", false));
trail.add(new Space("teepee2", "teepee1", false));
trail.add(new Space("teepee4", "teepee2", false));
trail.add(new Space("teepee6", "teepee4", false));
trail.add(new Space("teepee8", "teepee6", false));
trail.add(new Space("teepee10", "teepee8", false));
trail.add(new Space("teepeeRisk1", "teepee10"));
trail.add(new Space("teepeeRisk2", "teepeeRisk1"));
trail.add(new Space("E", ["C2", "D", "teepeeRisk2"]));
trail.add(new Space("E1", "E", true, true));
trail.add(new Space("E2", "E1", true, true));
trail.add(new Space("rockfall1", "E", false));
trail.add(new Space("rockfall2", "rockfall1", false));
trail.add(new Space("rockfall3", "rockfall2", false));
trail.add(new Space("rockfall4", "rockfall3", false));
trail.add(new Space("rockfallRisk1", "rockfall4"));
trail.add(new Space("rockfallRisk2", "rockfallRisk1", true, true));
trail.add(new Space("F", ["E2", "rockfallRisk2"]));
trail.add(new Space("F1", "F"));
trail.add(new Space("F2", "F", true, true));
trail.add(new Space("G", ["F1", "F2"]));
trail.add(new Space("G1", "G"));
trail.add(new Space("G2", "G"));
trail.add(new Space("KansasCity", ["G1", "G2"], false));
trail.get("KansasCity").tile = { name: "KansasCity" };
export default trail;
