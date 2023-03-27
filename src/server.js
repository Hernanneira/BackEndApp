const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const dotenv = require('dotenv');
const parseArgs = require('minimist');
const cluster = require('cluster');
const os = require('os')
const router = require('./routes/index')
const path = require('path');
const { configureSocketMessage } = require('./routes/ws/messages');
const { configureSocketPrivateMessage } = require('./routes/ws/privateMessages');
const { obtenerMensajes, nuevoMensaje, obtenerEmailMensajes } = require('./services/servicesMessages');
const {getIndexChat} = require('./controllers/controllerChat')

const args = parseArgs(process.argv.slice(2));
const app = express();
dotenv.config();
const PORT = args.port || 8080;
const modoCluster = args.modo == 'CLUSTER'
const numCPUs = os.cpus().length;
const httpServer = new createServer(app)
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../public/views/pages'));

app.use(express.static('public'))

// webSocket
async function handleSendEmailMessages (email) {
    try {
      return await obtenerEmailMensajes(email)
    } catch (error) {
      console.error(error.message)
      return []
    }
  }
  async function handleSendMessages () {
      try {
        return await obtenerMensajes()
      } catch (error) {
        console.error(error.message)
        return []
      }
  }


io.on("connection", async (socket) => {
    console.log("Un cliente se ha conectado");

//   socket.on("email", async (email) => {
//     await nuevoMensaje(email)
//     sockets.emit("emailMessages",);
//   });

  configureSocketMessage(socket, io.sockets);
  configureSocketPrivateMessage(socket, io.sockets);

});

//CRUD
app.use(router)

//Server CLOUSETER OR FORK

// master
if (modoCluster && cluster.isPrimary) {

    console.log(`Primary ${process.pid} is running`);
    console.log(`número de procesadores: ${numCPUs}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        console.log(`worker ${worker.process.pid} died`, new Date().toLocaleString());
        cluster.fork();
    }); 
}
  // workers
else {
    const server = httpServer.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT} - PID ${process.pid}`);
})
    server.on('error', error => console.log(`Error en servidor ${error}`));
}

