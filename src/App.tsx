import React, { useState } from 'react';
import { Backdrop } from '@material-ui/core';
import RegisterForm from './components/RegisterForm/RegisterForm';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <SideBar />

        <section>akl;jsdfkla;jdfk;lajsdf;l</section>
      </div>

      <div
        style={{
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <RegisterForm />
      </div>
    </div>
  );
}

export default App;
