import React from "react";
import ReactDOM from "react-dom";

import { Client } from "boardgame.io/react";
import { Cowpoke } from "./game/game";
import CowpokeBoard from "./board/board";

const CowpokeClient = Client({
  numPlayers: 3,
  game: Cowpoke,
  board: CowpokeBoard,
  debug: false
});

ReactDOM.render(
  <div>
    <CowpokeClient playerID="0" />
  </div>,
  document.getElementById("root")
);
