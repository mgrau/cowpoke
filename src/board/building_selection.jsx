import React from "react";
import PrivateBuilding from "./private_building";

import "./css/building_selection.css";

export default class BuildingSelection extends React.Component {
  render() {
    const buildings = this.props.buildings
      .filter(building => !this.props.built.includes(building.name))
      .map((building, index) => (
        <div
          key={index}
          className={
            "space " +
            (this.props.selectedBuilding == building.name ? "active" : "")
          }
          onClick={() => this.props.selectBuilding(building.name)}
        >
          <PrivateBuilding {...building} owner={this.props.playerID} />
        </div>
      ));

    return (
      <div
        id="building-selection"
        className={this.props.active ? "visible active" : ""}
      >
        {buildings}
      </div>
    );
  }
}
