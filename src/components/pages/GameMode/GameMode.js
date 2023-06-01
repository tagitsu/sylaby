import { Link, useParams } from 'react-router-dom';
import styles from './GameMode.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from '@fortawesome/free-solid-svg-icons';
import ActivePlayer from '../../features/ActivePlayer/ActivePlayer';
import { useGetPlayersQuery } from "../../../api/apiSlice";
import GameButton from '../../common/GameButton/GameButton';
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
      <ActivePlayer activePlayer={activePlayer} />
      <h1 className={styles.mode__title}>Którą grę wybierasz?</h1>
      <div className={styles.mode__games}>
        <GameButton gameAddress='grocery' gameName='warzywniaczek' gameDifficulty={1} activePlayerID={activePlayerParam.id} />
        <Link 
          to={`/game/easysyllables/${activePlayerParam.id}`} 
          className={styles.mode__game}
          >
          <p>sy - la - by</p>
          <div>
            <FontAwesomeIcon className={styles.star} icon={faStar} />
            <FontAwesomeIcon className={styles.star} icon={faStar} />
          </div>
        </Link>
        <Link 
          to={`/game/number/${activePlayerParam.id}`} 
          className={styles.mode__game}
          >
          <p>brakująca liczba</p>
          <div>
            <FontAwesomeIcon className={styles.star} icon={faStar} />
            <FontAwesomeIcon className={styles.star} icon={faStar} />
            <FontAwesomeIcon className={styles.star} icon={faStar} />
          </div>
        </Link>
        <Link 
          to={`/game/dots/${activePlayerParam.id}`} 
          className={styles.mode__game}
          >
          <p>bańki mydlane</p>
          <div>
            <FontAwesomeIcon className={styles.star} icon={faStar} />
          </div>
        </Link>
      </div>
    </div>
    
  );
};

export default  GameMode;