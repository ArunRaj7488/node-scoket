const express = require('express');

const socket = require('socket.io')
const router = express.Router();
const cors = require('cors')

const app = express();

app.use(cors());
console.log("test server")

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR'
  );
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
  return;
});


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


