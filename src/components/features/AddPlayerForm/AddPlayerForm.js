import styles from './AddPlayerForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { useGetPlayersQuery, useAddPlayerMutation } from '../../../api/apiSlice';
const AddPlayerForm = () => {

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();

  console.log('new player', players);

  const root = document.querySelector(':root');
  root.style.setProperty('--radio-color', 'yellow');

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

  const newPlayer = {
    id: '',
    name: '',
    icon: "pikachu.png",
    isActive: false,
    level: 0,
    color: '',
    title: '',
    badges: [],
    xp: 0
  };


    return(
    <form className={styles.form}>
      <fieldset className={styles.form__section}>
        <legend>Wpisz swoje imię</legend>
        <input className={styles.form__input} type='text' id='name' name='playerName' />
      </fieldset>
      <fieldset className={styles.form__section}>
        <legend>Wybierz swoją postać</legend>
        {characters.map(
          character => 
          <div key={character.id}>
            <label htmlFor={character.name}>
              <img className={styles.form__image} src={`${process.env.PUBLIC_URL}/images/${character.icon}`} alt={`${character.name} icon`} />
            </label>
            <input type='radio' id={character.name} name='character' value={character.icon} />
          </div>
        )}
      </fieldset>
      <fieldset className={styles.form__section}>
        <legend>Wybierz swój kolor</legend>
          <input className={clsx(styles.form__input, styles.form__inputColor)} type='color' name='playerColor' />
      </fieldset>
      <button className={styles.form__btnSubmit} >Dodaj nowego gracza</button>
    </form>
  );
};

export default AddPlayerForm;