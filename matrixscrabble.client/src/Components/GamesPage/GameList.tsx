import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../redux/slices/gamesSlice';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '../../redux/store';
import { Game } from '../../redux/slices/gamesSlice';

const GameList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const games = useSelector((state: RootState) => state.games.games);
  const isLoading = useSelector((state: RootState) => state.games.isLoading);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return (
    <div>
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
                {game.isCompleted.toString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameList;
