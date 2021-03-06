import { removeToken } from "./player";

export default function Cities() {
  return {
    KansasCity: City(0, false, true),
    Topeka: City(1),
    Wichita: City(4),
    ColoradoSprings: City(6),
    SantaFe: City(8),
    Albuquerque: City(10, true),
    ElPaso: City(12, true),
    SanDiego: City(14),
    Sacramento: City(16, true),
    SanFrancisco: City(18, true, true)
  };
}

function City(distance, black = false, multiple = false) {
  return {
    distance: distance,
    black: black,
    multiple: multiple,
    players: []
  };
}

export function ship(G, destination) {
  if (G.readyToken == null) {
    return false;
  }
  const token = G.readyToken;
  if (["certificate2", "move1", "move2", "hand1", "hand2"].includes(token)) {
    if (!G.cities[destination].black) {
      return false;
    }
  }
  if (!destination in G.cities) {
    return false;
  }
  if (!G.cities[destination].multiple) {
    if (G.cities[destination].players.includes(G.player.playerID)) {
      return false;
    }
  }
  if (G.deliveryValue < G.cities[destination].distance) {
    return false;
  }

  const cost = transportCost(G.player.engine, G.cities[destination].distance);
  if (
    G.player.money < cost ||
    (G.readyToken.includes("hand") && G.player.money < cost + 5)
  ) {
    return false;
  }

  if (!removeToken(G)) {
    return false;
  }
  G.player.money -= cost;
  G.cities[destination].players = [
    G.player.playerID,
    ...G.cities[destination].players
  ];

  // Give the player 6 coins as consolation if they ship to KansasCity
  if (destination == "KansasCity") {
    G.player.money += 6;
  }
  return true;
}

function transportCost(start, destination) {
  // the rail crosses come after these spaces
  const cross = [3, 4, 5, 7, 9, 10, 11, 13, 15, 16, 17];
  return cross.filter(cross => cross >= start && cross < destination).length;
}
