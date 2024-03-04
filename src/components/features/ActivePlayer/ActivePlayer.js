import styles from '../ActivePlayer/ActivePlayer.module.scss';
import { Link } from 'react-router-dom';
import { useGetLevelsQuery } from "../../../api/apiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from "../ProgressBar/ProgressBar";
import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';

const ActivePlayer = ({ user, player }) => {

  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery(); 
  console.log(user, player);
  let playerLevel;
  if (levelsOK) {
    [ playerLevel ] = levels.filter( level => player.level === level.id);
  }

  if (playerLevel) {
    return(
    <div className={styles.active}>
      <div className={styles.active__icon}>
        <Link to={`/player/${user.id}`} >
          <PlayerIcon activePlayer={user} player={player} />
        </Link>
      </div>
      <div className={styles.active__name}> {user.name} </div>
      <div className={styles.active__btn}>
        <Link to={`/game/${user.id}`}>
          <FontAwesomeIcon icon={faGamepad}></FontAwesomeIcon>
        </Link>
      </div>
      <div className={styles.active__bar}>
        <ProgressBar 
          user={user}
          player={player}
          levelUp={playerLevel.nextLevel} 
        />
      </div>
    </div>
    );
  }
};

export default ActivePlayer;