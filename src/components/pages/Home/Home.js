import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';
import styles from '../Home/Home.module.scss';
import { chooseCurrentPlayer } from '../../../redux/player/playerSlice';


const Home = () => {
  const dispatch = useDispatch();

  const players = useSelector(state => state.player.players);
  console.log('home - players', players);
  
  const choosePlayer = (e, id) => {
    e.preventDefault();
    dispatch(chooseCurrentPlayer(id));
  };


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
      <button onClick={(e) => choosePlayer(e, player.id)}>
        <Link to={`/player/${player.id}`} className={styles.list__btn} >Karta postaci</Link>
      </button>
      <button onClick={(e) => choosePlayer(e, player.id)}>
        <Link to={`/player/${player.id}/game`} className={styles.list__btn} >Zacznij grę</Link>
      </button>
    </div>)}
  </>

  )
};

export default Home;