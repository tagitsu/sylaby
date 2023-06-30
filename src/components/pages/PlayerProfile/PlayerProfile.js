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
import Tips from "../../views/Tips/Tips";
import Spinner from "../../common/Spinner/Spinner";

import styles from './PlayerProfile.module.scss';

const PlayerProfile = () => {

  const playerID = useParams();

  const { data: players, isLoading: playersLoading, isSuccess: playersOK, isFetching: playersFetching } = useGetPlayersQuery();

  let activePlayer, playerLevel;
  if (playersOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
  }

  console.log(`profil gracza ID${playerID.id} - status graczy`, players?.map( player => player.isActive));

  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  if (levelsOK && activePlayer) {
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
  }

  const [ updatePlayer ] = useUpdatePlayerMutation();
  const [ deletePlayer ] = useDeletePlayerMutation();

  const [ tip, setTip ] = useState(false);
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

  console.log( 'profil gracza', players.filter( player => player.isActive ));

  }

  const handleDelete = () => {
    setTip(false);
    setWarning(true);
  }


  if (activePlayer && levelsOK) {
    return(
      <div key={activePlayer.id} className={styles.profile}>
        <div className={styles.profile__box}>
          <div className={styles.profile__tips}>
            <Tips 
              content={
                <div>
                  <p>Klikając dwukrotnie na ikonę postaci możesz zmienić kolor tła.</p>
                  <p>Możesz usunąć swoją postać, ale jest to nieodwracalne. Zostaną skasowane wszystkie punkty oraz odznaki otrzymane w czasie gry. Żeby usunąć postać naciśnij ikoną kosza poniżej.</p>
                  <DeleteButton 
                    content={ <FontAwesomeIcon icon={faTrash} /> }
                    onClick={handleDelete}
                  />
                </div>
              }
              onClick={() => setTip(!tip)}
              tip={tip}
            />
          </div>
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
            <p>Poziom: {activePlayer.level}</p>
            <ProgressBar xp={activePlayer.xp} levelUp={playerLevel.nextLevel} content={`${activePlayer.xp}/${playerLevel.nextLevel}`} />
          </div>
          <div className={styles.profile__info}>
            <p>Odznaki:</p> {badges}
          </div>
        </div>

        { warning && 
          <Modal 
            cancel={setWarning}
            accept={deletePlayer}
            acceptArg={activePlayer.id}
            player={activePlayer}
            color='#fc7176'
            text={
              <div>
                <FontAwesomeIcon icon={faWarning} />
                <p>Czy na pewno chcesz usunąć swój profil gracza? Zostaną skasowane wszystkie punkty i odznaki. Nie da się tego cofnąć.</p>
              </div>
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
    );
  } else if (playersLoading) {
    return (
      <Spinner content='Trwa pobieranie danych gracza ...' />
    );
  
  } else if (playersOK && !playersFetching && !playersLoading && !activePlayer) {
    return (
      <div className={styles.profile__nonFound}>
        <p>Profil gracza o numerze {playerID.id} nie może zostać pobrany.</p>
        <p>Możesz <Link to='/playerslist'> wybrać </Link> z listy graczy inną postać lub <Link to='/newPlayer'>stworzyć zupełnie nową</Link>.</p>
        <div className={styles.profile__buttons}>
          <div className={styles.profile__button}>
          <Link to='/playerslist'> lista graczy </Link>
          </div>
          <div className={styles.profile__button}>
            <Link to='/playerslist'> dodaj nowego gracza </Link>
          </div>
        </div>
      </div>
    );
  }
  
}

export default PlayerProfile;