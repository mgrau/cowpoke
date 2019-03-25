import React from "react";
import Hazard from "./hazard";
import Teepee from "./teepee";
import NeutralBuilding from "./neutral_building";
import Tokens from "./tokens";

import "./css/tile.css";
export default class Tile extends React.Component {
  onClick() {
    this.props.moves.move(this.props.name);
  }
  render() {
    let tile = "";
    if (this.props.tile !== null) {
      if (this.props.tile.tile === "hazard") {
        tile = <Hazard {...this.props.tile} />;
      } else if (this.props.tile.tile === "teepee") {
        tile = <Teepee {...this.props.tile} />;
      } else if (this.props.tile.tile === "neutral") {
        tile = (
          <NeutralBuilding
            {...this.props.tile}
            moves={this.props.moves}
            G={this.props.G}
            ctx={this.props.ctx}
          />
        );
      }
    }
    return (
      <div
        className={
          "space " + (this.props.woods ? "woods " : "") + this.props.name
        }
        onClick={() => this.onClick()}
      >
        <Tokens players={this.props.G.players} location={this.props.name} />
        {tile}
      </div>
    );
  }
}
