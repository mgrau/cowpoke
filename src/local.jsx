import React from "react";
import ReactDOM from "react-dom";
import { Client, Lobby } from "boardgame.io/react";
import { Cowpoke } from "./game/game";
import CowpokeBoard from "./board/board";

import "./board/css/lobby.css";

const CowpokeClient = Client({
  numPlayers: 4,
  game: Cowpoke,
  board: CowpokeBoard,
  // multiplayer: { server: "http://localhost:5000" },
  debug: false
});

ReactDOM.render(
  <div>
    <CowpokeClient />
    {/* <Lobby
      gameServer="http://localhost:5000"
      lobbyServer="http://localhost:5000"
      gameComponents={[{ game: Cowpoke, board: CowpokeBoard }]}
    /> */}
  </div>,
  document.getElementById("root")
);
