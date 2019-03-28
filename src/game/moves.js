import { INVALID_MOVE } from "boardgame.io/core";
import { isAdjacent } from "./trail";
import { removeWorker } from "./job_market";
import { trainDistance } from "./train";
import { discard, stepLimit, handSize } from "./player";

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
  if (G.movesRemaining == stepLimit(G.player, ctx)) {
    console.log("have not moved yet");
    // return INVALID_MOVE;
  } else {
    if (G.trail[G.player.location].tile === null) {
      console.log("can not stop here");
      // return INVALID_MOVE;
    } else {
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

export function end(G, ctx) {
  draw(G, ctx);
  ctx.events.endPhase({ next: "MovePhase" });
  ctx.events.endTurn();
}

export function pass(G, ctx) {
  ctx.events.endPhase();
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
  const opponents = Object.keys(G.players)
    .filter(player => player != ctx.currentPlayer)
    .map(player => G.players[player]);
  if (
    destination == 0 ||
    !opponents.map(player => player.engine).includes(destination)
  ) {
    let distance = trainDistance(G, ctx, destination);
    if (
      (G.engineSpaces > 0 && distance >= 0 && distance <= G.engineSpaces) ||
      (G.engineSpaces < 0 && distance == G.engineSpaces)
    ) {
      G.player.engine = destination;
      G.engineSpaces -= distance;
    }
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

export function draw(G, ctx) {
  while (G.player.cards.hand.length < handSize(G.player)) {
    drawOne(G, ctx);
  }
}

export function drawOne(G, ctx) {
  if (G.player.cards.deck.length == 0) {
    G.player.cards.deck = G.player.cards.discard;
    G.player.cards.discard = [];
  }
  G.player.cards.deck = ctx.random.Shuffle(G.player.cards.deck);
  G.player.cards.hand = [G.player.cards.deck.pop(), ...G.player.cards.hand];
}

export function discardCycle(G, ctx, index) {
  if (G.player.cards.hand[index] !== undefined) {
    const card = G.player.cards.hand[index];
    G.player.cards.discard = [card, ...G.player.cards.discard];
    G.player.cards.hand.splice(index, 1);
    G.mustDiscard--;
  }
}

export function discardPair(G, ctx, name) {
  if (G.player.cards.hand.filter(cow => cow.name == name).length >= 2) {
    discard(G, name);
    discard(G, name);
    G.player.money += G.discardPairValue;
    ctx.events.endPhase();
  }
}

export function trash(G, ctx, index) {
  if (G.player.cards.hand[index] !== undefined) {
    G.player.cards.hand.splice(index, 1);
    G.mustTrash--;
  }
}

export function gainTeepee(G, ctx, name) {
  const value = parseInt(name.slice(6));
  if (
    G.player.money + value >= 0 &&
    name.includes("teepee") &&
    G.trail[name].tile != null
  ) {
    G.player.money += value;
    G.player.teepees = [G.trail[name].tile, ...G.player.teepees];
    G.trail[name].tile = null;
    ctx.events.endPhase();
  }
}

export function gainHazard(G, ctx, name) {
  if (G.trail[name].tile != null) {
    if (G.trail[name].tile.tile == "hazard") {
      G.player.hazards = [G.trail[name].tile, ...G.player.hazards];
      G.trail[name].tile = null;
      ctx.events.endPhase();
    }
  }
}
