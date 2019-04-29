import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPaper } from "@fortawesome/free-solid-svg-icons";

import "./css/hazard.css";

export default class Hazard extends React.PureComponent {
  render() {
    return (
      <div
        className={"hazard " + this.props.type}
        onClick={() => {
          if (this.props.active) {
            this.props.moves.gainHazard(this.props.name);
          }
        }}
      >
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
