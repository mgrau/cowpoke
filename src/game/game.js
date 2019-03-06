import { Game } from "boardgame.io/core";
import { PluginPlayer } from "boardgame.io/plugins";
import trail from "./trail";
import Player from "./player";
import Foresight from "./foresight";
import JobMarket from "./job_market";
import { move, stop, pass, kansas_city } from "./moves";
import {
  neutralA1,
  neutralA2,
  neutralA3,
  neutralB1,
  neutralB2,
  neutralC1,
  neutralC2,
  neutralD1,
  neutralD2,
  neutralE1,
  neutralE2,
  neutralF1,
  neutralF2,
  neutralG1,
  neutralG2
} from "./neutral_moves";
import {
  neutralA,
  neutralB,
  neutralC,
  neutralD,
  neutralE,
  neutralF,
  neutralG
} from "./buildings";

import { market_cattle } from "./cows";

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

    const foresight = new Foresight(ctx);
    for (var i = 0; i < 7; i++) {
      trail.addSmallTile(foresight.pile1.pop());
    }

    const jobMarket = new JobMarket(ctx);
    for (var i = 0; i < 2 * ctx.numPlayers - 1; i++) {
      jobMarket.addWorker(foresight.pile2.pop());
    }

    const cowMarket = [];
    const cowDeck = ctx.random.Shuffle(market_cattle);
    for (var i = 0; i < 1 + 3 * ctx.numPlayers; i++) {
      cowMarket.push(cowDeck.pop());
    }

    return {
      trail: trail,
      foresight: foresight,
      jobMarket: jobMarket,
      cowDeck: cowDeck,
      cowMarket: cowMarket,
      objectiveDeck: ctx.random.Shuffle([]),
      objectives: [],
      movesRemaining: 0,
      actionsPerformed: []
    };
  },
  playerSetup: playerID => new Player(playerID),
  moves: {
    start: function(G, ctx) {},
    move,
    stop,
    pass,
    kansas_city,
    neutralA1,
    neutralA2,
    neutralA3,
    neutralB1,
    neutralB2,
    neutralC1,
    neutralC2,
    neutralD1,
    neutralD2,
    neutralE1,
    neutralE2,
    neutralF1,
    neutralF2,
    neutralG1,
    neutralG2
  },
  flow: {
    endTurn: false,
    endPhase: false,
    startingPhase: "PostSetup",

    phases: {
      PostSetup: {
        onPhaseBegin: (G, ctx) => {
          Object.values(G.players).forEach(player => player.draw(ctx));
          return G;
        },
        endPhaseIf: () => ({ next: "MovePhase" }),
        allowedMoves: ["start"]
      },
      MovePhase: {
        onPhaseBegin: (G, ctx) => {
          G.movesRemaining = G.player.moves(ctx);
          return G;
        },
        onPhaseEnd: (G, ctx) => {
          G.actionsPerformed = [];
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
      neutralA: {
        allowedMoves: ["pass", "neutralA1", "neutralA2", "neutralA3"]
      },
      neutralB: {
        allowedMoves: ["pass", "neutralB1", "neutralB2"]
      },
      neutralC: {
        allowedMoves: ["pass", "neutralC1", "neutralC2"]
      },
      neutralD: {
        allowedMoves: ["pass", "neutralD1", "neutralD2"]
      },
      neutralE: {
        allowedMoves: ["pass", "neutralE1", "neutralE2"]
      },
      neutralF: {
        allowedMoves: ["pass", "neutralF1", "neutralF2"]
      },
      neutralG: {
        allowedMoves: ["pass", "neutralG1", "neutralG2"]
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
