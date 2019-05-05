// TODO: objective score
import { stationMasterScore } from "./station_masters";

export function score(G, playerID) {
  const player = G.players[playerID];
  const score = {
    // 1 points for every 5 dollars
    money: Math.floor(player.money / 5),
    // buildings
    buildings: Object.values(G.trail).reduce((total, space) => {
      if (space.tile != null && space.tile.owner != undefined) {
        if (space.tile.owner == playerID) {
          return total + space.tile.points;
        }
      }
      return total;
    }, 0),
    // cities
    cities: cityScore(G, playerID),
    // stations
    stations: G.stations.reduce((total, station) => {
      if (station.players.includes(playerID)) {
        return total + station.points;
      }
      return total;
    }, 0),
    // hazards
    hazards: player.hazards.reduce((total, hazard) => total + hazard.points, 0),
    // cows
    cows:
      player.cards.deck.reduce((total, card) => total + card.points, 0) +
      player.cards.discard.reduce((total, card) => total + card.points, 0) +
      player.cards.hand.reduce((total, card) => total + card.points, 0),
    // objectives
    objectives: 0,
    // station masters
    stationMasters: stationMasterScore(player),
    // workers
    workers:
      4 *
      (Math.max(0, player.cowboys - 4) +
        Math.max(0, player.craftsmen - 4) +
        Math.max(0, player.engineers - 4)),
    // move2 token
    moveToken: player.tokens.move2 == 0 ? 3 : 0,
    // 2 points for ending the game
    endGame: G.gameEndPlayer == playerID ? 2 : 0
  };
  score["total"] = Object.values(score).reduce(
    (total, value) => total + value,
    0
  );
  return score;
}

function cityScore(G, playerID) {
  let score = 0;
  score -=
    6 * G.cities["KansasCity"].players.filter(id => id == playerID).length;

  if (
    G.cities["Topeka"].players.includes(playerID) &&
    G.cities["Wichita"].players.includes(playerID)
  ) {
    score += 3;
  }

  if (
    G.cities["Wichita"].players.includes(playerID) &&
    G.cities["ColoradoSprings"].players.includes(playerID)
  ) {
    score += 3;
  }

  if (
    G.cities["Albuquerque"].players.includes(playerID) &&
    G.cities["ElPaso"].players.includes(playerID)
  ) {
    score += 6;
  }

  if (
    G.cities["ElPaso"].players.includes(playerID) &&
    G.cities["SanDiego"].players.includes(playerID)
  ) {
    score += 8;
  }

  if (
    G.cities["SanDiego"].players.includes(playerID) &&
    G.cities["Sacramento"].players.includes(playerID)
  ) {
    score += 4;
  }

  if (G.cities["Sacramento"].players.includes(playerID)) {
    score += 6;
  }

  score +=
    9 * G.cities["SanFrancisco"].players.filter(id => id == playerID).length;
  return score;
}
