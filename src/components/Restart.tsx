import React from 'react';

import scss from '../styles/_panel.module.scss';

export default function Restart({ restart }: { restart(): void }) {
  return (<img
    className={scss.restart}
    src="https://img.icons8.com/?id=BUtO0i9u8bcs&format=png"
    onClick={restart}
    alt="restart"
  />);
}
