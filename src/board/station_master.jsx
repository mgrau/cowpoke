import React from "react";
import {
  Money,
  Hazard,
  Points,
  Teepee,
  Certificate,
  Worker,
  Objective
} from "./symbols";

import "./css/station_master.css";

export default class StationMaster extends React.PureComponent {
  render() {
    let upper = "";
    if (this.props.benefit == "certificate") {
      upper = (
        <div>
          <Certificate spaces={1} />
        </div>
      );
    } else if (this.props.benefit == "money") {
      upper = (
        <div>
          <Money $={2} />
        </div>
      );
    } else if (this.props.benefit == "hazardteepee") {
      upper = (
        <div>
          <Hazard />
          /
          <Teepee />
        </div>
      );
    }

    let lower = "";
    if (this.props.points == "certificates") {
      lower = (
        <div>
          <Certificate spaces={2} />

          <Points vp={3} />
        </div>
      );
    } else if (this.props.points == "teepees") {
      lower = (
        <div>
          <Teepee color="green" />
          <Teepee color="blue" />
          <Points vp={3} />
        </div>
      );
    } else if (this.props.points == "hazards") {
      lower = (
        <div>
          2 <Hazard />
          <Points vp={3} />
        </div>
      );
    } else if (this.props.points == "objectives") {
      lower = (
        <div>
          2 <Objective />
          <Points vp={3} />
        </div>
      );
    } else if (this.props.points == "workers") {
      lower = (
        <div>
          <Worker />

          <Points vp={1} />
        </div>
      );
    }

    return (
      <div
        className="station-master"
        onClick={() => {
          if (this.props.active) {
            this.props.moves.acquireStationMaster(this.props.selectedWorker);
            this.props.clearWorker();
          }
        }}
      >
        {upper}
        {lower}
      </div>
    );
  }
}
