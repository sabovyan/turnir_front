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
      <Backdrop
        open={true}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'absolute',
          padding: '16px',
          zIndex: 1,
        }}
      >
        <div
          style={{
            // display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'absolute',
            background: 'white',
            padding: '16px',
          }}
        >
          <RegisterForm />
        </div>
      </Backdrop>
    </div>
  );
}

export default App;
