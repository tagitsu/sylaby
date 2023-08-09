import appUtils from "./appUtils";
import playerUtils from "./playerUtils";

const utils = {};

utils.setGameTurn = (setDots, setOptions) => {

  const numbers = [];
  const options = [];

  for ( let i = 1; i < 10; i++ ) {
    numbers.push(i);
  }
  for ( let i = 0; i < 3; i++ ) {
    options[i] = numbers.splice(Math.floor(Math.random() * numbers.length), 1)
  }

  const dots = [];

  for ( let i = 1; i <= options[1]; i++ ) {
    const randomSize = Math.floor(Math.random() * 30 + 10);
    const randomColorR = Math.floor(Math.random() * 255 + 120);
    const randomColorG = Math.floor(Math.random() * 255 + 120);
    const randomColorB = Math.floor(Math.random() * 255 + 120);
    const randomPositionTop = Math.floor(Math.random() * 70);
    const randomPositionLeft = Math.floor(Math.random() * 70);
    const dotTop = `${randomPositionTop}%`;
    const dotLeft = `${randomPositionLeft}%`;
    const dotColor = `rgb(${randomColorR}, ${randomColorG}, ${randomColorB})`;
    const dotSize = `${randomSize}%`;
    dots.push({ id: i, color: dotColor, size: dotSize, top: dotTop, left: dotLeft });
  }

  setDots(dots);
  setOptions(options.sort());
};

utils.submitSolution = (e, answer, dots, setIsCorrect, setIsWrong, setAnswer) => {
  e.preventDefault();
  setAnswer(answer);
  if ( answer == dots.length ) {
    setIsCorrect(true);
    setIsWrong(false);
  } else if ( answer < dots.length ) {
      setIsWrong(true);
      setIsCorrect(false);
  } else if ( answer > dots.length ) {
      setIsWrong(true);
      setIsCorrect(false);
  }
};

utils.endGameTurn = (isCorrect, userId, playerId, setAnswer, setDots, setOptions, setIsCorrect, setIsWrong) => {
  if ( isCorrect ) {
    playerUtils.addPointToPlayer(userId, playerId);
  }
  setAnswer();
  setDots();
  setOptions();
  setIsCorrect();
  setIsWrong();
};

export default utils;