import { Game } from "boardgame.io/core";
import { PluginPlayer } from "boardgame.io/plugins";
import trail from "./trail";
import Player from "./player";
import { move, stop, kansas_city } from "./moves";
import {
  neutralA,
  neutralB,
  neutralC,
  neutralD,
  neutralE,
  neutralF,
  neutralG
} from "./buildings";

const Cowpoke = Game({
  name: "Great Western Trail",
  setup: ctx => {
    trail.addBuilding("A", neutralA);
    trail.addBuilding("B", neutralB);
    trail.addBuilding("C", neutralC);
    trail.addBuilding("D", neutralD);
    trail.addBuilding("E", neutralE);
    trail.addBuilding("F", neutralF);
    trail.addBuilding("G", neutralG);

    return {
      trail: trail,
      cowmarket: [],
      cowDeck: [],
      objectives: [],
      objectiveDeck: []
    };
  },
  playerSetup: playerID => new Player(playerID),
  moves: { move, stop, kansas_city },
  flow: {
    endTurn: false,
    endPhase: false,
    startingPhase: "MovePhase",

    phases: {
      MovePhase: {
        onPhaseBegin: (G, ctx) => {
          G.movesRemaining = G.players[ctx.currentPlayer].moves;
          return G;
        },
        allowedMoves: ["move", "stop"],
        next: "ActionPhase"
      },
      ActionPhase: {
        allowedMoves: ["stop"],
        next: "MovePhase",
        onPhaseEnd: (G, ctx) => {
          ctx.events.endTurn();
          return G;
        }
      },
      KansasCity: {
        allowedMoves: ["kansas_city"],
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
