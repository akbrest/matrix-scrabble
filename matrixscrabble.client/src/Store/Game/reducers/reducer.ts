import { GAME_ACTIONS } from "./action";
import { IGame, InitialGameState } from "./state";

export interface IActions {
    type: string;
    payload?: any;
}
export const GameReducer = (
    state: IGame = InitialGameState,
    actions: IActions
) => {
    switch (actions.type) {
        case GAME_ACTIONS.CREATE_GAME_REQUEST: {
            
            return {
                ...state,
                id: actions.payload,
                loading: true,
            };
        }
        case GAME_ACTIONS.CREATE_GAME_SUCCESS: {
        
            return {
                ...state,
                id: actions.payload.id,
                confirmations : [],
                loading: false,
            };
        }
        case GAME_ACTIONS.CREATE_GAME_FAILURE: {
            return {
                ...state,
                data: null,
                loading: false,
                error: actions.payload,
            };
        }
        case GAME_ACTIONS.MODAL_GAME_CONFIRM: {
            return {
                ...state,
                data: null,
                show: true
            };
        }

        case GAME_ACTIONS.CLOSE_GAME_MODAL: {
            return {
                ...state,
                data: null,
                show: false
            };
        }

        case GAME_ACTIONS.UPDATE_GAME_SUCCESS: {
       
            console.log(actions.payload)
            return {
                ...state,
                loading:false,
                confirmations: actions.payload.details.confirmations
            };
        }

        default: {
            return {
                ...state,
            };
        }
    }
};
