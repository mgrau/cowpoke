import React from "react";

import "./css/stations.css";

export default class Stations extends React.Component {
  render() {
    const stations = this.props.G.stations.map((station, index) => (
      <Station
        key={index}
        {...station}
        G={this.props.G}
        ctx={this.props.ctx}
        moves={this.props.moves}
      />
    ));
    return <div id="stations">{stations}</div>;
  }
}

class Station extends React.Component {
  render() {
    const playerLocations = Object.keys(this.props.G.players).map(
      index => this.props.G.players[index].engine
    );
    const players = this.props.players.map((player, index) => (
      <span className={"cattleman cattleman-player-" + player} key={index} />
    ));
    return (
      <div
        className={
          "station " +
          (playerLocations.includes(this.props.distance)
            ? "train-player-" + playerLocations.indexOf(this.props.distance)
            : this.props.black
            ? "black"
            : "")
        }
        onClick={() => {
          if (this.props.ctx.phase == "EnginePhase") {
            this.props.moves.moveEngine(this.props.distance);
          } else if (this.props.ctx.phase == "StationPhase") {
            this.props.moves.upgradeStation(this.props.distance);
          }
        }}
      >
        <div className="distance">{this.props.distance}</div>
        {players}
      </div>
    );
  }
}
