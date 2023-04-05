import { Link } from 'react-router-dom';
import styles from '../Home/Home.module.scss';
import AddPlayerForm from '../../features/AddPlayerForm/AddPlayerForm';
import CurrentPlayer from '../../features/CurrentPlayer/CurrentPlayer';
// import { useGetPlayersQuery } from '../../../redux/apiSlice/apiSlice';
// API - pobieranie obiektów-graczy do magazynu - playerSlice

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