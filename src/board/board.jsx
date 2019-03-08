import React from "react";
import Trail from "./trail";
import Player from "./player";
import JobMarket from "./job_market";
import { Start, Stop, Pass, Undo } from "./buttons";

import "./board.css";

export default class CowpokeBoard extends React.Component {
  render() {
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
    buttons.push(<Undo key="undo" undo={this.props.undo} />);

    const players = Object.values(this.props.G.players).map((player, index) => (
      <Player key={index} {...player} />
    ));

    return (
      <div id="board">
        <JobMarket G={this.props.G} moves={this.props.moves} />
        <Trail G={this.props.G} ctx={this.props.ctx} moves={this.props.moves} />
        <div>{players}</div>
        <div style={{ gridColumn: "1/3", gridRow: "3" }}>
          <div>Remaining moves: {this.props.G.movesRemaining}</div>
          <div>Current Phase: {this.props.ctx.phase}</div>

          {buttons}
        </div>
      </div>
    );
  }
}
