import React from 'react';
import Robot from '../Robot';
import { shallow } from 'enzyme';

describe('Robot', () => {
  let wrapper;
  let mockRobot;

  beforeEach(() => {
    mockRobot = {
      id: 'ABC123',
      firstName: 'Twikki',
      lastName: 'Rogers',
      speed: 20,
      strength: 30,
      agility: 40,
      totalAttrScore: 90
    };

    wrapper = shallow(<Robot robot={mockRobot} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a single table row', () => {
    expect(wrapper.find('tr').length).toEqual(1
      );
  });

  it('renders 7 table data elements', () => {
    expect(wrapper.find('td').length).toEqual(7);
  });
});
