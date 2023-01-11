import { useParams } from "react-router";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from './PlayerProfile.module.scss';
import ProgressBar from "../../features/ProgressBar/ProgressBar";

const PlayerProfile = () => {
  const choosenPlayer = useParams();
  console.log('Player profile - param id', choosenPlayer.id);
  const { players } = useSelector(state => state.players);
  const { levels } = useSelector(state => state.levels);
  console.log('player profile - players', players);
  const player = players.filter( player => player.id === choosenPlayer.id)
  console.log('Player Profile - player lvl', player[0].level);
  console.log('PlPro - levels', levels);
  const playerLevel = levels.filter( level => player[0].level === level.value);
  console.log('players level', playerLevel);
  console.log('lvlUp', playerLevel[0].xpToLvlUp);
  const levelUp = playerLevel[0].xpToLvlUp;

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
          <div>{player.badges.map( badge => <FontAwesomeIcon icon={badge} />)}</div>
        </div>
      </div>
      )}
    </div>
    
  );
};

export default PlayerProfile;