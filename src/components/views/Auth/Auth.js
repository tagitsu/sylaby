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
import { faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
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



  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth, 
      loginData.email, 
      loginData.password
    )
      .then((userCredential) => {
        console.log('signIn', userCredential)
      })
      .catch((error) => {
        console.log(error.message);
        if ((error.message.includes('user-not-found)'))) {
          setErrorMessage('Nie mamy jeszcze użytkownika o tym adresie email. Możesz Stworzyć konto klikając na przysk Zarejetruj się.')
        }
      })
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
      <input className={styles.auth__input} type='email' placeholder='e-mail' value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}/>
      <input className={styles.auth__input} type='password' placeholder='hasło' value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
      <button className={styles.auth__signout} type='submit'>Zaloguj</button>
      <p className={styles.auth__text} > Jeśli nie masz konta, <Link to='/signup' ><span className={styles.auth__signout}>zarejestruj się</span></Link></p>
      <button className={styles.auth__signout} type='button' onClick={signInGuest}>Zaloguj jako gość</button>
    </form>

  const userInfo = 
    <div className={styles.auth__info}>
      <div className={styles.auth__icon}><FontAwesomeIcon icon={faUser} /></div>
      <p className={styles.auth__name}> { user?.email ? user?.email.substring(0, user.email.indexOf('@')) : 'gość' } </p>
      <button className={styles.auth__signout} onClick={signout} > Wyloguj <FontAwesomeIcon icon={faPowerOff}/></button>
    </div>

  return(
    <div className={styles.auth}>
      { user ? userInfo : authForm}
    </div>
  )
};

export default Auth;