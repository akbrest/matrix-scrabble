import { Route, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';
import Home from './Home';
import GamePage from './GamesPage/GamesPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="games" element={<GamePage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
