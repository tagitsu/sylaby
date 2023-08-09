import { Link } from 'react-router-dom';
import Spinner from '../../common/Spinner/Spinner';
import styles from '../Home/Home.module.scss';
import PlayersList from '../PlayersList/PlayersList';

const Home = ({ user }) => {


  return(
    <div className={styles.home}>
      <article className={styles.home__article}>
        <p> Witaj na stronie z łamigłówkami dla przedszkolaków. Zadania pełne liter, liczb, kolorów i kształtów pomogą dziecku w rozwoju podstawowych umiejętności językowych, matematycznych i logicznego myślenia. </p>
        <p> Jeśli chcesz już zacząć grać, 
          <Link to='/playerslist'> wybierz </Link> 
          lub 
          <Link to='/newplayer'> stwórz </Link>
          swoją postać. 
        </p>
        <ul>TO DO
          <li> podpowiedzi - dodaj przycisk wyjścia X z okna, zmień ich wielkość, styl, może zrobie z nich modale?</li>
        </ul>
      </article>
      <article className={styles.home__article}>
        <PlayersList user={user}/>
      </article>
    </div>
  

  );
};

export default Home;