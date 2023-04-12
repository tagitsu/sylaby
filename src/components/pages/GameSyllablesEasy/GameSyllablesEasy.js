import { useEffect, useState } from 'react';
import styles from './GameSyllablesEasy.module.scss';
import clsx from "clsx";
import utils from '../../../utils/gameSyllablesEasyUtils';
import { Link, useParams } from 'react-router-dom';
import { useGetPlayersQuery, useGetSyllablesQuery, useUpdatePlayerMutation } from "../../../api/apiSlice";
import ActivePlayer from '../../features/ActivePlayer/ActivePlayer';
import Button from '../../common/Button/Button';


const GameSyllablesEasy = () => {

  const { data: syllables } = useGetSyllablesQuery();
  const { data: players, isSuccess } = useGetPlayersQuery();
  let activePlayer;
  if (isSuccess) {
    console.log('game syllables easy', players);
    [ activePlayer ] = players.filter( player => player.isActive);
    console.log('game syllables easy - active', activePlayer);
  }
  const activePlayerParam = useParams();

  const [ updatePlayer ] = useUpdatePlayerMutation();
  // wskazywanie aktywnego gracza:
  // 1. wykorzystanie parametru z url i filtrowanie wszystkich graczy pobranych z api
  // 2. update gracza isActive na true wg parametru url

  const [ syllable1, setSyllable1 ] = useState('');
  const [ syllable1Words, setSyllable1Words ] = useState([]);
  const [ syllables2, setSyllables2 ] = useState([]);
  const [ word, setWord ] = useState('');
  const [ answer, setAnswer ] = useState('');
  const [ isHidden, setIsHidden ] = useState(false);
  const [ points, setPoints ] = useState(0);
 
  console.log('game syllables easy - points', points);

  console.log('game syllables easy - xp', activePlayer.xp);

  const gameOver = () => {
  let turnPoints = points + activePlayer.xp;
  console.log('punkty za grę', points, 'punkty gracza', turnPoints);
  updatePlayer({ ...activePlayer, xp: turnPoints, isActive: false });
  };

  
  
  return(
    <div className={styles.easy} >
      <ActivePlayer id={activePlayerParam.id} points={points} />
      <Button 
        name='setTurnBtn'
        onClick={(e) => utils.setGameTurn(e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words, setIsHidden)} 
        content='Wylosuj sylabę'
        hidden={isHidden}
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
          onClick={(e) => utils.submitSolution(e, syllable1Words, answer, setSyllable1, setSyllable1Words, setSyllables2, setWord, setIsHidden, points, setPoints)} 
          className={styles.easy__btn} content='OK' 
        />
      </section>
      <Link to='/playerslist' onClick={gameOver}>Zakończ grę</Link>
    </div>
  );
};

export default GameSyllablesEasy;