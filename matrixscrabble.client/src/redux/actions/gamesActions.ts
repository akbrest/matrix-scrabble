import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Game } from '../models/Game';
import { GameBoardModel } from '../models/GameBoardModel';
import { GameModel } from '../models/GameModel';
import { CreateGame } from '../models/CreateGame';
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
        }
    }
);

export const createGame = createAsyncThunk<Game, CreateGame>(
    'games/createGame',
    async (game: CreateGame, thunkAPI) => {
        try {
            const response = await axios.post(apiUrl + '/games', game);
            return response.data;
        } catch (error) {
            //thunkAPI.dispatch(setError("Create Game Error Occured"));
            //return thunkAPI.rejectWithValue("Create Game Error Occured");
        }
    }
);

export const updateGame = createAsyncThunk<GameModel, GameBoardModel>(
    'games/updateGame',
    async (gameDetails: GameBoardModel) => {

        const response = await axios.put('http://localhost:5032/games', {
            board: {
                id: gameDetails.id,
                Left: gameDetails.left,
                Right: gameDetails.right,
                Center: gameDetails.board,
            },
            word: '',
            id: gameDetails.id,
            language: ""
        });

        return response.data;
    }
);