import React from 'react';
import GenerateTeamRoster from '../GenerateTeamRoster';
import * as errors from '../../helpers/error-messages';
import { shallow, mount  } from 'enzyme';

describe('GenerateTeamRoster', () => {
  let wrapper;
  let mockAddTeamRoster;
  let mockInitialState;
  let mockState;
  let mockRobotStarter; 
  let mockRobotSub;
  let mockTeams


  beforeEach(() => {
    let starters = [];
    let subs = [];

    mockInitialState = {
      teamName: '',
      starters: [],
      subs: [],
      error: ''
    }

    for (let i = 0; i < 10; i++) {
      starters.push({
        id: `ABC12${i}`,
        firstName: `${i}Twikki`,
        lastName: `${i}Rogers`,
        speed: 2 + i,
        strength: 3 + i,
        agility: 4 + i,
        totalAttrScore: 9 + i
      });
    }

    for (let i = 0; i < 5; i++) {
      subs.push({
        id: `DEF12${i}`,
        firstName: `${i}Kki`,
        lastName: `${i}Gers`,
        speed: 12 + i,
        strength: 13 + i,
        agility: 14 + i,
        totalAttrScore: 39 + i
      });
    }

    mockState = {
      teamName: 'BuzzKillers',
      starters,
      subs,
      error: ''
    };

    mockRobotStarter = {
      category: 'starters',
      firstName: 'C3',
      lastName: 'P0',
      speed: 1,
      strength: 1,
      agility: 1,
    };

    mockRobotSub = {
        category: 'subs',
        firstName: 'R2',
        lastName: 'D2',
        speed: 0,
        strength: 0,
        agility: 0,
    };

    mockAddTeamRoster = jest.fn();
    mockTeams = [mockState]

    wrapper = shallow(<GenerateTeamRoster 
      addTeamRoster={mockAddTeamRoster}
      teams={mockTeams} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('SUBMIT_TEAM_ROSTER', () => {
    const mockEvent = {preventDefault: jest.fn()};

    it('calls addTeamRoster with the correct params', () => {
      wrapper.setState(mockState);
      wrapper.instance().submitTeamRoster(mockEvent);

      expect(mockAddTeamRoster).toHaveBeenCalledWith(mockState);
    });

    it('it resets state to initial values', () => {
      wrapper.setState(mockState);
      wrapper.instance().submitTeamRoster(mockEvent);

      expect(wrapper.state()).toEqual(mockInitialState);
    });

    it('resets count to 0', () => {
      wrapper.setState(mockState);
      wrapper.instance().count = 1

      wrapper.instance().submitTeamRoster(mockEvent);

      expect(wrapper.instance().count).toEqual(0);
    });

    it('sets correct error string if user submits roster without a name', () => {
      wrapper.setState({...mockState, teamName: ''});
      wrapper.instance().submitTeamRoster(mockEvent);

      expect(wrapper.state('error')).toEqual(errors.missingName);
    });

    it('sets correct error string if user submits roster that does not have 10 starters', () => {
      wrapper.setState({...mockState, starters: []});
      wrapper.instance().submitTeamRoster(mockEvent);

      expect(wrapper.state('error')).toEqual(errors.badNumberOfStarters);
    });

    it('sets correct error string if user submits roster that does not have 5 subs', () => {
      wrapper.setState({...mockState, subs: []});
      wrapper.instance().submitTeamRoster(mockEvent);

      expect(wrapper.state('error')).toEqual(errors.badNumberOfSubs);
    });
  });

  describe('DELETE_ROBOT', () => {
    it('deletes robot from starters', () => {
      mockRobotStarter  = {
        id: 'ABC121',
        category: 'starters',
        firstName: '1Twikki',
        lastName: '1Rogers',
        speed: 3,
        strength: 4,
        agility: 5,
        totalAttrScore: 12
      }

      wrapper.setState(mockState);
      expect(wrapper.state('starters').length).toEqual(10);

      wrapper.instance().deleteRobot(mockRobotStarter);

      expect(wrapper.state('starters').length).toEqual(9);      
    });

    it('deletes robot from subs', () => {
      mockRobotSub = {
        id: 'DEF121',
        category: 'subs',
        firstName: '1Kki',
        lastName: '1Gers',
        speed: 13,
        strength: 14,
        agility: 15,
        totalAttrScore: 42
      }
      wrapper.setState(mockState)
      expect(wrapper.state('subs').length).toEqual(5);

      wrapper.instance().deleteRobot(mockRobotSub);

      expect(wrapper.state('subs').length).toEqual(4);     
    }); 
  });

  describe('ADD_ROBOT_TO_TEAM', () => {

    const mockRobotTooStrong = {
      category: 'starters',
      firstName: 'Voltron',
      lastName: 'Jackson',
      speed: 30,
      strength: 40,
      agility: 50 
    }

    it('adds robot to the starters category', () => {
      const mockUpdatedState = {
        teamName: '',
        starters: [{...mockRobotStarter, id: 'C3P001', totalAttrScore: 3}],
        subs: [],
        error: ''
      }

      wrapper.instance().addRobotToTeam(mockRobotStarter);

      expect(wrapper.state()).toEqual(mockUpdatedState);
    });

    it('adds robot to the subs category', () => {
      const mockUpdatedState = {
        teamName: '',
        starters: [],
        subs: [{...mockRobotSub, id: 'R2D201', totalAttrScore: 0}],
        error: ''
      }

      wrapper.instance().addRobotToTeam(mockRobotSub);

      expect(wrapper.state()).toEqual(mockUpdatedState);
    });

    it('does not change count if robotStatus is not valid', () => {
        wrapper.count = 1;

        wrapper.instance().addRobotToTeam(mockRobotTooStrong);

        expect(wrapper.count).toEqual(1)
    });

    it('does not add robot if robotStatus is not valid', () => {
      wrapper.instance().addRobotToTeam(mockRobotTooStrong);

      expect(wrapper.state('starters')).toEqual([]);
      expect(wrapper.state('subs')).toEqual([]);
    }); 

    it('sets correct error string if totalAttrScore is greater than 100', () => {
      wrapper.instance().addRobotToTeam(mockRobotTooStrong);

      expect (wrapper.state()).toEqual({...mockInitialState, error: errors.badScore})
    });

    it('sets correct error string if totalAttrScore is a duplicate', () => {
      mockState = {
        teamName: '',
        starters: [],
        subs: [{
          id: 'R2D201',
          category: 'subs',
          firstName: 'R2',
          lastName: 'D2',
          speed: 0,
          strength: 0,
          agility: 0,
          totalAttrScore: 0
        }],
        error: ''
      }

      const mockRobotDupe = {
        category: 'starters',
        firstName: 'Twiki',
        lastName: 'Rogers',
        speed: 0,
        strength: 0,
        agility: 0,
        error: ''
      };

      wrapper.setState(mockState);
      wrapper.instance().addRobotToTeam(mockRobotDupe);

      expect(wrapper.state('error')).toEqual(errors.duplicateScore);
    });

    it('sets correct error string if firstName is a duplicate in the team', () => {
      mockState = {
        teamName: '',
        starters: [],
        subs: [{
          id: 'R2D201',
          category: 'subs',
          firstName: 'R2',
          lastName: 'D2',
          speed: 0,
          strength: 0,
          agility: 0,
          totalAttrScore: 0
        }],
        error: ''
      }

      const mockRobotDupe = {
        category: 'starters',
        firstName: 'R2',
        lastName: 'Rogers',
        speed: 1,
        strength: 2,
        agility: 3,
        error: ''
      };

      wrapper.setState(mockState);
      wrapper.instance().addRobotToTeam(mockRobotDupe);

      expect(wrapper.state('error')).toEqual(errors.duplicateFirstName);
    });

    it('sets correct error string if lastName is a duplicate in the team', () => {
      mockState = {
        teamName: '',
        starters: [],
        subs: [{
          id: 'R2D201',
          category: 'subs',
          firstName: 'R2',
          lastName: 'D2',
          speed: 0,
          strength: 0,
          agility: 0,
          totalAttrScore: 0
        }],
        error: ''
      }

      const mockRobotDupe = {
        category: 'starters',
        firstName: 'Twiki',
        lastName: 'D2',
        speed: 1,
        strength: 2,
        agility: 3,
        error: ''
      };

      wrapper.setState(mockState);
      wrapper.instance().addRobotToTeam(mockRobotDupe);

      expect(wrapper.state('error')).toEqual(errors.duplicateLastName);
    });

    it('sets correct error string if name is a duplicate in the league', () => {
      const mockRobotDupe = {
        category: 'starters',
        firstName: '0Twiki',
        lastName: '1Gers',
        speed: 3,
        strength: 4,
        agility: 5,
        error: ''
      };

      wrapper.setState(mockInitialState);
      wrapper.instance().addRobotToTeam(mockRobotDupe);

      expect(wrapper.state('error')).toEqual(errors.duplicateNameInLeague);
    });

    it('sets correct error string if starters category is full', () => {
      let mockFullStarters = {...mockState, subs: []}
      
      wrapper.setState(mockFullStarters);
      wrapper.instance().addRobotToTeam(mockRobotStarter);

      expect(wrapper.state('error')).toEqual(errors.maxPlayers);
    });

    it('sets correct error string if subs category is full', () => {
      let mockFullStarters = {...mockState, starters: []}
      
      wrapper.setState(mockFullStarters);
      wrapper.instance().addRobotToTeam(mockRobotSub);

      expect(wrapper.state('error')).toEqual(errors.maxPlayers);
    });
  });

  describe('UPDATE_NAME', () => {
    let newRobot;
    beforeEach(() => {
      newRobot = {
        category: 'starters',
        id: 'ZXC987',
        firstName: 'Rosie',
        lastName: 'Robot',
        speed: 1,
        strength: 1,
        agility: 1,
        totalAttrScore: 3
      }

      mockState = {
        teamName: '',
        starters: [mockRobotStarter, newRobot],
        subs: [mockRobotSub],
        error: ''
      }
    });

    it('updates robot first name', () => {
      wrapper.setState(mockState);
      wrapper.instance().updateName({...mockRobotStarter, firstName: 'Boogie'});

      const expected = {
        teamName: '',
        starters: [{...mockRobotStarter, firstName: 'Boogie'}, newRobot],
        subs: [mockRobotSub],
        error: ''
      }

      expect(wrapper.state()).toEqual(expected)
    });

    it('updates robot last name', () => {
      wrapper.setState(mockState);
      wrapper.instance().updateName({...mockRobotStarter, lastName: 'Jackson'});

      const expected = {
        teamName: '',
        starters: [{...mockRobotStarter, lastName: 'Jackson'}, newRobot],
        subs: [mockRobotSub],
        error: ''
      }

      expect(wrapper.state()).toEqual(expected)
    });

    it('sets correct error string if there is a duplicate firstName', () => {
      wrapper.setState(mockState);
      wrapper.instance().updateName({...mockRobotStarter, firstName: 'Rosie'});
      expect(wrapper.state('error')).toEqual(errors.duplicateFirstName);
    });

    it('sets correct error string if there is a duplicate lastName', () => {
      wrapper.setState(mockState);
      wrapper.instance().updateName({...mockRobotStarter, lastName: 'Robot'});

      expect(wrapper.state('error')).toEqual(errors.duplicateLastName);
    });
  });

  it('resets teamName state with input onChange', () => {
    expect(wrapper.state('teamName')).toBe('');

    const mockEvent = {target: {value: 'Tw'}};

    wrapper.find('input').simulate('change', mockEvent);

    expect(wrapper.state('teamName')).toBe('Tw')
  });

  it('calls submitTeamRoster with button click', () => {
    wrapper = mount(<GenerateTeamRoster addTeamRoster={mockAddTeamRoster} />);
    const spy = spyOn(wrapper.instance(), 'submitTeamRoster');

    wrapper.instance().forceUpdate();
    wrapper.find('.generate__submit-roster').simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
