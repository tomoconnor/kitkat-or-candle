export const generateRandomNumber = () => Math.floor(Math.random()*100) + 1;
export const selectRandomName = () => {}
const sfetch = require('sync-fetch');

export const getGameData = () => {
  let apidata = sfetch("https://kitkat-or-candle-backend.twinhost.co.uk/api/new").json();
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

export const getFeedback = (absDiff, nc) => {
  let feedbackMessage;
  let feedbackColor;
  // let nc = Math.abs(254-absDiff);
  if (absDiff >= 254) {
    feedbackColor= '#000';
    feedbackMessage = `You got ${nc} right! Reset the game to play again.`;
    
  } else if (absDiff === 0) {
    feedbackColor= '#ff2222';
    feedbackMessage = 'Incorrect!';
  } else if (absDiff === 100) {
    feedbackColor= '#28a745';
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