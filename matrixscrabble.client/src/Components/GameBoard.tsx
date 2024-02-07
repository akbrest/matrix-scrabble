import React from "react";
import RectanglePlayground from "./RectanglePlayground";
import FieldGenerator from "../Services/FieldGenerator";
import GameService from "../Services/GameService";
import { connect } from "react-redux";
import { CreateGame, UpdateGame, ConfirmGame } from "../Store/Game/reducers/services";

class GameBoard extends React.Component<any, any> {
    Word: string = "";
    GameWordField: string[][] = [];
    Left: string[] = [];
    Right: string[] = [];

    Field: FieldGenerator = new FieldGenerator();
    GameService: GameService = new GameService();

    UpdateField = (x: number, y: number, type: string, value: string) => {

        if (type == "left" || type == "right") {
            console.log("left or right part");

            if (type == "left")
                this.Left[x] = value;
            else (type == "right")
                this.Right[x] = value
        } else {
            this.GameWordField[x][y] = value;
        }
    };

    InitialField() {

        var counter = 0;
        var count = this.Word ? this.Word.length : 0;

        while (counter < count) {
            this.Right.push("");
            this.Left.push("")

            counter++;
        }

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
    };

    ConfirmGame = () => {
        this.props.ConfirmGame("65bfde72be020dfc9fbbdfc0", this.Left, this.Right, this.GameWordField);
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
                    <button onClick={() => this.ConfirmGame()} type="submit" className="ml-20">
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
        id: state.gameReducer.id
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        CreateGame: () => dispatch(CreateGame("test")),
        UpdateGame: () => dispatch(UpdateGame()),
        ConfirmGame: (id: string, left: [], right: [], board: []) => dispatch(ConfirmGame(id, left, right, board)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
