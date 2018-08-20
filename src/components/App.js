import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import GenerateTeamRoster from './stateful/GenerateTeamRoster';
import ViewRosters from './stateful/ViewRosters';
import * as helper from './helpers/helpers';
import './App.css';

import sampleTeam from '../mock_data/sample-team.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { teams: [sampleTeam], error: '' };
  };

  addTeamRoster = (team) => {
    this.setState({ teams: [...this.state.teams, team] });
  };

  updateNameinLeague = (robot, teamName) => {
    const { id, category } = robot;
    const team = this.state.teams.find(team => team.teamName === teamName);

    const status = helper.checkForValidUpdate(robot, team, this.state.teams);

    if (status === 'valid') {
      const updatedTeams = this.state.teams.map(team => {
        if (team.teamName === teamName) {
          const updatedTeamCategory =  team[category].map(bot => {
            return bot.id === id ? robot : bot;
          });

          return {...team, [category]: updatedTeamCategory }
        } else {
          return team;
        }
      });
      this.setState({ teams: updatedTeams, error: '' })
    } else {
      this.setState({ error: status })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Roster Bots</h1>
          <NavLink className="nav" to='/create-roster'>Create Team Roster</NavLink>
          <NavLink className="nav" to='/rosters'>View Team Rosters</NavLink>
        </header>
        { !!this.state.error && <p className="app__error-message">{this.state.error}</p> }
        <Route exact path='/create-roster' render={() => {
          return <GenerateTeamRoster teams={this.state.teams} addTeamRoster={this.addTeamRoster} />
        }}/>
        <Route exact path='/rosters' render={() => {
          return <ViewRosters teams={this.state.teams} updateNameinLeague={this.updateNameinLeague} />
        }}/>

      </div>
    );
  };
};

export default App;
