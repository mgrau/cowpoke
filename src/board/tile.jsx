import React from "react";

export default class Tile extends React.Component {
  onClick() {
    this.props.moves.move(this.props.name);
  }
  render() {
    return (
      <div
        className={"space " + this.props.name}
        onClick={() => this.onClick()}
      >
        <div>
          {Object.values(this.props.G.players)
            .filter(player => player.location === this.props.name)
            .map(player => (
              <span
                class="cattleman"
                style={{ backgroundColor: player.color }}
              />
            ))}
        </div>
      </div>
    );
  }
}
