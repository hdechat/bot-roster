import React, { Component } from 'react';
import Roster from '../stateless/Roster.js';

class ViewRosters extends Component {
  constructor(props) {
    super(props);

    this.state = {teamName: ''}
  }
  
  render() {
    const teamsList = this.props.teams.map(({ teamName }, index) => 
      <option key={teamName + index} value={teamName}>{ teamName }</option>
    );
    const team = this.props.teams.find(team => team.teamName === this.state.teamName)

    return (
      <div className="ViewRosters">
        <p>Click on the team name to view the roster!</p>
        <select onChange={event =>this.setState({ teamName: event.target.value })}>
          <option value="">Select Team</option>
          {teamsList}
        </select>
        { !!this.state.teamName && <Roster team={ team } 
          updateNameinLeague={this.props.updateNameinLeague} inRosters={true} /> }
      </div>
    )
  }
}

export default ViewRosters;
