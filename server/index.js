const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const router = require('./routes/index');
const errorMiddleware = require('./middlewares/errorMiddleware');
const config = require('./config/app');
const appStart = require('./services/appService');
const { onConnection } = require('./services/websocketService');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => onConnection(io, socket))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

//middleware для помилок повинен бути останнім в ланцюжку
app.use(errorMiddleware)

app.get('/', (req, res) => res.send('Hello World!'))

const start = async () => {
  mongoose.connect(config.mongoUrl);
  console.log('Підключення до БД успішне!');

  server.listen(
    config.port,
    () => console.log(`Example app listening on PORT ${config.port}!`)
  );

  await appStart();
}

start()
  .catch(err => console.log(err))
