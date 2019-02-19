import React from "react";

export default class Tile extends React.Component {
  onClick() {
    this.props.moves.move(this.props.name);
  }
  render() {
    console.log(this.props.woods);
    return (
      <div
        className={
          "space " + (this.props.woods ? "woods " : "") + this.props.name
        }
        onClick={() => this.onClick()}
      >
        <div>
          {Object.values(this.props.G.players)
            .filter(player => player.location === this.props.name)
            .map(player => (
              <span
                className="cattleman"
                key={player.playerID}
                style={{ backgroundColor: player.color }}
              />
            ))}
        </div>
      </div>
    );
  }
}
