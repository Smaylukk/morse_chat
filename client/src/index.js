import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainStore from './stores/MainStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
  <React.StrictMode>
    <Context.Provider value={{
      store: new MainStore()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);

