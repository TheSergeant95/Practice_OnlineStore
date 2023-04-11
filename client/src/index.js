import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ItemStore from './store/itemStore';
import UserStore from './store/userStore';
// import reportWebVitals from './reportWebVitals';
export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      item: new ItemStore()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);

