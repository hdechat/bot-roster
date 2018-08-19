import * as helper from './helpers';
import * as error from './error-messages';

describe('HELPERS', () => {
  let robot;
  let robotSub;
  let robotStarter
  let state
  let fullState;
  let starters;
  let subs;
  let league;

  beforeEach(() => {
    robot = {
      id: 'ABC123',
      firstName: 'Twikki',
      lastName: 'Rogers',
      speed: 20,
      strength: 30,
      agility: 40,
    };

    robotSub = {
      id: 'r5d401',
      category: 'subs',
      firstName: 'r5',
      lastName: 'd4',
      speed: 10,
      strength: 40,
      agility: 30,
      totalAttrScore: 80  
    }

    robotStarter = {
      id: 'RoRo02',
      category: 'starters',
      firstName: 'Rosie',
      lastName: 'Robot',
      speed: 10,
      strength: 40,
      agility: 50,
      totalAttrScore: 100
    }

    state = {
      teamName: '',
      starters: [robotStarter],
      subs: [robotSub],
      error: ''
    };

    starters = [];
    subs = [];

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

    fullState = {
      teamName: 'BuzzKillers',
      starters,
      subs,
      error: ''
    };

    league = [fullState]
  });

  describe('VALIDATE_TEAM_ROSTER', () => {
    let teamName;

    beforeEach(() => {
      teamName = 'BuzzKillers';
    });

    it('returns correct error string if teamName is undefined', () => {
      teamName = ''

      const actual = helper.validateTeamRoster({ teamName, starters, subs });
      const expected = error.missingName;

      expect(actual).toEqual(expected);
    });

    it('returns correct error string if there are not 10 starters on the team', () => {
      starters = [];

      const actual = helper.validateTeamRoster({ teamName, starters, subs });
      const expected = error.badNumberOfStarters;

      expect(actual).toEqual(expected);
    });

    it('returns correct error string if there are not 5 subs on the team', () => {
      subs = [];

      const actual = helper.validateTeamRoster({ teamName, starters, subs });
      const expected = error.badNumberOfSubs;

      expect(actual).toEqual(expected);
    });

    it('should return valid if all parameters pass the conditions', () => {
      const actual = helper.validateTeamRoster({ teamName, starters, subs });
      const expected = 'valid';

      expect(actual).toEqual(expected);
    });
  });

  describe('ADD_ID_AND_TOTAL_SCORE', () => {
    let count = 1;

    it('should return robot with added id and totalAttrScore props', () => {
      const actual = helper.addIdAndTotalScore(robot, count);
      const expected = {...robot, id: 'TwRo01', totalAttrScore: 90};

      expect(actual).toEqual(expected);
    }); 
  });

  describe('CREATE_ID', () => {
    it('returns prefix and teamNumber with an added zero if the count is a single digit', () => {
    const actual = helper.createId('AbCd', 1);
    const expectation = 'AbCd01';

    expect(actual).toEqual(expectation);
    }); 

    it('returns prefix and teamNumber and does not add a zero if the count is double digit', () => {
      const actual = helper.createId('AbCd', 11);
      const expectation = 'AbCd11';

      expect(actual).toEqual(expectation);
    });
  });

  describe('VALIDATE_NEW_ROBOT', () => {
    it('returns correct error string if score is > 100', () => {
      let tooStrongRobot = {...robot, totalAttrScore: 200}

      const actual = helper.validateNewRobot(tooStrongRobot, state, league);
      const expected = error.badScore;

      expect(actual).toEqual(expected);
    });

    it('returns correct error string if score is not unique', () => {
      let dupeScoreRobot = {...robot, totalAttrScore: 9}    ;
      const actual = helper.validateNewRobot(dupeScoreRobot, fullState, league);
      const expected = error.duplicateScore;

      expect(actual).toEqual(expected);
    });

    it('returns correct error string if firstName is not unique', () => {
      let dupeNameRobot = {...robot, firstName: 'Rosie'}

      const actual = helper.validateNewRobot(dupeNameRobot, state, league);
      const expected = error.duplicateFirstName;

      expect(actual).toEqual(expected);
    });

    it('returns correct error string if lastName is not unique', () => {
      let dupeNameRobot = {...robot, lastName: 'Robot'}

      const actual = helper.validateNewRobot(dupeNameRobot, state, league);
      const expected = error.duplicateLastName;
      
      expect(actual).toEqual(expected);
    });

    it('returns correct error string if there are maximum number of starters', () => {
      state = {...fullState, subs: []}
      const actual = helper.validateNewRobot(robotStarter, state, league);
      const expected = error.maxPlayers;

      expect(actual).toEqual(expected);
    });

    it('returns correct errors string if there are maximum number of subs', () => {
      state = {...fullState, starters: []}
      const actual = helper.validateNewRobot(robotSub, state, league);
      const expected = error.maxPlayers;

      expect(actual).toEqual(expected);
    });

    it('returns valid if none of the checkForDuplicate returns return a result', () => {
      const actual = helper.validateNewRobot(robot, state, league);

      expect(actual).toEqual('valid');
    });
  });

  describe('CHECK_LEAGUE_FOR_DUPLICATE_NAME', () => {
    it('returns undefined if there are no duplicates found', () => {
      const actual = helper.checkLeagueForDuplicateName(robot, league);
      const expected = undefined;

      expect(actual).toEqual(expected);
    });

    it('returns the robot object with the same first name', () => {
      let dupeRobot = {...robot, firstName: '0Twikki'}

      const actual = helper.checkLeagueForDuplicateName(dupeRobot, league);
      const expected = {
        "id": "ABC120", 
        "firstName": "0Twikki", 
        "lastName": "0Rogers", 
        "speed": 2, 
        "strength": 3, 
        "agility": 4, 
        "totalAttrScore": 9
      };

      expect(actual).toEqual(expected);
    });

    it('returns the robot with the same last name', () => {
      let dupeRobot = {...robot, lastName: '0Rogers'}

      const actual = helper.checkLeagueForDuplicateName(dupeRobot, league);
      const expected = {
        "id": "ABC120", 
        "firstName": "0Twikki", 
        "lastName": "0Rogers", 
        "speed": 2, 
        "strength": 3, 
        "agility": 4, 
        "totalAttrScore": 9
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('CHECK_FOR_DUPLICATE', () => {
    it('returns undefined if there is not duplicate found', () => {
      const actual = helper.checkForDuplicate('firstName', 'Buzz', state);

      expect(actual).toEqual(undefined);
    });

    it('returns the robot object with duplicate strength', () => {
      const actual = helper.checkForDuplicate('totalAttrScore', 80, state);

      expect(actual).toEqual(robotSub);
    });

    it('returns the robot object with duplicate firstName', () => {
      const actual = helper.checkForDuplicate('firstName', 'Rosie', state);

      expect(actual).toEqual(robotStarter);
    });

    it('returns the robot object with duplicate lastName', () => {
      const actual = helper.checkForDuplicate('lastName', 'Robot', state);

      expect(actual).toEqual(robotStarter);
    });
  });

  describe('CHECK_FOR_CATEGORY_FULL', () => {
    it('returns true if there are 10 starters', () => {
      const actual = helper.checkForCategoryFull('starters', fullState);

      expect(actual).toEqual(true);
    });

    it('returns true if there are 5 subs', () => {
      const actual = helper.checkForCategoryFull('subs', fullState);

      expect(actual).toEqual(true);
    });

    it('returns false if there are less than 10 starters', () => {
      state = {...fullState, starters: []}

      const actual = helper.checkForCategoryFull('starters', state);

      expect(actual).toEqual(false);
    });

    it('returns false if there are less than 5 subs', () => {
      state = {...fullState, subs: []}

      const actual = helper.checkForCategoryFull('subs', state);

      expect(actual).toEqual(false);
    });
  });

  describe('CHECK_FOR_VALID_UPDATE', () => {
    it('returns true if there is neither a first or last dupe', () => {
      const actual = helper.checkForValidUpdate(undefined, undefined, 'AABB101');
      const expected = true;

      expect(actual).toEqual(expected);
    });

    it('returns true if there is not a first dupe and the lastDupe.id equals id', () => {
      const actual = helper.checkForValidUpdate(undefined, robot, 'ABC123');
      const expected = true;

      expect(actual).toEqual(expected);
    });

    it('returns true if there is not a lastdupe and the first dupe.id equals id', () => {
      const actual = helper.checkForValidUpdate(robot, undefined, 'ABC123');
      const expected = true;

      expect(actual).toEqual(expected);
    });

    it('returns true if both dupes are the same', () => {
      const actual = helper.checkForValidUpdate(robot, robot, 'ABC123');
      const expected = true;

      expect(actual).toEqual(expected);
    });

    it('returns false if both dupes are not the same', () => {
      const actual = helper.checkForValidUpdate(robot, robotSub, 'ABC123');
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });
});