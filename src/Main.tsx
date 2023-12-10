import React from 'react';

import scss from './styles/_main.module.scss';

export default function Main() {
  return (
    <h1 className={scss.header}>
      Hello World
    </h1>
  );
}
