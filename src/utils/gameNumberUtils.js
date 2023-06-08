
const utils = {};

utils.mathSigns = [
  { name: 'less', icon: '<' },
  { name: 'greater', icon: '>' },
  { name: 'equal', icon: '=' },
];

utils.setGameTurn = (setNumber1, setNumber2, setSolution, setAnswer, setIsCorrect, setIsWrong, setMathSigns, setHelp) => {

  setAnswer();
  setIsCorrect();
  setIsWrong();
  setMathSigns(utils.mathSigns);
  setHelp(false);

  const number1 = Math.floor(Math.random() * 20 );
  const number2 = Math.floor(Math.random() * 20 );
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

utils.submitSolution = (answer, solution, setIsCorrect, setIsWrong) => {

  if ( answer === solution ) {
    setIsWrong(false);
    setIsCorrect(true);
  } else {
    setIsCorrect(false);
    setIsWrong(true);
  }
};

utils.addPoints = (isCorrect, updatePlayer, activePlayer) => {

  if ( isCorrect ) {
    updatePlayer({ ...activePlayer, xp: activePlayer.xp + 1 });
  } else {
    updatePlayer({ ...activePlayer, xp: activePlayer.xp });
  }
}

export default utils;