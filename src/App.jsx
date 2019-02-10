import { Client } from "boardgame.io/react";
import TicTacToe from "./game";
import TicTacToeBoard from "./board";
import TicTacToeAI from "./ai";

const App = Client({ game: TicTacToe, board: TicTacToeBoard });

export default App;
