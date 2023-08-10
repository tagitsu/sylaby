import { Link } from 'react-router-dom';
import styles from '../Home/Home.module.scss';
import PlayersList from '../PlayersList/PlayersList';

const Home = ({ user }) => {

  const welcomeInfo = 
  <article className={styles.home__article}>
    <h1>Mamo, tato! Zagracie ze mną?</h1>
    <p> Witaj na stronie z łamigłówkami dla przedszkolaków. Zadania pełne liter, liczb, kolorów i kształtów pomogą dziecku w rozwoju podstawowych umiejętności językowych, matematycznych i logicznego myślenia. </p>
    <p> Jeśli chcesz już zacząć grać zaloguj się na swoje konto lub jako gość.
    </p>
    <ul>TO DO
      <li> podpowiedzi - dodaj przycisk wyjścia X z okna, zmień ich wielkość, styl, może zrobie z nich modale?</li>
      <li> logo do zmiany </li>
      <li> wygląd i wielkość przycisków </li>
    </ul>
  </article>;

  const playersList =
  <article className={styles.home__article}>
    <PlayersList user={user}/>
  </article>;



  return(
    <div className={styles.home}>
      { user && playersList }
      { !user && welcomeInfo }
    </div>
  

  );
};

export default Home;