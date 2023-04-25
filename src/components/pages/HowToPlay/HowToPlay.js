import styles from '../HowToPlay/HowToPlay.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import Button from '../../common/Button/Button';

const HowToPlay = () => {

  const games = [
    {
      id: 1,
      name: 'Sylaby',
      difficulty: 2,
      age: '6+',
      rules: 'Wylosuj zestaw sylab. Dopasuj do pierwszej sylaby (w zielonej ramce) drugą tak aby razem stworzyły słowo. Pojawi się ono w niebieskiej ramce. Jeśli chcesz potwierdzić swoją odpowiedź, kliknij przycisk OK. '
    },
    {
      id: 2,
      name: 'Brakująca liczba',
      difficulty: 3,
      age: '7+',
      rules: 'Wylosuj równanie. Wpisz taką liczbę żeby aby równanie było prawidłowe. Jeśli chcesz potwierdzić swoją odpowiedź, kliknij przycisk OK. '
    },
    {
      id: 3,
      name: 'Kropki',
      difficulty: 1,
      age: '5+',
      rules: 'Wylosuj zestaw kropek. Policz ile kropek pojawiło się na ekranie. Uważaj niektóre z nich sprytnie się chowają :) Wpisz w okienku ile kropek widzisz. Jeśli chcesz potwierdzić swoją odpowiedź, kliknij przycisk OK. '
    },
  ];

  const [ choosenGame, setChoosenGame ] = useState('Sylaby');

  const handleClick = (e) => {
    e.preventDefault();
    setChoosenGame(e.target.innerText);
  };

  console.log('wybrana gra', choosenGame);
  
  const [ gameObject ] = games.filter( game => choosenGame === game.name);
  console.log('obiekt gry', gameObject);
  const gameDifficulty = [];
  for ( let i = 0; i < gameObject.difficulty; i++) {
    gameDifficulty[i] = i;
  }
  console.log('trudność', gameDifficulty);


  return(
    <div className={styles.how}>
      <p>
        Kliknij i przeczytaj jakie są zasady gry.
      </p>
      <div className={styles.how__buttons}>
        { games.map( game => <Button key={game.id} onClick={handleClick} content={game.name}>{game.name}</Button>) }
      </div>
      { choosenGame && 
        <article className={styles.how__game}>
          <h1>{gameObject.name}</h1>
          <h2>
            Poziom trudności: {gameDifficulty.map( star => <FontAwesomeIcon key={star} icon={faStar} /> )}
            {/** wyświetlanie gwiazdek <FontAwsomeIcon /> w takiej ilości jak wartość difficulty */}
          </h2>
          <h3>Wiek: {gameObject.age}</h3>
          <p>Zasady gry: {gameObject.rules}</p>
        </article>
      }
    </div>
  );
};

export default HowToPlay;