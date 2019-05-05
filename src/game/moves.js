// import { INVALID_MOVE } from "boardgame.io/core";
import { isAdjacent } from "./trail";
import { getWorker, removeWorker } from "./job_market";
import { trainDistance } from "./train";
import {
  discard,
  stepLimit,
  handSize,
  gainCertificate,
  removeToken
} from "./player";
import { neutralMove } from "./neutral_moves";
import { privateMove } from "./private_moves";
import { ship } from "./cities";

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
        if (G.trail[destination].tile != null) {
          G.movesRemaining--;
          pay_toll(G, ctx);
        }
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
    } else if (tile.tile == "neutral") {
      ctx.events.endPhase({ next: "NeutralPhase" });
    } else if (tile.tile == "private" && tile.owner == ctx.currentPlayer) {
      ctx.events.endPhase({ next: "PrivatePhase" });
    } else if (tile.name === "KansasCity") {
      ctx.events.endPhase({ next: "KansasCity" });
    } else {
      ctx.events.endPhase({ next: "ActionPhase" });
    }
  }
}

export function end(G, ctx) {
  if (
    ctx.phase == "KansasCity" &&
    !G.actionsPerformed.includes("kansasCityShip")
  ) {
    return;
  }
  draw(G, ctx);
  ctx.events.endPhase({ next: "MovePhase" });
  ctx.events.endTurn();
}

export function pass(G, ctx) {
  if (ctx.phase == "EnginePhase") {
    if (G.engineSpaces < -0.5) {
      return;
    }
  }
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
        if (discard(G, "Jersey")) {
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
        G.mustDiscard = 1;
        ctx.events.endPhase({ next: "DiscardPhase" });
      }
      G.actionsPerformed = [...G.actionsPerformed, "risk"];
    }
  }
}

export function hire(G, ctx, row, col) {
  const cost = G.jobMarket.cost[row] - G.hireCostModifier;
  const workerType = getWorker(G.jobMarket, row, col).type;
  if (
    G.player.money >= cost &&
    ((workerType == "cowboy" && G.player.cowboys < 6) ||
      (workerType == "craftsman" && G.player.craftsmen < 6) ||
      (workerType == "engineer" && G.player.engineers < 6))
  ) {
    const worker = removeWorker(G.jobMarket, row, col);
    if (worker != null) {
      G.player.money -= cost;
      if (worker.type == "cowboy") {
        G.player.cowboys += 1;
        if (G.player.cowboys == 4) {
          G.hireBonus = "cowboy4";
          console.log("gain a hazard");
        }
        if (G.player.cowboys == 6) {
          G.hireBonus = "cowboy6";
          console.log("gain a teepee");
        }
      }
      if (worker.type == "craftsman") {
        G.player.craftsmen += 1;
        if (G.player.craftsmen == 4 || G.player.craftsmen == 6) {
          G.hireBonus = "craftsman";
          console.log("build a building");
        }
      }
      if (worker.type == "engineer") {
        G.player.engineers += 1;
        if (G.player.engineers == 2) {
          G.hireBonus = "engineer2";
          console.log("discard a jersey for a certificate");
        }
        if (G.player.engineers == 3) {
          G.hireBonus = "engineer3";
          console.log("discards a jersey for 1 dollar");
        }
        if (G.player.engineers == 4) {
          G.hireBonus = "engineer4";
          console.log("hire with a bonus of 2 dollars");
        }
        if (G.player.engineers == 5) {
          G.hireBonus = "engineer5";
          console.log("discard a jersey for 2 certificates");
        }
        if (G.player.engineers == 6) {
          G.hireBonus = "enginee6";
          console.log("discard a jersey for 4 dollars");
        }
      }
    }
  }
  ctx.events.endPhase();
}

export function hireBonus(G, ctx) {
  if (G.hireBonus != null) {
    if (G.hireBonus == "cowboy4") {
      ctx.events.endPhase({ next: "HazardPhase" });
    } else if (G.hireBonus == "cowboy6") {
      ctx.events.endPhase({ next: "TeepeePhase" });
    } else if (G.hireBonus == "craftsman") {
      G.buildCost = 1;
      ctx.events.endPhase({ next: "BuildPhase" });
    } else if (G.hireBonus == "engineer2") {
      if (discard(G, "Jersey")) {
        gainCertificate(G.player);
      }
    } else if (G.hireBonus == "engineer3") {
      if (discard(G, "Jersey")) {
        G.player.money += 2;
      }
    } else if (G.hireBonus == "engineer4") {
      G.hireCostModifier = 2;
      ctx.events.endPhase({ next: "HirePhase" });
    } else if (G.hireBonus == "engineer5") {
      if (discard(G, "Jersey")) {
        gainCertificate(G.player);
        gainCertificate(G.player);
      }
    } else if (G.hireBonus == "engineer5") {
      if (discard(G, "Jersey")) {
        G.player.money += 4;
      }
    }
    G.hireBonus = null;
  }
}

export function build(G, ctx, location, buildingName) {
  if (buildingName != null) {
    // has the player selected a building by using the selectBuilding action?
    if (G.trail[location].build) {
      // is the location tile a buildable location?
      if (
        G.buildings.map(building => building.name).includes(buildingName) && // has the player selected a building that is in this game?
        !G.player.built.includes(buildingName) // and the player hasn't built it yet?
      ) {
        if (
          G.trail[location].tile == null || // is the location empty?
          G.trail[location].tile.owner == ctx.currentPlayer // or contain one of the player's own buildings?
        ) {
          const building = G.buildings.find(
            building => building.name == buildingName
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
            G.player.built = [...G.player.built, buildingName];
            G.player.money -= G.buildCost * craftsmen;
            G.trail[location].tile = building;
            G.trail[location].tile.owner = ctx.currentPlayer;
            ctx.events.endPhase();
          }
        }
      }
    }
  }
}

export function moveEngine(G, ctx, destination) {
  console.log({ destination: destination });
  if (G.actionsPerformed.includes("upgradeStation")) {
    return;
  }
  const stations = G.stations.map(station => station.distance);
  if (
    [...Array(41).keys()].includes(destination) ||
    stations.includes(destination)
  ) {
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
        (G.engineSpaces < 0 && Math.floor(distance - G.engineSpaces) == 0)
      ) {
        G.player.engine = destination;
        G.engineSpaces -= distance;
      } else {
        console.log("not valid move");
        console.log({ distance: distance });
      }
    } else {
      console.log("destination is zero, or opponent in way");
      console.log({ opponents: opponents.map(player => player.engine) });
    }
  } else {
    console.log("this is not a destination");
    console.log({ stations: stations });
  }
}

export function upgradeStation(G, ctx) {
  if (G.readyToken == null) {
    return;
  }
  const token = G.readyToken;

  // is player is on a train station
  if (!G.stations.map(station => station.distance).includes(G.player.engine)) {
    return;
  }
  const stationIndex = G.stations.findIndex(
    station => station.distance == G.player.engine
  );
  const station = G.stations[stationIndex];

  // has player hasn't upgraded this train station before
  if (station.players.includes(G.playerID)) {
    return;
  }

  // does token color match station?
  if (["certificate2", "move1", "move2", "hand1", "hand2"].includes(token)) {
    if (!station.black) {
      return;
    }
  }

  // if player can pay for upgrade
  if (
    G.player.money < station.cost ||
    (G.readyToken.includes("hand") && G.player.money < station.cost + 5)
  ) {
    return;
  }

  // if the token is legal to be played
  if (removeToken(G)) {
    G.player.money -= station.cost;
    G.stations[stationIndex].players = [
      G.player.playerID,
      ...G.stations[stationIndex].players
    ];
  }
  G.actionsPerformed = [...G.actionsPerformed, "upgradeStation"];
}

export function selectToken(G, ctx, token) {
  if (Object.keys(G.player.tokens).includes(token)) {
    if (G.player.tokens[token] > 0) {
      if (!(token.includes("hand") && G.player.money < 5)) {
        G.readyToken = token;
      }
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

  if (tile.owner != ctx.currentPlayer) {
    toll = toll > G.player.money ? G.player.money : toll;
    G.player.money -= toll;
    if (tile.owner != undefined) {
      G.players[tile.owner].money += toll;
    }
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

export function discardCard(G, ctx, index) {
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
  if (G.mustTrash > 0) {
    if (G.player.cards.hand[index] !== undefined) {
      G.player.cards.hand.splice(index, 1);
      G.mustTrash--;
    }
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

export function specialDelivery(G, ctx, destination) {
  if (G.actionsPerformed.includes("specialDelivery")) {
    console.log("already did this move");
  } else {
    if (ship(G, destination)) {
      G.actionsPerformed = [...G.actionsPerformed, "specialDelivery"];
      G.deliveryValue = undefined;
      G.engineSpaces = -G.cities[destination].distance;
    }
  }
}
