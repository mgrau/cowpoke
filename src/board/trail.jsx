import React from "react";
import LineTo from "react-lineto";
import Tile from "./tile";
import { Cattleman } from "./symbols";
import { wrapGrid, forceGridAnimation } from "animate-css-grid";

import "./css/trail.css";

export default class Trail extends React.Component {
  render() {
    const currentLocation = this.props.G.players[this.props.ctx.currentPlayer]
      .location;
    const trail = this.props.trail;
    const spaces = Object.keys(trail).map((space, index) => (
      <Tile
        key={index}
        {...trail[space]}
        phase={this.props.ctx.phase}
        currentPlayer={this.props.ctx.currentPlayer}
        actionsPerformed={this.props.G.actionsPerformed}
        selectedBuilding={this.props.selectedBuilding}
        clearBuilding={this.props.clearBuilding}
        active={space == currentLocation}
        moves={this.props.moves}
      />
    ));

    const tokens = Object.values(this.props.G.players).map((player, index) => (
      <Token
        key={index}
        location={player.location}
        playerID={player.playerID}
      />
    ));
    return (
      <div className={this.props.active ? "active" : ""}>
        <div id="trail">
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
