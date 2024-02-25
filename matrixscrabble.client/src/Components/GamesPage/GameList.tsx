import { useSelector } from 'react-redux';

const GameList = () => {
  const games = useSelector((state: any) => state.games);

  return (
    <div>
      <h2>Game List</h2>
      {games.length === 0 ? (
        <p>No games available</p>
      ) : (
        <ul>
          {games.map((game: any) => (
            <li key={game.word}>
              <div>
                Language: <small>{game.language}</small> Word:{' '}
                <strong>{game.word}</strong> Answers: 0/{game.word.length}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GameList;
