import { useSelector } from "react-redux";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from '../ActivePlayer/ActivePlayer.module.scss';
import { Link } from 'react-router-dom';

const ActivePlayer = () => {

  const { players } = useSelector(state => state.player);
  const [ activePlayer ] = players.filter( player => player.isActive === true);
  
  console.log('current - players', players);
  console.log('current - active player', activePlayer);


  if(!activePlayer) {
    return(
      <div>brak aktywnego garcza</div>
    );
  } else {
    return(
    <div className={styles.current}>
      <div> Aktywnym graczem jest { activePlayer.name} </div>
      <Link to={`/player/${activePlayer.id}`}>
        <PlayerIcon className={styles.current__item} icon={activePlayer.icon} name={activePlayer.name} />
      </Link>
      <div>Zdobyte punkty: {activePlayer.xp} </div>
    </div>
    );
  }
};

export default ActivePlayer;