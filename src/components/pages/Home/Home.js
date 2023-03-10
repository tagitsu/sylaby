import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';
import styles from '../Home/Home.module.scss';
import { chooseCurrentPlayer } from '../../../redux/player/playerSlice';
import AddPlayerForm from '../../features/AddPlayerForm/AddPlayerForm';
import { getPlayersAsync } from '../../../redux/player/playerSlice';
import { useEffect } from 'react';

const Home = () => {
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getPlayersAsync());
  }, [dispatch]);
  
  const choosePlayer = (e, id) => {
    e.preventDefault();
    dispatch(chooseCurrentPlayer(id));
  };

  const {players} = useSelector(state => state.player);
  console.log('home players', players);

  return(
  <>
    {players.map( player => 
      <div key={player.id} className={styles.list}>
        <div className={styles.list__icon}>
          <PlayerIcon id={player.id} icon={player.icon} name={player.name} color={player.color} />
          <div className={styles.list__level} >
            <p className={styles.list__levelValue}>{player.level}</p>
          </div>
        </div>
        <p className={styles.list__name} >{player.name}</p>
        <button className={styles.list__btn} onClick={(e) => choosePlayer(e, player.id)}>
          <Link to={`/player/${player.id}`}>Karta postaci</Link>
        </button>
        <button className={styles.list__btn} onClick={(e) => choosePlayer(e, player.id)}>
          <Link to={`/player/${player.id}/game`}>Zacznij grę</Link>
        </button>
      </div>
    )}
    <AddPlayerForm />
  </>

  );
};

export default Home;