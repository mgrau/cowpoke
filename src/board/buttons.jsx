import React from "react";

import "./css/buttons.css";

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

export class End extends React.Component {
  render() {
    return (
      <div className="button pass-button" onClick={this.props.onClick}>
        End
      </div>
    );
  }
}

export class Undo extends React.Component {
  render() {
    return (
      <div className="button undo-button" onClick={this.props.undo}>
        Undo
      </div>
    );
  }
}

export class Redo extends React.Component {
  render() {
    return (
      <div className="button redo-button" onClick={this.props.redo}>
        Redo
      </div>
    );
  }
}
