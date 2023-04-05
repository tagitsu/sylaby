import { Link } from 'react-router-dom';
import styles from '../Home/Home.module.scss';

const Home = () => {

  

  return(
  <div>
    <p> Witaj w grze pełnej liter, sylab i powstających z nich słów. </p>
    <p> Jeśli chcesz już zacząć grać, 
      <Link to='/players'> wybierz </Link> 
      lub 
      <Link to='/newplayer'> stwórz </Link>
      swoją postać. 
    </p>
  </div>

  );
};

export default Home;