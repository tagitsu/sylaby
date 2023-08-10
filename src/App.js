import Home from './components/pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import PlayerProfile from './components/pages/PlayerProfile/PlayerProfile';
import GameMode from './components/pages/GameMode/GameMode';
import GameSyllablesEasy from './components/pages/GameSyllablesEasy/GameSyllablesEasy';
import NonFound from './components/pages/NonFound/NonFound';
import Header from './components/views/Header/Header';
import PlayersList from './components/pages/PlayersList/PlayersList';
import AddPlayerForm from './components/features/AddPlayerForm/AddPlayerForm';
import GameNumber from './components/pages/GameNumber/GameNumber';
import GameDots from './components/pages/GameDots/GameDots';
import GameGrocery from './components/pages/GameGrocery/GameGrocery';
import SignUp from './components/features/SignUp/SignUp';
import styles from './App.module.scss';

import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const App = () => {

  const [ user, setUser ] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('aktualny użytkownik app to', user.displayName)
        setUser(user.uid);
      }
    });
  }, [user]);

  console.log('app - user uid', user);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.app__main}>
        <Routes>
          <Route path='/' element={<Home user={user}/>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/playerslist' element={<PlayersList user={user}/>} />
          <Route path='/newplayer' element={<AddPlayerForm user={user}/>} />
          <Route path='/player/:id' element={<PlayerProfile user={user}/>} />
          <Route path='/game/:id' element={<GameMode user={user} />} />
          <Route path='/game/syllables/:id' element={<GameSyllablesEasy user={user} />} />
          <Route path='/game/number/:id' element={<GameNumber user={user} />} />
          <Route path='/game/dots/:id' element={<GameDots user={user} />} />
          <Route path='/game/grocery/:id' element={<GameGrocery user={user} />} />
          <Route path='*' element={<NonFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;