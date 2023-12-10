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

export default function Block({ placeBlock }: { placeBlock(x: number, y: number): boolean }) {
  const { target: dragRef, position: [x, y] } = useDraggable<HTMLDivElement>({
    onEnd(_, [x, y], setPos) {
      const [gridX, gridY] = getGridPos(x, y);
      if (gridX >= 0 && gridY >= 0)
        if (placeBlock(gridX, gridY))
          setPos([0, 0]);
    }
  });

  const [gridX, gridY] = getGridPos(x, y);

  return (<>
    {gridX >= 0 && gridY >= 0 && <Ghost x={gridX} y={gridY} />}
    <div className={scss.block} ref={dragRef} />
  </>);
}

function Ghost({ x, y }: { x: number, y: number }) {
  return <div className={scss.ghost}
    style={{
      '--x': x, '--y': y
    } as React.CSSProperties}
  />;
}
