import React from "react";
import { Cattleman } from "./symbols";
import "./css/tokens.css";

export default class Tokens extends React.Component {
  render() {
    return (
      <div className="tokens">
        <div>
          {Object.values(this.props.players)
            .filter(player => player.location === this.props.location)
            .map(player => (
              <Cattleman key={player.playerID} player={player.playerID} />
            ))}
        </div>
      </div>
    );
  }
}
