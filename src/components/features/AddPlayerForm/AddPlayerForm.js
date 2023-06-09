import styles from './AddPlayerForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { useGetPlayersQuery, useGetLevelsQuery, useAddPlayerMutation } from '../../../api/apiSlice';
import { useNavigate } from 'react-router';
import playerProfile from '../../../utils/playerUtils';
import playerUtils from '../../../utils/playerUtils';

const AddPlayerForm = () => {

  const navigate = useNavigate();

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();

  const [ addPlayer ] = useAddPlayerMutation();

  const [ newPlayerName, setNewPlayerName ] = useState('');
  const [ newPlayerIcon, setNewPlayerIcon ] = useState('');
  const [ newPlayerColor, setNewPlayerColor ] = useState('');

  console.log('zaznaczona postać', newPlayerName, newPlayerIcon);

  const [ choosenIcon ] = playerUtils.characters.filter( icon => icon.icon === newPlayerIcon );

  console.log('wybrana ikona' , choosenIcon);

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
      name: newPlayerName,
      icon: newPlayerIcon,
      isActive: false,
      level: 1,
      color: newPlayerColor,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlayer(newPlayer);
    navigate('/playerslist');
  }

    return(
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.form__section}>
        <legend>Wpisz swoje imię</legend>
        <input 
          className={styles.form__input} 
          type='text' 
          id='name' 
          name='playerName'
          onChange={(e) => setNewPlayerName(e.target.value)}
        />
      </fieldset>
      <fieldset className={styles.form__section}>
        <legend>Wybierz swoją postać</legend>
        {playerProfile.characters.map(
          character => 
          <div key={character.id} className={styles.form__character}>
            <label htmlFor={character.id}>
              <img className={clsx(styles.form__image, choosenIcon?.id === character.id && styles.form__choosen)} src={`${process.env.PUBLIC_URL}/images/characters/${character.icon}`} alt={`${character.name} icon`} />
            </label>
            <input 
              className={styles.form__checkbox}
              type='radio' 
              id={character.id} 
              name='character' 
              value={character.icon} 
              onChange={(e) => setNewPlayerIcon(e.target.value)}
            />
          </div>
        )}
      </fieldset>
      <fieldset className={styles.form__section}>
        <legend>Wybierz swój kolor</legend>
          <input 
            className={clsx(styles.form__input, styles.form__inputColor)} 
            type='color' 
            name='playerColor' 
            onChange={(e) => setNewPlayerColor(e.target.value)}
          />
      </fieldset>
      <button className={clsx(styles.form__btnSubmit)} type='submit' >Dodaj nowego gracza</button>
    </form>
  );

  // TODO walidacja formularza. Wpisanie imienia i wybór ikony zanim gracz zostanie dodany do listy.

};

export default AddPlayerForm;