
const utils = {};

utils.setGameTurn = (setNumber1, setNumber2, setSolution, setAnswer, setIsCorrect, setIsWrong) => {

  setAnswer();
  setIsCorrect();
  setIsWrong();

  const number1 = Math.floor(Math.random() * 100 );
  const number2 = Math.floor(Math.random() * 100 );
  let solution;

  if (number1 > number2) {
    solution = 'greater';
  } else if (number1 < number2) {
    solution = 'less';
  } else {
    solution = 'equal';
  }

  setNumber1(number1);
  setNumber2(number2);
  setSolution(solution);
};

utils.submitSolution = (answer, solution, updatePlayer, activePlayer, setIsCorrect, setIsWrong) => {
  

  console.log('utils odpowiedź', answer);

  if ( answer === solution) {
    console.log('Odpowiedź jest prawidłowa');
    setIsWrong(false);
    setIsCorrect(true);
  } else {
    console.log('odpowiedź jest błędna');
    setIsCorrect(false);
    setIsWrong(true);
  }
  
};

utils.addPoints = (isCorrect, updatePlayer, activePlayer) => {
  console.log('add Points działa');

  if (isCorrect) {
    updatePlayer({ ...activePlayer, xp: activePlayer.xp + 1 });
  }
}

export default utils;