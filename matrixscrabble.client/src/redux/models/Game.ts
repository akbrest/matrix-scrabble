import { Language } from "../../constants";
import { GameBoardModel } from "./GameBoardModel";
import { GameDetails } from "./GameDetails";
import { NewGameBoard } from "./NewGameBoard";

export interface Game {
  id: string;
  word: string;
  isCompleted?: boolean;
  language: Language;
  board?: GameBoardModel;
  gameBoard: NewGameBoard;
  details?: GameDetails;
}
