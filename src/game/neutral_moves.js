import { INVALID_MOVE } from "boardgame.io/core";

export function neutralA1(G, ctx) {
  if (G.actionsPerformed.includes("neutralA1")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    console.log(G.player.deck.hand);
    if (G.player.handIncludes("Guernsey")) {
      G.player.money += 2;
      G.player.discard("Guernsey");
      G.actionsPerformed.push("neutralA1");
    } else {
      console.log("no Guernsey in hand");
      // return INVALID_MOVE
    }
  }
}

export function neutralA2(G, ctx) {
  if (G.actionsPerformed.includes("neutralA2")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    // hire
    G.actionsPerformed.push("neutralA2");
  }
}

export function neutralA3(G, ctx) {
  if (G.actionsPerformed.includes("neutralA3")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    // hire -2
    G.actionsPerformed.push("neutralA3");
  }
}
