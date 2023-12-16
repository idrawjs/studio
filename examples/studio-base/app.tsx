import React, { useEffect } from 'react';
import {} from '@idraw/studio-base';

export const App = () => {
  useEffect(() => {
    console.log('Hello');
  }, []);

  return (
    <div className="app-container">
      <div className="app-header">Header</div>
      <div className="app-content">
        <div className="app-left">left</div>
        <div className="app-main">
          <div>main</div>
        </div>
        <div className="app-right">right</div>
      </div>
    </div>
  );
};
