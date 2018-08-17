import React from 'react';
import ViewRosters from '../ViewRosters';
import { shallow } from 'enzyme';

describe('ViewRosters', () => {
  let wrapper;
  let mockTeams;
  let mockState;

  beforeEach(() => {
    mockTeams = [{
      teamName: 'BuzzHerds'
    }];

    mockState = {
      team: {teamName: 'BuzzHerds'}
    };

    wrapper = shallow(<ViewRosters teams={mockTeams} />);
  });

  it('should update state when user clicks on list item', () => {
    wrapper.find('li').simulate('click')

    expect(wrapper.state()).toEqual(mockState);
  });

  it('should render a Roster component when state.team has a value', () => {
    expect(wrapper.find('Roster').length).toEqual(0);

    wrapper.setState(mockState);

    expect(wrapper.find('Roster').length).toEqual(1);
  });
});