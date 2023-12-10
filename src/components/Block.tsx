import React from 'react';
import useDraggable from 'use-draggable-hook';

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

export default function Block({ placeBlock }: { placeBlock(shape: boolean[][], x: number, y: number): boolean }) {
  const shape = [[true, true], [true, true]];

  const { target: dragRef, position: [x, y] } = useDraggable<HTMLDivElement>({
    onEnd(_, [x, y], setPos) {
      const [gridX, gridY] = getGridPos(x, y);
      if (gridX >= 0 && gridY >= 0)
        if (placeBlock(shape, gridX, gridY))
          setPos([0, 0]);
    }
  });

  const [gridX, gridY] = getGridPos(x, y);

  return (<>
    {gridX >= 0 && gridY >= 0 && <Ghost shape={shape} gridX={gridX} gridY={gridY} />}
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
