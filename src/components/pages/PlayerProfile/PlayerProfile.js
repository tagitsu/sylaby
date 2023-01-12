import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from './PlayerProfile.module.scss';
import ProgressBar from "../../features/ProgressBar/ProgressBar";
import { chooseCurrentPlayer } from '../../../redux/player/playerSlice';

const PlayerProfile = () => {
  const dispatch = useDispatch();
  const choosenPlayer = useParams();
  const { players } = useSelector(state => state.player);
  const { levels } = useSelector(state => state.levels);
  const player = players.filter( player => player.id === choosenPlayer.id)
  const playerLevel = levels.filter( level => player[0].level === level.value);
  const levelUp = playerLevel[0].xpToLvlUp;

  dispatch(chooseCurrentPlayer(choosenPlayer.id));

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
          <ProgressBar xp={player.xp} levelUp={levelUp} /> {player.xp}/{levelUp}
        </div>
        <div>Odznaki: 
          <div>{player.badges.map( badge => <FontAwesomeIcon key={badge} icon={badge} />)}</div>
        </div>
      </div>
      )}
    </div>
    
  );
};

export default PlayerProfile;