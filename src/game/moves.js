export function move(G, ctx, destination) {
  const currentLocation = G.players[ctx.currentPlayer].location;
  if (G.movesRemaining > 0) {
    if (G.trail.isAdjacent(currentLocation, destination)) {
      G.players[ctx.currentPlayer].location = destination;
      if (!G.trail.isEmpty(destination)) G.movesRemaining--;
    }
  }
}

export function stop(G, ctx) {
  if (G.movesRemaining < G.players[ctx.currentPlayer].moves) {
    if (!G.trail.isEmpty(G.players[ctx.currentPlayer].location)) {
      console.log("ok ending phase");
      ctx.events.endPhase();
    } else {
      console.log("can not stop here");
    }
  } else {
    console.log("have not moved yet");
  }
}
