import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import GenerateTeamRoster from './stateful/GenerateTeamRoster';
import ViewRosters from './stateful/ViewRosters';
import './App.css';

import sampleTeam from '../mock_data/sample-team.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { teams: [sampleTeam] };
  };

  addTeamRoster = (team) => {
    this.setState({ teams: [...this.state.teams, team] });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Roster Bots</h1>
        </header>
        <NavLink className="nav" to='/create-roster'>Create Team Roster</NavLink>
        <NavLink className="nav" to='/rosters'>View Team Rosters</NavLink>

        <Route exact path='/create-roster' render={() => {
          return <GenerateTeamRoster teams={this.state.teams} addTeamRoster={this.addTeamRoster} />
        }}/>
        <Route exact path='/rosters' render={() => {
          return <ViewRosters teams={this.state.teams} />
        }}/>

      </div>
    );
  };
};

export default App;
