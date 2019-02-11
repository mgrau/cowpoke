import { Jersey, Guernsey } from "./card";

export function create_player_deck() {
  let deck = [];
  return deck.concat(Array(5).fill(Jersey()), Array(3).fill(Guernsey()), Array(3). fill);
}
