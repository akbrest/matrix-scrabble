import { GameBoardModel } from "./GameBoardModel";
import { GameDetails } from "./GameDetails";

export interface Game {
    id: string;
    word: string;
    isCompleted?: boolean;
    language: string;
    gameBoard?: GameBoardModel;
    details?: GameDetails;
}