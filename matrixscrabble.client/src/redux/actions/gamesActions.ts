import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Game } from '../models/Game';
import { GameBoardModel } from '../models/GameBoardModel';
import { GameModel } from '../models/GameModel';
import { CreateGame } from '../models/CreateGame';
import { clearError, setError } from '../slices/errorSlice';
// import { setError } from '../slices/errorSlice';

//TODO move to env variables
const apiUrl = 'http://localhost:5032';

export const fetchGames = createAsyncThunk<Game[]>(
    'games/fetchGames',
    async () => {
        const response = await axios.get(apiUrl + '/games');
        return response.data;
    }
);

export const fetchSingleGame = createAsyncThunk<Game, string>(
    'games/fetchSingleGame',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.get(apiUrl + '/games/' + id);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
);

export const createGame = createAsyncThunk<Game, CreateGame>(
    'games/createGame',
    async (game: CreateGame, thunkAPI) => {
        try {
            const response = await axios.post(apiUrl + '/games', game);
            return response.data;
        } catch (error ) {
            const data = error.response.data;

            let message = data.errorMessage;
            thunkAPI.dispatch(setError("Error Occured" + message));

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateGame = createAsyncThunk<GameModel, GameBoardModel>(
    'games/updateGame',
    async (gameDetails: GameBoardModel) => {

        const response = await axios.put(apiUrl+ '/games', {
            board: {
                id: gameDetails.id,
                Left: gameDetails.left,
                Right: gameDetails.right,
                Center: gameDetails.board,
            },
            word: "",
            id: gameDetails.id,
            language: gameDetails.language //TODO  fix this 
        });

        return response.data;
    }
);