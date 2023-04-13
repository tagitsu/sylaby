import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat, faMouse, faDog, faDove } from '@fortawesome/free-solid-svg-icons'
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from './PlayerProfile.module.scss';
import ProgressBar from "../../features/ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';
import { useGetLevelsQuery, useGetPlayersQuery } from "../../../api/apiSlice";
import Button from "../../common/Button/Button";

const PlayerProfile = () => {

  const { data: players, isSuccess } = useGetPlayersQuery();
  let activePlayer, playerLevel;
  if (isSuccess) {
    [ activePlayer ] = players.filter( player => player.isActive);
    console.log('profile - active player', activePlayer);
  }
  
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  if (levelsOK) {
    console.log('profile - levels', levels);
    [ playerLevel ]= levels.filter( level => activePlayer.level === level.id);
    console.log('profile - level object', playerLevel);
  }
  
  if (isSuccess && levelsOK) {
    return(
    <div key={activePlayer.id} className={styles.profile}>
      <PlayerIcon icon={activePlayer.icon} name={activePlayer.name} color={activePlayer.color} />
      <div>Imię gracza:
        <p>{activePlayer.name}</p> 
      </div>
      <div>LVL:
        <p>{activePlayer.level}</p>
        <ProgressBar xp={activePlayer.xp} levelUp={playerLevel.nextLevel} /> {activePlayer.xp}/{playerLevel.nextLevel}
      </div>
      <div className={styles.profile__badges}>Odznaki: 
        <div className={styles.profile__badge}>
          {activePlayer.badges.length > 0 && activePlayer.badges.map( badge => <FontAwesomeIcon key={badge} icon={faCat} />)}
        </div>
      </div>
      <Button
        content={<Link to={`/game/${activePlayer.id}`}>Zacznij grę</Link>}
      />
        
    </div>
    );
  }
  
}


export default PlayerProfile;