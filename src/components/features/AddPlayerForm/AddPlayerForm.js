import styles from './AddPlayerForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { useGetPlayersQuery, useGetLevelsQuery, useAddPlayerMutation } from '../../../api/apiSlice';
const AddPlayerForm = () => {

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();

  const [ addPlayer ] = useAddPlayerMutation();

  const [ newPlayerName, setNewPlayerName ] = useState('');
  const [ newPlayerIcon, setNewPlayerIcon ] = useState('');
  const [ newPlayerColor, setNewPlayerColor ] = useState('');

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

  const characters = [
    {
      id: '1',
      name: 'Pikachu',
      icon: 'pikachu.png',
    },
    {
      id: '2',
      name: 'Curious George',
      icon: 'curious_george.png',
    },
    {
      id: '3',
      name: 'Sponge Bob',
      icon: 'spongebob.png',
    },
    {
      id: '4',
      name: 'Elsa',
      icon: 'elsa.png',
    },
    {
      id: '5',
      name: 'George the Pig',
      icon: 'george_pig.png',
    },
    {
      id: '6',
      name: 'C3PO and R2D2',
      icon: 'r2d2_c3po.png',
    },
    {
      id: '7',
      name: '341B',
      icon: 'storybots.png',
    },
];

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlayer(newPlayer);
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
        {characters.map(
          character => 
          <div key={character.id}>
            <label htmlFor={character.name}>
              <img className={styles.form__image} src={`${process.env.PUBLIC_URL}/images/${character.icon}`} alt={`${character.name} icon`} />
            </label>
            <input 
              type='radio' 
              id={character.name} 
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
      <button className={styles.form__btnSubmit} type='submit' >Dodaj nowego gracza</button>
    </form>
  );
};

export default AddPlayerForm;