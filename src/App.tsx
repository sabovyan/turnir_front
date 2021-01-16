import { Backdrop } from '@material-ui/core';
import React from 'react';
import RegisterForm from './components/RegisterForm/RegisterForm';
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
