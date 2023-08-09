import styles from '../ActivePlayer/ActivePlayer.module.scss';
import { useState, useEffect } from 'react';
import { getDocs, collection,  } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useGetPlayersQuery, useGetLevelsQuery } from "../../../api/apiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faGamepad } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from "../ProgressBar/ProgressBar";
import Spinner from '../../common/Spinner/Spinner';
import Button from '../../common/Button/Button';

const ActivePlayer = ({ user, activePlayer }) => {

  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery(); 

  let playerLevel;
  if (levelsOK && activePlayer) {
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
  }

  if (activePlayer && playerLevel) {
    return(
    <div className={styles.active}>
      <div className={styles.active__icon}>
        <Link to={`/player/${activePlayer.id}`}>
          <img src={`${process.env.PUBLIC_URL}/images/characters/${activePlayer.icon}`} alt={`ikona ${activePlayer.icon}`} />
        </Link>
      </div>
      <div className={styles.active__name}> {activePlayer.name} </div>
      <div className={styles.active__btn}>
        <Link to={`/game/${activePlayer.id}`}>
          <FontAwesomeIcon icon={faGamepad}></FontAwesomeIcon>
        </Link>
      </div>
      <div className={styles.active__bar}>
        <ProgressBar user={user} xp={activePlayer.xp} levelUp={playerLevel.nextLevel} content={activePlayer.xp} />
      </div>
    </div>
    );
  } else {
    return(<Spinner content='...wczytywanie aktywnego gracza' />)
  }
};

export default ActivePlayer;