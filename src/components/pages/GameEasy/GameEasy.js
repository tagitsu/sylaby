import { useSelector } from "react-redux";
import { useState } from 'react';
import styles from './GameEasy.module.scss';
import clsx from "clsx";

const  GameEasy = () => {

  const { syllables } = useSelector(state => state.syllables);

  const [ randomFirstSyllable, setRandomFirstSyllable ] = useState('');
  const [ randomLastSyllables, setRandomLastSyllables ] = useState([]);
  const [ word, setWord ] = useState('');


  const getRandomSyllable = (e) => {
    e.preventDefault();
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
 
  return(
    <div className={styles.easy} >
      <button className={styles.easy__btn} onClick={(e) => getRandomSyllable(e)}>Losuj sylabę</button>
      <div className={styles.easy__board}>
        <div>
          <div className={clsx(styles.easy__syllable, styles.first)}>{randomFirstSyllable}</div>
        </div>
        <div>
          {randomLastSyllables.map( solution => 
            <div className={styles.easy__word} key={solution}></div>
          )}
        </div>
        <div>
          {randomLastSyllables.map( lastSyllable => 
            <div className={clsx(styles.easy__syllable, styles.last)} key={lastSyllable}>{lastSyllable}</div>
          )}
        </div>
      </div>
      <button className={styles.easy__btn} onClick={() => console.log('to jest moja odpowiedź')}>OK</button>

    </div>
  );
};

export default GameEasy;