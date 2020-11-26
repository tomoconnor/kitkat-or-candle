import React from 'react';
import {shallow} from 'enzyme';

import Question from './Feedback';

describe('<Question />', () => {
  // smoke test
  it('Renders without crashing', () => {
    shallow(<Question />);
  });
});