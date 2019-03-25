import React from "react";

import "./css/tokens.css";

export default class Tokens extends React.Component {
  render() {
    return (
      <div className="tokens">
        <div>
          {Object.values(this.props.players)
            .filter(player => player.location === this.props.location)
            .map(player => (
              <span
                className={"cattleman cattleman-player-" + player.playerID}
                key={player.playerID}
              />
            ))}
        </div>
      </div>
    );
  }
}
