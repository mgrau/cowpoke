/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Plugin that maintains state for each player in G.players.
 * During a turn, G.player will contain the object for the current player.
 *
 * @param {function} initPlayerState - Function of type (playerID) => playerState.
 */
export default {
  fnWrap: moveFn => {
    return (G, ctx, ...args) => {
      const current = ctx.currentPlayer;
      const player = G.players[current];

      G = { ...G, player };
      G = moveFn(G, ctx, ...args);

      const players = {
        ...G.players,
        [current]: G.player
      };

      {
        /* eslint-disable-next-line no-unused-vars */
        const { player, ...rest } = G;
        return { ...rest, players };
      }
    };
  },

  G: {
    setup: (G, ctx, game) => {
      let players = {};
      for (let i = 0; i < ctx.numPlayers; i++) {
        let playerState = {};
        if (game.playerSetup !== undefined) {
          playerState = game.playerSetup(ctx, i + "", G.basicObjectives[i]);
        }
        players[i + ""] = playerState;
      }
      return { ...G, players };
    }
  }
};
