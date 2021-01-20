import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

import './i18n';
import greenTheme from './styles/theme';
import { ThemeProvider } from '@material-ui/core';
import { ProvideAuth } from './services/authentication';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <ProvideAuth>
        <Provider store={store}>
          <ThemeProvider theme={greenTheme}>
            <App />
          </ThemeProvider>
        </Provider>
      </ProvideAuth>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
