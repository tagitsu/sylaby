import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faWarning, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useGetLevelsQuery, useGetPlayersQuery, useUpdatePlayerMutation, useDeletePlayerMutation } from "../../../api/apiSlice";
import { useState } from "react";

import Modal from "../../common/Modal/Modal";
import Button from "../../common/Button/Button";
import DeleteButton from "../../common/DeleteButton/DeleteButton";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import ProgressBar from "../../features/ProgressBar/ProgressBar";

import styles from './PlayerProfile.module.scss';

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

  const [ updatePlayer ] = useUpdatePlayerMutation();
  const [ deletePlayer ] = useDeletePlayerMutation();

  const [ warning, setWarning ] = useState(false);
  const [ colorModal, setColorModal ] = useState(false);
  const [ choosenColor, setChoosenColor ] = useState('');


  if (playersOK && levelsOK) {

    if (activePlayer.xp >= playerLevel.nextLevel) {
      updatePlayer({ ...activePlayer, level: activePlayer.level + 1, xp: 0, color: choosenColor })
    }

    const changeColor = () => {
      updatePlayer({ ...activePlayer, color: choosenColor });
      setChoosenColor('');
    };

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

    return(
      <div key={activePlayer.id} className={styles.profile}>
        <div className={styles.profile__box}>
          <div className={styles.profile__icon} onDoubleClick={ () => setColorModal(true) }>
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
                  Zacznij grę <FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon>
                </Link>
              }
            />
          </div>
        </div>

        <div className={styles.profile__box}>
          <div className={styles.profile__info}>ID: {activePlayer.id}</div>
          <div className={styles.profile__info}>
            Imię gracza: {activePlayer.name}
          </div>
          <div className={styles.profile__info}>
            Zdobyte punkty: { activePlayer.level !== 1 ? activePlayer.xp + playerLevel.nextLevel : activePlayer.xp }
          </div>
          <div className={styles.profile__info}>
            Aktualny poziom: {activePlayer.level}
            <ProgressBar xp={activePlayer.xp} levelUp={playerLevel.nextLevel} content={`${activePlayer.xp}/${playerLevel.nextLevel}`} />
          </div>
          <div className={styles.profile__info}>
            Odznaki: {badges}
          </div>
          
            
          <div className={styles.profile__delete}>
            <DeleteButton 
            content={ <FontAwesomeIcon icon={faTrash} /> }
            onClick={() => setWarning(true)}
          />
          </div>
          

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