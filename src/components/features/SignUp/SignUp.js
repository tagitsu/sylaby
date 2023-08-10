import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../firebase-config';
import { collection, doc, setDoc } from 'firebase/firestore';
import styles from './SignUp.module.scss';
import { useNavigate } from 'react-router';

const SignUp = () => {

  const [ formError, setFormError ] = useState();
  const [ formData, setFormData ] = useState({ name: '', email: '', password: '', repeatedPassword: '' });

  const navigate = useNavigate();

  const signUp = async(e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      navigate('/');
      const usersRef = collection(db, 'users');
      await setDoc(doc(usersRef, `${user.user.uid}`), { 
        id: user.user.uid,
        name: formData.name,
        email: formData.email 
      });
      await updateProfile(user, { displayName: formData.name });

      console.log('Dane użytkownika zostały dodane do firestore', user.user.uid, user.user.displayName);

    } catch (error) {
      console.error('signUp error');
      setFormError(error.code)
    }
  };

  return(
    <div className={styles.signup}>
      <form className={styles.signup__form}>
        <input className={styles.signup__input} type='text' placeholder='imię' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}/>
        <input className={styles.signup__input} type='email' placeholder='e-mail' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
        <span className={styles.signup__error}>{formError}</span>
        <input className={styles.signup__input} type='password' placeholder='hasło' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <input className={styles.signup__input} type='password' placeholder='powtórz hasło' value={formData.repeatedPassword} onChange={(e) => setFormData({ ...formData, repeatedPassword: e.target.value })} />
        <button className={styles.signup__submit} type='button' onClick={signUp} >Zarejestruj</button>
      </form>
    </div>
  );
};

export default SignUp;