import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCampground, faHandPaper } from "@fortawesome/free-solid-svg-icons";

import "./css/teepee.css";

export default class Teepee extends React.Component {
  render() {
    return (
      <div
        className={"teepee " + this.props.color}
        onClick={() => {
          if (this.props.name != undefined) {
            if (this.props.ctx.phase == "TeepeePhase") {
              this.props.moves.gainTeepee(this.props.name);
            }
          }
        }}
      >
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
