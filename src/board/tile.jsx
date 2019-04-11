import React from "react";
import Hazard from "./hazard";
import Teepee from "./teepee";
import NeutralBuilding from "./neutral_building";
import PrivateBuilding from "./private_building";
import Tokens from "./tokens";
import { Card, Certificate, Money } from "./symbols";

import "./css/tile.css";
export default class Tile extends React.Component {
  onClick() {
    if (this.props.ctx.phase == "MovePhase") {
      this.props.moves.move(this.props.name);
    } else if (this.props.ctx.phase == "BuildPhase") {
      if (this.props.build) {
        if (
          this.props.tile == null ||
          this.props.tile.owner == this.props.ctx.currentPlayer
        ) {
          this.props.moves.build(this.props.name);
        }
      }
    }
  }
  render() {
    let tile = "";
    if (this.props.tile !== null) {
      if (this.props.tile.tile === "hazard") {
        tile = (
          <Hazard
            {...this.props.tile}
            ctx={this.props.ctx}
            moves={this.props.moves}
            name={this.props.name}
          />
        );
      } else if (this.props.tile.tile === "teepee") {
        tile = (
          <Teepee
            {...this.props.tile}
            ctx={this.props.ctx}
            moves={this.props.moves}
            name={this.props.name}
          />
        );
      } else if (this.props.tile.tile === "neutral") {
        tile = (
          <NeutralBuilding
            {...this.props.tile}
            moves={this.props.moves}
            G={this.props.G}
            ctx={this.props.ctx}
          />
        );
      } else if (this.props.tile.tile === "private") {
        tile = (
          <PrivateBuilding
            {...this.props.tile}
            moves={this.props.moves}
            G={this.props.G}
            ctx={this.props.ctx}
          />
        );
      }
    }

    let risk = "";
    if (this.props.name.includes("Risk")) {
      if (
        (this.props.name == "floodRisk1") |
        (this.props.name == "floodRisk2") |
        (this.props.name == "rockfallRisk2") |
        (this.props.name == "teepeeRisk2")
      ) {
        risk = (
          <div
            className={"risk " + (tile == "" ? "" : "displaced")}
            onClick={() => {
              if (this.props.ctx.phase == "PrivatePhase") {
                this.props.moves.risk();
              }
            }}
          >
            <div style={{ fontSize: "75%" }}>
              <Card cow="Jersey" />
            </div>
            <Certificate spaces={1} />
            <Money $={2} />
          </div>
        );
      } else if (
        (this.props.name == "droughtRisk1") |
        (this.props.name == "rockfallRisk1") |
        (this.props.name == "teepeeRisk1")
      ) {
        risk = (
          <div
            className={"risk " + (tile == "" ? "" : "displaced")}
            onClick={() => {
              if (this.props.ctx.phase == "PrivatePhase") {
                this.props.moves.risk();
              }
            }}
          >
            <div style={{ fontSize: "75%" }}>
              <Card cow="any" />
            </div>
            <Certificate spaces={1} />
          </div>
        );
      }
    }
    return (
      <div
        className={
          "space " +
          (this.props.woods ? "woods " : "") +
          (this.props.build ? "build " : "nobuild ") +
          this.props.name
        }
        onClick={() => this.onClick()}
      >
        <Tokens players={this.props.G.players} location={this.props.name} />
        {tile}
        {risk}
      </div>
    );
  }
}
