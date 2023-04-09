import { useState } from 'react';
import styles from './GameSyllablesEasy.module.scss';
import clsx from "clsx";
import utils from '../../../utils/gameSyllablesEasyUtils';
import { useParams } from 'react-router-dom';
import { useGetPlayersQuery, useGetSyllablesQuery } from "../../../api/apiSlice";
import ActivePlayer from '../../features/ActivePlayer/ActivePlayer';
import Button from '../../common/Button/Button';

// API - dodawanie punktów xp do profilu garcza - playerSlice

const GameSyllablesEasy = () => {

  const { data: syllables } = useGetSyllablesQuery();
  const { data: players } = useGetPlayersQuery();
  const activePlayerParam = useParams();
  const [ activePlayer ] = players.filter( player => player.id === activePlayerParam.id);

  const [ syllable1, setSyllable1 ] = useState('');
  const [ syllable1Words, setSyllable1Words ] = useState([]);
  const [ syllables2, setSyllables2 ] = useState([]);
  const [ word, setWord ] = useState('');
  const [ answer, setAnswer ] = useState('');
  const [ isHidden, setIsHidden ] = useState(false);


 
  return(
    <div className={styles.easy} >
      <ActivePlayer id={activePlayer.id} />
      <Button 
        name='setTurnBtn'
        onClick={(e) => utils.setGameTurn(e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words, setIsHidden)} 
        content='Wylosuj sylabę'
        isHidden={isHidden}
      />
      <section className={styles.easy__board}>
        <div className={clsx(styles.easy__first)}>{syllable1}</div>
        <form className={styles.easy__last}>
          {syllables2.map( syllable2 => 
            <div className={clsx(styles.easy__task)} key={syllable2}>
                <input 
                value={syllable2}
                readOnly
                className={clsx(styles.easy__task)}
                onClick={(e) => setAnswer(`${syllable1}${e.target.value}`)}
                />
            </div>
          )}
        </form>
        <div className={clsx(styles.easy__first)}>
          {answer}
        </div>
        <Button 
          onClick={(e) => utils.submitSolution(e, syllable1Words, answer, setSyllable1, setSyllable1Words, setSyllables2, setWord, setIsHidden)} 
          className={styles.easy__btn} content='OK' ></Button>
      </section>
    </div>
  );
};

export default GameSyllablesEasy;