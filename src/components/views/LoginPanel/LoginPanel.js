import { useState } from "react";
import { auth, db } from "../../../firebase-config";
import { 
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import styles from './LoginPanel.module.scss';
import appUtils from "../../../utils/appUtils";
import PlayerIcon from "../PlayerIcon/PlayerIcon";
import Modal from "../../common/Modal/Modal";

const LoginPanel = ({ user, player }) => {

  const [ loginData, setLoginData ] = useState({ email: '', password: ''});
  const [ openLoginModal, setOpenLoginModal ] = useState(false);
  const navigate = useNavigate();

  const signIn = async(e) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(
        auth, 
        loginData.email, 
        loginData.password
      );
      navigate('/');
      setOpenLoginModal(false);
    } catch (error) {
      console.error(error.code);
    }
  };

  const signInGuest = async(e) => {
    e.preventDefault();
    try {
      await signInAnonymously(auth);
      const usersRef = collection(db, 'users');
      await setDoc(doc(usersRef, `${auth.currentUser.uid}`), { 
        id: auth.currentUser.uid,
        name: 'gość',
        level: 1,
        icon: 'guest',
        points: 0
      });
      setOpenLoginModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const signout = async() => {
    try {
      await signOut(auth);
      navigate('/');
      appUtils.refreshPage();
    } catch(error) {
      console.error('signOut', error.message);
    }
  };

  const authForm = 
    <form onSubmit={signIn} className={styles.auth__form}>
      <label className={styles.auth__label}>
        E-mail
        <input className={styles.auth__input} type='email' value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}/>
      </label>
      <label className={styles.auth__label}>
        Hasło
        <input className={styles.auth__input} type='password' value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
      </label>
      <button className={styles.auth__button} type='submit'>Zaloguj</button>
      <p className={styles.auth__signup} > Jeśli nie masz konta, <Link to='/signup' ><button className={styles.auth__text}>zarejestruj się</button></Link> lub <button className={styles.auth__text} type='button' onClick={signInGuest}>zaloguj jako gość</button>.</p>
    </form>;

  const userInfo = 
    <div className={styles.auth__info}>
      <div className={styles.auth__icon}>
        { !(player?.name === 'gość') ? <PlayerIcon user={user} player={player} /> : <FontAwesomeIcon icon={faUser} />}
        <p className={styles.auth__name}> maciejka </p>
      </div>

      <button className={styles.auth__signout} onClick={signout} > <FontAwesomeIcon icon={faPowerOff}/></button>
    </div>

  return(
    <div className={styles.auth}>
      { (openLoginModal && !user)
        &&
        <Modal title='Logowanie' content={authForm} close={() => setOpenLoginModal(false)} />
      }
      { (!openLoginModal && !user) 
        &&
        <button className={styles.auth__button} onClick={() => setOpenLoginModal(true)}>Zaloguj</button>
      }
      { user && userInfo }
      
    </div>
  )
};

export default LoginPanel;