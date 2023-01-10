import CurrentPlayer from './components/features/CurrentPlayer/CurrentPlayer';
import Logo from './components/views/Logo/Logo';
import Home from './components/pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import PlayerProfile from './components/pages/PlayerProfile/PlayerProfile';
import GameMode from './components/pages/GameMode/GameMode';
import GameEasy from './components/pages/GameEasy/GameEasy';
import GameHard from './components/pages/GameHard/GameHard';
import NonFound from './components/pages/NonFound/NonFound';

const App = () => {
  return (
    <>
      <header>
        <Logo />
        <CurrentPlayer />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/player/:id' element={<PlayerProfile />} />
          <Route path='/player/:id/game' element={<GameMode />} />
          <Route path='/player/:id/game/easy' element={<GameEasy />} />
          <Route path='/player/:id/game/hard' element={<GameHard />} />
          <Route path='*' element={<NonFound />} />
        </Routes>
      </main>
      
    </>
  );
};

export default App;