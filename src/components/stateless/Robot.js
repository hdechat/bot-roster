import React from 'react';

function Robot ({ robot, updateName, deleteRobot, team }) {
  const { 
    id,
    firstName,
    lastName,
    speed, 
    strength, 
    agility, 
    totalAttrScore } = robot;

  const changeName = (event) => {
    const prop = [event.target.classList[0]];
    const value = event.target.innerText;

    if (event.which === 13) {
      event.preventDefault();
      updateName({...robot, [prop]: value});
    }
  }

  const deleteButton = 
    !team && <td><button onClick={()=>deleteRobot(robot)}>delete</button></td>
  

  return (
    <tr>
      <td>{id}</td>
      <td
        className="firstName" 
        contentEditable={!team ? true : false}
        onBlur={!team ? changeName : ''}
        onKeyPress={!team ? changeName : ''}>
        {firstName}
      </td>
      <td
        className="lastName" 
        contentEditable={!team ? true : false}
        onBlur={!team ? changeName : ''}
        onKeyPress={!team ? changeName : ''}>
      {lastName}
      </td>
      <td>{speed}</td>
      <td>{strength}</td>
      <td>{agility}</td>
      <td>{totalAttrScore}</td>
      {deleteButton}
    </tr>
  );
};

export default Robot;
