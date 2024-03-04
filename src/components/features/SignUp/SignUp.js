import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../firebase-config';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import styles from './SignUp.module.scss';
import { useNavigate } from 'react-router';
import playerUtils from '../../../utils/playerUtils';
import clsx from 'clsx';

const SignUp = () => {

  const [ formError, setFormError ] = useState();
  const [ formData, setFormData ] = useState(
    { name: '', 
      email: '', 
      password: '', 
      password2: '', 
      icon: '',
      level: 0,
      badges: [
        { 
          name: '',
          text: ''
        },
      ],
      points: 0
    });

  const [ choosenIcon ] = playerUtils.characters.filter( icon => icon.icon === formData.icon );


  const navigate = useNavigate();

  const signUp = async(e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log(user.user.email);
      navigate('/');
      const player = { 
        id: user.user.uid,
        name: formData.name,
        email: formData.email,
        icon: formData.icon,
        level: formData.level,
        badges: formData.badges,
        points: formData.points
      };
      
      await setDoc(doc(db, `users`, user.user.uid), player);

    } catch (error) {
      setFormError(error.code)
    }
   
  };

  return(
    <div className={styles.signup}>
      <form className={styles.signup__form}>
        <input 
          className={styles.signup__input} 
          type='text' placeholder='imię' 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input 
          className={styles.signup__input} 
          type='email' placeholder='e-mail' 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        <span className={styles.signup__error}>{formError}</span>
        <input 
          className={styles.signup__input} 
          type='password' 
          placeholder='hasło' 
          value={formData.password} 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          />
        <input 
          className={styles.signup__input} 
          type='password' 
          placeholder='powtórz hasło' 
          value={formData.password2} 
          onChange={(e) => setFormData({ ...formData, password2: e.target.value })} 
          />
        <div className={clsx(styles.signup__input, styles.signup__characters)}>
          {playerUtils.characters.map(
            character => 
            <label htmlFor={character.id} key={character.id} className={clsx(styles.signup__character, choosenIcon?.id === character.id && styles.signup__choosen)}>
              <img src={`${process.env.PUBLIC_URL}/images/characters/${character.icon}`} alt={`${character.name} icon`} />
              <input 
                className={styles.signup__character}
                type='radio' 
                id={character.id} 
                name='character' 
                value={character.icon} 
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                required={true}
              />
            </label>
          )}
          <span className={styles.signup__info}>Zaznacz ikonę postaci, którą chcesz wybrać.</span>
        </div>
        <button className={styles.signup__submit} type='button' onClick={signUp} >Zarejestruj</button>
      </form>
    </div>
  );
};

export default SignUp;