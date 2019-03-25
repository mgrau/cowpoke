import React from "react";
import LineTo from "react-lineto";
import Tile from "./tile";

import "./css/trail.css";

export default class Trail extends React.Component {
  render() {
    const trail = this.props.G.trail;
    const spaces = Object.keys(trail).map((space, index) => (
      <Tile
        key={index}
        {...trail[space]}
        G={this.props.G}
        ctx={this.props.ctx}
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

    return (
      <div>
        <div>{lines}</div>
        <div id="trail">{spaces}</div>
      </div>
    );
  }
}
