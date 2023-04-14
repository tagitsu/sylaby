import { Link, useParams } from 'react-router-dom';
import styles from './GameMode.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from '@fortawesome/free-solid-svg-icons';
import ActivePlayer from '../../features/ActivePlayer/ActivePlayer';
import { useGetPlayersQuery } from "../../../api/apiSlice";

const GameMode = () => {

  const { data: players, isSuccess } = useGetPlayersQuery();
  const activePlayerParam = useParams();
  let activePlayer;
  if (isSuccess) {
      console.log('game mode', players, activePlayerParam.id);
      [ activePlayer ] = players.filter( player => player.isActive);
      console.log('game mode - active', activePlayer);
  }

  return(
    <div className={styles.mode}>
      <ActivePlayer id={activePlayerParam.id} />
      <h1 className={styles.mode__title}>Wybierz grę</h1>
      <div className={styles.mode__btns}>
        <Link 
          to={`/game/easysyllables/${activePlayerParam.id}`} 
          className={clsx(styles.mode__btn, styles.mode__btnEasy)}
          >
          <p>sylaby</p>
          <FontAwesomeIcon className={styles.star} icon={faStar} />
          <FontAwesomeIcon className={styles.star} icon={faStar} />
        </Link>
        <Link 
          to={`/game/number/${activePlayerParam.id}`} 
          className={clsx(styles.mode__btn, styles.mode__btnEasy)}
          >
          <p>brakująca liczba</p>
          <FontAwesomeIcon className={styles.star} icon={faStar} />
          <FontAwesomeIcon className={styles.star} icon={faStar} />
          <FontAwesomeIcon className={styles.star} icon={faStar} />
        </Link>
        <Link 
          to={`/game/dots/${activePlayerParam.id}`} 
          className={clsx(styles.mode__btn, styles.mode__btnEasy)}
          >
          <p>ile kropek?</p>
          <FontAwesomeIcon className={styles.star} icon={faStar} />
        </Link>
      </div>
    </div>
    
  );
};

export default  GameMode;