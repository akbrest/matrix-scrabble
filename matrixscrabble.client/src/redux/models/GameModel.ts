import { GameDetails } from "../slices/gamesSlice";
import { Game } from "./Game";

export interface GameModel {
    game: Game;
    details: GameDetails
}
