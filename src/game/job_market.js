export default function JobMarket(ctx) {
  return {
    numPlayers: ctx.numPlayers,
    row: 0,
    col: 0,
    market: Array(ctx.numPlayers * 12).fill(null),
    cost: [6, 6, 7, 5, 7, 9, 6, 8, 10, 6, 5, 4]
  };
}

export function addWorker(jobMarket, worker) {
  jobMarket.market[
    jobMarket.col + jobMarket.row * jobMarket.numPlayers
  ] = worker;
  jobMarket.col++;
  if (jobMarket.col >= jobMarket.numPlayers) {
    jobMarket.col = 0;
    jobMarket.row++;

    if (jobMarket.row >= 12) {
      console.log("End the game soon!");
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
