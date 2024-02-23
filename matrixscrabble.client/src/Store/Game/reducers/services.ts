//import axios from "axios";
//import { GAME_ACTIONS } from "../../Game/reducers/action";

export const CreateGame = (word: string, language: string) => {
    return (dispatch: any) => {

        dispatch({ type: GAME_ACTIONS.CREATE_GAME_REQUEST });

        const headers = {
            "Content-Type": "application/json",
        };
        axios
            .post("Games", { word: word, language: language, Game : null }, { headers })
            .then((result) => {

                setTimeout(() => {
                    dispatch({
                        type: GAME_ACTIONS.CREATE_GAME_SUCCESS,
                        payload: result.data,
                    });
                }, 1000);               

            })
            .catch(() => {

                dispatch({
                    type: GAME_ACTIONS.CREATE_GAME_FAILURE,
                    payload: "Something went wrong",
                });
            });
    };
};

export const UpdateGame = (id: string, left: [], right: [], board: []) => {

    return (dispatch: any) => {
        console.log("starting querying");
        dispatch({ type: GAME_ACTIONS.UPDATE_GAME_REQUEST });

        const headers = {
            "Content-Type": "application/json",
        };
        axios
            .put("Games", {
               
                    game: {
                        id: id,
                        Left: left,
                        Right: right,
                        Board: board,
                    },
                    word: '',
                    id: id
              
                }                    
             , { headers })
            .then(result => {
                console.log(result)
                dispatch({
                    type: GAME_ACTIONS.UPDATE_GAME_SUCCESS
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
       
        dispatch({ type: GAME_ACTIONS.CREATE_GAME_REQUEST });

        var dataToSend = JSON.stringify({
            Left: left,
            Right: right,
            Board: board,
            id: id
        });
        console.log(dataToSend)

        const headers = {
            "Content-Type": "application/json",
        };
        axios
            .post("word/ConfirmGame", {
                game: {
                    id: id,
                    Left: left,
                    Right: right,
                    Board: board,
                },
                word: '',
                
                id: id
            }, { headers })
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
