import React from 'react';
import { Typography } from '@smooth-ui/core-sc';
import * as Styled from './style';

const Progress = ({attempt, guessList, numberCorrect}) => (
  <Styled.Progress>
    <Typography variant="h2" textAlign="center" >
      {numberCorrect} Correct <small>in {attempt} guesses</small>
    </Typography>
    <Styled.History>
      {guessList}
    </Styled.History>
  </Styled.Progress>
);

export default Progress;