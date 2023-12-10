import React from 'react';

import Board from './components/Board';

export default function Main() {

  return (<>
    <h1>Block Game</h1>
    <Board ref={rectRef} />
  </>);
}
