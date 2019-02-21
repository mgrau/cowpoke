import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPaper } from "@fortawesome/free-solid-svg-icons";

import "./neutral-building.css";

export default class NeutralBuilding extends React.Component {
  render() {
    const actions = this.props.actions.map(action => (
      <div className={action} onClick={() => this.props.moves[action]()} />
    ));
    return (
      <div className={"neutral"}>
        <div>
          <div className={"body"}>{this.props.name}</div>
          <div className={"actions"}>{actions}</div>
        </div>
      </div>
    );
  }
}
