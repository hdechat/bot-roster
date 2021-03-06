import React from 'react';
import Robot from './Robot';

function TableByCategory(props) {
  const { 
    header, robots, updateName, deleteRobot, 
    inRosters, updateNameinLeague, teamName } = props;
    
  const team = robots.map(bot => 
    <Robot 
      key={bot.firstName + bot.lastName + bot.totalAttrScore}
      robot={bot}
      updateName={updateName}
      updateNameinLeague={updateNameinLeague}
      teamName={teamName}
      deleteRobot={deleteRobot}
      inRosters={inRosters} />
  );

  return(
    <div className="TableByCategory">
      <table>
        <thead>
          <tr>
            <th className="header__category" colSpan="7">{ header }</th>
          </tr>
        </thead>
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
        <tbody>
          { team }
        </tbody>
      </table>
    </div>
  )
}

export default TableByCategory;
