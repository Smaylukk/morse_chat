import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Context } from '../..';
import { useChat } from '../../hooks/useChat';
import { getAllUsers } from '../../http/UserAPI';
import { MessageForm } from './MessageForm';
import { MessageList } from './MessageList';
import { BsCircleFill } from 'react-icons/bs'

const Home = observer(() => {
  const {store} = useContext(Context);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const {users: socketUsers, messages: socketMessages, sendMessage, leaveChat} = useChat();

  useEffect(() => {
    getAllUsers()
    .then(data => setUsers(data))
    .catch(err => console.log(err));
  }, [])
  
  return (
    <Container>
    <Row>
      <Col xs={4}>
        <h3>Користувачі</h3>
        <ListGroup>
          {users
            .filter(({_id}) => store.user.id !== _id)
            .map(({_id, username}) =>{
            return( 
              <ListGroup.Item 
                key={_id} 
                action 
                onClick={(e) => {
                  setActiveUser(_id);
                }}
                active={_id === activeUser}                
              >
                <BsCircleFill
                  className={`mb-1 ${
                    socketUsers[_id] ? 'text-success' : 'text-warning'
                  }`}
                  size='0.8em'
                />{' '}
                {username}
              </ListGroup.Item>
              )
            }
          )}
        </ListGroup>
        <Button variant="outline-dark" onClick={leaveChat}>Відключитись</Button>
      </Col>
      <Col xs={8}>
        <MessageList 
          messages={socketMessages[activeUser] || []}
        />
        <MessageForm 
          username={store.user.username}
          sendMessage={sendMessage}
          disabled = {activeUser == null}
          recipientId={activeUser}
        />
      </Col>
    </Row>
  </Container>
  );
});

export default Home;
