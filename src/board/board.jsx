import React from "react";
import Trains from "./trains";
import JobMarket from "./job_market";
import Trail from "./trail";
import Player from "./player";
import CowMarket from "./cow_market";
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

    const player = this.props.G.players[this.props.ctx.currentPlayer];

    return (
      <div id="board">
        <Trains G={this.props.G} moves={this.props.moves} />
        <JobMarket G={this.props.G} moves={this.props.moves} />
        <Trail
          G={this.props.G}
          ctx={this.props.ctx}
          moves={this.props.moves}
          id="board-trail"
        />
        <div id="board-players">{players}</div>
        <CowMarket {...this.props} />
        <div id="board-info">
          <div className={"current-player-" + player.playerID}>
            Current Player: {player.name}
          </div>
          <div>Remaining moves: {this.props.G.movesRemaining}</div>
          <div>Current Phase: {this.props.ctx.phase}</div>
          {buttons}
        </div>
      </div>
    );
  }
}
