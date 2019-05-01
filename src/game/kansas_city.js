import { addSmallTile } from "./trail";
import { addWorker } from "./job_market";
import { draw } from "./moves";
import { ship } from "./cities";

export function kansasCity1(G, ctx, index) {
  if (G.actionsPerformed.includes("kansasCity1")) {
    console.log("already did this move");
  } else {
    if (!G.foresight.foresight1.every(tile => tile == null)) {
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
    if (G.actionsPerformed.includes("kansasCity1")) {
      if (!G.foresight.foresight2.every(tile => tile == null)) {
        const tile = G.foresight.foresight2.splice(index, 1)[0];
        if (tile.tile == "worker") {
          addWorker(G, ctx, tile);
        } else {
          addSmallTile(G.trail, tile);
        }
      }
      G.actionsPerformed = [...G.actionsPerformed, "kansasCity2"];
    }
  }
}

export function kansasCity3(G, ctx, index) {
  if (G.actionsPerformed.includes("kansasCity3")) {
    console.log("already did this move");
  } else {
    if (G.actionsPerformed.includes("kansasCity2")) {
      if (!G.foresight.foresight3.every(tile => tile == null)) {
        const tile = G.foresight.foresight3.splice(index, 1)[0];
        if (tile.tile == "worker") {
          addWorker(G, ctx, tile);
        } else {
          addSmallTile(G.trail, tile);
        }
      }
      G.actionsPerformed = [...G.actionsPerformed, "kansasCity3"];
    }
  }
}

export function kansasCitySell(G, ctx, certificates = 0) {
  if (G.actionsPerformed.includes("kansasCitySell")) {
    console.log("already did this move");
  } else {
    if (G.actionsPerformed.includes("kansasCity3")) {
      if (G.player.certificates >= certificates && certificates >= 0) {
        sellHerd(G, certificates);
        G.actionsPerformed = [...G.actionsPerformed, "kansasCitySell"];
      }
    }
  }
}

export function kansasCityShip(G, ctx, destination) {
  if (G.actionsPerformed.includes("kansasCityShip")) {
    console.log("already did this move");
  } else {
    if (G.actionsPerformed.includes("kansasCitySell")) {
      if (ship(G, destination)) {
        draw(G, ctx);
        refillForesight(G);
        G.player.location = "start";
        G.actionsPerformed = [...G.actionsPerformed, "kansasCityShip"];
        G.deliveryValue = undefined;
      }
    }
  }
}

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

function sellHerd(G, certificates) {
  const hand = G.player.cards.hand;
  const handValue =
    certificates +
    hand
      .filter(
        (obj, index, arr) =>
          arr.map(card => card.name).indexOf(obj.name) === index
      )
      .map(card => card.value)
      .reduce((a, b) => a + b);
  G.player.certificates -= certificates;
  G.player.money += handValue;
  G.player.cards.discard = [...G.player.cards.discard, ...hand];
  G.player.cards.hand = [];
  G.deliveryValue = handValue;
}
