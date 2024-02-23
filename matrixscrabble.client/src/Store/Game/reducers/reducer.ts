//import { GAME_ACTIONS } from "./action";
//import { IGame, InitialGameState } from "./state";

//export interface IActions {
//    type: string;
//    payload?: any;
//}
//export const GameReducer = (
//    state: IGame = InitialGameState,
//    actions: IActions
//) => {
//    switch (actions.type) {
//        case GAME_ACTIONS.CREATE_GAME_REQUEST: {
            
//            return {
//                ...state,
//                id: actions.payload,
//                loading: true,
//            };
//        }
//        case GAME_ACTIONS.CREATE_GAME_SUCCESS: {

//            return {
//                ...state,
//                id: actions.payload.id,
//                loading: false,
//            };
//        }
//        case GAME_ACTIONS.CREATE_GAME_FAILURE: {
//            return {
//                ...state,
//                data: null,
//                loading: false,
//                error: actions.payload,
//            };
//        }
//        default: {
//            return {
//                ...state,
//            };
//        }
//    }
//};
