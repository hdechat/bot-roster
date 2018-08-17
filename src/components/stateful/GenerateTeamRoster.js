import React, { Component } from 'react';
import AddRobot from './AddRobot';
import Roster from '../stateless/Roster';
import * as errors from '../helpers/error-messages';

const initialState = {
  teamName: '',
  starters: [],
  subs: [],
  error: ''
};

class GenerateTeamRoster extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.count = 0;
  };

  submitTeamRoster = (event) => {
    event.preventDefault();

    let rosterStatus = this.validateTeamRoster(this.state);

    if (rosterStatus === 'valid') {
      this.props.addTeamRoster({...this.state, error: ''});
      this.clearStateValues();
      this.count = 0;
    } else {
      this.setError(rosterStatus)
    }
  };

  validateTeamRoster({ teamName, starters, subs }) {
    if (!teamName) {
      return errors.missingName;
    } else if (starters.length !== 10) {
      return errors.badNumberOfStarters;
    } else if (subs.length !== 5) {
      return errors.badNumberOfSubs;
    } else {
      return 'valid';
    }
  }

  clearStateValues = () => {
    this.setState({ ...this.state, ...initialState });
  };

  deleteRobot = (robot) => {
    const { category, id } = robot;

    const filtered = this.state[category].filter(bot => bot.id !== id);

    this.setState({ [category]: filtered });
  };

  addRobotToTeam = (robot) => {
    const { category, firstName, lastName, speed, strength, agility } = robot;

    const totalAttrScore = this.calculateTotalScore(speed, strength, agility);
    const id = this.createId(firstName.slice(0, 2) + lastName.slice(0, 2));
    const newRobot = {...robot, id, totalAttrScore}

    let robotStatus = this.validateNewRobot(newRobot, totalAttrScore);

    if (robotStatus === 'valid') {
      this.setState({ [category]: [...this.state[category], newRobot], error: '' });
    } else {
      this.count--;
      this.setError(robotStatus);
    }
  };

  validateNewRobot(robot, score) {
    const { firstName, lastName, category } = robot;
    let robotHasDupeStrength = this.checkForDuplicate('totalAttrScore', score);
    let robotHasDupeFirstName = this.checkForDuplicate('firstName', firstName);
    let robotHasDupeLastName = this.checkForDuplicate('lastName', lastName);
    let categoryFull = this.checkForCategoryFull(category);

    if (score > 100) {
      return errors.badScore;
    } else if (robotHasDupeStrength) {
      return errors.duplicateScore;
    } else if (robotHasDupeFirstName) {
      return errors.duplicateFirstName;
    } else if (robotHasDupeLastName) {
      return errors.duplicateLastName;
    } else if (categoryFull) {
      return errors.maxPlayers;
    } else {
      return 'valid';
    }
  };

  checkForCategoryFull(category) {
    if (category === 'starters') {
      return this.state.starters.length < 10 ? false : true;
    } else {
      return this.state.subs.length < 5 ? false : true;
    }
  }

  checkForDuplicate(prop, value) {
    const categories = ['starters', 'subs'];
    let duplicate;
    let count = 0;

    while(!duplicate && count < categories.length) {
      duplicate = this.state[categories[count]].find(bot => bot[prop] === value);
      count++;
    }

    return duplicate;
  }

  createId(prefix) {
    this.count++;
    let teamNumber = this.count.toString();

    prefix = teamNumber.length < 2 ? prefix += '0' : prefix;
    return prefix + teamNumber;
  }

  calculateTotalScore(speed, strength, agility) {
    return speed + strength + agility;
  }

  updateName = (robot) => {
    const { category, id, firstName, lastName} = robot;
    const duplicateFirstName = this.checkForDuplicate('firstName', firstName);
    const duplicateLastName = this.checkForDuplicate('lastName', lastName);

    const validChange = this.checkForValidUpdate(duplicateFirstName, duplicateLastName, id)

    if (validChange) {
      const updatedBots = this.state[category].map(bot => {
        return bot.id === id ? robot : bot;
      });

      this.setState({ [category]: updatedBots, error: '' });
    } else {
        duplicateFirstName
        ? this.setError(errors.duplicateFirstName)
        : this.setError(errors.duplicateLastName);
    }
  }

  checkForValidUpdate(dupeFirst, dupeLast, id) {
    const validFirstNameChange = !dupeFirst && dupeLast.id === id
    const validLastNameChange = !dupeLast && dupeFirst.id === id
    const noChange = dupeFirst && dupeLast
      ? dupeFirst.id === id && dupeLast.id === id 
      : false

    return validFirstNameChange || validLastNameChange || noChange;
  }

  setError(error) {
    this.setState({ error })
  }

  render() {
    return (
      <div className="GenerateTeamRoster">
      <input
        required
        id="team-name"
        value={this.state.teamName} 
        onChange={(event) => this.setState({ teamName: event.target.value })}
        placeholder="Team Name" />
        <button className="generate__submit-roster" onClick={this.submitTeamRoster}>Submit Team Roster</button>
        {!!this.state.error && <p className="generate__error-message">{this.state.error}</p>}
        <div className="generate__container">
          <AddRobot addRobotToTeam={this.addRobotToTeam}/>
          <Roster 
            deleteRobot={this.deleteRobot}
            updateName={this.updateName} 
            team={this.state}
            inRosters={false} />
        </div>
      </div>
    );
  };
};

export default GenerateTeamRoster;
