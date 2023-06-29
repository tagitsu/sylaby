import { useState } from "react";
import { useGetPlayersQuery, useUpdatePlayerMutation, useGetLevelsQuery } from "../../../api/apiSlice";

import Button from "../../common/Button/Button";
import ButtonOK from '../../common/ButtonOK/ButtonOK';
import Option from "../../common/Option/Option";
import ActivePlayer from "../../features/ActivePlayer/ActivePlayer";
import Tips from "../../views/Tips/Tips";

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
  const [ isCorrect, setIsCorrect ] = useState();
  const [ isWrong, setIsWrong ] = useState();
  const [ answer, setAnswer ] = useState();
  const [ tip, setTip ] = useState(false);


  if (activePlayer) {
    return(
      <div className={styles.dots}>
        <ActivePlayer />
        { !dots.length && 
          <Tips 
            content={<p>Wciśnij start aby na planszy pojawiły się kolorowe bańki. Twoim zadaniem jest policzenie ich. Wciśnij przycisk z liczbą baniek. Jeśli Twoja odpowiedź jest prawidłowa zaznaczony przycisk podświetli się na zielono, jeśli błędna, na czerwono. Aby przejść dalej naciśnij przycisk OK. </p>} 
            onClick={() => setTip(!tip)}
            tip={tip}
          /> 
        }

        { !dots.length && 
            <Button
              name='setupBtn'
              content='Start'
              onClick={ () => {utils.setGameTurn(setDots, setOptions)}}
            /> 
        }
        <section className={styles.dots__board}>
          { dots.length > 0 && 
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
          }
          { options.length > 0 && 
            <div className={styles.dots__options}>
              <Option 
                key={1} 
                content={options[0]} 
                dots={dots.length} 
                onClick={(e) => utils.submitSolution(e, e.target.innerText, dots, setIsCorrect, setIsWrong, setAnswer)} 
                isCorrect={isCorrect}
                isWrong={isWrong}
                answer={answer}
              />
              <Option 
                key={2} 
                content={options[1]}
                dots={dots.length} 
                onClick={(e) => utils.submitSolution(e, e.target.innerText, dots, setIsCorrect, setIsWrong, setAnswer)} 
                isCorrect={isCorrect}
                isWrong={isWrong}
                answer={answer}
              />
              <Option 
                key={3} 
                content={options[2]} 
                dots={dots.length} 
                onClick={(e) => utils.submitSolution(e, e.target.innerText, dots, setIsCorrect, setIsWrong, setAnswer)} 
                isCorrect={isCorrect}
                isWrong={isWrong}
                answer={answer}
              />
            </div>
          }
        </section>
        { answer > 0 && <ButtonOK onClick={() => utils.addPoints(isCorrect, activePlayer, updatePlayer)} />}
      </div>
    );
  }
};

export default GameDots;