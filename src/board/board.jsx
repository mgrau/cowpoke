import React from "react";
import Tile from "./tile";
import Player from "./player";
import { Start, Stop, Pass } from "./buttons";

import LineTo from "react-lineto";

import "./board.css";
import "./trail.css";

export default class CowpokeBoard extends React.Component {
  render() {
    const spaces = this.props.G.trail.trail.map((space, index) => (
      <Tile key={index} {...space} G={this.props.G} moves={this.props.moves} />
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

    let buttons = [];
    if (this.props.ctx.allowedMoves.includes("start")) {
      buttons.push(
        <Start key="start" onClick={() => this.props.moves.start()} />
      );
    }
    if (this.props.ctx.allowedMoves.includes("stop")) {
      buttons.push(<Stop key="stop" onClick={() => this.props.moves.stop()} />);
    }
    if (this.props.ctx.allowedMoves.includes("pass")) {
      buttons.push(<Pass key="pass" onClick={() => this.props.moves.pass()} />);
    }

    const players = Object.values(this.props.G.players).map((player, index) => (
      <Player key={index} {...player} />
    ));

    // const players = this.G.players.maps(player => <Player player={player} />);
    return (
      <div
      // tabIndex="0"
      // onKeyDown={e => {
      //   if (e.keyCode === 32) {
      //     const currentPlayer = this.props.ctx.currentPlayer;
      //     const location = this.props.G.players[currentPlayer].location;
      //     this.props.moves.move(this.props.G.trail.getNext(location)[0]);
      //   } else if (e.keyCode === 69) {
      //     this.props.moves.stop();
      //   }
      // }}
      >
        <div>{lines}</div>
        <div id="board">{spaces}</div>

        <div>Remaining moves: {this.props.G.movesRemaining}</div>
        <div>Current Phase: {this.props.ctx.phase}</div>

        {buttons}

        {players}
      </div>
    );
  }
}
