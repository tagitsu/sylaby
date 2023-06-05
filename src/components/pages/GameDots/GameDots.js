import { useState } from "react";
import { useGetPlayersQuery, useUpdatePlayerMutation, useGetLevelsQuery } from "../../../api/apiSlice";

import Button from "../../common/Button/Button";
import Option from "../../common/Option/Option";
import ActivePlayer from "../../features/ActivePlayer/ActivePlayer";
import styles from './GameDots.module.scss';
import utils from '../../../utils/gameDotsUtils';
import levelUp from "../../../utils/levelUpUtils";

const GameDots = () => {

  const { data: players, isSuccess: playersOK } = useGetPlayersQuery();
  const { data: levels, isSuccess: levelsOK } = useGetLevelsQuery();
  const [ updatePlayer ] = useUpdatePlayerMutation();

  let activePlayer, playerLevel, nextLevel;
  if (playersOK && levelsOK) {
    [ activePlayer ] = players.filter( player => player.isActive);
    [ playerLevel ] = levels.filter( level => activePlayer.level === level.id);
    [ nextLevel ] = levels.filter( level => activePlayer.level + 1 === level.id);
    if (activePlayer.xp >= playerLevel.nextLevel) { levelUp.levelUp(updatePlayer, activePlayer, nextLevel) }
  }

  const [ dots, setDots ] = useState([]);
  //const [ hidden, setHidden ] = useState(true);
  const [ options, setOptions ] = useState([]);
  const [ correctAnswer, setCorrectAnswer ] = useState();
  console.log('sprawdzam dots', dots);
  console.log('sprawdzam dots, options, Correct', dots, options, correctAnswer);
  let dotsBoard = 
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
</div>;

  // if (dots !== undefined) {
  //   dotsBoard = 
  //     <div className={styles.dots__dots}>
  //       { dots.map( dot => 
  //         <div 
  //           key={dot.id} 
  //           className={styles.dots__dot} 
  //           style={{
  //             backgroundColor: dot.color, 
  //             width: dot.size, 
  //             height: dot.size,
  //             top: dot.top,
  //             left: dot.left
  //           }} 
  //         />) 
  //       }
  //     </div>
  // } else {
  //     dotsBoard = 
  //     <div> Kliknij w przycisk i wylosuj bańki! </div>
  // }

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
        <div className={styles.dots__dots}>
          <div>
            {dotsBoard}
          </div>
          <div className={styles.dots__options}>
            { options.map( option => 
                <Option 
                  key={option} 
                  content={option}
                  onClick={(e) => utils.submitSolution(e, e.target.innerText, dots, setCorrectAnswer, activePlayer, updatePlayer, setDots, setOptions)}
                  correct={correctAnswer}
                />
              )
            }
          </div>
        </div>
      </section>
    </div>
  );

};

export default GameDots;