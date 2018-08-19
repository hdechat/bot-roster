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

export function validateNewRobot(robot,  team, league) {
    const { firstName, lastName, category, totalAttrScore } = robot;
    let robotHasDupeStrength = checkForDuplicate('totalAttrScore', totalAttrScore, team);
    let robotHasDupeFirstName = checkForDuplicate('firstName', firstName, team);
    let robotHasDupeLastName = checkForDuplicate('lastName', lastName, team);
    let robotHasDupeNameInLeague = checkLeagueForDuplicateName(robot, league);
    let categoryFull = checkForCategoryFull(category, team, league);

    if (totalAttrScore > 100) {
      return error.badScore;
    } else if (robotHasDupeStrength) {
      return error.duplicateScore;
    } else if (robotHasDupeFirstName) {
      return error.duplicateFirstName;
    } else if (robotHasDupeLastName) {
      return error.duplicateLastName;
    } else if (robotHasDupeNameInLeague) {
      return error.duplicateNameInLeague;
    } else if (categoryFull) {
      return error.maxPlayers;
    } else {
      return 'valid';
    }
};

export function checkLeagueForDuplicateName(robot, league) {
  const { firstName, lastName } = robot;
  let count = 0;
  let dupeFirstName;
  let dupeLastName;

  while(!dupeFirstName && !dupeLastName && count < league.length) {
    dupeFirstName = checkForDuplicate('firstName', firstName, league[count]);
    dupeLastName = checkForDuplicate('lastName', lastName, league[count]);
    count++
  }

  return dupeFirstName || dupeLastName;
}

export function checkForDuplicate(prop, value, state) {
    const categories = ['starters', 'subs'];
    let duplicate;
    let count = 0;

    while(!duplicate && count < categories.length) {
      duplicate = state[categories[count]].find(bot => {
        if(typeof value === 'string') {
          return bot[prop].toLowerCase() === value.toLowerCase();
        } else {
          return bot[prop] === value;
        }
      });
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

export function checkForValidUpdate(robot, team, league) {
  const { id, firstName, lastName} = robot;
  const duplicateFirstName = checkForDuplicate('firstName', firstName, team);
  const duplicateLastName = checkForDuplicate('lastName', lastName, team);
  const duplicateNameInLeague = checkLeagueForDuplicateName(robot, league);

  return validOrError(duplicateFirstName, duplicateLastName, duplicateNameInLeague, id);
}

export function validOrError(dupeFirst, dupeLast, dupeInLeague, id) {
  if (!dupeFirst && !dupeLast && !dupeInLeague) { 
    return 'valid';
  } else if (dupeInLeague) {
    return error.duplicateNameInLeague;
  } else if (!dupeFirst && dupeLast.id === id) {
    return 'valid';
  } else if (!dupeLast && dupeFirst.id === id) {
    return 'valid';
  } else if (dupeFirst || dupeLast) {
      if (dupeFirst.id === id && dupeLast.id === id) {
        return 'valid';
      } else if(dupeFirst.id !==id) {
        return error.duplicateFirstName;
      } else {
        return error.duplicateLastName;
      }; 
  }       
}
