
const utils = {};

utils.setGameTurn = (setDots) => {

  const randomNumber = Math.floor(Math.random() * 10) + 1;
    const dots = [];
    for ( let i = 1; i < randomNumber; i++ ) {
      const randomSize = Math.floor(Math.random() * 100 + 50);
      const randomColorR = Math.floor(Math.random() * 255);
      const randomColorG = Math.floor(Math.random() * 255);
      const randomColorB = Math.floor(Math.random() * 255);
      const dotColor = `rgb(${randomColorR}, ${randomColorG}, ${randomColorB})`;
      const dotSize = `${randomSize}px`;
      dots.push({ id: i, color: dotColor, size: dotSize });
    }

  console.log('kropki', dots);
  setDots(dots);
};

utils.submitSolution = (e, answer, setAnswer, dots, setDots, activePlayer, updatePlayer) => {
  e.preventDefault();

  if ( answer == dots.length ) {
    console.log('odpowiedź zagadza się z wylosowaną ilością kropek');
    console.log('ile punktów ma gracz', activePlayer);
    let playerPoints = activePlayer.xp + 1;
    updatePlayer({ ...activePlayer, xp: playerPoints })
  } else {
    console.log(`nie zgadza się, tablica ma długość ${dots.length}, a odpowiedź to ${answer}`)
  }
  setAnswer(0);
  setDots([]);

};

export default utils;