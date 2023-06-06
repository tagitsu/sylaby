
const utils = {};

utils.setGameTurn = (setDots, setOptions, setCorrectAnswer) => {

  setDots([]);
  setOptions([]);

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
    const randomColorR = Math.floor(Math.random() * 255 + 100);
    const randomColorG = Math.floor(Math.random() * 255 + 100);
    const randomColorB = Math.floor(Math.random() * 255 + 90);
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

utils.submitSolution = (
  e, 
  answer, 
  dots, 
  activePlayer, 
  updatePlayer, 
  ) => {

  e.preventDefault();

  if ( answer == dots.length ) {
    // TODO zamiast alertów chciałabym użyć portalu / modalu 
    let playerPoints = activePlayer.xp + 1;
    updatePlayer({ ...activePlayer, xp: playerPoints })
  } else if ( answer < dots.length ) {
      alert(`Na planszy znajduje się ${dots.length} kropek, a Twoja odpowiedź to ${answer}. Może któraś się schowała? Spróbuj jeszcze raz :)`)
  } else if ( answer > dots.length ) {
      alert(`Na planszy znajduje się ${dots.length} kropek, a Twoja odpowiedź to ${answer}. Może któraś kropka została policzona podwójnie? Spróbuj jeszcze raz :)`)
  }
};

export default utils;