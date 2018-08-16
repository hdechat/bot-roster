import React from 'react';
import Robot from './Robot';

function TableByCategory({ header, robots }) {
  const team = robots.map(bot => 
    <Robot 
      key={bot.firstName + bot.lastName + bot.totalAttrScore}
      robot={bot} />
  );

  return(
    <table className="TableByCategory">
      <thead>
        <tr>
          <th>{ header }</th>
        </tr>
      </thead>
      <tbody>
        { team }
      </tbody>
    </table>
  )
}

export default TableByCategory;
