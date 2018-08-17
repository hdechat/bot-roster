import * as error from './error-messages';

export function validateTeamRoster({ teamName, starters, subs }) {
  if (!teamName) {
    return error.missingName;
  } else if (starters.length !== 10) {
    return error.badNumberOfStarters;
  } else if (subs.length !== 5) {
    return error.badNumberOfSubs;
  } else {
    return 'valid';
  }
}

export function addIdAndTotalScore(robot, count) {
    const { firstName, lastName, speed, strength, agility } = robot;

    const totalAttrScore = speed + strength + agility;
    const id = createId(firstName.slice(0, 2) + lastName.slice(0, 2), count);
    return {...robot, id, totalAttrScore}
}

export function createId(prefix, count) {
    let teamNumber = count.toString();

    prefix = teamNumber.length < 2 ? prefix += '0' : prefix;
    return prefix + teamNumber;
}

export function validateNewRobot(robot,  state) {
    const { firstName, lastName, category, totalAttrScore } = robot;
    let robotHasDupeStrength = checkForDuplicate('totalAttrScore', totalAttrScore, state);
    let robotHasDupeFirstName = checkForDuplicate('firstName', firstName, state);
    let robotHasDupeLastName = checkForDuplicate('lastName', lastName, state);
    let categoryFull = checkForCategoryFull(category, state);

    if (totalAttrScore > 100) {
      return error.badScore;
    } else if (robotHasDupeStrength) {
      return error.duplicateScore;
    } else if (robotHasDupeFirstName) {
      return error.duplicateFirstName;
    } else if (robotHasDupeLastName) {
      return error.duplicateLastName;
    } else if (categoryFull) {
      return error.maxPlayers;
    } else {
      return 'valid';
    }
};

export function checkForDuplicate(prop, value, state) {
    const categories = ['starters', 'subs'];
    let duplicate;
    let count = 0;

    while(!duplicate && count < categories.length) {
      duplicate = state[categories[count]].find(bot => bot[prop] === value);
      count++;
    }
    return duplicate;
};

export function checkForCategoryFull(category, state) {
    if (category === 'starters') {
      return state.starters.length < 10 ? false : true;
    } else {
      return state.subs.length < 5 ? false : true;
    }
}

export function checkForValidUpdate(dupeFirst, dupeLast, id) {
  if (!dupeFirst && !dupeLast) {
    return true;
  } else if (!dupeFirst && dupeLast.id === id) {
    return true;
  } else if (!dupeLast && dupeFirst.id === id) {
    return true;
  } else if (dupeFirst && dupeLast) {
    return dupeFirst.id === id && dupeLast.id === id;
  } else {
    return false;
  }
}