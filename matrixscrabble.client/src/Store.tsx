import { applyMiddleware, combineReducers, createStore } from "redux";

import { GameReducer } from "./Store/Game/reducers/reducer";
import thunk from "redux-thunk";

const combinedReducer = combineReducers({
    gameReducer: GameReducer
});
export const store = createStore(combinedReducer, applyMiddleware(thunk));