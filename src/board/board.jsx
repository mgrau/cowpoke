import React from "react";
import Trains from "./trains";
import JobMarket from "./job_market";
import Trail from "./trail";
import Player from "./player";
import BuildingSelection from "./building_selection";
import CowMarket from "./cow_market";
import { Stop, Pass, End, Undo } from "./buttons";

import "./css/board.css";

export default class CowpokeBoard extends React.Component {
  render() {
    let buttons = [];
    if (this.props.ctx.allowedMoves.includes("stop")) {
      buttons.push(<Stop key="stop" onClick={() => this.props.moves.stop()} />);
    }
    if (this.props.ctx.allowedMoves.includes("pass")) {
      buttons.push(<Pass key="pass" onClick={() => this.props.moves.pass()} />);
    }
    if (this.props.ctx.allowedMoves.includes("end")) {
      buttons.push(<End key="end" onClick={() => this.props.moves.end()} />);
    }
    if (
      this.props.playerID == null ||
      this.props.ctx.currentPlayer == this.props.playerID
    ) {
      buttons.push(<Undo key="undo" undo={this.props.undo} />);
    }

    const players = Object.values(this.props.G.players).map((player, index) => (
      <Player
        key={index}
        {...player}
        G={this.props.G}
        ctx={this.props.ctx}
        moves={this.props.moves}
      />
    ));

    const player = this.props.G.players[this.props.ctx.currentPlayer];

    return (
      <div id="board" className={"player-" + this.props.ctx.currentPlayer}>
        <div id="board-spacer" />
        <Trains
          cities={this.props.G.cities}
          stations={this.props.G.stations}
          engines={Object.values(this.props.G.players).map(
            player => player.engine
          )}
          deliveryValue={this.props.G.deliveryValue}
          moves={this.props.moves}
          active={this.props.ctx.phase == "EnginePhase"}
        />
        <JobMarket
          jobMarket={this.props.G.jobMarket}
          foresight={this.props.G.foresight}
          moves={this.props.moves}
          phase={this.props.ctx.phase}
          actionsPerformed={this.props.G.actionsPerformed}
        />
        <Trail
          trail={this.props.G.trail}
          G={this.props.G}
          ctx={this.props.ctx}
          moves={this.props.moves}
          active={this.props.ctx.phase == "MovePhase"}
        />
        <div id="board-players">{players}</div>
        <BuildingSelection
          G={this.props.G}
          ctx={this.props.ctx}
          moves={this.props.moves}
        />
        <CowMarket
          market={this.props.G.cowMarket}
          moves={this.props.moves}
          cowboys={this.props.G.availableCowboys}
          active={this.props.ctx.phase == "CowPhase"}
        />
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
