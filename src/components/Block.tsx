import React, { useState } from 'react';
import useDraggable from 'use-draggable-hook';

import getRandomShape from '../shapes';
import scss from '../styles/_board.module.scss';

const getBoard = () => {
  const
    vmax = Math.max(document.body.clientWidth, document.body.clientHeight),
    vmin = Math.min(document.body.clientWidth, document.body.clientHeight);
  return [(vmax - vmin * .9) * .7, vmin, vmax] as const;
};
const getGridPos = (x: number, y: number) => {
  const [boardX, vmin] = getBoard(),
    gridX = Math.round((x - boardX) / (vmin * .09)),
    gridY = Math.round((y - vmin * .05) / (vmin * .09));
  return [gridX, gridY];
};
const isInGrid = (shape: boolean[][], gridX: number, gridY: number) =>
  gridX >= 0 && gridY >= 0 && gridX + shape[0].length <= 10 && gridY + shape.length <= 10;

export default function Block({ placeBlock }: { placeBlock(shape: boolean[][], x: number, y: number): boolean }) {
  const [shape, setShape] = useState(getRandomShape);

  const { target: dragRef, position: [x, y] } = useDraggable<HTMLDivElement>({
    onEnd(_, [x, y], setPos) {
      const [gridX, gridY] = getGridPos(x, y);
      if (isInGrid(shape, gridX, gridY))
        if (placeBlock(shape, gridX, gridY)) {
          setPos([0, 0]);
          setShape(getRandomShape);
        }
    }
  });

  const [gridX, gridY] = getGridPos(x, y);

  return (<>
    {isInGrid(shape, gridX, gridY) && <Ghost shape={shape} gridX={gridX} gridY={gridY} />}
    <div className={scss.block} ref={dragRef}>
      {shape.flatMap((row, y) => row.map((cell, x) => cell && (
        <div key={`${x}${y}`}
          style={{
            '--x': x, '--y': y
          } as React.CSSProperties} />
      )))}
    </div>
  </>);
}

function Ghost({ shape, gridX, gridY }: { shape: boolean[][], gridX: number, gridY: number }) {
  return (<>
    {shape.flatMap((row, y) => row.map((cell, x) => cell && (
      <div className={scss.ghost}
        style={{
          '--x': x + gridX, '--y': y + gridY
        } as React.CSSProperties}
      />)))}
  </>);
}
