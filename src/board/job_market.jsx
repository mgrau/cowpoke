import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./job_market.css";

export default class JobMarket extends React.Component {
  hire(index) {
    const numPlayers = this.props.G.jobMarket.numPlayers;
    const row = Math.floor(index / numPlayers);
    const col = index - row * numPlayers;

    this.props.moves.hire(row, col);
  }
  render() {
    const market = this.props.G.jobMarket.market.map((worker, index) => {
      if (worker == null) {
        return <div key={index} className="job-space" />;
      } else {
        return (
          <div
            key={index}
            className={worker.type}
            onClick={() => this.hire(index)}
          >
            <FontAwesomeIcon icon={faUser} />
          </div>
        );
      }
    });
    return <div id="labor">{market}</div>;
  }
}
