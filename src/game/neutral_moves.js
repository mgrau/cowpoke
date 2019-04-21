import { INVALID_MOVE } from "boardgame.io/core";
import { discard, gainCertificate } from "./player";

// TODO:
// gain an objective

export function neutralMove(G, ctx, action) {
  if (!G.actionsPerformed.includes(action)) {
    if (action == "neutralA0") {
      neutralA0(G, ctx);
    } else if (action == "neutralA1") {
      neutralA1(G, ctx);
    } else if (action == "neutralA2") {
      neutralA2(G, ctx);
    } else if (action == "neutralB0") {
      neutralB0(G, ctx);
    } else if (action == "neutralB1") {
      neutralB1(G, ctx);
    } else if (action == "neutralC0") {
      return;
    } else if (action == "neutralC0a") {
      neutralC0a(G, ctx);
      G.actionsPerformed = [...G.actionsPerformed, "neutralC0"];
      return;
    } else if (action == "neutralC0b") {
      neutralC0b(G, ctx);
      G.actionsPerformed = [...G.actionsPerformed, "neutralC0"];
      return;
    } else if (action == "neutralC1") {
      neutralC1(G, ctx);
    } else if (action == "neutralD0") {
      return;
    } else if (action == "neutralD0a") {
      neutralD0a(G, ctx);
      G.actionsPerformed = [...G.actionsPerformed, "neutralD0"];
      return;
    } else if (action == "neutralD0b") {
      neutralD0b(G, ctx);
      G.actionsPerformed = [...G.actionsPerformed, "neutralD0"];
      return;
    } else if (action == "neutralD1") {
      neutralD1(G, ctx);
    } else if (action == "neutralE0") {
      neutralE0(G, ctx);
    } else if (action == "neutralE1") {
      neutralE1(G, ctx);
    } else if (action == "neutralF0") {
      neutralF0(G, ctx);
    } else if (action == "neutralF1") {
      neutralF1(G, ctx);
    } else if (action == "neutralG0") {
      neutralG0(G, ctx);
    } else if (action == "neutralG1") {
      neutralG1(G, ctx);
    }
    G.actionsPerformed = [...G.actionsPerformed, action];
  }
}

function neutralA0(G, ctx) {
  if (discard(G, "Guernsey")) {
    G.player.money += 2;
  }
}

function neutralA1(G, ctx) {
  G.hireCostModifier = 0;
  ctx.events.endPhase({ next: "HirePhase" });
}

function neutralA2(G, ctx) {
  G.hireCostModifier = -2;
  ctx.events.endPhase({ next: "HirePhase" });
}

function neutralB0(G, ctx) {
  if (discard(G, "Dutch Belt")) {
    G.player.money += 2;
  }
}

function neutralB1(G, ctx) {
  G.buildCost = 2;
  ctx.events.endPhase({ next: "BuildPhase" });
}

function neutralC0a(G, ctx) {
  gainCertificate(G.player);
}

function neutralC0b(G, ctx) {
  // gainObjective
}

function neutralC1(G, ctx) {
  G.engineSpaces = G.player.engineers;
  ctx.events.endPhase({ next: "EnginePhase" });
}

function neutralD0a(G, ctx) {
  ctx.events.endPhase({ next: "TeepeePhase" });
}

function neutralD0b(G, ctx) {
  G.player.money -= 2;
  G.engineSpaces = 2;
  ctx.events.endPhase({ next: "EnginePhase" });
}

function neutralD1(G, ctx) {
  ctx.events.endPhase({ next: "DoubleAuxPhase" });
}

function neutralE0(G, ctx) {
  if (discard(G, "Black Angus")) {
    G.player.money += 2;
  }
}

function neutralE1(G, ctx) {
  G.availableCowboys = G.player.cowboys;
  ctx.events.endPhase({ next: "CowPhase" });
}

function neutralF0(G, ctx) {
  G.discardPairValue = 4;
  ctx.events.endPhase({ next: "DiscardPairPhase" });
}

function neutralF1(G, ctx) {
  if (G.player.money >= 7) {
    G.player.money -= 7;
    ctx.events.endPhase({ next: "HazardPhase" });
  }
}

function neutralG0(G, ctx) {
  G.engineSpaces = G.player.engineers;
  ctx.events.endPhase({ next: "EnginePhase" });
}

function neutralG1(G, ctx) {
  ctx.events.endPhase({ next: "DoubleAuxPhase" });
}
