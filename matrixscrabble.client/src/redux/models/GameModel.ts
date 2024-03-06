import { GameDetails } from "../slices/gamesSlice";
import { Game } from "./Game";
import { GameDetails } from "./GameDetails";

export interface GameModel {
    game: Game;
    details: GameDetails
}
