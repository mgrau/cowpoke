import React from "react";

import "./board-style.css";

export default class CowpokeBoard extends React.Component {
  onClick(name) {
    this.props.moves.move(name);
  }

  render() {
    console.log();
    const spaces = this.props.G.trail.trail.map((space, index) => (
      <div
        className={"space " + space.name}
        key={index}
        onClick={() => this.onClick(space.name)}
      >
        {space.name}
        <div>
          {Object.values(this.props.G.players)
            .filter(player => player.location === space.name)
            .map(player => "P" + player.playerID)}
        </div>
      </div>
    ));
    return (
      <div>
        <div id="board">{spaces}</div>

        <div>Remaining moves: {this.props.G.movesRemaining}</div>
        <div
          style={{ border: "1px solid", width: "50px", height: "50px" }}
          onClick={() => this.props.events.endPhase()}
        >
          End Phase
        </div>
      </div>
    );
  }
}
