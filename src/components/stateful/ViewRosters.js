import React, { Component } from 'react';
import Roster from '../stateless/Roster.js';

class ViewRosters extends Component {
  constructor(props) {
    super(props);

    this.state = {team: ''}
  }
  
  render() {
    const teamsList = this.props.teams.map((team, index) => 
      <li key={team.teamName + index} onClick={()=>this.setState({ team })}><p>{team.teamName}</p></li>
    );

    return (
      <div className="ViewRosters">
        <p>Click on the team name to view the roster!</p>
        <ul>
          {teamsList}
        </ul>
        {this.state.team ? <Roster team={this.state.team} inRosters={true}/> : ''}
      </div>
    )
  }
}

export default ViewRosters;
