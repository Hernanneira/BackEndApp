const express = require('express');
const { createServer } = require("http");
const parseArgs = require('minimist');
const dotenv = require('dotenv');
const cluster = require('cluster');
const os = require('os')

const app = express();
const httpServer = new createServer(app)
const args = parseArgs(process.argv.slice(2));
const modoCluster = args.modo == 'CLUSTER'
const PORT = args.port || 8080;
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended:true}));

// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, '../public/views/pages'));

// app.use(express.static('public'))

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