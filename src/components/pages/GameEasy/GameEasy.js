import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import styles from './GameEasy.module.scss';
import clsx from "clsx";
import { useParams } from 'react-router-dom';
import { addPoints } from '../../../redux/player/playerSlice';
import utils from '../../../utils/gameEasyUtils';


const GameEasy = () => {
  const dispatch = useDispatch();

  const player = useParams();
  const syllables = useSelector(state => state.syllables.syllables);

  const [ randomFirstSyllable, setRandomFirstSyllable ] = useState('');
  const [ firstSyllableWords, setFirstSyllableWords ] = useState([]);
  const [ randomLastSyllables, setRandomLastSyllables ] = useState([]);
  const [ word, setWord ] = useState('');
  const [ answers, setAnswers ] = useState([]);
  const [ drawButtonText, setDrawButtonText ] = useState('Losuj sylabę');



  const submitSolution = (e) => {
    e.preventDefault();
    answers.map( answer => {
      if(firstSyllableWords.indexOf(answer) >= 0) {
        dispatch(addPoints(1))
      }
    });
    setRandomFirstSyllable('');
    setFirstSyllableWords([]);
    setRandomLastSyllables([]);
    setWord('');
    


    
  };

  return(
    <div className={styles.easy} >
      <button className={styles.easy__btn} disabled={false} onClick={(e) => utils.getRandomSyllable(e, syllables, randomLastSyllables, setWord, setRandomFirstSyllable, setFirstSyllableWords)}>{drawButtonText}</button>
      <section className={styles.easy__board}>
        <div className={clsx(styles.easy__first)}>{randomFirstSyllable}</div>
          <form className={styles.easy__last} onSubmit={(e) => submitSolution(e)}>
            {randomLastSyllables.map( lastSyllable => 
              <div className={clsx(styles.easy__task)} key={lastSyllable}>
                <input 
                type='checkbox' 
                id={lastSyllable} 
                name='lastSyllable'
                value={lastSyllable}
                onChange={(e) => utils.createAnswer(e, answers, setAnswers, randomFirstSyllable)}
                >
                </input>
                <label 
                htmlFor={lastSyllable} 
                className={clsx(styles.easy__check)} 
                >
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