import React from "react";
import { Money, Points } from "./symbols";

import "./css/trains.css";

export default class Trains extends React.Component {
  render() {
    const cities = Object.entries(this.props.G.cities).map(([name, city]) => (
      <City key={name} name={name} {...city} moves={this.props.moves} />
    ));

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

    const stations = this.props.G.stations.map((station, index) => (
      <Station
        key={index}
        {...station}
        G={this.props.G}
        ctx={this.props.ctx}
        moves={this.props.moves}
      />
    ));

    return (
      <div id="trains">
        {cities}
        {spaces}
        {stations}
      </div>
    );
  }
}

class City extends React.Component {
  ship() {
    this.props.moves.kansasCityShip(this.props.name);
  }
  render() {
    const players = this.props.players.map((player, index) => (
      <span className={"cattleman cattleman-player-" + player} key={index} />
    ));
    return (
      <div
        className={
          "city city-" +
          this.props.name +
          " " +
          (this.props.black ? "black" : "")
        }
        onClick={() => this.ship()}
        style={{ gridColumn: this.props.distance + 1 }}
      >
        <div className="name">
          {this.props.name.split(/(?=[A-Z])/).join(" ")}
        </div>
        <div className="distance">{this.props.distance}</div>
        {players}
      </div>
    );
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

    const stationMaster =
      this.props.stationMaster == null ? (
        <div className="space" />
      ) : (
        <div className="station-master" />
      );
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
        style={{
          gridColumnStart: this.props.distance - 0.5,
          gridColumnEnd: this.props.distance + 2.5
        }}
      >
        {stationMaster}
        <div className="station-tokens">{players}</div>
        <div
          className="station-points"
          onClick={() => this.props.moves.upgradeStation()}
        >
          <Money $={-this.props.cost} />
          <Points vp={this.props.points} />
        </div>
      </div>
    );
  }
}
