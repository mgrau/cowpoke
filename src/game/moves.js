import { INVALID_MOVE } from "boardgame.io/core";

export function move(G, ctx, destination) {
  const currentLocation = G.player.location;
  if (G.movesRemaining <= 0) {
    console.log("no moves remaining");
    // return INVALID_MOVE;
  } else {
    if (!G.trail.isAdjacent(currentLocation, destination)) {
      console.log("that space is not adjacent");
      // return INVALID_MOVE;
    } else {
      G.player.location = destination;
      if (!G.trail.isEmpty(destination)) G.movesRemaining--;
    }
  }
}

export function stop(G, ctx) {
  if (G.movesRemaining == G.player.moves) {
    console.log("have not moved yet");
    // return INVALID_MOVE;
  } else {
    if (G.trail.isEmpty(G.player.location)) {
      console.log("can not stop here");
      // return INVALID_MOVE;
    } else {
      console.log("ok ending phase");
      console.log(G.trail.get(G.player.location).tile.name);
      switch (G.trail.get(G.player.location).tile.name) {
        case "KansasCity":
          ctx.events.endPhase({ next: "KansasCity" });
          break;
        case "neutralA":
          ctx.events.endPhase({ next: "neutralA" });
          break;
        case "neutralB":
          ctx.events.endPhase({ next: "neutralB" });
          break;
        case "neutralC":
          ctx.events.endPhase({ next: "neutralC" });
          break;
        case "neutralD":
          ctx.events.endPhase({ next: "neutralD" });
          break;
        case "neutralE":
          ctx.events.endPhase({ next: "neutralE" });
          break;
        case "neutralF":
          ctx.events.endPhase({ next: "neutralF" });
          break;
        case "neutralG":
          ctx.events.endPhase({ next: "neutralG" });
          break;
        default:
          ctx.events.endPhase();
      }
    }
  }
}

export function pass(G, ctx) {
  G.player.draw(ctx);
  ctx.events.endPhase({ next: "MovePhase" });
  ctx.events.endTurn();
}

export function kansas_city(G, ctx) {
  G.player.location = "start";
  ctx.events.endPhase();
}
