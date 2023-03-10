import styles from './AddPlayerForm.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addNewPlayer } from '../../../redux/player/playerSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { addPlayerAsync } from '../../../redux/player/playerSlice';

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
  
  //const colors = ['#FFC312', '#F79F1F', '#EE5A24'];


  const playersAmount = useSelector(state => state.player.players.length);

  const newPlayerID = playersAmount + 1;

  const [ playerName, setPlayerName ] = useState('');
  const [ playerCharacter, setPlayerCharacter ] = useState('');
  const [ playerColor, setPlayerColor ] = useState('');

  const root = document.querySelector(':root');
  root.style.setProperty('--radio-color', playerColor);


  const handleChangeCharacter = (e) => {
    setPlayerCharacter(e.target.value);
  };

  const handleChangeColor = (e) => {
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
    console.log(`Dodaj?? gracza o imieniu ${playerName}, kt??ry wybra?? posta?? ${playerCharacter} i kolor ${playerColor}`);
    dispatch(addPlayerAsync({
      id: `${newPlayerID}`,
      name: playerName,
      icon: playerCharacter,
      color: playerColor,
      level: 1,
      title: '',
      badges: [],
      xp: 0,
      isCurrent: false
    }));
    setIsActive(!isActive);
  };

  if(!isActive) {
    return(
      <button className={clsx(styles.form__btn)} onClick={() => setIsActive(!isActive)}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </button>
    );
  } else {
      return(
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <fieldset className={styles.form__section}>
        <legend>Wpisz swoje imi??</legend>
        <input className={styles.form__input} type='text' id='name' name='playerName' value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
      </fieldset>
      <fieldset className={styles.form__section}>
        <legend>Wybierz swoj?? posta??</legend>
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
        <legend>Wybierz sw??j kolor</legend>
          <input className={clsx(styles.form__input, styles.form__inputColor)} type='color' name='playerColor' onChange={(e) => handleChangeColor(e)} ></input>
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
      <button className={styles.form__btnSubmit} >Dodaj nowego gracza</button>
    </form>
  );

  }
};

export default AddPlayerForm;