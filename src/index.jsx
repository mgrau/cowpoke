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
  debug: true
  // multiplayer: { server: "https://mgrau.dev" }
});

ReactDOM.render(
  <div>
    <CowpokeClient />
    {/* <Lobby
      gameServer="https://mgrau.dev"
      lobbyServer="https://mgrau.dev/cowpoke"
      gameComponents={[{ game: Cowpoke, board: CowpokeBoard }]}
    /> */}
  </div>,
  document.getElementById("root")
);
