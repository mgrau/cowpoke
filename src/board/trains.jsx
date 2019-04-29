import React from "react";
import { Money, Points } from "./symbols";

import "./css/trains.css";

export default class Trains extends React.PureComponent {
  render() {
    const cities = Object.entries(this.props.cities).map(([name, city]) => (
      <City
        key={name}
        name={name}
        {...city}
        deliveryValue={this.props.deliveryValue}
        moves={this.props.moves}
      />
    ));

    const spaces = [...Array(41).keys()].map(index => {
      return (
        <div
          key={index}
          id={"train-" + index}
          className={
            "train-space " +
            (this.props.engines.includes(index)
              ? "train-player-" + this.props.engines.indexOf(index)
              : "")
          }
          onClick={() => this.props.moves.moveEngine(index)}
        >
          {index}
        </div>
      );
    });

    const stations = this.props.stations.map((station, index) => (
      <Station
        key={index}
        {...station}
        engines={this.props.engines}
        moves={this.props.moves}
        active={this.props.active}
      />
    ));

    const value =
      this.props.deliveryValue != null ? (
        <div id="delivery-value">Delivery Value: {this.props.deliveryValue}</div>
      ) : (
        ""
      );

    return (
      <div id="trains">
        {cities}
        {spaces}
        {stations}
        {value}
      </div>
    );
  }
}

class City extends React.PureComponent {
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
          (this.props.black ? "black" : "") +
          " " +
          (this.props.distance <= this.props.deliveryValue ? "active" : "")
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
class Station extends React.PureComponent {
  render() {
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
          (this.props.engines.includes(this.props.distance)
            ? "train-player-" + this.props.engines.indexOf(this.props.distance)
            : this.props.black
            ? "black"
            : "")
        }
        onClick={() => {
          if (this.props.active) {
            this.props.moves.moveEngine(this.props.distance);
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
          onClick={() => {
            if (this.props.active) {
              this.props.moves.upgradeStation();
            }
          }}
        >
          <Money $={-this.props.cost} />
          <Points vp={this.props.points} />
        </div>
      </div>
    );
  }
}
