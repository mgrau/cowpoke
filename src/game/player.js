import { StartingDeck } from "./cows";

export default function Player(playerID) {
  return {
    playerID: playerID,
    name: "",
    money: 6 + parseInt(playerID),
    stepLimit: 3,
    handSize: 4,
    cards: StartingDeck(),
    cowboys: 1,
    craftsmen: 1,
    engineers: 1,
    location: "start",
    engine: 0,
    certificates: 0
  };
}

export function discard(player, name) {
  const index = player.cards.hand.findIndex(cow => cow.name == name);
  player.cards.discard.push(player.cards.hand.splice(index, 1));
}

export function handIncludes(player, name) {
  return player.cards.hand.map(cow => cow.name).includes(name);
}
