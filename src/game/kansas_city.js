import { addSmallTile } from "./trail";
import { addWorker } from "./job_market";

export function kansasCity1(G, ctx, index) {
  if (G.foresight.foresight1.length == 2) {
    const tile = G.foresight.foresight1.splice(index, 1)[0];
    if (tile.tile == "worker") {
    } else {
      addSmallTile(G.trail, tile);
    }
  }
}

export function kansasCity2(G, ctx, index) {
  if (G.foresight.foresight2.length == 2) {
    const tile = G.foresight.foresight2.splice(index, 1)[0];
    if (tile.tile == "worker") {
      addWorker(G.jobMarket, tile);
    } else {
      addSmallTile(G.trail, tile);
    }
  }
}

export function kansasCity3(G, ctx, index) {
  if (G.foresight.foresight3.length == 2) {
    const tile = G.foresight.foresight3.splice(index, 1)[0];
    if (tile.tile == "worker") {
      addWorker(G.jobMarket, tile);
    } else {
      addSmallTile(G.trail, tile);
    }
  }
}

export function kansasCityShip(G, ctx) {
  G.player.location = "start";
  ctx.events.endPhase();
  //redraw
}
