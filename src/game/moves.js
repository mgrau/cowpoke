export function move(G, ctx, destination) {
  const currentLocation = G.players[ctx.currentPlayer].location;
  if (G.movesRemaining > 0) {
    if (G.trail.isAdjacent(currentLocation, destination)) {
      G.players[ctx.currentPlayer].location = destination;
      if (!G.trail.isEmpty(destination)) G.movesRemaining--;
    }
  }
}
