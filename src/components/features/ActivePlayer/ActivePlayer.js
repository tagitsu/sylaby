import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from '../ActivePlayer/ActivePlayer.module.scss';
import { Link } from 'react-router-dom';
import { useGetPlayersQuery, useGetLevelsQuery } from "../../../api/apiSlice";
import ProgressBar from "../ProgressBar/ProgressBar";

const ActivePlayer = (props) => {

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

  //const barContent = `${activePlayer.xp}/${playerLevel.nextLevel}`;

  if (activePlayer) {
    return(
    <div className={styles.current}>
      <Link to={`/player/${activePlayer.id}`}>
        <img src={`${process.env.PUBLIC_URL}/images/${activePlayer.icon}`} alt={`ikona ${activePlayer.icon}`} />
      </Link>
      {/* <div className={styles.current__name}> {activePlayer.name} </div> */}
      <div className={styles.current__bar}>
        <ProgressBar xp={activePlayer.xp} levelUp={playerLevel.nextLevel} />
      </div>
    </div>
    );
  }
};

export default ActivePlayer;