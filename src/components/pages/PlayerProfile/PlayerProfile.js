import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from './PlayerProfile.module.scss';
import ProgressBar from "../../features/ProgressBar/ProgressBar";
import { levelUp } from '../../../redux/player/playerSlice';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';

const PlayerProfile = () => {
  const dispatch = useDispatch();

  const choosenPlayer = useParams();
  const players = useSelector(state => state.player.players);
  const levels = useSelector(state => state.levels.levels);
  const [player] = players.filter( player => player.id === choosenPlayer.id);
  const [playerLevelObj] = levels.filter( level => player.level === level.value);
  const playerLevel = playerLevelObj.value;
  const playerXp = player.xp;
  const playerColor = player.color;
  const xpToLevelUp = playerLevelObj.xpToLvlUp;
  console.log('platery color player profile', playerColor);
  const startGameLink = <Link to={`/player/${player.id}/game`} className={styles.list__btn}>Zacznij grę</Link>
  
  const root = document.querySelector(':root');
  root.style.setProperty('--player-color', playerColor);


  
  return(
      <div key={player.id} className={styles.profile}>
        <PlayerIcon icon={player.icon} name={player.name} color={playerColor} />
        <div>Imię gracza:
          <p>{player.name}</p> 
        </div>
        <div>LVL:
          <p>{player.level}</p>
          <ProgressBar xp={player.xp} levelUp={xpToLevelUp} /> {player.xp}/{xpToLevelUp}
        </div>
        <div className={styles.profile__badges}>Odznaki: 
          <div className={styles.profile__badge}>{player.badges.map( badge => <FontAwesomeIcon key={badge.iconName} icon={badge} />)}</div>
        </div>
        <Button content={startGameLink} />
      </div>
  );
};

export default PlayerProfile;