import { useState } from "react";
import { useParams } from "react-router";
import { useGetPlayersQuery, useUpdatePlayerMutation, useGetLevelsQuery } from "../../../api/apiSlice";

import Button from "../../common/Button/Button";
import ActivePlayer from "../../features/ActivePlayer/ActivePlayer";
import styles from './GameDots.module.scss';
import utils from '../../../utils/gameDotsUtils';

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

  const [ dots, setDots ] = useState([]);
  const [ answer, setAnswer ] = useState('');
  
  let dotsBoard;

  if (dots !== undefined) {
    dotsBoard = 
      <div className={styles.dots__dots}>
        { dots.map( dot => 
          <div 
            key={dot.id} 
            className={styles.dots__dot} 
            style={{
              backgroundColor: dot.color, 
              width: dot.size, 
              height: dot.size,
              top: dot.top,
              left: dot.left
            }} 
          />) 
        }
      </div>
  } else {
      dotsBoard = 
      <div> nie ma jeszcze kropek </div>
  }

  
  const handleChange = (e) => {
    e.preventDefault();
    setAnswer(e.target.value);
  }

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