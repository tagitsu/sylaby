import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PlayerIcon from '../../views/PlayerIcon/PlayerIcon';
import styles from '../Home/Home.module.scss';
import { chooseCurrentPlayer } from '../../features/players/playersSlice';


const Home = () => {
  const dispatch = useDispatch();

  const players = useSelector(state => state.players.players);
  const currentPlayer = useSelector(state => state.players.currentPlayer);
  console.log(currentPlayer);
  const choosePlayer = (e, id) => {
    e.preventDefault();
    dispatch(chooseCurrentPlayer(id));
    console.log(`wybieram garcza nr ${id}`);
  };

  return(
  <>
    {players.map( player => 
    <div key={player.id} className={styles.list}>
      <PlayerIcon icon={player.icon} name={player.name} />
      <p>{player.name}</p>
      <p>LVL: {player.level}</p>
      <Link to={`/player/${player.id}`} onSubmit={(e) => choosePlayer(e, player.id)}>Karta postaci</Link>
      <Link to={`/player/${player.id}/game`}>Zacznij grę</Link>
    </div>)}
  </>

  )
};

export default Home;