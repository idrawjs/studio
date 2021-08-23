import React from 'react';
import { Github, Repository } from './icon';

export function Nav() {
  return (
    <div className="nav-btn-list">
      <a className="nav-btn-item" target="_blank" href="https://idraw.js.org">
        idraw.js.org
      </a>
      <a className="nav-btn-item" target="_blank" href="https://github.com/idrawjs/">
        <Github />
      </a>
      <a className="nav-btn-item" target="_blank" href="https://github.com/idrawjs/studio">
        <Repository />
      </a>
    </div>
  )
}