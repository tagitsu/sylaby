import { useEffect, useState } from 'react';
import styles from './GameSyllablesEasy.module.scss';
import clsx from "clsx";
import utils from '../../../utils/gameSyllablesEasyUtils';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useGetPlayersQuery, useGetSyllablesQuery, useUpdatePlayerMutation } from "../../../api/apiSlice";
import ActivePlayer from '../../features/ActivePlayer/ActivePlayer';
import Button from '../../common/Button/Button';


const GameSyllablesEasy = () => {

  const { data: syllables, isSuccess: syllablesOK, isError: syllablesERR, error, status } = useGetSyllablesQuery();
  const { data: players, isSuccess } = useGetPlayersQuery();
  let activePlayer;
  if (isSuccess) {
    [ activePlayer ] = players.filter( player => player.isActive);
  }
  if (syllablesOK) {
    console.log('game sylaby', syllables.length);
  } else if (syllablesERR) {
    console.log('game sylaby', error);
  } else {
    console.log('nadal coś nie tak z sylabami - status', status)
  }
  const activePlayerParam = useParams();

  const [ updatePlayer ] = useUpdatePlayerMutation();

  const [ syllable1, setSyllable1 ] = useState('');
  const [ syllable1Words, setSyllable1Words ] = useState([]);
  const [ syllables2, setSyllables2 ] = useState([]);
  const [ word, setWord ] = useState('');
  const [ answer, setAnswer ] = useState('');
  const [ hidden, setHidden ] = useState(false);
  const [ points, setPoints ] = useState(0);
 
  console.log('sylaby - punkty z tury', points);

  return(
    <>
      <ActivePlayer id={activePlayerParam.id} />
      <div className={styles.easy} >
        <Button 
          name='setTurnBtn'
          onClick={(e) => utils.setGameTurn(e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words, setHidden)} 
          content='Wylosuj sylabę'
          hidden={hidden}
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
          <div className={clsx(styles.easy__answer)}>
            {answer}
          </div>
          <Button 
            onClick={(e) => utils.submitSolution(e, syllable1Words, answer, setAnswer, setSyllable1, setSyllable1Words, setSyllables2, setWord, setHidden, points, setPoints, activePlayer, updatePlayer)} 
            className={styles.easy__btn} content='OK' 
          />
        </section>
    </div>
    <Button
      content={<Link to='/playerslist'>Zakończ grę</Link>}
    />


    </>
  );
};

export default GameSyllablesEasy;