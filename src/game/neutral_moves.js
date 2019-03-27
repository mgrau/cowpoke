import { INVALID_MOVE } from "boardgame.io/core";
import { handIncludes, discard, gainCertificate } from "./player";

// TODO:
// build
// gain a teepee
// gain an objective
// gain an obstacle
// double discard

export function neutralA1(G, ctx) {
  if (G.actionsPerformed.includes("neutralA1")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    if (!handIncludes(G.player, "Guernsey")) {
      console.log("no Guernsey in hand");
      // return INVALID_MOVE
    } else {
      G.player.money += 2;
      discard(G, "Guernsey");
      G.actionsPerformed = [...G.actionsPerformed, "neutralA1"];
    }
  }
}

export function neutralA2(G, ctx) {
  if (G.actionsPerformed.includes("neutralA2")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    G.hireCostModifier = 0;
    ctx.events.endPhase({ next: "HirePhase" });
    G.actionsPerformed = [...G.actionsPerformed, "neutralA2"];
  }
}

export function neutralA3(G, ctx) {
  if (G.actionsPerformed.includes("neutralA3")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    G.hireCostModifier = -2;
    ctx.events.endPhase({ next: "HirePhase" });
    G.actionsPerformed = [...G.actionsPerformed, "neutralA3"];
  }
}

export function neutralB1(G, ctx) {
  if (G.actionsPerformed.includes("neutralB1")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    if (!handIncludes(G.player, "Dutch Belt")) {
      console.log("no Dutch Belt in hand");
      // return INVALID_MOVE
    } else {
      G.player.money += 2;
      discard(G, "Dutch Belt");
      G.actionsPerformed = [...G.actionsPerformed, "neutralB1"];
    }
  }
}

export function neutralB2(G, ctx) {
  if (G.actionsPerformed.includes("neutralB2")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    // build
    G.actionsPerformed = [...G.actionsPerformed, "neutralB2"];
  }
}

export function neutralC1(G, ctx, certificate) {
  if (G.actionsPerformed.includes("neutralC1")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    console.log(certificate);
    if (certificate == null) {
      console.log("please choose an action;");
      return;
    }
    if (certificate) {
      gainCertificate(G.player);
    } else {
      // gainObjective
    }
    G.actionsPerformed = [...G.actionsPerformed, "neutralC1"];
  }
}

export function neutralC2(G, ctx) {
  if (G.actionsPerformed.includes("neutralC2")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    G.engineSpaces = G.player.engineers;
    ctx.events.endPhase({ next: "EnginePhase" });
    G.actionsPerformed = [...G.actionsPerformed, "neutralC2"];
  }
}

export function neutralD1(G, ctx, teepee) {
  if (G.actionsPerformed.includes("neutralD1")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    if (teepee == null) {
      return;
    }
    if (teepee) {
      ctx.events.endPhase({ next: "TeepeePhase" });
    } else {
      G.player.money -= 2;
      G.engineSpaces = 2;
      ctx.events.endPhase({ next: "EnginePhase" });
    }
    G.actionsPerformed = [...G.actionsPerformed, "neutralD1"];
  }
}

export function neutralD2(G, ctx) {
  if (G.actionsPerformed.includes("neutralD2")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    ctx.events.endPhase({ next: "DoubleAuxPhase" });
    G.actionsPerformed = [...G.actionsPerformed, "neutralD2"];
  }
}

export function neutralE1(G, ctx) {
  if (G.actionsPerformed.includes("neutralE1")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    if (!handIncludes(G.player, "Black Angus")) {
      console.log("no Black Angus in hand");
      // return INVALID_MOVE
    } else {
      G.player.money += 2;
      discard(G, "Black Angus");
      G.actionsPerformed = [...G.actionsPerformed, "neutralE1"];
    }
  }
}

export function neutralE2(G, ctx) {
  if (G.actionsPerformed.includes("neutralE2")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    G.availableCowboys = G.player.cowboys;
    ctx.events.endPhase({ next: "CowPhase" });
    G.actionsPerformed = [...G.actionsPerformed, "neutralE2"];
  }
}

export function neutralF1(G, ctx) {
  if (G.actionsPerformed.includes("neutralF1")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    G.discardPairValue = 4;
    ctx.events.endPhase({ next: "DiscardPairPhase" });
    G.actionsPerformed = [...G.actionsPerformed, "neutralF1"];
  }
}

export function neutralF2(G, ctx) {
  if (G.actionsPerformed.includes("neutralF2")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    if (G.player.money >= 7) {
      G.player.money -= 7;
      ctx.events.endPhase({ next: "HazardPhase" });
    }
    G.actionsPerformed = [...G.actionsPerformed, "neutralF2"];
  }
}

export function neutralG1(G, ctx) {
  if (G.actionsPerformed.includes("neutralG1")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    G.engineSpaces = G.player.engineers;
    ctx.events.endPhase({ next: "EnginePhase" });
    G.actionsPerformed = [...G.actionsPerformed, "neutralG1"];
  }
}

export function neutralG2(G, ctx) {
  if (G.actionsPerformed.includes("neutralG2")) {
    console.log("already did this move");
    // return INVALID_MOVE
  } else {
    ctx.events.endPhase({ next: "DoubleAuxPhase" });
    G.actionsPerformed = [...G.actionsPerformed, "neutralG2"];
  }
}
