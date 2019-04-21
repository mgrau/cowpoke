import { drawOne, end } from "./moves";
import { gainCertificate } from "./player";
import { trainDistance } from "./train";

export var AuxAction = {
  Money: 0,
  Cycle: 1,
  Cert: 2,
  Engine: 3,
  Trash: 4
};

export function beginAuxMove(G, ctx) {
  ctx.events.endPhase({ next: "AuxMovePhase" });
}

export function auxDoubleMove(G, ctx, action) {
  if (action === AuxAction.Money) {
    auxMoney(G, ctx, true);
  } else if (action === AuxAction.Cycle) {
    auxCycle(G, ctx, true);
  } else if (action === AuxAction.Cert) {
    auxCertificate(G, ctx, true);
  } else if (action === AuxAction.Engine) {
    auxEngine(G, ctx, true);
  } else if (action === AuxAction.Trash) {
    auxTrash(G, ctx, true);
  }
  G.actionsPerformed = [...G.actionsPerformed, "auxDoubleMove"];
}

export function auxMove(G, ctx, action) {
  if (G.actionsPerformed.length === 0 || ctx.phase == "DoubleAuxPhase") {
    if (action === AuxAction.Money) {
      auxMoney(G, ctx, false);
    } else if (action === AuxAction.Cycle) {
      auxCycle(G, ctx, false);
    } else if (action === AuxAction.Cert) {
      auxCertificate(G, ctx, false);
    } else if (action === AuxAction.Engine) {
      auxEngine(G, ctx, false);
    } else if (action === AuxAction.Trash) {
      auxTrash(G, ctx, false);
    }
    G.actionsPerformed = [...G.actionsPerformed, "auxMove"];
  }
}

function auxMoney(G, ctx, double = false) {
  if (double && G.player.tokens.auxMoney <= 0) {
    G.player.money += 2;
  } else {
    G.player.money += 1;
  }
}

function auxCycle(G, ctx, double = false) {
  if (double && G.player.tokens.auxCycle <= 0) {
    drawOne(G, ctx);
    drawOne(G, ctx);
    G.mustDiscard = 2;
    ctx.events.endPhase({ next: "DiscardPhase" });
  } else {
    drawOne(G, ctx);
    G.mustDiscard = 1;
    ctx.events.endPhase({ next: "DiscardPhase" });
  }
}

function auxCertificate(G, ctx, double = false) {
  if (double) {
    if (
      G.player.tokens.auxCert <= 0 &&
      G.player.money >= 2 &&
      -trainDistance(G, ctx, 0) >= 2
    ) {
      G.player.money -= 2;
      gainCertificate(G.player);
      gainCertificate(G.player);
      G.engineSpaces = -2;
      ctx.events.endPhase({ next: "EnginePhase" });
    }
  } else {
    if (
      G.player.tokens.auxCert <= 1 &&
      G.player.money >= 1 &&
      -trainDistance(G, ctx, 0) >= 1
    ) {
      G.player.money -= 1;
      gainCertificate(G.player);
      G.engineSpaces = -1;
      ctx.events.endPhase({ next: "EnginePhase" });
    }
  }
}

function auxEngine(G, ctx, double = false) {
  if (double) {
    if (G.player.tokens.auxEngine <= 0 && G.player.money >= 2) {
      G.player.money -= 2;
      G.engineSpaces = 2;
      ctx.events.endPhase({ next: "EnginePhase" });
    }
  } else {
    if (G.player.tokens.auxEngine <= 1 && G.player.money >= 1) {
      G.player.money -= 1;
      G.engineSpaces = 1;
      ctx.events.endPhase({ next: "EnginePhase" });
    }
  }
}

function auxTrash(G, ctx, double = false) {
  if (double) {
    if (
      G.player.tokens.auxTrash <= 0 &&
      -trainDistance(G, ctx, 0) >= 2 &&
      G.player.cards.hand.length >= 2
    ) {
      G.mustTrash = 2;
      G.afterTrash = ctx.prevPhase;
      G.engineSpaces = -2;
      ctx.events.endPhase({ next: "TrashPhase" });
    }
  } else {
    if (
      G.player.tokens.auxTrash <= 1 &&
      -trainDistance(G, ctx, 0) >= 1 &&
      G.player.cards.hand.length >= 1
    ) {
      G.mustTrash = 1;
      // This is a really ugly hack to correctly next these phases
      G.afterTrash = ctx.phase;
      G.engineSpaces = -1;
      ctx.events.endPhase({ next: "TrashPhase" });
    }
  }
}
