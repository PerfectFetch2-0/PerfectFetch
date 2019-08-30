import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from '../components/Login';


describe('Login component', () => {
  it('Should render one text input and one password input', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("input[type='text']")).toHaveLength(1);
    expect(wrapper.find("input[type='password']")).toHaveLength(1);
  });

});