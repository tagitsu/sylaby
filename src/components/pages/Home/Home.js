import { Link } from 'react-router-dom';
import Spinner from '../../common/Spinner/Spinner';
import styles from '../Home/Home.module.scss';

const Home = () => {

  

  return(
  <div>
    <p> Witaj w aplikacji z zadaniami pełnymi liter, liczb, kolorów i kształtów. </p>
    <p> Jeśli chcesz już zacząć grać, 
      <Link to='/playerslist'> wybierz </Link> 
      lub 
      <Link to='/newplayer'> stwórz </Link>
      swoją postać. 
    </p>
    <Spinner />
  </div>

  );
};

export default Home;