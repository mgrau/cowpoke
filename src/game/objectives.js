function Objective(points, penalty) {
  return {
    action: null,
    requirements: null,
    points: points,
    penalty: penalty
  };
}
// 4 basic objective cards
// no action, 3cow+4cow+building, 3 points
// no action, 2 train stations + green teepee, 3 points
// no action, blue teepee + 2 hazards, 3 points
// no action, 2 buildings + hazard, 3 points

// 24 cards in objective deck
// drawdiscard 3, train station + 2 green teepee, 3 points, -2 points
// drawdiscard 3, train station + green teepee + blue teepee, 3 points, -2 points
// drawdiscard 3, 2 buildings + hazard, 3 points, -2 points
// drawdiscard 3, 5 cow + hazard, 3 points, -2 points
// drawdiscard 3, 3 3 cows + train stations, 4 points, -2 points
// 2 dollars, building + 2 blue treepee, 3 points, -2 points
// 2 dollars, building + green teepee + blue treepee, 3 points, -2 points
// 2 dollars, 2 train stations + hazard, 3 points, -2 points
// 2 dollars, 4 cow + 2 hazards, 3 points, -2 points
// 2 dollars, 3 3 cows + building, 3 points, -2 points
// move 3 no tolls, 2 train stations + 2 blue teepees, 5 points, -2 points
// move 3 no tolls, 2 train stations + 2 buildings, 5 points, -2 points
// move 3 no tolls, 2 buildings + 2 hazards, 5 points, -2 points
// move 3 no tolls, 3 cow + 4 cow + 2 hazards, 5 points, -2 points
// move 3 no tolls, 3 cow + 4 cow + 5 cow, 5 points, -2 points
// engine 2, 2 buildings + 2 green teepees, 5 points, -3 points
// engine 2, 2 4 cows + train station + green teepee, 5 points, -3 points
// engine 2, 3 cow + 4 cow + 5 cow, 5 points, -3 points
// engine 3, 2 train stations + 2 hazards, 5 points, -3 points
// engine 3, building + blue teepee + 2 hazards, 5 points, -3 points
// double aux, san francisco, 5 points, -3 points
// double aux, san francisco, 5 points, -3 points
// double aux, san francisco, 5 points, -3 points
// double aux, san francisco, 5 points, -3 points
