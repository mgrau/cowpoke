import { pass, drawOne } from "./moves";

export var AuxAction = {
  MONEY: 0,
  CYCLE: 1,
  CERTIFICATE: 2,
  ENGINE: 3,
  TRASH: 4
};

export function auxMove(G, ctx, action, double = false) {
  if (G.actionsPerformed.length === 0) {
    if (action === AuxAction.MONEY) {
      auxMoney(G, ctx, double);
    } else if (action === AuxAction.CYCLE) {
      auxCycle(G, ctx, double);
    } else if (action === AuxAction.CERTIFICATE) {
    } else if (action === AuxAction.ENGINE) {
    } else if (action === AuxAction.TRASH) {
    }
    G.actionsPerformed = [...G.actionsPerformed, "auxMove"];
  }
}

function auxMoney(G, ctx, double = false) {
  if (double && G.player.auxMoneyToken >= 2) {
    G.player.money += 2;
  } else {
    G.player.money += 1;
  }
}

function auxCycle(G, ctx, double = false) {
  if (double && G.player.auxCycleToken >= 2) {
    drawOne(G, ctx);
    drawOne(G, ctx);
    G.mustDiscard = 2;
    ctx.events.endPhase({ next: "DiscardPhase" });
  } else {
    drawOne(G, ctx);
    G.mustDiscard = 1;
    ctx.events.endPhase({ next: "DiscardPhase" });
    console.log(G.mustDiscard);
  }
}

function auxCertificate(G, ctx, double = false) {
  if (double) {
    if (G.player.money >= 2 && G.player.engine >= 2) {
      G.player.money -= 2;
      // gain certificate
      G.engineSpaces = -2;
      ctx.events.endPhase({ next: "EnginePhase" });
    }
  } else {
    if (G.player.money >= 1 && G.player.engine >= 1) {
      G.player.money -= 1;
      // gain certificate
      G.engineSpaces = -1;
      ctx.events.endPhase({ next: "EnginePhase" });
    }
  }
}

function auxEngine(G, ctx, double = false) {
  if (double) {
    if (G.player.auxEngineToken >= 2 && G.player.money >= 2) {
      G.player.money -= 2;
      G.engineSpaces = 2;
      ctx.events.endPhase({ next: "EnginePhase" });
    }
  } else {
    if (G.player.auxEngineToken >= 1 && G.player.money >= 1) {
      G.player.money -= 1;
      G.engineSpaces = 1;
      ctx.events.endPhase({ next: "EnginePhase" });
    }
  }
}

function auxTrash(G, ctx, double = false) {
  if (double) {
    if (G.player.engine >= 2) {
      // trash
      G.engineSpaces = -2;
      ctx.events.endPhase({ next: "EnginePhase" });
    }
  } else {
    if (G.player.engine >= 1) {
      // trash
      G.engineSpaces = -1;
      ctx.events.endPhase({ next: "EnginePhase" });
    }
  }
}
