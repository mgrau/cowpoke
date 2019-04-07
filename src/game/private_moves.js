import { handIncludes, discard, gainCertificate } from "./player";

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
      private8a0(G, ctx);
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
    }
    G.actionsPerformed = [...G.actionsPerformed, action];
  }
}

function private1a0(G, ctx) {
  G.player.money +=
    2 *
    Object.keys(G.trail)
      .filter(location => G.trail[location].woods)
      .filter(location => G.trail[location].tile != null)
      .filter(location => G.trail[location].tile.owner == ctx.currentPlayer)
      .length;
}

function private2a0(G, ctx) {
  if (handIncludes(G.player, "Guernsey")) {
    G.player.money += 4;
    discard(G, "Guernsey");
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
  if (handIncludes(G.player, "Holstein")) {
    G.player.money += 10;
    discard(G, "Holstein");
  }
}
function private6a1(G, ctx) {
  ctx.events.endPhase({ next: "DoubleAuxPhase" });
}
function private7a0(G, ctx) {
  // 2 certificates and 2 dollars per pair of (blue, green) teepees
}
function private8a0(G, ctx) {
  // either teepee or double auxillary action
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
}
function private10a0(G, ctx) {
  G.player.certificate = 6;
  gainCertificate(G.player);
}
function private10a1(G, ctx) {
  G.movesRemaining = 5;
  ctx.events.endPhase({ next: "MovePhase" });
}
