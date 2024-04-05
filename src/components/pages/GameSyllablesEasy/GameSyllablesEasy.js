import { useState } from 'react';
import styles from './GameSyllablesEasy.module.scss';
import utils from '../../../utils/gameSyllablesEasyUtils';
import { useGetSyllablesQuery, useGetLevelsQuery } from "../../../api/apiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import Button from '../../common/Button/Button';

const GameSyllablesEasy = ({ user, player }) => {

  const { data: syllables, isSuccess: syllablesOK } = useGetSyllablesQuery();
  
  const [ syllable1, setSyllable1 ] = useState('');
  const [ syllable1Words, setSyllable1Words ] = useState([]);
  const [ syllables2, setSyllables2 ] = useState([]);
  const [ word, setWord ] = useState('');
  const [ answer, setAnswer ] = useState('');
  const [ showResult, setShowResult ] = useState('');

  return(
      <div className={styles.easy} >
        { syllable1 ? 
          <section className={styles.easy__board}>
            <div className={styles.easy__first}> {syllable1} </div>
            <form className={styles.easy__last}>
              {syllables2.map( syllable2 => 
                  <input 
                  key={syllable2}
                  value={syllable2}
                  readOnly
                  className={styles.easy__task}
                  onClick={(e) => utils.submitSolution(syllable1Words, answer, setAnswer, syllable1, e.target.value, setShowResult)}
                  />
              )}
            </form>
            <div className={clsx(styles.easy__answer, (showResult === 'correct') && styles.easy__correct, (showResult === 'incorrect') && styles.easy__incorrect)}>
              {answer}
            </div>
            { answer && 
              <button 
                onClick={() => 
                  utils.endGameTurn(
                    player.id, 
                    setSyllable1, 
                    setSyllable1Words, 
                    setSyllables2, 
                    setAnswer, 
                    setWord, 
                    showResult, 
                    setShowResult
                  )
                } 
                className={styles.easy__next} 
              >
              <p><FontAwesomeIcon icon={faArrowRight} /></p>
              </button>
            }

          </section>
          :
          <Button 
            onClick={(e) => utils.setGameTurn(e, syllables, syllables2, setWord, setSyllable1, setSyllable1Words)} 
            content={<FontAwesomeIcon icon={faPlay} />}
          />
            
        }

      </div>
  );
};

export default GameSyllablesEasy;