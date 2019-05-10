import React from "react";

import "./css/objectives.css";

export default class Objectives extends React.Component {
  render() {
    const objectives = this.props.objectives.map((objective, index) => (
      <Objective
        key={index}
        index={index}
        {...objective}
        moves={this.props.moves}
      />
    ));
    return <div id="objectives">{objectives}</div>;
  }
}

class Objective extends React.PureComponent {
  render() {
    const requirements = this.props.requirements.map((requirement, index) => (
      <div key={index}>{requirement}</div>
    ));
    return (
      <div
        className="objective"
        onClick={() => this.props.moves.gainObjective(this.props.index)}
      >
        <div>{this.props.action}</div>
        <div className="requirements">{requirements}</div>
        <div>{this.props.points}</div>
        <div>{this.props.penalty}</div>
      </div>
    );
  }
}
