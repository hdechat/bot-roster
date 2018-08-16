import React from 'react';
import GenerateTeamRoster from '../GenerateTeamRoster';
import * as errors from '../../helpers/error-messages';
import { shallow, mount  } from 'enzyme';

describe('GenerateTeamRoster', () => {
  let wrapper;
  let mockAddTeamRoster;
  let mockState;

  beforeEach(() => {
    mockState = {
      teamName: '',
      starters: [],
      subs: [],
      error: ''
    }

    mockAddTeamRoster = jest.fn();

    wrapper = shallow(<GenerateTeamRoster addTeamRoster={mockAddTeamRoster} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('SUBMIT_TEAM_ROSTER', () => {
    const mockEvent = {preventDefault: jest.fn()};

    beforeEach(() => {
      let starters = [];
      let subs = [];

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
          totalAttrScore: 19 + i
        });
      }

      mockState = {
        teamName: 'BuzzKillers',
        starters,
        subs,
        error: ''
      }
    });

    it('calls validateTeamRoster', () => {
      wrapper = mount(<GenerateTeamRoster addTeamRoster={mockAddTeamRoster} />);
      wrapper.setState(mockState);
      const spy = spyOn(wrapper.instance(), 'validateTeamRoster');

      wrapper.instance().forceUpdate();
      wrapper.instance().submitTeamRoster(mockEvent);

      expect(spy).toHaveBeenCalled();
    });

    it('calls addTeamRoster with the correct params', () => {
      wrapper.setState(mockState);
      wrapper.instance().submitTeamRoster(mockEvent);

      expect(mockAddTeamRoster).toHaveBeenCalledWith(mockState);
    });

    it('it calls clearStateValues', () => {
      wrapper = mount(<GenerateTeamRoster addTeamRoster={mockAddTeamRoster} />);
      wrapper.setState(mockState);
      const spy = spyOn(wrapper.instance(), 'clearStateValues');

      wrapper.instance().forceUpdate();
      wrapper.instance().submitTeamRoster(mockEvent);

      expect(spy).toHaveBeenCalled();
    });

    it('resets count to 0', () => {
      wrapper.setState(mockState);
      wrapper.instance().count = 1

      wrapper.instance().submitTeamRoster(mockEvent);

      expect(wrapper.instance().count).toEqual(0);
    });

    it('changes state.error and renders error message if user submits roster without a name', () => {
      let starters = [];
      let subs = [];

      for (let i = 0; i < 10; i++) {
        starters.push({robot: i})
      }

      for (let i = 0; i < 5; i++) {
        subs.push({robot: i})
      }

      mockState = {
        teamName: '',
        starters,
        subs,
        error: ''
      }

      wrapper.setState(mockState);
      wrapper.instance().submitTeamRoster(mockEvent);

      expect(wrapper.state('error')).toEqual(errors.missingName);
      expect(wrapper.find('.error-message').text()).toEqual(errors.missingName);

    });

    it('changes state.error and renders error message if user submits roster that does not have 10 starters', () => {
      let starters = [];
      let subs = [];

      for (let i = 0; i < 8; i++) {
        starters.push({robot: i})
      }

      for (let i = 0; i < 5; i++) {
        subs.push({robot: i})
      }

      mockState = {
        teamName: 'BuzzKillers',
        starters,
        subs,
        error: ''
      }

      wrapper.setState(mockState);
      wrapper.instance().submitTeamRoster(mockEvent);

      expect(wrapper.state('error')).toEqual(errors.badNumberOfStarters);
      expect(wrapper.find('.error-message').text()).toEqual(errors.badNumberOfStarters)
    });

    it('changes state.error and renders error message if user submits roster that does not have 5 subs', () => {
      let starters = [];
      let subs = [];

      for (let i = 0; i < 10; i++) {
        starters.push({robot: i})
      }

      for (let i = 0; i < 3; i++) {
        subs.push({robot: i})
      }

      mockState = {
        teamName: 'BuzzKillers',
        starters,
        subs,
        error: ''
      }

      wrapper.setState(mockState);
      wrapper.instance().submitTeamRoster(mockEvent);

      expect(wrapper.state('error')).toEqual(errors.badNumberOfSubs);
      expect(wrapper.find('.error-message').text()).toEqual(errors.badNumberOfSubs)
    });
  });

  describe('VALIDATE_TEAM_ROSTER', () => {
    beforeEach(() => {
      let starters = [];
      let subs = [];

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
          totalAttrScore: 19 + i
        });
      }

      mockState = {
        teamName: 'BuzzKillers',
        starters,
        subs,
        error: ''
      }
    });

    it('should return missing name error string if teamName is undefined', () => {
      const mockStateMissingName = {...mockState, teamName: ''};

      const actual = wrapper.instance().validateTeamRoster(mockStateMissingName);
      const expected = errors.missingName;

      expect(actual).toEqual(expected);
    });

    it('should return bad number of starters error string if there are not 10 starters on the team', () => {
      const mockStateBadNumberOfStarters = {...mockState, starters: []};

      const actual = wrapper.instance().validateTeamRoster(mockStateBadNumberOfStarters);
      const expected = errors.badNumberOfStarters;

      expect(actual).toEqual(expected);
    });

    it('should return bad number of subs error string if there are not 5 starters on the team', () => {
      const mockStateBadNumberOfSubs = {...mockState, subs: []};

      const actual = wrapper.instance().validateTeamRoster(mockStateBadNumberOfSubs);
      const expected = errors.badNumberOfSubs;

      expect(actual).toEqual(expected);
    });

    it('should return valid if all parameters pass the conditions', () => {
      expect(wrapper.instance().validateTeamRoster(mockState)).toEqual('valid');
    });
  });

  describe('CLEAR_STATE_VALUES', () => {
    it('should clear state values', () => {
      wrapper.setState({ teamName: 'Buzz Killers'});

      wrapper.instance().clearStateValues();

      expect(wrapper.state()).toEqual(mockState);
    });
  });

  describe('ADD_ROBOT_TO_TEAM', () => {
    const mockRobotSub = {
      category: 'subs',
      firstName: 'r5',
      lastName: 'd4',
      speed: 10,
      strength: 40,
      agility: 30  
    }

    const mockRobotStarter = {
      category: 'starters',
      firstName: 'Rosie',
      lastName: 'Robot',
      speed: 10,
      strength: 40,
      agility: 50 
    }

    const mockRobotTooStrong = {
      category: 'starters',
      firstName: 'Voltron',
      lastName: 'Jackson',
      speed: 30,
      strength: 40,
      agility: 50 
    }

    it('calls calculateTotalScore with the correct params', () => {
      wrapper = mount(<GenerateTeamRoster addTeamRoster={mockAddTeamRoster} />);
      const spy = spyOn(wrapper.instance(), 'calculateTotalScore');

      wrapper.instance().forceUpdate();
      wrapper.instance().addRobotToTeam(mockRobotSub);

      expect(spy).toHaveBeenCalledWith(10, 40, 30);
    });

    it('calls createId with the correct params', () => {
      wrapper = mount(<GenerateTeamRoster addTeamRoster={mockAddTeamRoster} />);
      const spy = spyOn(wrapper.instance(), 'createId');

      wrapper.instance().forceUpdate();
      wrapper.instance().addRobotToTeam(mockRobotSub);

      expect(spy).toHaveBeenCalledWith('r5d4');
    });

    it('calls validateNewRobot with the correct params', () => {
      wrapper = mount(<GenerateTeamRoster addTeamRoster={mockAddTeamRoster} />);
      const spy = spyOn(wrapper.instance(), 'validateNewRobot');

      wrapper.instance().forceUpdate();
      wrapper.instance().addRobotToTeam(mockRobotSub);

      const mockRobot = {...mockRobotSub, id: 'r5d401', totalAttrScore: 80}
      expect(spy).toHaveBeenCalledWith(mockRobot, 80)
    });

    it('resets state to the correct props with the updated robot data', () => {
      const mockUpdatedState = {
        teamName: '',
        starters: [{...mockRobotStarter, id: 'RoRo02', totalAttrScore: 100}],
        subs: [{...mockRobotSub, id: 'r5d401', totalAttrScore: 80}],
        error: ''
      }

      wrapper.instance().addRobotToTeam(mockRobotSub);
      wrapper.instance().addRobotToTeam(mockRobotStarter);

      expect(wrapper.state()).toEqual(mockUpdatedState);
    });

    it('does not change count if robotStatus is not valid', () => {
        wrapper.count = 1;

        wrapper.instance().addRobotToTeam(mockRobotTooStrong);

        expect(wrapper.count).toEqual(1)
    });

    it('changes state.error and renders error message if totalAttrScore is greater than 100', () => {
      wrapper.instance().addRobotToTeam(mockRobotTooStrong);

      expect (wrapper.state()).toEqual({...mockState, error: errors.badScore})
      expect(wrapper.find('.error-message').text()).toEqual(errors.badScore)
    });

    it('changes state.error and renders error message if totalAttrScore is a duplicate', () => {
      const mockUpdatedState = {
        teamName: '',
        starters: [{...mockRobotStarter, id: 'RoRo02', totalAttrScore: 100}],
        subs: [{...mockRobotSub, id: 'r5d401', totalAttrScore: 80}],
        error: ''
      };

      const mockRobotDupe = {
        category: 'starters',
        firstName: 'Twiki',
        lastName: 'Rogers',
        speed: 20,
        strength: 30,
        agility: 30,
        error: ''
      };

      wrapper.setState(mockUpdatedState);
      wrapper.instance().addRobotToTeam(mockRobotDupe);

      expect(wrapper.state()).toEqual({...mockUpdatedState, error: errors.duplicateScore});
      expect(wrapper.find('.error-message').text()).toEqual(errors.duplicateScore);
    });

    it('changes state.error and renders error message if firstName is a duplicate in the team', () => {
      const mockUpdatedState = {
        teamName: '',
        starters: [{...mockRobotStarter, id: 'RoRo02', totalAttrScore: 100}],
        subs: [{...mockRobotSub, id: 'r5d401', totalAttrScore: 80}],
        error: ''
      };

      const mockRobotDupe = {
        category: 'starters',
        firstName: 'r5',
        lastName: 'Rogers',
        speed: 2,
        strength: 3,
        agility: 3,
        error: ''
      };

      wrapper.setState(mockUpdatedState);
      wrapper.instance().addRobotToTeam(mockRobotDupe);

      expect(wrapper.state()).toEqual({...mockUpdatedState, error: errors.duplicateFirstName});
      expect(wrapper.find('.error-message').text()).toEqual(errors.duplicateFirstName);
    });

    it('changes state.error and renders error message if lastName is a duplicate in the team', () => {
      const mockUpdatedState = {
        teamName: '',
        starters: [{...mockRobotStarter, id: 'RoRo02', totalAttrScore: 100}],
        subs: [{...mockRobotSub, id: 'r5d401', totalAttrScore: 80}],
        error: ''
      };

      const mockRobotDupe = {
        category: 'starters',
        firstName: 'Twiki',
        lastName: 'd4',
        speed: 2,
        strength: 3,
        agility: 3,
        error: ''
      };

      wrapper.setState(mockUpdatedState);
      wrapper.instance().addRobotToTeam(mockRobotDupe);

      expect(wrapper.state()).toEqual({...mockUpdatedState, error: errors.duplicateLastName});
      expect(wrapper.find('.error-message').text()).toEqual(errors.duplicateLastName);
    });
  });

  describe('VALIDATE_NEW_ROBOT', () => {
    let mockRobot;
    let mockRobotSub;
    let mockRobotStarter;
    let mockUpdatedState;
    let mockState;

    beforeEach(() => {
      mockRobotSub = {
        category: 'subs',
        firstName: 'r5',
        lastName: 'd4',
        speed: 10,
        strength: 40,
        agility: 30  
      }

      mockRobotStarter = {
        category: 'starters',
        firstName: 'Rosie',
        lastName: 'Robot',
        speed: 10,
        strength: 40,
        agility: 50 
      }

      mockUpdatedState = {
        teamName: '',
        starters: [{...mockRobotStarter, id: 'RoRo02', totalAttrScore: 100}],
        subs: [{...mockRobotSub, id: 'r5d401', totalAttrScore: 80}],
        error: ''
      };

      mockRobot = {
        category: 'subs',
        firstName: 'Twikki',
        lastName: 'Bell',
        speed: 10,
        strength: 50,
        agility: 30  
      }

      let starters = [];
      let subs = [];

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
          totalAttrScore: 19 + i
        });
      }

      mockState = {
        teamName: 'BuzzKillers',
        starters,
        subs,
        error: ''
      };
    });

    it('calls checkForDuplicate 3 times', () => {
      wrapper = mount(<GenerateTeamRoster addTeamRoster={mockAddTeamRoster} />);
      const spy = spyOn(wrapper.instance(), 'checkForDuplicate');

      wrapper.instance().forceUpdate()
      wrapper.instance().validateNewRobot(mockRobot, 80)

      expect(spy).toHaveBeenCalledTimes(3)
    });

    it('returns correct error string if score is > 100', () => {
      const actual = wrapper.instance().validateNewRobot(mockRobot, 200);
      const expected = errors.badScore;

      expect(actual).toEqual(expected);
    });

    it('returns correct error string if score is not unique', () => {
      wrapper.setState(mockUpdatedState);

      const actual = wrapper.instance().validateNewRobot(mockRobot, 80);
      const expected = errors.duplicateScore;

      expect(actual).toEqual(expected);
    });

    it('returns correct error string if firstName is not unique', () => {
      wrapper.setState(mockUpdatedState);

      const actual = wrapper.instance().validateNewRobot({...mockRobot, firstName: 'Rosie'}, 90);
      const expected = errors.duplicateFirstName;

      expect(actual).toEqual(expected);
    });

    it('returns correct error string if lastName is not unique', () => {
      wrapper.setState(mockUpdatedState);

      const actual = wrapper.instance().validateNewRobot({...mockRobot, lastName: 'Robot'}, 90);
      const expected = errors.duplicateLastName;
      
      expect(actual).toEqual(expected);
    });

    it('returns correct errors string if there are maximum number of starters', () => {
      wrapper.setState(mockState);

      const actual = wrapper.instance().validateNewRobot({...mockRobot, category: 'starters'}, 90);
      const expected = errors.maxPlayers;

      expect(actual).toEqual(expected);
    });

    it('returns correct errors string if there are maximum number of subs', () => {
      wrapper.setState(mockState);

      const actual = wrapper.instance().validateNewRobot(mockRobot, 90);
      const expected = errors.maxPlayers;

      expect(actual).toEqual(expected);
    });

    it('returns valid if none of the checkForDuplicate returns return a result', () => {
      const actual = wrapper.instance().validateNewRobot(mockRobot, 80);

      expect(actual).toEqual('valid');
    });
  });

  describe('CHECK_FOR_CATEGORY_FULL', () => {
    beforeEach(() => {
      let starters = [];
      let subs = [];

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
          totalAttrScore: 19 + i
        });
      }

      mockState = {
        teamName: 'BuzzKillers',
        starters,
        subs,
        error: ''
      };
    });

    it('should return true if there are 10 starters', () => {
      wrapper.setState(mockState);

      const actual = wrapper.instance().checkForCategoryFull('starters');

      expect(actual).toEqual(true);
    });

    it('should return true if there are 5 subs', () => {
      wrapper.setState(mockState);

      const actual = wrapper.instance().checkForCategoryFull('subs');

      expect(actual).toEqual(true);
    });

    it('should return false if there are less than 10 starters', () => {
      wrapper.setState({...mockState, starters: []});

      const actual = wrapper.instance().checkForCategoryFull('starters');

      expect(actual).toEqual(false);
    });

    it('should return false if there are less than 5 subs', () => {
      wrapper.setState({...mockState, subs: []});

      const actual = wrapper.instance().checkForCategoryFull('subs')

      expect(actual).toEqual(false)
    });
  });

  describe('CHECK_FOR_DUPLICATE', () => {
    let mockRobot;

    beforeEach(() => {
      mockRobot = {
        category: 'subs',
        firstName: 'Twikki',
        lastName: 'Bell',
        speed: 10,
        strength: 50,
        agility: 30  
      }

      wrapper.setState({...mockState, starters: [mockRobot]});
    });

    it('returns undefined if there is not duplicate found', () => {
      const actual = wrapper.instance().checkForDuplicate('firstName', 'Rosie');

      expect(actual).toEqual(undefined);
    });

    it('returns the duplicate value if found', () => {
      const actual = wrapper.instance().checkForDuplicate('firstName', 'Twikki');

      expect(actual).toEqual(mockRobot);
    });
  });

  describe('CREATE_ID', () => {
    it('returns prefix and teamNumber with a zero if the count is a single digit', () => {
    const mockPrefix = 'AbCd';
    const actual = wrapper.instance().createId(mockPrefix);
    const expectation = 'AbCd01';

    expect(actual).toEqual(expectation);
    }); 

    it('returns prefix and teamNumber and does not add a zero if the count is double digit', () => {
      const mockPrefix = 'AbCd';
      for (let i = 0; i < 10; i++) {
        wrapper.instance().createId(mockPrefix);
      }
      const actual = wrapper.instance().createId(mockPrefix);
      const expectation = 'AbCd11';

      expect(actual).toEqual(expectation);
    });
  });

  describe('CALCULATE_TOTAL_SCORE', () => {
    it('returns the sum of the args', () => {
      const actual = wrapper.instance().calculateTotalScore(1, 2, 3);

      expect(actual).toEqual(6);
    }); 
  });

  describe('UPDATE_NAME_IN_GENERATE_ROSTER', () => {
    let mockRobot = {
      category: 'subs',
      firstName: 'Twikki',
      lastName: 'Bell',
      speed: 10,
      strength: 50,
      agility: 30  
    }

    let mockState = {
      teamName: 'Buzzers',
      starters: [],
      subs: [mockRobot],
      error: ''
    };

    it('updates robot in state', () => {
      wrapper.setState(mockState);
      wrapper.instance().updateName({...mockRobot, firstName: 'Tinker'});

      const expected = {
        teamName: 'Buzzers',
        starters: [],
        subs: [{...mockRobot, firstName: 'Tinker'}],
        error: ''
      };
      expect(wrapper.state()).toEqual(expected)
    });
  });

  it('renders all the expected elements', () => {
    expect(wrapper.find('div.GenerateTeamRoster').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('p.error-message').length).toEqual(1);
    expect(wrapper.find('AddRobot').length).toEqual(1);
    expect(wrapper.find('Roster').length).toEqual(1);
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
    wrapper.find('button.submit-roster').simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
