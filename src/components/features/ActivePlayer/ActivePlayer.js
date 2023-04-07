import { useSelector } from "react-redux";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from '../ActivePlayer/ActivePlayer.module.scss';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useGetPlayersQuery } from "../../../api/apiSlice";

const ActivePlayer = () => {

  const { playerID } = useParams();
  const { data: players } = useGetPlayersQuery();
  console.log('active player comp - players', players);
  console.log('active player comp - player param', playerID);
  //const [ activePlayer ] = players.filter( player => player.id === activePlayerParam);
  

  // tylko do testu
  const activePlayer = undefined;

  if(activePlayer === undefined) {
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