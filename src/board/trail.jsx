import React from "react";
import LineTo from "react-lineto";
import Tile from "./tile";

import "./trail.css";

export default class Trail extends React.Component {
  render() {
    const spaces = this.props.G.trail.trail.map((space, index) => (
      <Tile
        key={index}
        {...space}
        G={this.props.G}
        ctx={this.props.ctx}
        moves={this.props.moves}
      />
    ));

    const lines = this.props.G.trail.trail
      .map(space =>
        space.prev.map(prevSpace => (
          <LineTo
            from={space.name}
            to={prevSpace}
            borderColor="#999"
            borderWidth={5}
            key={"line" + space.name + prevSpace}
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
