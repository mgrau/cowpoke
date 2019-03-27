import { StartingDeck } from "./cows";

export default function Player(ctx, playerID) {
  return {
    playerID: playerID,
    name: "",
    money: 6 + parseInt(playerID),
    stepLimit: ctx.numPlayers >= 4 ? 4 : 3,
    handSize: 4,
    cards: StartingDeck(ctx),
    cowboys: 1,
    craftsmen: 1,
    engineers: 1,
    location: "start",
    engine: 0,
    certificates: 0,
    teepees: [],
    hazards: [],
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
  const index = G.player.cards.hand.findIndex(cow => cow.name == name);
  const card = G.player.cards.hand[index];
  G.player.cards.discard = [card, ...G.player.cards.discard];
  G.player.cards.hand.splice(index, 1);
}

export function handIncludes(player, name) {
  return player.cards.hand.map(cow => cow.name).includes(name);
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
