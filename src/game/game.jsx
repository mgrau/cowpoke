import { Game } from 'boardgame.io/core';

// return true if a;; cells in a winning configuration
function IsVictory(cells) {
    return (
      (cells[0] !== null && cells[0] === cells[1] && cells[1] === cells[2]) || 
      (cells[3] !== null && cells[3] === cells[4] && cells[4] === cells[5]) ||
      (cells[6] !== null && cells[6] === cells[7] && cells[7] === cells[8]) ||
      (cells[0] !== null && cells[0] === cells[3] && cells[3] === cells[6]) ||
      (cells[1] !== null && cells[1] === cells[4] && cells[4] === cells[7]) ||
      (cells[2] !== null && cells[2] === cells[5] && cells[5] === cells[8]) ||
      (cells[0] !== null && cells[0] === cells[4] && cells[4] === cells[8]) ||
      (cells[2] !== null && cells[2] === cells[4] && cells[4] === cells[6])
      );
  }
  
  // Return true if all `cells` are occupied.
  function IsDraw(cells) {
    return cells.filter(c => c === null).length === 0;
  }
  
  const TicTacToe = Game({
    setup: () => ({ cells: Array(9).fill(null) }),
  
    moves: {
      clickCell(G, ctx, id) {
        if (G.cells[id] == null) {
          G.cells[id] = ctx.currentPlayer;
        }
      },
    },
    flow: {
      movesPerTurn: 1,
      endGameIf: (G, ctx) => {
        if (IsVictory(G.cells)) {
          return { winner: ctx.currentPlayer };
        }
        if (IsDraw(G.cells)) {
          return { draw: true }
        }
      }
    },
  });

  export default TicTacToe;