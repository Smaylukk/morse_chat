import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { ADMIN_ROUTE } from '../utils/routerPath';

const NavBar = observer(() => {
  const {store} = useContext(Context);
  const navigate = useNavigate()
  console.log(store);
  
  const logout = () => {
    store.setUser({});
    store.setIsAuth(false);
    localStorage.removeItem('token');
  }

  return (
    <>
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">
            Morse-chat {store.isAuth ? `- (${store.user.username})` : ''}
        </Navbar.Brand>
        <Nav className="ms-auto">
          {store.isAuth &&
          <>
            <Button 
              className='ms-2' 
              variant={'outline-light'}
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Адмін панель
            </Button>
            <Button 
              className='ms-2' 
              variant={'outline-light'} 
              onClick={logout}
            >
              Вийти
            </Button>
          </>
          }
        </Nav>
      </Container>
    </Navbar>
    </>
    )
    
});

export default NavBar;