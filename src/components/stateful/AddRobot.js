import React, { Component } from 'react';

const initialState = {
  category: '',
  firstName: '',
  lastName: '',
  speed: 0,
  strength: 0,
  agility: 0,
};

class AddRobot extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  };

  updateUserInputText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateUserInputNumber = (event) => {
    this.setState({ [event.target.name]: parseInt(event.target.value) })
  };

  addToTeam = (event) => {
    event.preventDefault();
    this.props.addRobotToTeam(this.state);
    this.clearStateValues();
  };

  clearStateValues = () => {
    this.setState({ ...this.state, ...initialState });
  }

  render() {
    return (
      <form onSubmit={this.addToTeam}>
        <select required name="category" onChange={this.updateUserInputText}>
          <option value="">Select a Category</option>
          <option value="starters">starters</option>
          <option value="subs">subs</option>
        </select>
        <input
          required
          value={this.state.firstName}
          name="firstName"
          onChange={this.updateUserInputText} 
          placeholder="first name"
          minLength="2" />
        <input
          required
          value={this.state.lastName} 
          name="lastName" 
          onChange={this.updateUserInputText} 
          placeholder="last name" 
          minLength="2"/>
        <input 
          type="number"
          value={this.state.speed} 
          name="speed"
          onChange={this.updateUserInputNumber} 
          placeholder="speed" />
        <input 
          type="number"
          value={this.state.strength} 
          name="strength" 
          onChange={this.updateUserInputNumber} 
          placeholder="strength" />
        <input 
          type="number"
          value={this.state.agility} 
          name="agility" 
          onChange={this.updateUserInputNumber} 
          placeholder="agility" />
        <button type="submit">Add Robot To Team</button>
      </form>
    );
  };
};

export default AddRobot;
