export function trainDistance(G, ctx, destination) {
  let distance = destination - G.player.engine;
  const opponents = Object.keys(G.players)
    .filter(player => player != ctx.currentPlayer)
    .map(player => G.players[player]);

  opponents.forEach(player => {
    if (
      player.engine > Math.min(G.player.engine, destination) &&
      player.engine < Math.max(G.player.engine, destination)
    ) {
      if (distance > 0) {
        distance--;
      } else {
        distance++;
      }
    }
  });
  return distance;
}
