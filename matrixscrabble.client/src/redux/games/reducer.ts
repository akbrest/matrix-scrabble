import * as actionTypes from './actionTypes';

const initialState: any[] = [];

const gamesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.CREATE_GAME:
      return [...state, action.payload];
    // case GAME_ACTIONS.CREATE_GAME_REQUEST: {
    //   return {
    //     ...state,
    //     id: actions.payload,
    //     loading: true,
    //   };
    // }
    // case GAME_ACTIONS.CREATE_GAME_SUCCESS: {
    //   return {
    //     ...state,
    //     id: actions.payload.id,
    //     loading: false,
    //   };
    // }
    // case GAME_ACTIONS.CREATE_GAME_FAILURE: {
    //   return {
    //     ...state,
    //     data: null,
    //     loading: false,
    //     error: actions.payload,
    //   };
    // }
    default:
      return state;
  }
};

export default gamesReducer;
