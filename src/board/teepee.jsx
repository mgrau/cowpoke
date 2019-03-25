import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCampground, faHandPaper } from "@fortawesome/free-solid-svg-icons";

import "./css/teepee.css";

export default class Teepee extends React.Component {
  render() {
    return (
      <div className={"teepee " + this.props.color}>
        <div>
          <FontAwesomeIcon icon={faCampground} />
        </div>
        <div>
          <FontAwesomeIcon icon={faHandPaper} color={this.props.hand} />
        </div>
      </div>
    );
  }
}
