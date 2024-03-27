import styles from '../ProgressBar/ProgressBar.module.scss';
import { useGetLevelsQuery } from "../../../api/apiSlice";
import { useEffect, useState } from 'react';
import appUtils from '../../../utils/appUtils';
import playerUtils from '../../../utils/playerUtils';

const ProgressBar = ({ player }) => {

  const [points, setPoints ] = useState();

  useEffect(() => {
    appUtils.getPointsFromUser(player.id, setPoints);
  }, [player.points]);


  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery(); 
  let playerLevel, nextLevel;

  if (levelsOK) {
    [ playerLevel ] = levels.filter( level => player.level === level.id);
    [ nextLevel ] = levels.filter( level => (player.level + 1) === (level.id));
  }

  const barWidth = (((points) / (playerLevel?.nextLevel)) * 100) + '%';
  const root = document.querySelector(':root');
  root.style.setProperty('--player-xp', barWidth);

  if (points >= playerLevel?.nextLevel) { 
    playerUtils.levelUp(player.id, nextLevel);
  }

  return(
    <div className={styles.prog}>
      <div className={styles.prog__container}>
        <div className={styles.prog__bar}>
          <span className={styles.prog__points}>{points}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;