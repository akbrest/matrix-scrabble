import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import RectanglePlayground from "../RectanglePlayground";
import { updateGame } from '../../redux/actions/gamesActions';
import { AppDispatch, RootState } from "../../redux/store";

interface GameBoardInterface {
    word: string;
    language: string;
    id: string;
    board: any
};

var Left: string[] = [];
var Right: string[] = [];
var Confirmations: boolean[] = [];
var GameWordField: string[][] = [];

const GameBoard: React.FC<GameBoardInterface> = ({ word, language, id, board}) => {
    const dispatch = useDispatch<AppDispatch>();

    console.log('rerender')

    useEffect(() => {
        console.log('only 1 time??')

        Left = [];
        Right = [];
        GameWordField = [];
        console.log(board.center)
        if (board) {
            word.split("").forEach((val, index) => Left.push(board.left[index]));
            word.split("").forEach((index) => Confirmations.push(false));
            word.split("").forEach((val, index) => Right.push(board.right[index]))
        } else {
            word.split("").forEach((val, index) => Left.push(''));
            word.split("").forEach((index) => Confirmations.push(false));
            word.split("").forEach((val, index) => Right.push(''))
        }

        console.log(Left)
        console.log(Right)
        console.log('ddd')

        word.split("").forEach((vala, ind) => {
            let vald: string[] = [];
            word.substring(0, word.length - 2).split("").forEach((value, index) => {
                var i = board.center[ind][index];

                vald.push(i);
            });

            GameWordField.push(vald);
        });
    }, []);

    var currentGame = useSelector((state: RootState) =>
        state.games.currentGame
    );

    function UpdateField(x: number, y: number, type: string, value: string) {


        if (type == "left" || type == "right") {
            if (type == "left") {
                Left[x] = value;
            }
            else if (type == "right") {
                Right[x] = value
            }
        } else {
            GameWordField[x][y] = value;
        }

        const gameBoard = {
            id: id,
            left: Left,
            right: Right,
            board: GameWordField
        };

        dispatch(updateGame(gameBoard));

    };

    if (currentGame != undefined) {
        var item = currentGame.details;
        if (item !== undefined) {
            if (item.confirmations != undefined) {
                Confirmations = item.confirmations;
            }
        }
    }

    return (
        <div className="game-field">
            <div className="board-field">
                <RectanglePlayground board={board} confirmation={Confirmations} language={language} UpdateField={UpdateField} word={word} />
            </div>
        </div>
    );
};

export default GameBoard;