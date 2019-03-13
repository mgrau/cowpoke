import { addSmallTile } from "./trail";
import { addWorker } from "./job_market";
import { draw } from "./moves";

export function kansasCity1(G, ctx, index) {
  if (G.actionsPerformed.includes("kansasCity1")) {
    console.log("already did this move");
  } else {
    if (G.foresight.foresight1.length == 2) {
      const tile = G.foresight.foresight1.splice(index, 1)[0];
      if (tile.tile == "worker") {
      } else {
        addSmallTile(G.trail, tile);
      }
    }
    G.actionsPerformed = [...G.actionsPerformed, "kansasCity1"];
  }
}

export function kansasCity2(G, ctx, index) {
  if (G.actionsPerformed.includes("kansasCity2")) {
    console.log("already did this move");
  } else {
    if (
      G.foresight.foresight2.length == 2 &&
      G.actionsPerformed.includes("kansasCity1")
    ) {
      const tile = G.foresight.foresight2.splice(index, 1)[0];
      if (tile.tile == "worker") {
        addWorker(G.jobMarket, tile);
      } else {
        addSmallTile(G.trail, tile);
      }
      G.actionsPerformed = [...G.actionsPerformed, "kansasCity2"];
    }
  }
}

export function kansasCity3(G, ctx, index) {
  if (G.actionsPerformed.includes("kansasCity3")) {
    console.log("already did this move");
  } else {
    if (
      G.foresight.foresight3.length == 2 &&
      G.actionsPerformed.includes("kansasCity2")
    ) {
      const tile = G.foresight.foresight3.splice(index, 1)[0];
      if (tile.tile == "worker") {
        addWorker(G.jobMarket, tile);
      } else {
        addSmallTile(G.trail, tile);
      }
      G.actionsPerformed = [...G.actionsPerformed, "kansasCity3"];
    }
  }
}

export function kansasCitySell(G, ctx) {
  if (G.actionsPerformed.includes("kansasCityShip")) {
    console.log("already did this move");
  } else {
    if (G.actionsPerformed.includes("kansasCity3")) {
      G.player.location = "start";

      refillForesight(G);

      sellHerd(G);

      draw(G, ctx);

      G.actionsPerformed = [...G.actionsPerformed, "kansasCityShip"];
      ctx.events.endPhase();
    }
  }
  //redraw
}

export function kansasCityShip(G, ctx) {}

function refillForesight(G) {
  G.foresight.foresight1 = [
    ...G.foresight.foresight1,
    G.foresight.pile1.splice(0, 1)[0]
  ];
  G.foresight.foresight2 = [
    ...G.foresight.foresight2,
    G.foresight.pile2.splice(0, 1)[0]
  ];
  G.foresight.foresight3 = [
    ...G.foresight.foresight3,
    G.foresight.pile3.splice(0, 1)[0]
  ];
}

function sellHerd(G) {
  const hand = G.player.cards.hand;
  const handValue = hand
    .filter(
      (obj, index, arr) =>
        arr.map(card => card.name).indexOf(obj.name) === index
    )
    .map(card => card.value)
    .reduce((a, b) => a + b);

  G.player.cards.discard = [...G.player.cards.discard, ...hand];
  G.player.cards.hand = [];
}
