import React, { Component } from 'react';
import Roster from '../stateless/Roster.js';

class ViewRosters extends Component {
  constructor(props) {
    super(props);

    this.state = {teamName: ''}
  }
  
  render() {
    const teamsList = this.props.teams.map(({ teamName }, index) => 
      <li key={teamName + index} onClick={()=>this.setState({ teamName })}><p>{ teamName }</p></li>
    );
    const team = this.props.teams.find(team => team.teamName === this.state.teamName)

    return (
      <div className="ViewRosters">
        <p>Click on the team name to view the roster!</p>
        <ul>
          {teamsList}
        </ul>
        { !!this.state.teamName && <Roster team={ team } 
          updateNameinLeague={this.props.updateNameinLeague} inRosters={true} /> }
      </div>
    )
  }
}

export default ViewRosters;
