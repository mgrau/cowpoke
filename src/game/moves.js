import { INVALID_MOVE } from "boardgame.io/core";
import { isAdjacent } from "./trail";
import { removeWorker } from "./job_market";
import { trainDistance } from "./train";
import {
  discard,
  stepLimit,
  handSize,
  gainCertificate,
  handIncludes
} from "./player";
import { neutralMove } from "./neutral_moves";
import { privateMove } from "./private_moves";

export function move(G, ctx, destination) {
  if (
    ctx.turn == ctx.currentPlayer &&
    ctx.stats.turn.numMoves[ctx.currentPlayer] == undefined
  ) {
    G.player.location = destination;
  } else {
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
}

export function stop(G, ctx) {
  if (
    G.movesRemaining == stepLimit(G.player, ctx) &&
    !(ctx.turn == ctx.currentPlayer) // and not the first turn
  ) {
    console.log("have not moved yet");
    // return INVALID_MOVE;
  } else {
    const tile = G.trail[G.player.location].tile;
    if (tile === null) {
      console.log("can not stop here");
      // return INVALID_MOVE;
    } else if (tile.name.includes("neutral")) {
      ctx.events.endPhase({ next: "NeutralPhase" });
    } else if (
      tile.name.includes("private") &&
      tile.owner == ctx.currentPlayer
    ) {
      ctx.events.endPhase({ next: "PrivatePhase" });
    } else if (tile.name === "KansasCity") {
      ctx.events.endPhase({ next: "KansasCity" });
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

export function buildingMove(G, ctx, index) {
  const building = G.trail[G.player.location].tile.name;
  if (building.includes("neutral")) {
    neutralMove(G, ctx, building + index);
  }
  if (building.includes("private")) {
    privateMove(G, ctx, building + index);
  }
}

export function risk(G, ctx) {
  // if haven't done a risk action yet
  if (!G.actionsPerformed.includes("risk")) {
    // if the player is on a risk tile
    if (G.player.location.includes("Risk")) {
      if (
        G.player.location == "floodRisk1" ||
        G.player.location == "floodRisk2" ||
        G.player.location == "rockfallRisk2" ||
        G.player.location == "teepeeRisk2"
      ) {
        if (handIncludes(G.player, "Jersey")) {
          discard(G, "Jersey");
          gainCertificate(G.player);
          G.player.money += 2;
        }
      }
      if (
        G.player.location == "droughtRisk1" ||
        G.player.location == "rockfallRisk1" ||
        G.player.location == "teepeeRisk1"
      ) {
        gainCertificate(G.player);
        // discard any card
      }
      G.actionsPerformed = [...G.actionsPerformed, "risk"];
    }
  }
}

export function riskDiscard(G, ctx, index) {
  if (G.player.cards.hand[index] !== undefined) {
    const card = G.player.cards.hand[index];
    G.player.cards.discard = [card, ...G.player.cards.discard];
    G.player.cards.hand.splice(index, 1);
    ctx.events.endPhase({ next: "PrivatePhase" });
  }
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

export function build(G, ctx, location) {
  if (G.selectedBuilding != null) {
    // has the player selected a building by using the selectBuilding action?
    if (G.trail[location].build) {
      // is the location tile a buildable location?
      if (
        G.buildings
          .map(building => building.name)
          .includes(G.selectedBuilding) && // has the player selected a building that is in this game?
        !G.player.built.includes(G.selectedBuilding) // and the player hasn't built it yet?
      ) {
        if (
          G.trail[location].tile == null || // is the location empty?
          G.trail[location].tile.owner == ctx.currentPlayer // or contain one of the player's own buildings?
        ) {
          const building = G.buildings.find(
            building => building.name == G.selectedBuilding
          );
          const craftsmen =
            building.craftsmen -
            (G.trail[location].tile == null
              ? 0
              : G.trail[location].tile.craftsmen);

          if (
            G.player.money >= G.buildCost * building.craftsmen &&
            G.player.craftsmen >= craftsmen
          ) {
            G.player.built = [...G.player.built, G.selectedBuilding];
            G.player.money -= G.buildCost * craftsmen;
            G.trail[location].tile = building;
            G.trail[location].tile.owner = ctx.currentPlayer;
            G.selectedBuilding = null;
            ctx.events.endPhase();
          }
        }
      }
    }
  }
}

export function selectBuilding(G, ctx, buildingName) {
  if (
    G.buildings.map(building => building.name).includes(buildingName) &&
    !G.player.built.includes(buildingName)
  ) {
    G.selectedBuilding = buildingName;
  }
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
  const tile = G.trail[G.player.location].tile;
  if (tile == null) {
    return;
  }
  const hand = tile.hand;
  if (hand == undefined) {
    return;
  }

  console.log(tile.owner);
  let toll = 0;
  if (hand.includes("black")) {
    if (ctx.numPlayers == 3) {
      toll += 1;
    } else {
      toll += 2;
    }
  }

  if (hand.includes("green")) {
    if (ctx.numPlayers == 4) {
      toll += 1;
    } else {
      toll += 2;
    }
  }

  toll = toll > G.player.money ? G.player.money : toll;
  G.player.money -= toll;
  if (tile.owner != undefined) {
    G.players[tile.owner].money += toll;
  }
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
  // bug here: can't choose which point value cows to discard
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
