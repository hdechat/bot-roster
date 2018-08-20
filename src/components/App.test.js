import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import GenerateTeamRoster from './stateful/GenerateTeamRoster';
import ViewRosters from './stateful/ViewRosters';
import sampleTeam from '../mock_data/sample-team.js';

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
    wrapper.setState({ teams: [] })
    wrapper.instance().addTeamRoster(mockTeam);

    const actual = wrapper.state();
    const expected = { teams: [mockTeam], error: ''};

    expect(actual).toEqual(expected);
  });

  describe('UPDATE_NAME_IN_LEAGUE', () => {
    beforeEach(() => {
      wrapper.setState({ teams: [sampleTeam], error: ''});

      

      
    });

    it('updates robot name if there are no duplicates', () => {
      const robotNewFirstName = {
        id: 'IrGi10',
        category: 'starters',
        firstName: 'Steel',
        lastName: 'Giant',
        speed: 10,
        strength: 11,
        agility: 12,
        totalAttrScore: 33
      };

      wrapper.instance().updateNameinLeague(robotNewFirstName, 'Buzz Killers');

      const actual = wrapper.state('teams')[0].starters.find(bot => bot.firstName === 'Steel');

      const expected = robotNewFirstName;

      expect(actual).toEqual(expected);
    });

    it('sets correct error string and does not update robot name if there is a duplicate', () => {
      const robotDupeName = {
        id: 'IrGi10',
        category: 'starters',
        firstName: 'Bishop',
        lastName: 'Giant',
        speed: 10,
        strength: 11,
        agility: 12,
        totalAttrScore: 33
      }

      wrapper.instance().updateNameinLeague(robotDupeName, 'Buzz Killers');

      const actual = wrapper.state();

      const expected = {
        teams: [sampleTeam],
        error: "This name has already been taken by another Robot in the league. Please choose another name"
      }

      expect(actual).toEqual(expected)

    });
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
