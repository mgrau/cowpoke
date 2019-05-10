import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Trains from "./trains";
import JobMarket from "./job_market";
import Trail from "./trail";
import Player from "./player";
import BuildingSelection from "./building_selection";
import CowMarket from "./cow_market";
import Objectives from "./objectives";
import { Stop, Pass, End, Undo } from "./buttons";

import "./css/board.css";

export default class CowpokeBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedToken: null,
      selectedBuilding: null,
      selectedWorker: null,
      tabIndex: 0
    };

    this.selectToken = this.selectToken.bind(this);
    this.selectBuilding = this.selectBuilding.bind(this);
    this.selectWorker = this.selectWorker.bind(this);
  }

  selectToken(token) {
    this.setState({ selectedToken: token });
  }

  selectBuilding(building) {
    this.setState({ selectedBuilding: building });
  }

  selectWorker(worker) {
    this.setState({ selectedWorker: worker });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ctx.phase == "CowPhase") {
      console.log("got props");
      this.setState({ tabIndex: 0 });
    }
    if (nextProps.ctx.phase == "BuildPhase") {
      console.log("got props");
      this.setState({ tabIndex: 1 });
    }
    if (nextProps.ctx.phase == "ObjectivePhase") {
      console.log("got props");
      this.setState({ tabIndex: 2 });
    }
  }

  render() {
    let buttons = [];
    if (this.props.ctx.allowedMoves.includes("stop")) {
      buttons.push(<Stop key="stop" onClick={() => this.props.moves.stop()} />);
    }
    if (this.props.ctx.allowedMoves.includes("pass")) {
      buttons.push(<Pass key="pass" onClick={() => this.props.moves.pass()} />);
    }
    if (
      this.props.ctx.allowedMoves.includes("end") &&
      (this.props.ctx.phase != "KansasCity" ||
        this.props.G.actionsPerformed.includes("kansasCityShip"))
    ) {
      buttons.push(
        <End key="end turn" onClick={() => this.props.moves.end()} />
      );
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
        selectToken={token => this.selectToken(token)}
        selectWorker={worker => this.selectWorker(worker)}
      />
    ));

    const player = this.props.G.players[this.props.ctx.currentPlayer];

    return (
      <div id="board" className={"player-" + this.props.ctx.currentPlayer}>
        <Trains
          cities={this.props.G.cities}
          stations={this.props.G.stations}
          engines={Object.values(this.props.G.players).map(
            player => player.engine
          )}
          deliveryValue={this.props.G.deliveryValue}
          selectedToken={this.state.selectedToken}
          selectedWorker={this.state.selectedWorker}
          clearWorker={() => this.selectWorker(null)}
          moves={this.props.moves}
          phase={this.props.ctx.phase}
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
          players={this.props.G.players}
          phase={this.props.ctx.phase}
          currentPlayer={this.props.ctx.currentPlayer}
          moves={this.props.moves}
          actionsPerformed={this.props.G.actionsPerformed}
          selectedBuilding={this.state.selectedBuilding}
          selectBuilding={this.selectBuilding}
          active={this.props.ctx.phase == "MovePhase"}
        />
        <div id="board-players">{players}</div>

        <Tabs
          id="board-select"
          selectedIndex={this.state.tabIndex}
          onSelect={tabIndex => this.setState({ tabIndex })}
          selectedTabClassName={"activeTab"}
        >
          <TabList className="tabList">
            <Tab>Cow Market</Tab>
            <Tab>Buildings</Tab>
            <Tab>Objectives</Tab>
          </TabList>

          <TabPanel>
            <CowMarket
              market={this.props.G.cowMarket}
              moves={this.props.moves}
              cowboys={this.props.G.availableCowboys}
              active={this.props.ctx.phase == "CowPhase"}
            />
          </TabPanel>
          <TabPanel>
            <BuildingSelection
              buildings={this.props.G.buildings}
              built={this.props.G.players[this.props.ctx.currentPlayer].built}
              playerID={this.props.ctx.currentPlayer}
              selectBuilding={this.selectBuilding}
              selectedBuilding={this.state.selectedBuilding}
              active={this.props.ctx.phase == "BuildPhase"}
            />
          </TabPanel>
          <TabPanel>
            <Objectives
              objectives={this.props.G.objectives}
              moves={this.props.moves}
            />
          </TabPanel>
        </Tabs>

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
