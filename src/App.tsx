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
