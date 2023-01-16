import styles from './AddPlayerForm.module.scss';
import { useSelector } from 'react-redux';
import Button from '../../common/Button/Button';
import { useState } from 'react';

const AddPlayerForm = () => {

  const characters = useSelector(state => state.characters.characters);

  const colors = ['#FFC312', '#F79F1F', '#EE5A24'];

  console.log('characters', characters);


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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Dodaję gracza o imieniu ${playerName}, który wybrał postać ${playerCharacter} i kolor ${playerColor}`);

  };


  return(
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor='name'>Wpisz swoje imię</label>
      <input type='text' id='name' value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
      <fieldset>
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
      <fieldset>
        <legend>Wybierz swój kolor</legend>
          {colors.map(
            color => 
            <div key={color}>
              <label htmlFor={color}>
                <div className={styles.form__color} />
              </label>
              <input type='radio' id={color} name='color' value={color} onChange={(e) => handleChangeColor(e)} ></input>
            </div>
          )}
      </fieldset>
      <Button content='Dodaj nowego gracza' />
    </form>
  );
};

export default AddPlayerForm;