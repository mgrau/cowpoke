import React from "react";
import { Points } from "./symbols";
import "./card.css";

export default class Card extends React.Component {

  render() {
    const points =
      this.props.points > 0 ? <Points vp={this.props.points} /> : "";
    return (
      <div
        className={"card " + this.props.name.replace(/ /g, "")}
        onClick={() => this.props.discard()}
      >
        <div className="value">{this.props.value}</div>
        {points}
      </div>
    );
  }
}
