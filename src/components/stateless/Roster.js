import React from 'react';
import TableByCategory from './TableByCategory';

function Roster({ team, updateName }) {
  const { teamName, starters, subs } = team;

  return (
    <div className="Roster">
      <h1>{ teamName }</h1>
      <TableByCategory header="Starters" robots={starters} updateName={updateName} />
      <TableByCategory header="Subs" robots={subs} updateName={updateName} />
    </div>
  );
};

export default Roster;
