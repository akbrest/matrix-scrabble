import React from "react";
import RectanglePlayground from "./RectanglePlayground";
import FieldGenerator from "../Services/FieldGenerator";
import GameService from "../Services/GameService";

export interface Props {
}

type State = {
  GameWord: string;
};

class GameBoard extends React.Component<Props, State> {
    Word: string = "";
    GameWordField: String[][] = [];

    Field: FieldGenerator = new FieldGenerator();
    GameService: GameService = new GameService();

  UpdateField = (x: number, y: number, value: string) => {
    this.GameWordField[x][y] = value;
      console.log(JSON.stringify({ main: this.GameWordField }));
      this.GameService.ConfirmGame(this.GameWordField);
  };

  InitialField() {
    var count = this.Word ? this.Word.length : 0;

    const col: string[][] = [];
    var i = 0;
    var j = 0;

    while (j < count) {
      i = 0;
      var row: string[] = [];
      while (i < count - 2) {
        row.push("");
        i++;
      }

      col.push(row);
      j++;
    }

    this.GameWordField = col;
  }

  StartGame = (count: number) => {
    var word = this.Field.GetRandomWord(count);
    this.Word = word;

    this.InitialField();
    this.setState({ GameWord: this.Word });
  };

  render() {
    var word = this.Word;
    return (
      <div className="game-field">
        <div>
          <button onClick={() => this.StartGame(3)}>3 Letters</button>
          <button onClick={() => this.StartGame(4)}>4 Letters</button>
          <button onClick={() => this.StartGame(5)}>5 Letters</button>
          <button onClick={() => this.StartGame(6)}>6 Letters</button>
          <button onClick={() => this.StartGame(7)}>7 Letters</button>
        </div>
        <div>
          <RectanglePlayground UpdateField={this.UpdateField} Word={word} />
        </div>
      </div>
    );
  }
}

export default GameBoard;