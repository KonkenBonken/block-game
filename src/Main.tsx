import React, { useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

import scss from './styles/_panel.module.scss';
import Board from './components/Board';
import Block from './components/Block';
import Restart from './components/Restart';

const emptyGrid = (): (boolean | 'destroyed')[][] => Array(10).fill(0).map(() => Array(10).fill(false));

export default function Main() {
  const [grid, setGrid] = useState(emptyGrid);
  const [highScore, saveHighScore] = useLocalStorage('highScore', -Infinity);

  const [score, setScore] = useState(0),
    [comboText, setComboText] = useState<false | number>(false),
    [scoreText, setScoreText] = useState<false | number>(false);

  function placeBlock(shape: boolean[][], x: number, y: number) {
    for (let row = 0; row < shape.length; row++)
      for (let cell = 0; cell < shape[row].length; cell++)
        if (shape[row][cell] && grid[y + row][x + cell])
          return false;

    let score = 0, combo = 0;

    for (let row = 0; row < shape.length; row++)
      for (let cell = 0; cell < shape[row].length; cell++)
        grid[y + row][x + cell] ||= shape[row][cell];

    score += shape.flat().filter(Boolean).length ** 2;

    for (let row = 0; row < 10; row++)
      if (grid[row].every(Boolean)) {
        grid[row] = Array(10).fill('destroyed');
        setTimeout(() => {
          grid[row] = Array(10).fill(false);
          setGrid([...grid]);
        }, 300);
        combo++;
      }

    for (let col = 0; col < 10; col++)
      if (grid.map(row => row[col]).every(Boolean)) {
        for (let row = 0; row < 10; row++) {
          grid[row][col] = 'destroyed';
          setTimeout(() => {
            grid[row][col] = false;
            setGrid([...grid]);
          }, 300);
        }
        combo++;
      }

    score += combo * 100;

    if (combo >= 2) {
      score *= combo;
      setComboText(combo);
      setTimeout(() => setComboText(false), 2000);
    }

    if (score > 0) {
      if (scoreText === false) {
        setScoreText(score);
        setTimeout(() => {
          setScoreText(false);
          setScore(prev => prev + score);
          if (score > highScore)
            saveHighScore(score);
        }, 1000);
      }
      else {
        setScore(prev => prev + score);
        if (score > highScore)
          saveHighScore(score);
      }
    }

    setGrid([...grid]);
    return true;
  }

  function restart() {
    setGrid(emptyGrid);
    setScore(0);
  }

  return (<>
    <Board grid={grid} />
    <div className={scss.panel}>
      <h1>Blockz</h1>
      <h6>{score}</h6>
      <Block placeBlock={placeBlock} n={0} />
      <Block placeBlock={placeBlock} n={1} />
      <Block placeBlock={placeBlock} n={2} />
      <Restart restart={restart} />
    </div>
    {comboText && <h3 className={scss.combo}>Combo {comboText}x</h3>}
    {scoreText && <h3 className={scss.score}>{scoreText}</h3>}
  </>);
}
