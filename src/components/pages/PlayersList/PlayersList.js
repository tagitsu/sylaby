import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlayersAsync } from '../../../redux/player/playerSlice';

import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';
import Button from '../../common/Button/Button';
import styles from './PlayersList.module.scss';

const PlayersList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlayersAsync());
  }, [dispatch]);

  const { players } = useSelector(state => state.player);

  console.log('home - players', players);
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
        <Button content={<Link to={`/player/${player.id}`}>Karta postaci</Link>} />
        <Button content={<Link to={`/player/${player.id}/game`}>Zacznij grę</Link>} />
      </div>
    )}
    </div>
  )
};

export default PlayersList;