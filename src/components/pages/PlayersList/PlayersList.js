import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlay, faRefresh, faRotateRight } from '@fortawesome/free-solid-svg-icons'

import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';
import Button from '../../common/Button/Button';
import Tips from '../../views/Tips/Tips';
import Spinner from '../../common/Spinner/Spinner';

import styles from './PlayersList.module.scss';
import playerUtils from '../../../utils/playerUtils';
import appUtils from '../../../utils/appUtils';

const PlayersList = ({ user }) => {

  const [ players, setPlayers ] = useState();
  const [ tip, setTip ] = useState(false);

  useEffect(() => {
    appUtils.getPlayersFromUser(user, setPlayers)
  }, [user]);

  useEffect( () => {
    appUtils.inactiveAllPlayers(players, user);
  }, [players]);

  console.log(
    'lista graczy',
    'użytkownik', user,
    'gracze', players,
    'status', players?.map( player => player.isActive)
  );

  if (user) {
    return(
      <div className={styles.list}>
        <Tips 
          content={
            <div>
              <p>Wybierz swoją postać i naciśnij przycisk <span><FontAwesomeIcon icon={faPlay} /></span> żeby wybrać grę. Klikając w ikonę postaci przejdziesz do profilu gracza.</p>
              <p> A jeśli nie masz jeszcze swojej postaci, łatwo ją stworzysz naciskając przycisk <span><FontAwesomeIcon icon={faPlus} /></span> na dole strony.</p>
            </div>
          }
          onClick={() => setTip(!tip)}
          tip={tip}
        />
        <div className={styles.list__list}>
          {players?.map( player => 
            <div key={player.id} className={styles.list__player}>
              <div className={styles.list__box}>
                <div onClick={ () => playerUtils.changeActiveStatus(user, player.id)} >
                    <Link to={`/player/${player.id}`} className={styles.list__link}>
                      <PlayerIcon 
                        id={player.id} 
                        icon={player.icon} 
                        name={player.name}
                        level={player.level}
                        color={player.color}
                        size='120'
                        hover={true}
                      />
                    </Link>
                </div>
                <Button 
                  content={<Link to={`/game/${player.id}`}><FontAwesomeIcon className={styles.list__play} icon={faPlay}></FontAwesomeIcon></Link>} 
                  onClick={ () => playerUtils.changeActiveStatus(user, player.id)}
                />
              </div>
              <p className={styles.list__name}>{player.name}</p>
            </div>
          )}
        </div>
        <Button 
          content={ <Link to='/newPlayer'><FontAwesomeIcon icon={faPlus} /></Link> }
        />
      </div>
    )
  } else {
    return(
      <div>
        <Spinner content='oczekiwanie na dane z serwera' />
        <p>Zaloguj się żeby wyswietlić listę graczy</p>
        {/* <FontAwesomeIcon icon={faRotateRight} onClick={appUtils.refreshPage} />  */}
      </div>
    )
  }
};

export default PlayersList;