import React, { Component } from 'react';
import GenerateTeamRoster from './stateful/GenerateTeamRoster';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { teams: [] };
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
        <GenerateTeamRoster addTeamRoster={this.addTeamRoster}/>
      </div>
    );
  };
};

export default App;
