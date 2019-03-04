import React from "react";

import "./card.css";

export default class Card extends React.Component {
  render() {
    return (
      <div className={"card " + this.props.name.replace(/ /g, "")}>
        <div className="name">{this.props.name}</div>
        <div className="value">{this.props.value}</div>
      </div>
    );
  }
}
