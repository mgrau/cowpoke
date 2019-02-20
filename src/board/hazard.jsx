import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPaper } from "@fortawesome/free-solid-svg-icons";

import "./hazard.css";

export default class Hazard extends React.Component {
  render() {
    return (
      <div className={"hazard " + this.props.type}>
        <div>
          <FontAwesomeIcon icon={faHandPaper} color={this.props.hand} />
          <div>{this.props.points}</div>
        </div>
      </div>
    );
  }
}
