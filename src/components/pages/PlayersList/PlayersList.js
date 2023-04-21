import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';
import Button from '../../common/Button/Button';
import styles from './PlayersList.module.scss';

import { useGetPlayersQuery, useUpdatePlayerMutation } from '../../../api/apiSlice';
import { useEffect } from 'react';

const PlayersList = () => {

  const { 
    data: players,
    isSuccess, 
  } = useGetPlayersQuery();

  const [updatePlayer] = useUpdatePlayerMutation();

  useEffect( () => {
    if (isSuccess) {
      players.map( player => updatePlayer({ ...player, isActive: false }))
    }
  }, []);

  const changeActiveStatus = (e, player) => {
    e.preventDefault();
    updatePlayer({ ...player, isActive: true});
  }

  if (isSuccess) {
    return(
      <div>
        {players.map( player => 
        <div key={player.id} className={styles.list}>
          <div className={styles.list__player}>
            <div className={styles.list__icon} style={{ backgroundColor: player.color }} onClick={ (e) => changeActiveStatus(e, player)} >
                  <Link to={`/player/${player.id}`} >
                    <PlayerIcon 
                      id={player.id} 
                      icon={player.icon} 
                      name={player.name}
                    />
                  </Link>
              <div className={styles.list__level} style={{ backgroundColor: player.color }}>
                <div className={styles.list__levelValue}>
                  {player.level}
                </div>
              </div>
            </div>
            
            <p className={styles.list__name}>{player.name}</p>
          </div>
          <Button 
            content={<Link to={`/game/${player.id}`}>Zacznij grę</Link>} 
            onClick={ (e) => changeActiveStatus(e, player)}
          />
        </div>
      )}
        <Button 
          content={ <Link to='/newPlayer'><FontAwesomeIcon icon={faPlus} /></Link> }
        />
      </div>
    )
  };
};

export default PlayersList;