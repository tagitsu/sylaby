import { Link } from 'react-router-dom';

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
          <div className={styles.list__icon}>
            <Button
              content={
                <Link to={`/player/${player.id}`}>
                  <PlayerIcon 
                    id={player.id} 
                    icon={player.icon} 
                    name={player.name}
                  />
                </Link>
              }
              onClick={ (e) => changeActiveStatus(e, player)} 
            />
          </div>
          <p className={styles.list__name}>{player.name}</p>
          <p className={styles.list__name}>{player.xp}</p>

          <Button 
            content={<Link to={`/game/${player.id}`}>Zacznij grę</Link>} 
            onClick={ (e) => changeActiveStatus(e, player)}
          />
        </div>
      )}
      </div>
    )
  };
};

export default PlayersList;