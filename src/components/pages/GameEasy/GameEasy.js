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
  const [ firstSyllableWords ,setFirstSyllableWords ] = useState([]);
  const [ randomLastSyllables, setRandomLastSyllables ] = useState([]);
  const [ word, setWord ] = useState('');
  const [ answers, setAnswers ] = useState([]);
  const [ solution, setSolution ] = useState([]);


  const [ drawButtonText, setDrawButtonText ] = useState('Losuj sylabę');


  const getRandomSyllable = () => {
    const randomSyllableId = Math.floor(Math.random() * syllables.length);
    const [ randomSyllableObj ] = syllables.filter( syllable => syllable.id == randomSyllableId);
    if(randomSyllableObj.words.length > 0) {
      setRandomFirstSyllable(randomSyllableObj.name);
      console.log('słowa wylosowanej sylaby', randomSyllableObj.words);
      setFirstSyllableWords(randomSyllableObj.words);
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


  const createAnswer = (e) => {
    console.log('wybór gracza', e.target);
    console.log('czy checkbox jest wybrany', e.target.checked);
    if(e.target.checked) {
      setAnswers( answers => [...answers, `${randomFirstSyllable}${e.target.value}`]);
    } else {
      const uncheckedAnswer = `${randomFirstSyllable}${e.target.value}`;
      setAnswers( answers.filter( el => el !== uncheckedAnswer));
    }
  };
  console.log('tablica z odpowiedziami', answers);


  const submitSolution = (e) => {
    e.preventDefault();
    console.log('tablica słów sylaby-1', firstSyllableWords);
    console.log('tablica odpowiedzi gracza', answers);
    // setRandomFirstSyllable('');
    // setRandomLastSyllables('');

    console.log(`moja odpowiedź to ${solution}`);
  }



  return(
    <div className={styles.easy} >
      <button className={styles.easy__btn} onClick={getRandomSyllable}>{drawButtonText}</button>
      <div className={clsx(styles.easy__syllable, styles.first)}>{randomFirstSyllable}</div>
      <div className={styles.easy__board}>
        <form onSubmit={(e) => submitSolution(e)}>
          {randomLastSyllables.map( lastSyllable => 
            <div className={clsx(styles.easy__task)} key={lastSyllable}>
              <input 
              type='checkbox' 
              id={lastSyllable} 
              name='lastSyllable'
              value={lastSyllable}
              className={clsx(styles.easy__check)} 
              onChange={(e) => createAnswer(e)}
              >
              </input>
              
              <label 
              htmlFor={lastSyllable} 
              className={clsx(styles.easy__syllable, styles.last)} 
              >
              {lastSyllable}
              </label>
            </div>
          )}
          <button 
          type='submit' 
          className={styles.easy__btn}
          >
          OK
          </button>
        </form>
      </div>

    </div>
  );
};

export default GameEasy;