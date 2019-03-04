import React from "react";

import "./buttons.css";

export class Start extends React.Component {
  render() {
    return (
      <div className="button start-button" onClick={this.props.onClick}>
        Start
      </div>
    );
  }
}

export class Stop extends React.Component {
  render() {
    return (
      <div className="button stop-button" onClick={this.props.onClick}>
        Stop
      </div>
    );
  }
}

export class Pass extends React.Component {
  render() {
    return (
      <div className="button pass-button" onClick={this.props.onClick}>
        Pass
      </div>
    );
  }
}
