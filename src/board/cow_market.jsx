import React from "react";
import Card from "./card";
import { Worker, Separator, Money } from "./symbols";

import "./css/cow_market.css";

export default class CowMarket extends React.PureComponent {
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
    if (this.props.active) {
      this.setState({ buy: true, value, price, double });
    }
  }

  isActive(value, price) {
    return this.state.value == value && this.state.price == price
      ? " active"
      : "";
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
        }
        this.setState({ buy: false, secondCow: null, price: 0, value: 0 });
      }
    }
  }

  render() {
    const market = this.props.market
      .map((card, index) => ({ ...card, index }))
      .sort(cowCompare)
      .map(card => (
        <div
          key={card.index}
          onClick={() => this.buy(card.index)}
          className={card.index == this.state.secondCow ? "active" : ""}
        >
          <Card {...card} />
        </div>
      ));

    const cowboys = this.props.active
      ? Array(this.props.cowboys)
          .fill()
          .map((cowboy, index) => <Worker key={index} type="cowboy" />)
      : "";

    const active = this.props.active ? "active" : "";

    return (
      <div id="cow-market" className={active}>
        <div id="cow-market-actions">
          <div
            key="3:6"
            onClick={() => this.preBuy(3, 6)}
            className={"cow3" + this.isActive(3, 6)}
          >
            <Worker type="cowboy" />
            <Separator />
            <Money $={6} />
          </div>

          <div
            key="3:3"
            onClick={() => this.preBuy(3, 3)}
            className={"cow3" + this.isActive(3, 3)}
          >
            2<Worker type="cowboy" />
            <Separator />
            <Money $={3} />
          </div>

          <div
            key="3:5"
            onClick={() => this.preBuy(3, 5, true)}
            className={"cow3" + this.isActive(3, 5)}
          >
            3<Worker type="cowboy" />
            <Separator />
            <Money $={5} />
            <span style={{ fontSize: "75%" }}>buy 2</span>
          </div>

          <div
            key="4:12"
            onClick={() => this.preBuy(4, 12)}
            className={"cow4" + this.isActive(4, 12)}
          >
            <Worker type="cowboy" />
            <Separator />
            <Money $={12} />
          </div>

          <div
            key="4:6"
            onClick={() => this.preBuy(4, 6)}
            className={"cow4" + this.isActive(4, 6)}
          >
            3<Worker type="cowboy" />
            <Separator />
            <Money $={6} />
          </div>

          <div
            key="4:8"
            onClick={() => this.preBuy(4, 8, true)}
            className={"cow4" + this.isActive(4, 8)}
          >
            5<Worker type="cowboy" />
            <Separator />
            <Money $={8} />
            <span style={{ fontSize: "75%" }}>buy 2</span>
          </div>

          <div
            key="5:12"
            onClick={() => this.preBuy(5, 12)}
            className={"cow5" + this.isActive(5, 12)}
          >
            2<Worker type="cowboy" />
            <Separator />
            <Money $={12} />
          </div>

          <div
            key="5:6"
            onClick={() => this.preBuy(5, 6)}
            className={"cow5" + this.isActive(5, 6)}
          >
            4<Worker type="cowboy" />
            <Separator />
            <Money $={6} />
          </div>
          <div key="cowDraw" onClick={() => this.props.moves.cowDraw()}>
            <Worker type="cowboy" />
            <Separator />
            <span style={{ fontSize: "75%" }}>draw 2</span>
          </div>
        </div>
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
