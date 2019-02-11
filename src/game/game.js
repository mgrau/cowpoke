import { Game } from "boardgame.io/core";
import trail from "./trail";

console.log(trail);

const GreatWesternTrail = Game({
  setup: () => ({ trail: trail }),
  moves: {}
});

export default GreatWesternTrail;
