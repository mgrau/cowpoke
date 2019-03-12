import React from "react";
import Card from "./card";

import "./cow_market.css";

export default class CowMarket extends React.Component {
  render() {
    const actions = [
      <div key="cowDraw" onClick={() => this.props.moves.cowDraw()}>
        cowDraw
      </div>
    ];
    const market = this.props.G.cowMarket
      .sort(cowCompare)
      .map((card, index) => (
        //   (<Card key={index} {...card} />
        <div key={index}> {card.name}</div>
      ));
    return (
      <div id="cow-market">
        <div id="cow-market-actions">{actions}</div>
        <div id="cow-market-cows">{market}</div>
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
