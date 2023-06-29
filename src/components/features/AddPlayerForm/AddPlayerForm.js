import styles from './AddPlayerForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { useGetPlayersQuery, useGetLevelsQuery, useAddPlayerMutation } from '../../../api/apiSlice';
import { useNavigate } from 'react-router';
import playerProfile from '../../../utils/playerUtils';
import playerUtils from '../../../utils/playerUtils';
import Button from '../../common/Button/Button';

const AddPlayerForm = () => {

  const navigate = useNavigate();

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();

  const [ addPlayer ] = useAddPlayerMutation();

  const [ newPlayerIcon, setNewPlayerIcon ] = useState('');
  const newPlayerName = useRef('');
  const newPlayerColor = useRef('');

  const [ focused, setFocused ] = useState(false);

  const [ choosenIcon ] = playerUtils.characters.filter( icon => icon.icon === newPlayerIcon );

  let currentPlayersIDs, newPlayerID, firstLevel, newPlayer;
  if (playersOK && levelsOK) {

    const sorter = (a, b) => {
      return a - b;
    };

    currentPlayersIDs = players.map( player => player.id );
    currentPlayersIDs.sort(sorter);
    newPlayerID = currentPlayersIDs[currentPlayersIDs.length - 1] + 1;

    [ firstLevel ] = levels.filter( level => level.id === 1);

    newPlayer = {
      id: newPlayerID,
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
  console.log('kolor', newPlayerColor.current.value);
  console.log('nowy gracz', newPlayer);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlayer(newPlayer);
    navigate('/playerslist');
  }

  const handleFocus = (e) => {
    setFocused(true);
  };

    return(
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.form__section}>
        <legend className={styles.form__legend}>Wpisz swoje imię</legend>
        <input 
          ref={newPlayerName}
          className={styles.form__input} 
          type='text' 
          id='name' 
          name='playerName'
          focused={focused.toString()}
          pattern='^[A-Za-z0-9]{2,15}$'
          required={true}
          onBlur={handleFocus}
        />
        <span>Wpisz imię zawierające 2 - 15 znaków (nie używaj znaków specjalnych). </span>
      </fieldset>
      <fieldset className={styles.form__section}>
        <legend className={styles.form__legend}>Wybierz swój kolor</legend>
          <input 
            className={clsx(styles.form__input, styles.form__color)} 
            ref={newPlayerColor}
            defaultValue='#FFFF66'
            type='color' 
            name='playerColor' 
            required={true}
          />
      </fieldset>
      <fieldset className={styles.form__section}>
        <legend className={styles.form__legend}>Wybierz ulubioną postać</legend>
        {playerProfile.characters.map(
          character => 
          <div key={character.id} className={clsx(styles.form__character, choosenIcon?.id === character.id && styles.form__choosen)}>
            <label htmlFor={character.id} className={clsx(styles.form__image)}>
              <img src={`${process.env.PUBLIC_URL}/images/characters/${character.icon}`} alt={`${character.name} icon`} />
            </label>
            <input 
              className={styles.form__checkbox}
              type='radio' 
              id={character.id} 
              name='character' 
              value={character.icon} 
              onChange={(e) => setNewPlayerIcon(e.target.value)}
              required={true}
            />
            <span>Zaznacz ikonę postaci, którą chcesz wybrać.</span>

          </div>
        )}
      </fieldset>
      <Button type='submit' content='Dodaj nowego gracza'></Button>
    </form>
  );
};

export default AddPlayerForm;