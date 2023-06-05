import { Link } from 'react-router-dom';

import styles from '../GameButton/GameButton.module.scss';

const GameButton = ({ game, activePlayerID }) => {

  return(
    <Link className={styles.game} to={`/game/${game.name}/${activePlayerID}`}>
      <p className={styles.game__title}>{game.title}</p>
      <p className={styles.game__difficulty}>{game.difficulty}</p>
      <img className={styles.game__img}src={`${process.env.PUBLIC_URL}/images/games/${game.name}.png`} />
    </Link>
  )
};


export default GameButton;