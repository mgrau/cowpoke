import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPaper } from "@fortawesome/free-solid-svg-icons";

import "./neutral-building.css";

export default class NeutralBuilding extends React.Component {
  render() {
    const actions = this.props.actions.map((action, index) => (
      <div
        className={action}
        key={index}
        onClick={() => {
          console.log(action);
          this.props.moves[action]();
        }}
      >
        {index + 1}
      </div>
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
