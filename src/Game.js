import React from "react";
import { Colors } from "./Colors";
import { Solution } from "./Solution";
import { Board } from "./Board";

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.activateColor = this.activateColor.bind(this);
    this.setColor = this.setColor.bind(this);
    this.checkRow = this.checkRow.bind(this);
    this.newGame = this.newGame.bind(this);

    const colors = ["red", "green", "blue", "orange", "purple"];
    const trueRow = [];
    for (let i = 0; i < 4; i++) {
      trueRow.push(colors[Math.floor(Math.random() * 4) + 1]);
    }

    this.state = {
      colors: colors,
      activeColor: "red",
      previousRows: [],
      previousHints: [],
      currentRow: ["", "", "", ""],
      hints: [0, 0, 0, 0],
      activeRow: 0,
      totalRows: 10,
      trueRow: trueRow,
      canCheck: false, //this checks if it's ok to eval currentRow
      victory: false,
      defeat: false,
    };
  }

  activateColor(color) {
    this.setState({
      activeColor: color,
    });
  }

  setColor(color, id) {
    if (this.state.victory) {
      return false;
    }
    const rowId = +id.substr(1, id.indexOf("-") - 1);
    const pegId = +id.substr(id.indexOf("-") + 1);
    let currentRow = this.state.currentRow;
    let isArrayFull = 0;

    if (this.state.activeRow === rowId && color) {
      currentRow[pegId] = color;
      this.setState({
        currentRow: currentRow,
      });

      /* Checking if currentRow is Full */
      for (let i in currentRow) {
        if (currentRow[i].length > 0) {
          isArrayFull++;
        }
      }
      if (isArrayFull >= currentRow.length) {
        this.setState({ canCheck: true });
      } else {
        this.setState({ canCheck: false });
      }
    }
  }

  checkRow() {
    const currentRow = JSON.parse(JSON.stringify(this.state.currentRow));
    const trueRow = JSON.parse(JSON.stringify(this.state.trueRow));
    const hints = this.state.hints;
    const previousHints = this.state.previousHints;
    const previousRows = this.state.previousRows;

    /* Checking extact matches */
    for (let i = 0; i < 4; i++) {
      if (currentRow[i] === trueRow[i]) {
        hints[i] = 2;
        delete currentRow[i];
        delete trueRow[i];
      }
    }

    /* Checking partial matches */
    for (let i in currentRow) {
      for (let j in trueRow) {
        if (currentRow[i] === trueRow[j]) {
          hints[i] = 1;
          delete currentRow[i];
          delete trueRow[j];
        }
      }
    }

    hints.sort((a, b) => b - a);

    /* checking if player won */
    let victory = true;
    for (let i in hints) {
      if (hints[i] < 2) {
        victory = false;
        break;
      }
    }

    /* checking if player lost */
    let defeat = this.state.defeat;
    if (this.state.activeRow >= this.state.totalRows - 1) {
      defeat = true;
    }

    /* updating board */
    previousHints.push(hints);
    previousRows.push(this.state.currentRow);

    this.setState({
      hints: [0, 0, 0, 0],
      activeRow: this.state.activeRow + 1,
      previousHints: previousHints,
      currentRow: ["", "", "", ""],
      previousRows: previousRows,
      canCheck: false,
      victory: victory,
      defeat: defeat,
    });
  }

  newGame() {
    const trueRow = [];
    for (let i = 0; i < 4; i++) {
      trueRow.push(this.state.colors[Math.floor(Math.random() * 4) + 1]);
    }

    console.log("new Game");
    this.setState({
      activeRow: 0,
      previousRows: [],
      previousHints: [],
      currentRow: ["", "", "", ""],
      hints: [0, 0, 0, 0],
      trueRow: trueRow,
      canCheck: false,
      victory: false,
      defeat: false,
    });
  }

  render() {
    let msg = this.state.victory
      ? "You Win!!"
      : this.state.defeat
      ? "You Lost :("
      : "";
    return (
      <div className="game-container">
        <Colors
          list={this.state.colors}
          activeColor={this.state.activeColor}
          action={this.activateColor}
        />

        <Board
          state={this.state}
          pegAction={this.setColor}
          checkAction={this.checkRow}
        />

        <p className="msg"> {msg} </p>
        <Solution state={this.state} newGame={this.newGame} />
      </div>
    );
  }
}
