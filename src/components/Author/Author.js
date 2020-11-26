import React from 'react';
import linkedinLogo from '../../svg/linkedin.svg';
import githubLogo from '../../svg/github.svg';
import twitterLogo from '../../svg/Twitter_Social_Icon_Rounded_Square_Color.svg';


import * as Styled from './style';
import { Typography } from '@smooth-ui/core-sc';

const Author = () => (
  <div>
    <Styled.Author>
      <Typography variant="h3" textAlign="center" fontSize={20}>
        <p><small>Kitkat or Yankee by </small> <strong>Tom O'Connor </strong> </p>
        <p><small>Based on react-hot-cold-app by </small> <strong>Ivan Špoljarić</strong></p>
      </Typography>
    </Styled.Author>
    <Styled.Social>
      <Styled.LinkedIn>
        <a href="https://www.linkedin.com/in/devopstom" target="_blank" rel="noopener noreferrer">
          <img src={linkedinLogo} alt="LinkedIn logo small icon" />
        </a>
      </Styled.LinkedIn>
      <Styled.Github>
        <a href="https://github.com/tomoconnor" target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} alt="Github logo small icon" />
        </a>
      </Styled.Github>
      <Styled.Twitter>
        <a href="https://twitter.com/devopstom" target="_blank" rel="noopener noreferrer">
          <img src={twitterLogo} alt="Twitter logo small icon" />
        </a>
      </Styled.Twitter>
    </Styled.Social>
  </div>
)

export default Author;