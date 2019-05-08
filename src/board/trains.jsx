import React from "react";
import { Money, Points, Cattleman, Worker } from "./symbols";
import StationMaster from "./station_master";

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
        phase={this.props.phase}
      />
    ));

    const spaces = [...Array(41).keys()].map(index => {
      return (
        <div
          key={index}
          id={"train-" + index}
          className={
            "train-space " +
            (index > 18 ? "small " : "") +
            (this.props.engines.includes(index)
              ? "train-player-" + this.props.engines.indexOf(index)
              : "")
          }
          onClick={() => {
            console.log({ destination: index });
            this.props.moves.moveEngine(index);
          }}
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
        selectedWorker={this.props.selectedWorker}
        clearWorker={this.props.clearWorker}
      />
    ));

    const value =
      this.props.deliveryValue != null ? (
        <div id="delivery-value">
          Delivery Value: {this.props.deliveryValue}
        </div>
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
    if (this.props.phase == "KansasCity") {
      this.props.moves.kansasCityShip(this.props.name);
    } else if (this.props.phase == "SpecialDeliveryPhase") {
      this.props.moves.specialDelivery(this.props.name);
    }
  }
  render() {
    const players = (this.props.players.length == 0
      ? [null]
      : this.props.players
    ).map((player, index) => (
      <div
        className="player"
        style={{
          left: index * 5 + "%"
        }}
        key={index}
      >
        <Cattleman player={player} />
      </div>
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
    const players = (this.props.players.length == 0
      ? [null]
      : this.props.players
    ).map((player, index) => (
      <div
        className="player"
        style={{
          top: index * 7.5 + "%"
        }}
        key={index}
      >
        <Cattleman player={player} />
      </div>
    ));

    let stationMaster = <div className="space" />;
    if (this.props.stationMaster != null) {
      if (this.props.stationMaster.tile == "stationmaster") {
        stationMaster = (
          <StationMaster
            {...this.props.stationMaster}
            moves={this.props.moves}
            active={this.props.active}
            selectedWorker={this.props.selectedWorker}
            clearWorker={this.props.clearWorker}
          />
        );
      } else if (this.props.stationMaster.tile == "worker") {
        stationMaster = <Worker type={this.props.stationMaster.type} />;
      }
    }

    return (
      <div
        className={"station " + (this.props.black ? "black" : "")}
        style={{
          gridColumnStart: this.props.distance - 0.5,
          gridColumnEnd: this.props.distance + 2.5
        }}
      >
        {stationMaster}
        <div
          className={
            "station-engine " +
            (+this.props.engines.includes(this.props.distance)
              ? "train-player-" +
                this.props.engines.indexOf(this.props.distance)
              : "")
          }
          onClick={() => {
            if (this.props.active) {
              this.props.moves.moveEngine(this.props.distance);
            }
          }}
        >
          {this.props.distance - 0.5}
        </div>
        <div
          className="station-tokens"
          onClick={() => {
            if (this.props.active) {
              this.props.moves.upgradeStation();
            }
          }}
        >
          {players}
        </div>
        <div className="station-points">
          <Money $={-this.props.cost} />
          <Points vp={this.props.points} />
        </div>
      </div>
    );
  }
}
