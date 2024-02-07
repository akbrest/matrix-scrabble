import axios from "axios";
import { GAME_ACTIONS } from "../../Game/reducers/action";

export const CreateGame = (word: string) => {
    return (dispatch: any) => {

        dispatch({ type: GAME_ACTIONS.CREATE_GAME_REQUEST });

        const headers = {
            "Content-Type": "application/json",
        };
        axios
            .post("word/CreateGame", { word: word }, { headers })
            .then((result) => {
                console.log(result);
                console.log('sadsad');

                dispatch({
                    type: GAME_ACTIONS.CREATE_GAME_SUCCESS,
                    payload: result.data,
                });

                console.log('sasas');
            })
            .catch(() => {
                console.log("went wrong");

                dispatch({
                    type: GAME_ACTIONS.CREATE_GAME_FAILURE,
                    payload: "Something went wrong",
                });
            });
    };
};

export const UpdateGame = () => {

    return (dispatch: any) => {
        console.log("starting querying");
        dispatch({ type: GAME_ACTIONS.UPDATE_GAME_REQUEST });

        const headers = {
            "Content-Type": "application/json",
        };
        axios
            .post("word/UpdateGame", { word: "ddd" }, { headers })
            .then((result) => {
                console.log(result);
                dispatch({
                    type: GAME_ACTIONS.UPDATE_GAME_SUCCESS,
                    payload: result.data,
                });
            })
            .catch(() => {
                console.log("went wrong");

                dispatch({
                    type: GAME_ACTIONS.UPDATE_GAME_FAILURE,
                    payload: "Something went wrong",
                });
            });
    };
};

export const ConfirmGame = (id: string, left: [], right: [], board: []) => {

    return (dispatch: any) => {
       
        console.log("starting querying");
        dispatch({ type: GAME_ACTIONS.CREATE_GAME_REQUEST });

        var dataToSend = JSON.stringify({
            Left: left,
            Right: right,
            Board: board,
            id: id
        });

        const headers = {
            "Content-Type": "application/json",
        };
        axios
            .post("word/ConfirmGame", dataToSend, { headers })
            .then((result) => {

                dispatch({
                    type: GAME_ACTIONS.CONFIRM_GAME_SUCCESS,
                    payload: result.data,
                });
            })
            .catch(() => {
                console.log("confirming game went wrong");

                dispatch({
                    type: GAME_ACTIONS.CREATE_GAME_FAILURE,
                    payload: "Something went wrong",
                });
            });
    };
};
