import React from "react";
import Card from "./card";
import { Money, Worker, Certificate } from "./symbols";
import "./player.css";

export default class Player extends React.Component {
  render() {
    const hand = this.props.cards.hand.map((card, index) => (
      <Card key={index} {...card} />
    ));

    const discard =
      this.props.cards.discard.length > 0 ? (
        <Card {...this.props.cards.discard[0]} />
      ) : (
        ""
      );

    const cowboys = Array(this.props.cowboys)
      .fill()
      .map((cowboy, index) => <Worker key={index} type="cowboy" />);
    const craftsmen = Array(this.props.craftsmen)
      .fill()
      .map((craftsman, index) => <Worker key={index} type="craftsman" />);
    const engineers = Array(this.props.engineers)
      .fill()
      .map((engineer, index) => <Worker key={index} type="engineer" />);
    return (
      <div className={"player " + ("player" + this.props.playerID)}>
        <div className="player-header">
          <span>Player {this.props.playerID}</span>
          <span>
            <Money $={this.props.money} />
          </span>
          <span>
            <Certificate spaces={this.props.certificates} />
          </span>
          /4
        </div>
        <div className="player-workers">
          <div className="player-cowboys">{cowboys}</div>
          <div className="player-craftsmen">{craftsmen}</div>
          <div className="player-engineers">{engineers}</div>
        </div>
        <div className="player-hand">{hand}</div>
        <div className="player-discard">{discard}</div>
      </div>
    );
  }
}
