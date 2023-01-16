import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from './PlayerProfile.module.scss';
import ProgressBar from "../../features/ProgressBar/ProgressBar";
import { chooseCurrentPlayer, levelUp } from '../../../redux/player/playerSlice';
import { Link } from 'react-router-dom';

const PlayerProfile = () => {
  const dispatch = useDispatch();

  const choosenPlayer = useParams();
  const players = useSelector(state => state.player.players);
  const { levels } = useSelector(state => state.levels);
  const player = players.filter( player => player.id === choosenPlayer.id)
  const [ playerLevelObj ] = levels.filter( level => player[0].level === level.value);
  const playerLevel = playerLevelObj.value;
  const playerXp = player[0].xp;
  const xpToLevelUp = playerLevelObj.xpToLvlUp;

  dispatch(chooseCurrentPlayer(choosenPlayer.id));
  if(playerXp >= xpToLevelUp) {
    dispatch(levelUp());
  }

  return(
    <div>
      {player.map(player => 
      <div key={player.id} className={styles.profile}>
        <PlayerIcon icon={player.icon} name={player.name} />
        <div>Imię gracza:
          <p>{player.name}</p> 
        </div>
        <div>LVL:
          <p>{player.level}</p>
          <ProgressBar xp={player.xp} levelUp={xpToLevelUp} /> {player.xp}/{xpToLevelUp}
        </div>
        <div>Odznaki: 
          <div>{player.badges.map( badge => <FontAwesomeIcon key={badge} icon={badge} />)}</div>
        </div>
      </div>
      )}
      <button>
        <Link to={`/player/${player.id}/game`} className={styles.list__btn} >Zacznij grę</Link>
      </button>

    </div>
    
  );
};

export default PlayerProfile;