import React, { Component } from 'react';
import AddRobot from './AddRobot';
import Roster from '../stateless/Roster';
import * as helper from '../helpers/helpers';

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

    let rosterStatus = helper.validateTeamRoster(this.state);

    if (rosterStatus === 'valid') {
      this.props.addTeamRoster({ ...this.state, error: '' });
      this.setState({ ...this.state, ...initialState });
      this.count = 0;
    } else {
      this.setState({ error: rosterStatus });
    }
  };

  deleteRobot = (robot) => {
    const { category, id } = robot;

    const filtered = this.state[category].filter(bot => bot.id !== id);

    this.setState({ [category]: filtered });
    this.count--;
  };

  addRobotToTeam = (robot) => {
    this.count++;
    const { category } = robot;

    const newRobot = helper.addIdAndTotalScore(robot, this.count);
    let newRobotStatus = helper.validateNewRobot(newRobot, this.state, this.props.teams);

    if (newRobotStatus === 'valid') {
      this.setState({ [category]: [...this.state[category], newRobot], error: '' });
    } else {
      this.count--;
      this.setState({ error: newRobotStatus });
    }
  };

  updateName = (robot) => {
    const { category, id} = robot;
    const status = helper.checkForValidUpdate(robot, this.state, this.props.teams)

    if (status === 'valid') {
      const updatedBots = this.state[category].map(bot => {
        return bot.id === id ? robot : bot;
      });

      this.setState({ [category]: updatedBots, error: '' });
    } else {
      this.setState({ error: status })
    }
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
