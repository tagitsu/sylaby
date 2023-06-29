import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from '../GameButton/GameButton.module.scss';

const GameButton = ({ game, activePlayerID }) => {

  const handleMouseOver = () => {
    console.log('kursor nad przyciskiem gry');
  }

  return(
    <Link 
      className={clsx(game.status === 'in progress' ? styles.soon : styles.game)} 
      to={`/game/${game.name}/${activePlayerID}`}
      onMouseOver={handleMouseOver}
    >
      <p className={styles.game__title}>{game.title}</p>
      <div className={styles.game__graph}>
        <img className={styles.game__img} src={`${process.env.PUBLIC_URL}/images/games/${game.name}.png`} />
        <p className={styles.game__difficulty}>{game.difficulty}</p>
        { game.status === 'in progress' && <p className={styles.soon__info}>już wkrótce!</p> }
      </div>
    </Link>
  )
};


export default GameButton;