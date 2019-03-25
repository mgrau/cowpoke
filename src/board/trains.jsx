import React from "react";
import Cities from "./cities";

import "./css/trains.css";

export default class Trains extends React.Component {
  render() {
    const playerLocations = Object.keys(this.props.G.players).map(
      index => this.props.G.players[index].engine
    );
    const spaces = [...Array(41).keys()].map(index => {
      return (
        <div
          key={index}
          id={"train-" + index}
          className={
            "train-space " +
            (playerLocations.includes(index)
              ? "train-player-" + playerLocations.indexOf(index)
              : "")
          }
          onClick={() => this.props.moves.moveEngine(index)}
        >
          {index}
        </div>
      );
    });
    return (
      <div id="trains">
        <Cities G={this.props.G} moves={this.props.moves} />
        {spaces}
      </div>
    );
  }
}
