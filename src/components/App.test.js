import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import GenerateTeamRoster from './stateful/GenerateTeamRoster';
import ViewRosters from './stateful/ViewRosters';

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

  it('renders the GenerateTeamRoster component with the correct endpoint', () => {
    expect(wrapper.find(GenerateTeamRoster).length).toEqual(0);

    wrapper = mount(
      <MemoryRouter initialEntries={[ '/create-roster']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(GenerateTeamRoster).length).toEqual(1);
  });

  it('renders the ViewRosters component with the correct endpoint', () => {
    expect(wrapper.find(ViewRosters).length).toEqual(0);

    wrapper = mount(
      <MemoryRouter initialEntries={[ '/rosters']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(ViewRosters).length).toEqual(1);
  });
});
