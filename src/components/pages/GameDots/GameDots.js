import { useState } from "react";
import { useParams } from "react-router";
import { useGetPlayersQuery, useGetSyllablesQuery, useUpdatePlayerMutation, useGetLevelsQuery } from "../../../api/apiSlice";

import Button from "../../common/Button/Button";
import ActivePlayer from "../../features/ActivePlayer/ActivePlayer";
import styles from './GameDots.module.scss';
import utils from '../../../utils/gameDotsUtils';
import clsx from 'clsx';

const GameDots = () => {

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  const activePlayerParam = useParams();
  const [ updatePlayer ] = useUpdatePlayerMutation();

  let activePlayer, playerLevel;
  if (playersOK && levelsOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
    if (activePlayer.xp >= playerLevel.nextLevel) {
      updatePlayer({ ...activePlayer, level: activePlayer.level + 1, xp: 0 })
    }
  }
  console.log('kropki ', activePlayer);

  const [ dots, setDots ] = useState([]);
  const [ answer, setAnswer ] = useState(0);
  const root = document.querySelector(':root');
  
  let dotsBoard;

  if (dots !== undefined) {
    dotsBoard = 
      <div className={styles.dots__dots}>
        { dots.map( dot => <div key={dot.id} className={clsx(styles.dots__dot)} size={dot.size} color={dot.color} />) }
      </div>
  } else {
      dotsBoard = 
      <div> nie ma jeszcze kropek </div>
  }

  dots.map ( dot => root.style.setProperty('--dot-color', dot.color) );
  dots.map ( dot => root.style.setProperty('--dot-size', dot.size) );

  const handleChange = (e) => {
    e.preventDefault();
    console.log('wartość inputa', e.target.value);
    setAnswer(e.target.value);
  }

  console.log('stan odpowiedzi', answer);


    return(
    <div className={styles.dots}>
      <ActivePlayer id={activePlayerParam.id} />
      <section className={styles.dots__board}>
        <Button
          content='Wylosuj kropki'
          onClick={ () => {utils.setGameTurn(setDots)}}
        />
        <div className={styles.dots__dots}>
          {dotsBoard}
        </div>
      </section>
      <section>
        <input className={styles.dots__input} value={answer} onChange={handleChange} />
      </section>
      <Button 
        content='OK' 
        onClick={ (e) => utils.submitSolution(e, answer, setAnswer, dots, setDots, activePlayer, updatePlayer)}
        />
    </div>
  );

};

export default GameDots;