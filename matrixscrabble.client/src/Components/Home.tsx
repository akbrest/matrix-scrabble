import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Matrix Scrabble game!</h1>
      <div>Here will be added information how to play ...</div>
      <Link to="/games">Try to play!</Link>
    </div>
  );
}

export default Home;