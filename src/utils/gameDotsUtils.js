
const utils = {};

utils.setGameTurn = (setDots) => {

  const randomNumber = Math.floor(Math.random() * 10) + 1;
    const dots = [];
    for ( let i = 1; i < randomNumber; i++ ) {
      const randomSize = Math.floor(Math.random() * 100 + 50);
      const randomColorR = Math.floor(Math.random() * 255);
      const randomColorG = Math.floor(Math.random() * 255);
      const randomColorB = Math.floor(Math.random() * 255);
      const randomPositionTop = Math.floor(Math.random() * 100);
      const randomPositionLeft = Math.floor(Math.random() * 100);
      const dotTop = `${randomPositionTop}%`;
      const dotLeft = `${randomPositionLeft}%`;
      const dotColor = `rgb(${randomColorR}, ${randomColorG}, ${randomColorB})`;
      const dotSize = `${randomSize}px`;
      dots.push({ id: i, color: dotColor, size: dotSize, top: dotTop, left: dotLeft });
    }

  setDots(dots);
};

utils.submitSolution = (e, answer, setAnswer, dots, setDots, activePlayer, updatePlayer) => {
  e.preventDefault();

  if ( answer == dots.length ) {
    alert(`Brawo! Na planszy widać ${answer} kropek. Zdobywasz punkt :)`);
    let playerPoints = activePlayer.xp + 1;
    updatePlayer({ ...activePlayer, xp: playerPoints })
  } else if ( answer < dots.length ) {
      alert(`Na planszy znajduje się ${dots.length} kropek, a Twoja odpowiedź to ${answer}. Może któraś się schowała? Spróbuj jeszcze raz :)`)
  } else if ( answer > dots.length ) {
      alert(`Na planszy znajduje się ${dots.length} kropek, a Twoja odpowiedź to ${answer}. Może któraś kropka została policzona podwójnie? Spróbuj jeszcze raz :)`)

  }
  setAnswer(0);
  setDots([]);

};

export default utils;