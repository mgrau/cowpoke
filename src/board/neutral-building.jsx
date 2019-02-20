import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPaper } from "@fortawesome/free-solid-svg-icons";

import "./neutral-building.css";

export default class NeutralBuilding extends React.Component {
  render() {
    return (
      <div className={"neutral"}>
        <div>
          <div className={"body"}>{this.props.name}</div>
          <div>action1</div>
          <div>action2</div>
          <div>action3</div>
        </div>
      </div>
    );
  }
}
