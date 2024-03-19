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
        Confirmations = []

        if (board) {
            word.split("").forEach(({ }, index) => Left.push(board.left[index]));
            word.split("").forEach(() => Confirmations.push(false));
            word.split("").forEach(({ }, index) => Right.push(board.right[index]))
        } else {
            word.split("").forEach(() => Left.push(''));
            word.split("").forEach(() => Confirmations.push(false));
            word.split("").forEach(() => Right.push(''))
        }

        word.split("").forEach(({ }, ind) => {
            let vald: string[] = [];
            word.substring(0, word.length - 2).split("").forEach(({ }, index) => {
                if (board) {
                    vald.push(board.center[ind][index]);
                } else {
                    vald.push("");
                }
                
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
            board: GameWordField,
            language: language,
            word: word
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