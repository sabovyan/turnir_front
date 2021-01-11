import React, { ChangeEvent, useState } from 'react';
import CustomButton from './components/Buttons/CustomButton/CustomButton';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import CButton from './components/Buttons/CustomButton/CustomButton';
import RegisterForm from './components/RegisterForm/RegisterForm';


function App() {


  return (
    <div className="App">
      <header className="App-header">
        <h1>hello there</h1>
      </header>

      <form style={{
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: 'column'
      }} >

        <RegisterForm />
      </form>
    </div>
  );
}

export default App;
