import React from "react";

import Action from "./action";

import "./css/neutral_building.css";

export default class NeutralBuilding extends React.Component {
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
      <div className={"neutral"}>
        <div>
          <div className={"body"}>
            {this.props.name.replace(/neutral/g, "")}
          </div>
          <div className={"actions"}>{actions}</div>
        </div>
      </div>
    );
  }
}
