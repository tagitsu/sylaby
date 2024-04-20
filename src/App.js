import Home from './components/pages/Home/Home';
import { Routes, Route, Link } from 'react-router-dom';
import GameSyllablesEasy from './components/pages/GameSyllablesEasy/GameSyllablesEasy';
import GameWords from './components/pages/GameWords/GameWords';
import NonFound from './components/pages/NonFound/NonFound';
import Header from './components/views/Header/Header';
import SignUp from './components/features/SignUp/SignUp';
import styles from './App.module.scss';

import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import appUtils from './utils/appUtils';
import Footer from './components/views/Footer/Footer';

const App = () => {

  const [ player, setPlayer ] = useState();
  const [ user, setUser ] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      appUtils.getPlayerFromUser(user?.uid, setPlayer);
      setUser(user?.uid);
    });
  }, [user]);

  return (
    <div className={styles.app}>
      <Header user={user} player={player} />
      <main className={styles.app__main}>
        <Routes>
          <Route path='/' element={<Home user={user} player={player} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/game/:id' element={<GameSyllablesEasy user={user} player={player} />} />
          <Route path='/game1/:id' element={<GameWords user={user} player={player} />} />
          <Route path='*' element={<NonFound />} />
        </Routes>
      </main>
      <Footer playerEmail={player?.email} />
    </div>
  );
};

export default App;