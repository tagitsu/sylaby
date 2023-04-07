import { useSelector } from "react-redux";
import { useState } from 'react';
import styles from './GameSyllablesEasy.module.scss';
import clsx from "clsx";
import utils from '../../../utils/gameSyllablesEasyUtils';
import { useParams } from 'react-router-dom';
import { useGetPlayersQuery, useGetSyllablesQuery } from "../../../api/apiSlice";

// API - dodawanie punktów xp do profilu garcza - playerSlice

const GameSyllablesEasy = () => {

  const { data: syllables } = useGetSyllablesQuery();
  const { data: players } = useGetPlayersQuery();
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


  const addPoints = () => {
    console.log('dodaję punty graczowi')
  };

  const submitSolution = (e) => {
    e.preventDefault();
    for (let i = 0; i < answers.length; i++) {
      if (syllable1Words.includes(answers[i])) {
        console.log(`game easy - moja odpowiedź ${answers[i]} jest poprawna`);
        /* dodaj punkty */(addPoints({ id: activePlayer.id, xp: 1 }))
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
                  type='radio' 
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

export default GameSyllablesEasy;