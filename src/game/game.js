import { Game } from "boardgame.io/core";
import PluginPlayer from "./plugins/plugin-player";

import Player, { draw } from "./player";

import Trail, { addSmallTile } from "./trail";
import Cities from "./cities";
import Foresight from "./foresight";
import JobMarket, { addWorker } from "./job_market";
import MarketCattle from "./cows";

import {
  move,
  stop,
  pass,
  end,
  hire,
  moveEngine,
  discardCycle,
  trash
} from "./moves";
import { cowDraw, cowBuy, cowPass } from "./cow_moves";
import { beginAuxMove, auxMove, auxDoubleMove } from "./aux_actions";
import {
  kansasCity1,
  kansasCity2,
  kansasCity3,
  kansasCitySell,
  kansasCityShip
} from "./kansas_city";
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

const Cowpoke = Game({
  name: "Great Western Trail",
  setup: ctx => {
    const G = {
      trail: Trail(),
      cities: Cities(),
      foresight: Foresight(ctx),
      jobMarket: JobMarket(ctx),
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
    end,
    hire,
    moveEngine,
    cowDraw,
    cowBuy,
    cowPass,
    beginAuxMove,
    auxMove,
    auxDoubleMove,
    discardCycle,
    trash,
    kansasCity1,
    kansasCity2,
    kansasCity3,
    kansasCitySell,
    kansasCityShip,
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
        allowedMoves: ["pass", "hire"]
      },
      EnginePhase: {
        allowedMoves: ["moveEngine"]
      },
      CowPhase: {
        allowedMoves: ["pass", "cowDraw", "cowBuy"],
        endPhaseIf: G => G.availableCowboys <= 0
      },
      DiscardPhase: {
        allowedMoves: ["discardCycle"],
        endPhaseIf: G => G.mustDiscard <= 0
      },
      TrashPhase: {
        allowedMoves: ["trash"]
      },
      ActionPhase: {
        allowedMoves: ["end", "beginAuxMove"]
      },
      AuxMovePhase: {
        allowedMoves: ["end", "auxMove"]
      },
      neutralA: {
        allowedMoves: [
          "end",
          "beginAuxMove",
          "neutralA1",
          "neutralA2",
          "neutralA3"
        ]
      },
      neutralB: {
        allowedMoves: ["end", "beginAuxMove", "neutralB1", "neutralB2"]
      },
      neutralC: {
        allowedMoves: ["end", "beginAuxMove", "neutralC1", "neutralC2"]
      },
      neutralD: {
        allowedMoves: ["end", "beginAuxMove", "neutralD1", "neutralD2"]
      },
      neutralE: {
        allowedMoves: ["end", "beginAuxMove", "neutralE1", "neutralE2"]
      },
      neutralF: {
        allowedMoves: ["end", "beginAuxMove", "neutralF1", "neutralF2"]
      },
      neutralG: {
        allowedMoves: ["end", "beginAuxMove", "neutralG1", "neutralG2"]
      },
      DoubleAuxPhase: {
        allowedMoves: ["pass", "auxMove", "auxDoubleMove"],
        endPhaseIf: G =>
          G.actionsPerformed.includes("auxMove") ||
          G.actionsPerformed.includes("auxDoubleMove")
      },
      KansasCity: {
        allowedMoves: [
          "kansasCity1",
          "kansasCity2",
          "kansasCity3",
          "kansasCitySell",
          "kansasCityShip"
        ],
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
