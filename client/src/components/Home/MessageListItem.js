import React, { useContext } from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import { Context } from '../..';

export const MessageListItem = ({ msg }) => {
  const { store } = useContext(Context);
  const { messageId, messageText, decodedMessageText, senderName, createdAt, currentUser } = msg
  return (
    <ListGroup.Item
      className={`d-flex ${currentUser ? 'justify-content-end' : ''}`}
    >
      <Card
        bg={`${currentUser ? 'primary' : 'secondary'}`}
        text='light'
        style={{ width: '55%' }}
      >
        <Card.Header className={`d-flex ${currentUser ? 'justify-content-end' : 'justify-content-start'} align-items-center`}>
          <Card.Text date={createdAt} className='small' />
          <Card.Text>{senderName}</Card.Text>
        </Card.Header>
        <Card.Body className='d-flex justify-content-between align-items-center'>
          <Card.Text>
            {
              store.user.roles.includes('newby')
                ?
                decodedMessageText
                :
                messageText
            }
          </Card.Text>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  )
}
