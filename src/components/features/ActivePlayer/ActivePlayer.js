import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from '../ActivePlayer/ActivePlayer.module.scss';
import { Link } from 'react-router-dom';
import { useGetPlayersQuery } from "../../../api/apiSlice";

const ActivePlayer = (props) => {

  const { data: players } = useGetPlayersQuery();
  console.log('active player comp - players', players);
  console.log('active player comp - player param', props.id);
  const [ activePlayer ] = players.filter( player => player.id === props.id);
  


  if(!activePlayer) {
    return(
      <div>Brak aktywnego garcza</div>
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