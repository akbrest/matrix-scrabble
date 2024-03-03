import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchSingleGame } from '../../redux/actions/gamesActions';
import { useSelector, useDispatch } from 'react-redux';

const SingleGame = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const id = params.id!;
  const game = useSelector((state: RootState) =>
    state.games.games.find((x) => x.id === id)
  );
  const isLoading = useSelector((state: RootState) => state.games.isLoading);

  useEffect(() => {
    dispatch(fetchSingleGame(id));
  }, [dispatch, id]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        game && (
          <div>
            <h2>SingleGame with id: {game.id}</h2>
            <div>Word: {game.word}</div>
          </div>
        )
      )}
    </div>
  );
};

export default SingleGame;
