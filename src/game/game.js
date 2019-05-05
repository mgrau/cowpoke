import { Game } from "boardgame.io/core";
import PluginPlayer from "./plugins/plugin-player";
import Player, { stepLimit } from "./player";
import Trail, { addSmallTile } from "./trail";
import Cities from "./cities";
import Stations from "./stations";
import StationMasters, { acquireStationMaster } from "./station_masters";
import Foresight from "./foresight";
import JobMarket, { addWorker } from "./job_market";
import MarketCattle, { refillCowMarket } from "./cows";
import { neutrals, privateA, privateB } from "./buildings";
import {
  move,
  stop,
  pass,
  end,
  buildingMove,
  risk,
  specialDelivery,
  hire,
  hireBonus,
  build,
  selectBuilding,
  moveEngine,
  upgradeStation,
  selectToken,
  discardCard,
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
  kansasCityShip
} from "./kansas_city";

export const Cowpoke = Game({
  name: "cowpoke",
  minPlayers: 2,
  maxPlayers: 4,
  setup: ctx => {
    const G = {
      trail: Trail(),
      cities: Cities(),
      stations: Stations(),
      foresight: Foresight(ctx),
      jobMarket: JobMarket(ctx),
      buildings: [],
      cowDeck: MarketCattle(ctx),
      cowMarket: [],
      objectiveDeck: ctx.random.Shuffle([]),
      objectives: [],
      movesRemaining: 0,
      readyToken: null,
      actionsPerformed: []
    };

    G.trail["A"].tile = neutrals[0];
    G.trail["B"].tile = neutrals[1];
    G.trail["C"].tile = neutrals[2];
    G.trail["D"].tile = neutrals[3];
    G.trail["E"].tile = neutrals[4];
    G.trail["F"].tile = neutrals[5];
    G.trail["G"].tile = neutrals[6];

    G.buildings = privateA;

    ctx.random.Shuffle(StationMasters()).forEach((tile, index) => {
      G.stations[index].stationMaster = tile;
    });

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
    hireBonus,
    build,
    selectBuilding,
    moveEngine,
    upgradeStation,
    acquireStationMaster,
    selectToken,
    gainTeepee,
    gainHazard,
    cowDraw,
    cowBuy,
    beginAuxMove,
    auxMove,
    auxDoubleMove,
    discardCard,
    discardPair,
    trash,
    kansasCity1,
    kansasCity2,
    kansasCity3,
    kansasCitySell,
    kansasCityShip,
    buildingMove,
    risk,
    specialDelivery
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
      G.hireBonus == null;
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
        allowedMoves: ["pass", "build", "selectBuilding"]
      },
      EnginePhase: {
        allowedMoves: [
          "pass",
          "moveEngine",
          "selectToken",
          "upgradeStation",
          "acquireStationMaster"
        ],
        endPhaseIf: G => G.engineSpaces == 0
      },
      CowPhase: {
        allowedMoves: ["pass", "cowDraw", "cowBuy"],
        endPhaseIf: G => G.availableCowboys <= 0
      },
      DiscardPhase: {
        allowedMoves: ["discardCard"],
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
      HazardTeepeePhase: {
        allowedMoves: ["pass", "gainHazard", "gainTeepee"]
      },
      ActionPhase: {
        allowedMoves: ["end", "beginAuxMove"]
      },
      AuxMovePhase: {
        allowedMoves: ["end", "auxMove"]
      },
      NeutralPhase: {
        allowedMoves: ["end", "beginAuxMove", "buildingMove", "hireBonus"]
      },
      PrivatePhase: {
        allowedMoves: [
          "end",
          "beginAuxMove",
          "buildingMove",
          "hireBonus",
          "risk"
        ]
      },
      DoubleAuxPhase: {
        allowedMoves: ["pass", "auxMove", "auxDoubleMove"],
        endPhaseIf: G =>
          G.actionsPerformed.includes("auxMove") ||
          G.actionsPerformed.includes("auxDoubleMove")
      },
      SpecialDeliveryPhase: {
        allowedMoves: ["moveEngine", "selectToken", "specialDelivery"],
        endPhaseIf: G => G.engineSpaces != undefined && G.engineSpaces == 0
      },
      KansasCity: {
        onPhaseBegin: (G, ctx) => {
          G.readyToken = null;
        },
        allowedMoves: [
          "end",
          "kansasCity1",
          "kansasCity2",
          "kansasCity3",
          "kansasCitySell",
          "selectToken",
          "kansasCityShip"
        ],
        next: "MovePhase"
      }
    }
  },
  plugins: [PluginPlayer]
});
