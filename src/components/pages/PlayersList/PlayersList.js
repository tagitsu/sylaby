import { Link } from 'react-router-dom';

import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';
import Button from '../../common/Button/Button';
import styles from './PlayersList.module.scss';

import { useGetPlayersQuery } from '../../../api/apiSlice';

const PlayersList = () => {

  const { 
    data: players,
    isSuccess, 
  } = useGetPlayersQuery();

  if (isSuccess) {
    return(
      <div>
        {players.map( player => 
        <div key={player.id} className={styles.list}>
          <div className={styles.list__icon}>
            <PlayerIcon id={player.id} icon={player.icon} name={player.name} /* color={player.color} */ />
            <div className={styles.list__level} >
              <p className={styles.list__levelValue}>{player.level}</p>
            </div>
          </div>
          <p className={styles.list__name}>{player.name}</p>
          <Button content={<Link to={`/players/${player.id}`}>Karta postaci</Link>} />
          <Button content={<Link to={`/game/${player.id}`}>Zacznij grę</Link>} />
        </div>
      )}
      </div>
    )
  };
};

export default PlayersList;