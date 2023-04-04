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

  const { syllables } = useSelector(state => state.syllables);
  console.log('game easy - syllables length', syllables.length);
  const { players } = useSelector(state => state.player);
  console.log('game easy - all players', players);
  const activePlayerParam = useParams();
  const [ activePlayer ] = players.filter( player => player.id === activePlayerParam.id);
  console.log('game easy - active player ID', activePlayerParam.id);
  console.log('game easy - active player object', activePlayer);

  const [ syllable1, setSyllable1 ] = useState('');
  const [ syllable1Words, setSyllable1Words ] = useState([]);
  const [ syllables2, setSyllables2 ] = useState([]);
  const [ word, setWord ] = useState('');
  const [ answers, setAnswers ] = useState([]);
  const [ correctAnswers, setCorrectAnswers ] = useState([]);


  const submitSolution = (e) => {
    e.preventDefault();
    for (let i = 0; i < answers.length; i++) {
      if (syllable1Words.includes(answers[i])) {
        console.log(`game easy - moja odpowiedź ${answers[i]} jest poprawna`);
        dispatch(addPointsAsync({ id: activePlayer.id, xp: 1 }))
      } else {
        console.log(`game easy - moja odpowiedź ${answers[i]} jest błędna`)
      }
    }
    setSyllable1('');
    setSyllable1Words([]);
    setSyllables2([]);
    setWord('');
  };
  console.log('easy game - answers', answers);
  console.log('easy game - solution - correct answers', correctAnswers);

  return(
    <div className={styles.easy} >
      <button className={styles.easy__btn} onClick={(e) => utils.setGameTurn(e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words)}>Losuj</button>
      <section className={styles.easy__board}>
        <div className={clsx(styles.easy__first)}>{syllable1}</div>
          <form className={styles.easy__last} onSubmit={submitSolution}>
            {syllables2.map( syllable2 => 
              <div className={clsx(styles.easy__task)} key={syllable2}>
                <label className={clsx(styles.easy__checkboxLabel )}>
                  <input 
                  type='checkbox' 
                  name='lastSyllable'
                  className={clsx(styles.easy__checkboxInput)}
                  value={syllable2}
                  onChange={(e) => utils.createAnswer(e, answers, setAnswers, syllable1)}
                  >
                  </input>
                {syllable2}
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