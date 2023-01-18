import styles from './AddPlayerForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addNewPlayer } from '../../../redux/player/playerSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

const AddPlayerForm = () => {

  const dispatch = useDispatch();

  const [ isActive, setIsActive ] = useState(false);

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
    ];
  
  //const colors = ['#FFC312', '#F79F1F', '#EE5A24'];

  console.log('characters', characters);

  const playersAmount = useSelector(state => state.player.players.length);
  console.log('ilość graczy', playersAmount);

  const newPlayerID = playersAmount + 1;
  console.log('ID nowego garcza', newPlayerID, typeof newPlayerID);

  const [ playerName, setPlayerName ] = useState('');
  const [ playerCharacter, setPlayerCharacter ] = useState('');
  const [ playerColor, setPlayerColor ] = useState('');

  const root = document.querySelector(':root');
  root.style.setProperty('--radio-color', playerColor);


  const handleChangeCharacter = (e) => {
    console.log('zmiana w radio', e.target.value);
    setPlayerCharacter(e.target.value);
  };

  const handleChangeColor = (e) => {
    console.log('zmiana koloru', e.target.value);
    setPlayerColor(e.target.value);
  };

  const newPlayer = {
    id: `${newPlayerID}`,
    name: playerName,
    icon: playerCharacter,
    color: playerColor,
    level: 1,
    title: '',
    badges: [],
    xp: 0,
    isCurrent: false
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Dodaję gracza o imieniu ${playerName}, który wybrał postać ${playerCharacter} i kolor ${playerColor}`);
    dispatch(addNewPlayer(newPlayer));
    setIsActive(!isActive);
  };

  if(!isActive) {
    return(
      <button className={clsx(styles.form__btn, 'styles.form__btn--add')} onClick={() => setIsActive(!isActive)}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </button>
    );
  } else {
      return(
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <fieldset className={styles.form__section}>
        <legend>Wpisz swoje imię</legend>
        <input className={styles.form__input} type='text' id='name' name='playerName' value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
      </fieldset>
      <fieldset className={styles.form__section}>
        <legend>Wybierz swoją postać</legend>
        {characters.map(
          character => 
          <div key={character.id}>
            <label htmlFor={character.name}>
              <img className={styles.form__image} src={`${process.env.PUBLIC_URL}/images/${character.icon}`} alt={`${character.name} icon`} />
            </label>
            <input type='radio' id={character.name} name='character' value={character.icon} onChange={(e) => handleChangeCharacter(e)} ></input>
          </div>
        )}
      </fieldset>
      <fieldset className={styles.form__section}>
        <legend>Wybierz swój kolor</legend>
          <input className={styles.form__input} type='color' name='playerColor' onChange={(e) => handleChangeColor(e)} ></input>
          {/* {colors.map(
            color => 
            <div key={color}>
              <label htmlFor={color}>
                <div className={styles.form__color} />
              </label>
              <input type='radio' id={color} name='color' value={color} onChange={(e) => handleChangeColor(e)} ></input>
            </div>
          )} */}
      </fieldset>
      <button className={styles.form__btn} >Dodaj nowego gracza</button>
    </form>
  );

  }
};

export default AddPlayerForm;