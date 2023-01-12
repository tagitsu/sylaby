import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';
import styles from '../Home/Home.module.scss';
import { chooseCurrentPlayer } from '../../features/player/playerSlice';


const Home = () => {
  const dispatch = useDispatch();

  const players = useSelector(state => state.player.players);
  const currentPlayer = useSelector(state => state.player.currentPlayer);
  
  const choosePlayer = (e, id) => {
    e.preventDefault();
    dispatch(chooseCurrentPlayer(id));
    console.log(`wybieram garcza nr ${id}`);
  };
  console.log('current player', currentPlayer);


  return(
  <>
    {players.map( player => 
    <div key={player.id} className={styles.list}>
      <div className={styles.list__icon}>
        <PlayerIcon icon={player.icon} name={player.name} />
        <div className={styles.list__level} >
          <p className={styles.list__levelValue}>{player.level}</p>
        </div>
      </div>
      <p className={styles.list__name} >{player.name}</p>
      <Link 
        to={`/player/${player.id}`} 
        className={styles.list__btn} 
        >
        Karta postaci
      </Link>
      <Link 
        to={`/player/${player.id}/game`} 
        className={styles.list__btn} 
        onClick={(e) => choosePlayer(e, player.id)}
        >
        Zacznij grę
      </Link>
    </div>)}
  </>

  )
};

export default Home;