const uuid = require('uuid');
const { decodeMorseText } = require('./morseService');

// збергіання підлючених користувачів
const users = {}

const onConnection = (io, socket) => {
  // повідомлення при підключенні
  console.log('User connected')

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
    if (!users[userId]) {
      users[userId] = { username }
    }
    // відправляємо повідолмення з користувачами
    getUsers()
  }

  // обробка видалення користувача "Вихід із чату"
  const removeUser = (userId) => {
    delete users[userId];
    getUsers()

    console.log(`${userId} disconnected`)
  }

  // обробники
  socket.on('message:add', addMessage)
  socket.on('user:get', getUsers)
  socket.on('user:add', addUser)
  socket.on('user:rem', removeUser)

  socket.on('disconnect', (reason) => {
    console.log('disconnected')
  })

}

module.exports = {
  onConnection
}
