import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { decodeToken, isExpired } from 'react-jwt'
import { Context } from '../..';
import { signIn } from '../../http/AuthAPI';
import { HOME_ROUTE } from '../../utils/routerPath';

const Auth = observer(() => {
  const { store } = useContext(Context)
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const buttonClick = async () => {
    try {
      let data;
      data = await signIn(username, password)
      if (!isExpired(data)) {
        store.setUser(decodeToken(data));
        store.setIsAuth(true);

        navigate(HOME_ROUTE);
      }
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 56 }}
    >
      <Card style={{ width: 600 }} className='p-3'>
        <h2 className='m-auto'>Авторизація</h2>
        <Form className='d-flex flex-column'>
          <Form.Control
            className='mt-3'
            placeholder="Введіть ваше ім'я..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            className='mt-3'
            placeholder='Введіть ваш пароль...'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row className='d-flex justify-content-between mt-3'>
            <div className='d-flex align-items-center'>
              <Button
                variant={'outline-success'}
                className='ms-auto'
                onClick={() => buttonClick()}>
                Увійти
              </Button>
            </div>
          </Row>

        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
