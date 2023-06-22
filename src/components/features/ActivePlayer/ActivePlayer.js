import styles from '../ActivePlayer/ActivePlayer.module.scss';
import { Link } from 'react-router-dom';
import { useGetPlayersQuery, useGetLevelsQuery } from "../../../api/apiSlice";
import ProgressBar from "../ProgressBar/ProgressBar";
import Spinner from '../../common/Spinner/Spinner';

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

  console.log('level aktualnego gracza', playerLevel);

  //const barContent = `${activePlayer.xp}/${playerLevel.nextLevel}`;
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
    </div>
    );
  } else {
    return(<Spinner content='...wczytywanie aktywnego gracza' />)
  }
};

export default ActivePlayer;