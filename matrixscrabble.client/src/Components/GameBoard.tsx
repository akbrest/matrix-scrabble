import React from "react";
import RectanglePlayground from "./RectanglePlayground";
import FieldGenerator from "../Services/FieldGenerator";
import GameService from "../Services/GameService";
import { connect } from "react-redux";
import { CreateGame, UpdateGame, ConfirmGame, Test, CloseModal } from "../Store/Game/reducers/services";
import { FaBeer } from 'react-icons/fa';
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";

class GameBoard extends React.Component<any, any> {
    Word: string = "";
    GameWordField: string[][] = [];
    Left: string[] = [];
    Right: string[] = [];
    ñonfirmations: boolean[] = [true, false, true, false];
    Language: string = "";
    Show: boolean = false;
    Field: FieldGenerator = new FieldGenerator();
    GameService: GameService = new GameService();

    GameBoard() {
    }

    HandleClose = () => {
        this.props.CloseModal();
    }

    HandleShow = () => {
        this.props.Test();
    }

    UpdateField = (x: number, y: number, type: string, value: string) => {
      
        if (type == "left" || type == "right") {
            if (type == "left") {
                this.Left[x] = value;
            }
            else if (type == "right") {
                this.Right[x] = value
            }
        } else {
            this.GameWordField[x][y] = value;
        }
        
        this.props.UpdateGame(this.props.id, this.Left, this.Right, this.GameWordField);
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
        this.props.CreateGame(word, "ru");
        this.InitialField();
    };

    ConfirmGame = () => {
        this.props.ConfirmGame(this.props.id, this.Left, this.Right, this.GameWordField);
    };

    render() {
        var word = this.Word;
        var loading = this.props.loading;
        var id = this.props.id;
        var index = -1;
        var show = this.props.show;
        var confirmations = this.props.confirmations;
      
        if (loading) {
            return (<div>loading..<FaBeer /></div>);
        }

        else {
            if (!id) {
                return (
                <div>
                    <button onClick={() => this.StartGame(3)}>3 Letters</button>
                    <button onClick={() => this.StartGame(4)}>4 Letters</button>
                    <button onClick={() => this.StartGame(5)}>5 Letters</button>
                    <button onClick={() => this.StartGame(6)}>6 Letters</button>
                    <button onClick={() => this.StartGame(7)}>7 Letters</button>
                    </div>
                )
            } else {
                return (
                    <div className="game-field">

                        <div className="board-field">
                            <div>
                                <RectanglePlayground confirmation={confirmations} language={"ru"} UpdateField={this.UpdateField} word={word} />
                            </div>
                            <button onClick={() => this.ConfirmGame()} type="submit" className="ml-20">
                                Confirm
                            </button>
                        </div>
                  

                     <Button variant="primary" onClick={this.HandleShow}>
                        Launch static backdrop modal
                      </Button>

                        <Modal show={show} onHide={this.HandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirming Game</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="modal-container">
                                    <div>
                                        {   
                                            Object.keys(this.GameWordField).map(keyOuter => {
                                                index++;
                                                return <div className="modal-field-line">
                                                    <div className="modal-field">{word[index]}</div>



                                                    {Object.keys(this.GameWordField[keyOuter]).map(keyInner => {
                                                        return (
                                                            <div className="modal-field" key={`${keyInner}-${keyOuter}`}>{this.GameWordField[keyOuter][keyInner]}</div>
                                                        );

                                                    })}
                                                    <div className="modal-field">{word[index]}</div>
                                                </div>
                                            })

                                        }
                                    </div>

                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.HandleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={this.HandleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                );
            }
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.gameReducer.loading,
        data: state.gameReducer.data,
        error: state.gameReducer.error,
        id: state.gameReducer.id,
        language: state.gameReducer.language,
        confirmations: state.gameReducer.confirmations,
        show: state.gameReducer.show
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        CreateGame: (word: string, language:string) => dispatch(CreateGame(word, language)),
        UpdateGame: (id: string, left: [], right: [], board: []) => dispatch(UpdateGame(id, left, right, board)),
        ConfirmGame: (id: string, left: [], right: [], board: []) => dispatch(ConfirmGame(id, left, right, board)),
        Test: () => dispatch(Test()),
        CloseModal: () => dispatch(CloseModal()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
