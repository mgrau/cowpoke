import { stationMasterCertificates } from "./player";

export default function StationMasters() {
  return [
    StationMaster(0, "certificate", "certificates"),
    StationMaster(1, "certificate", "teepees"),
    StationMaster(2, "certificate", "hazards"),
    StationMaster(3, "hazardteepee", "objectives"),
    StationMaster(4, "money", "workers")
  ];
}

function StationMaster(index, benefit, points) {
  return {
    tile: "stationmaster",
    index: index,
    benefit: benefit,
    points: points
  };
}

export function acquireStationMaster(G, ctx, worker) {
  if (
    (worker == "cowboy" && G.player.cowboys > 1) ||
    (worker == "craftsman" && G.player.craftsmen > 1) ||
    (worker == "engineer" && G.player.engineers > 1)
  ) {
    console.log("acquire station master");
    if (G.actionsPerformed.includes("upgradeStation")) {
      const stationIndex = G.stations.findIndex(
        station => station.distance == G.player.engine
      );
      const stationMaster = G.stations[stationIndex].stationMaster;

      if (
        stationMaster != null &&
        stationMaster.tile != undefined &&
        stationMaster.tile == "stationmaster"
      ) {
        G.player.stationMasters = [...G.player.stationMasters, stationMaster];

        if (worker == "cowboy") {
          G.player.cowboys -= 1;
          G.stations[stationIndex].stationMaster = {
            tile: "worker",
            type: "cowboy"
          };
        } else if (worker == "craftsman") {
          G.player.craftsmen -= 1;
          G.stations[stationIndex].stationMaster = {
            tile: "worker",
            type: "craftsman"
          };
        } else if (worker == "engineer") {
          G.player.engineers -= 1;
          G.stations[stationIndex].stationMaster = {
            tile: "worker",
            type: "engineer"
          };
        }

        if (stationMaster.benefit == "money") {
          G.player.money += 2;
        } else if (stationMaster.benefit == "hazardteepee") {
          console.log("gain a teepee or hazard");
          ctx.events.endPhase();
          ctx.events.endPhase({ next: "HazardTeepeePhase" });
        }
      }
    }
  }
}

export function stationMasterScore(player) {
  let score = 0;
  player.stationMasters.forEach(stationMaster => {
    if (stationMaster.points == "certificates") {
      score +=
        3 *
        Math.floor(
          (player.certificates + stationMasterCertificates(player)) / 2
        );
    } else if (stationMaster.points == "teepees") {
      const green = player.teepees.filter(teepee => teepee.color == "green")
        .length;
      const blue = player.teepees.filter(teepee => teepee.color == "blue")
        .length;
      score += 3 * Math.min(green, blue);
    } else if (stationMaster.points == "hazards") {
      score += 3 * Math.floor(player.hazards.length / 2);
    } else if (stationMaster.points == "objectives") {
      score += 3 * Math.floor(player.objectives.length / 2);
    } else if (stationMaster.points == "workers") {
      score += player.cowboys + player.craftsmen + player.engineers;
    }
  });
  return score;
}
// 5 different stationmaster tiles
// each comprises an upper half a lower half
// the upper half is an immediate benefit
// the lower half depicts a unique way of gaining victory points at the end of the game

// tile 1
// upper half: +1 certificate
// lower half: 3 points for every 2 certificates

// tile 2
// upper half: +1 certificate
// lower half: 3 points for every blue/green pair of teepees

// tile 3
// upper half: +1 certificate
// lower half: 3 points for every pair of hazards

// tile 4
// upper half: gain a hazard or teepee
// lower half: 3 points for every pair of objectives

// tile 5
// upper half: gain 2 dollars
// lower half: 1 points per employee
