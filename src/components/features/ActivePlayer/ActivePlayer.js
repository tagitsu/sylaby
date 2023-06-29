import styles from '../ActivePlayer/ActivePlayer.module.scss';
import { Link } from 'react-router-dom';
import { useGetPlayersQuery, useGetLevelsQuery } from "../../../api/apiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faGamepad } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from "../ProgressBar/ProgressBar";
import Spinner from '../../common/Spinner/Spinner';
import Button from '../../common/Button/Button';

const ActivePlayer = () => {

  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery(); 
  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  
  let activePlayer;
  if (playersOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
  }

  let playerLevel;
  if (levelsOK && activePlayer) {
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
  }

  if (activePlayer && playerLevel) {
    return(
    <div className={styles.current}>
      <Link to={`/player/${activePlayer.id}`}>
        <img className={styles.current__icon} src={`${process.env.PUBLIC_URL}/images/characters/${activePlayer.icon}`} alt={`ikona ${activePlayer.icon}`} />
      </Link>
      <div className={styles.current__bar}>
        <div className={styles.current__name}> {activePlayer.name} </div>
        <ProgressBar xp={activePlayer.xp} levelUp={playerLevel.nextLevel} content={activePlayer.xp} />
      </div>
      <div className={styles.current__play}>
        <Button
          name='gamesBtn'
          content={
            <Link to={`/game/${activePlayer.id}`}>
              <FontAwesomeIcon icon={faGamepad}></FontAwesomeIcon>
            </Link>
          }
        />
      </div>
    </div>
    );
  } else {
    return(<Spinner content='...wczytywanie aktywnego gracza' />)
  }
};

export default ActivePlayer;