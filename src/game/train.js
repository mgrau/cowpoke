export function trainDistance(G, ctx, destination) {
  let distance = destination - G.player.engine;
  for (var i = 0; i < ctx.numPlayers; i++) {
    if (G.players[i].playerID != ctx.currentPlayer) {
      if (G.players[i].engine == destination) {
        return;
      }
      if (
        G.players[i].engine > Math.min(G.player.engine, destination) &&
        G.players[i].engine < Math.max(G.player.engine, destination)
      ) {
        if (distance > 0) distance--;
        else distance++;
      }
    }
  }
  return distance;
}
