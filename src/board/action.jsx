import React from "react";

import {
  Separator,
  Or,
  And,
  Card,
  Money,
  Cattleman,
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

import "./css/action.css";

export default class Action extends React.PureComponent {
  render() {
    const action = this.props.building + this.props.index;
    let active = false;
    let actionOr = false;

    if (this.props.active && !this.props.actionsPerformed.includes(action)) {
      active = true;
    }

    if (
      action == "neutralC0" ||
      action == "neutralD0" ||
      action == "private8a0"
    ) {
      actionOr = true;
    }
    const content = get_content(action, this.props.moves);
    return (
      <div
        className={
          "action " +
          (active ? "active " : " ") +
          (actionOr ? "actionOr " : " ")
        }
        onClick={() => {
          if (active && !actionOr) {
            this.props.moves.buildingMove(this.props.index);
          }
        }}
      >
        {content}
      </div>
    );
  }
}

function get_content(action, moves) {
  if (action === "neutralA0") {
    return (
      <div>
        <Card cow="Guernsey" />
        <Money $={2} />
      </div>
    );
  } else if (action === "neutralA1") {
    return (
      <div>
        <Worker />
        <Money $={0} />
      </div>
    );
  } else if (action === "neutralA2") {
    return (
      <div>
        <Worker />
        <Money $={-2} />
      </div>
    );
  } else if (action === "neutralB0") {
    return (
      <div>
        <Card cow="DutchBelt" />
        <Money $={2} />
      </div>
    );
  } else if (action === "neutralB1") {
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
  } else if (action === "neutralC0") {
    return (
      <div>
        <div onClick={() => moves["buildingMove"]("0a")} className="subAction">
          <Certificate spaces={1} />
        </div>

        <Or />
        <div onClick={() => moves["buildingMove"]("0b")} className="subAction">
          <Objective />
        </div>
      </div>
    );
  } else if (action === "neutralC1") {
    return (
      <div>
        <div className="row">
          <Worker type="engineer" />
          <Separator />
        </div>
        <Train spaces={1} />
      </div>
    );
  } else if (action === "neutralD0") {
    return (
      <div>
        <div onClick={() => moves["buildingMove"]("0a")} className="subAction">
          <Teepee />
        </div>

        <Or />
        <div onClick={() => moves["buildingMove"]("0b")} className="subAction">
          <div className="row" style={{ fontSize: "75%" }}>
            <span style={{ marginRight: "-0.35vh" }}>
              <Money $={-2} />
            </span>
            <Train spaces={2} />
          </div>
        </div>
      </div>
    );
  } else if (action === "neutralD1") {
    return (
      <div>
        <Auxillary />
      </div>
    );
  } else if (action === "neutralE0") {
    return (
      <div>
        <Card cow="BlackAngus" />
        <Money $={2} />
      </div>
    );
  } else if (action === "neutralE1") {
    return (
      <div>
        <Cow />
      </div>
    );
  } else if (action === "neutralF0") {
    return (
      <div>
        <Pair />
        <Money $={4} />
      </div>
    );
  } else if (action === "neutralF1") {
    return (
      <div>
        <Hazard />
        <Money $={-7} />
      </div>
    );
  } else if (action === "neutralG0") {
    return (
      <div>
        <div className="row">
          <Worker type="engineer" />
          <Separator />
        </div>
        <Train spaces={1} />
      </div>
    );
  } else if (action === "neutralG1") {
    return (
      <div>
        <Auxillary />
      </div>
    );
  } else if (action === "private1a0") {
    return (
      <div>
        <div className="row">
          <Building woods={true} />
          <Separator />
          <Money $={2} />
        </div>
      </div>
    );
  } else if (action === "private2a0") {
    return (
      <div>
        <Card cow="Guernsey" />
        <Money $={4} />
      </div>
    );
  } else if (action === "private2a1") {
    return (
      <div>
        <Cow />
      </div>
    );
  } else if (action === "private3a0") {
    return (
      <div>
        <Pair />
        <Money $={3} />
      </div>
    );
  } else if (action === "private3a1") {
    return (
      <div>
        <Cattleman spaces={1} />
      </div>
    );
  } else if (action === "private4a0") {
    return (
      <div>
        <Hazard />
        <Money $={-5} />
      </div>
    );
  } else if (action === "private4a1") {
    return (
      <div>
        <Cattleman spaces={2} />
      </div>
    );
  } else if (action === "private5a0") {
    return (
      <div>
        <Worker />
        <Money $={1} />
      </div>
    );
  } else if (action === "private5a1") {
    return (
      <div>
        <div className="row">
          <Worker type="engineer" />
          <Separator />
        </div>
        <Train spaces={1} />
      </div>
    );
  } else if (action === "private6a0") {
    return (
      <div>
        <Card cow="Holstein" />
        <Money $={10} />
      </div>
    );
  } else if (action === "private6a1") {
    return (
      <div>
        <Auxillary />
      </div>
    );
  } else if (action === "private7a0") {
    return (
      <div>
        <div className="row">
          <Teepee color="green" />
          <And />
          <Teepee color="blue" />
        </div>
        <div className="row">
          <Separator />
          <Certificate spaces={2} />
          <And />
          <Money $={2} />
        </div>
      </div>
    );
  } else if (action === "private8a0") {
    return (
      <div>
        <div onClick={() => moves["buildingMove"]("0a")} className="subAction">
          <Teepee />
        </div>

        <Or />
        <div onClick={() => moves["buildingMove"]("0b")} className="subAction">
          <Auxillary />
        </div>
      </div>
    );
  } else if (action === "private8a1") {
    return (
      <div>
        <Train spaces={2} />
      </div>
    );
  } else if (action === "private9a0") {
    return (
      <div>
        <Train spaces={3} />
      </div>
    );
  } else if (action === "private9a1") {
    return (
      <div>
        <Train spaces={"-X"} />
        <div style={{ fontSize: "50%", color: "black" }}>deliver X</div>
      </div>
    );
  } else if (action === "private10a0") {
    return (
      <div style={{ fontSize: "150%" }}>
        <Certificate spaces={"6"} />
      </div>
    );
  } else if (action === "private10a1") {
    return (
      <div>
        <Cattleman spaces={5} />
      </div>
    );
  } else {
    return "";
  }
}
