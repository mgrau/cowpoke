import React from "react";

import Action from "./action";
import { Worker, Points } from "./symbols";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPaper } from "@fortawesome/free-solid-svg-icons";
import "./css/private_building.css";

export default class PrivateBuilding extends React.Component {
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
    const greenHand = this.props.hand.includes("green") ? (
      <FontAwesomeIcon icon={faHandPaper} color="green" />
    ) : (
      ""
    );
    const blackHand = this.props.hand.includes("black") ? (
      <FontAwesomeIcon icon={faHandPaper} color="black" />
    ) : (
      ""
    );
    return (
      <div className={"private player" + this.props.owner}>
        <div>
          <div className={"body"}>
            <div>
              {this.props.craftsmen}
              <Worker type={"craftsman"} />
            </div>
            <div style={{ justifyContent: "center" }}>
              {greenHand} {blackHand}
            </div>
            <Points vp={this.props.points} />
          </div>
          <div className={"actions"}>{actions}</div>
        </div>
      </div>
    );
  }
}
