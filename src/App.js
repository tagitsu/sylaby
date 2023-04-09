import Home from './components/pages/Home/Home';
import { Routes, Route, useParams } from 'react-router-dom';
import PlayerProfile from './components/pages/PlayerProfile/PlayerProfile';
import GameMode from './components/pages/GameMode/GameMode';
import GameSyllablesEasy from './components/pages/GameSyllablesEasy/GameSyllablesEasy';
import NonFound from './components/pages/NonFound/NonFound';
import Header from './components/views/Header/Header';
import PlayersList from './components/pages/PlayersList/PlayersList';
import AddPlayerForm from './components/features/AddPlayerForm/AddPlayerForm';

const App = () => {

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/playerslist' element={<PlayersList />} />
          <Route path='/newplayer' element={<AddPlayerForm />} />
          <Route path='/player/:id' element={<PlayerProfile />} />
          <Route path='/game/:id' element={<GameMode />} />
          <Route path='/game/easysyllables/:id' element={<GameSyllablesEasy />} />
          <Route path='*' element={<NonFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;