import React from 'react';

function Robot (props) {
  const { 
    robot, updateName, deleteRobot, inRosters, 
    updateNameinLeague, teamName } = props;

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
    const updatedRobot = {...robot, [prop]: value};


    if (event.which === 13 || event.which === 9) {
      event.preventDefault();
      inRosters 
        ? updateNameinLeague(updatedRobot, teamName)
        : updateName(updatedRobot);
      document.getElementById(prop+id).innerText = robot[prop];
    }
  }

  const deleteButton = 
     !inRosters && <td><button onClick={()=>deleteRobot(robot)}>delete</button></td>
  

  return (
    <tr>
      <td>{id}</td>
      <td
        id={'firstName' + id}
        className="firstName" 
        contentEditable
        onBlur={changeName}
        onKeyPress={changeName}>
        {firstName}
      </td>
      <td
        id={'lastName' + id}
        className="lastName" 
        contentEditable
        onBlur={changeName}
        onKeyPress={changeName}>
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
