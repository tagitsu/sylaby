import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat, faMouse, faDog, faDove, faFish,  faTrash } from '@fortawesome/free-solid-svg-icons'
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from './PlayerProfile.module.scss';
import ProgressBar from "../../features/ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';
import { useGetLevelsQuery, useGetPlayersQuery, useUpdatePlayerMutation, useDeletePlayerMutation } from "../../../api/apiSlice";
import Button from "../../common/Button/Button";
import DeleteButton from "../../common/DeleteButton/DeleteButton";
import { useState } from "react";

const PlayerProfile = () => {

  const [ warning, setWarning ] = useState('');

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  let activePlayer, playerLevel;
  if (playersOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
    console.log('profile - active player', activePlayer);
  }
  
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  if (levelsOK && activePlayer) {
    console.log('profile - levels', levels);
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
    console.log('profile - level object', playerLevel);
  }

  const [updatePlayer] = useUpdatePlayerMutation();
  const [deletePlayer] = useDeletePlayerMutation();

  if (playersOK && levelsOK) {

  if (activePlayer.xp >= playerLevel.nextLevel) {
    updatePlayer({ ...activePlayer, level: activePlayer.level + 1, xp: 0 })
  }

  const badges =
    <div className={styles.profile__badge}>
      {activePlayer.badges.length > 0 && activePlayer.badges.map( badge => <img src={`${process.env.PUBLIC_URL}/images/badges/${badge}.png`} alt={`${badge} icon`} key={badge}/>)}
    </div>

  const deleteWarning = 
    <div className={styles.profile__warning}>
      <p className={styles.profile__warningText}>Uwaga! Usuwanie profilu gracza</p>
      <p className={styles.profile__warningText}>Czy na pewno chcesz usunąć swój profil gracza? Nie da się tego cofnąć.</p>
      <button 
        className={styles.profile__warningButton}
        onClick={ () => deletePlayer(activePlayer.id)}
      >
      Tak, chcę usunąć profil gracza {activePlayer.name}
      </button>
      <button 
        onClick={() => setWarning('')} 
      >
      Anuluj
      </button>

    </div>;

  const handleDelete = (e) => {
    e.preventDefault();
    console.log('usuwam gracza', activePlayer.id);
    setWarning(deleteWarning);
  }

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

        {/** TODO wprowadź opcję usuwania gracza, z formularzem żeby nie usunąć przypadkowo */}
        <DeleteButton 
          content={ <FontAwesomeIcon icon={faTrash} /> }
          onClick={ (e) => handleDelete(e) }
        />
        {warning}
      </div>
      
      <Button
        content={<Link to={`/game/${activePlayer.id}`}>Zacznij grę</Link>}
      />
        
    </div>
    );
  }
  
}


export default PlayerProfile;