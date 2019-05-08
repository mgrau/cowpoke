import React from "react";
import LineTo from "react-lineto";
import Tile from "./tile";
import { Cattleman } from "./symbols";

import "./css/trail.css";

export default class Trail extends React.PureComponent {
  render() {
    const currentLocation = this.props.players[this.props.currentPlayer]
      .location;
    const trail = this.props.trail;
    const spaces = Object.keys(trail).map((space, index) => (
      <Tile
        key={index}
        {...trail[space]}
        phase={this.props.phase}
        currentPlayer={this.props.currentPlayer}
        actionsPerformed={this.props.actionsPerformed}
        selectedBuilding={this.props.selectedBuilding}
        selectBuilding={this.props.selectBuilding}
        active={space == currentLocation}
        moves={this.props.moves}
      />
    ));

    const tokens = Object.values(this.props.players).map((player, index) => (
      <Token
        key={index}
        location={player.location}
        playerID={player.playerID}
      />
    ));
    return (
      <div className={this.props.active ? "active" : ""}>
        <div id="trail" ref={element => (this.grid = element)}>
          {spaces}
          {tokens}
        </div>
        <Lines trail={this.props.trail} />
      </div>
    );
  }
}
class Token extends React.Component {
  render() {
    return (
      <div
        id={"token" + this.props.playerID}
        className={"token " + this.props.location}
        style={{
          left: 10 + this.props.playerID * 15 + "%"
        }}
      >
        <Cattleman player={this.props.playerID} />
      </div>
    );
  }
}

class Lines extends React.Component {
  resize() {
    this.forceUpdate();
  }
  componentDidMount() {
    window.addEventListener("resize", () => this.resize());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.resize());
  }
  render() {
    const lines = Object.values(this.props.trail)
      .map(space =>
        space.prev.map(prevSpace => (
          <LineTo
            from={space.name}
            to={prevSpace}
            borderColor="#999"
            borderWidth={4}
            key={"line" + space.name + prevSpace}
            delay={1}
            zIndex={-10}
          />
        ))
      )
      .flat();
    return <div>{lines}</div>;
  }
}
