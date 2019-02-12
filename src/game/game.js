import { Game } from "boardgame.io/core";
import { PluginPlayer } from "boardgame.io/plugins";
import trail from "./trail";
import Player from "./player";
import { move } from "./moves";

console.log(trail);

const Cowpoke = Game({
  name: "Great Western Trail",
  setup: () => ({
    trail: trail
  }),
  playerSetup: playerID => new Player(playerID),
  moves: { move },
  plugins: [PluginPlayer]
});

export default Cowpoke;
