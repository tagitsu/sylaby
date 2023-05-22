import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faWarning, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import styles from './PlayerProfile.module.scss';
import ProgressBar from "../../features/ProgressBar/ProgressBar";
import { Link } from 'react-router-dom';
import { useGetLevelsQuery, useGetPlayersQuery, useUpdatePlayerMutation, useDeletePlayerMutation } from "../../../api/apiSlice";
import Button from "../../common/Button/Button";
import DeleteButton from "../../common/DeleteButton/DeleteButton";
import { useState } from "react";
import Modal from "../../common/Modal/Modal";

const PlayerProfile = () => {

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  let activePlayer, playerLevel;
  if (playersOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
  }
  
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  if (levelsOK && activePlayer) {
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
  }

  const [updatePlayer] = useUpdatePlayerMutation();
  const [deletePlayer] = useDeletePlayerMutation();

  const [ warning, setWarning ] = useState(false);
  const [ colorModal, setColorModal ] = useState(false);
  const [ choosenColor, setChoosenColor ] = useState('');


  if (playersOK && levelsOK) {

    if (activePlayer.xp >= playerLevel.nextLevel) {
      updatePlayer({ ...activePlayer, level: activePlayer.level + 1, xp: 0 })
    }

    const badges =
      <div className={styles.profile__badgeBox}>
        {activePlayer.badges.length > 0 && 
          activePlayer.badges.map( 
            badge => 
            <div 
              key={badge.name} 
              className={styles.profile__badge}>
              
              <img 
                src={`${process.env.PUBLIC_URL}/images/badges/${badge.name}.png`} 
                alt={`${badge.name} icon`} 
                className={styles.profile__badgeIcon}
              />
            </div>
          )
        }
      </div>

    const handleDoubleClick = (e) => {
      console.log(e.detail);
      if (e.detail === 2) setColorModal(true)
    }

    const changeColor = () => {
      alert(`Aktywuję funkcję changeColor i zmieniam kolor na ${choosenColor}`);
      updatePlayer({ ...activePlayer, color: choosenColor });
      setChoosenColor('');
    };

    return(
      <div key={activePlayer.id} className={styles.profile}>
        <div className={styles.profile__box}>
          <div className={styles.profile__icon} onClick={(e) => handleDoubleClick(e)}
>
            <PlayerIcon
              icon={activePlayer.icon} 
              name={activePlayer.name} 
              color={activePlayer.color} 
              level={activePlayer.level} 
              size='160'
            />
          </div>
          
          <div className={styles.profile__play}>
            <Button
              content={
                <Link to={`/game/${activePlayer.id}`}>
                  Zacznij grę
                  <FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon>
                </Link>
              }
            />
          </div>
        </div>

        <div className={styles.profile__box}>
          <div className={styles.profile__info}>ID: {activePlayer.id}</div>
          <div className={styles.profile__info} key='1'>
            Imię gracza: {activePlayer.name}
          </div>
          <div className={styles.profile__info} key='2'>
            Zdobyte punkty: { activePlayer.level !== 1 ? activePlayer.xp + playerLevel.nextLevel : activePlayer.xp }
          </div>
          <div className={styles.profile__info} key='3'>
            Aktualny poziom: {activePlayer.level}
            <ProgressBar xp={activePlayer.xp} levelUp={playerLevel.nextLevel} content={`${activePlayer.xp}/${playerLevel.nextLevel}`} />
          </div>
          <div className={styles.profile__info} key='4'>
            Odznaki: {badges}
          </div>
          {/* <div className={styles.profile__info} key='5'>
            Zmiana koloru:
            <form className={styles.profile__info}>
              <input 
                type='color' 
                defaultValue={activePlayer.color} 
                onChange={(e) => setChoosenColor(e.target.value)} 
              />
              <button onClick={(e) => changeColor(e)}>OK</button>
            </form>
          </div> */}
          
          <DeleteButton 
            content={ <FontAwesomeIcon icon={faTrash} /> }
            onClick={() => setWarning(true)}
            key='6'
          />
          { warning && 
            <Modal 
              cancel={setWarning}
              accept={deletePlayer}
              acceptArg={activePlayer.id}
              player={activePlayer}
              color='tomato'
              text={
                <p>
                  <FontAwesomeIcon icon={faWarning} className={styles.modal__icon}></FontAwesomeIcon>
                  Czy na pewno chcesz usunąć swój profil gracza? Zostaną skasowane wszystkie punkty i odznaki. Nie da się tego cofnąć.
                </p>
              }
              acceptBtn={
                <p>Tak, chcę skasować profil gracza {activePlayer.name} </p>
              }
            />
          }

          { colorModal &&
            <Modal
              accept={changeColor}
              color={choosenColor}
              cancel={setColorModal}
              text={
                  <input 
                    type='color' 
                    defaultValue={activePlayer.color} 
                    onChange={(e) => setChoosenColor(e.target.value)} 
                  />
              }
              acceptBtn={
                <p>Zmień kolor</p>
              }
            />
          }
          
        </div>

        
      </div>
    );
  }
}

export default PlayerProfile;