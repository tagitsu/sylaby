import { Link } from 'react-router-dom';
import styles from '../Home/Home.module.scss';

const Home = ({ user, player }) => {

  console.log(player?.id);

  return(
    <div className={styles.home}>
        <Link to={`/game/${player?.id}`}><button>start</button></Link>

        <p> {} </p>

    </div>
  );
};

export default Home;