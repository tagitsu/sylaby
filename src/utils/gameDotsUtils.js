
const utils = {};

utils.setGameTurn = (setDots, setOptions) => {

  setDots([]);
  setOptions([]);

  const randomNumber = Math.floor(Math.random() * 9 + 1);

  let dots = [];

  for ( let i = 1; i <= randomNumber; i++ ) {
    const randomSize = Math.floor(Math.random() * 80 + 50);
    const randomColorR = Math.floor(Math.random() * 255 + 100);
    const randomColorG = Math.floor(Math.random() * 255 + 100);
    const randomColorB = Math.floor(Math.random() * 255 + 90);
    const randomPositionTop = Math.floor(Math.random() * 70);
    const randomPositionLeft = Math.floor(Math.random() * 70);
    const dotTop = `${randomPositionTop}%`;
    const dotLeft = `${randomPositionLeft}%`;
    const dotColor = `rgb(${randomColorR}, ${randomColorG}, ${randomColorB})`;
    const dotSize = `${randomSize}px`;
    dots.push({ id: i, color: dotColor, size: dotSize, top: dotTop, left: dotLeft });
  }

  let options = [];
  const randomNumber2 = Math.floor(Math.random() * 9 + 1);
  const randomNumber3 = Math.floor(Math.random() * 9 + 1);
  if (randomNumber !== randomNumber2 && randomNumber !== randomNumber3 && randomNumber2 !== randomNumber3 ) {
    options.push(randomNumber, randomNumber2, randomNumber3);
    options.sort();
  }

  setDots(dots);
  setOptions(options);
  
  // FIX co kilka losowań tablica options jest pusta
  console.log('utils dots, options', dots, options);
};

utils.submitSolution = (
  e, 
  answer, 
  dots, 
  setCorrectAnswer,
  activePlayer, 
  updatePlayer, 
  ) => {

  e.preventDefault();

  if ( answer == dots.length ) {
    // TODO zamiast alertów chciałabym użyć portalu / modalu 
    setCorrectAnswer(dots.length);
    let playerPoints = activePlayer.xp + 1;
    updatePlayer({ ...activePlayer, xp: playerPoints })
  } else if ( answer < dots.length ) {
      alert(`Na planszy znajduje się ${dots.length} kropek, a Twoja odpowiedź to ${answer}. Może któraś się schowała? Spróbuj jeszcze raz :)`)
  } else if ( answer > dots.length ) {
      alert(`Na planszy znajduje się ${dots.length} kropek, a Twoja odpowiedź to ${answer}. Może któraś kropka została policzona podwójnie? Spróbuj jeszcze raz :)`)
  }
};

export default utils;