import { useState, useEffect } from 'react';
import playerUtils from '../../../utils/playerUtils';
import appUtils from '../../../utils/appUtils';
import styles from '../ActivePlayer/ActivePlayer.module.scss';
import { useGetLevelsQuery } from "../../../api/apiSlice";
import ProgressBar from "../ProgressBar/ProgressBar";
import Modal from '../../common/Modal/Modal';

const ActivePlayer = ({ player }) => {

  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery(); 
  
  let playerLevel, nextLevel;
  if (levelsOK) {
    [ playerLevel ] = levels.filter( level => player.level === level.id );
    [ nextLevel ] = levels.filter( level => (player.level + 1) === (level.id));
  }
  const [ points, setPoints ] = useState();

  const handleLevelUp = () => {
    playerUtils.levelUp(player.id, nextLevel);
    appUtils.refreshPage();
  };

  useEffect(() => {
    appUtils.getPointsFromUser(player.id, setPoints);
  }, []);

  const levelUpModal = 
  <div className={styles.levelup}>
    <p className={styles.levelup__text}> Awansujesz na poziom {nextLevel?.id}.</p>
    <p className={styles.levelup__text}> Twoja nowa odznaka </p>
    <div className={styles.levelup__badge} onClick={handleLevelUp}>
      <img src={`${process.env.PUBLIC_URL}/images/badges/${nextLevel?.badge}.png`} alt={`${nextLevel?.badge} icon`} />
    </div>
  </div>

  if (points !== playerLevel?.nextLevel) {
    return(
    <div className={styles.active}>
      <div className={styles.active__badges}>
        { player.badges.map( badge => <img className={styles.active__badge} key={badge.name} src={`${process.env.PUBLIC_URL}/images/badges/${badge.name}.png`} alt={`${badge.name} icon`} />)}
      </div>
      <div className={styles.active__level}>
        <p className={styles.active__number}>{playerLevel?.id}</p>
        <p className={styles.active__text}>lvl</p>
      </div>
      <div className={styles.active__bar}>
        <ProgressBar 
          points={points}
          nextLevel={playerLevel?.nextLevel}
        />
      </div>
    </div>
    );
  } else if (points === playerLevel?.nextLevel) {
    return (<Modal title={`Gartulacje!`} content={levelUpModal} close={handleLevelUp} />)
  }
};

export default ActivePlayer;