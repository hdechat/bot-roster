import React from 'react';
import TableByCategory from '../TableByCategory';
import { shallow } from 'enzyme';

describe('TableByCategory', () => {
  let wrapper;
  let mockHeader;
  let mockRobots;

  beforeEach(() => {
    mockHeader = "Starters";
    mockRobots = [
      {
        id: 'ABC123',
        firstName: 'Twikki',
        lastName: 'Rogers',
        speed: 20,
        strength: 30,
        agility: 40,
        totalAttrScore: 90
      },
      {
        id: 'ZXY987',
        firstName: 'R2',
        lastName: 'D2',
        speed: 5,
        strength: 8,
        agility: 9,
        totalAttrScore: 22
      }
    ];

    wrapper = shallow(
      <TableByCategory header={mockHeader} robots={mockRobots} />
    );
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders all the expected elements', () => {
    expect(wrapper.find('table').length).toEqual(1);
    expect(wrapper.find('thead').length).toEqual(1);
    expect(wrapper.find('tr').length).toEqual(1);
    expect(wrapper.find('th').length).toEqual(1);
    expect(wrapper.find('tbody').length).toEqual(1);
  });

  it('renders the header prop value within the th element', () => {
    expect(wrapper.find('th').text()).toBe(mockHeader)
  });

  it('renders the robot objects', () => {
    expect(wrapper.find('Robot').length).toEqual(2);
  });
});
