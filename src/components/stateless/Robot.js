import React from 'react';

function Robot({ robot }) {
  const { 
    id, firstName, lastName, speed, 
    strength, agility, totalAttrScore } = robot;

  return (
    <tr>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{speed}</td>
      <td>{strength}</td>
      <td>{agility}</td>
      <td>{totalAttrScore}</td>
    </tr>
  );
};

export default Robot;
