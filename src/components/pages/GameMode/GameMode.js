import { Link, useParams } from 'react-router-dom';
import styles from './GameMode.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from '@fortawesome/free-solid-svg-icons';
import ActivePlayer from '../../features/ActivePlayer/ActivePlayer';

const GameMode = () => {

  const activePlayer = useParams();

  return(
    <div className={styles.mode}>
      <ActivePlayer id={activePlayer.id} />
      <h1 className={styles.mode__title}>Wybierz poziom trudności</h1>
      <div className={styles.mode__btns}>
        <Link 
          to={`/game/easysyllables/${activePlayer.id}`} 
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