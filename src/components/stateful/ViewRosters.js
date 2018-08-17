import React, { Component } from 'react';
import Roster from '../stateless/Roster.js';

class ViewRosters extends Component {
  constructor(props) {
    super(props);

    this.state = {team: ''}
  }
  

  render() {
    const teamsList = this.props.teams.map(team => <li>{team.teamName}</li>);

    return (
      <div className="ViewRosters">
        <ul>
          {teamsList}
        </ul>
        {this.state.team ? <Roster team={this.state.team} /> : ''}
      </div>
    )
  }
}

export default ViewRosters;
