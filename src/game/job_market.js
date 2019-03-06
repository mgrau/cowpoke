import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { timingSafeEqual } from "crypto";

export default class JobMarket {
  constructor(ctx) {
    this.numPlayers = ctx.numPlayers;
    this.row = 0;
    this.col = 0;
    this.market = Array(this.numPlayers * 12).fill(null);
  }

  addWorker(worker) {
    this.market[this.col + this.row * this.numPlayers] = worker;
    this.col++;
    if (this.row >= this.numPlayers) {
      this.col = 0;
      this.row++;

      if (this.row >= 12) {
        console.log("End the game soon!");
      }
    }
  }

  hire(row, col) {
    if (row >= this.row) {
      console.log("can't hire from this row yet!");
      return null;
    }
    worker = this.market[col + row * this.numPlayers];
    this.market[col + row * this.numPlayers] = null;
    return worker;
  }

  marketDisplay() {}
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
