import { StartingDeck } from "./cows";

export default function Player(ctx, playerID, basicObjective) {
  return {
    playerID: playerID,
    name: "",
    money: 6 + parseInt(playerID),
    cards: StartingDeck(ctx),
    cowboys: 1,
    craftsmen: 1,
    engineers: 1,
    location: "start",
    engine: 0,
    certificates: 0,
    built: [],
    teepees: [],
    hazards: [],
    objectives: [basicObjective],
    stationMasters: [],
    tokens: {
      auxMoney: 1,
      auxCycle: 1,
      auxCert: 2,
      auxEngine: 2,
      auxTrash: 2,
      certificate1: 1,
      certificate2: 1,
      move1: 1,
      move2: 1,
      hand1: 1,
      hand2: 1
    }
  };
}

export function discard(G, name) {
  if (G.player.cards.hand.map(cow => cow.name).includes(name)) {
    const index = G.player.cards.hand.findIndex(cow => cow.name == name);
    const card = G.player.cards.hand[index];
    G.player.cards.discard = [card, ...G.player.cards.discard];
    G.player.cards.hand.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

export function gainCertificate(player) {
  player.certificates++;
  if (!player.certificateToken2 && player.certificates > 4) {
    player.certificates = 4;
  }
  if (!player.certificateToken1 && player.certificates > 3) {
    player.certificates = 3;
  }
}

export function stationMasterCertificates(player) {
  return player.stationMasters.filter(tile => tile.benefit == "certificate")
    .length;
}

export function removeToken(G) {
  if (G.readyToken == null) {
    return false;
  }

  if (G.player.tokens[G.readyToken] <= 0) {
    return false;
  }

  if (G.readyToken.includes("hand")) {
    if (G.player.money < 5) {
      return false;
    } else {
      G.player.money -= 5;
    }
  }

  if (G.readyToken == "move1") {
    G.player.money += 3;
  }

  G.player.tokens[G.readyToken]--;
  return true;
}

export function stepLimit(player, ctx) {
  // the base steplimit is 3 for 2 and 3 player games, and 4 for 4 player games
  // the first move token increases this by 1 for 2 player games, and 2 for 3 and 4 player games
  // the second move token always increases this by 1
  return (
    (ctx.numPlayers >= 4 ? 4 : 3) +
    (player.tokens.move1 == 0 ? (ctx.numPlayers >= 3 ? 2 : 1) : 0) +
    (player.tokens.move2 == 0 ? 1 : 0)
  );
}

export function handSize(player) {
  return (
    4 + (player.tokens.hand1 == 0 ? 1 : 0) + (player.tokens.hand2 == 0 ? 1 : 0)
  );
}
