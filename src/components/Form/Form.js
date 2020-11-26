import React from 'react';
import { Button } from '@smooth-ui/core-sc';
import * as Styled from './style';

const Form = ({block, returnGuessToApp}) => {
  const onSubmit = e => {
    e.preventDefault();
  }

  const handleButtonClick = guess => {

    if (!block) {
      console.log(guess);
      returnGuessToApp(guess);
    }
  }
  
  return (
    <Styled.Form onSubmit={onSubmit}>
      <Button variant="success" width={1} mt={10} minHeight={40} fontSize={22}  id="kitkat" onClick={() => handleButtonClick("k")}>
        Kitkat Flavour
      </Button>
      <Button variant="success" width={1} mt={10} minHeight={40} fontSize={22} id="yankee" onClick={() => handleButtonClick("c")}>
        Yankee Candle
      </Button>
    </Styled.Form>
  );
}

export default Form;