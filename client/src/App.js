import './App.css';
import { Context } from '.';
import React, { useContext, useEffect, useState } from 'react';
import { decodeToken, isExpired } from 'react-jwt'
import { check } from './http/AuthAPI';
import { Watch } from 'react-loader-spinner';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import NavBar from './components/NavBar';

const App = observer(() => {
  const { store } = useContext(Context);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    check()
    .then(data => {
      if (!isExpired(data)) {
        store.setUser(decodeToken(data));
        store.setIsAuth(true);
      }
    })
    .finally(() => setLoading(false))
  }, []);

  if (loading) {
    return (
      <div className='loader'>
        <Watch ariaLabel="loading-indicator" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
})

export default App;
