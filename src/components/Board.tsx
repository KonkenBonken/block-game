import React from 'react';

import scss from '../styles/_board.module.scss';

export default function Board({ grid }: { grid: boolean[][] }) {
  return (<div className={scss.board}>
    {grid.flatMap((row, y) => row.map((cell, x) => cell && (
      <div key={`${x}${y}`}
        style={{
          '--x': x, '--y': y
        } as React.CSSProperties} />
    )))}
  </div>);
}
