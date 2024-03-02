import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchGames } from '../../redux/actions/gamesActions';
import { Game } from '../../redux/models/Game';

const GameList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const games = useSelector((state: RootState) => state.games.games);
  const isLoading = useSelector((state: RootState) => state.games.isLoading);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return (
    <div className="mt-5">
      <h2>Game List</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {games.map((game: Game) => (
            <li key={game.id}>
              <div>
                Language: <small>{game.language}</small> Word:{' '}
                <strong>{game.word}</strong> Is Completed:{' '}
                {game.isCompleted?.toString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameList;
