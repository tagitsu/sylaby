import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faWarning, faPlay } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom';
import { useGetLevelsQuery } from "../../../api/apiSlice";
import { useState, useEffect } from "react";

import Modal from "../../common/Modal/Modal";
import Button from "../../common/Button/Button";
import DeleteButton from "../../common/DeleteButton/DeleteButton";
import PlayerIcon from "../../views/PlayerIcon/PlayerIcon";
import ProgressBar from "../../features/ProgressBar/ProgressBar";
import Tips from "../../views/Tips/Tips";
import Spinner from "../../common/Spinner/Spinner";

import styles from './PlayerProfile.module.scss';
import appUtils from "../../../utils/appUtils";
import playerUtils from "../../../utils/playerUtils";

const PlayerProfile = ({ user }) => {

  const playerID = useParams();


  //const [ players, setPlayers ] = useState([]);
  const [ activePlayer, setActivePlayer ] = useState();

  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();


  useEffect(() => {
    //appUtils.getPlayersFromUser(user.uid, setPlayers);
    appUtils.getActivePlayer(user, setActivePlayer);
  }, [user]);

  let playerLevel, prevLevel;
  if (levelsOK && activePlayer) {
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
    [ prevLevel ] = levels.filter( level => activePlayer.level - 1 );
  }

  const [ tip, setTip ] = useState(false);
  const [ warning, setWarning ] = useState(false);
  const [ colorModal, setColorModal ] = useState(false);
  const [ chosenColor, setChosenColor ] = useState('');

  let badges;
  if (activePlayer && levelsOK) {
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

  const handleDelete = () => {
    setTip(false);
    setWarning(true);
  };

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
            <p>Zdobyte punkty: { activePlayer.level !== 1 ? activePlayer.xp + prevLevel.nextLevel : activePlayer.xp }</p>
          </div>
          <div className={styles.profile__info}>
            <p>Poziom: {activePlayer.level}</p>
            <ProgressBar user={user} levelUp={playerLevel.nextLevel} content={`${activePlayer.xp}/${playerLevel.nextLevel}`} />
          </div>
          <div className={styles.profile__info}>
            <p>Odznaki:</p> {badges}
          </div>
        </div>

        { warning && 
          <Modal 
            cancel={setWarning}
            // TODO tu powinna być funkcja usuwająca dokument z firestore
            accept={() => playerUtils.deletePlayerProfile(user.uid, activePlayer.id)}
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
            accept={() => playerUtils.changeColor(user.uid, activePlayer.id, chosenColor)}
            color={chosenColor}
            cancel={setColorModal}
            text={
                <input 
                  type='color' 
                  defaultValue={activePlayer.color} 
                  onChange={(e) => setChosenColor(e.target.value)} 
                />
            }
            acceptBtn={
              <p>Zmień kolor</p>
            }
          />
        }
      </div>
    );
  }
};

export default PlayerProfile;