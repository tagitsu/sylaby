import { Link } from 'react-router-dom';

const Home = () => {
  
  return(
    <ul>
    <li>
      <div>icon</div>
      <p>player name</p>
      <p>level</p>
      <Link to='/player/id'>player profile</Link>
      <Link to='/player/id/game'>PLAY</Link>
    </li>
  </ul>

  )
};

export default Home;