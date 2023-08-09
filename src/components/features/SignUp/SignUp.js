import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../firebase-config';
import { collection, doc, setDoc } from 'firebase/firestore';
import styles from './SignUp.module.scss';

const SignUp = () => {

  const [ formError, setFormError ] = useState();
  const [ formData, setFormData ] = useState({ name: '', email: '', password: '', repeatedPassword: '' });

  const signUp = async() => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(user, { displayName: formData.name })
      const usersRef = collection(db, 'users');
      await setDoc(doc(usersRef, `${user.user.uid}`), { 
        id: user.user.uid,
        name: user.user.email.substring(0, user.user.email.indexOf('@')) 
      });
      console.log('Dane użytkownika zostały dodane do firestore')

    } catch (error) {
      console.error('signUp error');
      setFormError(error.code)
    }
  };

  console.log('błąd rejestracji', formError)


  return(
    <div className={styles.signup}>
      <form onSubmit={signUp} className={styles.signup__form}>
        <input className={styles.signup__input} type='text' placeholder='imię' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}/>
        <input className={styles.signup__input} type='email' placeholder='e-mail' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
        <span className={styles.signup__error}>{formError}</span>
        <input className={styles.signup__input} type='password' placeholder='hasło' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <input className={styles.signup__input} type='password' placeholder='powtórz hasło' value={formData.repeatedPassword} onChange={(e) => setFormData({ ...formData, repeatedPassword: e.target.value })} />
        <button className={styles.signup__submit} type='button' onClick={signUp}>Zarejestruj</button>
      </form>
    </div>
  );
};

export default SignUp;