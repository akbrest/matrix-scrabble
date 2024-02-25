import GameForm from './GameForm';
import GameList from './GameList';

const GamePage = () => {
  return (
    <div>
      <h2>Welcome to Game page!</h2>
      <GameForm />
      <div>List games</div>
      <GameList />
    </div>
  );
};

export default GamePage;
