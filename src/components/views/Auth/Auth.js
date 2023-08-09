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

import styles from './Auth.module.scss';

const Auth = () => {

  const [ loginData, setLoginData ] = useState({ email: '', password: ''});
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ guest, setGuest ] = useState();
  const [ user, setUser ] = useState();

  useEffect( () => {
    onAuthStateChanged( auth, (currentUser) => {
      setUser(currentUser);
    })
  });


  const signUp = async() => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      const usersRef = collection(db, 'users');
      await setDoc(doc(usersRef, `${user.user.uid}`), { 
        id: user.user.uid,
        name: user.user.email.substring(0, user.user.email.indexOf('@')) 
      });
      console.log('Dane użytkownika zostały dodane do firestore')

    } catch (error) {
      console.error('signUp error', error)
    }
  };

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
      await signOut(auth)
    } catch(error) {
      console.error('signOut', error.message);
    }
  };

  const authForm = 
  <form onSubmit={signIn} className={styles.auth__form}>
    <input type='email' placeholder='e-mail' value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}/>
    <p> {errorMessage.length > 0 && errorMessage } </p>
    <input type='password' placeholder='hasło' value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
    <button type='submit'>Zaloguj</button>
    <button type='button' onClick={signUp}>Zarejestruj</button>
    <button type='button' onClick={signInGuest}>Zaloguj jako gość</button>
  </form>

  const userInfo = 
    <div className={styles.auth__info}>
      <div className={styles.auth__icon}><FontAwesomeIcon icon={faUser} /></div>
      <p className={styles.auth__name}> { user?.email ? user?.email.substring(0, user.email.indexOf('@')) : 'gość' } </p>
      <button className={styles.auth__signout} onClick={signout} ><FontAwesomeIcon icon={faPowerOff} /></button>
    </div>

  console.log('auth - user props', user);

  return(
    <div className={styles.auth}>
      { user ? userInfo : authForm}
    </div>
  )
};

export default Auth;