import React from "react";
import PrivateBuilding from "./private_building";

import "./css/building_selection.css";

export default class BuildingSelection extends React.Component {
  render() {
    const buildings = this.props.G.buildings
      .filter(
        building =>
          !this.props.G.players[this.props.ctx.currentPlayer].built.includes(
            building.name
          )
      )
      .map((building, index) => (
        <div
          key={index}
          className="space"
          onClick={() => this.props.moves["selectBuilding"](building.name)}
        >
          <PrivateBuilding
            {...building}
            owner={this.props.ctx.currentPlayer}
            G={this.props.G}
            ctx={this.props.ctx}
          />
        </div>
      ));

    return (
      <div
        id="building-selection"
        className={this.props.ctx.phase == "BuildPhase" ? "visible" : ""}
      >
        {buildings}
      </div>
    );
  }
}
