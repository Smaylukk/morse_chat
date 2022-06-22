import React, { useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { getAllUsers } from '../../http/UserAPI';
import ModalAdmin from './modal/ModalAdmin';


const Admin = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    getAllUsers()
    .then(data => setUsers(data))
    .catch(err => console.log(err));
  }, [modalVisible])

  const addUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentUserId(null);
    setModalVisible(true);
  }

  return (
    <div>
      <h3>Керування користувачами</h3>
      <Button 
        className='my-1'
        variant="outline-success" 
        onClick={addUser}
      >
        Додати
      </Button>
      <ListGroup>
        {users.map(({_id, username}) => 
          <ListGroup.Item 
            key={_id} 
            action 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentUserId(_id);
              setModalVisible(true);
            }}
          >
            {username}
          </ListGroup.Item>
        )}
      </ListGroup>
      <ModalAdmin  
        show={modalVisible} 
        onHide={() => {
          setModalVisible(false)
        }}
        userId={currentUserId}
      />
    </div>
  );
};

export default Admin;