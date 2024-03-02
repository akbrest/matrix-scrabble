import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Game } from '../models/Game';

//TODO move to env variables
const apiUrl = 'http://localhost:5032';

export const fetchGames = createAsyncThunk<Game[]>(
  'games/fetchGames',
  async () => {
    const response = await axios.get(apiUrl + '/games');
    return response.data;
  }
);

export const createGame = createAsyncThunk<Game, Game>(
  'games/createGames',
  async (game: Game) => {
    const response = await axios.post(apiUrl + '/games', game);
    return response.data;
  }
);
