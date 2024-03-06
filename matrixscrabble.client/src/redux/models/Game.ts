import { GameBoardModel, GameDetails } from "../slices/gamesSlice";

export interface Game {
    id: string;
    word: string;
    isCompleted?: boolean;
    language: string;
    gameBoard?: GameBoardModel;
    details?: GameDetails;
}