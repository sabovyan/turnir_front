import React from 'react';

import TopBar from './components/TopBar/TopBar';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ width: '100%' }}>
          <TopBar />
        </div>
      </div>
    </div>
  );
}

export default App;
