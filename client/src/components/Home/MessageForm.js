import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'
import { FiSend } from 'react-icons/fi'
import { encodeMorseSymbol } from '../../utils/morze'

export const MessageForm = ({ username, sendMessage, disabled, recipientId }) => {
  const [text, setText] = useState('')

  const handleChangeText = (e) => {
    const text = String(e.target.value)
    const s = text.slice(-1)
    if (s === '.' || s === '-' || s === ' ') {
      setText(text)
    } else {
      setText(text.slice(0, -1) + encodeMorseSymbol(s) + ' ')
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed) {
      sendMessage({ messageText: text, senderName: username, recipientId })
      setText('')
    }
  }

  return (
    <div className='mt-1'>
      <Form onSubmit={handleSendMessage}>
        <Form.Group className='d-flex'>
          <Form.Control
            value={text}
            onChange={handleChangeText}
            type='text'
            placeholder='Message...'
          />
          <Button variant='success' type='submit' disabled={disabled}>
            <FiSend />
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}
