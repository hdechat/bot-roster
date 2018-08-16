import React, { Component } from 'react';
import AddRobot from './AddRobot';
import Roster from '../stateless/Roster';
import * as errors from '../helpers/error-messages';

class GenerateTeamRoster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamName: '',
      starters: [],
      subs: [],
      error: ''
    };

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
      this.setState({error: rosterStatus})
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
      this.setState({ error: robotStatus});
    }
  };

  validateNewRobot(robot, score) {
    const { firstName, lastName } = robot;
    let robotHasDupeStrength = this.checkForDuplicate('totalAttrScore', score);
    let robotHasDupeFirstName = this.checkForDuplicate('firstName', firstName);
    let robotHasDupeLastName = this.checkForDuplicate('lastName', lastName);

    if (score > 100) {
      return errors.badScore;
    } else if (robotHasDupeStrength) {
      return errors.duplicateScore;
    } else if (robotHasDupeFirstName) {
      return errors.duplicateFirstName;
    } else if (robotHasDupeLastName) {
      return errors.duplicateLastName;
    } else {
      return 'valid';
    }
  };

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

  render() {
    return (
      <div className="GenerateTeamRoster">
      <input
        required
        value={this.state.teamName} 
        onChange={(event) => this.setState({ teamName: event.target.value })}
        placeholder="Team Name" />
        <button className="submit-roster" onClick={this.submitTeamRoster}>Submit Team Roster</button>
        <p className="error-message">{this.state.error}</p>
        <AddRobot addRobotToTeam={this.addRobotToTeam}/>
        <Roster team={this.state}/>
      </div>
    );
  };
};

export default GenerateTeamRoster;
