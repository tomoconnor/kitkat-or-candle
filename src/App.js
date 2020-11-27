import React, { Component } from 'react';

import { Banner, Feedback, Form, Progress, Reset, Info, Author, Question } from './components';
import { getInitialState, getFeedback } from './util';

import { Grid, Row, Col } from '@smooth-ui/core-sc';
import * as Styled from './style';
import ReactGA from 'react-ga';

import {
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";

import {
  FacebookIcon,
  TwitterIcon,

} from "react-share";

class App extends Component { 
  state = getInitialState();

  resetGame = () => {
    // this.setState(getInitialState());
    // this.getNextQuestion()
    window.location.reload(false);
  }

  getNextQuestion = () => {

    let { allGuesses, feedbackMessage,questionMessage, block, attempt, guess, current, gameData } = this.state;

    current = gameData.pop();
    questionMessage = current[1]

    this.setState({
      allGuesses, 
      feedbackMessage,
      questionMessage, 
      block, 
      attempt, 
      guess, 
      current, 
      gameData 
    })
  }

  componentDidMount(){
    this.setState(getInitialState());
    this.getNextQuestion();
    ReactGA.initialize('G-FH1DRQE9KC');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  updateAppState = guess => {
    const { current, gameData } = this.state;
    let { numberCorrect } = this.state;
    const { attempt } = this.state;
    let absDiff = 255;
    let nextQ = gameData.pop()
    let nextQM = nextQ[1];

    // console.log(["GDL", gameData.length])
   
    if (gameData.length===0) {
      absDiff = 254 // game over
   
    } else if (guess === current[0]){
            // Player Guessed Correctly

      absDiff = 100
      numberCorrect++;

      if((numberCorrect === 10)|| (attempt===9)) {
        absDiff = 254;
      }
     
    }
    else {
      // Player guessed incorrectly.
      absDiff = 0
      if (attempt === 9) {
        absDiff = 253;
      }

    }

    // const { actual } = this.state;
    // const { s } = this.state;
    // const absDiff = Math.abs(guess - actual);
    const { feedbackMessage, feedbackColor } = getFeedback(absDiff);
    

    this.setState(prevState => ({
        guess,
        allGuesses: [...prevState.allGuesses, {guess, feedbackColor}],
        attempt: prevState.attempt + 1,
        current: nextQ,
        numberCorrect: numberCorrect,
        questionMessage: nextQM,
        feedbackMessage,
        block: absDiff === 254
      })
    ); 
    // this.getNextQuestion();
  }

  render() {
    const { allGuesses, feedbackMessage,questionMessage, block, attempt, guess, numberCorrect } = this.state;
    const shareURL = "https://kitkat-or-candle.twinhost.co.uk/";
    const hashtags = ["KitkatOrCandle"];
    const shareIconSize = 64;

    const guessList = allGuesses.map((item, index) => 
      <Styled.ListItem key={index} color={item.feedbackColor}>
        <span>{item.guess}</span>
      </Styled.ListItem>
    );

    return (
      <Grid mt={20}>
        <Row>
          <Col>
            <Styled.LandmarkContainer as="header" role="banner">
              <Banner />
             
            </Styled.LandmarkContainer>
          </Col>
        </Row>
        <Row mt={10}>
          <Col>
            <Styled.LandmarkContainer as="main" role="main">
              <Question question={questionMessage}/>
              <Feedback feedback={feedbackMessage}/>
              <Form block = {block} returnGuessToApp={value => this.updateAppState(value)}/>
              <Progress attempt={attempt} numberCorrect={numberCorrect} guess={guess} guessList={guessList}/>
              <Reset resetGame = {this.resetGame}/>
              <Info />
              <h2>Share this site with your friends</h2>
              <center>
              <TwitterShareButton url={shareURL} title={`I got ${numberCorrect}/10 on Kitkat or Candle! How many can you get?`} hashtags={hashtags}>
                <TwitterIcon size={shareIconSize} round={false}  borderRadius={5}/>
              </TwitterShareButton>
     
              <FacebookShareButton url={shareURL} quote={`I got ${numberCorrect}/10 on Kitkat or Candle! How many can you get?`} hashtag={hashtags[0]}>
                <FacebookIcon size={shareIconSize} round={false} borderRadius={5} />
              </FacebookShareButton>
              </center>

            </Styled.LandmarkContainer>
          </Col>
        </Row>
        <Row mt={15}>
          <Col>
            <Styled.LandmarkContainer as="footer" role="contentinfo">
              <Author />
            </Styled.LandmarkContainer>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;