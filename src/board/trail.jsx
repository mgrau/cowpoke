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
        // G={this.props.G}
        phase={this.props.ctx.phase}
        currentPlayer={this.props.ctx.currentPlayer}
        actionsPerformed={this.props.G.actionsPerformed}
        active={space == currentLocation}
        moves={this.props.moves}
      />
    ));

    const lines = Object.keys(trail)
      .map(space =>
        trail[space].prev.map(prevSpace => (
          <LineTo
            from={trail[space].name}
            to={prevSpace}
            borderColor="#999"
            borderWidth={5}
            key={"line" + trail[space].name + prevSpace}
            delay={1}
            zIndex={-10}
          />
        ))
      )
      .flat();

    const tokens = Object.values(this.props.G.players).map((player, index) => (
      <Token
        key={index}
        location={player.location}
        playerID={player.playerID}
      />
    ));
    return (
      <div className={this.props.active ? "active" : ""}>
        <div>{lines}</div>
        <div id="trail">
          {spaces}
          {tokens}
        </div>
      </div>
    );
  }
}
class Token extends React.Component {
  render() {
    return (
      <div
        id={"token" + this.props.playerID}
        className={"token " + this.state.location}
        style={{
          left: 10 + this.props.playerID * 15 + "%"
        }}
      >
        <Cattleman player={this.props.playerID} />
      </div>
    );
  }
}
