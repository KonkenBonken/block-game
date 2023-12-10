import React, { useState } from 'react';

import Board from './components/Board';
import Block from './components/Block';

export default function Main() {
  const [grid, setGrid] = useState<boolean[][]>(Array(10).fill(0).map(() => Array(10).fill(false)));

  function placeBlock(shape: boolean[][], x: number, y: number) {
    for (let row = 0; row < shape.length; row++)
      for (let cell = 0; cell < shape[row].length; cell++)
        if (shape[row][cell] && grid[y + row][x + cell])
          return false;

    for (let row = 0; row < shape.length; row++)
      for (let cell = 0; cell < shape[row].length; cell++)
        grid[y + row][x + cell] ||= shape[row][cell];

    setGrid([...grid]);
    return true;
  }

  return (<>
    <h1>Block Game</h1>
    <Board grid={grid} />
    <Block placeBlock={placeBlock} />
  </>);
}
