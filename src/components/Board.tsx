import React, { useState } from 'react';

import scss from '../styles/_board.module.scss';

export default function Board() {
  const [grid, setGrid] = useState<boolean[][]>(Array(10).fill(0).map(() => Array(10).fill(false)));

  return (<div className={scss.board}>
    {grid.flatMap((row, y) => row.map((cell, x) => cell && (
      <div key={`${x}${y}`}
        style={{
          '--x': x, '--y': y
        } as React.CSSProperties} />
    )))}
  </div>);
}
