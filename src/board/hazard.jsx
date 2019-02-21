import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPaper } from "@fortawesome/free-solid-svg-icons";

import "./hazard.css";

export default class Hazard extends React.Component {
  render() {
    return (
      <div className={"hazard " + this.props.type}>
        <div>
          <span>
            <FontAwesomeIcon icon={faHandPaper} color={this.props.hand} />
          </span>
          <span>{this.props.points}</span>
        </div>
      </div>
    );
  }
}
