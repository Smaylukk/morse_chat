const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const router = require('./routes/index');
const AuthModdleware = require('./middlewares/authMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');
const config = require('./config/app');
const appStart = require('./services/AppService');
const { onConnection } = require('./services/WebsocketService');

const app = express()
const io = new Server({ 
  cors: {
    origin: '*'
  }
 })

io.on('connection', (socket) => onConnection(io, socket))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', router)

app.get('/', (req, res) => res.send('Hello World!'))

//middleware для помилок повинен бути останнім в ланцюжку
app.use(errorMiddleware)

const start = async () => {
  mongoose.connect(config.mongoUrl);
  console.log('Підключення до БД успішне!');

  app.listen(
    config.port, 
    () => console.log(`Example app listening on PORT ${config.port}!`)
  );

  io.listen(config.wsport)
  
  await appStart();
}

start()
.catch(err => console.log(err))
