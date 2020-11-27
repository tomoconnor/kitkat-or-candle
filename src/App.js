import React, { Component } from 'react';

import { Banner, Feedback, Form, Progress, Reset, Info, Author, Question } from './components';
import { getInitialState, getFeedback } from './util';

import { Grid, Row, Col } from '@smooth-ui/core-sc';
import * as Styled from './style';

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
  }

  updateAppState = guess => {
    const { current, gameData } = this.state;
    let { numberCorrect } = this.state;

    let absDiff = 255;
    let nextQ = gameData.pop()
    let nextQM = nextQ[1];

    // console.log(["GDL", gameData.length])
    if (gameData.length===0 ) {
      absDiff = 254 // game over
   
    } else if (guess === current[0]){
            // Player Guessed Correctly

      absDiff = 100
      numberCorrect++;
      if(numberCorrect === 10) {
        absDiff = 254;
      }
    }
    else {
      // Player guessed incorrectly.
      absDiff = 0

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