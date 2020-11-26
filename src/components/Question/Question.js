import React from 'react';
import { Typography } from '@smooth-ui/core-sc';
import * as Styled from './style';

const Question = ({question}) =>  (
  <Styled.Question>
    <Typography variant="h2" fontSize={22} textAlign="center" my={0} mx="auto"> {question}
    </Typography>
  </Styled.Question>
);

export default Question;