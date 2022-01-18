import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import './i18n/configs';
import { Provider } from 'react-redux';
import rootStore from './redux/store';
import axios from 'axios';
import { PersistGate } from 'redux-persist/integration/react';

(axios.defaults as any).headers['x-icode'] = 'AC174CD27656CF26';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
      <App />
      </PersistGate>
    
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
