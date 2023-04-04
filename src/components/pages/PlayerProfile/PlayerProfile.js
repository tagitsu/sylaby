import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from './PlayerProfile.module.scss';
import ProgressBar from "../../features/ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';

const PlayerProfile = () => {

  const activePlayer = useParams();
  console.log('profile - active player ID', activePlayer);
  const { players } = useSelector(state => state.player);
  console.log('profile - players', players);
  const { levels } = useSelector(state => state.levels);
  console.log('profile - levels', levels);
  const [ player ] = players.filter( player => player.id === activePlayer.id);
  console.log('profile - active player object', player);
  const [ playerLevelObj ] = levels.filter( level => player.level === level.value);
  console.log('profile - level object', playerLevelObj);
  
  const root = document.querySelector(':root');
  root.style.setProperty('--player-color', player.color);

  return(
      <div key={player.id} className={styles.profile}>
        <PlayerIcon icon={player.icon} name={player.name} color={player.color} />
        <div>Imię gracza:
          <p>{player.name}</p> 
        </div>
        <div>LVL:
          <p>{player.level}</p>
          <ProgressBar xp={player.xp} levelUp={playerLevelObj.xpToLvlUp} /> {player.xp}/{playerLevelObj.xpToLvlUp}
        </div>
        <div className={styles.profile__badges}>Odznaki: 
          <div className={styles.profile__badge}>{player.badges.map( badge => <FontAwesomeIcon key={badge.iconName} icon={badge} />)}</div>
        </div>
        <button>
          <Link to={`/player/${player.id}/game`} className={styles.list__btn}>Zacznij grę</Link>
        </button>
      </div>
  );
};

export default PlayerProfile;