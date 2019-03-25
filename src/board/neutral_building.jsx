import React from "react";

import Action from "./action";

import "./css/neutral_building.css";

export default class NeutralBuilding extends React.Component {
  render() {
    const actions = this.props.actions.map((action, index) => (
      <Action
        key={index}
        action={action}
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
