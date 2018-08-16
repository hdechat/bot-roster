import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper = shallow(<App />);
  let mockTeam = {
    teamName: 'The Zipperheads',
    starters: [{robot: 1}],
    subs: [{robot: 2}],
    error: ''
  };

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('adds team to team array in state', () => {
    wrapper.instance().addTeamRoster(mockTeam);

    const actual = wrapper.state();
    const expected = { teams: [mockTeam]};

    expect(actual).toEqual(expected);
  });

  it('renders all expected elements', () => {
    expect(wrapper.find('div.App').length).toEqual(1);
    expect(wrapper.find('header').length).toEqual(1);
    expect(wrapper.find('h1').length).toEqual(1);
    expect(wrapper.find('GenerateTeamRoster').length).toEqual(1);
  });
});
