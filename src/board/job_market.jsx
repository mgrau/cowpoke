import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Teepee from "./teepee";
import Hazard from "./hazard";
import { Money, Points } from "./symbols";
import "./css/job_market.css";

export default class JobMarket extends React.Component {
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
    const numPlayers = this.props.G.jobMarket.numPlayers;
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
      return <Teepee {...tile} ctx={this.props.ctx} />;
    } else if (tile.tile == "hazard") {
      return <Hazard {...tile} ctx={this.props.ctx} />;
    }
  }

  render() {
    const foresight = [
      <div key={0} onClick={() => this.foresight(1, 0)}>
        {this.makeTile(this.props.G.foresight.foresight1[0])}
      </div>,
      <div key={1} onClick={() => this.foresight(1, 1)}>
        {this.makeTile(this.props.G.foresight.foresight1[1])}
      </div>,
      <div key={2} onClick={() => this.foresight(2, 0)}>
        {this.makeTile(this.props.G.foresight.foresight2[0])}
      </div>,
      <div key={3} onClick={() => this.foresight(2, 1)}>
        {this.makeTile(this.props.G.foresight.foresight2[1])}
      </div>,
      <div key={4} onClick={() => this.foresight(3, 0)}>
        {this.makeTile(this.props.G.foresight.foresight3[0])}
      </div>,
      <div key={5} onClick={() => this.foresight(3, 1)}>
        {this.makeTile(this.props.G.foresight.foresight3[1])}
      </div>
    ];
    const market = this.props.G.jobMarket.market.map((worker, index) =>
      index < 12 * this.props.G.jobMarket.numPlayers ? (
        <div key={index} onClick={() => this.hire(index)}>
          {this.makeTile(worker)}
        </div>
      ) : (
        ""
      )
    );
    const prices = this.props.G.jobMarket.cost.map((cost, index) => (
      <Money key={index} $={cost} />
    ));

    const token =
      this.props.G.jobMarket.row >= 12 ? (
        ""
      ) : (
        <div
          style={{
            gridColumn: this.props.G.jobMarket.numPlayers,
            gridRow: this.props.G.jobMarket.row + 1
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
        <div id="foresight">{foresight}</div>
        <div
          id="job-market"
          style={{
            gridTemplateColumns:
              4.5 * this.props.ctx.numPlayers + -0.5 + "vh 2vh"
          }}
        >
          <div
            id="job-market-labor"
            style={{
              gridTemplateColumns:
                "repeat(" + this.props.ctx.numPlayers + ", 4vh)"
            }}
          >
            {token}
            {market}
          </div>
          <div id="job-market-prices">{prices}</div>
        </div>
      </div>
    );
  }
}
