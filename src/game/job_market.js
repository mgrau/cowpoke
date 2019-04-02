import { refillCowMarket } from "./cows";
import { emptyWorkers } from "./foresight";

export default function JobMarket(ctx) {
  return {
    numPlayers: ctx.numPlayers,
    row: 0,
    col: 0,
    market: Array(ctx.numPlayers * 12).fill(null),
    cost: [6, 6, 7, 5, 7, 9, 6, 8, 10, 6, 5, 4]
  };
}

export function addWorker(G, ctx, worker) {
  G.jobMarket.market[
    G.jobMarket.col + G.jobMarket.row * G.jobMarket.numPlayers
  ] = worker;
  G.jobMarket.col++;
  if (G.jobMarket.col >= G.jobMarket.numPlayers) {
    G.jobMarket.col = 0;
    G.jobMarket.row++;

    if (G.jobMarket.row == 6 || G.jobMarket.row == 9) {
      refillCowMarket(G, ctx);
    }

    if (G.jobMarket.row >= 12 && G.gameEndPlayer == undefined) {
      G.gameEndPlayer = ctx.currentPlayer;
      emptyWorkers(G);
    }
  }
}

export function removeWorker(jobMarket, row, col) {
  if (row >= jobMarket.row) {
    console.log("can't hire from jobMarket row yet!");
    return null;
  }
  const worker = jobMarket.market[col + row * jobMarket.numPlayers];
  jobMarket.market[col + row * jobMarket.numPlayers] = null;
  return worker;
}

// The job market is 12 rows, N columns, where N is the number of players
// The hiring cost depends on row, with the costs being
// 6
// 6
// 7
// 5
// 7
// 9
// 6
// 8
// 10
// 6
// 5
// 4
// Additionally the cow market refills after the 6th row (9$) and the 9th row (10$)
