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
    // location: "G",
    engine: 0,
    certificates: 0,
    auxMoneyToken: 1,
    auxCycleToken: 1,
    auxCertificateToken: 2,
    auxEngineToken: 2,
    auxTrashToken: 2,
    certificateToken1: true,
    certificateToken2: true,
    moveToken1: true,
    moveToken2: true,
    handToken1: true,
    handToken2: true
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
