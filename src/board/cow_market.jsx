import React from "react";
import Card from "./card";
import { Worker } from "./symbols";

import "./cow_market.css";

export default class CowMarket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buy: false,
      value: 0,
      price: 0,
      double: false,
      secondCow: null
    };
  }

  preBuy(value, price, double = false) {
    this.setState({ buy: true, value, price, double });
  }

  buy(index) {
    if (this.state.buy) {
      if (this.state.double) {
        this.setState({ double: false, secondCow: index });
      } else {
        if (this.state.secondCow == null) {
          this.props.moves.cowBuy(this.state.value, this.state.price, index);
        } else {
          this.props.moves.cowBuy(this.state.value, this.state.price, [
            index,
            this.state.secondCow
          ]);
          this.setState({ secondCow: null });
        }
        this.setState({ buy: false });
      }
    }
  }

  render() {
    let actions = [
      <div key="cowDraw" onClick={() => this.props.moves.cowDraw()}>
        cowDraw
      </div>,
      <div key="3:6" onClick={() => this.preBuy(3, 6)}>
        3:6
      </div>,
      <div key="3:3" onClick={() => this.preBuy(3, 3)}>
        3:3
      </div>,
      <div key="3:5" onClick={() => this.preBuy(3, 5, true)}>
        3:5
      </div>,
      <div key="4:12" onClick={() => this.preBuy(4, 12)}>
        4:12
      </div>,
      <div key="4:6" onClick={() => this.preBuy(4, 6)}>
        4:6
      </div>,
      <div key="4:8" onClick={() => this.preBuy(4, 8, true)}>
        4:8
      </div>,
      <div key="5:12" onClick={() => this.preBuy(5, 12)}>
        5:12
      </div>,
      <div key="5:6" onClick={() => this.preBuy(5, 6)}>
        5:6
      </div>
    ];
    if (this.props.ctx.phase === "CowPhase") {
      actions.push(<div onClick={() => this.props.moves.cowPass()}>Done</div>);
    }
    const market = this.props.G.cowMarket
      .sort(cowCompare)
      .map((card, index) => (
        <span key={index} onClick={() => this.buy(index)}>
          <Card {...card} />
        </span>
      ));

    const cowboys =
      this.props.ctx.phase === "CowPhase"
        ? Array(this.props.G.availableCowboys)
            .fill()
            .map((cowboy, index) => <Worker key={index} type="cowboy" />)
        : "";
    return (
      <div id="cow-market">
        <div id="cow-market-actions">{actions}</div>
        <div id="cow-market-cows">{market}</div>
        <div id="cow-market-cowboys">{cowboys}</div>
      </div>
    );
  }
}

function cowCompare(cow1, cow2) {
  if (cow1.value > cow2.value) {
    return 1;
  } else if (cow1.value < cow2.value) {
    return -1;
  }

  if (cow1.points > cow2.points) {
    return 1;
  } else if (cow1.points < cow2.points) {
    return -1;
  }
  return 0;
}
