import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { restoreSettings } from 'src/utils/settings';
import { SettingsProvider } from 'src/context/SettingsContext';
import * as serviceWorker from './serviceWorker';
import App from './App';

const settings = restoreSettings();

ReactDOM.render(
  <BrowserRouter>
    <SettingsProvider settings={settings}>
      <App />
    </SettingsProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
