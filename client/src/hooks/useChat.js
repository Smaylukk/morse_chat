import { useContext, useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

import { useBeforeUnload } from './useBeforeUnload'
import { Context } from '../'

const SERVER_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

export const useChat = () => {
  const { store } = useContext(Context)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState({})
  const [newMessage, setNewMessage] = useState(null)

  // useRef() дозволяє також збергіати будь-яке мутабельне значення протягом всього життєвого цикла компоненту
  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(
      SERVER_URL,
    )

    // генерація повідомлення додавання користувача
    socketRef.current.emit('user:add', { username: store.user.username, userId: store.user.id })

    // обробка отримання списку користувачів
    socketRef.current.on('users', (users) => {
      setUsers(users)
    })

    // обробка отримання повідомлень
    socketRef.current.on('new:message', (message) => {
      // якщо поточний користувач відправни чи отримувач, то додаємо повідомлення в чат відповідного користувача
      // messages - це об'єкт

      // оновлюємо об'єкт з повідомленнями
      // setMessages(newMessages)
      setMessages(prev => {
        const newMessages = Object.assign({}, prev);
        if (message.userId === store.user.id || message.recipientId === store.user.id) {
          let msgList = newMessages[message.userId === store.user.id ? message.recipientId : message.userId]
          if (!msgList) {
            msgList = []
          }
          //поставимо перевірку у випадку подвіного повідомлення
          if (!msgList.find((el) => el.messageId === message.messageId)) {
            msgList.push({ ...message, currentUser: (message.userId === store.user.id ? true : false) });
            newMessages[message.userId === store.user.id ? message.recipientId : message.userId] = msgList;
          }
        }

        return newMessages;
      })
    })

    return () => {
      // при розмонтуванні відключаємо сокет
      socketRef.current.disconnect()
    }
  }, [])

  // функція відправки повідомлення
  const sendMessage = ({ messageText, senderName, recipientId }) => {
    socketRef.current.emit('message:add', {
      userId: store.user.id,
      messageText,
      senderName,
      recipientId
    })
  }

  // метод для виходу з чату
  const leaveChat = () => {
    socketRef.current.emit('user:rem', store.user.id)
  }
  // відправляємо на сервер подію "user:leave" перед перезавантаденням сторінки
  useBeforeUnload(() => {
    leaveChat()
  })

  // хук повертає користувачів, повідомлення, функції відправки повідомлення і виходу з чату
  return { users, messages, sendMessage, leaveChat }
}
