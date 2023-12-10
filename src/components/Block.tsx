import React from 'react';
import useDraggable from 'use-draggable-hook';

import scss from '../styles/_board.module.scss';

export default function Block() {
  const { target: dragRef, position: [x, y] } = useDraggable<HTMLDivElement>();

  return (<>
    <div className={scss.block} ref={dragRef} />
  </>);
}
