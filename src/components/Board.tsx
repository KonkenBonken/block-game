import React from 'react';

import scss from '../styles/_board.module.scss';

export default function Board({ grid }: { grid: (boolean | 'destroyed')[][] }) {
  return (<div className={scss.board}>
    {grid.flatMap((row, y) => row.map((cell, x) => cell && (
      <div key={`${x}${y}`} 
        className={cell === 'destroyed' ? scss.destroyed : undefined}
        style={{
          '--x': x, '--y': y
        } as React.CSSProperties} />
    )))}
  </div>);
}
