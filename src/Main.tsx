import React, { useState } from 'react';

import Board from './components/Board';
import Block from './components/Block';

export default function Main() {
  const [grid, setGrid] = useState<boolean[][]>(Array(10).fill(0).map(() => Array(10).fill(false)));

  function placeBlock(x: number, y: number) {
    if (grid[y][x])
      return false;

    grid[y][x] = true;
    setGrid([...grid]);
    return true;
  }

  return (<>
    <h1>Block Game</h1>
    <Board grid={grid} />
    <Block placeBlock={placeBlock} />
  </>);
}
