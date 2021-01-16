import React from 'react';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <SideBar />

        <section>testing section</section>
      </div>
    </div>
  );
}

export default App;
