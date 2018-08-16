import React from 'react';
import TableByCategory from './TableByCategory';

function Roster({ team, updateName, deleteRobot }) {
  const { teamName, starters, subs } = team;

  return (
    <div className="Roster">
      <h1>{ teamName }</h1>
      <TableByCategory 
        header="Starters" 
        robots={starters} 
        updateName={updateName} 
        deleteRobot={deleteRobot}/>
      <TableByCategory 
        header="Subs" 
        robots={subs} 
        updateName={updateName} 
        deleteRobot={deleteRobot}/>
    </div>
  );
};

export default Roster;
