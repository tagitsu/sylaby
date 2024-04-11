import styles from '../ProgressBar/ProgressBar.module.scss';
import { useGetLevelsQuery } from "../../../api/apiSlice";
import { useEffect, useState } from 'react';
import appUtils from '../../../utils/appUtils';
import playerUtils from '../../../utils/playerUtils';
import Modal from '../../common/Modal/Modal';

const ProgressBar = ({ player }) => {

  const [ points, setPoints ] = useState();
  const [ levelUp, setLevelUp ] = useState(true);

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
    setLevelUp(true);
  }

  const levelUpModal = 
  <article className={styles.levelup}>
    <p className={styles.levelup__text}> Awansujesz na poziom {nextLevel.id}.</p>
    <p className={styles.levelup__text}> Twoja nowa odznaka </p>
    <div className={styles.levelup__badge}>
      <img src={`${process.env.PUBLIC_URL}/images/badges/${nextLevel.badge}.png`} alt={`${nextLevel.badge} icon`} />
    </div>
  </article>

  if (!levelUp) {
    return(
      <div className={styles.prog}>
        <div className={styles.prog__container}>
          <div className={styles.prog__bar}>
            <span className={styles.prog__points}>{points}</span>
          </div>
        </div>
      </div>
    );
  } else if (levelUp) {
    return (<Modal title={`Gartulacje!`} content={levelUpModal} close={() => setLevelUp(false)} />)
  }
  
};

export default ProgressBar;