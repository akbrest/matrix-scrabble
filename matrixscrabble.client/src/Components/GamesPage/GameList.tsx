import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchGames } from '../../redux/actions/gamesActions';
import { Game } from '../../redux/models/Game';
import { Link } from 'react-router-dom';

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
              <Link to={game.id!}>
                Language: <small>{game.language}</small> Word:{' '}
                <strong>{game.word}</strong> Is Completed:{' '}
                {game.isCompleted?.toString()}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameList;
