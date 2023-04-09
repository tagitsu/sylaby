import { Link } from 'react-router-dom';

import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';
import Button from '../../common/Button/Button';
import styles from './PlayersList.module.scss';

import { useGetPlayersQuery, useUpdatePlayerMutation } from '../../../api/apiSlice';

const PlayersList = () => {

  const { 
    data: players,
    isSuccess, 
  } = useGetPlayersQuery();

  const [updatePlayer] = useUpdatePlayerMutation();

  const changeActiveStatus = (e, player) => {
    e.preventDefault();
    updatePlayer({ ...player, isActive: !player.isActive});
  }

  if (isSuccess) {
    return(
      <div>
        {players.map( player => 
        <div key={player.id} className={styles.list}>
          <div className={styles.list__icon}>
            <Link to={`/player/${player.id}`}>
              <PlayerIcon id={player.id} icon={player.icon} name={player.name} onClick={(e) => changeActiveStatus(e, player)} />
            </Link>
            <div className={styles.list__level} >
              <p className={styles.list__levelValue}>{player.level}</p>
            </div>
          </div>
          <p className={styles.list__name}>{player.name}</p>
          <Button content={<Link to={`/game/${player.id}`}>Zacznij grę</Link>} />
        </div>
      )}
      </div>
    )
  };
};

export default PlayersList;