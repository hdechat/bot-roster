import React, { Component } from 'react';

class AddRobot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      firstName: '',
      lastName: '',
      speed: 0,
      strength: 0,
      agility: 0,
    };
  };

  updateUserInputText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateUserInputNumber = (event) => {
    if(event.target.value) {
      this.setState({ [event.target.name]: parseInt(event.target.value) })
    }
  };

  addToTeam = (event) => {
    event.preventDefault();
    this.props.addRobotToTeam(this.state);
    this.clearStateValues();
  };

  clearStateValues = () => {
    const props = {
      firstName: '',
      lastName: '',
      speed: 0,
      strength: 0,
      agility: 0,
    };

    this.setState({ ...this.state, ...props });
  }

  render() {
    return (
      <form className="AddRobot" onSubmit={this.addToTeam}>
        <label htmlFor="category">Starter or Sub</label>
        <select 
          value={this.state.category}
          required
          id="category"
          name="category" 
          onChange={this.updateUserInputText}>
          <option value="">Select a Category</option>
          <option value="starters">starters</option>
          <option value="subs">subs</option>
        </select>
        <div className="robot-data">
          <label htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            required
            value={this.state.firstName}
            name="firstName"
            onChange={this.updateUserInputText} 
            placeholder="first name"
            minLength="2" />
          <label htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            required
            value={this.state.lastName} 
            name="lastName" 
            onChange={this.updateUserInputText} 
            placeholder="last name" 
            minLength="2"/>
          <label htmlFor="speed">Speed</label>
          <input 
            id="speed"
            type="number"
            pattern="[0-9]"
            value={this.state.speed} 
            name="speed"
            onChange={this.updateUserInputNumber} />
          <label htmlFor="strength">Strength</label>
          <input 
            id="strength"
            type="number"
            pattern="[0-9]"
            value={this.state.strength} 
            name="strength" 
            onChange={this.updateUserInputNumber} />
          <label htmlFor="agility">Agility</label>
          <input 
            id="agility"
            type="number"
            pattern="[0-9]"
            value={this.state.agility} 
            name="agility" 
            onChange={this.updateUserInputNumber} />
        <button type="submit">Add Robot To Team</button>
        </div>
      </form>
    );
  };
};

export default AddRobot;
