// 4 basic objective cards
export function BasicObjectives(ctx) {
  return ctx.random.Shuffle([
    // no action, 3cow+4cow+building, 3 points
    // no action, 2 train stations + green teepee, 3 points
    // no action, blue teepee + 2 hazards, 3 points
    // no action, 2 buildings + hazard, 3 points
    Objective(3, 0, null, ["3cow", "4cow", "building"]),
    Objective(3, 0, null, ["train", "train", "green"]),
    Objective(3, 0, null, ["blue", "hazard", "hazard"]),
    Objective(3, 0, null, ["building", "building", "hazard"])
  ]);
}

// 24 cards in objective deck
export function Objectives(ctx) {
  return ctx.random.Shuffle([
    // drawdiscard 3, train station + 2 green teepee, 3 points, -2 points
    // drawdiscard 3, train station + green teepee + blue teepee, 3 points, -2 points
    // drawdiscard 3, 2 buildings + hazard, 3 points, -2 points
    // drawdiscard 3, 5 cow + hazard, 3 points, -2 points
    // drawdiscard 3, 3 3 cows + train stations, 4 points, -2 points
    Objective(3, -2, "draw3", ["train", "green", "green"]),
    Objective(3, -2, "draw3", ["train", "green", "blue"]),
    Objective(3, -2, "draw3", ["buildings", "buildings", "hazard"]),
    Objective(3, -2, "draw3", ["5cow", "hazard"]),
    Objective(4, -2, "draw3", ["3cow", "3cow", "3cow", "train"]),
    // 2 dollars, building + 2 blue treepee, 3 points, -2 points
    // 2 dollars, building + green teepee + blue treepee, 3 points, -2 points
    // 2 dollars, 2 train stations + hazard, 3 points, -2 points
    // 2 dollars, 4 cow + 2 hazards, 3 points, -2 points
    // 2 dollars, 3 3 cows + building, 3 points, -2 points
    Objective(3, -2, "2$", ["building", "blue", "blue"]),
    Objective(3, -2, "2$", ["building", "green", "blue"]),
    Objective(3, -2, "2$", ["train", "train", "hazard"]),
    Objective(3, -2, "2$", ["4cow", "hazard", "hazard"]),
    Objective(3, -2, "2$", ["3cow", "3cow", "3cow", "building"]),
    // move 3 no tolls, 2 train stations + 2 blue teepees, 5 points, -2 points
    // move 3 no tolls, 2 train stations + 2 buildings, 5 points, -2 points
    // move 3 no tolls, 2 buildings + 2 hazards, 5 points, -2 points
    // move 3 no tolls, 3 cow + 4 cow + 2 hazards, 5 points, -2 points
    // move 3 no tolls, 3 cow + 4 cow + 5 cow, 5 points, -2 points
    Objective(5, -2, "move3", ["train", "train", "blue", "blue"]),
    Objective(5, -2, "move3", ["train", "train", "building", "building"]),
    Objective(5, -2, "move3", ["building", "building", "hazard", "hazard"]),
    Objective(5, -2, "move3", ["3cow", "4cow", "hazard", "hazard"]),
    Objective(5, -2, "move3", ["3cow", "4cow", "5cow"]),
    // engine 2, 2 buildings + 2 green teepees, 5 points, -3 points
    // engine 2, 2 4 cows + train station + green teepee, 5 points, -3 points
    // engine 2, 3 cow + 4 cow + 5 cow, 5 points, -3 points
    // engine 3, 2 train stations + 2 hazards, 5 points, -3 points
    // engine 3, building + blue teepee + 2 hazards, 5 points, -3 points
    Objective(5, -3, "engine2", ["building", "building", "green", "green"]),
    Objective(5, -3, "engine2", ["4cow", "4cow", "train", "green"]),
    Objective(5, -3, "engine2", ["3cow", "4cow", "5cow"]),
    Objective(5, -3, "engine3", ["train", "train", "hazard", "hazard"]),
    Objective(5, -3, "engine3", ["building", "blue", "hazard", "hazard"]),
    // double aux, san francisco, 5 points, -3 points
    // double aux, san francisco, 5 points, -3 points
    // double aux, san francisco, 5 points, -3 points
    // double aux, san francisco, 5 points, -3 points
    Objective(5, -3, "aux", ["sanfran"]),
    Objective(5, -3, "aux", ["sanfran"]),
    Objective(5, -3, "aux", ["sanfran"]),
    Objective(5, -3, "aux", ["sanfran"])
  ]);
}

export function refillObjectives(G) {
  while (G.objectives.length < 4) {
    G.objectives = [...G.objectives, G.objectiveDeck.pop()];
  }
}

function Objective(points, penalty, action, requirements) {
  return {
    action: action,
    requirements: requirements,
    points: points,
    penalty: penalty
  };
}
