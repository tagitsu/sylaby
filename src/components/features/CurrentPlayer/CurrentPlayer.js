import { useSelector, useDispatch } from "react-redux";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from '../CurrentPlayer/CurrentPlayer.module.scss';
import { Link } from 'react-router-dom';
import { levelUp } from '../../../redux/player/playerSlice';
import { useParams } from 'react-router-dom';

const CurrentPlayer = () => {
  const dispatch = useDispatch();

  const activePlayerID = useParams();
  const levels = useSelector(state => state.levels.levels);
  const { players } = useSelector(state => state.player);
  const [ activePlayer ] = players.filter(player => player.id === activePlayerID.id);
  
  console.log('current - players', players);
  console.log('current - active player ID', activePlayerID.id , typeof activePlayerID.id);
  console.log('current - active player', activePlayer);


  if(!activePlayer) {
    return(
      <div></div>
    );
  } else {
    const [ currentLevel ] = levels.filter(levelItem => levelItem.value === activePlayer.level);

    if(activePlayer.xp >= currentLevel.xpToLvlUp) {
      dispatch(levelUp(currentLevel.badge)); // dodaje +1 do wartości level aktywnego gracza
    }
  
    return(
    <div className={styles.current}>
      <Link to={`/player/${activePlayer.id}`}>
        <PlayerIcon className={styles.current__item} icon={activePlayer.icon} name={activePlayer.name} />
      </Link>
      <div className={styles.current__xpBar}>
        <ProgressBar className={styles.current__item} xp={activePlayer.xp} levelUp={currentLevel.xpToLvlUp} />
        <p className={styles.current__item} >{activePlayer.xp}/{currentLevel.xpToLvlUp}</p>
      </div>
    </div>
    );
  }
  
};

export default CurrentPlayer;