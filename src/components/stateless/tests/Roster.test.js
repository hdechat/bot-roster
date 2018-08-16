import React from 'react';
import Roster from '../Roster';
import { shallow } from 'enzyme';

describe('Roster', () => {
  let wrapper;
  let mockTeamName;
  let mockStarters;
  let mockSubs;
  let mockTeam;

  beforeEach(() => {
    mockTeamName = 'Droids';
    mockStarters = [
      {
        id: 'ABC123',
        firstName: 'Twikki',
        lastName: 'Rogers',
        speed: 20,
        strength: 30,
        agility: 40,
        totalAttrScore: 90
      }
    ];
    mockSubs = [
      {
        id: 'XXY678',
        firstName: 'Voltron',
        lastName: 'Smith',
        speed: 20,
        strength: 35,
        agility: 40,
        totalAttrScore: 95
      }
    ];

    mockTeam = {
      teamName: mockTeamName,
      starters: mockStarters,
      subs: mockSubs
    }

    wrapper = shallow(<Roster team={mockTeam}/>)
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected elements', () => {
    expect(wrapper.find('div.Roster').length).toEqual(1);
    expect(wrapper.find('h1').length).toEqual(1);
    expect (wrapper.find('TableByCategory').length).toEqual(2);
  });

  it('renders the teamName', () => {
    expect(wrapper.find('h1').text()).toBe(mockTeamName);
  });
});
