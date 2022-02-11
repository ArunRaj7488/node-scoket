const express = require('express');

const socket = require('socket.io')
const router = express.Router();
const cors = require('cors')

const app = express();

app.use(cors());

const port = process.env.PORT || 4002;

const server = app.listen( port, () => console.log(`app listing on ${port}`));

const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true

  }
});

io.on("connection", function (socket) {
    console.log("Made socket connection");
    socket.on("message", function (data) {
      console.log({data})
      io.emit("message", {res: data});
    });

    socket.on("disconnect", () => {
      io.emit("socket disconnected", socket.userId);
    });
  })


