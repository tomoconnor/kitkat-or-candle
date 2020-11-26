export const generateRandomNumber = () => Math.floor(Math.random()*100) + 1;
export const selectRandomName = () => {}
const sfetch = require('sync-fetch');

export const getGameData = () => {
  let apidata = sfetch("https://kitkat-backend.herokuapp.com/api/new").json();
  return apidata.data;
}


export const getInitialState = () => ({
  // actual: generateRandomNumber(),
  gameData: getGameData(),
  current: undefined,
  guess: undefined,
  allGuesses: [],
  attempt: 0,
  numberCorrect: 0,
  feedbackMessage: '...',
  questionMessage: '...',
  block: false
});

export const getFeedback = absDiff => {
  let feedbackMessage;
  let feedbackColor;

  if (absDiff === 254) {
    feedbackColor= '#000';
    feedbackMessage = 'You Won! Reset the game to play again.';
  } else if (absDiff === 0) {
    feedbackColor= '#ff5722';
    feedbackMessage = 'Incorrect!';
  } else if (absDiff === 100) {
    feedbackColor= '#00ff00';
    feedbackMessage = 'Correct!';
  } 
  // else if (absDiff >= 10 && absDiff < 20) {
  //   feedbackColor= '#ffeb38';
  //   feedbackMessage = 'Warm';
  // } else {
  //   feedbackColor= '#5bc0de';
  //   feedbackMessage = 'Cold';
  // } 

  return {
    feedbackMessage,
    feedbackColor
  };
}