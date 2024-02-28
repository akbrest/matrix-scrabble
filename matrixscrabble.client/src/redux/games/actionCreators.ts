import * as actionTypes from './actionTypes';

export const createGame = (newGame: any) => {
  return {
    type: actionTypes.CREATE_GAME,
    payload: newGame,
  };
};
