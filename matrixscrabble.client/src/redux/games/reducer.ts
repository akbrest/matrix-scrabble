import * as actionTypes from './actionTypes';

const initialState: any[] = [];

const gamesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.CREATE_GAME:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default gamesReducer;
