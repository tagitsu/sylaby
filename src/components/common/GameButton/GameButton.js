import { Link } from 'react-router-dom';

import styles from '../GameButton/GameButton.module.scss';

const GameButton = ({ game, activePlayerID }) => {

  const handleMouseOver = () => {
    console.log('a jak hover to będzie co');
  }

  return(
    <Link 
      className={styles.game} 
      to={`/game/${game.name}/${activePlayerID}`}
      onMouseOver={handleMouseOver}
    >
      <p className={styles.game__title}>{game.title}</p>
      <div className={styles.game__graph}>
        <img className={styles.game__img} src={`${process.env.PUBLIC_URL}/images/games/${game.name}.png`} />
        <p className={styles.game__difficulty}>{game.difficulty}</p>
      </div>
    </Link>
  )
};


export default GameButton;