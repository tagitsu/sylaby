import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from './PlayerProfile.module.scss';
import ProgressBar from "../../features/ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';
import { useGetLevelsQuery, useGetPlayersQuery } from "../../../api/apiSlice";

const PlayerProfile = () => {

  const activePlayer = useParams();
  console.log('profile - id from url', activePlayer.id);
  const { data: players, isSuccess: playersOK, isUninitialized } = useGetPlayersQuery();

  let player, playerLevel;

  if (playersOK) {
    console.log('profile - players', players);
    [ player ] = players.filter( player => player.id == activePlayer.id);
    console.log('profile - active player object', player);
  } else if (isUninitialized) {
    console.log('nie pobiera graczy')
  }
  
  const { data: levels, isSuccess: levelsOK, isError, error } = useGetLevelsQuery();
  if (isError) {
    console.log('błąd w pobieraniu levelów', error)
  } else if (levelsOK) {
    console.log('profile - levels', levels);
    [ playerLevel ]= levels.filter( level => player.level == level.id);
    console.log('profile - level object', playerLevel);
  }
  
  console.log('badges', player.badges)


  if (playersOK && levelsOK) {
    return(
    <div key={player.id} className={styles.profile}>
      <PlayerIcon icon={player.icon} name={player.name} color={player.color} />
      <div>Imię gracza:
        <p>{player.name}</p> 
      </div>
      <div>LVL:
        <p>{player.level}</p>
        <ProgressBar xp={player.xp} levelUp={playerLevel.nextLevel} /> {player.xp}/{playerLevel.nextLevel}
      </div>
      {/* <div className={styles.profile__badges}>Odznaki: 
        <div className={styles.profile__badge}>
          {player.badges.length > 0 && player.badges.map( badge => <FontAwesomeIcon key={badge.iconName} icon={badge} />)}
        </div>
      </div> */}
      <button>
        <Link to={`/game/${player.id}`}>Zacznij grę</Link>
      </button>
    </div>
    );
  }
  
  }


export default PlayerProfile;