import { Link } from 'react-router-dom';
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
  </div>

  );
};

export default Home;