import React from 'react';
import AddRobot from '../AddRobot';
import { shallow, mount } from 'enzyme';

describe('AddRobot', () => {
  let wrapper;
  let mockAddRobotToTeam;
  let mockState = {
    category: '',
    firstName: '',
    lastName: '',
    speed: 0,
    strength: 0,
    agility: 0  
  }

  beforeEach(() => {
    mockAddRobotToTeam = jest.fn();

    wrapper = shallow(<AddRobot addRobotToTeam={mockAddRobotToTeam} />)
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('UPDATE_USER_INPUT_TEXT', () => {
    it('should update state', () => {
      const mockEvent = {target: {
        name: 'category',
        value: 'subs'
      }}

      const expectedState = {
        category: 'subs',
        firstName: '',
        lastName: '',
        speed: 0,
        strength: 0,
        agility: 0  
      };   

      wrapper.instance().updateUserInputText(mockEvent);

      expect(wrapper.state()).toEqual(expectedState);
    });
  });

describe('UPDATE_USER_INPUT_NUMBER', () => {
    it('should update state with number', () => {
      const mockEvent = {target: {
        name: 'speed',
        value: '5'
      }}

      const expectedState = {
        category: '',
        firstName: '',
        lastName: '',
        speed: 5,
        strength: 0,
        agility: 0  
      };   

      wrapper.instance().updateUserInputNumber(mockEvent);

      expect(wrapper.state()).toEqual(expectedState);
    });
  });

  describe('ADD_TO_TEAM', () => {
    const mockEvent = {preventDefault: jest.fn()}
    
    it('calls addRobotToTeam with correct params', () => {
      wrapper.instance().addToTeam(mockEvent);

      expect(mockAddRobotToTeam).toHaveBeenCalledWith(mockState);
    });

    it('calls clearStateValues', () => {
      wrapper = mount(<AddRobot addRobotToTeam={mockAddRobotToTeam} />)
      const spy = spyOn(wrapper.instance(), 'clearStateValues');

      wrapper.instance().forceUpdate();
      wrapper.instance().addToTeam(mockEvent);

      expect(spy).toHaveBeenCalled();
    }); 
  });

  describe('CLEAR_STATE_VALUES', () => {
    it('clears state values', () => {
      const mockUpdatedState = {
        category: 'subs',
        firstName: 'Jhonen',
        lastName: 'Vasquez',
        speed: 10,
        strength: 40,
        agility: 50  
      };

      wrapper.setState(mockUpdatedState)
      wrapper.instance().clearStateValues();

      expect(wrapper.state()).toEqual(mockState);
    });
  });

  it('renders the expected elements', () => {
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('select').length).toEqual(1);
    expect(wrapper.find('option').length).toEqual(3);
    expect(wrapper.find('input').length).toEqual(5);
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('calls addToTeam on form submit', () => {
    wrapper = mount(<AddRobot addRobotToTeam={mockAddRobotToTeam} />)
    const spy = spyOn(wrapper.instance(), 'addToTeam');

    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit');

    expect(spy).toHaveBeenCalled();
  });
});
  
