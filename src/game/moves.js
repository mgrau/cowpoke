import { INVALID_MOVE } from "boardgame.io/core";

export function move(G, ctx, destination) {
  const currentLocation = G.players[ctx.currentPlayer].location;
  if (G.movesRemaining <= 0) {
    console.log("no moves remaining");
    // return INVALID_MOVE;
  } else {
    if (!G.trail.isAdjacent(currentLocation, destination)) {
      console.log("that space is not adjacent");
      // return INVALID_MOVE;
    } else {
      G.players[ctx.currentPlayer].location = destination;
      if (!G.trail.isEmpty(destination)) G.movesRemaining--;
    }
  }
}

export function stop(G, ctx) {
  if (G.movesRemaining == G.players[ctx.currentPlayer].moves) {
    console.log("have not moved yet");
    // return INVALID_MOVE;
  } else {
    if (G.trail.isEmpty(G.players[ctx.currentPlayer].location)) {
      console.log("can not stop here");
      // return INVALID_MOVE;
    } else {
      console.log("ok ending phase");
      switch (G.players[ctx.currentPlayer].location) {
        case "KansasCity":
          ctx.events.endPhase({ next: "KansasCity" });
          break;
        default:
          ctx.events.endPhase();
      }
    }
  }
}

export function kansas_city(G, ctx) {
  G.players[ctx.currentPlayer].location = "start";
  ctx.events.endPhase();
}
