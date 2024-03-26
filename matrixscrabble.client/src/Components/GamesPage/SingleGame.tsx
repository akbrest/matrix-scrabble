import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchSingleGame } from "../../redux/actions/gamesActions";
import { useSelector, useDispatch } from "react-redux";
import GameBoard from "./GameBoard";
import Form from "react-bootstrap/Form";
import NewGameBoard from "./NewGameBoard";

const SingleGame = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const id = params.id!;
  const [newGameBoardView, setnewGameBoardView] = useState(false);
  const game = useSelector((state: RootState) => state.games.currentGame.game);

  useEffect(() => {
    dispatch(fetchSingleGame(id));
  }, [dispatch, id]);

  const handleSwitch = () => {
    setnewGameBoardView(!newGameBoardView);
  };

  return (
    <div>
      {game && (
        <div>
          <h2>SingleGame with id: {game.id}</h2>
          <div>Word: {game.word}</div>
          <Form.Switch
            label="Game board with confirm buttons"
            defaultChecked={newGameBoardView}
            onChange={handleSwitch}
          />
          {newGameBoardView ? (
            <NewGameBoard />
          ) : (
            <div>
              <GameBoard
                board={game.board}
                id={game.id}
                word={game.word}
                language={game.language}
                key="Gameboard_1"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleGame;
