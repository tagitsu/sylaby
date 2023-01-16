import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from '../CurrentPlayer/CurrentPlayer.module.scss';

const CurrentPlayer = () => {
  const levels = useSelector(state => state.levels.levels);
  const players = useSelector(state => state.player.players);
  console.log('players and levels', players, levels);
  const currentPlayerID = useSelector(state => state.player.currentPlayer);
  console.log('selector current player ID', currentPlayerID);
  const [ activePlayer ] = players.filter(player => player.id === currentPlayerID);
  console.log('active player', activePlayer);

  if(!activePlayer) {
    return(
      <div></div>
    );
  } else {
    const [ currentLevel ] = levels.filter(levelItem => levelItem.value === activePlayer.level);
    console.log('current level of active player', currentLevel);
  
    return(
    <div className={styles.current}>
      <PlayerIcon className={styles.current__item} icon={activePlayer.icon} name={activePlayer.name} />
      <div className={styles.current__xpBar}>
        <ProgressBar className={styles.current__item} xp={activePlayer.xp} levelUp={currentLevel.xpToLvlUp} />
        <p className={styles.current__item} >{activePlayer.xp}/{currentLevel.xpToLvlUp}</p>
      </div>
    </div>
    );
  }
  
};

export default CurrentPlayer;