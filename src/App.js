import Home from './components/pages/Home/Home';
import { Routes, Route, useParams } from 'react-router-dom';
import PlayerProfile from './components/pages/PlayerProfile/PlayerProfile';
import GameMode from './components/pages/GameMode/GameMode';
import GameSyllablesEasy from './components/pages/GameSyllablesEasy/GameSyllablesEasy';
import GameHard from './components/pages/GameHard/GameHard';
import NonFound from './components/pages/NonFound/NonFound';
import Header from './components/views/Header/Header';
import PlayersList from './components/pages/PlayersList/PlayersList';
import AddPlayerForm from './components/features/AddPlayerForm/AddPlayerForm';

const App = () => {

  let { playerID } = useParams();
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/players' element={<PlayersList />} />
          <Route path='/newplayer' element={<AddPlayerForm />} />
          <Route path='/players/:playerID' element={<PlayerProfile />} />
          <Route path='/game/:playerID' element={<GameMode />} />
          <Route path='/game/easysyllables/:playerID' element={<GameSyllablesEasy />} />
          <Route path='*' element={<NonFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;