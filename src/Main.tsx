import React, { useState } from 'react';

import scss from './styles/_panel.module.scss';
import Board from './components/Board';
import Block from './components/Block';

export default function Main() {
  const [grid, setGrid] = useState<(boolean | 'destroyed')[][]>(Array(10).fill(0).map(() => Array(10).fill(false)));
  const [score, setScore] = useState(0);

  function placeBlock(shape: boolean[][], x: number, y: number) {
    for (let row = 0; row < shape.length; row++)
      for (let cell = 0; cell < shape[row].length; cell++)
        if (shape[row][cell] && grid[y + row][x + cell])
          return false;

    for (let row = 0; row < shape.length; row++)
      for (let cell = 0; cell < shape[row].length; cell++)
        grid[y + row][x + cell] ||= shape[row][cell];

    setScore(prev => prev + shape.flat().filter(Boolean).length ** 2);

    for (let row = 0; row < 10; row++)
      if (grid[row].every(Boolean)) {
        grid[row] = Array(10).fill('destroyed');
        setTimeout(() => {
          grid[row] = Array(10).fill(false);
          setGrid([...grid]);
        }, 300);
      }

    for (let col = 0; col < 10; col++)
      if (grid.map(row => row[col]).every(Boolean))
        for (let row = 0; row < 10; row++) {
          grid[row][col] = 'destroyed';
          setTimeout(() => {
            grid[row][col] = false;
            setGrid([...grid]);
          }, 300);
        }

    setGrid([...grid]);
    return true;
  }

  return (<>
    <Board grid={grid} />
    <div className={scss.panel}>
      <h1>Blockz</h1>
      <h6>{score}</h6>
      <Block placeBlock={placeBlock} n={0} />
      <Block placeBlock={placeBlock} n={1} />
      <Block placeBlock={placeBlock} n={2} />
    </div>
  </>);
}
