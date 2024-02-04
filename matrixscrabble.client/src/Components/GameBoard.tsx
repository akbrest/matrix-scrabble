import React from "react";
import RectanglePlayground from "./RectanglePlayground";
import FieldGenerator from "../Services/FieldGenerator";
import GameService from "../Services/GameService";
import { connect } from "react-redux";
import { CreateGame } from "../Store/Game/reducers/services";

interface State {}

interface OwnProps {}

interface DispatchProps {
  CreateGame: (word: string) => void;
}

type Props = OwnProps & DispatchProps;

class GameBoard extends React.Component<Props, State> {
  Word: string = "";
  GameWordField: string[][] = [];

  Field: FieldGenerator = new FieldGenerator();
  GameService: GameService = new GameService();

  UpdateField = (x: number, y: number, type: string, value: string) => {
    if (type == "left" || type == "right") {
      console.log("left or right part");
    }

    this.GameWordField[x][y] = value;
    console.log(JSON.stringify({ main: this.GameWordField }));
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
    this.props.CreateGame(word);
    this.InitialField();

    //this.setState({ GameWord: this.Word });
  };

  render() {
    var word = this.Word;
    return (
      <div className="game-field">
        <div className="board-field">
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
          <button type="submit" className="ml-20">
            Confirm
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.gameReducer.loading,
    data: state.gameReducer.data,
    error: state.gameReducer.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    CreateGame: () => dispatch(CreateGame()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
