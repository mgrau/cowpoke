import { Client } from "boardgame.io/react";
import GreatWesternTrail from "./game/game";
import TicTacToeBoard from "./board/board";

const App = Client({ game: GreatWesternTrail, board: TicTacToeBoard });

export default App;
