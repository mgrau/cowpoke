import { Game } from "boardgame.io/core";
import PluginPlayer from "./plugins/plugin-player";
import Player, { stepLimit } from "./player";
import Trail, { addSmallTile } from "./trail";
import Cities from "./cities";
import Foresight from "./foresight";
import JobMarket, { addWorker } from "./job_market";
import MarketCattle, { refillCowMarket } from "./cows";
import {
  move,
  stop,
  pass,
  end,
  hire,
  build,
  moveEngine,
  discardCycle,
  discardPair,
  trash,
  gainTeepee,
  gainHazard
} from "./moves";
import { cowDraw, cowBuy } from "./cow_moves";
import { beginAuxMove, auxMove, auxDoubleMove } from "./aux_actions";
import {
  kansasCity1,
  kansasCity2,
  kansasCity3,
  kansasCitySell,
  kansasCityChooseToken,
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
  neutralG,
  private1a,
  private2a,
  private3a,
  private4a,
  private5a,
  private6a,
  private7a,
  private8a,
  private9a,
  private10a,
  private1b,
  private2b,
  private3b,
  private4b,
  private5b,
  private6b,
  private7b,
  private8b,
  private9b,
  private10b
} from "./buildings";

export const Cowpoke = Game({
  name: "cowpoke",
  minPlayers: 2,
  maxPlayers: 4,
  setup: ctx => {
    const G = {
      trail: Trail(),
      cities: Cities(),
      foresight: Foresight(ctx),
      jobMarket: JobMarket(ctx),
      buildings: [],
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

    G.buildings = [
      private1a,
      private2a,
      private3a,
      private4a,
      private5a,
      private6a,
      private7a,
      private8a,
      private9a,
      private10a
    ];

    for (var i = 0; i < 7; i++) {
      addSmallTile(G.trail, G.foresight.pile1.pop());
    }

    for (var i = 0; i < 2 * ctx.numPlayers - 1; i++) {
      addWorker(G, ctx, G.foresight.pile2.pop());
    }

    refillCowMarket(G, ctx);

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
    build,
    moveEngine,
    gainTeepee,
    gainHazard,
    cowDraw,
    cowBuy,
    beginAuxMove,
    auxMove,
    auxDoubleMove,
    discardCycle,
    discardPair,
    trash,
    kansasCity1,
    kansasCity2,
    kansasCity3,
    kansasCitySell,
    kansasCityChooseToken,
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
    onTurnBegin: (G, ctx) => {
      G.movesRemaining = stepLimit(G.player, ctx);
      if (G.gameEndPlayer == ctx.currentPlayer) {
        return ctx.events.endGame();
      }
      return G;
    },
    phases: {
      MovePhase: {
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
      BuildPhase: {
        allowedMoves: ["pass", "build"]
      },
      EnginePhase: {
        allowedMoves: ["pass", "moveEngine"],
        endPhaseIf: G => G.engineSpaces == 0
      },
      ReverseEnginePhase: {
        allowedMoves: ["moveEngine"],
        endPhaseIf: G => G.engineSpaces == 0
      },
      CowPhase: {
        allowedMoves: ["pass", "cowDraw", "cowBuy"],
        endPhaseIf: G => G.availableCowboys <= 0
      },
      DiscardPhase: {
        allowedMoves: ["discardCycle"],
        endPhaseIf: G => G.mustDiscard <= 0
      },
      DiscardPairPhase: {
        allowedMoves: ["pass", "discardPair"]
      },
      TrashPhase: {
        allowedMoves: ["trash", "moveEngine"],
        endPhaseIf: G => G.engineSpaces == 0 && G.mustTrash == 0
      },
      TeepeePhase: {
        allowedMoves: ["pass", "gainTeepee"]
      },
      HazardPhase: {
        allowedMoves: ["pass", "gainHazard"]
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
        onPhaseBegin: (G, ctx) => {
          G.readyToken = null;
        },
        allowedMoves: [
          "kansasCity1",
          "kansasCity2",
          "kansasCity3",
          "kansasCitySell",
          "kansasCityChooseToken",
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
