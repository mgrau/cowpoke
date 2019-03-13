import { INVALID_MOVE } from "boardgame.io/core";
import { isAdjacent } from "./trail";
import { removeWorker } from "./job_market";

export function move(G, ctx, destination) {
  const currentLocation = G.player.location;
  if (G.movesRemaining <= 0) {
    console.log("no moves remaining");
    // return INVALID_MOVE;
  } else {
    if (!isAdjacent(G.trail, currentLocation, destination)) {
      console.log("that space is not adjacent");
      // return INVALID_MOVE;
    } else {
      G.player.location = destination;
      if (G.trail[destination].tile != null) G.movesRemaining--;

      pay_toll(G, ctx);
    }
  }
}

export function stop(G, ctx) {
  if (G.movesRemaining == G.player.stepLimit) {
    console.log("have not moved yet");
    // return INVALID_MOVE;
  } else {
    if (G.trail[G.player.location].tile === null) {
      console.log("can not stop here");
      // return INVALID_MOVE;
    } else {
      console.log("ok ending phase");
      console.log(G.trail[G.player.location].tile.name);
      switch (G.trail[G.player.location].tile.name) {
        case "KansasCity":
          ctx.events.endPhase({ next: "KansasCity" });
          break;
        case "neutralA":
          ctx.events.endPhase({ next: "neutralA" });
          break;
        case "neutralB":
          ctx.events.endPhase({ next: "neutralB" });
          break;
        case "neutralC":
          ctx.events.endPhase({ next: "neutralC" });
          break;
        case "neutralD":
          ctx.events.endPhase({ next: "neutralD" });
          break;
        case "neutralE":
          ctx.events.endPhase({ next: "neutralE" });
          break;
        case "neutralF":
          ctx.events.endPhase({ next: "neutralF" });
          break;
        case "neutralG":
          ctx.events.endPhase({ next: "neutralG" });
          break;
        default:
          ctx.events.endPhase();
      }
    }
  }
}

export function pass(G, ctx) {
  draw(G, ctx);
  ctx.events.endPhase({ next: "MovePhase" });
  ctx.events.endTurn();
}

export function hire(G, ctx, row, col) {
  const cost = G.jobMarket.cost[row] - G.hireCostModifier;
  if (G.player.money >= cost) {
    const worker = removeWorker(G.jobMarket, row, col);
    if (worker != null) {
      G.player.money -= cost;
      if (worker.type == "cowboy") {
        G.player.cowboys += 1;
      }
      if (worker.type == "craftsman") {
        G.player.craftsmen += 1;
      }
      if (worker.type == "engineer") {
        G.player.engineers += 1;
      }
    }
  }
  ctx.events.endPhase();
}

export function moveEngine(G, ctx, destination) {
  let distance = destination - G.player.engine;
  for (var i = 0; i < ctx.numPlayers; i++) {
    if (G.players[i].playerID != ctx.currentPlayer) {
      if (G.players[i].engine == destination) {
        return;
      }
      if (
        G.players[i].engine > G.player.engine &&
        G.players[i].engine < destination
      ) {
        distance--;
      }
    }
  }
  if (distance <= G.engineSpaces) {
    G.player.engine = destination;
    ctx.events.endPhase();
  }
}

function pay_toll(G, ctx) {
  if (G.trail[G.player.location].trail == null) {
    return;
  }
  const hand = G.trail[G.player.location].tile.hand;
  if (hand == undefined) {
    return;
  }
  console.log(hand.includes("bla"));
  if (hand.includes("black")) {
    if (ctx.numPlayers == 3) {
      G.player.money -= 1;
    } else {
      G.player.money -= 2;
    }
  }

  if (hand.includes("green")) {
    if (ctx.numPlayers == 4) {
      G.player.money -= 1;
    } else {
      G.player.money -= 2;
    }
  }

  G.player.money = G.player.money < 0 ? 0 : G.player.money;
}

function draw(G, ctx) {
  while (G.player.cards.hand.length < G.player.handSize) {
    if (G.player.cards.deck.length == 0) {
      G.player.cards.deck = G.player.cards.discard;
      G.player.cards.discard = [];
    }
    G.player.cards.deck = ctx.random.Shuffle(G.player.cards.deck);
    G.player.cards.hand = [G.player.cards.deck.pop(), ...G.player.cards.hand];
  }
}
