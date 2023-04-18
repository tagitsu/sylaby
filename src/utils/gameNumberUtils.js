
const utils = {};

utils.setGameTurn = (setNumber1, setNumber2, setEquationResult) => {

  const randomNumber1 = Math.floor(Math.random() * 10);
  const randomNumber2 = Math.floor(Math.random() * 10);
  const equationResult = randomNumber1 + randomNumber2;
  setNumber1(randomNumber1);
  setNumber2(randomNumber2);
  setEquationResult(equationResult);
};

utils.submitSolution = (e, playerAnswer, equationResult, updatePlayer, activePlayer, setPlayerAnswer) => {
  e.preventDefault();
  const answer = parseInt(playerAnswer);
  if (answer === equationResult) {
    console.log('Odpowiedź jest prawidłowa')
    updatePlayer({ ...activePlayer, xp: activePlayer.xp + 1 });
  } else {
    console.log('odpowiedź jest błędna', typeof answer, answer, typeof equationResult, equationResult)
  }
  setPlayerAnswer('');
};

export default utils;