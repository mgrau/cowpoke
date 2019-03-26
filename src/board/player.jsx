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
          <span>Player {this.props.playerID}</span>
          <span>
            <Money $={this.props.money} />
          </span>
          <span>
            <Certificate spaces={this.props.certificates} />
          </span>
          /{max_certificates}
        </div>
        <Tokens
          playerID={this.props.playerID}
          tokens={this.props.tokens}
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

class Tokens extends React.Component {
  render() {
    return (
      <div className="player-tokens">
        <span>Money:</span>
        <Token
          empty={true}
          playerID={this.props.playerID}
          onClick={() => {
            this.props.moves.beginAuxMove();
            this.props.moves.auxMove(AuxAction.MONEY);
          }}
        />
        <Token
          empty={this.props.tokens.auxMoney <= 0}
          playerID={this.props.playerID}
          onClick={() => this.props.moves.auxDoubleMove(AuxAction.MONEY)}
        />
        <span>Cycle:</span>
        <Token
          empty={true}
          playerID={this.props.playerID}
          onClick={() => {
            this.props.moves.beginAuxMove();
            this.props.moves.auxMove(AuxAction.CYCLE);
          }}
        />
        <Token
          empty={this.props.tokens.auxCycle <= 0}
          playerID={this.props.playerID}
          onClick={() => this.props.moves.auxDoubleMove(AuxAction.CYCLE)}
        />
        <span>Cert-:</span>
        <Token
          empty={this.props.tokens.auxCertificate <= 1}
          playerID={this.props.playerID}
          onClick={() => {
            this.props.moves.beginAuxMove();
            this.props.moves.auxMove(AuxAction.CERTIFICATE);
          }}
        />
        <Token
          empty={this.props.tokens.auxCertificate <= 0}
          playerID={this.props.playerID}
          onClick={() => this.props.moves.auxDoubleMove(AuxAction.CERTIFICATE)}
        />
        <span>Engine:</span>
        <Token
          empty={this.props.tokens.auxEngine <= 1}
          playerID={this.props.playerID}
          onClick={() => {
            this.props.moves.beginAuxMove();
            this.props.moves.auxMove(AuxAction.ENGINE);
          }}
        />
        <Token
          empty={this.props.tokens.auxEngine <= 0}
          playerID={this.props.playerID}
          onClick={() => this.props.moves.auxDoubleMove(AuxAction.ENGINE)}
        />
        <span>Trash:</span>
        <Token
          empty={this.props.tokens.auxTrash <= 1}
          playerID={this.props.playerID}
          onClick={() => {
            this.props.moves.beginAuxMove();
            this.props.moves.auxMove(AuxAction.TRASH);
          }}
        />
        <Token
          empty={this.props.tokens.auxTrash <= 0}
          playerID={this.props.playerID}
          onClick={() => this.props.moves.auxDoubleMove(AuxAction.TRASH)}
        />
      </div>
    );
  }
}
class Token extends React.Component {
  render() {
    return (
      <div className="player-token">
        <div
          onClick={() => {
            if (this.props.empty) {
              this.props.onClick();
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
