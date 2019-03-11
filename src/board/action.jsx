import React from "react";

import {
  Separator,
  Or,
  Card,
  Money,
  Worker,
  Building,
  Train,
  Certificate,
  Objective,
  Auxillary,
  Teepee,
  Cow,
  Hazard,
  Pair
} from "./symbols";

import "./action.css";

export default class Action extends React.Component {
  render() {
    const active =
      this.props.ctx.allowedMoves.includes(this.props.action) &&
      !this.props.G.actionsPerformed.includes(this.props.action)
        ? "active"
        : "";
    const content = get_content(this.props.action, this.props.moves);
    return (
      <div
        className={"action " + active + " " + this.props.action}
        onClick={() => {
          console.log(this.props.action);
          this.props.moves[this.props.action]();
        }}
      >
        {content}
      </div>
    );
  }
}

function get_content(action, moves) {
  if (action === "neutralA1") {
    return (
      <div>
        <Card cow="Guernsey" />
        <Money $={2} />
      </div>
    );
  } else if (action === "neutralA2") {
    return (
      <div>
        <Worker />
        <Money $={0} />
      </div>
    );
  } else if (action === "neutralA3") {
    return (
      <div>
        <Worker />
        <Money $={-2} />
      </div>
    );
  } else if (action === "neutralB1") {
    return (
      <div>
        <Card cow="DutchBelt" />
        <Money $={2} />
      </div>
    );
  } else if (action === "neutralB2") {
    return (
      <div>
        <Building />
        <div className="row">
          <Worker type="craftsman" />
          <Separator />
          <Money $={-2} />
        </div>
      </div>
    );
  } else if (action === "neutralC1") {
    return (
      <div>
        <div onClick={() => moves["neutralC1"](true)}>
          <Certificate spaces={1} />
        </div>

        <Or />
        <div onClick={() => moves["neutralC1"](false)}>
          <Objective />
        </div>
      </div>
    );
  } else if (action === "neutralC2") {
    return (
      <div>
        <div className="row">
          <Worker type="engineer" />
          <Separator />
        </div>
        <Train spaces={1} />
      </div>
    );
  } else if (action === "neutralD1") {
    return (
      <div>
        <div onClick={() => moves["neutralD1"](true)}>
          <Teepee />
        </div>

        <Or />
        <div onClick={() => moves["neutralD1"](false)}>
          <div className="row">
            <span style={{ marginRight: "-0.35vh" }}>
              <Money $={-2} />
            </span>
            <Train spaces={2} />
          </div>
        </div>
      </div>
    );
  } else if (action === "neutralD2") {
    return (
      <div>
        <Auxillary />
      </div>
    );
  } else if (action === "neutralE1") {
    return (
      <div>
        <Card cow="BlackAngus" />
        <Money $={2} />
      </div>
    );
  } else if (action === "neutralE2") {
    return (
      <div>
        <Cow />
      </div>
    );
  } else if (action === "neutralF1") {
    return (
      <div>
        <Pair />
        <Money $={4} />
      </div>
    );
  } else if (action === "neutralF2") {
    return (
      <div>
        <Hazard />
        <Money $={-7} />
      </div>
    );
  } else if (action === "neutralG1") {
    return (
      <div>
        <div className="row">
          <Worker type="engineer" />
          <Separator />
        </div>
        <Train spaces={1} />
      </div>
    );
  } else if (action === "neutralG2") {
    return (
      <div>
        <Auxillary />
      </div>
    );
  } else {
    return "";
  }
}
