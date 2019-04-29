import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Teepee from "./teepee";
import Hazard from "./hazard";
import { Money, Points, Cow } from "./symbols";
import "./css/job_market.css";

export default class JobMarket extends React.PureComponent {
  foresight(foresight, index) {
    if (foresight == 1) {
      this.props.moves.kansasCity1(index);
    }
    if (foresight == 2) {
      this.props.moves.kansasCity2(index);
    }
    if (foresight == 3) {
      this.props.moves.kansasCity3(index);
    }
  }

  hire(index) {
    const numPlayers = this.props.jobMarket.numPlayers;
    const row = Math.floor(index / numPlayers);
    const col = index - row * numPlayers;

    this.props.moves.hire(row, col);
  }

  makeTile(tile) {
    if (tile == null) {
      return <div className="job-space" />;
    }
    if (tile.tile == "worker") {
      return (
        <div className={"jobtile " + tile.type}>
          <FontAwesomeIcon icon={faUser} />
        </div>
      );
    } else if (tile.tile == "teepee") {
      return <Teepee {...tile} />;
    } else if (tile.tile == "hazard") {
      return <Hazard {...tile} />;
    }
  }

  render() {
    const foresight = [
      <div key={0} onClick={() => this.foresight(1, 0)}>
        {this.makeTile(this.props.foresight.foresight1[0])}
      </div>,
      <div key={1} onClick={() => this.foresight(1, 1)}>
        {this.makeTile(this.props.foresight.foresight1[1])}
      </div>,
      <div key={2} onClick={() => this.foresight(2, 0)}>
        {this.makeTile(this.props.foresight.foresight2[0])}
      </div>,
      <div key={3} onClick={() => this.foresight(2, 1)}>
        {this.makeTile(this.props.foresight.foresight2[1])}
      </div>,
      <div key={4} onClick={() => this.foresight(3, 0)}>
        {this.makeTile(this.props.foresight.foresight3[0])}
      </div>,
      <div key={5} onClick={() => this.foresight(3, 1)}>
        {this.makeTile(this.props.foresight.foresight3[1])}
      </div>
    ];
    const market = this.props.jobMarket.market.map((worker, index) =>
      index < 12 * this.props.jobMarket.numPlayers ? (
        <div key={index} onClick={() => this.hire(index)}>
          {this.makeTile(worker)}
        </div>
      ) : (
        ""
      )
    );
    const prices = this.props.jobMarket.cost.map((cost, index) => (
      <div key={index} style={{ gridRow: index + 1 }}>
        <Money $={cost} />
      </div>
    ));

    const token =
      this.props.jobMarket.row >= 12 ? (
        ""
      ) : (
        <div
          style={{
            gridColumn: this.props.jobMarket.numPlayers,
            gridRow: this.props.jobMarket.row + 1
          }}
          id="job-market-token"
        >
          <div>
            <Points vp={2} />
          </div>
        </div>
      );

    return (
      <div id="foresight-market">
        <div id="foresight-header">
          <div
            className={
              this.props.phase == "KansasCity" &&
              !this.props.actionsPerformed.includes("kansasCity1")
                ? "active"
                : ""
            }
          >
            1
          </div>
          <div
            className={
              this.props.phase == "KansasCity" &&
              this.props.actionsPerformed.includes("kansasCity1") &&
              !this.props.actionsPerformed.includes("kansasCity2")
                ? "active"
                : ""
            }
          >
            2
          </div>
          <div
            className={
              this.props.phase == "KansasCity" &&
              this.props.actionsPerformed.includes("kansasCity2") &&
              !this.props.actionsPerformed.includes("kansasCity3")
                ? "active"
                : ""
            }
          >
            3
          </div>
        </div>
        <div id="foresight">{foresight}</div>
        <div
          id="job-market"
          style={{
            gridTemplateColumns:
              4.5 * this.props.jobMarket.numPlayers + -0.5 + "vh 2vh"
          }}
        >
          <div
            id="job-market-labor"
            style={{
              gridTemplateColumns:
                "repeat(" + this.props.jobMarket.numPlayers + ", 4vh)"
            }}
          >
            {token}
            {market}
          </div>
          <div id="job-market-prices">
            {prices}
            <div className="refillCows1">
              <Cow />
            </div>
            <div className="refillCows2">
              <Cow />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
