import React from "react";
import { Points } from "./symbols";
import "./css/card.css";

export default class Card extends React.PureComponent {
  render() {
    const points =
      this.props.points > 0 ? <Points vp={this.props.points} /> : "";
    return (
      <div
        className={"card " + this.props.name.replace(/ /g, "")}
        onClick={() =>
          this.props.discard == undefined ? "" : this.props.discard()
        }
      >
        <div className="value">{this.props.value}</div>
        {points}
      </div>
    );
  }
}
