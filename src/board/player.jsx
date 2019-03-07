import React from "react";
import Card from "./card";
import "./player.css";

export default class Player extends React.Component {
  render() {
    return (
      <div className={"player " + ("player" + this.props.playerID)}>
        <div>
          <span>
            {this.props.playerID} : {this.props.name}
          </span>
          <span>$={this.props.money}</span>
        </div>
        <div>
          <div>Cowboys: {this.props.cowboys}</div>
          <div>Craftsmen: {this.props.craftsmen}</div>
          <div>Engineers: {this.props.engineers}</div>
        </div>
        <Hand hand={this.props.deck.hand} />
      </div>
    );
  }
}

class Hand extends React.Component {
  render() {
    const hand = this.props.hand.map((card, index) => (
      <Card key={index} {...card} />
    ));
    return <div className="player-hand">{hand}</div>;
  }
}
