import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from '../ActivePlayer/ActivePlayer.module.scss';
import { Link } from 'react-router-dom';
import { useGetPlayersQuery } from "../../../api/apiSlice";

const ActivePlayer = (props) => {

  const { data: players, isSuccess } = useGetPlayersQuery();
  let activePlayer;
  if (isSuccess) {
    [activePlayer] = players.filter( player => player.isActive);
  }


  if(!activePlayer) {
    return(
      <div>Brak aktywnego garcza</div>
    );
  } else if (activePlayer) {
    return(
    <div className={styles.current}>
      <div> Aktywnym graczem jest {activePlayer.name}. Na levelu {activePlayer.level} zdobył {activePlayer.xp} pkt </div>

      <Link to={`/player/${activePlayer.id}`} className={styles.current__item}>
        <PlayerIcon icon={activePlayer.icon} name={activePlayer.name} />
      </Link>

    </div>
    );
  }
};

export default ActivePlayer;