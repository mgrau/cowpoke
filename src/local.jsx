import React from "react";
import ReactDOM from "react-dom";
import { Client, Lobby } from "boardgame.io/react";
import { Cowpoke } from "./game/game";
import CowpokeBoard from "./board/board";

import "./board/css/lobby.css";

const CowpokeClient = Client({
  numPlayers: 3,
  game: Cowpoke,
  board: CowpokeBoard,
  //   multiplayer: { server: "http://localhost:5000" },
  debug: true
});

ReactDOM.render(
  <div>
    <CowpokeClient />
  </div>,
  document.getElementById("root")
);
