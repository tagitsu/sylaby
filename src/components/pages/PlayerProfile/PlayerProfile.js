import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat, faMouse, faDog, faDove } from '@fortawesome/free-solid-svg-icons'
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from './PlayerProfile.module.scss';
import ProgressBar from "../../features/ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';
import { useGetLevelsQuery, useGetPlayersQuery, useUpdatePlayerMutation } from "../../../api/apiSlice";
import Button from "../../common/Button/Button";

const PlayerProfile = () => {

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  let activePlayer, playerLevel;
  if (playersOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
    console.log('profile - active player', activePlayer);
  }
  
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  if (levelsOK) {
    console.log('profile - levels', levels);
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
    console.log('profile - level object', playerLevel);
  }

  const [updatePlayer] = useUpdatePlayerMutation();

  if (playersOK && levelsOK) {

  if (activePlayer.xp >= playerLevel.nextLevel) {
    updatePlayer({ ...activePlayer, level: activePlayer.level + 1, xp: 0 })
  }

  const badges =
    <div className={styles.profile__badge}>
      {activePlayer.badges.length > 0 && activePlayer.badges.map( badge => <FontAwesomeIcon key={badge} icon={badge} />)}
    </div>

  return(
    <div key={activePlayer.id} className={styles.profile}>
      <PlayerIcon icon={activePlayer.icon} name={activePlayer.name} color={activePlayer.color} />
      <div className={styles.profile__infoBox}>
        <div className={styles.profile__info}>
          Imię gracza: {activePlayer.name}
        </div>
        <div className={styles.profile__info}>
        Level: {activePlayer.level}
        </div>
        <div className={styles.profile__info}>
          <ProgressBar xp={activePlayer.xp} levelUp={playerLevel.nextLevel} content={`${activePlayer.xp}/${playerLevel.nextLevel}`} />
        </div>
        <div className={styles.profile__info}>
          Odznaki: {badges}
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