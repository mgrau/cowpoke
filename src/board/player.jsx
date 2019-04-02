import React from "react";
import Card from "./card";
import { Money, Worker, Certificate } from "./symbols";
import { AuxAction } from "../game/aux_actions";

import "./css/player.css";

export default class Player extends React.Component {
  certificates() {
    if (
      this.props.ctx.allowedMoves.includes("kansasCitySell") &&
      this.props.G.actionsPerformed.includes("kansasCity3") &&
      !this.props.G.actionsPerformed.includes("kansasCitySell") &&
      this.props.ctx.currentPlayer == this.props.playerID
    ) {
      return (
        <div className="player-spend-certificates">
          Spend:
          {[6, 4, 3, 2, 1, 0]
            .filter(n => n <= this.props.certificates)
            .map(n => (
              <div
                key={n}
                onClick={() =>
                  this.props.moves.kansasCitySell(this.props.certificates - n)
                }
              >
                <Certificate spaces={this.props.certificates - n} />
              </div>
            ))}
        </div>
      );
    } else {
      return "";
    }
  }

  render() {
    const hand = this.props.cards.hand.map((card, index) => (
      <Card
        key={index}
        {...card}
        discard={() => {
          if (this.props.ctx.phase == "DiscardPhase") {
            this.props.moves.discardCycle(index);
          } else if (this.props.ctx.phase == "DiscardPairPhase") {
            this.props.moves.discardPair(card.name);
          } else if (this.props.ctx.phase == "TrashPhase") {
            this.props.moves.trash(index);
          }
        }}
      />
    ));

    const discard =
      this.props.cards.discard.length > 0 ? (
        <Card {...this.props.cards.discard[0]} />
      ) : (
        ""
      );

    var max_certificates = 3;
    if (
      this.props.tokens.certificate1 == 0 &&
      this.props.tokens.certificate2 == 0
    ) {
      max_certificates = 6;
    } else if (this.props.tokens.certificate1 == 0) {
      max_certificates = 4;
    }

    const certificates = this.certificates();

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
          Moves:
          <Token
            key={"move1"}
            name={"move1"}
            empty={this.props.tokens.move1 <= 0}
            playerID={this.props.playerID}
            ctx={this.props.ctx}
            moves={this.props.moves}
            black={true}
          />
          <Token
            key={"move2"}
            name={"move2"}
            empty={this.props.tokens.move2 <= 0}
            playerID={this.props.playerID}
            ctx={this.props.ctx}
            moves={this.props.moves}
            black={true}
          />
          Hand:
          <Token
            key={"hand1"}
            name={"hand1"}
            empty={this.props.tokens.hand1 <= 0}
            playerID={this.props.playerID}
            ctx={this.props.ctx}
            moves={this.props.moves}
            black={true}
          />
          <Token
            key={"hand2"}
            name={"hand2"}
            empty={this.props.tokens.hand2 <= 0}
            playerID={this.props.playerID}
            ctx={this.props.ctx}
            moves={this.props.moves}
            black={true}
          />
          <span>
            <Certificate spaces={this.props.certificates} />
          </span>
          /{max_certificates}
          <Token
            key={"certificate1"}
            name={"certificate1"}
            empty={this.props.tokens.certificate1 <= 0}
            playerID={this.props.playerID}
            ctx={this.props.ctx}
            moves={this.props.moves}
          />
          <Token
            key={"certificate2"}
            name={"certificate2"}
            empty={this.props.tokens.certificate2 <= 0}
            playerID={this.props.playerID}
            ctx={this.props.ctx}
            moves={this.props.moves}
            black={true}
          />
          <span>
            <Money $={this.props.money} />
          </span>
        </div>
        <AuxTokens
          playerID={this.props.playerID}
          tokens={this.props.tokens}
          ctx={this.props.ctx}
          moves={this.props.moves}
        />
        <div className="player-workers">
          <div className="player-cowboys">{cowboys}</div>
          <div className="player-craftsmen">{craftsmen}</div>
          <div className="player-engineers">{engineers}</div>
        </div>
        <div className="player-hand">{hand}</div>
        <div className="player-discard">{discard}</div>
        {certificates}
      </div>
    );
  }
}

class AuxTokens extends React.Component {
  render() {
    var auxTokens = [];
    const auxTokenNames = Object.keys(this.props.tokens)
      .filter(token => token.includes("aux"))
      .forEach(token => {
        auxTokens.push(
          <span key={token + "label"}>{token.replace("aux", "")}:</span>
        );
        auxTokens.push(
          <Token
            key={token + "single"}
            name={token}
            empty={this.props.tokens[token] <= 1}
            playerID={this.props.playerID}
            ctx={this.props.ctx}
            moves={this.props.moves}
            onClick={() => {
              this.props.moves.beginAuxMove();
              this.props.moves.auxMove(AuxAction[token.replace("aux", "")]);
            }}
          />
        );
        auxTokens.push(
          <Token
            key={token + "double"}
            name={token}
            empty={this.props.tokens[token] <= 0}
            playerID={this.props.playerID}
            ctx={this.props.ctx}
            moves={this.props.moves}
            onClick={() =>
              this.props.moves.auxDoubleMove(
                AuxAction[token.replace("aux", "")]
              )
            }
          />
        );
      });
    return <div className="player-tokens">{auxTokens}</div>;
  }
}
class Token extends React.Component {
  render() {
    return (
      <div
        className={"player-token " + (this.props.black == true ? "black" : "")}
      >
        <div
          onClick={() => {
            if (this.props.empty) {
              this.props.onClick();
            } else {
              if (this.props.ctx.phase == "KansasCity") {
                this.props.moves.kansasCityChooseToken(this.props.name);
              }
            }
          }}
          className={
            this.props.empty ? "" : "player-token-" + this.props.playerID
          }
        />
      </div>
    );
  }
}
