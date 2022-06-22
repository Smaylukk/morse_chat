import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, Route, Routes } from "react-router-dom";
import {Context} from '..'
import { authRoutes, publicRoutes } from '../utils/routes';
import { HOME_ROUTE, LOGIN_ROUTE } from '../utils/routerPath';

const AppRouter = observer(() => {
  const {store} = useContext(Context)

  return (
    <Routes>
      {store.isAuth === true && authRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={Component} />
      )}
      
      {publicRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={Component} />
      )}
      <Route key={'*'} path={'*'} element={store.isAuth ? <Navigate to={HOME_ROUTE} /> : <Navigate to={LOGIN_ROUTE} /> } />
    </Routes>
  );
})

export default AppRouter;