import { Game } from "boardgame.io/core";
import { PluginPlayer } from "boardgame.io/plugins";
import trail from "./trail";
import Player from "./player";
import { move } from "./moves";

const Cowpoke = Game({
  name: "Great Western Trail",
  setup: () => ({
    trail: trail,
    cowmarket: [],
    cowDeck: [],
    objectives: [],
    objectiveDeck: []
  }),
  playerSetup: playerID => new Player(playerID),
  moves: { move },
  flow: {
    endTurn: false,
    startingPhase: "MovePhase",

    phases: {
      MovePhase: {
        onPhaseBegin: (G, ctx) => {
          G.movesRemaining = G.players[ctx.currentPlayer].moves;
          return G;
        },
        allowedMoves: ["move"],
        next: "ActionPhase"
      },
      ActionPhase: {
        allowedMoves: [""],
        next: "MovePhase",
        onPhaseEnd: (G, ctx) => {
          ctx.events.endTurn();
          return G;
        }
      }
    }
  },
  plugins: [PluginPlayer]
});

export default Cowpoke;
