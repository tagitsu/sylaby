import Home from './components/pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import PlayerProfile from './components/pages/PlayerProfile/PlayerProfile';
import GameMode from './components/pages/GameMode/GameMode';
import GameSyllablesEasy from './components/pages/GameSyllablesEasy/GameSyllablesEasy';
import NonFound from './components/pages/NonFound/NonFound';
import Header from './components/views/Header/Header';
import PlayersList from './components/pages/PlayersList/PlayersList';
import AddPlayerForm from './components/features/AddPlayerForm/AddPlayerForm';
import HowToPlay from './components/pages/HowToPlay/HowToPlay';
import GameNumber from './components/pages/GameNumber/GameNumber';
import GameDots from './components/pages/GameDots/GameDots';
import GameGrocery from './components/pages/GameGrocery/GameGrocery';
import styles from './App.module.scss';

const App = () => {

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.app__container}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/playerslist' element={<PlayersList />} />
          <Route path='/newplayer' element={<AddPlayerForm />} />
          <Route path='/player/:id' element={<PlayerProfile />} />
          <Route path='/game/:id' element={<GameMode />} />
          <Route path='/game/easysyllables/:id' element={<GameSyllablesEasy />} />
          <Route path='/game/number/:id' element={<GameNumber />} />
          <Route path='/game/dots/:id' element={<GameDots />} />
          <Route path='/game/grocery/:id' element={<GameGrocery />} />
          <Route path='/howtoplay' element={<HowToPlay />} />
          <Route path='*' element={<NonFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;