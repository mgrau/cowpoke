import React from "react";
import Tile from "./tile";

import "./board-style.css";

export default class CowpokeBoard extends React.Component {
  render() {
    const spaces = this.props.G.trail.trail.map((space, index) => (
      <Tile key={index} {...space} G={this.props.G} moves={this.props.moves} />
    ));
    return (
      <div>
        <div id="board">{spaces}</div>

        <div>Remaining moves: {this.props.G.movesRemaining}</div>
        <div
          style={{ border: "1px solid", width: "50px", height: "50px" }}
          onClick={() => this.props.moves.stop()}
        >
          End Phase
        </div>
      </div>
    );
  }
}
