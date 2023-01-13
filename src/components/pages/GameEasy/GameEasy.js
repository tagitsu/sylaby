import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import styles from './GameEasy.module.scss';
import clsx from "clsx";
import { useParams } from 'react-router-dom';
import { chooseCurrentPlayer } from '../../../redux/player/playerSlice';


const GameEasy = () => {
  const dispatch = useDispatch();

  const player = useParams();
  dispatch(chooseCurrentPlayer(player.id));

  const { syllables } = useSelector(state => state.syllables);

  const [ randomFirstSyllable, setRandomFirstSyllable ] = useState('');
  const [ randomLastSyllables, setRandomLastSyllables ] = useState([]);
  const [ word, setWord ] = useState('');


  const getRandomSyllable = () => {
    const randomSyllableId = Math.floor(Math.random() * syllables.length);
    const [ randomSyllableObj ] = syllables.filter( syllable => syllable.id == randomSyllableId);
    if(randomSyllableObj.words.length > 0) {
      setRandomFirstSyllable(randomSyllableObj.name);
      const wordIndex = Math.floor(Math.random() * randomSyllableObj.words.length);
      const word = randomSyllableObj.words[wordIndex];
      setWord(word);
      const lastSyllable = word.substring(2);
      randomLastSyllables.push(lastSyllable);
      for (let i = 0; i < 4; i++) {
        const randomSyllableId = Math.floor(Math.random() * syllables.length);
        const [ randomSyllableObj ] = syllables.filter( syllable => syllable.id == randomSyllableId);
        randomLastSyllables.push(randomSyllableObj.name);
      }
      randomLastSyllables.sort();
    } else { getRandomSyllable() }
    // [TODO] blokuj przycisk
  }

  const lastSyllableHandle = (e, lastSyllable) => {
    e.preventDefault();
    console.log('nacisnęłam sylabę', lastSyllable);
    console.log('nacisnęłam target value', e.target.htmlFor);
    //if(lastSyllable === e.target.htmlFor) {
      console.log('kliknięta sylaba to', e.target.data, lastSyllable);
      console.log(`słowo to ${randomFirstSyllable}${e.target.htmlFor}`);
    //}
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setRandomFirstSyllable('');
    setRandomLastSyllables('');
    setWord('');
    console.log(`moja odpowiedź to ${word}`)
  }

 
  return(
    <div className={styles.easy} >
      <button className={styles.easy__btn} onClick={getRandomSyllable}>Losuj sylabę</button>
      <div className={clsx(styles.easy__syllable, styles.first)}>{randomFirstSyllable}</div>
      <div className={styles.easy__board}>
        <form onSubmit={(e) => handleSubmit(e)}>
          {randomLastSyllables.map( lastSyllable => 
            <div className={clsx(styles.easy__task)} key={lastSyllable}>
              <div className={clsx(styles.easy__word)}></div>
              <input 
              type='checkbox' 
              id={lastSyllable} 
              className={clsx(styles.easy__check)} 
              checked
              ></input>
              <label 
              htmlFor={lastSyllable} 
              className={clsx(styles.easy__syllable, styles.last)} 
              onClick={(e) => lastSyllableHandle(e, lastSyllable)}
              >
              {lastSyllable}
              </label>
            </div>
          )}
          <button type='submit' className={styles.easy__btn} >OK</button>

        </form>
      </div>

    </div>
  );
};

export default GameEasy;