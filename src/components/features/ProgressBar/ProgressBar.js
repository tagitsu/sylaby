import styles from '../ProgressBar/ProgressBar.module.scss';
import { useState, useEffect } from 'react';
import appUtils from '../../../utils/appUtils';

const ProgressBar = ({ user, levelUp, content }) => {

  const [ activePlayer, setActivePlayer ] = useState();

  useEffect(() => {
    appUtils.getActivePlayer(user, setActivePlayer);
  }, []);

  const barWidth = (((activePlayer?.xp) / (levelUp)) * 100) + '%';
  const root = document.querySelector(':root');
  root.style.setProperty('--player-xp', barWidth);
  root.style.setProperty('--player-color', activePlayer?.color);

  return(
    <div className={styles.prog}>
      <div className={styles.prog__container}>
        <div className={styles.prog__bar}>
          <span className={styles.prog__points}>{content}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;