import { useState } from 'react';
import styles from './GameSyllablesEasy.module.scss';
import utils from '../../../utils/gameSyllablesEasyUtils';
import playerUtils from '../../../utils/playerUtils';
import { useGetPlayersQuery, useGetSyllablesQuery, useUpdatePlayerMutation, useGetLevelsQuery } from "../../../api/apiSlice";
import ActivePlayer from '../../features/ActivePlayer/ActivePlayer';
import ButtonOK from '../../common/ButtonOK/ButtonOK';
import Button from '../../common/Button/Button';
import Tips from '../../views/Tips/Tips';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faS } from '@fortawesome/free-solid-svg-icons';

const GameSyllablesEasy = () => {

  const { data: syllables, isSuccess: syllablesOK } = useGetSyllablesQuery();
  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();

  const [ updatePlayer ] = useUpdatePlayerMutation();

  const [ syllable1, setSyllable1 ] = useState('');
  const [ syllable1Words, setSyllable1Words ] = useState([]);
  const [ syllables2, setSyllables2 ] = useState([]);
  const [ word, setWord ] = useState('');
  const [ answer, setAnswer ] = useState('');
  const [ hidden, setHidden ] = useState(false);
  const [ points, setPoints ] = useState(0);
  const [ tip, setTip ] = useState(false);
 
  let activePlayer, playerLevel, nextLevel;
  if (playersOK && levelsOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
    [ nextLevel ] = levels.filter( level => activePlayer.level + 1 === level.id);
    if (activePlayer.xp >= playerLevel.nextLevel) { playerUtils.levelUp(updatePlayer, activePlayer, nextLevel) }
  }

  return(
      <div className={styles.easy} >
        <ActivePlayer />
        { !syllable1 && 
          <Tips 
            content={<p>Naciśnij przycisk <span className={styles.info}>START</span>, który wylosuje zestaw sylab. Do <span className={clsx(styles.info, styles.info__first)}>pierwszej</span> sylaby dopasuj <span className={clsx(styles.info, styles.info__second)}>drugą</span> tak aby razem stworzyły <span className={clsx(styles.info, styles.info__word)}>słowo</span>. Jeśli chcesz potwierdzić swoją odpowiedź, kliknij przycisk <span className={clsx(styles.info, styles.info__ok)}>OK</span>.</p>} 
            onClick={() => setTip(!tip)}
            tip={tip}
          /> 
        }
        { !syllable1 && <Button 
          name='setupBtn'
          onClick={(e) => utils.setGameTurn(e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words, setHidden)} 
          content='Start'
        /> }
        {
          syllable1 && 
          <section className={styles.easy__board}>
            <div className={styles.easy__first}>{syllable1}</div>
            <form className={styles.easy__last}>
              {syllables2.map( syllable2 => 
                <div className={styles.easy__task} key={syllable2}>
                  <input 
                  value={syllable2}
                  readOnly
                  className={styles.easy__task}
                  onClick={(e) => setAnswer(`${syllable1}${e.target.value}`)}
                  />
                </div>
              )}
            </form>
            <div className={styles.easy__answer}>
              {answer}
            </div>
          </section>
        }
        {
          answer && 
          <ButtonOK 
            onClick={(e) => utils.submitSolution(e, syllable1Words, answer, setAnswer, setSyllable1, setSyllable1Words, setSyllables2, word, setWord, setHidden, points, setPoints, activePlayer, updatePlayer)} 
            className={styles.easy__btn} 
          />
        }
      </div>
  );
};

export default GameSyllablesEasy;