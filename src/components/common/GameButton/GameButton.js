import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from '../GameButton/GameButton.module.scss';

const GameButton = (props) => {

  const star = <FontAwesomeIcon icon={faStar} />;



  for ( let i = 0; i < props.difficulty; i++ ) {
    console.log('star', star);
  };

  return(
    <Link 
      to={`/game/${props.gameAddress}/${props.activePlayerID}`} 
      >
      <p>{props.gameName}</p>
      <div>
        
      </div>
    </Link>
  )

}


export default GameButton;