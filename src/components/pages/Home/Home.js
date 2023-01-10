import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  
  const { players } = useSelector(state => state.players);

  return(
    <>
    {players.map( player => 
    <div key={player.id}>
      <div>{player.icon}</div>
      <p>{player.name}</p>
      <p>LVL: {player.level}</p>
      <Link to='/player/id'>Karta postaci</Link>
      <Link to='/player/id/game'>Zacznij grę</Link>
    </div>)}
  </>

  )
};

export default Home;