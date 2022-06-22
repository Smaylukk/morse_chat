import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { changeUser, createUser, deleteUser, getOneUser } from '../../../http/UserAPI';

const ModalAdmin = ({ show, onHide, userId }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState(['user']);
  const [banned, setBanned] = useState(false);
  const [userRole, setuserRole] = useState(false);
  const [adminRole, setadminRole] = useState(false);
  const [newbyRole, setnewbyRole] = useState(false);
  const [predefined, setPredefined] = useState(false);


  useEffect(() => {
    getOneUser(userId)
      .then(data => {
        setUsername(data.username);
        setRoles(data.roles);
        setBanned(data.banned);
        setPredefined(data.predefined);
      })
      .catch(() => {
        setUsername('');
        setPassword('');
        setRoles(['user']);
        setBanned(false);
        setPredefined(false);
      })
  }, [show])

  //значення чекбоксів на основі масиву
  useEffect(() => {
    setadminRole(false);
    setuserRole(false);
    setnewbyRole(false);
    roles.forEach(el => {
      switch(el) {
        case 'admin':
        setadminRole(true)
        break;
      case 'user':
        setuserRole(true)
        break;
      case 'newby':
        setnewbyRole(true)
        break;
      default:
          break;
    }
  })
}, [roles])

//значення чекбоксів на основі масиву
const getRoles = () => {
  const _roles = [];
  if (adminRole) {
    _roles.push('admin');
  }
  if (userRole) {
    _roles.push('user');
  }
  if (newbyRole) {
    _roles.push('newby');
  }

  return _roles;
}

const saveThisUser = () => {
  if (userId === null) {
    if (!getRoles()) {
      alert('Заборонено створювати користувача без жодної ролі')
      return;
    }
    createUser({ username, password, roles: getRoles() })
      .then(data => onHide())
      .catch(reason => alert(reason.message))
  } else {
    // напередвизначених користувачів змінювати не можна
    if (predefined) {
      alert('Напередвизначених користувачів змінювати не можна')
      return;
    }
    const _user = {};
    _user.roles = getRoles();
    if (password) {
      _user.password = password;
    }
    _user.banned = banned;

    if (!_user.roles.length) {
      alert('Заборонено створювати користувача без жодної ролі')
      return;
    }
    changeUser(userId, _user)
      .then(data => onHide())
      .catch(reason => alert(reason.message))
  }
}

const deleteThisUser = () => {
  if (userId !== null) {
    // напередвизначених користувачів змінювати не можна
    if (predefined) {
      alert('Напередвизначених користувачів змінювати не можна')
      return;
    }
    deleteUser(userId)
      .then(data => onHide())
      .catch(reason => alert(reason.message))
  }
}

return (
  <Modal
    show={show}
    onHide={onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Дані користувача
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Ім'я користувача</Form.Label>
          <Form.Control
            value={username}
            onChange={e => setUsername(e.target.value)}
            disabled={userId !== null}
            placeholder={"Введіть ім'я користувача"}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Пароль користувача</Form.Label>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={"Введіть пароль"}
          />
        </Form.Group>
        Ролі користувача: 
        <div className="mb-3">
          <Form.Check
            inline
            label="Admin"
            name="adminRole"
            type='switch'
            checked={adminRole}
            onChange={() => setadminRole(!adminRole)}
          />
          <Form.Check
            inline
            label="User"
            name="userRole"
            type='switch'
            checked={userRole}
            onChange={() => setuserRole(!userRole)}
          />
          <Form.Check
            inline
            label="Newby"
            name="newbyRole"
            type='switch'
            checked={newbyRole}
            onChange={() => setnewbyRole(!newbyRole)}
          />
        </div>
        <Form.Check
            inline
            label="Бан користувача"
            name="banned"
            type='switch'
            checked={banned}
            onChange={() => setBanned(!banned)}
          />
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button 
        variant="outline-dark" 
        onClick={onHide}
      >
        Закрити
        </Button>
      <Button 
        variant="outline-success" 
        onClick={saveThisUser}
        disabled={predefined}
      >
        Зберегти
      </Button>
      <Button 
        variant="outline-danger" 
        onClick={deleteThisUser}
        disabled={predefined}
      >
        Видалити
      </Button>
    </Modal.Footer>
  </Modal>
);
};

export default ModalAdmin;