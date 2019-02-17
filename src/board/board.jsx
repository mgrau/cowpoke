import React from "react";

export default class CowpokeBoard extends React.Component {
  onClick(name) {
    this.props.moves.move(name);
    // this.props.moves.clickCell(id);
    // this.props.events.endTurn();
  }

  isActive(id) {
    if (!this.props.isActive) return false;
    if (this.props.G.cells[id] !== null) return false;
    return true;
  }

  render() {
    let winner = "";
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner : {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    const cellStyle = {
      border: "1px solid #555",
      width: "50px",
      height: "50px",
      lineHeight: "50px",
      textAlign: "center"
    };

    let tbody = [];

    for (let i = 0; i < 7; i++) {
      let cells = [];
      for (let j = 0; j < 7; j++) {
        const index = 48 - (j + 7 * i);
        const cellName = this.props.G.trail.trail[index].name;
        const players = Object.values(this.props.G.players)
          .filter(player => player.location == cellName)
          .map(player => "P" + player.playerID);
        cells.push(
          <td
            style={cellStyle}
            key={index}
            onClick={() => this.onClick(cellName)}
          >
            <div>{cellName}</div>
            <div>{players}</div>
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    );
  }
}
