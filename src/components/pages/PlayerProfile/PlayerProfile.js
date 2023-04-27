import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from './PlayerProfile.module.scss';
import ProgressBar from "../../features/ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';
import { useGetLevelsQuery, useGetPlayersQuery, useUpdatePlayerMutation, useDeletePlayerMutation } from "../../../api/apiSlice";
import Button from "../../common/Button/Button";
import DeleteButton from "../../common/DeleteButton/DeleteButton";
import { useState } from "react";

const PlayerProfile = () => {



  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  let activePlayer, playerLevel;
  if (playersOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
    //console.log('profile - active player', activePlayer);
  }
  
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  if (levelsOK && activePlayer) {
    //console.log('profile - levels', levels);
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
    //console.log('profile - level object', playerLevel);
    
  }

  const [updatePlayer] = useUpdatePlayerMutation();
  const [deletePlayer] = useDeletePlayerMutation();

  const [ warning, setWarning ] = useState('');
  const [ choosenColor, setChoosenColor ] = useState('');
  const [ badgeText, setBadgeText ] = useState('');


  if (playersOK && levelsOK) {

  if (activePlayer.xp >= playerLevel.nextLevel) {
    updatePlayer({ ...activePlayer, level: activePlayer.level + 1, xp: 0 })
  }

  const badges =
    <div className={styles.profile__badgeBox}>
      {activePlayer.badges.length > 0 && 
        activePlayer.badges.map( 
          badge => 
          <div key={badge.name} className={styles.profile__badge}>
            <img src={`${process.env.PUBLIC_URL}/images/badges/${badge.name}.png`} alt={`${badge.name} icon`} />
            <p>{badge.text}</p>
          </div>
        )
      }
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
    //console.log('usuwam gracza', activePlayer.id);
    setWarning(deleteWarning);
  };

  const changeColor = (e) => {
    e.preventDefault();
    updatePlayer({ ...activePlayer, color: choosenColor});
    setChoosenColor('');
  };

  return(
    <div key={activePlayer.id} className={styles.profile}>
      <PlayerIcon 
        icon={activePlayer.icon} 
        name={activePlayer.name} 
        color={activePlayer.color} 
        level={activePlayer.level} 
        size='160'
      />
      <div className={styles.profile__infoBox}>
        <div className={styles.profile__info}>
          Imię gracza: {activePlayer.name}
        </div>
        <div className={styles.profile__info}>
        Punkty: {activePlayer.xp + playerLevel.nextLevel}
        </div>
        <div className={styles.profile__info}>
          <ProgressBar xp={activePlayer.xp} levelUp={playerLevel.nextLevel} content={`${activePlayer.xp}/${playerLevel.nextLevel}`} />
        </div>
        <div className={styles.profile__info}>
          Odznaki: {badges}
        </div>
        <div className={styles.profile__info}>
          Zmiana koloru:
          <form>
            <input type='color' defaultValue={activePlayer.color} onChange={(e) => setChoosenColor(e.target.value)} />
            <button onClick={(e) => changeColor(e)}>OK</button>
          </form>
        </div>
        
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