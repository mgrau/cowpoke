import { discard, gainCertificate } from "./player";

export function privateMove(G, ctx, action) {
  if (!G.actionsPerformed.includes(action)) {
    if (action == "private1a0") {
      private1a0(G, ctx);
    } else if (action == "private2a0") {
      private2a0(G, ctx);
    } else if (action == "private2a1") {
      private2a1(G, ctx);
    } else if (action == "private3a0") {
      private3a0(G, ctx);
    } else if (action == "private3a1") {
      private3a1(G, ctx);
    } else if (action == "private4a0") {
      private4a0(G, ctx);
    } else if (action == "private4a1") {
      private4a1(G, ctx);
    } else if (action == "private5a0") {
      private5a0(G, ctx);
    } else if (action == "private5a1") {
      private5a1(G, ctx);
    } else if (action == "private6a0") {
      private6a0(G, ctx);
    } else if (action == "private6a1") {
      private6a1(G, ctx);
    } else if (action == "private7a0") {
      private7a0(G, ctx);
    } else if (action == "private8a0") {
      return;
    } else if (action == "private8a0a") {
      private8a0a(G, ctx);
      G.actionsPerformed = [...G.actionsPerformed, "private8a0a"];
      return;
    } else if (action == "private8a0b") {
      private8a0b(G, ctx);
      G.actionsPerformed = [...G.actionsPerformed, "private8a0b"];
      return;
    } else if (action == "private8a1") {
      private8a1(G, ctx);
    } else if (action == "private9a0") {
      private9a0(G, ctx);
    } else if (action == "private9a1") {
      private9a1(G, ctx);
    } else if (action == "private10a0") {
      private10a0(G, ctx);
    } else if (action == "private10a1") {
      private10a1(G, ctx);
    } else if (action == "private1b0") {
      private1b0(G, ctx);
    } else if (action == "private1b1") {
      private1b1(G, ctx);
    } else if (action == "private2b0") {
      private2b0(G, ctx);
    } else if (action == "private2b1") {
      private2b1(G, ctx);
    } else if (action == "private3b0") {
      private3b0(G, ctx);
    } else if (action == "private3b1") {
      private3b1(G, ctx);
    } else if (action == "private4b0") {
      private4b0(G, ctx);
    } else if (action == "private4b1") {
      private4b1(G, ctx);
    } else if (action == "private5b0") {
      private5b0(G, ctx);
    } else if (action == "private5b1") {
      private5b1(G, ctx);
    } else if (action == "private6b0") {
      private6b0(G, ctx);
    } else if (action == "private7b0") {
      private7b0(G, ctx);
    } else if (action == "private6b0") {
      private8b0(G, ctx);
    } else if (action == "private9b0") {
      private9b0(G, ctx);
    } else if (action == "private10b0") {
      private10b0(G, ctx);
    } else if (action == "private10b1") {
      private10b1(G, ctx);
    } else if (action == "private10b2") {
      private10b2(G, ctx);
    }
    G.actionsPerformed = [...G.actionsPerformed, action];
  }
}

function private1a0(G, ctx) {
  G.player.money +=
    2 *
    Object.values(G.trail)
      .filter(tile => tile.woods)
      .filter(tile => tile.tile != null)
      .filter(tile => tile.tile.owner == ctx.currentPlayer).length;
}

function private2a0(G, ctx) {
  if (discard(G, "Guernsey")) {
    G.player.money += 4;
  }
}

function private2a1(G, ctx) {
  G.availableCowboys = G.player.cowboys;
  ctx.events.endPhase({ next: "CowPhase" });
}

function private3a0(G, ctx) {
  G.discardPairValue = 3;
  ctx.events.endPhase({ next: "DiscardPairPhase" });
}

function private3a1(G, ctx) {
  G.movesRemaining = 1;
  ctx.events.endPhase({ next: "MovePhase" });
}

function private4a0(G, ctx) {
  if (G.player.money >= 5) {
    G.player.money -= 5;
    ctx.events.endPhase({ next: "HazardPhase" });
  }
}

function private4a1(G, ctx) {
  G.movesRemaining = 2;
  ctx.events.endPhase({ next: "MovePhase" });
}

function private5a0(G, ctx) {
  G.hireCostModifier = 1;
  ctx.events.endPhase({ next: "HirePhase" });
}

function private5a1(G, ctx) {
  G.engineSpaces = G.player.engineers;
  ctx.events.endPhase({ next: "EnginePhase" });
}

function private6a0(G, ctx) {
  if (discard(G, "Holstein")) {
    G.player.money += 10;
  }
}

function private6a1(G, ctx) {
  ctx.events.endPhase({ next: "DoubleAuxPhase" });
}

function private7a0(G, ctx) {
  // 2 certificates and 2 dollars per pair of (blue, green) teepees
  const green = G.player.teepees.filter(teepee => teepee.color == "green")
    .length;
  const blue = G.player.teepees.filter(teepee => teepee.color == "blue").length;
  for (var i = 0; i < Math.min(green, blue); i++) {
    gainCertificate(G.player);
    gainCertificate(G.player);
    G.player.money += 2;
  }
}

function private8a0a(G, ctx) {
  ctx.events.endPhase({ next: "TeepeePhase" });
}

function private8a0b(G, ctx) {
  ctx.events.endPhase({ next: "DoubleAuxPhase" });
}

function private8a1(G, ctx) {
  G.engineSpaces = 2;
  ctx.events.endPhase({ next: "EnginePhase" });
}

function private9a0(G, ctx) {
  G.engineSpaces = 3;
  ctx.events.endPhase({ next: "EnginePhase" });
}

function private9a1(G, ctx) {
  //extraordinary delivery
  // first make a delivery to a city whose value is greater than or equal to the train position
  // then move the train back that many spaces
  // G.engineSpaces = -X;
  // ctx.events.endPhase({ next: "EnginePhase" });
}

function private10a0(G, ctx) {
  G.player.certificates = 6;
  gainCertificate(G.player);
}

function private10a1(G, ctx) {
  G.movesRemaining = 5;
  ctx.events.endPhase({ next: "MovePhase" });
}

function private1b0(G, ctx) {
  if (discard(G, "objective")) {
    gainCertificate(G.player);
    gainCertificate(G.player);
  }
}

function private1b1(G, ctx) {
  if (G.player.engine > 0) {
    G.engineSpaces = -1;
    ctx.events.endPhase({ next: "EnginePhase" });
    G.player.money += 3;
  }
}

function private2b0(G, ctx) {
  if (discard(G, "Jersey")) {
    G.engineSpaces = 1;
    ctx.events.endPhase({ next: "EnginePhase" });
  }
}

function private2b1(G, ctx) {
  if (discard(G, "DutchBelt")) {
    G.player.money += 3;
  }
}

function private3b0(G, ctx) {
  ctx.events.endPhase({ next: "DoubleAuxPhase" });
}

function private3b1(G, ctx) {
  G.movesRemaining = 1;
  ctx.events.endPhase({ next: "MovePhase" });
}

function private4b0(G, ctx) {
  // TODO: check if we draw all cards in deck...
  for (var i = 0; i < G.player.cowboys; i++) {
    drawOne(G, ctx);
  }

  G.mustDiscard = G.player.cowboys;
  ctx.events.endPhase({ next: "DiscardPhase" });
}

function private4b1(G, ctx) {
  G.movesRemaining = 3;
  ctx.events.endPhase({ next: "MovePhase" });
}

function private5b0(G, ctx) {
  if (discard(G, "BlackAngus")) {
    gainCertificate(G.player);
    gainCertificate(G.player);
  }
}

function private5b1(G, ctx) {
  G.player.money += G.player.engineers;
}

function private6b0(G, ctx) {
  // discard one of any card
  G.player.money += 3;
  // gain objective card to your hand
}

function private7b0(G, ctx) {
  G.engineSpaces = Object.values(G.trail)
    .filter(tile => tile.woods)
    .filter(tile => tile.tile != null)
    .filter(tile => tile.tile.owner == ctx.currentPlayer).length;

  ctx.events.endPhase({ next: "EnginePhase" });
}

function private8b0(G, ctx) {
  // do the actions of an adjacent tile...
}

function private9b0(G, ctx) {
  // upgrade any train station behind engine
}

function private10b0(G, ctx) {
  G.player.money += 4;
}

function private10b1(G, ctx) {
  G.engineSpaces = 4;
  ctx.events.endPhase({ next: "EnginePhase" });
}

function private10b2(G, ctx) {
  G.movesRemaining = 4;
  ctx.events.endPhase({ next: "MovePhase" });
}
