import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './GameMode.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { getSyllablesAsync } from '../../../redux/syllables/syllablesSlice';

// API - pobieranie sylab do magazynu - syllablesSlice

const GameMode = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSyllablesAsync())
  }, [dispatch]);

  const activePlayer = useParams();

  return(
    <div className={styles.mode}>
      <h1 className={styles.mode__title}>Wybierz poziom trudności</h1>
      <div className={styles.mode__btns}>
        <Link 
          to={`/player/${activePlayer.id}/game/easy`} 
          className={clsx(styles.mode__btn, styles.mode__btnEasy)}
          >
          <p>łatwy</p>
          <FontAwesomeIcon className={styles.star} icon={faStar} />
        </Link>
        <Link 
          to={`/player/${activePlayer.id}/game/hard`} 
          className={clsx(styles.mode__btn, styles.mode__btnHard)}
          >
          <p>trudny</p>
          <FontAwesomeIcon className={styles.star} icon={faStar} />
          <FontAwesomeIcon className={styles.star} icon={faStar} />
        </Link>
      </div>
    </div>
    
  );
};

export default  GameMode;