import React from "react";

export default class CowpokeBoard extends React.Component {
  onClick(name) {
    this.props.moves.move(name);
    // this.props.moves.clickCell(id);
    // this.props.events.endTurn();
  }

  render() {
    const cellStyle = {
      border: "1px solid #555",
      width: "50px",
      height: "50px",
      lineHeight: "50px",
      textAlign: "center"
    };

    let tbody = [];
    const trail = this.props.G.trail.trail;
    for (let i = 0; i < 7; i++) {
      let cells = [];
      for (let j = 0; j < 7; j++) {
        const index = 48 - (j + 7 * i);
        const cellName = trail[index].name;
        const tileName = trail[index].tile.name;
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
            <div>{tileName}</div>
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
        <div>Remaining moves: {this.props.G.movesRemaining}</div>
        <div
          style={{ border: "1px solid", width: "50px", height: "50px" }}
          onClick={() => this.props.events.endPhase()}
        >
          End Phase
        </div>
      </div>
    );
  }
}
