import styles from '../ActivePlayer/ActivePlayer.module.scss';
import { useGetLevelsQuery } from "../../../api/apiSlice";
import ProgressBar from "../ProgressBar/ProgressBar";

const ActivePlayer = ({ player }) => {

  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery(); 
  let playerLevel;
  if (levelsOK) {
    [ playerLevel ] = levels.filter( level => toString(player.level) === toString(level.id));
  }

  console.log(`activePlayer comp ${player.level}`);

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