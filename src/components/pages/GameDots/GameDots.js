import { useState } from "react";
import { useGetPlayersQuery, useUpdatePlayerMutation, useGetLevelsQuery } from "../../../api/apiSlice";

import Button from "../../common/Button/Button";
import Option from "../../common/Option/Option";
import ActivePlayer from "../../features/ActivePlayer/ActivePlayer";
import styles from './GameDots.module.scss';
import utils from '../../../utils/gameDotsUtils';
import playerUtils from "../../../utils/playerUtils";

const GameDots = () => {

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  const [ updatePlayer ] = useUpdatePlayerMutation();

  let activePlayer, playerLevel, nextLevel;
  if (playersOK && levelsOK) {
    [ activePlayer ] = players.filter( player => player.isActive );
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id );
    [ nextLevel ] = levels.filter( level => activePlayer.level + 1 === level.id );
    if (activePlayer.xp >= playerLevel.nextLevel) { playerUtils.levelUp(updatePlayer, activePlayer, nextLevel) }
  }

  const [ dots, setDots ] = useState([]);
  const [ options, setOptions ] = useState([]);
  const [ correctAnswer, setCorrectAnswer ] = useState();

  console.log('sprawdzam dots', dots);
  console.log('sprawdzam dots, options, Correct', dots, options, correctAnswer);
  console.log('dots activePlayer, playerLevel, nextLevel', activePlayer, playerLevel, nextLevel);

  if (activePlayer) {
    return(
      <div className={styles.dots}>
        <ActivePlayer />
        <section className={styles.dots__board}>
          { 
            !dots.length && 
            <Button
              content={'Wylosuj bańki'}
              onClick={ () => {utils.setGameTurn(setDots, setOptions)}}
            /> 
          }
          <div className={styles.dots__box}>
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
            <div className={styles.dots__options}>
              { options.map( option => 
                  <Option 
                    key={option} 
                    content={option}
                    onClick={(e) => utils.submitSolution(e, e.target.innerText, dots, activePlayer, updatePlayer, setDots, setOptions)}
                  />
                )
              }
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default GameDots;