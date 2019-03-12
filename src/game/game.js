import { Game } from "boardgame.io/core";
import PluginPlayer from "./plugins/plugin-player";
import Trail, { addSmallTile } from "./trail";
import Player, { draw } from "./player";
import Foresight from "./foresight";
import JobMarket, { addWorker } from "./job_market";
import { move, stop, pass, hire, moveEngine, kansas_city } from "./moves";
import { cowDraw, cowBuy } from "./cow_moves";
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

import MarketCattle from "./cows";

const Cowpoke = Game({
  name: "Great Western Trail",
  setup: ctx => {
    const G = {
      trail: Trail(),
      foresight: new Foresight(ctx),
      jobMarket: new JobMarket(ctx),
      cowDeck: MarketCattle(ctx),
      cowMarket: [],
      objectiveDeck: ctx.random.Shuffle([]),
      objectives: [],
      movesRemaining: 0,
      actionsPerformed: []
    };

    G.trail["A"].tile = neutralA;
    G.trail["B"].tile = neutralB;
    G.trail["C"].tile = neutralC;
    G.trail["D"].tile = neutralD;
    G.trail["E"].tile = neutralE;
    G.trail["F"].tile = neutralF;
    G.trail["G"].tile = neutralG;

    for (var i = 0; i < 7; i++) {
      addSmallTile(G.trail, G.foresight.pile1.pop());
    }

    for (var i = 0; i < 2 * ctx.numPlayers - 1; i++) {
      addWorker(G.jobMarket, G.foresight.pile2.pop());
    }

    for (var i = 0; i < 1 + 3 * ctx.numPlayers; i++) {
      G.cowMarket.push(G.cowDeck.pop());
    }

    return G;
  },
  playerSetup: (ctx, playerID) => new Player(ctx, playerID),
  moves: {
    start: function(G, ctx) {},
    move,
    stop,
    pass,
    hire,
    moveEngine,
    cowDraw,
    cowBuy,
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
    // startingPhase: "PostSetup",
    startingPhase: "MovePhase",

    phases: {
      MovePhase: {
        onPhaseBegin: (G, ctx) => {
          G.movesRemaining = G.player.stepLimit;
          return G;
        },
        onPhaseEnd: (G, ctx) => {
          G.actionsPerformed = [];
          return G;
        },
        allowedMoves: ["move", "stop"],
        next: "ActionPhase"
      },
      HirePhase: {
        allowedMoves: ["hire"]
      },
      EnginePhase: {
        allowedMoves: ["moveEngine"]
      },
      CowPhase: {
        allowedMoves: ["cowDraw", "cowBuy"]
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
