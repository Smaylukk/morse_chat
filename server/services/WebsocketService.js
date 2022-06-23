const uuid = require('uuid');
const { decodeMorseText } = require('./morseService');

// збергіання підлючених користувачів
const users = {}

const onConnection = (io, socket) => {
  // повідомлення при підключенні
  console.log('Connecting ', socket.id)

  // методи генерації подій
  const addMessage = (message) => {
    const decodedMessageText = decodeMorseText(message.messageText);
    const sendedMessage = {
      messageId: uuid.v4(),
      createdAt: new Date(),
      decodedMessageText,
      ...message
    }

    console.log(sendedMessage);
    // передаємо повідомлення користувачам    
    io.emit('new:message', sendedMessage)
  }

  const getUsers = () => {
    io.emit('users', users)
  }

  // додаємо користувача в наш масив
  const addUser = ({ username, userId }) => {
    console.log(username, userId);
    users[userId] = { username, socketId: socket.id }

    // відправляємо повідолмення з користувачами
    getUsers()
  }

  // обробка видалення користувача "Вихід із чату"
  const removeUser = (socketId) => {
    let userId = null;
    for (const user in users) {
      if (users[user].socketId === socketId) {
        userId = user;

        break;
      }
    }
    if (userId) {
      delete users[userId];
    }

    getUsers()

    console.log(`${userId} disconnected`)
  }

  // обробники
  socket.on('message:add', addMessage)
  socket.on('user:get', getUsers)
  socket.on('user:add', addUser)
  socket.on('user:rem', removeUser)

  socket.on('disconnect', (reason) => {
    removeUser(socket.id);
    console.log('disconnected -', reason, socket.id)
  })

}

module.exports = {
  onConnection
}
