import styles from '../ActivePlayer/ActivePlayer.module.scss';
import { Link } from 'react-router-dom';
import { useGetLevelsQuery } from "../../../api/apiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from "../ProgressBar/ProgressBar";
import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';

const ActivePlayer = ({ player }) => {

  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery(); 
  let playerLevel;
  if (levelsOK) {
    [ playerLevel ] = levels.filter( level => toString(player.level) === toString(level.id));
  }


  if (playerLevel) {
    return(
    <div className={styles.active}>
      <div className={styles.active__level}>
        <span className={styles.active__levelNumber}>{player?.level}</span>
      </div>
      <span className={styles.active__lvlText}>lvl</span>
      <div className={styles.active__bar}>
        <ProgressBar 
          player={player}
          levelUp={playerLevel.nextLevel} 
        />
      </div>
    </div>
    );
  }
};

export default ActivePlayer;