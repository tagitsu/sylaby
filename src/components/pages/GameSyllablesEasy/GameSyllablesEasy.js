import { useState, useEffect } from 'react';
import styles from './GameSyllablesEasy.module.scss';
import utils from '../../../utils/gameSyllablesEasyUtils';
import playerUtils from '../../../utils/playerUtils';
import { useGetSyllablesQuery, useGetLevelsQuery } from "../../../api/apiSlice";
import ActivePlayer from '../../features/ActivePlayer/ActivePlayer';
import ButtonOK from '../../common/ButtonOK/ButtonOK';
import Button from '../../common/Button/Button';
import Tips from '../../views/Tips/Tips';
import clsx from 'clsx';
import appUtils from '../../../utils/appUtils';

const GameSyllablesEasy = ({ user }) => {

  const { data: syllables, isSuccess: syllablesOK } = useGetSyllablesQuery();
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  const [ activePlayer, setActivePlayer ] = useState();


  useEffect( () => {
    appUtils.getActivePlayer(user, setActivePlayer);
  }, [user]);
  
  let playerLevel, nextLevel;
  if (activePlayer && levelsOK) {
    [ playerLevel ] = (levels.filter( level => activePlayer.level === level.id));
    [ nextLevel ] = (levels.filter( level => activePlayer.level + 1 === level.id));
  }

  if (activePlayer?.xp >= playerLevel?.nextLevel) { 
    playerUtils.levelUp(user, activePlayer.id, nextLevel);
  }


  const [ syllable1, setSyllable1 ] = useState('');
  const [ syllable1Words, setSyllable1Words ] = useState([]);
  const [ syllables2, setSyllables2 ] = useState([]);
  const [ word, setWord ] = useState('');
  const [ answer, setAnswer ] = useState('');
  const [ tip, setTip ] = useState(false);
 
  console.log(
    'gra w sylaby',
    'uzytkownik', user,
    'aktywny gracz', activePlayer,
    'levelup arg', activePlayer?.id, nextLevel
  );

  return(
      <div className={styles.easy} >
        <ActivePlayer user={user} activePlayer={activePlayer}/>
        { !syllable1 && 
          <Tips 
            content={<p>Naciśnij przycisk <span className={styles.info}>START</span>, który wylosuje zestaw sylab. Do <span className={clsx(styles.info, styles.info__first)}>pierwszej</span> sylaby dopasuj <span className={clsx(styles.info, styles.info__second)}>drugą</span> tak aby razem stworzyły <span className={clsx(styles.info, styles.info__word)}>słowo</span>. Jeśli chcesz potwierdzić swoją odpowiedź, kliknij przycisk <span className={clsx(styles.info, styles.info__ok)}>OK</span>.</p>} 
            onClick={() => setTip(!tip)}
            tip={tip}
          /> 
        }
        { !syllable1 && <Button 
          name='setupBtn'
          onClick={(e) => utils.setGameTurn(e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words)} 
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
            onClick={() => 
              utils.submitSolution(
                syllable1Words,
                answer, 
                setAnswer, 
                setSyllable1, 
                setSyllable1Words, 
                setSyllables2, 
                setWord, 
                user,
                activePlayer.id, 
              )
            } 
            className={styles.easy__btn} 
          />
        }
        {/* <button onClick={addPointToPlayer}>dodaj punkt</button> */}
      </div>
  );
};

export default GameSyllablesEasy;