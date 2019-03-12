import { StartingDeck } from "./cows";

export default function Player(ctx, playerID) {
  return {
    playerID: playerID,
    name: "",
    money: 100,
    // money: 6 + parseInt(playerID),
    stepLimit: ctx.numPlayers >= 4 ? 4 : 3,
    handSize: 4,
    cards: StartingDeck(ctx),
    cowboys: 3,
    craftsmen: 4,
    engineers: 5,
    // location: "start",
    location: "C",
    engine: 0,
    certificates: 0,
    auxMoneyToken: true,
    auxCycleToken: true,
    auxCertificateToken1: true,
    auxCertificateToken2: true,
    auxEngineToken1: true,
    auxEngineToken2: true,
    auxTrashToken1: true,
    auxTrashToken2: true,
    certificateToken1: true,
    certificateToken2: true,
    moveToken1: true,
    moveToken2: true,
    handToken1: true,
    handToken2: true
  };
}

export function discard(player, name) {
  const index = player.cards.hand.findIndex(cow => cow.name == name);
  player.cards.discard.push(player.cards.hand.splice(index, 1));
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
