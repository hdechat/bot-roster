import React from 'react';

function Robot ({ robot, updateName, team }) {
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

  return (
    <tr>
      <td>{id}</td>
      <td
        className="firstName" 
        contentEditable
        onKeyPress={changeName}>
        {firstName}
      </td>
      <td
        className="lastName" 
        contentEditable
        onKeyPress={changeName}>
      {lastName}
      </td>
      <td>{speed}</td>
      <td>{strength}</td>
      <td>{agility}</td>
      <td>{totalAttrScore}</td>
    </tr>
  );
};

export default Robot;
