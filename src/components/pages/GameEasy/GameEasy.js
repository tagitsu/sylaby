import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import styles from './GameEasy.module.scss';
import clsx from "clsx";
import { addPointsAsync } from "../../../redux/player/playerSlice";
import utils from '../../../utils/gameEasyUtils';
import { useParams } from 'react-router-dom';

// API - dodawanie punktów xp do profilu garcza - playerSlice

const GameEasy = () => {
  const dispatch = useDispatch();

  const syllables = useSelector(state => state.syllables.syllables);

  const activePlayer = useParams();
  console.log('game easy - active player ID', activePlayer.id);

  const [ randomFirstSyllable, setRandomFirstSyllable ] = useState('');
  const [ firstSyllableWords, setFirstSyllableWords ] = useState([]);
  const [ randomLastSyllables, setRandomLastSyllables ] = useState([]);
  const [ word, setWord ] = useState('');
  const [ answers, setAnswers ] = useState([]);
  const [ drawButtonText, setDrawButtonText ] = useState('Losuj sylabę');

  const submitSolution = (e, id) => {
    e.preventDefault();
    answers.map( answer => {
      if(firstSyllableWords.indexOf(answer) >= 0) {
        dispatch(addPointsAsync({ id: id, xp: 1 }))
      }
    });
    setRandomFirstSyllable('');
    setFirstSyllableWords([]);
    setRandomLastSyllables([]);
    setWord('');
  };

  return(
    <div className={styles.easy} >
      <button className={styles.easy__btn} disabled={false} onClick={(e) => utils.getRandomSyllable(e, syllables, randomLastSyllables, setWord, setRandomFirstSyllable, setFirstSyllableWords, setDrawButtonText)}>{drawButtonText}</button>
      <section className={styles.easy__board}>
        <div className={clsx(styles.easy__first)}>{randomFirstSyllable}</div>
          <form className={styles.easy__last} onSubmit={(e) => submitSolution(e, activePlayer.id)}>
            {randomLastSyllables.map( lastSyllable => 
              <div className={clsx(styles.easy__task)} key={lastSyllable}>
                <label className={clsx(styles.easy__checkboxLabel )}>
                  <input 
                  type='checkbox' 
                  name='lastSyllable'
                  className={clsx(styles.easy__checkboxInput)}
                  value={lastSyllable}
                  onChange={(e) => utils.createAnswer(e, answers, setAnswers, randomFirstSyllable)}
                  >
                  </input>
                {lastSyllable}
                </label>
              </div>
            )}
            <div>
              <button type='submit' className={styles.easy__btn}>OK</button>
            </div>
          </form>
      </section>
    </div>
  );
};

export default GameEasy;