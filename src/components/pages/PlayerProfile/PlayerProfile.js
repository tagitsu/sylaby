import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faWarning, faPlay } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom';
import { useGetLevelsQuery, useGetPlayersQuery, useUpdatePlayerMutation, useDeletePlayerMutation } from "../../../api/apiSlice";
import { useState } from "react";

import Modal from "../../common/Modal/Modal";
import Button from "../../common/Button/Button";
import DeleteButton from "../../common/DeleteButton/DeleteButton";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import ProgressBar from "../../features/ProgressBar/ProgressBar";

import styles from './PlayerProfile.module.scss';

const PlayerProfile = () => {

  const playerID = useParams();

  const { data: players, isLoading: playersLoading, isSuccess: playersOK, isFetching: playersFetching } = useGetPlayersQuery();

  if (playersLoading) console.log('loading...');

  let activePlayer, playerLevel;
  if (playersOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
  }

  if (!activePlayer && playersOK) console.log('brak gracza');


  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  if (levelsOK && activePlayer) {
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
  }

  const [ updatePlayer ] = useUpdatePlayerMutation();
  const [ deletePlayer ] = useDeletePlayerMutation();

  const [ warning, setWarning ] = useState(false);
  const [ colorModal, setColorModal ] = useState(false);
  const [ choosenColor, setChoosenColor ] = useState('');


  let changeColor, badges;
  if (activePlayer && levelsOK) {

    if (activePlayer.xp >= playerLevel.nextLevel) {
      updatePlayer({ ...activePlayer, level: activePlayer.level + 1, xp: 0, color: choosenColor })
    }

    changeColor = () => {
      updatePlayer({ ...activePlayer, color: choosenColor });
      setChoosenColor('');
    };

    badges =
      <div className={styles.profile__badges}>
        {levels.map( level => 
          <div 
            key={level.id} 
            className={styles.profile__badge}>
            { activePlayer.badges[level.id - 1] && <img 
              src={`${process.env.PUBLIC_URL}/images/badges/${level.badge}.png`} 
              alt={`${level.badge} icon`} 
              className={styles.profile__badgeIcon}
            />
            }
          </div>
        )}
      </div>
  }

  
  if (activePlayer && levelsOK) {
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
                  <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                </Link>
              }
            />
          </div>
        </div>
        <div className={styles.profile__box}>
          <div className={styles.profile__info}>
            <p>Imię gracza: {activePlayer.name}</p>
          </div>
          <div className={styles.profile__info}>
            <p>Zdobyte punkty: { activePlayer.level !== 1 ? activePlayer.xp + playerLevel.nextLevel : activePlayer.xp }</p>
          </div>
          <div className={styles.profile__info}>
            <p>Level: {activePlayer.level}</p>
            <ProgressBar xp={activePlayer.xp} levelUp={playerLevel.nextLevel} content={`${activePlayer.xp}/${playerLevel.nextLevel}`} />
          </div>
          <div className={styles.profile__info}>
            <p>Odznaki:</p> {badges}
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
  } else if (playersLoading) {
    return (
      <div> Trwa pobieranie danych gracza ...</div>
    );
  
  } else if (playersOK && !playersFetching && !playersLoading && !activePlayer) {
    return (
      <div>
        Profil gracza o numerze {playerID.id} nie może zostać pobrany. Mógł zostać usunięty.
        Możesz <Link to='/playerslist'> wybrać </Link> z listy graczy inną postać lub <Link to='/newPlayer'>stworzyć zupełnie nową</Link>.
      </div>
    );
  }
  
}

export default PlayerProfile;