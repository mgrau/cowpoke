const Server = require("boardgame.io/server").Server;
const Cowpoke = require("./game/game").Cowpoke;
const server = Server({ games: [Cowpoke] });
server.run(5000);
