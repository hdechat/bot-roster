import React from 'react';
import TableByCategory from './TableByCategory';

function Roster({ team }) {
  const { teamName, starters, subs } = team;

  return (
    <div className="Roster">
      <h1>{ teamName }</h1>
      <TableByCategory header="Starters" robots={starters} />
      <TableByCategory header="Subs" robots={subs} />
    </div>
  );
};

export default Roster;
