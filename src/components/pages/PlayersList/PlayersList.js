import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlay, faLightbulb, faRefresh } from '@fortawesome/free-solid-svg-icons'

import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';
import Button from '../../common/Button/Button';
import styles from './PlayersList.module.scss';

import { useGetPlayersQuery, useUpdatePlayerMutation } from '../../../api/apiSlice';
import { useEffect } from 'react';
import Tips from '../../views/Tips/Tips';
import Spinner from '../../common/Spinner/Spinner';

const PlayersList = () => {

  const { data: players, isSuccess } = useGetPlayersQuery();

  const [ updatePlayer ] = useUpdatePlayerMutation();

  useEffect( () => {
    if (isSuccess) {
      players.map( player => updatePlayer({ ...player, isActive: false }))
    }
  }, []);

  const changeActiveStatus = (e, player) => {
    e.preventDefault();
    updatePlayer({ ...player, isActive: true});
  }

  const refreshPage = () => {
    window.location.reload(false);
  }

  if (isSuccess) {
    return(
      <div className={styles.list}>
        <Tips content={
          <div>
            <p>Wybierz swoją postać i naciśnij przycisk <span><FontAwesomeIcon icon={faPlay} /></span> żeby wybrać grę. Klikając w ikonę postaci przejdziesz do profilu gracza.</p>
            <p> A jeśli nie masz jeszcze swojej postaci, łatwo ją stworzysz naciskając przycisk <span><FontAwesomeIcon icon={faPlus} /></span> na dole strony.</p>
          </div>
          }
        />
        <div className={styles.list__list}>
          {players.map( player => 
            <div key={player.id} className={styles.list__player}>
              <div className={styles.list__box}>
                <div onClick={ (e) => changeActiveStatus(e, player)} >
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
                onClick={ (e) => changeActiveStatus(e, player)}
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
        <p>Spróbuj odświeżyć stronę</p>
        <FontAwesomeIcon icon={faRefresh} onClick={refreshPage} /> 
      </div>
    )
  }
};

export default PlayersList;