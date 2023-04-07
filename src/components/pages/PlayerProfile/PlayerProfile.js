import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from './PlayerProfile.module.scss';
import ProgressBar from "../../features/ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';
import { useGetLevelsQuery, useGetPlayersQuery } from "../../../api/apiSlice";

const PlayerProfile = () => {

  const param = useParams();
  console.log('palyer profile - id from url', param.playerID);
  const { data: players } = useGetPlayersQuery();
  console.log('profile - players', players);
  const { data: levels } = useGetLevelsQuery();
  console.log('profile - levels', levels);
  const [ player ] = players.filter( player => player.id == param.playerID);
  console.log('profile - active player object', player);
  const [ playerLevel ] = levels.filter( level => player.level === level.id);
  console.log('profile - level object', playerLevel);
  

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
      <div className={styles.profile__badges}>Odznaki: 
        <div className={styles.profile__badge}>{player.badges.map( badge => <FontAwesomeIcon key={badge.iconName} icon={badge} />)}</div>
      </div>
      <button>
        <Link to={`/game/${player.id}`} className={styles.list__btn}>Zacznij grę</Link>
      </button>
    </div>
    );
  }


export default PlayerProfile;