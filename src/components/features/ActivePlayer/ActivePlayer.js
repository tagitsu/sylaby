import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from '../ActivePlayer/ActivePlayer.module.scss';
import { Link } from 'react-router-dom';
import { useGetPlayersQuery, useGetLevelsQuery } from "../../../api/apiSlice";
import ProgressBar from "../ProgressBar/ProgressBar";

const ActivePlayer = (props) => {

  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery(); 
  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  
  console.log('active player comp - levels', levels);
  let activePlayer;
  if (playersOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
    console.log('active player comp - active player', activePlayer);
  }

  let playerLevel;
  if (levelsOK && activePlayer) {
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
    console.log('active player comp - level gracza w warunku', playerLevel);
  }
  console.log('active player comp - level gracza poza warunkiem', playerLevel);

  if(!activePlayer) {
    return(
      <div>Brak aktywnego garcza</div>
    );
  } else if (activePlayer) {
    return(
    <div className={styles.current}>
      <Link to={`/player/${activePlayer.id}`} className={styles.current__item}>
        <PlayerIcon icon={activePlayer.icon} name={activePlayer.name} color={activePlayer.color} level={activePlayer.level} />
      </Link>
      <div> {activePlayer.name} </div>
      <div className={styles.current__bar}>
        <ProgressBar xp={activePlayer.xp} levelUp={playerLevel.nextLevel} content={`${activePlayer.xp}/${playerLevel.nextLevel}`} />
      </div>
    </div>
    );
  }
};

export default ActivePlayer;