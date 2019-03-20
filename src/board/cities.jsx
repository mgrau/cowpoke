import React from "react";

import "./cities.css";

export default class Cities extends React.Component {
  render() {
    const cities = Object.entries(this.props.G.cities).map(([name, city]) => (
      <City key={name} name={name} {...city} moves={this.props.moves} />
    ));
    return <div id="cities">{cities}</div>;
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
        className={"city " + (this.props.black ? "black" : "")}
        onClick={() => this.ship()}
      >
        {this.props.name.split(/(?=[A-Z])/).join(" ")}
        {players}
      </div>
    );
  }
}
