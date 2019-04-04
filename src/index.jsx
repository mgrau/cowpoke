import React from "react";
import ReactDOM from "react-dom";
import { Client, Lobby } from "boardgame.io/react";
import { Cowpoke } from "./game/game";
import CowpokeBoard from "./board/board";

const CowpokeClient = Client({
  numPlayers: 2,
  game: Cowpoke,
  board: CowpokeBoard,
  debug: false,
  multiplayer: { server: "https://mgrau.dev" }
});

const LobbyView = () => (
  <div style={{ padding: 0 }}>
    <h1>Lobby</h1>

    <Lobby
      gameServer="https://mgrau.dev"
      lobbyServer="https://mgrau.dev/cowpoke"
      gameComponents={[{ game: Cowpoke, board: CowpokeBoard }]}
    />
  </div>
);

ReactDOM.render(
  <div>
    {/* <CowpokeClient playerID="0" /> */}
    <LobbyView />
  </div>,
  document.getElementById("root")
);
