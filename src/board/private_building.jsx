import React from "react";

import Action from "./action";
import { Worker, Points } from "./symbols";
import "./css/private_building.css";

export default class PrivateBuilding extends React.Component {
  render() {
    const actions = [...Array(this.props.actions).keys()].map(index => (
      <Action
        key={index}
        building={this.props.name}
        index={index}
        moves={this.props.moves}
        G={this.props.G}
        ctx={this.props.ctx}
      />
    ));
    return (
      <div className={"private player" + this.props.owner}>
        <div>
          <div className={"body"}>
            {this.props.craftsmen}
            <Worker type={"craftsman"} />
            <Points vp={this.props.points} />
          </div>
          <div className={"actions"}>{actions}</div>
        </div>
      </div>
    );
  }
}
