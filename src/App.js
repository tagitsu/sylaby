import Home from './components/pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import PlayerProfile from './components/pages/PlayerProfile/PlayerProfile';
import GameMode from './components/pages/GameMode/GameMode';
import GameEasy from './components/pages/GameEasy/GameEasy';
import GameHard from './components/pages/GameHard/GameHard';
import NonFound from './components/pages/NonFound/NonFound';
import Header from './components/views/Header/Header';
import { useEffect } from 'react';

const App = () => {

// Pobieranie danych z serwera - sposób I
// nie można użyć useEffect w slice

// useEffect(() => {
//   fetch('http://localhost:3131/players')
//     .then(res => res.json())
//     .then(players => console.log('playerSlice fetching data', players));
// }, []);




  return (
    <div>
      <Header />
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
    </div>
  );
};

export default App;