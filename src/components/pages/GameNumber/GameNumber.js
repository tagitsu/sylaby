import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useGetPlayersQuery, useUpdatePlayerMutation, useGetLevelsQuery } from "../../../api/apiSlice";
import ActivePlayer from "../../features/ActivePlayer/ActivePlayer";
import styles from './GameNumber.module.scss';
import Button from "../../common/Button/Button";
import ButtonOK from '../../common/ButtonOK/ButtonOK';
import utils from '../../../utils/gameNumberUtils';
import levelUp from '../../../utils/levelUpUtils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEquals, faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import Sign from "../../common/Sign/Sign";
import clsx from "clsx";

const GameNumber = () => {

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

  const [ number1, setNumber1 ] = useState('');
  const [ number2, setNumber2 ] = useState('');
  const [ solution, setSolution ] = useState('');
  const [ answer, setAnswer ] = useState();
  const [ isCorrect, setIsCorrect ] = useState();
  const [ isWrong, setIsWrong ] = useState();
  const [ mathSigns, setMathSigns ] = useState([
    {
      name: 'less',
      icon: faLessThan,
    },
    {
      name: 'greater',
      icon: faGreaterThan,
    },
    {
      name: 'equal',
      icon: faEquals,
    },
  ]);

  const [ { isOverSign }, dropSign ] = useDrop({
    accept: 'sign',
    drop: (item) => {
      setAnswer([item]);
      setMathSigns([]);
      utils.submitSolution(item.name, solution, updatePlayer, activePlayer, setIsCorrect, setIsWrong);
    },
    collect: monitor => ({
      isOverSign: !!monitor.isOver(),
    })
  });

  return(
    <div className={styles.number}>
      <ActivePlayer />
      <div className={styles.number__board}>
        <Button 
          content='losuj' 
          onClick={ () => utils.setGameTurn(setNumber1, setNumber2, setSolution, setAnswer, setIsCorrect, setIsWrong) }
        />
        <div className={styles.number__box}>
          <div key={1} className={styles.number__number}> {number1} </div>
          <div key={2} className={clsx(styles.number__sign, isCorrect ? styles.correct : '', isWrong ? styles.wrong : '' )} ref={dropSign}>
            { answer?.map( sign => <Sign key={sign.name} name={sign.name} icon={sign.icon}/>) }
          </div>
          <div key={3} className={styles.number__number}> {number2} </div>
        </div>
        <div className={styles.number__box}>
          { mathSigns.map( sign => { 
            return(
              <Sign key={sign.name} name={sign.name} icon={sign.icon} />
            )}
          )}
        </div>
        <ButtonOK onClick={() => utils.addPoints(isCorrect, updatePlayer, activePlayer)}/>
      </div>
    </div>
  );
};

export default GameNumber;