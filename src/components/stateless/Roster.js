import React from 'react';
import TableByCategory from './TableByCategory';

function Roster({ team, updateName, deleteRobot, inRosters }) {
  const { teamName, starters, subs } = team;

  return (
    <div className="Roster">
      <h1>{ teamName }</h1>
      <TableByCategory 
        header="Starters" 
        robots={starters} 
        updateName={updateName} 
        deleteRobot={deleteRobot}
        inRosters={inRosters}/>
      <TableByCategory 
        header="Subs" 
        robots={subs} 
        updateName={updateName} 
        deleteRobot={deleteRobot}
        inRosters={inRosters}/>
    </div>
  );
};

export default Roster;
