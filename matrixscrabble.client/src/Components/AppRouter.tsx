import { Route, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';
import Home from './Home';
import GamesPage from './GamesPage/GamesPage';
import SingleGame from './GamesPage/SingleGame';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="games/:id" element={<SingleGame />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
