import React from "react";
import Hazard from "./hazard";
import Teepee from "./teepee";
import NeutralBuilding from "./neutral-building";

export default class Tile extends React.Component {
  onClick() {
    this.props.moves.move(this.props.name);
  }
  render() {
    let tile = "";
    if (this.props.tile.tile === "hazard") {
      tile = <Hazard {...this.props.tile} />;
    } else if (this.props.tile.tile === "teepee") {
      tile = <Teepee {...this.props.tile} />;
    } else if (this.props.tile.tile === "neutral") {
      tile = <NeutralBuilding {...this.props.tile} moves={this.props.moves} />;
    }
    return (
      <div
        className={
          "space " + (this.props.woods ? "woods " : "") + this.props.name
        }
        onClick={() => this.onClick()}
      >
        {tile}
        <div>
          {Object.values(this.props.G.players)
            .filter(player => player.location === this.props.name)
            .map(player => (
              <span
                className="cattleman"
                key={player.playerID}
                style={{ backgroundColor: player.color }}
              />
            ))}
        </div>
      </div>
    );
  }
}
