import styles from './AddPlayerForm.module.scss';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useGetLevelsQuery } from '../../../api/apiSlice';
import { useNavigate } from 'react-router';
import playerProfile from '../../../utils/playerUtils';
import playerUtils from '../../../utils/playerUtils';
import Button from '../../common/Button/Button';
import { doc, setDoc, addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase-config';

const AddPlayerForm = ({ user }) => {

  const navigate = useNavigate();

  const [ players, setPlayers ] = useState([]);

  useEffect(() => {
    const getUserPlayers = async () => {
      const players = await getDocs(collection(db, `users/${user}/players`));
      players.forEach( player => {
        console.log(`To jest ${player.id}`)
        setPlayers(players.docs.map( doc => ({...doc.data(), id: doc.id })));
      })
    };
    getUserPlayers();
  }, [user]);


  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();

  const [ newPlayerIcon, setNewPlayerIcon ] = useState('');
  const newPlayerName = useRef('');
  const newPlayerColor = useRef('');

  const [ focused, setFocused ] = useState(false);

  const [ choosenIcon ] = playerUtils.characters.filter( icon => icon.icon === newPlayerIcon );

  let currentPlayersIDs, newPlayerID, firstLevel, newPlayer;
  if (levelsOK) {

    const sorter = (a, b) => {
      return a - b;
    };

    if (players.length) {
      currentPlayersIDs = players.map( player => Number(player.id) );
      currentPlayersIDs.sort(sorter);
      newPlayerID = currentPlayersIDs[currentPlayersIDs.length - 1] + 1;
    } else {
      newPlayerID = 1;
    }

    [ firstLevel ] = levels.filter( level => level.id === 1);

    newPlayer = {
      id: String(newPlayerID),
      name: newPlayerName.current.value,
      icon: newPlayerIcon,
      isActive: false,
      level: 1,
      color: newPlayerColor.current.value,
      title: firstLevel.title,
      badges: [
        { 
          name: firstLevel.badge,
          text: firstLevel.title
        }
      ],
      xp: 0
    };
  }

  console.log(
    'players', players,
    'currentPlayerIds', currentPlayersIDs,
    'user', user?.displayName,
    'newPlayerId', newPlayerID,
    'path', `users/${user}/players`,
    'imię gracza', newPlayerName.current.value
  );

  const addNewPlayer = async () => {
    try {
      await setDoc(doc(db, `users/${user}/players`, String(newPlayerID)), newPlayer);
      console.log('nowy gracz dodany do firestore');
    } catch(error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewPlayer();
    navigate('/playerslist');
  };

  const handleFocus = () => {
    setFocused(true);
  };

    return(
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={clsx(styles.form__field, styles.form__name)}>
        <legend className={styles.form__legend}>Wpisz swoje imię</legend>
        <input 
          ref={newPlayerName}
          className={clsx(styles.form__input, styles.form__name)} 
          type='text' 
          id='name' 
          name='playerName'
          focused={focused.toString()}
          pattern='^[A-Za-z0-9]{2,15}$'
          required={true}
          onBlur={handleFocus}
        />
        <span className={styles.form__info}>Wpisz imię zawierające 2 - 15 znaków (nie używaj znaków specjalnych). </span>
      </fieldset>
      <fieldset className={clsx(styles.form__field, styles.form__color)}>
        <legend className={styles.form__legend}>Wybierz swój kolor</legend>
          <input 
            className={clsx(styles.form__input, styles.form__colorInput)} 
            ref={newPlayerColor}
            defaultValue='#FFFF66'
            type='color' 
            name='playerColor' 
            required={true}
          />
          <span className={styles.form__info}>Wybierz kolor dla swojej postaci. </span>

      </fieldset>
      <fieldset className={(styles.form__field, styles.form__characters)}>
        <legend className={styles.form__legend}>Wybierz ulubioną postać</legend>
        {playerProfile.characters.map(
          character => 
          <label htmlFor={character.id} key={character.id} className={clsx(styles.form__character, choosenIcon?.id === character.id && styles.form__choosen)}>
            <img src={`${process.env.PUBLIC_URL}/images/characters/${character.icon}`} alt={`${character.name} icon`} />
            <input 
              className={styles.form__checkbox}
              type='radio' 
              id={character.id} 
              name='character' 
              value={character.icon} 
              onChange={(e) => setNewPlayerIcon(e.target.value)}
              required={true}
            />
          </label>
          
        )}
        <span className={styles.form__info}>Zaznacz ikonę postaci, którą chcesz wybrać.</span>
      </fieldset>
      <div className={styles.form__submit}>
        <Button type='submit' content='Dodaj nowego gracza' />
      </div>
    </form>
  );
};

export default AddPlayerForm;