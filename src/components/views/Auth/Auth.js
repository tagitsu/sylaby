import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase-config";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faUser, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import styles from './Auth.module.scss';
import appUtils from "../../../utils/appUtils";

const Auth = () => {

  const [ loginData, setLoginData ] = useState({ email: '', password: ''});
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ user, setUser ] = useState();

  const navigate = useNavigate();

  useEffect( () => {
    onAuthStateChanged( auth, (currentUser) => {
      setUser(currentUser);
    })
  }, [user]);



  const signIn = async(e) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(
        auth, 
        loginData.email, 
        loginData.password
      );
      navigate('/')
    } catch (error) {
      console.error(error.code);
    }
  };

  const signInGuest = async(e) => {
    e.preventDefault();
    try {
      await signInAnonymously(auth);
      console.log('gość', auth.currentUser.uid);
      const guestsRef = collection(db, 'guests');
      await setDoc(doc(guestsRef, `${auth.currentUser.uid}`), { 
        id: auth.currentUser.uid,
        name: 'anonymous' 
      });
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
      <div className={styles.auth__inputs}>
        <input className={styles.auth__input} type='email' placeholder='e-mail' value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}/>
        <input className={styles.auth__input} type='password' placeholder='hasło' value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
        <button className={styles.auth__btn} type='submit'>Zaloguj</button>
        <button className={styles.auth__btn} type='button' onClick={signInGuest}>Zaloguj jako gość</button>
      </div>
      <p className={styles.auth__signup} > Jeśli nie masz konta, <Link to='/signup' ><button className={styles.auth__btn}>zarejestruj się</button></Link></p>
    </form>

  const userInfo = 
    <div className={styles.auth__info}>
      <div className={styles.auth__icon}><FontAwesomeIcon icon={faUser} /></div>
      <p className={styles.auth__name}> { user?.email ? user?.email.substring(0, user.email.indexOf('@')) : 'gość' } </p>
      <button className={styles.auth__btn} onClick={signout} > Wyloguj <FontAwesomeIcon icon={faPowerOff}/></button>
    </div>

  return(
    <div className={styles.auth}>
      { user ? userInfo : authForm}
    </div>
  )
};

export default Auth;