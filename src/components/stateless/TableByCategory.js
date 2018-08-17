import React from 'react';
import Robot from './Robot';

function TableByCategory({ header, robots, updateName, deleteRobot, inRosters }) {
  const team = robots.map(bot => 
    <Robot 
      key={bot.firstName + bot.lastName + bot.totalAttrScore}
      robot={bot}
      updateName={updateName}
      deleteRobot={deleteRobot}
      inRosters={inRosters} />
  );

  return(
    <table>
      <thead>
        <tr className="header__titles">
          <th>ID</th>
          <th>FIRST NAME</th>
          <th>LAST NAME</th>
          <th>SPEED</th>
          <th>STRENGTH</th>
          <th>AGILITY</th>
          <th>TTL ATTRIBUTES SCORE</th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th className="header__category" colSpan="7">{ header }</th>
        </tr>
      </thead>
      <tbody>
        { team }
      </tbody>
    </table>
  )
}

export default TableByCategory;
