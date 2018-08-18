import React from 'react';
import Robot from '../Robot';
import { shallow, mount } from 'enzyme';

describe('Robot', () => {
  let wrapper;
  let mockRobot;
  let mockUpdateName;
  let mockDeleteRobot;
  let mockEventChangeFirstName;
  let mockEventChangeLastName;
  let mockEventChangeLastNameWithTab;

  beforeEach(() => {
    mockEventChangeFirstName = {
      target: {
        classList: ['firstName'],
        innerText: 'Buck'
      },
      preventDefault: jest.fn(),
      which: 13
    };

    mockEventChangeLastName = {
      target: {
        classList: ['lastName'],
        innerText: 'Bot'
      },
      preventDefault: jest.fn(),
      which: 13
    }

    mockEventChangeLastNameWithTab = {
      target: {
        classList: ['lastName'],
        innerText: 'Bot'
      },
      preventDefault: jest.fn(),
      which: 9
    }

    mockRobot = {
      id: 'ABC123',
      firstName: 'Twikki',
      lastName: 'Rogers',
      speed: 20,
      strength: 30,
      agility: 40,
      totalAttrScore: 90
    };

    mockUpdateName = jest.fn();
    mockDeleteRobot = jest.fn();

    wrapper = shallow(<Robot 
      team={''}
      robot={mockRobot} 
      updateName={mockUpdateName}
      deleteRobot={mockDeleteRobot}
      inRosters={false}/>);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls updateName with the correct params if user edits first name then presses enter', () => {
    wrapper.find('.firstName').simulate('keypress', mockEventChangeFirstName);

    const expected = {...mockRobot, firstName: 'Buck'}

    expect(mockUpdateName).toHaveBeenCalledWith(expected);
  });

  it('calls updateName with the correct params if user edits first name, leaves element, and presses Enter', () => {
    wrapper.find('.firstName').prop('onBlur')(mockEventChangeFirstName)

    const expected = {...mockRobot, firstName: 'Buck'}

    expect(mockUpdateName).toHaveBeenCalledWith(expected);
  });

  it('calls updateName with the correct params if user edits last name then presses enter', () => {
    wrapper.find('.lastName').simulate('keypress', mockEventChangeLastName);

    const expected = {...mockRobot, lastName: 'Bot'}

    expect(mockUpdateName).toHaveBeenCalledWith(expected);
  });

  it('calls updateName with the correct params if user edits last name, leaves element then presses enter', () => {
    wrapper.find('.lastName').prop('onBlur')(mockEventChangeLastName)

    const expected = {...mockRobot, lastName: 'Bot'}

    expect(mockUpdateName).toHaveBeenCalledWith(expected);
  });

  it('calls updateName with the correct params if user edits last name then presses tab', () => {
    wrapper.find('.lastName').simulate('keypress', mockEventChangeLastNameWithTab);

    const expected = {...mockRobot, lastName: 'Bot'}

    expect(mockUpdateName).toHaveBeenCalledWith(expected);
  });

  it('calls deleteRobot with the correct params on button click', () => {
    wrapper.find('button').simulate('click')

    expect(mockDeleteRobot).toHaveBeenCalledWith(mockRobot);
  });
  
  it('does not render delete button if at rosters endpoint', () => {
    wrapper = shallow(<Robot 
      team={''}
      robot={mockRobot} 
      updateName={mockUpdateName}
      deleteRobot={mockDeleteRobot}
      inRosters={true}/>)

    expect(wrapper.find('button').length).toEqual(0)
  });
});
