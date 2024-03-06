import {  GameDetails } from "../slices/gamesSlice";
import { GameBoardModel } from "./GameBoardModel";

export interface Game {
    id: string;
    word: string;
    isCompleted?: boolean;
    language: string;
    gameBoard?: GameBoardModel;
    details?: GameDetails;
}