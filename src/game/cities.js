export default function Cities() {
  return {
    kansas_city: City(0),
    topeka: City(1),
    wichita: City(4),
    colorado_springs: City(6),
    santa_fe: City(8),
    albuquerque: City(10, true),
    el_paso: City(12, true),
    san_diego: City(14),
    sacramento: City(16),
    san_francisco: City(18)
  };
}

function City(distance, black = false) {
  return {
    distance: distance,
    black: black,
    players: []
  };
}

export function ship(G, ctx, destination) {
  if (!destination in G.cities) {
    return false;
  }
  if (destination != "kansas_city" && destination != "san_francisco") {
    if (G.cities[destination].players.includes(G.player.playerID)) {
      return false;
    }
  }
  if (G.deliveryValue < G.cities[destination].distance) {
    return false;
  }
  G.cities[destination].players = [
    G.player.playerID,
    ...G.cities[destination].players
  ];
  return true;
}
