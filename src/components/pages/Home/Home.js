import { Link } from 'react-router-dom';
import styles from '../Home/Home.module.scss';
import Button from '../../common/Button/Button';

const Home = ({ user, player }) => {

  if (user) {
    return(
      <div className={styles.home}>
        <Link to={`/game/${player?.id}`}><Button content='do pary' /></Link>
        <Link to={`/game1/${player?.id}`}><Button content='słowa' /></Link>

      </div>
    );
    }
};

export default Home;