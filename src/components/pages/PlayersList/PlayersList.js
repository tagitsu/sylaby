import { useGetPlayersQuery, useUpdatePlayerMutation } from '../../../api/apiSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlay, faRefresh } from '@fortawesome/free-solid-svg-icons'

import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';
import Button from '../../common/Button/Button';
import Tips from '../../views/Tips/Tips';
import Spinner from '../../common/Spinner/Spinner';

import styles from './PlayersList.module.scss';


const PlayersList = () => {

  const { data: players, isSuccess } = useGetPlayersQuery();

  const [ updatePlayer ] = useUpdatePlayerMutation();

  const [ tip, setTip ] = useState(false);

  const cleanStatus = () => {
    players?.map( player => updatePlayer({ ...player, isActive: false }));
    console.log('czyszczenie statusu graczy');
  }

  useEffect( () => {
    cleanStatus();
  }, []);

  const changeActiveStatus = (player) => {
    updatePlayer({ ...player, isActive: true});
  }

  const refreshPage = () => {
    window.location.reload(false);
  }

  if (isSuccess) {
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
          {players.map( player => 
            <div key={player.id} className={styles.list__player}>
              <div className={styles.list__box}>
                <div onClick={ () => changeActiveStatus(player)} >
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
                onClick={ () => changeActiveStatus(player)}
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
        {/* <Spinner content='oczekiwanie na dane z serwera' /> */}
        <p>Lista graczy będzie tu widoczna po zalogowaniu</p>
        <FontAwesomeIcon icon={faRefresh} onClick={refreshPage} /> 
      </div>
    )
  }
};

export default PlayersList;