import axios from "axios";
import { GAME_ACTIONS } from "../../Game/reducers/action";

export const CreateGame = (word: string) => {
  return (dispatch: any) => {
    console.log("starting querying");
    dispatch({ type: GAME_ACTIONS.CREATE_GAME_REQUEST });

    var dataToSend = JSON.stringify({ word: word });

    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("word/CreateGame", { word: "ddd" }, { headers })
      .then((result) => {
        console.log(result);
        dispatch({
          type: GAME_ACTIONS.CREATE_GAME_SUCCESS,
          payload: result.data,
        });
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
