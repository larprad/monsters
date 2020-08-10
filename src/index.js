import React from 'react';
import ReactDOM from 'react-dom';
import './style/reset.css';
import './style/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Outlet,
// } from 'react-router-dom';

// Adjusting height for Android devices
if (navigator.userAgent.match(/Android/i)) {
  console.log('fixing height for android device)');
  const screenHeight = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  console.log('screen Height ' + screenHeight + 'px');
  document.getElementById('root').style.height = screenHeight.toString() + 'px';
  console.log('Root ' + document.getElementById('root').style.height);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
