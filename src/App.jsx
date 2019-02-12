import { Client } from "boardgame.io/react";
import Cowpoke from "./game/game";
import CowpokeBoard from "./board/board";

const App = Client({
  numPlayers: 3,
  game: Cowpoke,
  board: CowpokeBoard
});

export default App;
