import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import 'bootstrap/dist/css/bootstrap.min.css';
import {App} from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
