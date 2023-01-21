import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';
import styles from '../Home/Home.module.scss';
import AddPlayerForm from '../../features/AddPlayerForm/AddPlayerForm';
import { getPlayersAsync } from '../../../redux/player/playerSlice';
import { useEffect, useState } from 'react';

// API - pobieranie obiektów-graczy do magazynu - playerSlice

const Home = () => {

  const dispatch = useDispatch();

  const [ activePlayerID, setActivePlayerID ] = useState(null);
  const [ activePlayerObject, setActivePlayerObject ] = useState(null);

  useEffect(() => {
    dispatch(getPlayersAsync());
  }, [dispatch]);

  const { players } = useSelector(state => state.player);

  console.log('home - players', players);

  const handleActivePlayer = (e, id) => {
    e.preventDefault();
    setActivePlayerID(id);
  };
  console.log('home - active player ID', activePlayerID);

  useEffect(() => {
    if (activePlayerID) {
      setActivePlayerObject(players.filter( player => player.id === activePlayerID))
    }
  }, [players])
  


  console.log('home - players', players);
  console.log('home - active player ID', activePlayerID);
  console.log('home - obiekt katywnego gracza', activePlayerObject);




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
        <p className={styles.list__name} onClick={(e) => handleActivePlayer(e, player.id)}>{player.name}</p>
        <button className={styles.list__btn} onClick={(e) => handleActivePlayer(e, player.id)}>
          <Link to={`/player/${player.id}`}>Karta postaci</Link>
        </button>
        <button className={styles.list__btn} onClick={(e) => handleActivePlayer(e, player.id)}>
          <Link to={`/player/${player.id}/game`}>Zacznij grę</Link>
        </button>
      </div>
    )}
    <AddPlayerForm />
  </>

  );
};

export default Home;